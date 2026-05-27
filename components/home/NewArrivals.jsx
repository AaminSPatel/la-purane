'use client'
import { ProductCard } from '../ui/ProductCard';
import { FadeUp } from '../ui/FadeUp';
import { SectionHeading } from '../ui/SectionHeading';
import { getNewArrivals } from '../../data/products';

export function NewArrivals({ onViewDetails }) {
  const newArrivals = getNewArrivals();

  return (
    <section style={{ padding: '8rem 2rem', maxWidth: 1400, margin: '0 auto' }}>
      <SectionHeading 
        label="New Arrivals" 
        title="Just Added" 
        subtitle="The newest expressions of Là Púráné's ongoing dialogue between India's past and the world's present." 
      />
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', 
        gap: '1.5rem' 
      }}>
        {newArrivals.map((product, i) => (
          <FadeUp key={product.id} delay={i * 0.08}>
            <ProductCard product={product} onViewDetails={onViewDetails} />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}