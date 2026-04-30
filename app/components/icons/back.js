import styles from "../../news/[id]/detail.module.css";

export default function Back() {
  return (
    <svg
      className={styles.back_icon}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" fill="#1c1c1c"/>
      <path
        d="M18.8214 32L21.1071 29.7126L13.1786 21.652H33V18.3116H13.1786L21.1071 10.2874L18.8214 8L7 19.9818L18.8214 32Z"
        fill="white"
      />
    </svg>
  );
}
