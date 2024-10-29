import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../config/config";

export class Service{
      client = new Client();
      databases;
      bucket;

      constructor(){
            this.client.setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
      }
      
      async createPost({ title ,slug, contenet, featuredImage, status, userid}) {
            try {
                  const response = await this.databases.createDocument(
                        config.appwriteDatabaseId,
                        config.appwriteCollectionId,
                        slug,
                        {
                        title, userid, contenet, featuredImage, status
                        }
                        );
                        console.log('Create Post Response:', response); // Log the response
                        return response;
            } catch (error) {
                  console.error("appwrite service :: createPost :: error", error.message);
                  throw new Error("Failed to create post");
            }
            }
            

      async updatePost(slug,{title,content,featuredImage,status}){
            try {
                  return await this.databases.updateDocument(
                        conf.appwriteDatabaseId,
                        config.appwriteCollectionId,
                        slug,
                        {
                              title,content,
                              featuredImage,
                              status,
                        }
                  )
            } catch (error) {
                  console.log("appwrite service :: updatepost :: error",error);
            }
      }

      async deletePost(slug){
            try {
                  await this.databases.deleteDocument(
                        config.appwriteDatabaseId,
                        config.appwriteCollectionId,
                        slug,
                  )
                  return true;
            } catch (error) {
                  console.log("appwrite service :: deletepost :: error",error);
                  return false;
            }
      }

      async getPost(slug){
            try {
                  return await this.databases.getDocument(
                        config.appwriteDatabaseId,
                        config.appwriteCollectionId,
                        slug,
                  )
            } catch (error) {
                  console.log("appwrite error :: getPost ",error);
                  return false;
            }
      }

      // async getPosts(query = Query.equal("status", "active")) {
      //       try {
      //             const response = await this.databases.listDocuments(
      //                   config.appwriteDatabaseId,
      //                   config.appwriteCollectionId,
      //               [query], // Query should be an array if that's the expected format
      //               100, // Pagination
      //               0 // Results
      //             );
      //           console.log("Appwrite getPosts response:", response); // Log the entire response
      //           return response; // Return the full response
      //       } catch (error) {
      //             console.error("Appwrite error :: getPosts ", error);
      //           return {}; // Return an empty object on error
      //       }
      //       }
      //       import { Query } from 'appwrite';

async getPosts(query = Query.equal("status", "active")) {
    try {
        const response = await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            [query], // Ensure this is the correct format; could be an array of queries
            100, // Pagination
            0 // Results
        );

      //   console.log("Appwrite getPosts response:", response); // Log the entire response

        if (response && Array.isArray(response.documents)) {
            return response; // Return the full response
        } else {
            console.error("Unexpected response format:", response);
            return { documents: [] }; // Return an empty array for documents if format is unexpected
        }
    } catch (error) {
        console.error("Appwrite error :: getPosts ", error);
        return { documents: [] }; // Return an empty array on error
    }
}

      
      // file uplad method 
      async uploadFile(file){
            try {
                  return await this.bucket.createFile(
                        config.appwriteBucketId,
                        ID.unique(),
                        file,
                  )
            } catch (error) {
                  console.log('Appwrite :: uploaderror',error);
                  
            }
      }

      async deletePost(fileId){
            try {
            await this.bucket.deleteFile(
                        config.appwriteBucketId,
                        fileId,
                  )
                  return true;
            } catch (error) {
                  console.log('Eroor in deleting post ',error);
                  
            }
      }

      async getFilePreview(fileId){
            return this.bucket.getFilePreview(
                  config.appwriteBucketId,
                  fileId,
            )
      }

      async deleteFile(fileId){
            try {
                  return await this.bucket.deleteFile(
                        config.appwriteBucketId,
                        fileId,
                  )
            } catch (error) {
                  console.log('Appwrite :: deleteerror',error);
            }
      }


}
const service = new Service();

export default service