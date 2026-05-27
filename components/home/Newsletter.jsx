import { FadeUp } from '../ui/FadeUp';
import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section style={{ background: '#6B705C', padding: '7rem 2rem', textAlign: 'center' }}>
      <FadeUp>
        <p style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: 11, 
          letterSpacing: '0.3em', 
          color: 'rgba(255,255,255,0.7)', 
          textTransform: 'uppercase', 
          marginBottom: 20 
        }}>
          Stay Close
        </p>
        <h2 style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: 'clamp(28px,4vw,52px)', 
          fontWeight: 300, 
          color: '#fff', 
          marginBottom: 16, 
          lineHeight: 1.1 
        }}>
          Letters from the Atelier
        </h2>
        <p style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: 17, 
          color: 'rgba(255,255,255,0.75)', 
          maxWidth: 480, 
          margin: '0 auto 40px', 
          fontStyle: 'italic', 
          lineHeight: 1.7 
        }}>
          Receive exclusive previews, artisan stories, and first access to new collections. We write rarely — and only when we have something worth sharing.
        </p>
        <div style={{ display: 'flex', gap: 0, maxWidth: 480, margin: '0 auto', justifyContent: 'center' }}>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address" 
            style={{ 
              flex: 1, 
              padding: '16px 20px', 
              border: 'none', 
              background: 'rgba(255,255,255,0.15)', 
              color: '#fff', 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: 15, 
              outline: 'none', 
              backdropFilter: 'blur(10px)' 
            }} 
          />
          <button 
            onClick={handleSubscribe}
            style={{ 
              background: '#fff', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '16px 28px', 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: 13, 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase', 
              color: '#6B705C', 
              whiteSpace: 'nowrap' 
            }}>
            {subscribed ? 'Subscribed!' : 'Subscribe'}
          </button>
        </div>
      </FadeUp>
    </section>
  );
}