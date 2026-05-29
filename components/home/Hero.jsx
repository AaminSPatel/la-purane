import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Hero() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 200);
  }, []);

  return (
    <div style={{ 
      position: 'relative', 
      height: '100vh', 
      minHeight: '500px',
      overflow: 'hidden' 
    }}>
      <img 
        src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1800&q=90" 
        alt="Hero" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          transform: 'scale(1.05)', 
          transition: 'transform 8s ease' 
        }} 
      />
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.5) 100%)' 
      }} />
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '1rem', 
        textAlign: 'center' 
      }}>
        <div style={{ 
          opacity: heroLoaded ? 1 : 0, 
          transform: heroLoaded ? 'translateY(0)' : 'translateY(30px)', 
          transition: 'all 1.2s cubic-bezier(0.4,0,0.2,1)',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <p style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 'clamp(10px, 3vw, 13px)', 
            letterSpacing: '0.3em', 
            color: 'rgba(255,255,255,0.8)', 
            textTransform: 'uppercase', 
            marginBottom: 'clamp(1rem, 4vw, 1.5rem)' 
          }}>
            New Collection — 2025
          </p>
          <h1 style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 'clamp(2.5rem, 10vw, 7.5rem)', 
            fontWeight: 300, 
            color: '#fff', 
            lineHeight: 1, 
            margin: '0 0 clamp(1rem, 4vw, 1.5rem)', 
            letterSpacing: '0.02em' 
          }}>
            The Art of<br /><em style={{ fontStyle: 'italic', fontWeight: 400 }}>Wearing</em><br />Heritage
          </h1>
          <p style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 'clamp(0.9rem, 4vw, 1.2rem)', 
            color: 'rgba(255,255,255,0.85)', 
            maxWidth: 'min(90%, 480px)', 
            margin: '0 auto clamp(1.5rem, 5vw, 2.5rem)', 
            lineHeight: 1.6, 
            fontStyle: 'italic' 
          }}>
            Where ancient craft meets contemporary vision. Handcrafted for those who understand that true luxury is time, skill, and intention.
          </p>
          <div style={{ 
            display: 'flex', 
            gap: 'clamp(0.75rem, 3vw, 1rem)', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            padding: '0 1rem',
          }}>
            <Link href="/products">
              <button style={{ 
                background: '#fff', 
                border: 'none', 
                cursor: 'pointer', 
                padding: 'clamp(0.75rem, 2.5vw, 1rem) clamp(1.5rem, 5vw, 2.75rem)', 
                fontFamily: "'Cormorant Garamond', serif", 
                fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)', 
                letterSpacing: '0.2em', 
                textTransform: 'uppercase', 
                color: '#111', 
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
              }}>
                Explore Collection
              </button>
            </Link>
            <Link href="/about">
              <button style={{ 
                background: 'transparent', 
                border: '1px solid rgba(255,255,255,0.6)', 
                cursor: 'pointer', 
                padding: 'clamp(0.75rem, 2.5vw, 1rem) clamp(1.5rem, 5vw, 2.75rem)', 
                fontFamily: "'Cormorant Garamond', serif", 
                fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)', 
                letterSpacing: '0.2em', 
                textTransform: 'uppercase', 
                color: '#fff', 
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
              }}>
                Our Story
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div style={{ 
        position: 'absolute', 
        bottom: 'clamp(1rem, 5vh, 2.5rem)', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '0.5rem' 
      }}>
        <span style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: 'clamp(8px, 2vw, 10px)', 
          letterSpacing: '0.3em', 
          color: 'rgba(255,255,255,0.6)', 
          textTransform: 'uppercase' 
        }}>
          Scroll
        </span>
        <div style={{ 
          width: '1px', 
          height: 'clamp(2rem, 8vh, 3rem)', 
          background: 'rgba(255,255,255,0.4)', 
          animation: 'scrollLine 2s ease-in-out infinite' 
        }} />
      </div>
    </div>
  );
}