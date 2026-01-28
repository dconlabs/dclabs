'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewsCard({ newsData, token }) {

  const router = useRouter();

  const deletePost = async (id) => {

    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const res = await axios.delete("/api/admin", { 
        data: { id: id } 
      });

      if (res.data.ok) {
        alert("삭제되었습니다.");
        router.push("/");
        router.refresh();
      } else {
        alert("삭제 실패: " + (res.data.error || "권한이 없습니다."));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('게시글 삭제 실패');
    }
  }

  return (
    <div>
      {newsData.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.contents}</p>
          {post.images && post.images.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
              {post.images.map((imgUrl, idx) => (
                <img 
                  key={idx} 
                  src={imgUrl} 
                  alt={`post-img-${idx}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} 
                />
              ))}
            </div>
          )}
          {
            token ? <button onClick={() => deletePost(post._id)} >삭제</button> : null
          }
        </div>
      ))}
    </div>
  );
}