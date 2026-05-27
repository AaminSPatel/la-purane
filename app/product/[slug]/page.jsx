'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import { Layout } from '../../../components/layout/Layout';
import { ProductCard } from '../../../components/ui/ProductCard';
import { FadeUp } from '../../../components/ui/FadeUp';
import { SectionHeading } from '../../../components/ui/SectionHeading';
import { useCart } from '../../../contexts/CartContext';
import { getProductBySlug, getRelatedProducts } from '../../../data/products';
import { formatPrice } from '../../../utils/formatPrice';


export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { addToCart } = useCart();
  
  const product = getProductBySlug(slug);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[1] || product?.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [qty, setQty] = useState(1);
  const [mainImg, setMainImg] = useState(product?.image);
  const [adding, setAdding] = useState(false);
  const [tab, setTab] = useState('description');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [zoom, setZoom] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div style={{ paddingTop: 72, textAlign: 'center', padding: '10rem 2rem' }}>
          <h1>Product not found</h1>
          <Link href="/products">Back to Products</Link>
        </div>
      </Layout>
    );
  }

  const related = getRelatedProducts(product, 4);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAdd = () => {
    setAdding(true);
    addToCart({ ...product, selectedSize, selectedColor, quantity: qty });
    setTimeout(() => setAdding(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, selectedSize, selectedColor, quantity: qty });
    router.push('/order');
  };

  return (
    <Layout>
      <div style={{ paddingTop: 72 }}>
        {/* Breadcrumb */}
        <div style={{ padding: '1.5rem 2rem', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: '0.12em', color: '#999', textTransform: 'uppercase' }}>
                Home
              </span>
            </Link>
            <span style={{ color: '#ccc', fontSize: 12 }}>/</span>
            <Link href="/products" style={{ textDecoration: 'none' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: '0.12em', color: '#999', textTransform: 'uppercase' }}>
                Collection
              </span>
            </Link>
            <span style={{ color: '#ccc', fontSize: 12 }}>/</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: '0.12em', color: '#111', textTransform: 'uppercase' }}>
              {product.name}
            </span>
          </div>
        </div>

        {/* Main */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '4rem', 
          padding: '2rem 2rem 6rem', 
          maxWidth: 1400, 
          margin: '0 auto' 
        }} className="product-detail-grid">
          
          {/* Images */}
          <div>
            <div 
              style={{ 
                position: 'relative', 
                overflow: 'hidden', 
                aspectRatio: '3/4', 
                cursor: zoom ? 'zoom-out' : 'zoom-in' 
              }} 
              onClick={() => setZoom(!zoom)}
            >
              <img 
                src={mainImg} 
                alt={product.name} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  transition: 'transform 0.5s ease', 
                  transform: zoom ? 'scale(1.4)' : 'scale(1)' 
                }} 
              />
              {discount > 0 && (
                <span style={{ 
                  position: 'absolute', 
                  top: 16, 
                  right: 16, 
                  background: '#c0392b', 
                  color: '#fff', 
                  fontSize: 12, 
                  fontFamily: "'Cormorant Garamond', serif", 
                  letterSpacing: '0.1em', 
                  padding: '4px 10px' 
                }}>
                  -{discount}%
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              {[product.image, product.image2].map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setMainImg(img)} 
                  style={{ 
                    width: 80, 
                    height: 100, 
                    overflow: 'hidden', 
                    cursor: 'pointer', 
                    border: mainImg === img ? '2px solid #6B705C' : '2px solid transparent', 
                    transition: 'border 0.2s' 
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: 11, 
              letterSpacing: '0.25em', 
              color: '#6B705C', 
              textTransform: 'uppercase', 
              marginBottom: 12 
            }}>
              {product.category}
            </p>
            <h1 style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: 'clamp(28px,3vw,44px)', 
              fontWeight: 400, 
              color: '#111', 
              lineHeight: 1.1, 
              marginBottom: 20 
            }}>
              {product.name}
            </h1>
            <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', marginBottom: 8 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: '#111' }}>
                {formatPrice(product.price)}
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: '#999', textDecoration: 'line-through' }}>
                {formatPrice(product.originalPrice)}
              </span>
            </div>
            <p style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: 13, 
              color: '#6B705C', 
              fontStyle: 'italic', 
              marginBottom: 32 
            }}>
              {product.story}
            </p>

            {/* Color */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ 
                fontFamily: "'Cormorant Garamond', serif", 
                fontSize: 13, 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase', 
                color: '#555', 
                marginBottom: 12 
              }}>
                Colour: <strong style={{ color: '#111' }}>{selectedColor}</strong>
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {product.colors.map(c => (
                  <button 
                    key={c} 
                    onClick={() => setSelectedColor(c)} 
                    style={{ 
                      padding: '6px 16px', 
                      border: selectedColor === c ? '1px solid #111' : '1px solid rgba(0,0,0,0.2)', 
                      background: 'transparent', 
                      cursor: 'pointer', 
                      fontFamily: "'Cormorant Garamond', serif", 
                      fontSize: 13, 
                      color: selectedColor === c ? '#111' : '#888', 
                      transition: 'all 0.2s' 
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <p style={{ 
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontSize: 13, 
                  letterSpacing: '0.15em', 
                  textTransform: 'uppercase', 
                  color: '#555', 
                  margin: 0 
                }}>
                  Size: <strong style={{ color: '#111' }}>{selectedSize}</strong>
                </p>
                <button 
                  onClick={() => setShowSizeGuide(true)} 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    fontFamily: "'Cormorant Garamond', serif", 
                    fontSize: 13, 
                    color: '#6B705C', 
                    textDecoration: 'underline' 
                  }}
                >
                  Size Guide
                </button>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.sizes.map(s => (
                  <button 
                    key={s} 
                    onClick={() => setSelectedSize(s)} 
                    style={{ 
                      width: 52, 
                      height: 52, 
                      border: selectedSize === s ? '1px solid #111' : '1px solid rgba(0,0,0,0.2)', 
                      background: selectedSize === s ? '#111' : 'transparent', 
                      cursor: 'pointer', 
                      fontFamily: "'Cormorant Garamond', serif", 
                      fontSize: 14, 
                      color: selectedSize === s ? '#fff' : '#666', 
                      transition: 'all 0.2s' 
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 32, alignItems: 'stretch' }}>
              <div style={{ display: 'flex', border: '1px solid rgba(0,0,0,0.2)', alignItems: 'center' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 44, height: 52, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#555' }}>
                  −
                </button>
                <span style={{ width: 44, textAlign: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: '#111' }}>
                  {qty}
                </span>
                <button onClick={() => setQty(qty + 1)} style={{ width: 44, height: 52, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#555' }}>
                  +
                </button>
              </div>
              <button 
                onClick={handleAdd} 
                style={{ 
                  flex: 1, 
                  background: adding ? '#6B705C' : '#111', 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontSize: 14, 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: '#fff', 
                  transition: 'background 0.3s', 
                  height: 52 
                }}
              >
                {adding ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
            </div>

            <button 
              onClick={handleBuyNow} 
              style={{ 
                width: '100%', 
                background: '#6B705C', 
                border: 'none', 
                cursor: 'pointer', 
                padding: '16px', 
                fontFamily: "'Cormorant Garamond', serif", 
                fontSize: 14, 
                letterSpacing: '0.2em', 
                textTransform: 'uppercase', 
                color: '#fff', 
                marginBottom: 32 
              }}
            >
              Buy Now
            </button>

            {/* Tabs */}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', gap: 0 }}>
                {['description', 'details', 'care'].map(t => (
                  <button 
                    key={t} 
                    onClick={() => setTab(t)} 
                    style={{ 
                      flex: 1, 
                      padding: '16px 0', 
                      background: 'none', 
                      border: 'none', 
                      borderBottom: tab === t ? '2px solid #111' : '2px solid transparent', 
                      cursor: 'pointer', 
                      fontFamily: "'Cormorant Garamond', serif", 
                      fontSize: 13, 
                      letterSpacing: '0.15em', 
                      textTransform: 'uppercase', 
                      color: tab === t ? '#111' : '#999', 
                      transition: 'all 0.2s' 
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div style={{ padding: '1.5rem 0' }}>
                {tab === 'description' && (
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: '#555', lineHeight: 1.9 }}>
                    {product.description}
                  </p>
                )}
                {tab === 'details' && (
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: '#555', lineHeight: 2 }}>
                    <p><strong>Fabric:</strong> Pure natural fibres, handwoven</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Colours:</strong> {product.colors.join(', ')}</p>
                    <p><strong>Available Sizes:</strong> {product.sizes.join(', ')}</p>
                    <p><strong>Origin:</strong> Handcrafted in India</p>
                    <p><strong>Artisan Partnership:</strong> Ethical workshop certified</p>
                  </div>
                )}
                {tab === 'care' && (
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: '#555', lineHeight: 2 }}>
                    <p>• Dry clean recommended for embroidered pieces</p>
                    <p>• Gentle hand wash in cold water for lighter fabrics</p>
                    <p>• Do not wring or tumble dry</p>
                    <p>• Store in the fabric bag provided to protect embroidery</p>
                    <p>• Iron on reverse at low heat through a damp cloth</p>
                    <p>• Keep away from direct sunlight when storing</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section style={{ padding: '4rem 2rem 8rem', background: '#f8f7f4', maxWidth: '100%' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
              <SectionHeading label="You May Also Love" title="Related Pieces" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '2rem' }}>
                {related.map(p => (
                  <ProductCard key={p.id} product={p} onViewDetails={() => router.push(`/product/${p.slug}`)} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Size Guide Modal */}
        {showSizeGuide && (
          <div style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(0,0,0,0.6)', 
            zIndex: 2000, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '2rem' 
          }} 
          onClick={() => setShowSizeGuide(false)}>
            <div style={{ background: '#fff', maxWidth: 560, width: '100%', padding: '3rem', position: 'relative' }} onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setShowSizeGuide(false)} 
                style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#555' }}
              >
                ×
              </button>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: '#111', marginBottom: 24 }}>
                Size Guide
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Cormorant Garamond', serif", fontSize: 15 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                    {['Size', 'Bust (cm)', 'Waist (cm)', 'Hip (cm)'].map(h => (
                      <th key={h} style={{ padding: '10px 0', textAlign: 'left', color: '#999', letterSpacing: '0.1em', fontSize: 12, textTransform: 'uppercase' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['XS', '78-82', '62-66', '84-88'],
                    ['S', '82-86', '66-70', '88-92'],
                    ['M', '86-90', '70-74', '92-96'],
                    ['L', '90-94', '74-78', '96-100'],
                    ['XL', '94-98', '78-82', '100-104'],
                    ['XXL', '98-104', '82-88', '104-110'],
                  ].map(row => (
                    <tr key={row[0]} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      {row.map((cell, i) => (
                        <td key={i} style={{ padding: '12px 0', color: i === 0 ? '#111' : '#555', fontWeight: i === 0 ? 600 : 400 }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}