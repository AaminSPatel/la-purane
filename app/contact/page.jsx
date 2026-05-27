'use client'
import { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { FadeUp } from '../../components/ui/FadeUp';


const CONTACT_DETAILS = [
  { icon: '📍', label: 'Atelier', value: '17, Palasia Square, Indore, Madhya Pradesh 452001' },
  { icon: '📞', label: 'Telephone', value: '+91 731 456 7890' },
  { icon: '✉️', label: 'Email', value: 'hello@lapurane.com' },
  { icon: '🕐', label: 'Hours', value: 'Mon – Sat: 10:00 – 19:00' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <Layout>
      <div style={{ paddingTop: 72 }}>
        <div style={{ background: '#f5f3ef', padding: '5rem 2rem 4rem', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: '0.3em', color: '#6B705C', textTransform: 'uppercase', marginBottom: 16 }}>
            Get in Touch
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, color: '#111', margin: 0 }}>
            Contact Us
          </h1>
        </div>

        <section style={{ padding: '6rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }} className="contact-grid">
            <FadeUp>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: '0.3em', color: '#6B705C', textTransform: 'uppercase', marginBottom: 16 }}>
                  We'd Love to Hear From You
                </p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(24px,2.5vw,38px)', fontWeight: 300, color: '#111', marginBottom: 24, lineHeight: 1.2 }}>
                  Personal styling, bridal appointments, and bespoke consultations
                </h2>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: '#666', lineHeight: 1.9, marginBottom: 40 }}>
                  Whether you are dressing for the most important day of your life, looking for a styling consultation, or simply wish to know more about the craft behind our pieces — our team is here to guide you. We believe the relationship between a Là Púráné patron and our atelier is as important as the garment itself. We take the time to understand you, your occasion, and your vision before we begin.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {CONTACT_DETAILS.map((item, i) => (
                    <FadeUp key={i} delay={i * 0.1}>
                      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: '1.5rem', background: '#f8f7f4', borderLeft: '3px solid #6B705C' }}>
                        <span style={{ fontSize: 22 }}>{item.icon}</span>
                        <div>
                          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', margin: '0 0 6px' }}>
                            {item.label}
                          </p>
                          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: '#111', margin: 0 }}>
                            {item.value}
                          </p>
                        </div>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#f8f7f4' }}>
                  <div style={{ fontSize: 48, marginBottom: 20 }}>✉️</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 300, color: '#111', marginBottom: 16 }}>
                    Message Received
                  </h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: '#666', lineHeight: 1.8, fontStyle: 'italic' }}>
                    Thank you for writing to us. A member of our atelier team will respond within 24 hours. We look forward to the conversation.
                  </p>
                </div>
              ) : (
                <div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: '#111', marginBottom: 32 }}>
                    Send a Message
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {[
                      { key: 'name', label: 'Your Name', type: 'text' },
                      { key: 'email', label: 'Email Address', type: 'email' },
                      { key: 'subject', label: 'Subject', type: 'text' },
                    ].map(({ key, label, type }) => (
                      <div key={key}>
                        <label style={{ 
                          fontFamily: "'Cormorant Garamond', serif", 
                          fontSize: 12, 
                          letterSpacing: '0.15em', 
                          textTransform: 'uppercase', 
                          color: '#888', 
                          display: 'block', 
                          marginBottom: 8 
                        }}>
                          {label}
                        </label>
                        <input 
                          value={form[key]} 
                          onChange={e => update(key, e.target.value)} 
                          type={type} 
                          style={{ 
                            width: '100%', 
                            padding: '14px 16px', 
                            border: '1px solid rgba(0,0,0,0.15)', 
                            background: '#fff', 
                            fontFamily: "'Cormorant Garamond', serif", 
                            fontSize: 15, 
                            color: '#111', 
                            outline: 'none', 
                            boxSizing: 'border-box' 
                          }}
                          onFocus={e => e.target.style.borderColor = '#6B705C'}
                          onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.15)'}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ 
                        fontFamily: "'Cormorant Garamond', serif", 
                        fontSize: 12, 
                        letterSpacing: '0.15em', 
                        textTransform: 'uppercase', 
                        color: '#888', 
                        display: 'block', 
                        marginBottom: 8 
                      }}>
                        Message
                      </label>
                      <textarea 
                        value={form.message} 
                        onChange={e => update('message', e.target.value)} 
                        rows={6} 
                        style={{ 
                          width: '100%', 
                          padding: '14px 16px', 
                          border: '1px solid rgba(0,0,0,0.15)', 
                          background: '#fff', 
                          fontFamily: "'Cormorant Garamond', serif", 
                          fontSize: 15, 
                          color: '#111', 
                          outline: 'none', 
                          boxSizing: 'border-box', 
                          resize: 'vertical' 
                        }}
                        onFocus={e => e.target.style.borderColor = '#6B705C'}
                        onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.15)'}
                      />
                    </div>
                    <button 
                      onClick={() => form.name && form.email && form.message && setSent(true)} 
                      style={{ 
                        background: '#111', 
                        border: 'none', 
                        cursor: 'pointer', 
                        padding: '16px', 
                        fontFamily: "'Cormorant Garamond', serif", 
                        fontSize: 14, 
                        letterSpacing: '0.2em', 
                        textTransform: 'uppercase', 
                        color: '#fff', 
                        transition: 'background 0.3s' 
                      }}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              )}
            </FadeUp>
          </div>
        </section>

        {/* Map placeholder */}
        <div style={{ height: 400, background: '#e8e5df', position: 'relative', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1800&q=85" alt="Map" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', padding: '2.5rem 3rem', textAlign: 'center', maxWidth: 400 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: '0.25em', color: '#6B705C', textTransform: 'uppercase', marginBottom: 12 }}>
                Atelier Location
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 400, color: '#111', margin: '0 0 8px' }}>
                Là Púráné Atelier
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: '#777', fontStyle: 'italic' }}>
                17, Palasia Square, Indore
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}