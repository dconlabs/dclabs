// 뉴스 등록 및 삭제

import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// 뉴스 등록
export async function POST(req) {
  try {
    const body = await req.json();

    const db = (await connectDB).db("news");
    await db.collection("post").insertOne(body);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

// 뉴스 삭제
export async function DELETE(req) {
  try {
    const body = await req.json();
    console.log(body);

    const db = (await connectDB).db("news");
    await db.collection("post").deleteOne({ _id: new ObjectId(body.id) });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}