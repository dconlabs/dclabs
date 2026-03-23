'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const NAV_ITEMS = ['ABOUT', 'TEAM', 'OPPORTUNITY', 'NEWS'];

export default function Header() {
  const [activeSection, setActiveSection] = useState('');
  const router = useRouter();

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

        <div onClick={() => {
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

        <div className='header_nav'>
          {NAV_ITEMS.map((item) => (
            <div 
              key={item}
              onClick={() => scrollToSection(item)}
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
