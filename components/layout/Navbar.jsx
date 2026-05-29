'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useScrollY } from '../../hooks/useScrollY';
import { useCart } from '../../contexts/CartContext';

const PAGES = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Products', path: '/products' },
  { name: 'Contact', path: '/contact' },
  
];

export function Navbar() {
  const router = useRouter();
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const solid = scrollY > 60 || menuOpen;

  const isActive = (path) => router.pathname === path;

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: solid ? 'rgba(255,255,255,0.97)' : 'transparent',
      backdropFilter: solid ? 'blur(20px)' : 'none',
      borderBottom: solid ? '1px solid rgba(107,112,92,0.12)' : 'none',
      transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
      padding: '0 2rem',
    }}>
      <div style={{
        maxWidth: 1400,
        minWidth:200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 72,
      }}>
        <Link href="/" style={{ textDecoration: 'none',display:'flex', justifyContent:'center', alignItems:'center' }}>
          <div  style={{
          height:'30px',
          width:'30px',
          marginRight:'10px'
          
        }} >

            <img src="/logo2.jpg" alt="La Purane - Luxury Indian fashion crafted with generations of artisan" className='h-12 w-12' />
          </div>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: '0.12em',
            color: solid ? '#111' : '#fff',
            transition: 'color 0.4s',
          }}>
            LÀ PÚRANE {/*  ÁNÉ */}
          </span>
        </Link>

        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }} className="nav-links-desktop">
          {PAGES.map(page => (
            <Link key={page.name} href={page.path} style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 15,
                letterSpacing: '0.14em',
                color: solid ? '#111' : '#fff',
                textTransform: 'uppercase',
                opacity: isActive(page.path) ? 1 : 0.7,
                borderBottom: isActive(page.path) ? '1px solid #6B705C' : '1px solid transparent',
                paddingBottom: 2,
                transition: 'all 0.3s',
              }}>
                {page.name}
              </button>
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Link  href="/cart"   style={{ textDecoration: 'none' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: 4 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={solid ? '#111' : '#fff'} strokeWidth="1.5" style={{ transition: 'stroke 0.4s' }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
               {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  background: '#6B705C',
                  color: '#fff',
                  borderRadius: '50%',
                  width: 16,
                  height: 16,
                  fontSize: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'sans-serif',
                }}>
                  {cartCount}
                </span>
              )} 
            </button>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            className="nav-hamburger"
          >
            <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  style={{
                    height: 1,
                    background: solid ? '#111' : '#fff',
                    transition: 'all 0.3s',
                    transform: menuOpen && i === 0 ? 'rotate(45deg) translate(4px,4px)' : menuOpen && i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none',
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </div>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          padding: '2rem',
          borderTop: '1px solid rgba(107,112,92,0.12)',
        }}>
          {PAGES.map((page, i) => (
            <Link key={page.path} href={page.path} style={{ textDecoration: 'none' }}>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 28,
                  letterSpacing: '0.08em',
                  color: '#111',
                  padding: '0.75rem 0',
                  borderBottom: i < PAGES.length - 1 ? '1px solid rgba(107,112,92,0.1)' : 'none',
                  textTransform: 'uppercase',
                }}
              >
                {page.name}
              </button>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}