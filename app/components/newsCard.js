'use client'

import axios from "axios";
import { useRouter } from "next/navigation";

export default function NewsCard({ newsData }) {

  const router = useRouter();

  const deletePost = async (id) => {
    console.log(id);
    const res = await axios.delete("/api/admin", { data: { id: id } });
    if (res.data.ok) {
      alert("삭제되었습니다.");
      router.push("/");
    }
    else alert("잘못된 접근입니다.");
  }

  return (
    <div>
      {newsData.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.contents}</p>
          <button onClick={() => deletePost(post._id)}>삭제</button>
        </div>
      ))}
    </div>
  );
}