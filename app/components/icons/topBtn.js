"use client";

import styles from "../../news/[id]/detail.module.css";

export default function ScrollToTopBtn() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={handleClick}
    >
      <div className={styles.topbtn_wrapper}>
        <div className={styles.topbtn_container}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none">
          <path d="M0.376953 8.75781L7.37695 0.757812L14.377 8.75781" stroke="#E4FC28"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
