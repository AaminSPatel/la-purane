'use client'
import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import Link from 'next/link';

export function ProductCard({ product, onViewDetails }) {
  const [hovered, setHovered] = useState(false);
  const [adding, setAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.stopPropagation();
    setAdding(true);
    addToCart({ 
      ...product, 
      selectedSize: product.sizes[1] || product.sizes[0], 
      selectedColor: product.colors[0], 
      quantity: 1 
    });
    setTimeout(() => setAdding(false), 1200);
  };

  return (
    <div 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      style={{ 
        cursor: 'pointer', 
        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)' 
      }}
      onClick={() => onViewDetails(product)}
    >
      <div style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        background: '#f8f7f4', 
        aspectRatio: '3/4' 
      }}>
        <img 
          src={hovered ? product.image2 : product.image} 
          alt={product.name} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)', 
            transform: hovered ? 'scale(1.06)' : 'scale(1)' 
          }} 
        />
        {product.badge && (
          <span style={{ 
            position: 'absolute', 
            top: 16, 
            left: 16, 
            background: '#6B705C', 
            color: '#fff', 
            fontSize: 10, 
            letterSpacing: '0.15em', 
            padding: '4px 10px', 
            textTransform: 'uppercase', 
            fontFamily: "'Cormorant Garamond', serif" 
          }}>
            {product.badge}
          </span>
        )}
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          padding: '1.5rem', 
          background: 'linear-gradient(transparent, rgba(0,0,0,0.35))', 
          transform: hovered ? 'translateY(0)' : 'translateY(100%)', 
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)' 
        }}>
          <button 
            onClick={handleAdd} 
            style={{ 
              width: '100%', 
              background: adding ? '#6B705C' : 'rgba(255,255,255,0.95)', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '12px', 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: 13, 
              letterSpacing: '0.18em', 
              textTransform: 'uppercase', 
              color: adding ? '#fff' : '#111', 
              transition: 'all 0.3s' 
            }}
          >
            {adding ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <div style={{ padding: '1rem 0.25rem' }}>
        <p style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: 11, 
          letterSpacing: '0.2em', 
          color: '#6B705C', 
          textTransform: 'uppercase', 
          margin: '0 0 4px' 
        }}>
          {product.category}
        </p>
        <h3 style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: 18, 
          fontWeight: 500, 
          color: '#111', 
          margin: '0 0 8px', 
          letterSpacing: '0.02em' 
        }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
          <span style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 17, 
            color: '#111', 
            fontWeight: 600 
          }}>
            {formatPrice(product.price)}
          </span>
          <span style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 14, 
            color: '#999', 
            textDecoration: 'line-through' 
          }}>
            {formatPrice(product.originalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}