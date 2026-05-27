"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '../../components/layout/Layout';
import { ProductCard } from '../../components/ui/ProductCard';
import { FadeUp } from '../../components/ui/FadeUp';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { formatPrice } from '../../utils/formatPrice';


export default function Products() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [search, setSearch] = useState('');

  let filtered = PRODUCTS.filter(p => activeCategory === 'All' || p.category === activeCategory);
  
  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }
  
  if (sortBy === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  }
  if (sortBy === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }
  if (sortBy === 'new') {
    filtered = [...filtered].filter(p => p.badge === 'New').concat(filtered.filter(p => p.badge !== 'New'));
  }

  const handleViewDetails = (product) => {
    router.push(`/product/${product.slug}`);
  };

  return (
    <Layout>
      <div style={{ paddingTop: 72 }}>
        {/* Header */}
        <div style={{ background: '#f5f3ef', padding: '5rem 2rem 4rem', textAlign: 'center' }}>
          <p style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 11, 
            letterSpacing: '0.3em', 
            color: '#6B705C', 
            textTransform: 'uppercase', 
            marginBottom: 16 
          }}>
            The Collection
          </p>
          <h1 style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 'clamp(36px,5vw,72px)', 
            fontWeight: 300, 
            color: '#111', 
            margin: 0 
          }}>
            All Pieces
          </h1>
        </div>

        {/* Filters */}
        <div style={{ 
          borderBottom: '1px solid rgba(0,0,0,0.08)', 
          padding: '1.5rem 2rem', 
          position: 'sticky', 
          top: 72, 
          background: 'rgba(255,255,255,0.97)', 
          backdropFilter: 'blur(20px)', 
          zIndex: 100 
        }}>
          <div style={{ 
            maxWidth: 1400, 
            margin: '0 auto', 
            display: 'flex', 
            gap: '1rem', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between' 
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)} 
                  style={{
                    background: activeCategory === cat ? '#111' : 'transparent',
                    border: '1px solid',
                    borderColor: activeCategory === cat ? '#111' : 'rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    padding: '7px 16px',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 12,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: activeCategory === cat ? '#fff' : '#666',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Search..." 
                style={{ 
                  padding: '8px 16px', 
                  border: '1px solid rgba(0,0,0,0.15)', 
                  background: 'transparent', 
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontSize: 14, 
                  outline: 'none', 
                  width: 160 
                }} 
              />
              <select 
                value={sortBy} 
                onChange={e => setSortBy(e.target.value)} 
                style={{ 
                  padding: '8px 16px', 
                  border: '1px solid rgba(0,0,0,0.15)', 
                  background: 'transparent', 
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontSize: 14, 
                  outline: 'none', 
                  cursor: 'pointer' 
                }}
              >
                <option value="default">Sort: Featured</option>
                <option value="new">Sort: New First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div style={{ padding: '4rem 2rem', maxWidth: 1400, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: '#999', marginBottom: '2rem' }}>
            {filtered.length} pieces
          </p>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '6rem 0' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: '#999' }}>No pieces found</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '2.5rem' }}>
              {filtered.map((product, i) => (
                <FadeUp key={product.id} delay={i * 0.05}>
                  <ProductCard product={product} onViewDetails={handleViewDetails} />
                </FadeUp>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}