'use client'

import { useEffect } from 'react';

export default function ScrollObserver() {
  useEffect(() => {
    
    const elements = document.querySelectorAll('.observe_wrapper');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const content = entry.target.querySelector('.observe_content');
            if (content) {
              content.classList.add('show');
            }
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}