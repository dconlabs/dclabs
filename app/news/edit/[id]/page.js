import connectDB from "@/lib/db";
import { ObjectId } from "mongodb";
import EditForm from "./editForm";

export default async function NewsDetail({ params }) {

  const { id } = await params;
  const db = (await connectDB).db("news");
  const post = await db.collection("post").findOne({ _id: new ObjectId(id) });

  return (
    <div>
      <EditForm post={JSON.parse(JSON.stringify(post))} />
    </div>
  );
}