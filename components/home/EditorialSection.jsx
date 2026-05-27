import { FadeUp } from '../ui/FadeUp';
import Link from 'next/link';

export function EditorialSection() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80vh' }} className="editorial-split">
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img 
          src="https://images.unsplash.com/photo-1614251055880-ee96e4803393?w=1200&q=85" 
          alt="Editorial" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            transition: 'transform 8s ease', 
            transform: 'scale(1.03)' 
          }} 
        />
      </div>
      <div style={{ 
        background: '#f5f3ef', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '5rem 4rem' 
      }}>
        <FadeUp>
          <p style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 11, 
            letterSpacing: '0.3em', 
            color: '#6B705C', 
            textTransform: 'uppercase', 
            marginBottom: 24 
          }}>
            The Craft
          </p>
          <h2 style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 'clamp(32px,3.5vw,52px)', 
            fontWeight: 300, 
            color: '#111', 
            lineHeight: 1.1, 
            marginBottom: 28 
          }}>
            Generations of mastery in every thread
          </h2>
          <p style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 17, 
            color: '#555', 
            lineHeight: 1.9, 
            marginBottom: 16, 
            fontStyle: 'italic' 
          }}>
            We partner with weaving families in Varanasi, Lucknow, Surat, and Jaipur — communities where the knowledge of craft passes from mother to daughter, father to son, without interruption for five hundred years.
          </p>
          <p style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 16, 
            color: '#666', 
            lineHeight: 1.8, 
            marginBottom: 36 
          }}>
            When you wear Là Púráné, you are wearing a living document of Indian civilisation. Every pattern has a name and a history. Every dye has a source. Every knot is the expression of a human hand that knows exactly what it is doing.
          </p>
          <Link href="/about">
            <button style={{ 
              background: 'none', 
              border: '1px solid #6B705C', 
              cursor: 'pointer', 
              padding: '14px 40px', 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: 13, 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase', 
              color: '#6B705C', 
              alignSelf: 'flex-start', 
              transition: 'all 0.3s' 
            }}>
              Read Our Story
            </button>
          </Link>
        </FadeUp>
      </div>
    </div>
  );
}