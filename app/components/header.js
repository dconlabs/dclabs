'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';

const NAV_ITEMS = ['ABOUT', 'TEAM', 'OPPORTUNITY', 'NEWS'];

export default function Header() {
  const [activeSection, setActiveSection] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      setActiveSection(id);
    }
  };

  const handleNavClick = (item) => {
    if (pathname !== '/') {
      // ✅ 이동 전에 저장
      sessionStorage.setItem('target-section', item);
      router.push('/');
    } else {
      scrollToSection(item);
    }
  };

  // ✅ 홈 진입 시 실행
  useEffect(() => {
    if (pathname === '/') {
      const target = sessionStorage.getItem('target-section');

      if (target) {
        const tryScroll = () => {
          const el = document.getElementById(target);

          if (el) {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });

            setActiveSection(target);
            sessionStorage.removeItem('target-section');
          } else {
            // DOM 아직 안 떴으면 다시 시도
            setTimeout(tryScroll, 100);
          }
        };

        setTimeout(tryScroll, 100);
      }
    }
  }, [pathname]);

  // 기존 IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0,
      }
    );

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item);
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className='header'>
      <div className='header_container'>

        {/* 로고 */}
        <div
          onClick={() => {
            router.push('/');
            setActiveSection('');

            requestAnimationFrame(() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            });
          }}
          style={{ cursor: 'pointer' }}
        >
          <img src='/logo.png' height={80} alt="logo" />
        </div>

        {/* 네비 */}
        <div className='header_nav'>
          {NAV_ITEMS.map((item) => (
            <div 
              key={item}
              onClick={() => handleNavClick(item)}
              className={activeSection === item ? 'active' : ''}
              style={{ cursor: 'pointer' }}
            >
              {item}
            </div>
          ))}
        </div>

      </div>
    </header>
  )
}
