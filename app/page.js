export const revalidate = 600;

import styles from "./page.module.css";
import Link from "next/link";
import connectDB from "@/lib/db";
import NewsCard from './components/newsCard';
import { cookies } from 'next/headers';

export default async function Home() {

  const client = (await connectDB).db("news");
  const newsData = await client.collection("post").find().toArray();

  const serializedData = newsData.map(post => ({
    ...post,
    _id: post._id.toString(),
  }));


  const cookieStore =await cookies();
  const hasToken = cookieStore.get('admin_token')?.value;

  console.log(newsData);

  return (
    <div style={{marginTop: '390px'}}>
      <NewsCard newsData={serializedData} hasToken={hasToken}/>

      {
        hasToken ? <Link href="/news/post">post</Link> : null
      }
    </div>
  );
}