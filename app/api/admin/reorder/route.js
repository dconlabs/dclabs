import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(req) {

  try {

    const body = await req.json();

    if (!body.posts || !Array.isArray(body.posts)) {

      return NextResponse.json(
        {
          ok: false,
          error: "posts 배열이 필요합니다."
        },
        {
          status: 400
        }
      );
    }

    const db = (await connectDB).db("news");

    await Promise.all(

      body.posts.map((post) => {

        return db.collection("post").updateOne(
          {
            _id: new ObjectId(post.id)
          },
          {
            $set: {
              order: post.order
            }
          }
        );
      })
    );

    return NextResponse.json({
      ok: true
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        ok: false,
        error: err.message
      },
      {
        status: 500
      }
    );
  }
}