import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { del } from '@vercel/blob';

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.title || !body.contents) {
      return NextResponse.json({ ok: false, error: "제목과 내용은 필수입니다." }, { status: 400 });
    }

    const db = (await connectDB).db("news");
    
    await db.collection("post").insertOne({
      title: body.title,
      contents: body.contents,
      images: body.images || [],
      createdAt: new Date(),    
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ ok: false, error: "ID is required" }, { status: 400 });
    }

    const db = (await connectDB).db("news");
    const collection = db.collection("post");
    const targetId = new ObjectId(body.id);

    const post = await collection.findOne({ _id: targetId });

    if (!post) {
      return NextResponse.json({ ok: false, error: "Post not found" }, { status: 404 });
    }

    if (post.images && post.images.length > 0) {
      await Promise.all(
        post.images.map((url) => del(url))
      );
    }

    await collection.deleteOne({ _id: targetId });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}