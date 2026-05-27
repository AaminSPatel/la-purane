import { FadeUp } from './FadeUp';

export function SectionHeading({ label, title, subtitle, center = false }) {
  return (
    <FadeUp>
      <div style={{ textAlign: center ? 'center' : 'left', marginBottom: '3rem' }}>
        <p style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: 11, 
          letterSpacing: '0.3em', 
          color: '#6B705C', 
          textTransform: 'uppercase', 
          margin: '0 0 12px' 
        }}>
          {label}
        </p>
        <h2 style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: 'clamp(32px,4vw,52px)', 
          fontWeight: 400, 
          color: '#111', 
          margin: '0 0 16px', 
          lineHeight: 1.1, 
          letterSpacing: '0.02em' 
        }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 17, 
            color: '#777', 
            maxWidth: 560, 
            margin: center ? '0 auto' : 0, 
            lineHeight: 1.7, 
            fontStyle: 'italic' 
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </FadeUp>
  );
}