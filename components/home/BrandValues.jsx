import { FadeUp } from '../ui/FadeUp';
import { BRAND_VALUES } from '../../data/brandValues';

export function BrandValues() {
  return (
    <section style={{ background: '#111', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: 11, 
              letterSpacing: '0.3em', 
              color: '#6B705C', 
              textTransform: 'uppercase', 
              marginBottom: 16 
            }}>
              Our Promise
            </p>
            <h2 style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: 'clamp(32px,4vw,56px)', 
              fontWeight: 300, 
              color: '#fff', 
              lineHeight: 1.1 
            }}>
              What We Stand For
            </h2>
          </div>
        </FadeUp>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', 
          gap: '3rem' 
        }}>
          {BRAND_VALUES.map((v, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div style={{ borderTop: '1px solid rgba(107,112,92,0.4)', paddingTop: 28 }}>
                <h3 style={{ 
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontSize: 22, 
                  fontWeight: 500, 
                  color: '#fff', 
                  marginBottom: 16, 
                  letterSpacing: '0.03em' 
                }}>
                  {v.title}
                </h3>
                <p style={{ 
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontSize: 15, 
                  color: 'rgba(255,255,255,0.6)', 
                  lineHeight: 1.8 
                }}>
                  {v.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}