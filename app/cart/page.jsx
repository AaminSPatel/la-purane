'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Layout } from '../../components/layout/Layout';
import { FadeUp } from '../../components/ui/FadeUp';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../utils/formatPrice';


export default function Cart() {
  const { cart, updateCartItem, removeFromCart, getCartTotal } = useCart();
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  
  const total = getCartTotal();
  const discount = promoApplied ? Math.round(total * 0.1) : 0;

  if (cart.length === 0) {
    return (
      <Layout>
        <div style={{ paddingTop: 72, minHeight: '80vh' }}>
          <div style={{ padding: '4rem 2rem', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
            <FadeUp>
              <div style={{ marginBottom: 32 }}>
                <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#d0d0d0" strokeWidth="1" style={{ margin: '0 auto' }}>
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: '#999', marginBottom: 8 }}>
                Your cart is empty
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: '#bbb', marginBottom: 32, fontStyle: 'italic' }}>
                Discover pieces crafted with centuries of intention
              </p>
              <Link href="/products">
                <button style={{ 
                  background: '#111', 
                  border: 'none', 
                  cursor: 'pointer', 
                  padding: '16px 44px', 
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontSize: 14, 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: '#fff' 
                }}>
                  Explore Collection
                </button>
              </Link>
            </FadeUp>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ paddingTop: 72, minHeight: '80vh' }}>
        <div style={{ padding: '4rem 2rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
          <FadeUp>
            <h1 style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: 'clamp(32px,4vw,56px)', 
              fontWeight: 300, 
              color: '#111', 
              marginBottom: '3rem' 
            }}>
              Your Cart
            </h1>
          </FadeUp>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 360px', 
            gap: '4rem', 
            alignItems: 'start' 
          }} className="cart-grid">
            
            {/* Items */}
            <div>
              {cart.map((item, i) => (
                <FadeUp key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} delay={i * 0.05}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '120px 1fr', 
                    gap: '1.5rem', 
                    paddingBottom: '2rem', 
                    marginBottom: '2rem', 
                    borderBottom: '1px solid rgba(0,0,0,0.08)' 
                  }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <p style={{ 
                          fontFamily: "'Cormorant Garamond', serif", 
                          fontSize: 11, 
                          letterSpacing: '0.2em', 
                          color: '#6B705C', 
                          textTransform: 'uppercase', 
                          marginBottom: 6 
                        }}>
                          {item.category}
                        </p>
                        <h3 style={{ 
                          fontFamily: "'Cormorant Garamond', serif", 
                          fontSize: 20, 
                          fontWeight: 400, 
                          color: '#111', 
                          marginBottom: 8 
                        }}>
                          {item.name}
                        </h3>
                        <p style={{ 
                          fontFamily: "'Cormorant Garamond', serif", 
                          fontSize: 14, 
                          color: '#888', 
                          marginBottom: 4 
                        }}>
                          Size: {item.selectedSize} · Colour: {item.selectedColor}
                        </p>
                        <p style={{ 
                          fontFamily: "'Cormorant Garamond', serif", 
                          fontSize: 18, 
                          fontWeight: 600, 
                          color: '#111' 
                        }}>
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ display: 'flex', border: '1px solid rgba(0,0,0,0.15)', alignItems: 'center' }}>
                          <button 
                            onClick={() => updateCartItem(item, item.quantity - 1)} 
                            style={{ width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', color: '#555', fontSize: 16 }}
                          >
                            −
                          </button>
                          <span style={{ width: 32, textAlign: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: 15 }}>
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateCartItem(item, item.quantity + 1)} 
                            style={{ width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', color: '#555', fontSize: 16 }}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item)} 
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer', 
                            fontFamily: "'Cormorant Garamond', serif", 
                            fontSize: 13, 
                            color: '#c0392b', 
                            letterSpacing: '0.1em', 
                            textTransform: 'uppercase' 
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Summary */}
            <FadeUp delay={0.2}>
              <div style={{ background: '#f8f7f4', padding: '2.5rem', position: 'sticky', top: 100 }}>
                <h2 style={{ 
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontSize: 22, 
                  fontWeight: 400, 
                  color: '#111', 
                  marginBottom: 28, 
                  letterSpacing: '0.05em' 
                }}>
                  Order Summary
                </h2>
                <div style={{ marginBottom: 20 }}>
                  {cart.map(item => (
                    <div key={`${item.id}-${item.selectedSize}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: '#666' }}>
                        {item.name} × {item.quantity}
                      </span>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: '#111' }}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: '#666' }}>Subtotal</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: '#111' }}>{formatPrice(total)}</span>
                  </div>
                  {promoApplied && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: '#6B705C' }}>Promo (10%)</span>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: '#6B705C' }}>−{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: '#666' }}>Shipping</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: '#6B705C' }}>Complimentary</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 0, marginBottom: 20 }}>
                  <input 
                    value={promo} 
                    onChange={e => setPromo(e.target.value)} 
                    placeholder="Promo code" 
                    style={{ 
                      flex: 1, 
                      padding: '10px 14px', 
                      border: '1px solid rgba(0,0,0,0.15)', 
                      background: '#fff', 
                      fontFamily: "'Cormorant Garamond', serif", 
                      fontSize: 14, 
                      outline: 'none' 
                    }} 
                  />
                  <button 
                    onClick={() => { if (promo.toUpperCase() === 'LAPURANE10') setPromoApplied(true); }} 
                    style={{ 
                      padding: '10px 16px', 
                      background: '#111', 
                      border: 'none', 
                      cursor: 'pointer', 
                      fontFamily: "'Cormorant Garamond', serif", 
                      fontSize: 12, 
                      letterSpacing: '0.15em', 
                      color: '#fff', 
                      textTransform: 'uppercase' 
                    }}
                  >
                    Apply
                  </button>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  borderTop: '1px solid rgba(0,0,0,0.1)', 
                  paddingTop: 20, 
                  marginBottom: 24 
                }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 500, color: '#111' }}>Total</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: '#111' }}>
                    {formatPrice(total - discount)}
                  </span>
                </div>
                <Link href="/order">
                  <button style={{ 
                    width: '100%', 
                    background: '#111', 
                    border: 'none', 
                    cursor: 'pointer', 
                    padding: '18px', 
                    fontFamily: "'Cormorant Garamond', serif", 
                    fontSize: 14, 
                    letterSpacing: '0.2em', 
                    textTransform: 'uppercase', 
                    color: '#fff', 
                    marginBottom: 12 
                  }}>
                    Proceed to Checkout
                  </button>
                </Link>
                <p style={{ 
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontSize: 12, 
                  color: '#999', 
                  textAlign: 'center', 
                  fontStyle: 'italic' 
                }}>
                  Use code LAPURANE10 for 10% off
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </Layout>
  );
}