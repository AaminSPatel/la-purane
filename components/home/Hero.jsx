'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Hero() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 200);
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
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
        padding: '0 2rem', 
        textAlign: 'center' 
      }}>
        <div style={{ 
          opacity: heroLoaded ? 1 : 0, 
          transform: heroLoaded ? 'translateY(0)' : 'translateY(30px)', 
          transition: 'all 1.2s cubic-bezier(0.4,0,0.2,1)' 
        }}>
          <p style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 'clamp(11px,1.2vw,13px)', 
            letterSpacing: '0.4em', 
            color: 'rgba(255,255,255,0.8)', 
            textTransform: 'uppercase', 
            marginBottom: 24 
          }}>
            New Collection — 2025
          </p>
          <h1 style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 'clamp(52px,9vw,120px)', 
            fontWeight: 300, 
            color: '#fff', 
            lineHeight: 0.95, 
            margin: '0 0 24px', 
            letterSpacing: '0.03em' 
          }}>
            The Art of<br /><em style={{ fontStyle: 'italic', fontWeight: 400 }}>Wearing</em><br />Heritage
          </h1>
          <p style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 'clamp(15px,1.5vw,19px)', 
            color: 'rgba(255,255,255,0.85)', 
            maxWidth: 480, 
            margin: '0 auto 40px', 
            lineHeight: 1.7, 
            fontStyle: 'italic' 
          }}>
            Where ancient craft meets contemporary vision. Handcrafted for those who understand that true luxury is time, skill, and intention.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products">
              <button style={{ 
                background: '#fff', 
                border: 'none', 
                cursor: 'pointer', 
                padding: '16px 44px', 
                fontFamily: "'Cormorant Garamond', serif", 
                fontSize: 14, 
                letterSpacing: '0.2em', 
                textTransform: 'uppercase', 
                color: '#111', 
                transition: 'all 0.3s' 
              }}>
                Explore Collection
              </button>
            </Link>
            <Link href="/about">
              <button style={{ 
                background: 'transparent', 
                border: '1px solid rgba(255,255,255,0.6)', 
                cursor: 'pointer', 
                padding: '16px 44px', 
                fontFamily: "'Cormorant Garamond', serif", 
                fontSize: 14, 
                letterSpacing: '0.2em', 
                textTransform: 'uppercase', 
                color: '#fff', 
                transition: 'all 0.3s' 
              }}>
                Our Story
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div style={{ 
        position: 'absolute', 
        bottom: 40, 
        left: '50%', 
        transform: 'translateX(-50%)', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 8 
      }}>
        <span style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: 10, 
          letterSpacing: '0.3em', 
          color: 'rgba(255,255,255,0.6)', 
          textTransform: 'uppercase' 
        }}>
          Scroll
        </span>
        <div style={{ 
          width: 1, 
          height: 48, 
          background: 'rgba(255,255,255,0.4)', 
          animation: 'scrollLine 2s ease-in-out infinite' 
        }} />
      </div>
    </div>
  );
}