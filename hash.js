import bcrypt from "bcryptjs";

const password = "inje2026"; // 실제 관리자 비번

const hash = await bcrypt.hash(password, 10);
console.log(hash);