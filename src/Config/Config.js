// src/Config/Config.js
const Config = {
    appwriteENDPOINT: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwritePROJECT_ID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDATABASE_ID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCOLLECTION_ID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBUCKET_ID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  };
  
  export default Config;
  