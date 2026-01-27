import { NextResponse } from 'next/server';
import connectDB from '@/lib/db'; // ★ 본인의 DB 연결 파일 경로 확인
import bcrypt from 'bcryptjs'; // ★ bcryptjs 사용 필수
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { password } = await request.json();

    // 1. DB 연결
    const client = await connectDB;
    const db = client.db('news');

    // 2. 관리자 정보 가져오기
    const adminUser = await db.collection('admins').findOne({});

    if (!adminUser) {
      return NextResponse.json({ message: '관리자 계정 없음' }, { status: 404 });
    }

    console.log("--- 디버깅 ---");
    console.log("입력한 비번:", password);
    console.log("DB 해시값:", adminUser.password);
    
    // 3. 비밀번호 검증
    const isValid = await bcrypt.compare(password, adminUser.password);
    console.log("일치 여부:", isValid); // 여기가 false면 해시값이 잘못된 것

    if (!isValid) {
      return NextResponse.json({ message: '비밀번호를 다시 확인해주세요.' }, { status: 401 });
    }

    // 4. 토큰 생성
    const token = jwt.sign(
      { role: 'admin' }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    // 5. 응답 및 쿠키 설정
    const response = NextResponse.json({ message: '로그인 성공' }, { status: 200 });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: false, // 개발환경에선 false 처리
      sameSite: 'lax', // strict는 개발환경에서 가끔 쿠키 저장 막힘
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: '서버 에러', error: error.message }, { status: 500 });
  }
}