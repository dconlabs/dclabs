import connectDB from "@/lib/db";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { use } from "react";
import DeleteBtn from "@/app/components/deleteBtn";
import { cookies } from "next/headers";
import connectA2FDB from "@/lib/a2fdb";
import connectWeirdDB from "@/lib/weird";

export default async function NewsDetail({ params }) {

  const { id } = await params;

  const client = (await connectDB).db("news");
  const db2 = (await connectA2FDB).db("a2f_news");
  const db3 = (await connectWeirdDB).db("weirdlab_news");

  const [a, b, c] = await Promise.all([
    client.collection("post").find().toArray(),
    db2.collection("post").find().toArray(),
    db3.collection("post").find().toArray()
  ]);

  const merged = [
    ...a.map(post => ({ ...post, source: "dclabs" })),
    ...b.map(post => ({ ...post, source: "a2flux" })),
    ...c.map(post => ({ ...post, source: "weirdlab" }))
  ].sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt));

  const post = merged.find(p => p._id.toString() === id);

  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!post) {
    return <div>게시글을 찾을 수 없음</div>;
  }

  return (
    <div>
      <Link href="/">뒤로가기</Link>
      <h1>{post.title}</h1>
      <p>{post.contents}</p>
      {post.images && post.images.length > 0 && (
        post.images.map((imgUrl, idx) => (
          <img key={idx} src={imgUrl} alt="" style={{ width: '300px', height: '300px', objectFit: 'cover', marginRight: '20px' }} />
        ))
      )}
      <div>
        {token ? <Link href={`/news/edit/${post._id.toString()}`}>수정</Link> : null}
        {token ? <DeleteBtn id={post._id.toString()} url={"/api/admin"} /> : null}
      </div>
    </div>
  );
}