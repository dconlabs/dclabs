import styles from "./page.module.css";
import Link from "next/link";
import connectDB from "@/lib/db";
import NewsCard from './components/newsCard';

export default async function Home() {

  const client = await connectDB;
  const result = await client.db("news").collection("post").find().toArray();

  //console.log(result);

  return (
    <div>
      test 테스트
      <Link href="/testPage">testPage</Link>

      <NewsCard newsData={JSON.parse(JSON.stringify(result))} />

      <Link href="/post">post</Link>
    </div>
  );
}