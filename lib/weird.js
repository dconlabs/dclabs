import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI_WEIRD;
const client = new MongoClient(uri);

let connectWeirdDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise_weird) {
    global._mongoClientPromise_weird = client.connect();
  }
  connectWeirdDB = global._mongoClientPromise_weird;
} else {
  connectWeirdDB = client.connect();
}

export default connectWeirdDB;
