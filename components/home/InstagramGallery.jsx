import { FadeUp } from '../ui/FadeUp';

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80",
  "https://images.unsplash.com/photo-1614251055880-ee96e4803393?w=400&q=80",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
  "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400&q=80",
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80",
  "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80",
];

export function InstagramGallery() {
  return (
    <section style={{ padding: '0 0 6rem' }}>
      <FadeUp>
        <p style={{ 
          textAlign: 'center', 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: 11, 
          letterSpacing: '0.3em', 
          color: '#6B705C', 
          textTransform: 'uppercase', 
          marginBottom: 40 
        }}>
          @lapurane — Follow Our World
        </p>
      </FadeUp>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 4 }} className="gallery-grid">
        {GALLERY_IMAGES.map((src, i) => (
          <div key={i} style={{ aspectRatio: '1', overflow: 'hidden', cursor: 'pointer' }}>
            <img 
              src={src} 
              alt="Gallery" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                transition: 'transform 0.6s ease' 
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        ))}
      </div>
    </section>
  );
}