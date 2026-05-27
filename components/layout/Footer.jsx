import Link from 'next/link';

const NAVIGATION_LINKS = {
  Navigate: [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/products' },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
  Support: [
    { name: 'Size Guide', path: '/contact' },
    { name: 'Care Instructions', path: '/contact' },
    { name: 'Returns Policy', path: '/contact' },
    { name: 'FAQ', path: '/contact' },
  ],
  Legal: [
    { name: 'Privacy Policy', path: '/' },
    { name: 'Terms of Service', path: '/' },
    { name: 'Cookie Policy', path: '/' },
    { name: 'Sitemap', path: '/' },
  ],
};

export function Footer() {
  return (
    <footer style={{ background: '#111', color: '#fff', padding: '5rem 2rem 2rem' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '4rem',
          marginBottom: '4rem',
        }} className="footer-grid">
          
          <div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28,
              fontWeight: 400,
              letterSpacing: '0.12em',
              color: '#fff',
              marginBottom: 20,
            }}>
              LÀ PÚRÁNÉ
            </h3>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 15,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.9,
              maxWidth: 320,
              fontStyle: 'italic',
            }}>
              Luxury Indian fashion crafted with generations of artisan knowledge. Every thread tells a story. Every garment carries a heritage.
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
              {['Instagram', 'Pinterest', 'WhatsApp'].map(s => (
                <span key={s} style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 12,
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.5)',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(107,112,92,0.5)',
                  paddingBottom: 2,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {Object.entries(NAVIGATION_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 12,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#6B705C',
                marginBottom: 20,
              }}>
                {title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map(link => (
                  <Link key={link.name} href={link.path} style={{ textDecoration: 'none' }}>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 15,
                      color: 'rgba(255,255,255,0.5)',
                      textAlign: 'left',
                      padding: 0,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                      {link.name}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 13,
            color: 'rgba(255,255,255,0.4)',
            margin: 0,
          }}>
            © 2025 Là Púráné. All rights reserved. Crafted in India, worn worldwide.
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 13,
            color: 'rgba(255,255,255,0.3)',
            margin: 0,
            fontStyle: 'italic',
          }}>
            The art of wearing heritage
          </p>
        </div>
      </div>
    </footer>
  );
}