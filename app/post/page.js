'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Post() {

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/admin", { title, contents });
    if (res.data.ok) {
      alert("등록되었습니다.");
      router.push("/");
    }
    else alert("잘못된 접근입니다.");
  }
  
  return (
    <div>
      post

      <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/>
      <input type="text" name="contents" onChange={(e) => setContents(e.target.value)}/>
      <button onClick={handleSubmit}>Submit</button>

    </div>
  );
}