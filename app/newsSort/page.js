import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Header from '../components/header';
import connectDB from '../../lib/db';
import NewsClientComp from './newsClientComp';

export default async function NewsSort() {

  const cookieStore = await cookies();
  const hasToken = cookieStore.get('admin_token')?.value;

  const client = (await connectDB).db("news");
  const newsData = await client.collection("post").find().toArray();

  const serializedData = newsData.map(post => ({
    ...post,
    _id: post._id.toString(),
  }));


  if (!hasToken) {
    redirect('/');
  }

  return (
    <div>
      <Header/>
      <NewsClientComp newsData={serializedData}/>
    </div>
  );
}