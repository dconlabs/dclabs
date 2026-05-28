'use client'

import axios from "axios";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewsClientComp({ newsData }) {

  const [posts, setPosts] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const sorted = [...newsData].sort((a, b) => b.order - a.order);
    setPosts(sorted);
  }, [newsData]);


  const moveUp = (id) => {
    const index = posts.findIndex(post => post._id === id);
    if (index === 0) return;
    const updated = [...posts];
    [updated[index - 1], updated[index]] =
    [updated[index], updated[index - 1]];
    setPosts(updated);
  };


  const moveDown = (id) => {
    const index = posts.findIndex(post => post._id === id);
    if (index === posts.length - 1) return;
    const updated = [...posts];
    [updated[index], updated[index + 1]] =
    [updated[index + 1], updated[index]];
    setPosts(updated);
  };

  // 드래그
  const [dragIndex, setDragIndex] = useState(null);

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDrop = (dropIndex) => {
    if (dragIndex === null) return;
    const updated = [...posts];
    const draggedItem = updated[dragIndex];
    updated.splice(dragIndex, 1);
    updated.splice(dropIndex, 0, draggedItem);
    setDragIndex(null);
    setPosts(updated);
  };

  // 저장
  const saveOrder = async () => {
    try {
      setIsSaving(true);
      await axios.put('/api/admin/reorder', {
        posts: posts.map((post, index) => ({
          id: post._id,
          order: posts.length - 1 - index
        }))
      });
      alert('순서가 저장되었습니다.');
      router.push("/");
    } catch (err) {
      console.error(err);
      alert('저장 실패');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.main_container}>
      <div>

        <div style={{marginBottom:'40px'}}>
          <div style={{fontSize:'32px', fontWeight:'700'}}>뉴스 정렬 관리자 페이지</div>
          <div style={{marginTop:'20px', color:'#888'}}>
            드래그 혹은 버튼으로 순서 변경이 가능합니다. 위로 올라올 수록 최신순입니다.
          </div>

          <div onClick={saveOrder}
            style={{
              marginTop:'30px',
              padding:'12px 24px',
              cursor:'pointer',
              display:'inline-block',
              border:'1px solid #888'
            }}
          >
            {isSaving ? '저장 중...' : '순서 저장하기'}
          </div>
        </div>

        {posts.map((post, index) => (
          <div
            key={post._id}
            className={styles.newsSort_container}

            draggable

            onDragStart={(e) => {
              handleDragStart(index);
              e.currentTarget.style.opacity = '0.4';
              e.currentTarget.style.transform = 'scale(0.98)';
            }}

            onDragEnd={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}

            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.style.border = '1px solid #fff';
            }}

            onDragLeave={(e) => {
              e.currentTarget.style.borderTop = '1px solid #888';
              e.currentTarget.style.borderBottom = '1px solid #888';
              e.currentTarget.style.borderLeft = 'none';
              e.currentTarget.style.borderRight = 'none';
            }}

            onDrop={(e) => {
              handleDrop(index);
              e.currentTarget.style.borderTop = '1px solid #888';
              e.currentTarget.style.borderBottom = '1px solid #888';
              e.currentTarget.style.borderLeft = 'none';
              e.currentTarget.style.borderRight = 'none';
            }}

            style={{
              transition: '0.2s ease',
              cursor: 'grab',
              padding: '24px',
            }}
          >
            <div>
              <div style={{fontSize:'24px', fontWeight:'700'}}>{post.title}</div>
              <div className={styles.news_card_date} style={{ marginTop:'20px' }}>
                {post.uploadDate}
              </div>
              <div style={{marginTop:'20px', display:'flex', gap:'10px', alignItems:'center'}}>
                <div onClick={() => moveUp(post._id)} className={styles.newsSort_btn}>↑ 위로</div>
                <div onClick={() => moveDown(post._id)} className={styles.newsSort_btn}>↓ 아래로</div>
              </div>
            </div>

            {post.images && post.images.length > 0 && (
              <img src={post.images[0]} style={{width:'300px'}}/>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}