'use client'
import { Layout } from '../../components/layout/Layout';
import { FadeUp } from '../../components/ui/FadeUp';
import { SectionHeading } from '../../components/ui/SectionHeading';
import Link from 'next/link';

const TIMELINE = [
  { year: '2012', event: 'Founded in Indore', desc: 'Là Púráné was born in a small studio in Indore with a single belief: that Indian textile heritage deserved global luxury positioning.' },
  { year: '2015', event: 'First Bridal Collection', desc: 'Our debut bridal line, Rang Mahal, sold out within three days of launch and established our reputation for extraordinary craftsmanship.' },
  { year: '2018', event: 'Artisan Partnership Program', desc: 'We launched partnerships with fourteen weaving families across six states, guaranteeing fair wages and preserving endangered textile traditions.' },
  { year: '2021', event: 'International Recognition', desc: 'Là Púráné was featured in Vogue India, Harper\'s Bazaar, and the Condé Nast Traveller as one of India\'s defining luxury fashion voices.' },
  { year: '2024', event: 'Global Flagship', desc: 'Our first international exhibition in Paris, showcasing India\'s textile heritage to audiences who had never experienced its full depth and beauty.' },
];

export default function Order() {
  return (
    <Layout>
      <div>
        {/* About Hero */}
        <div style={{ position: 'relative', height: '80vh', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1800&q=90" alt="About" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '5rem 3rem' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: '0.3em', color: '#6B705C', textTransform: 'uppercase', marginBottom: 16 }}>
              Our Story
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(42px,7vw,90px)', fontWeight: 300, color: '#fff', lineHeight: 1, maxWidth: 800, letterSpacing: '0.02em' }}>
              A love letter to India's<br /><em>textile soul</em>
            </h1>
          </div>
        </div>

        {/* Mission */}
        <section style={{ padding: '8rem 2rem', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <FadeUp>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: '0.3em', color: '#6B705C', textTransform: 'uppercase', marginBottom: 32 }}>
              Philosophy
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px,3vw,38px)', fontWeight: 300, color: '#111', lineHeight: 1.5, marginBottom: 40, fontStyle: 'italic' }}>
              "We believe that a garment is not just clothing. It is a conversation between the hand that made it and the body that wears it. That conversation, when both parties are fully present, is what we call luxury."
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: '0.2em', color: '#6B705C', textTransform: 'uppercase' }}>
              — Founder, Là Púráné
            </p>
          </FadeUp>
        </section>

        {/* Story */}
        <section style={{ padding: '0 2rem 8rem', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="about-split">
            <FadeUp>
              <img src="https://images.unsplash.com/photo-1592878849122-facb97ed3dfd?w=900&q=85" alt="Craft" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }} />
            </FadeUp>
            <FadeUp delay={0.2}>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: '0.3em', color: '#6B705C', textTransform: 'uppercase', marginBottom: 20 }}>
                  Origin
                </p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,3vw,44px)', fontWeight: 400, color: '#111', lineHeight: 1.15, marginBottom: 28 }}>
                  Born from reverence, refined through rigour
                </h2>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: '#555', lineHeight: 1.9, marginBottom: 20 }}>
                  Là Púráné was founded by a designer who grew up watching her grandmother drape a saree with the precision of someone reciting a prayer. That early education — in the weight of cloth, the language of colour, the grammar of fold — became the foundation of everything we build.
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: '#555', lineHeight: 1.9, marginBottom: 20 }}>
                  The name itself is a devotion — the old, the ancient, the enduring. We believe that what has stood for centuries has earned its right to stand for centuries more. Our task is not to reinvent Indian textiles. Our task is to give them the stage they have always deserved.
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: '#555', lineHeight: 1.9 }}>
                  We work with over forty artisan families across India, from the weavers of Varanasi and Chanderi to the block-printers of Bagru and the kalamkari painters of Andhra Pradesh. Each collaboration is a partnership of equals — we bring design vision and market access; they bring centuries of accumulated knowledge that no design school can teach.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Timeline */}
        <section style={{ background: '#f5f3ef', padding: '8rem 2rem' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <SectionHeading label="Journey" title="Our Milestones" center />
            {TIMELINE.map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '3rem', paddingBottom: '3rem', marginBottom: '3rem', borderBottom: i < TIMELINE.length - 1 ? '1px solid rgba(107,112,92,0.2)' : 'none' }}>
                  <div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: '#6B705C', margin: 0 }}>
                      {item.year}
                    </p>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500, color: '#111', marginBottom: 12 }}>
                      {item.event}
                    </h3>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: '#666', lineHeight: 1.8 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '8rem 2rem', textAlign: 'center' }}>
          <FadeUp>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 300, color: '#111', marginBottom: 24 }}>
              Experience the Collection
            </h2>
            <Link href="/products">
              <button style={{ 
                background: '#111', 
                border: 'none', 
                cursor: 'pointer', 
                padding: '18px 52px', 
                fontFamily: "'Cormorant Garamond', serif", 
                fontSize: 14, 
                letterSpacing: '0.2em', 
                textTransform: 'uppercase', 
                color: '#fff' 
              }}>
                Shop Now
              </button>
            </Link>
          </FadeUp>
        </section>
      </div>
    </Layout>
  );
}