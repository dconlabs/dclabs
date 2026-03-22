import connectDB from "@/lib/db";
import { ObjectId } from "mongodb";
import Link from "next/link";
import DeleteBtn from "@/app/components/deleteBtn";
import { cookies } from "next/headers";

export default async function NewsDetail({ params }) {

  const { id } = await params;

  const client = (await connectDB).db("news");
  const newsData = await client.collection("post").find().toArray();

  const post = await client
    .collection("post")
    .findOne({ _id: new ObjectId(id) });

  const serializedPost = {
    ...post,
    _id: post._id.toString(),
  };


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
        {post.source == "dclabs" && token ? <div>
          <Link href={`/news/edit/${serializedPost._id}`}>수정</Link>
          <DeleteBtn id={post._id.toString()} url={"/api/admin"} />
        </div> : null}
      </div>
    </div>
  );
}