export const revalidate = 600;

import styles from "./page.module.css";
import Link from "next/link";
import connectDB from "@/lib/db";
import NewsCard from './components/newsCard';
import { cookies } from 'next/headers';
import ScrollObserver from './components/scrollObserver';
import Header from './components/header';
import ResearchField from './components/researchField';
import Education from './components/education';
import Team from './components/team';

export default async function Home() {

  const client = (await connectDB).db("news");
  const newsData = await client.collection("post").find().toArray();

  const serializedData = newsData.map(post => ({
    ...post,
    _id: post._id.toString(),
  }));

  const cookieStore =await cookies();
  const hasToken = cookieStore.get('admin_token')?.value;

  //console.log(newsData);

  return (
    <>
    <Header/>
    <ScrollObserver/>
    
    <div className={styles.main_container}>
      <div className="observe_wrapper" style={{marginBottom:'10px'}}>
        <div className={`${styles.main_copy} observe_content`}>
          <div className={styles.main_copy_en}>
            Blending logic and<br/>emotion in <span>UX/UI and BX,</span><br/>we architect meaningful<br/>interactions brand<br/>identities to shape future<br/>digital experiences.
            <div className={styles.backColor}/>
          </div>
          <div className={styles.main_copy_kr}>
            <span>우리는 디지털 스펙트럼 안에서 논리와 감성의 교차점을 탐구합니다.</span><span>UX/UI 및 BX 분야에 특화되어 의미 있는 인터랙션과 실체 있는 브랜드</span><span>아이덴티티를 설계하며, 디지털 경험의 미래를 만들어갈 혁신을 주도합니다.</span>
          </div>
        </div>
      </div>

      <div id="EDUCATION" className="observe_wrapper">
        <div className="observe_content">
          <div className={styles.sub_title}>EDUCATION</div>
          <Education/>
        </div>
      </div>

      <div id="TEAM" className="observe_wrapper">
        <div className="observe_content">
          <Team/>
        </div>
      </div>

      <div id="OPPORTUNITIES" className="observe_wrapper">
        <div className="observe_content">
          <div className={styles.sub_title}>OPPORTUNITIES</div>
          <ResearchField/>
        </div>
      </div>

      <div id="NEWS" className="observe_wrapper">
        <div className="observe_content">
          <div className={styles.sub_title}>News</div>
          <div style={{margin:'40px 0'}}>
            {
              hasToken ? <Link href="/news/post" className={styles.post_btn}>뉴스 등록하기</Link> : null
            }
          </div>
          <div>
            <NewsCard newsData={serializedData} hasToken={hasToken}/>
          </div>
        </div>
      </div>
      

    </div>
    </>
  );
}