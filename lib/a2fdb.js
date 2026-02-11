import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI_A2F;
const client = new MongoClient(uri);

let connectA2FDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise_a2f) {
    global._mongoClientPromise_a2f = client.connect();
  }
  connectA2FDB = global._mongoClientPromise_a2f;
} else {
  connectA2FDB = client.connect();
}

export default connectA2FDB;
