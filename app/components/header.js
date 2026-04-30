'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import Hamburger from './icons/hamburger';
import Close from './icons/close';

const NAV_ITEMS = ['EDUCATION', 'TEAM', 'OPPORTUNITIES', 'NEWS'];

export default function Header() {
  const [activeSection, setActiveSection] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      isClickScrolling.current = true;
      setActiveSection(id);

      const headerHeight = 200; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (item) => {
    if (pathname !== '/') {
      sessionStorage.setItem('target-section', item);
      router.push('/');
    } else {
      scrollToSection(item);
    }
  };

  useEffect(() => {
    if (pathname === '/') {
      const target = sessionStorage.getItem('target-section');

      if (target) {
        const tryScroll = () => {
          const el = document.getElementById(target);

          if (el) {
            isClickScrolling.current = true;
            setActiveSection(target);

            const headerHeight = 200;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            sessionStorage.clear();
          } else {
            setTimeout(tryScroll, 100);
          }
        };

        setTimeout(tryScroll, 100);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isClickScrolling.current) {
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
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        isClickScrolling.current = false; 
      }, 100);

      if (window.scrollY < 200 && !isClickScrolling.current) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <>
      {hamburgerOpen && (
        <div
          className='mobile_hamburger_background' 
          onClick={() => setHamburgerOpen(false)} 
        />
      )}
        
      <header className='header'>
        <div className='header_container'>
          <div
            onClick={() => {
              router.push('/');
              isClickScrolling.current = true;
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
            <img src='/logo.png' alt="logo" className='logo_size' />
          </div>

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
          
          <div className='header_nav_mobile'>
            <div onClick={() => setHamburgerOpen(!hamburgerOpen)} style={{cursor:'pointer'}}>
              <Hamburger />
            </div>
          </div>
        </div>
      </header>

      <div className={`mobile_header ${hamburgerOpen ? 'open' : ''}`}>
        <div onClick={() => setHamburgerOpen(false)} className='close_btn hamburger_close_btn'>
          <Close />
        </div>
        <div className='mobile_header_nav'>
          <div className='mobile_header_nav_items'>
            {NAV_ITEMS.map((item) => (
              <div 
                key={item}
                onClick={() => {
                  handleNavClick(item);
                  setHamburgerOpen(false);
                }}
                className={`mobile_header_item ${activeSection === item ? 'active' : ''}`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}