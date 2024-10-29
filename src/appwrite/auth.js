import { Account, Client, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
      client = new Client();
      account ;

      constructor(){
            this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

            this.account = new Account(this.client)
      }

      async login({email,password}){
            try {
                  return await this.account.createEmailPasswordSession(email,password)
            } catch (error) {
                  throw error
            }
      }
      
      async createAccount({email,password,name}){
            try {
                  const userAccount = await this.account.create(ID.unique(),email,password,name);

                  if(userAccount){
                        // call mrthod 
                        return this.login({email,password});
                  }else{
                        return userAccount;
                  }
            } catch (error) {
                  console.log(error.message);
            }
      }

      

      async getCurrentUser(){
            try {
                  return await this.account.get();
            } catch (error) {
                  throw error;
            

            return null;
      }}

      async logout(){
            try {
                  this.account.deleteSessions()
            } catch (error) {
                  throw error;
            }
      }
}

const authService = new AuthService();

export default authService;