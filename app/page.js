export const revalidate = 600;

import styles from "./page.module.css";
import Link from "next/link";
import connectDB from "@/lib/db";
import NewsCard from './components/newsCard';
import { cookies } from 'next/headers';
import ScrollObserver from './components/scrollObserver';
import Header from './components/header';
import ResearchField from './components/researchField';

export default async function Home() {

  const client = (await connectDB).db("news");
  const newsData = await client.collection("post").find().toArray();

  const serializedData = newsData.map(post => ({
    ...post,
    _id: post._id.toString(),
  }));

  const cookieStore =await cookies();
  const hasToken = cookieStore.get('admin_token')?.value;

  let nav = ['ABOUT', 'TEAM', 'OPPORTUNITY', 'NEWS']

  //console.log(newsData);

  return (
    <>
    <Header/>
    <ScrollObserver/>
    
    <div className={styles.main_container}>
      <div className="observe_wrapper">
        <div className={`${styles.main_copy} observe_content`}>
          <div className={styles.main_copy_en}>
            Blending logic and<br/>emotion in <span>UX/UI and BX,</span><br/>we architect meaningful<br/>interactions brand<br/>identities to shape future<br/>digital experiences.
            <div className={styles.backColor}/>
          </div>
          <div className={styles.main_copy_kr}>
            우리는 디지털 스펙트럼 안에서 논리와 감성의 교차점을 탐구합니다.<br/>UX/UI 및 BX 분야에 특화되어 의미 있는 인터랙션과 실체 있는 브랜드<br/>아이덴티티를 설계하며, 디지털 경험의 미래를 만들어갈 혁신을 주도합니다.
          </div>
        </div>
      </div>

      <div id="ABOUT" className="observe_wrapper">
        <div className="observe_content">
          <div className={styles.sub_title}>About</div>
        </div>
      </div>

      <div id="TEAM" className="observe_wrapper">
        <div className="observe_content">
          <div className={styles.sub_title}>Team</div>
          <div className={styles.team_container}>
            <div className={styles.lab_container}>
              <Link href="/" target='_blank' className={styles.lab_img_container}>
                <div className={styles.prof_img}>
                  <img src="/chon.png" />
                </div>
                <div className={styles.lab_img}>
                  <img src="/weird.png"/>
                </div>
              </Link>
              <div className={styles.lab_research}>
                {
                  ['Human–AI Collaborative Design', 'Generative AI–Enabled Design', 'UX / UI Design', 'Service Design'].map((item) => (
                    <div key={item}>{item}</div>
                  ))
                }
              </div>
              <div className={styles.lab_description}>
                <div className={styles.lab_description_kr}>디지털콘텐츠 전공은 멀티미디어 융합 교육을 바탕으로, 뉴미디어 기술에 대한 깊은 이해와 창의적 콘텐츠 생산 능력을 갖춘 전문가를 육성하며, 변화하는 산업 트렌드를 선도하고. 창의적 콘텐츠 생산 능력을 갖춘 전문가를 육성하며, 변화하는 산업 트렌드를 선도하.</div>
                <div className={styles.lab_description_en}>We cultivate creative global experts who lead new media trends through multimedia convergence.Our curriculum and practice.</div>
              </div>
            </div>

            <div className={styles.lab_container}>
              <Link href="/" target='_blank' className={styles.lab_img_container}>
                <div className={styles.prof_img}>
                  <img src="/chon.png" />
                </div>
                <div className={styles.lab_img}>
                  <img src="/weird.png"/>
                </div>
              </Link>
              <div className={styles.lab_research}>
                {
                  ['Cognitive Design Activity', 'Design Thinking ', 'Experience Strategy in Digital Contexts', 'Human–AI Co-thinking in Design'].map((item) => (
                    <div key={item}>{item}</div>
                  ))
                }
              </div>
              <div className={styles.lab_description}>
                <div className={styles.lab_description_kr}>A2F 디자인랩은 디자인을 단순한 기술이 아닌 인지적 사고 과정으로 정의하며, 디지털 환경에서의 심층적인 UX/BX 경험 전략을 탐구합니다. 또한 생성형 AI를 디자이너를 위한 공동 사고 도구로 활용하여, 인간과 AI가 협력하는 혁신적인 디자인 모델을 연구합니다.</div>
                <div className={styles.lab_description_en}>A2F Design Lab explores cognitive UX/BX strategies and pioneers human-AI collaborative design using generative AI as a co-thinking tool.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="OPPORTUNITY" className="observe_wrapper">
        <div className="observe_content">
          <div className={styles.sub_title}>OPPORTUNITY</div>
          <ResearchField/>
        </div>
      </div>

      <div id="NEWS" className="observe_wrapper">
        <div className="observe_content">
          <div className={styles.sub_title}>News</div>
          <div style={{marginTop:'40px'}}>
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