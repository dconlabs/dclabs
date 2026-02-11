import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let connectDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise_news) {
    global._mongoClientPromise_news = client.connect();
  }
  connectDB = global._mongoClientPromise_news;
} else {
  connectDB = client.connect();
}

export default connectDB;
