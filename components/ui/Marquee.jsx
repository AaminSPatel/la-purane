export function Marquee() {
  const items = ["Handcrafted in India", "Pure Natural Fibres", "Artisan-Made", "Luxury Redefined", "Woven Heritage", "Slow Fashion", "Ethical Luxury"];
  
  return (
    <div style={{ 
      overflow: 'hidden', 
      background: '#6B705C', 
      padding: '14px 0', 
      borderTop: '1px solid rgba(255,255,255,0.1)' 
    }}>
      <div style={{ 
        display: 'flex', 
        gap: 60, 
        whiteSpace: 'nowrap', 
        animation: 'marquee 22s linear infinite' 
      }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 13, 
            letterSpacing: '0.25em', 
            color: 'rgba(255,255,255,0.9)', 
            textTransform: 'uppercase' 
          }}>
            {item} &nbsp;◆
          </span>
        ))}
      </div>
    </div>
  );
}