'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 1. 서버에 쿠키 삭제 요청
      await axios.post('/api/logout');

      // 2. 로그아웃 후 처리
      alert('로그아웃 되었습니다.');
      router.push('/');     // 메인으로 이동
      router.refresh();     // ★ 중요: 서버 컴포넌트 데이터(쿠키 상태) 새로고침
      
    } catch (error) {
      console.error('로그아웃 실패', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      로그아웃
    </button>
  );
}