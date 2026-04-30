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
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
        <path d="M4.29068e-07 8.18407L1.52496 9.76648L6.89864 4.27747L6.89864 18L9.12557 18L9.12557 4.27747L14.475 9.76648L16 8.18407L8.0121 -3.49162e-07L4.29068e-07 8.18407Z" fill="#E4FC28"/>
      </svg>
    </div>
  );
}
