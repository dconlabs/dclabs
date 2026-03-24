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

  // ✅ 페이지 상태
  const [pageNum, setPageNum] = useState(1);
  const [pageGroup, setPageGroup] = useState(0); // 0: 1~5, 1: 6~10

  const POSTS_PER_PAGE = 4;
  const PAGES_PER_GROUP = 5;

  const totalPage = Math.ceil(filtered.length / POSTS_PER_PAGE);

  // ✅ 현재 페이지 데이터
  const startIndex = (pageNum - 1) * POSTS_PER_PAGE;
  const currentPosts = filtered.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // ✅ 현재 그룹 페이지 번호 리스트
  const startPage = pageGroup * PAGES_PER_GROUP + 1;
  const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPage);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{marginTop:'60px'}}>

      {/* 카테고리 */}
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

      {/* 게시글 */}
      {currentPosts.map((post) => (
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

      <div className={styles.pagination}>

        {pageNumbers.map((num) => (
          <div key={num}
            onClick={() => setPageNum(num)}
            className={pageNum === num ? styles.active_page : styles.page}
          >
            {num}
          </div>
        ))}

        <div onClick={() => {
            if (pageGroup === 0) return;

            setPageGroup(pageGroup - 1);
            setPageNum((pageGroup - 1) * PAGES_PER_GROUP + 1);
          }}
          className={pageGroup === 0 ? styles.page_arrow_disabled : styles.page_arrow}
        >
          <Arrow color={pageGroup === 0 ? '#888' : '#FFF'}/>
        </div>

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

      </div>
    </div>
  );
}
