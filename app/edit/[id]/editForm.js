'use client'

import { useState } from "react";

export default function EditForm({ post }) {

  const [title, setTitle] = useState(post.title);
  const [contents, setContents] = useState(post.contents);

  return (
    <div>
      <div>
        <input type="text" value={post.title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={post.contents} onChange={(e) => setContents(e.target.value)} />
      </div>
      {post.images && post.images.length > 0 && (
        post.images.map((imgUrl, idx) => (
          <img key={idx} src={imgUrl} alt="" style={{ width: '300px', height: '300px', objectFit: 'cover', marginRight: '20px' }} />
        ))
      )}
      <button>수정</button>
    </div>
  );
}