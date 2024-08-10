import { MongoClient } from "mongodb";

// if env not exist
if (!process.env.MONGODB_URI) {
    throw new Error("Invalid Missing URI .env invalid")

}

const uri = process.env.MONGODB_URI
const option = {}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri,option)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise

}else{
    // In Production mode
    client = new MongoClient(uri, option)
    clientPromise = client.connect()
}

// Export a module scope mogoclient promised

export default clientPromise