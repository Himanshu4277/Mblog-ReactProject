import Config from '../Config/Config';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(Config.appwriteENDPOINT)
            .setProject(Config.appwritePROJECT_ID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ Title, slug, Content, featuredImage, status, UserId }) {
        try {
            return await this.databases.createDocument(
                Config.appwriteDATABASE_ID,
                Config.appwriteCOLLECTION_ID,
                slug,
                {
                    Title: Title,
                    Content: Content,
                    "Featured-Images": featuredImage,
                    Status: status,
                    UserId: UserId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, { Title, Content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                Config.appwriteDATABASE_ID,
                Config.appwriteCOLLECTION_ID,
                slug,
                {
                    Title: Title,
                    Content: Content,
                    "Featured-Images": featuredImage,
                    Status: status,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                Config.appwriteDATABASE_ID,
                Config.appwriteCOLLECTION_ID,
                slug

            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                Config.appwriteDATABASE_ID,
                Config.appwriteCOLLECTION_ID,
                slug

            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("Status", "active")]) {
        try {
            return await this.databases.listDocuments(
                Config.appwriteDATABASE_ID,
                Config.appwriteCOLLECTION_ID,
                queries,


            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                Config.appwriteBUCKET_ID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                Config.appwriteBUCKET_ID,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFileView(
            Config.appwriteBUCKET_ID,
            fileId
        )
    }
}


const services = new Service()
export default services