import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
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
  database: mongodbAdapter(db,{
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
});

export async function getSession(){
  const  result=await auth.api.getSession({
    headers:await headers(),
  })
  return result;
}
