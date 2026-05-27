import { FadeUp } from '../ui/FadeUp';
import { SectionHeading } from '../ui/SectionHeading';
import { TESTIMONIALS } from '../../data/testimonials';

export function Testimonials() {
  return (
    <section style={{ padding: '8rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
      <SectionHeading label="Voices" title="What Our Patrons Say" center />
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', 
        gap: '2rem' 
      }}>
        {TESTIMONIALS.map((t, i) => (
          <FadeUp key={i} delay={i * 0.1}>
            <div style={{ background: '#f8f7f4', padding: '2.5rem', borderBottom: '3px solid #6B705C' }}>
              <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
                {Array(t.rating).fill(0).map((_, j) => (
                  <span key={j} style={{ color: '#6B705C', fontSize: 14 }}>★</span>
                ))}
              </div>
              <p style={{ 
                fontFamily: "'Cormorant Garamond', serif", 
                fontSize: 17, 
                color: '#333', 
                lineHeight: 1.8, 
                fontStyle: 'italic', 
                marginBottom: 24 
              }}>
                "{t.text}"
              </p>
              <div>
                <p style={{ 
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontSize: 15, 
                  fontWeight: 600, 
                  color: '#111', 
                  margin: 0 
                }}>
                  {t.name}
                </p>
                <p style={{ 
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontSize: 13, 
                  color: '#999', 
                  margin: '4px 0 0' 
                }}>
                  {t.location}
                </p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}