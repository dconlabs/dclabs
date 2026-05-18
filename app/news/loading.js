"use client";

import Header from "../components/header";
import styles from "./[id]/detail.module.css";

export default function Loading() {
  return (
    <div className={styles.loading_page}>
      <Header />

      <div className={styles.loading_bar_container}>
        <div className={styles.loading_bar} />
      </div>
    </div>
  );
}