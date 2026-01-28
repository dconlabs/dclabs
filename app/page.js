import styles from "./page.module.css";
import Link from "next/link";
import connectDB from "@/lib/db";
import NewsCard from './components/newsCard';
import { cookies } from 'next/headers';

export default async function Home() {

  const client = await connectDB;
  const result = await client.db("news").collection("post").find().toArray();

  const cookieStore =await cookies();
  const hasToken = cookieStore.get('admin_token')?.value;
  //console.log(result);

  return (
    <div>
      test 테스트
      <NewsCard newsData={JSON.parse(JSON.stringify(result))} token={hasToken}/>

      {
        hasToken ? <Link href="/post">post</Link> : null
      }
    </div>
  );
}