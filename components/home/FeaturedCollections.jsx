import { ProductCard } from '../ui/ProductCard';
import { FadeUp } from '../ui/FadeUp';
import { SectionHeading } from '../ui/SectionHeading';
import { getFeaturedProducts } from '../../data/products';
import Link from 'next/link';

export function FeaturedCollections({ onViewDetails }) {
  const featured = getFeaturedProducts(4);

  return (
    <section style={{ padding: '8rem 2rem', maxWidth: 1400, margin: '0 auto' }}>
      <SectionHeading 
        label="Collections" 
        title="Crafted for the Discerning" 
        subtitle="Each collection is born from deep research into India's textile traditions, reinterpreted through a lens of contemporary luxury." 
        center 
      />
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', 
        gap: '2rem', 
        marginTop: '3rem' 
      }}>
        {featured.map((product, i) => (
          <FadeUp key={product.id} delay={i * 0.1}>
            <ProductCard product={product} onViewDetails={onViewDetails} />
          </FadeUp>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <Link href="/products">
          <button style={{ 
            background: 'none', 
            border: '1px solid #111', 
            cursor: 'pointer', 
            padding: '16px 52px', 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 13, 
            letterSpacing: '0.22em', 
            textTransform: 'uppercase', 
            color: '#111', 
            transition: 'all 0.3s' 
          }}>
            View All Pieces
          </button>
        </Link>
      </div>
    </section>
  );
}