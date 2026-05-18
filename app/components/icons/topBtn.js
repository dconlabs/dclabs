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
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path d="M-5.7228e-07 7.27473L1.33434 8.68132L6.03631 3.8022L6.03631 16L7.98487 16L7.98487 3.8022L12.6657 8.68132L14 7.27473L7.01059 6.48157e-07L-5.7228e-07 7.27473Z" fill="#E4FC28"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
