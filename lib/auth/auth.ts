import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import initializeUserBoard from "../init-user-board";
import { headers } from "next/headers";

if (!process.env.MONGO_URI) {
  console.log("MONGO_URI is not defined in environment variables");
 throw new Error("MONGO_URI is not defined");
}

const client=new MongoClient(process.env.MONGO_URI)  
await client.connect();
const db =client.db();
export const auth = betterAuth({
  //...

  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.0.240:3000", // if you use network access
  ],

  database: mongodbAdapter(db,{
    client,
  }),
  session:{
    cookieCache:{
      enabled:true,
      maxAge:60*60,
    },
  },
  emailAndPassword: {
    enabled: true,
  },

  databaseHooks: {
    user:{
      create:{

      after: async (user) => {
        if(user){
        await initializeUserBoard(String(user.id));  
        }
      }
      }

    }
  }

});

export async function getSession(){
  const  result=await auth.api.getSession({
    headers:await headers(),
  })
  return result;
}
