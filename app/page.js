export const revalidate = 600;

import styles from "./page.module.css";
import Link from "next/link";
import connectDB from "@/lib/db";
import connectA2FDB from "@/lib/a2fdb";
import NewsCard from './components/newsCard';
import { cookies } from 'next/headers';
import connectWeirdDB from "@/lib/weird";

export default async function Home() {

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

  const cookieStore =await cookies();
  const hasToken = cookieStore.get('admin_token')?.value;

  console.log(merged);

  return (
    <div>
      test 테스트
      <NewsCard newsData={JSON.parse(JSON.stringify(merged))} token={hasToken}/>

      {
        hasToken ? <Link href="/news/post">post</Link> : null
      }
    </div>
  );
}