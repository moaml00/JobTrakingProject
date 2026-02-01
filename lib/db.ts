import mongoose from "mongoose";


const MONGO_URI=process.env.MONGO_URI 
interface MongooseCache{
    conn: typeof mongoose |null;
    promise:Promise<typeof mongoose> |null;
}

declare global{
    var mongoose: MongooseCache|undefined
}
const  cached: MongooseCache=global.mongoose||{conn:null,promise:null};

if(!global.mongoose){
  global.mongoose=cached
}

async function connectDB(){

if(!MONGO_URI){
    throw  new Error(
    "please define mongourl inside env var"
    );
}

    if(cached.conn){
    return cached.conn;
    }

    if(!cached.promise){
        const opts={
        bufferCommands:false,
        }
       cached.promise= mongoose.connect(MONGO_URI,opts).then((mongoose)=>{
        return mongoose;
       });
    }
    try{
    cached.conn=await cached.promise;
    }catch(e){
    cached.promise=null;
    throw e
    }
    
   return cached.conn; 

}
export default connectDB
