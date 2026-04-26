'use client'

import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import { useState } from "react";
import Arrow from "./icons/arrow";

export default function NewsCard({ newsData, hasToken }) {

  const router = useRouter();

  const sorted = newsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  let category = ["All", "Notice", "Event", "Publication", "Others"]
  let [nowCategory, setNowCategory] = useState("All");

  const filtered = nowCategory === "All" ? sorted : sorted.filter(post => post.group === nowCategory);

  const [pageNum, setPageNum] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);

  const POSTS_PER_PAGE = 4;
  const PAGES_PER_GROUP = 5;

  const totalPage = Math.ceil(filtered.length / POSTS_PER_PAGE);

  const startIndex = (pageNum - 1) * POSTS_PER_PAGE;
  const currentPosts = filtered.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const startPage = pageGroup * PAGES_PER_GROUP + 1;
  const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPage);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const scrollToNews = () => {
    const element = document.getElementById('NEWS');
    if (element) {
      const headerHeight = 200;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.research_mt}>

      <div className={styles.category_container}>
        {category.map((item, index) => (
          <div 
            key={index} 
            className={nowCategory === item ? styles.nowCategory : styles.notNowCategory} 
            onClick={() => {
              setNowCategory(item);
              setPageNum(1);
              setPageGroup(0);
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {currentPosts.length === 0 ? <div style={{color:'#888'}}>등록된 뉴스가 없습니다.<p>No news has been posted yet.</p></div> : currentPosts.map((post) => (
        <div 
          key={post._id} 
          onClick={() => router.push(`/news/${post._id.toString()}`)} 
          className={styles.news_card_container}
        >
          <div className={styles.news_card_content}>
            <div className={styles.news_card_text}>
              <div className={styles.news_card_title}>{post.title}</div>
              <div className={styles.news_card_enTitle}>{post.enTitle}</div>
              <div className={styles.news_card_contents}>{post.contents}</div>
            </div>
            <div className={styles.news_card_date}>{post.uploadDate}</div>
          </div>

          {post.images && post.images.length > 0 && (
            <img src={post.images[0]} className={styles.news_card_img}/>
          )}
        </div>
      ))}

      <div className={currentPosts.length > 20 ? styles.pagination : styles.pagination_hidden}>

        {pageNumbers.map((num) => (
          <div key={num}
            onClick={() => {setPageNum(num); scrollToNews();}}
            className={pageNum === num ? styles.active_page : styles.page}
          >
            {num}
          </div>
        ))}

        {currentPosts.length > 20 && (
          <div onClick={() => {
              if (pageGroup === 0) return;

              setPageGroup(pageGroup - 1);
              setPageNum((pageGroup - 1) * PAGES_PER_GROUP + 1);
            }}
            className={pageGroup === 0 ? styles.page_arrow_disabled : styles.page_arrow}
          >
            <Arrow color={pageGroup === 0 ? '#888' : '#FFF'}/>
          </div>
        )}

        {currentPosts.length > 20 && (
          <div onClick={() => {
              if (endPage >= totalPage) return;

              setPageGroup(pageGroup + 1);
              setPageNum((pageGroup + 1) * PAGES_PER_GROUP + 1);
            }}
            className={endPage >= totalPage ? styles.page_arrow_disabled : styles.page_arrow}
            style={{transform:'rotate(180deg)'}}
          >
            <Arrow color={endPage >= totalPage ? '#888' : '#FFF'}/>
          </div>
        )}

      </div>
    </div>
  );
}
