'use client';

import { useRef, useEffect } from 'react';

export default function HorizontalScroll({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    const getItemWidth = () => {
      const first = container.children[0];
      if (!first) return 0;

      const style = window.getComputedStyle(container);
      const gap = parseInt(style.columnGap || style.gap) || 0;

      return first.offsetWidth + gap;
    };

    const getIndex = () => {
      const itemWidth = getItemWidth();
      if (!itemWidth) return 0;

      const style = window.getComputedStyle(container);
      const paddingLeft = parseInt(style.paddingLeft) || 0;

      return Math.round((container.scrollLeft - paddingLeft) / itemWidth);
    };

    const snapToIndex = (index) => {
      const itemWidth = getItemWidth();
      if (!itemWidth) return;

      container.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth',
      });
    };

    let startIndex = 0;

    const start = (pageX) => {
      isDown = true;
      startX = pageX;
      startScrollLeft = container.scrollLeft;
      startIndex = getIndex();
    };

    const move = (pageX) => {
      if (!isDown) return;

      const dx = pageX - startX;

      // 🔥 1:1로 따라오게 (떨림 방지)
      container.scrollLeft = startScrollLeft - dx;
    };

    const end = (pageX) => {
      if (!isDown) return;
      isDown = false;

      const dx = pageX - startX;
      const itemWidth = getItemWidth();
      if (!itemWidth) return;

      let targetIndex = startIndex;

      // 🔥 절반 기준
      if (dx > itemWidth / 2) {
        targetIndex = startIndex - 1;
      } else if (dx < -itemWidth / 2) {
        targetIndex = startIndex + 1;
      }

      snapToIndex(targetIndex);
    };

    // 마우스
    const onMouseDown = (e) => start(e.pageX);
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      move(e.pageX);
    };
    const onMouseUp = (e) => end(e.pageX);

    // 터치 (🔥 passive false 필수)
    const onTouchStart = (e) => start(e.touches[0].pageX);

    const onTouchMove = (e) => {
      if (!isDown) return;
      e.preventDefault(); // 🔥 이거 없으면 떨림 발생
      move(e.touches[0].pageX);
    };

    const onTouchEnd = (e) => {
      const touch = e.changedTouches[0];
      end(touch.pageX);
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mouseleave', onMouseUp);

    container.addEventListener('touchstart', onTouchStart, { passive: false });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd);
    container.addEventListener('touchcancel', onTouchEnd);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mouseleave', onMouseUp);

      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}