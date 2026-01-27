import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      test 테스트
      <Link href="/testPage">testPage</Link>
    </div>
  );
}