'use client'

import axios from "axios";
import { useState } from 'react';
import { useRouter } from "next/navigation";


export default function Login() {

  const router = useRouter();

  const [pw, setPw] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const isValid = pw.length > 0;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', { password: pw });
      if (res.status === 200) {
        alert('관리자 로그인 되었습니다.');
        router.push('/');
        router.refresh();
      } else {
        alert(res.data.error);
      }
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  return (
      <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
        <div style={{fontSize:'18px'}}>🔒 관리자 로그인</div>
        <input
          type="password"
          placeholder='패스키를 입력해주세요.'
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin(e);
            }
          }}
          style={{
            width: "300px",
            padding: "14px 20px",
            outline: "none",
            backgroundColor: "#1c1c1c",
            color: "#ffffff",
            fontSize: "16px",
            transition: "all 0.4s ease",
            border: isFocus ? "0.5px solid #e4fc28" : "0.5px solid #888888",
          }}
        />
        <button onClick={handleLogin} style={{
          fontSize:'16px',
          outline:'none',
          border: 'none',
          cursor: isValid ? 'pointer' : 'not-allowed',
          backgroundColor: isValid ? '#e4fc28' : '#444',
          color: isValid ? '#000' : '#aaa',
          width: '80px',
          height: '40px',
          transition: 'all 0.4s ease',
          }}>
            로그인
          </button>
      </div>
  );
}