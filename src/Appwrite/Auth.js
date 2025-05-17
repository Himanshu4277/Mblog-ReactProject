import { Client, Account, ID } from "appwrite";
import Config from "../Config/Config";

// const client = new Client()
//   .setEndpoint(Config.appwriteENDPOINT)
//   .setProject(Config.appwritePROJECT_ID);

// const account = new Account(client);

class AuthServices {
    Client = new Client();
    Account;
    constructor() {
        this.Client
            .setEndpoint(Config.appwriteENDPOINT)
            .setProject(Config.appwritePROJECT_ID);
        this.Account = new Account(this.Client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.Account.create(ID.unique(), email, password, name)
            if (userAccount) {
                await this.login({ email, password })
                return true
            } else {
                return userAccount
            }

        } catch (error) {
            console.log(error);
        }
    }
    async getUser() {
        try {
            const user = await this.Account.get();
            return user;
        } catch (error) {
            console.log("Error in getUser:", error.message);
        }
        return null
    }
    async login({ email, password }) {
        try {
            return await this.Account.createEmailPasswordSession(email, password)
        } catch (error) {
            return error
        }
    }
    async logout() {
        try {
            await this.Account.deleteSessions()
        } catch (error) {
            console.log(error);
        }
    }
}

const authServices = new AuthServices()

export default authServices
