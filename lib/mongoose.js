import mongoose from "mongoose";

export function mongooseConnect(){
    if (mongoose.connection.readyState === "open") {
        return mongoose.connection.asPromise();

    }else{
        const uri = process.env.MONGODB_URI
        return mongoose.connect(uri);
    }
}