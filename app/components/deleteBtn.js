'use client'

import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteBtn({ id, url }) {

  const router = useRouter();

  const deletePost = async (id, url) => {

    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const res = await axios.delete(url, { 
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
      <button onClick={() => deletePost(id, url)} 
        style={{
          color: '#ff5e5eff',
          background:'#222',
          width:'89px',
          height:'41px',
          fontSize: '16px',
          fontWeight: 400,
          border: '1px solid #ff5e5eff',
          fontFamily: 'pretendard',
        }}>삭제하기</button>
    </div>
  );
}