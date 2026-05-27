'use client'
import { useState, useEffect, useRef, useCallback } from "react";

const PRODUCTS = [
  { id: 1, slug: "celestial-drape-saree", name: "Celestial Drape Saree", price: 24800, originalPrice: 31000, category: "Sarees", color: "Ivory", colors: ["Ivory", "Blush", "Sage"], sizes: ["XS", "S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80", image2: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80", badge: "New", description: "Woven from the finest Banarasi silk, the Celestial Drape embodies centuries of Indian craftsmanship fused with contemporary silhouettes. Each piece is hand-finished by artisans in Varanasi whose families have practiced this art for generations. The luminous ivory ground catches light in ways that synthetic fabrics simply cannot replicate. The border is adorned with zari work that tells the story of celestial bodies — stars, moons, and the eternal cycle of the cosmos. Wearing this saree is not merely dressing; it is carrying a living heritage.", story: "Born from the looms of Banaras.", tag: "Bestseller" },
  { id: 2, slug: "obsidian-kurta-set", name: "Obsidian Kurta Set", price: 18500, originalPrice: 22000, category: "Kurta Sets", color: "Black", colors: ["Black", "Navy", "Charcoal"], sizes: ["XS", "S", "M", "L", "XL", "XXL"], image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80", image2: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80", badge: "Limited", description: "The Obsidian Kurta Set is a study in restraint. Cut from handloom cotton woven in Madhya Pradesh, each thread carries the quiet dignity of Indian textile heritage. The silhouette is deliberately long, falling with the weight of intention. Side slits offer freedom of movement while the mandarin collar references Mughal court aesthetics filtered through a modern lens. The accompanying palazzo trousers complete a look that moves between the boardroom and the banquet with equal authority.", story: "Power dressed in shadow.", tag: "New" },
  { id: 3, slug: "saffron-anarkali-gown", name: "Saffron Anarkali Gown", price: 32000, originalPrice: 40000, category: "Gowns", color: "Saffron", colors: ["Saffron", "Crimson", "Emerald"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1614251055880-ee96e4803393?w=800&q=80", image2: "https://images.unsplash.com/photo-1592878849122-facb97ed3dfd?w=800&q=80", badge: "New", description: "Named after the most precious spice in the world, the Saffron Anarkali Gown commands the same rarity and reverence. The floor-sweeping silhouette is constructed from georgette layered over a raw silk undergarment, creating movement that is both fluid and architectural. The hand-embroidered chikankari detailing on the bodice is performed exclusively by master artisans in Lucknow, a city that has given the world some of its most refined needlework traditions. This is a gown for moments that deserve to be remembered.", story: "The architecture of celebration.", tag: "Featured" },
  { id: 4, slug: "midnight-lehenga-choli", name: "Midnight Lehenga Choli", price: 56000, originalPrice: 68000, category: "Lehengas", color: "Midnight Blue", colors: ["Midnight Blue", "Burgundy", "Ivory"], sizes: ["XS", "S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80", image2: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80", badge: "Luxury", description: "The Midnight Lehenga Choli is Là Púráné's most ambitious creation — a bridal masterpiece that took fourteen artisans three months to complete. The lehenga skirt is constructed from seventeen layers of silk organza, each individually cut and assembled to achieve a volume that is both dramatic and weightless. The blouse is entirely hand-embroidered with silver thread and Swarovski crystals arranged in geometric patterns inspired by Mughal architecture. The dupatta, woven in Dhaka muslin so fine it is known as 'woven air', cascades in perfect folds.", story: "Fourteen artisans. Three months. One legacy.", tag: "Bridal" },
  { id: 5, slug: "verdant-palazzo-set", name: "Verdant Palazzo Set", price: 14200, originalPrice: 17500, category: "Casual", color: "Sage Green", colors: ["Sage Green", "Sand", "White"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80", image2: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80", badge: "New", description: "For days that demand comfort without compromise, the Verdant Palazzo Set offers an answer rooted in the earth itself. Crafted from khadi cotton grown and spun in Gujarat, the fabric breathes with the landscape of its origin. The sage green colorway is achieved through natural vegetable dyeing using local plant extracts — a process that takes three days and produces a depth of color that chemical dyes cannot approximate. The wide-leg palazzo silhouette is cut generously to allow movement, while the co-ordinated kurta top drapes with effortless elegance.", story: "Earth-colored comfort.", tag: null },
  { id: 6, slug: "rose-chiffon-dupatta", name: "Rose Chiffon Dupatta", price: 8800, originalPrice: 11000, category: "Accessories", color: "Rose", colors: ["Rose", "Gold", "Ivory"], sizes: ["One Size"], image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80", image2: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80", badge: null, description: "The Rose Chiffon Dupatta is the defining accessory of a Là Púráné ensemble — a whisper of color that transforms any look. Woven from pure French chiffon in a mill that has been producing luxury fabrics since 1923, this dupatta carries the weight of European textile tradition in Indian hands. The border features hand-applied gota patti work in 22-carat gold threads, each piece individually stitched by artisans in Jaipur. The dupatta measures 2.5 metres in length, giving the wearer multiple draping options to suit mood and occasion.", story: "A whisper that changes everything.", tag: null },
  { id: 7, slug: "copper-brocade-blouse", name: "Copper Brocade Blouse", price: 12600, originalPrice: 15000, category: "Separates", color: "Copper", colors: ["Copper", "Gold", "Bronze"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80", image2: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80", badge: "Limited", description: "The Copper Brocade Blouse is an exercise in the marriage of ancient craft and modern cut. The brocade fabric is woven on handlooms in Surat using copper Zari threads that are spun by hand to a fineness that machine processes cannot achieve. The construction follows traditional darzi techniques while the neckline and sleeve design reflects influences from contemporary global fashion. Back zip closure with a hook-and-eye finish ensures the silhouette remains uninterrupted. An heirloom piece masquerading as everyday luxury.", story: "Spun by hand. Worn with intention.", tag: null },
  { id: 8, slug: "cloud-sharara-set", name: "Cloud Sharara Set", price: 22000, originalPrice: 27500, category: "Sharara Sets", color: "Cloud White", colors: ["Cloud White", "Pearl", "Champagne"], sizes: ["XS", "S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&q=80", image2: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80", badge: "New", description: "The Cloud Sharara Set defies gravity in the most elegant way possible. Constructed from layers of micro-pleated chanderi silk, the sharara trousers billow with each step like clouds moving across an afternoon sky. The accompanying short kurta is tailored close to the body in contrast, creating a silhouette that plays with proportion in ways that feel both classical and entirely of the moment. Mukaish work detailing — tiny silver sequins stitched by hand onto the fabric — catches light with the subtlety of stars at dusk.", story: "Light enough to fly.", tag: "Featured" },
];

const CATEGORIES = ["All", "Sarees", "Kurta Sets", "Gowns", "Lehengas", "Casual", "Accessories", "Separates", "Sharara Sets"];

const TESTIMONIALS = [
  { name: "Ananya Krishnan", location: "Mumbai", text: "Là Púráné dressed me for my daughter's wedding and I have never felt more myself. The craftsmanship is extraordinary — you can feel the love in every stitch.", rating: 5 },
  { name: "Priya Mehta", location: "Delhi", text: "I have worn luxury fashion from Paris to Milan, and nothing compares to the refinement Là Púráné brings to Indian textiles. This is world-class.", rating: 5 },
  { name: "Kavya Nair", location: "Bengaluru", text: "The Celestial Drape Saree arrived wrapped in silk tissue with a handwritten note about the artisans who made it. That detail says everything about this brand.", rating: 5 },
  { name: "Shruti Agarwal", location: "Jaipur", text: "When I wear Là Púráné, I feel connected to something ancient and important. These are not just clothes — they are stories you can wear.", rating: 5 },
];

const BRAND_VALUES = [
  { title: "Artisanal Craft", desc: "Every piece is handcrafted by master artisans whose families have practiced their craft for generations across India's textile heritage cities." },
  { title: "Conscious Luxury", desc: "We source only natural fibers, work exclusively with ethical workshops, and use traditional dyeing methods that honour both people and planet." },
  { title: "Living Heritage", desc: "Our collections are acts of preservation — keeping alive weaving traditions, embroidery techniques, and textile knowledge that define Indian civilisation." },
  { title: "Radical Elegance", desc: "We believe luxury should feel effortless. Our cuts are considered, our silhouettes timeless, and our detailing speaks quietly to those who know to listen." },
];

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrollY;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const formatPrice = (p) => `₹${p.toLocaleString("en-IN")}`;

function Navbar({ page, setPage, cartCount }) {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const solid = scrollY > 60 || menuOpen;
  const pages = ["Home", "About", "Products", "Contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: solid ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: solid ? "blur(20px)" : "none",
      borderBottom: solid ? "1px solid rgba(107,112,92,0.12)" : "none",
      transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
      padding: "0 2rem",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <button onClick={() => { setPage("home"); setMenuOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, letterSpacing: "0.12em", color: solid ? "#111" : "#fff", transition: "color 0.4s" }}>
            LÀ PÚRÁNÉ
          </span>
        </button>
        <div style={{ display: "flex", gap: 40, alignItems: "center" }} className="nav-links-desktop">
          {pages.map(p => (
            <button key={p} onClick={() => setPage(p.toLowerCase())} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Cormorant Garamond', serif", fontSize: 15, letterSpacing: "0.14em",
              color: solid ? "#111" : "#fff", textTransform: "uppercase",
              opacity: page === p.toLowerCase() ? 1 : 0.7,
              borderBottom: page === p.toLowerCase() ? "1px solid #6B705C" : "1px solid transparent",
              paddingBottom: 2, transition: "all 0.3s",
            }}>{p}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <button onClick={() => setPage("cart")} style={{ background: "none", border: "none", cursor: "pointer", position: "relative", padding: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={solid ? "#111" : "#fff"} strokeWidth="1.5" style={{ transition: "stroke 0.4s" }}>
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && <span style={{ position: "absolute", top: -4, right: -4, background: "#6B705C", color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>{cartCount}</span>}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }} className="nav-hamburger">
            <div style={{ width: 24, display: "flex", flexDirection: "column", gap: 5 }}>
              {[0,1,2].map(i => <div key={i} style={{ height: 1, background: solid ? "#111" : "#fff", transition: "all 0.3s", transform: menuOpen && i===0 ? "rotate(45deg) translate(4px,4px)" : menuOpen && i===2 ? "rotate(-45deg) translate(4px,-4px)" : "none", opacity: menuOpen && i===1 ? 0 : 1 }} />)}
            </div>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", padding: "2rem", borderTop: "1px solid rgba(107,112,92,0.12)" }}>
          {pages.map((p, i) => (
            <button key={p} onClick={() => { setPage(p.toLowerCase()); setMenuOpen(false); }} style={{
              display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Cormorant Garamond', serif", fontSize: 28, letterSpacing: "0.08em", color: "#111",
              padding: "0.75rem 0", borderBottom: i < pages.length-1 ? "1px solid rgba(107,112,92,0.1)" : "none",
              textTransform: "uppercase",
            }}>{p}</button>
          ))}
        </div>
      )}
      <style>{`
        @media(min-width:768px){.nav-hamburger{display:none!important}}
        @media(max-width:767px){.nav-links-desktop{display:none!important}}
      `}</style>
    </nav>
  );
}

function ProductCard({ product, setPage, setCurrentProduct, addToCart }) {
  const [hovered, setHovered] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    setAdding(true);
    addToCart({ ...product, selectedSize: product.sizes[1] || product.sizes[0], selectedColor: product.colors[0], quantity: 1 });
    setTimeout(() => setAdding(false), 1200);
  };

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer", transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)" }}
      onClick={() => { setCurrentProduct(product); setPage("product"); window.scrollTo(0,0); }}>
      <div style={{ position: "relative", overflow: "hidden", background: "#f8f7f4", aspectRatio: "3/4" }}>
        <img src={hovered ? product.image2 : product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)", transform: hovered ? "scale(1.06)" : "scale(1)" }} />
        {product.badge && <span style={{ position: "absolute", top: 16, left: 16, background: "#6B705C", color: "#fff", fontSize: 10, letterSpacing: "0.15em", padding: "4px 10px", textTransform: "uppercase", fontFamily: "'Cormorant Garamond', serif" }}>{product.badge}</span>}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem", background: "linear-gradient(transparent, rgba(0,0,0,0.35))", transform: hovered ? "translateY(0)" : "translateY(100%)", transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
          <button onClick={handleAdd} style={{ width: "100%", background: adding ? "#6B705C" : "rgba(255,255,255,0.95)", border: "none", cursor: "pointer", padding: "12px", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: adding ? "#fff" : "#111", transition: "all 0.3s" }}>
            {adding ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
      <div style={{ padding: "1rem 0.25rem" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.2em", color: "#6B705C", textTransform: "uppercase", margin: "0 0 4px" }}>{product.category}</p>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 500, color: "#111", margin: "0 0 8px", letterSpacing: "0.02em" }}>{product.name}</h3>
        <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#111", fontWeight: 600 }}>{formatPrice(product.price)}</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#999", textDecoration: "line-through" }}>{formatPrice(product.originalPrice)}</span>
        </div>
      </div>
    </div>
  );
}

function Marquee() {
  const items = ["Handcrafted in India", "Pure Natural Fibres", "Artisan-Made", "Luxury Redefined", "Woven Heritage", "Slow Fashion", "Ethical Luxury"];
  return (
    <div style={{ overflow: "hidden", background: "#6B705C", padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ display: "flex", gap: 60, whiteSpace: "nowrap", animation: "marquee 22s linear infinite" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.25em", color: "rgba(255,255,255,0.9)", textTransform: "uppercase" }}>
            {item} &nbsp;◆
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

function FadeUp({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}s` }}>
      {children}
    </div>
  );
}

function SectionHeading({ label, title, subtitle, center = false }) {
  return (
    <FadeUp>
      <div style={{ textAlign: center ? "center" : "left", marginBottom: "3rem" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.3em", color: "#6B705C", textTransform: "uppercase", margin: "0 0 12px" }}>{label}</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 400, color: "#111", margin: "0 0 16px", lineHeight: 1.1, letterSpacing: "0.02em" }}>{title}</h2>
        {subtitle && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#777", maxWidth: 560, margin: center ? "0 auto" : 0, lineHeight: 1.7, fontStyle: "italic" }}>{subtitle}</p>}
      </div>
    </FadeUp>
  );
}

function HomePage({ setPage, setCurrentProduct, cart, addToCart }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const featured = PRODUCTS.slice(0, 4);
  const newArrivals = PRODUCTS.filter(p => p.badge === "New");

  useEffect(() => { setTimeout(() => setHeroLoaded(true), 200); }, []);
  useEffect(() => { const t = setInterval(() => setActiveSlide(p => (p+1) % newArrivals.length), 4000); return () => clearInterval(t); }, [newArrivals.length]);

  return (
    <div>
      {/* Hero */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1800&q=90" alt="Hero" style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.05)", transition: "transform 8s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.5) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 2rem", textAlign: "center" }}>
          <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transition: "all 1.2s cubic-bezier(0.4,0,0.2,1)" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(11px,1.2vw,13px)", letterSpacing: "0.4em", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: 24 }}>New Collection — 2025</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px,9vw,120px)", fontWeight: 300, color: "#fff", lineHeight: 0.95, margin: "0 0 24px", letterSpacing: "0.03em" }}>
              The Art of<br /><em style={{ fontStyle: "italic", fontWeight: 400 }}>Wearing</em><br />Heritage
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px,1.5vw,19px)", color: "rgba(255,255,255,0.85)", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7, fontStyle: "italic" }}>
              Where ancient craft meets contemporary vision. Handcrafted for those who understand that true luxury is time, skill, and intention.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => setPage("products")} style={{ background: "#fff", border: "none", cursor: "pointer", padding: "16px 44px", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: "#111", transition: "all 0.3s" }}>
                Explore Collection
              </button>
              <button onClick={() => setPage("about")} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.6)", cursor: "pointer", padding: "16px 44px", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", transition: "all 0.3s" }}>
                Our Story
              </button>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.4)", animation: "scrollLine 2s ease-in-out infinite" }} />
        </div>
      </div>

      <Marquee />

      {/* Featured Collections */}
      <section style={{ padding: "8rem 2rem", maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeading label="Collections" title="Crafted for the Discerning" subtitle="Each collection is born from deep research into India's textile traditions, reinterpreted through a lens of contemporary luxury." center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "2rem", marginTop: "3rem" }}>
          {featured.map((product, i) => (
            <FadeUp key={product.id} delay={i * 0.1}>
              <ProductCard product={product} setPage={setPage} setCurrentProduct={setCurrentProduct} addToCart={addToCart} />
            </FadeUp>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <button onClick={() => setPage("products")} style={{ background: "none", border: "1px solid #111", cursor: "pointer", padding: "16px 52px", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", color: "#111", transition: "all 0.3s" }}>
            View All Pieces
          </button>
        </div>
      </section>

      {/* Full-width editorial */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "80vh" }} className="editorial-split">
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src="https://images.unsplash.com/photo-1614251055880-ee96e4803393?w=1200&q=85" alt="Editorial" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 8s ease", transform: "scale(1.03)" }} />
        </div>
        <div style={{ background: "#f5f3ef", display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 4rem" }}>
          <FadeUp>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.3em", color: "#6B705C", textTransform: "uppercase", marginBottom: 24 }}>The Craft</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 300, color: "#111", lineHeight: 1.1, marginBottom: 28 }}>Generations of mastery in every thread</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#555", lineHeight: 1.9, marginBottom: 16, fontStyle: "italic" }}>
              We partner with weaving families in Varanasi, Lucknow, Surat, and Jaipur — communities where the knowledge of craft passes from mother to daughter, father to son, without interruption for five hundred years.
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 36 }}>
              When you wear Là Púráné, you are wearing a living document of Indian civilisation. Every pattern has a name and a history. Every dye has a source. Every knot is the expression of a human hand that knows exactly what it is doing.
            </p>
            <button onClick={() => setPage("about")} style={{ background: "none", border: "1px solid #6B705C", cursor: "pointer", padding: "14px 40px", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B705C", alignSelf: "flex-start", transition: "all 0.3s" }}>
              Read Our Story
            </button>
          </FadeUp>
        </div>
      </div>

      {/* New Arrivals Slider */}
      <section style={{ padding: "8rem 2rem", maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeading label="New Arrivals" title="Just Added" subtitle="The newest expressions of Là Púráné's ongoing dialogue between India's past and the world's present." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.5rem" }}>
          {newArrivals.map((product, i) => (
            <FadeUp key={product.id} delay={i * 0.08}>
              <ProductCard product={product} setPage={setPage} setCurrentProduct={setCurrentProduct} addToCart={addToCart} />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "#111", padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.3em", color: "#6B705C", textTransform: "uppercase", marginBottom: 16 }}>Our Promise</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,4vw,56px)", fontWeight: 300, color: "#fff", lineHeight: 1.1 }}>What We Stand For</h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "3rem" }}>
            {BRAND_VALUES.map((v, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div style={{ borderTop: "1px solid rgba(107,112,92,0.4)", paddingTop: 28 }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500, color: "#fff", marginBottom: 16, letterSpacing: "0.03em" }}>{v.title}</h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "8rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeading label="Voices" title="What Our Patrons Say" center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "2rem" }}>
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div style={{ background: "#f8f7f4", padding: "2.5rem", borderBottom: "3px solid #6B705C" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                  {Array(t.rating).fill(0).map((_, j) => <span key={j} style={{ color: "#6B705C", fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#333", lineHeight: 1.8, fontStyle: "italic", marginBottom: 24 }}>"{t.text}"</p>
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 600, color: "#111", margin: 0 }}>{t.name}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#999", margin: "4px 0 0" }}>{t.location}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Instagram Gallery */}
      <section style={{ padding: "0 0 6rem" }}>
        <FadeUp>
          <p style={{ textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.3em", color: "#6B705C", textTransform: "uppercase", marginBottom: 40 }}>@lapurane — Follow Our World</p>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 4 }} className="gallery-grid">
          {[
            "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80",
            "https://images.unsplash.com/photo-1614251055880-ee96e4803393?w=400&q=80",
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
            "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400&q=80",
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80",
            "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80",
          ].map((src, i) => (
            <div key={i} style={{ aspectRatio: "1", overflow: "hidden", cursor: "pointer" }}>
              <img src={src} alt="Gallery" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
            </div>
          ))}
        </div>
        <style>{`.gallery-grid{@media(max-width:640px){grid-template-columns:repeat(3,1fr)!important}}`}</style>
      </section>

      {/* Newsletter */}
      <section style={{ background: "#6B705C", padding: "7rem 2rem", textAlign: "center" }}>
        <FadeUp>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.3em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: 20 }}>Stay Close</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 300, color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>Letters from the Atelier</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "rgba(255,255,255,0.75)", maxWidth: 480, margin: "0 auto 40px", fontStyle: "italic", lineHeight: 1.7 }}>
            Receive exclusive previews, artisan stories, and first access to new collections. We write rarely — and only when we have something worth sharing.
          </p>
          <div style={{ display: "flex", gap: 0, maxWidth: 480, margin: "0 auto", justifyContent: "center" }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, padding: "16px 20px", border: "none", background: "rgba(255,255,255,0.15)", color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 15, outline: "none", backdropFilter: "blur(10px)" }} />
            <button style={{ background: "#fff", border: "none", cursor: "pointer", padding: "16px 28px", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B705C", whiteSpace: "nowrap" }}>Subscribe</button>
          </div>
        </FadeUp>
      </section>

      <Footer setPage={setPage} />
      <style>{`
        @keyframes scrollLine{0%,100%{opacity:0.3;transform:scaleY(1)}50%{opacity:1;transform:scaleY(0.5)}}
        @media(max-width:768px){.editorial-split{grid-template-columns:1fr!important}}
      `}</style>
    </div>
  );
}

function AboutPage({ setPage }) {
  const timeline = [
    { year: "2012", event: "Founded in Indore", desc: "Là Púráné was born in a small studio in Indore with a single belief: that Indian textile heritage deserved global luxury positioning." },
    { year: "2015", event: "First Bridal Collection", desc: "Our debut bridal line, Rang Mahal, sold out within three days of launch and established our reputation for extraordinary craftsmanship." },
    { year: "2018", event: "Artisan Partnership Program", desc: "We launched partnerships with fourteen weaving families across six states, guaranteeing fair wages and preserving endangered textile traditions." },
    { year: "2021", event: "International Recognition", desc: "Là Púráné was featured in Vogue India, Harper's Bazaar, and the Condé Nast Traveller as one of India's defining luxury fashion voices." },
    { year: "2024", event: "Global Flagship", desc: "Our first international exhibition in Paris, showcasing India's textile heritage to audiences who had never experienced its full depth and beauty." },
  ];

  return (
    <div>
      {/* About Hero */}
      <div style={{ position: "relative", height: "80vh", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1800&q=90" alt="About" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "5rem 3rem" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.3em", color: "#6B705C", textTransform: "uppercase", marginBottom: 16 }}>Our Story</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(42px,7vw,90px)", fontWeight: 300, color: "#fff", lineHeight: 1, maxWidth: 800, letterSpacing: "0.02em" }}>
            A love letter to India's<br /><em>textile soul</em>
          </h1>
        </div>
      </div>

      {/* Mission */}
      <section style={{ padding: "8rem 2rem", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <FadeUp>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.3em", color: "#6B705C", textTransform: "uppercase", marginBottom: 32 }}>Philosophy</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px,3vw,38px)", fontWeight: 300, color: "#111", lineHeight: 1.5, marginBottom: 40, fontStyle: "italic" }}>
            "We believe that a garment is not just clothing. It is a conversation between the hand that made it and the body that wears it. That conversation, when both parties are fully present, is what we call luxury."
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.2em", color: "#6B705C", textTransform: "uppercase" }}>— Founder, Là Púráné</p>
        </FadeUp>
      </section>

      {/* Story */}
      <section style={{ padding: "0 2rem 8rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="about-split">
          <FadeUp>
            <img src="https://images.unsplash.com/photo-1592878849122-facb97ed3dfd?w=900&q=85" alt="Craft" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover" }} />
          </FadeUp>
          <FadeUp delay={0.2}>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.3em", color: "#6B705C", textTransform: "uppercase", marginBottom: 20 }}>Origin</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,3vw,44px)", fontWeight: 400, color: "#111", lineHeight: 1.15, marginBottom: 28 }}>Born from reverence, refined through rigour</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#555", lineHeight: 1.9, marginBottom: 20 }}>
                Là Púráné was founded by a designer who grew up watching her grandmother drape a saree with the precision of someone reciting a prayer. That early education — in the weight of cloth, the language of colour, the grammar of fold — became the foundation of everything we build.
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#555", lineHeight: 1.9, marginBottom: 20 }}>
                The name itself is a devotion — the old, the ancient, the enduring. We believe that what has stood for centuries has earned its right to stand for centuries more. Our task is not to reinvent Indian textiles. Our task is to give them the stage they have always deserved.
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#555", lineHeight: 1.9 }}>
                We work with over forty artisan families across India, from the weavers of Varanasi and Chanderi to the block-printers of Bagru and the kalamkari painters of Andhra Pradesh. Each collaboration is a partnership of equals — we bring design vision and market access; they bring centuries of accumulated knowledge that no design school can teach.
              </p>
            </div>
          </FadeUp>
        </div>
        <style>{`@media(max-width:768px){.about-split{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
      </section>

      {/* Timeline */}
      <section style={{ background: "#f5f3ef", padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionHeading label="Journey" title="Our Milestones" center />
          {timeline.map((item, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "3rem", paddingBottom: "3rem", marginBottom: "3rem", borderBottom: i < timeline.length-1 ? "1px solid rgba(107,112,92,0.2)" : "none" }}>
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: "#6B705C", margin: 0 }}>{item.year}</p>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500, color: "#111", marginBottom: 12 }}>{item.event}</h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#666", lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "8rem 2rem", textAlign: "center" }}>
        <FadeUp>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 300, color: "#111", marginBottom: 24 }}>Experience the Collection</h2>
          <button onClick={() => setPage("products")} style={{ background: "#111", border: "none", cursor: "pointer", padding: "18px 52px", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>
            Shop Now
          </button>
        </FadeUp>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

function ProductsPage({ setPage, setCurrentProduct, addToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");

  let filtered = PRODUCTS.filter(p => activeCategory === "All" || p.category === activeCategory);
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "new") filtered = [...filtered].filter(p => p.badge === "New").concat(filtered.filter(p => p.badge !== "New"));

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <div style={{ background: "#f5f3ef", padding: "5rem 2rem 4rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.3em", color: "#6B705C", textTransform: "uppercase", marginBottom: 16 }}>The Collection</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,72px)", fontWeight: 300, color: "#111", margin: 0 }}>All Pieces</h1>
      </div>

      {/* Filters */}
      <div style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", padding: "1.5rem 2rem", position: "sticky", top: 72, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", zIndex: 100 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                background: activeCategory === cat ? "#111" : "transparent",
                border: "1px solid",
                borderColor: activeCategory === cat ? "#111" : "rgba(0,0,0,0.2)",
                cursor: "pointer", padding: "7px 16px",
                fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.15em",
                textTransform: "uppercase", color: activeCategory === cat ? "#fff" : "#666",
                transition: "all 0.2s",
              }}>{cat}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ padding: "8px 16px", border: "1px solid rgba(0,0,0,0.15)", background: "transparent", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, outline: "none", width: 160 }} />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: "8px 16px", border: "1px solid rgba(0,0,0,0.15)", background: "transparent", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, outline: "none", cursor: "pointer" }}>
              <option value="default">Sort: Featured</option>
              <option value="new">Sort: New First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: "4rem 2rem", maxWidth: 1400, margin: "0 auto" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#999", marginBottom: "2rem" }}>{filtered.length} pieces</p>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 0" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#999" }}>No pieces found</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "2.5rem" }}>
            {filtered.map((product, i) => (
              <FadeUp key={product.id} delay={i * 0.05}>
                <ProductCard product={product} setPage={setPage} setCurrentProduct={setCurrentProduct} addToCart={addToCart} />
              </FadeUp>
            ))}
          </div>
        )}
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

function ProductDetailPage({ product, setPage, addToCart, cart }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [mainImg, setMainImg] = useState(product.image);
  const [adding, setAdding] = useState(false);
  const [tab, setTab] = useState("description");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [zoom, setZoom] = useState(false);

  const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAdd = () => {
    setAdding(true);
    addToCart({ ...product, selectedSize, selectedColor, quantity: qty });
    setTimeout(() => setAdding(false), 1200);
  };

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Breadcrumb */}
      <div style={{ padding: "1.5rem 2rem", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {[["home", "Home"], ["products", "Collection"], ["product", product.name]].map(([pg, label], i) => (
            <span key={pg} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {i > 0 && <span style={{ color: "#ccc", fontSize: 12 }}>/</span>}
              <button onClick={() => setPage(pg)} style={{ background: "none", border: "none", cursor: i < 2 ? "pointer" : "default", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.12em", color: i === 2 ? "#111" : "#999", textTransform: "uppercase" }}>{label}</button>
            </span>
          ))}
        </div>
      </div>

      {/* Main */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", padding: "2rem 2rem 6rem", maxWidth: 1400, margin: "0 auto" }} className="product-detail-grid">
        {/* Images */}
        <div>
          <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4", cursor: zoom ? "zoom-out" : "zoom-in" }} onClick={() => setZoom(!zoom)}>
            <img src={mainImg} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", transform: zoom ? "scale(1.4)" : "scale(1)" }} />
            {discount > 0 && <span style={{ position: "absolute", top: 16, right: 16, background: "#c0392b", color: "#fff", fontSize: 12, fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.1em", padding: "4px 10px" }}>-{discount}%</span>}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            {[product.image, product.image2].map((img, i) => (
              <div key={i} onClick={() => setMainImg(img)} style={{ width: 80, height: 100, overflow: "hidden", cursor: "pointer", border: mainImg === img ? "2px solid #6B705C" : "2px solid transparent", transition: "border 0.2s" }}>
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.25em", color: "#6B705C", textTransform: "uppercase", marginBottom: 12 }}>{product.category}</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,3vw,44px)", fontWeight: 400, color: "#111", lineHeight: 1.1, marginBottom: 20 }}>{product.name}</h1>
          <div style={{ display: "flex", gap: 16, alignItems: "baseline", marginBottom: 8 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: "#111" }}>{formatPrice(product.price)}</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#999", textDecoration: "line-through" }}>{formatPrice(product.originalPrice)}</span>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#6B705C", fontStyle: "italic", marginBottom: 32 }}>{product.story}</p>

          {/* Color */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", marginBottom: 12 }}>Colour: <strong style={{ color: "#111" }}>{selectedColor}</strong></p>
            <div style={{ display: "flex", gap: 10 }}>
              {product.colors.map(c => (
                <button key={c} onClick={() => setSelectedColor(c)} style={{ padding: "6px 16px", border: selectedColor === c ? "1px solid #111" : "1px solid rgba(0,0,0,0.2)", background: "transparent", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: selectedColor === c ? "#111" : "#888", transition: "all 0.2s" }}>{c}</button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", margin: 0 }}>Size: <strong style={{ color: "#111" }}>{selectedSize}</strong></p>
              <button onClick={() => setShowSizeGuide(true)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#6B705C", textDecoration: "underline" }}>Size Guide</button>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)} style={{ width: 52, height: 52, border: selectedSize === s ? "1px solid #111" : "1px solid rgba(0,0,0,0.2)", background: selectedSize === s ? "#111" : "transparent", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: selectedSize === s ? "#fff" : "#666", transition: "all 0.2s" }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Quantity + Add */}
          <div style={{ display: "flex", gap: 16, marginBottom: 32, alignItems: "stretch" }}>
            <div style={{ display: "flex", border: "1px solid rgba(0,0,0,0.2)", alignItems: "center" }}>
              <button onClick={() => setQty(Math.max(1, qty-1))} style={{ width: 44, height: 52, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#555" }}>−</button>
              <span style={{ width: 44, textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#111" }}>{qty}</span>
              <button onClick={() => setQty(qty+1)} style={{ width: 44, height: 52, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#555" }}>+</button>
            </div>
            <button onClick={handleAdd} style={{ flex: 1, background: adding ? "#6B705C" : "#111", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", transition: "background 0.3s", height: 52 }}>
              {adding ? "Added to Cart ✓" : "Add to Cart"}
            </button>
          </div>

          <button onClick={() => { handleAdd(); setPage("order"); }} style={{ width: "100%", background: "#6B705C", border: "none", cursor: "pointer", padding: "16px", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", marginBottom: 32 }}>
            Buy Now
          </button>

          {/* Tabs */}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", gap: 0 }}>
              {["description", "details", "care"].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "16px 0", background: "none", border: "none", borderBottom: tab === t ? "2px solid #111" : "2px solid transparent", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: tab === t ? "#111" : "#999", transition: "all 0.2s" }}>{t}</button>
              ))}
            </div>
            <div style={{ padding: "1.5rem 0" }}>
              {tab === "description" && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#555", lineHeight: 1.9 }}>{product.description}</p>}
              {tab === "details" && <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#555", lineHeight: 2 }}>
                <p><strong>Fabric:</strong> Pure natural fibres, handwoven</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Colours:</strong> {product.colors.join(", ")}</p>
                <p><strong>Available Sizes:</strong> {product.sizes.join(", ")}</p>
                <p><strong>Origin:</strong> Handcrafted in India</p>
                <p><strong>Artisan Partnership:</strong> Ethical workshop certified</p>
              </div>}
              {tab === "care" && <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#555", lineHeight: 2 }}>
                <p>• Dry clean recommended for embroidered pieces</p>
                <p>• Gentle hand wash in cold water for lighter fabrics</p>
                <p>• Do not wring or tumble dry</p>
                <p>• Store in the fabric bag provided to protect embroidery</p>
                <p>• Iron on reverse at low heat through a damp cloth</p>
                <p>• Keep away from direct sunlight when storing</p>
              </div>}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ padding: "4rem 2rem 8rem", background: "#f8f7f4", maxWidth: "100%" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <SectionHeading label="You May Also Love" title="Related Pieces" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "2rem" }}>
              {related.map(p => <ProductCard key={p.id} product={p} setPage={setPage} setCurrentProduct={(prod) => { setPage("product"); }} addToCart={addToCart} />)}
            </div>
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }} onClick={() => setShowSizeGuide(false)}>
          <div style={{ background: "#fff", maxWidth: 560, width: "100%", padding: "3rem", position: "relative" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowSizeGuide(false)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#555" }}>×</button>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: "#111", marginBottom: 24 }}>Size Guide</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Cormorant Garamond', serif", fontSize: 15 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e5e5e5" }}>
                  {["Size", "Bust (cm)", "Waist (cm)", "Hip (cm)"].map(h => <th key={h} style={{ padding: "10px 0", textAlign: "left", color: "#999", letterSpacing: "0.1em", fontSize: 12, textTransform: "uppercase" }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[["XS", "78-82", "62-66", "84-88"], ["S", "82-86", "66-70", "88-92"], ["M", "86-90", "70-74", "92-96"], ["L", "90-94", "74-78", "96-100"], ["XL", "94-98", "78-82", "100-104"], ["XXL", "98-104", "82-88", "104-110"]].map(row => (
                  <tr key={row[0]} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    {row.map((cell, i) => <td key={i} style={{ padding: "12px 0", color: i === 0 ? "#111" : "#555", fontWeight: i === 0 ? 600 : 400 }}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style>{`@media(max-width:768px){.product-detail-grid{grid-template-columns:1fr!important}}`}</style>
      <Footer setPage={setPage} />
    </div>
  );
}

function CartPage({ cart, updateCart, removeFromCart, setPage }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const discount = promoApplied ? Math.round(total * 0.1) : 0;

  return (
    <div style={{ paddingTop: 72, minHeight: "80vh" }}>
      <div style={{ padding: "4rem 2rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,4vw,56px)", fontWeight: 300, color: "#111", marginBottom: "3rem" }}>Your Cart</h1>
        </FadeUp>

        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 0" }}>
            <FadeUp>
              <div style={{ marginBottom: 32 }}>
                <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#d0d0d0" strokeWidth="1" style={{ margin: "0 auto" }}>
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "#999", marginBottom: 8 }}>Your cart is empty</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#bbb", marginBottom: 32, fontStyle: "italic" }}>Discover pieces crafted with centuries of intention</p>
              <button onClick={() => setPage("products")} style={{ background: "#111", border: "none", cursor: "pointer", padding: "16px 44px", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>
                Explore Collection
              </button>
            </FadeUp>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "4rem", alignItems: "start" }} className="cart-grid">
            {/* Items */}
            <div>
              {cart.map((item, i) => (
                <FadeUp key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} delay={i * 0.05}>
                  <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "1.5rem", paddingBottom: "2rem", marginBottom: "2rem", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                    <img src={item.image} alt={item.name} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }} />
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.2em", color: "#6B705C", textTransform: "uppercase", marginBottom: 6 }}>{item.category}</p>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 400, color: "#111", marginBottom: 8 }}>{item.name}</h3>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#888", marginBottom: 4 }}>Size: {item.selectedSize} · Colour: {item.selectedColor}</p>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "#111" }}>{formatPrice(item.price)}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ display: "flex", border: "1px solid rgba(0,0,0,0.15)", alignItems: "center" }}>
                          <button onClick={() => updateCart(item, Math.max(1, item.quantity-1))} style={{ width: 36, height: 36, background: "none", border: "none", cursor: "pointer", color: "#555", fontSize: 16 }}>−</button>
                          <span style={{ width: 32, textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 15 }}>{item.quantity}</span>
                          <button onClick={() => updateCart(item, item.quantity+1)} style={{ width: 36, height: 36, background: "none", border: "none", cursor: "pointer", color: "#555", fontSize: 16 }}>+</button>
                        </div>
                        <button onClick={() => removeFromCart(item)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#c0392b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Remove</button>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Summary */}
            <FadeUp delay={0.2}>
              <div style={{ background: "#f8f7f4", padding: "2.5rem", position: "sticky", top: 100 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: "#111", marginBottom: 28, letterSpacing: "0.05em" }}>Order Summary</h2>
                <div style={{ marginBottom: 20 }}>
                  {cart.map(item => (
                    <div key={`${item.id}-${item.selectedSize}`} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#666" }}>{item.name} × {item.quantity}</span>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#111" }}>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 16, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#666" }}>Subtotal</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#111" }}>{formatPrice(total)}</span>
                  </div>
                  {promoApplied && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#6B705C" }}>Promo (10%)</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#6B705C" }}>−{formatPrice(discount)}</span>
                  </div>}
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#666" }}>Shipping</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#6B705C" }}>Complimentary</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 0, marginBottom: 20 }}>
                  <input value={promo} onChange={e => setPromo(e.target.value)} placeholder="Promo code" style={{ flex: 1, padding: "10px 14px", border: "1px solid rgba(0,0,0,0.15)", background: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, outline: "none" }} />
                  <button onClick={() => { if (promo.toUpperCase() === "LAPURANE10") setPromoApplied(true); }} style={{ padding: "10px 16px", background: "#111", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.15em", color: "#fff", textTransform: "uppercase" }}>Apply</button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 20, marginBottom: 24 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 500, color: "#111" }}>Total</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: "#111" }}>{formatPrice(total - discount)}</span>
                </div>
                <button onClick={() => setPage("order")} style={{ width: "100%", background: "#111", border: "none", cursor: "pointer", padding: "18px", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", marginBottom: 12 }}>
                  Proceed to Checkout
                </button>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: "#999", textAlign: "center", fontStyle: "italic" }}>Use code LAPURANE10 for 10% off</p>
              </div>
            </FadeUp>
          </div>
        )}
      </div>
      <style>{`@media(max-width:768px){.cart-grid{grid-template-columns:1fr!important}}`}</style>
      <Footer setPage={setPage} />
    </div>
  );
}

function OrderPage({ cart, setPage }) {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", email: "", address: "", city: "", state: "", pincode: "" });
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.name && form.mobile && form.email && form.address && form.city && form.state && form.pincode;

  if (success) return (
    <div style={{ paddingTop: 72, minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "5rem 2rem" }}>
      <div style={{ textAlign: "center", maxWidth: 560, animation: "fadeInUp 0.8s ease" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#6B705C", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", fontSize: 32, color: "#fff" }}>✓</div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.3em", color: "#6B705C", textTransform: "uppercase", marginBottom: 16 }}>Order Confirmed</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, color: "#111", marginBottom: 20 }}>Thank You, {form.name.split(" ")[0]}</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#666", lineHeight: 1.8, marginBottom: 12, fontStyle: "italic" }}>
          Your order has been received and our atelier team will contact you within 24 hours to confirm details and discuss delivery.
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#888", marginBottom: 40 }}>
          A confirmation has been sent to <strong>{form.email}</strong>. We have also dispatched a WhatsApp message to {form.mobile} with your order summary and tracking details.
        </p>
        <div style={{ background: "#f8f7f4", padding: "2rem", marginBottom: 32, textAlign: "left" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 400, color: "#111", marginBottom: 16 }}>Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#666" }}>{item.name} × {item.quantity}</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#111" }}>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 12, marginTop: 12, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: "#111" }}>Total</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "#111" }}>{formatPrice(total)}</span>
          </div>
        </div>
        <button onClick={() => setPage("home")} style={{ background: "#111", border: "none", cursor: "pointer", padding: "16px 44px", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>
          Continue Shopping
        </button>
      </div>
      <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );

  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: "#f5f3ef", padding: "4rem 2rem 3rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 300, color: "#111" }}>Checkout</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: 0, marginTop: 24 }}>
          {["Delivery", "Review", "Confirm"].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: step > i ? "#6B705C" : step === i+1 ? "#111" : "transparent", border: step <= i ? "1px solid rgba(0,0,0,0.2)" : "none", display: "flex", alignItems: "center", justifyContent: "center", color: step >= i+1 ? "#fff" : "#999", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, transition: "all 0.3s" }}>
                  {step > i+1 ? "✓" : i+1}
                </div>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: step === i+1 ? "#111" : "#999" }}>{s}</span>
              </div>
              {i < 2 && <div style={{ width: 80, height: 1, background: step > i+1 ? "#6B705C" : "rgba(0,0,0,0.15)", margin: "0 12px 20px", transition: "background 0.3s" }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "4rem", padding: "4rem 2rem 8rem", maxWidth: 1200, margin: "0 auto" }} className="order-grid">
        <div>
          {step === 1 && (
            <FadeUp>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: "#111", marginBottom: 32 }}>Delivery Details</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                {[
                  { key: "name", label: "Full Name", type: "text", full: true },
                  { key: "mobile", label: "Mobile Number", type: "tel" },
                  { key: "email", label: "Email Address", type: "email" },
                  { key: "address", label: "Full Address", type: "text", full: true },
                  { key: "city", label: "City" },
                  { key: "state", label: "State" },
                  { key: "pincode", label: "Pincode" },
                ].map(({ key, label, type, full }) => (
                  <div key={key} style={{ gridColumn: full ? "1 / -1" : "auto" }}>
                    <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 8 }}>{label}</label>
                    <input value={form[key]} onChange={e => update(key, e.target.value)} type={type} style={{ width: "100%", padding: "14px 16px", border: "1px solid rgba(0,0,0,0.15)", background: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#111", outline: "none", boxSizing: "border-box", transition: "border 0.2s" }}
                      onFocus={e => e.target.style.borderColor = "#6B705C"}
                      onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.15)"} />
                  </div>
                ))}
              </div>
              <button onClick={() => valid && setStep(2)} style={{ marginTop: 32, background: valid ? "#111" : "#ccc", border: "none", cursor: valid ? "pointer" : "not-allowed", padding: "16px 44px", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>
                Continue to Review
              </button>
            </FadeUp>
          )}
          {step === 2 && (
            <FadeUp>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: "#111", marginBottom: 32 }}>Review Order</h2>
              <div style={{ background: "#f8f7f4", padding: "2rem", marginBottom: 24 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", marginBottom: 16 }}>Delivery To</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#111", lineHeight: 1.8, margin: 0 }}>
                  {form.name}<br/>{form.address}<br/>{form.city}, {form.state} — {form.pincode}<br/>
                  {form.mobile} · {form.email}
                </p>
              </div>
              {cart.map(item => (
                <div key={item.id} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "1.5rem", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                  <img src={item.image} alt={item.name} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }} />
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 400, color: "#111", marginBottom: 6 }}>{item.name}</h3>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#888", marginBottom: 8 }}>Size: {item.selectedSize} · {item.selectedColor} · Qty: {item.quantity}</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 600, color: "#111" }}>{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
                <button onClick={() => setStep(1)} style={{ background: "none", border: "1px solid #111", cursor: "pointer", padding: "14px 32px", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase", color: "#111" }}>Back</button>
                <button onClick={() => setStep(3)} style={{ background: "#111", border: "none", cursor: "pointer", padding: "14px 44px", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>Confirm Order</button>
              </div>
            </FadeUp>
          )}
          {step === 3 && (
            <FadeUp>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: "#111", marginBottom: 24 }}>Payment Method</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 32, fontStyle: "italic" }}>
                For your security and convenience, Là Púráné processes all payments through our trusted payment partner. You will be redirected to a secure payment gateway after confirming your order. We accept UPI, Net Banking, all major credit and debit cards, and EMI options.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: 32 }}>
                {["UPI / GPay", "Credit / Debit Card", "Net Banking", "Cash on Delivery"].map(method => (
                  <div key={method} style={{ padding: "1.5rem", border: "1px solid rgba(0,0,0,0.12)", cursor: "pointer", background: "#f8f7f4", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: "1px solid #6B705C", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#111" }}>{method}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <button onClick={() => setStep(2)} style={{ background: "none", border: "1px solid #111", cursor: "pointer", padding: "14px 32px", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase", color: "#111" }}>Back</button>
                <button onClick={() => setSuccess(true)} style={{ background: "#6B705C", border: "none", cursor: "pointer", padding: "14px 44px", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>Place Order — {formatPrice(total)}</button>
              </div>
            </FadeUp>
          )}
        </div>

        {/* Order summary sidebar */}
        <FadeUp delay={0.15}>
          <div style={{ background: "#f8f7f4", padding: "2.5rem", position: "sticky", top: 100 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 400, color: "#111", marginBottom: 24 }}>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} style={{ display: "flex", gap: "1rem", marginBottom: 16 }}>
                <img src={item.image} alt={item.name} style={{ width: 60, height: 76, objectFit: "cover", flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#111", marginBottom: 4, fontWeight: 500 }}>{item.name}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#888" }}>× {item.quantity}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#111", fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 16, marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#666" }}>Shipping</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#6B705C" }}>Complimentary</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 600, color: "#111" }}>Total</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#111" }}>{formatPrice(total)}</span>
              </div>
            </div>
            <div style={{ marginTop: 24, padding: "1.25rem", background: "rgba(107,112,92,0.08)", borderLeft: "3px solid #6B705C" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#555", margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
                All orders include complimentary gift packaging, a handwritten note, and a certificate of authenticity from our artisan partners.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
      <style>{`@media(max-width:768px){.order-grid{grid-template-columns:1fr!important}}`}</style>
      <Footer setPage={setPage} />
    </div>
  );
}

function ContactPage({ setPage }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const contactDetails = [
    { icon: "📍", label: "Atelier", value: "17, Palasia Square, Indore, Madhya Pradesh 452001" },
    { icon: "📞", label: "Telephone", value: "+91 731 456 7890" },
    { icon: "✉️", label: "Email", value: "hello@lapurane.com" },
    { icon: "🕐", label: "Hours", value: "Mon – Sat: 10:00 – 19:00" },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: "#f5f3ef", padding: "5rem 2rem 4rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.3em", color: "#6B705C", textTransform: "uppercase", marginBottom: 16 }}>Get in Touch</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,72px)", fontWeight: 300, color: "#111", margin: 0 }}>Contact Us</h1>
      </div>

      <section style={{ padding: "6rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }} className="contact-grid">
          <FadeUp>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.3em", color: "#6B705C", textTransform: "uppercase", marginBottom: 16 }}>We'd Love to Hear From You</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px,2.5vw,38px)", fontWeight: 300, color: "#111", marginBottom: 24, lineHeight: 1.2 }}>Personal styling, bridal appointments, and bespoke consultations</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#666", lineHeight: 1.9, marginBottom: 40 }}>
                Whether you are dressing for the most important day of your life, looking for a styling consultation, or simply wish to know more about the craft behind our pieces — our team is here to guide you. We believe the relationship between a Là Púráné patron and our atelier is as important as the garment itself. We take the time to understand you, your occasion, and your vision before we begin.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {contactDetails.map((item, i) => (
                  <FadeUp key={i} delay={i * 0.1}>
                    <div style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: "1.5rem", background: "#f8f7f4", borderLeft: "3px solid #6B705C" }}>
                      <span style={{ fontSize: 22 }}>{item.icon}</span>
                      <div>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", margin: "0 0 6px" }}>{item.label}</p>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#111", margin: 0 }}>{item.value}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "4rem 2rem", background: "#f8f7f4" }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>✉️</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 300, color: "#111", marginBottom: 16 }}>Message Received</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#666", lineHeight: 1.8, fontStyle: "italic" }}>Thank you for writing to us. A member of our atelier team will respond within 24 hours. We look forward to the conversation.</p>
              </div>
            ) : (
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: "#111", marginBottom: 32 }}>Send a Message</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    { key: "name", label: "Your Name", type: "text" },
                    { key: "email", label: "Email Address", type: "email" },
                    { key: "subject", label: "Subject", type: "text" },
                  ].map(({ key, label, type }) => (
                    <div key={key}>
                      <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 8 }}>{label}</label>
                      <input value={form[key]} onChange={e => update(key, e.target.value)} type={type} style={{ width: "100%", padding: "14px 16px", border: "1px solid rgba(0,0,0,0.15)", background: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#111", outline: "none", boxSizing: "border-box" }}
                        onFocus={e => e.target.style.borderColor = "#6B705C"}
                        onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.15)"} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 8 }}>Message</label>
                    <textarea value={form.message} onChange={e => update("message", e.target.value)} rows={6} style={{ width: "100%", padding: "14px 16px", border: "1px solid rgba(0,0,0,0.15)", background: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#111", outline: "none", boxSizing: "border-box", resize: "vertical" }}
                      onFocus={e => e.target.style.borderColor = "#6B705C"}
                      onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.15)"} />
                  </div>
                  <button onClick={() => form.name && form.email && form.message && setSent(true)} style={{ background: "#111", border: "none", cursor: "pointer", padding: "16px", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", transition: "background 0.3s" }}>
                    Send Message
                  </button>
                </div>
              </div>
            )}
          </FadeUp>
        </div>
        <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
      </section>

      {/* Map placeholder */}
      <div style={{ height: 400, background: "#e8e5df", position: "relative", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1800&q=85" alt="Map" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", padding: "2.5rem 3rem", textAlign: "center", maxWidth: 400 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.25em", color: "#6B705C", textTransform: "uppercase", marginBottom: 12 }}>Atelier Location</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 400, color: "#111", margin: "0 0 8px" }}>Là Púráné Atelier</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#777", fontStyle: "italic" }}>17, Palasia Square, Indore</p>
          </div>
        </div>
      </div>

      <Footer setPage={setPage} />
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: "#111", color: "#fff", padding: "5rem 2rem 2rem" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "4rem", marginBottom: "4rem" }} className="footer-grid">
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, letterSpacing: "0.12em", color: "#fff", marginBottom: 20 }}>LÀ PÚRÁNÉ</h3>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.9, maxWidth: 320, fontStyle: "italic" }}>
              Luxury Indian fashion crafted with generations of artisan knowledge. Every thread tells a story. Every garment carries a heritage.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
              {["Instagram", "Pinterest", "WhatsApp"].map(s => (
                <span key={s} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", cursor: "pointer", borderBottom: "1px solid rgba(107,112,92,0.5)", paddingBottom: 2 }}>{s}</span>
              ))}
            </div>
          </div>
          {[
            { title: "Navigate", links: [["home","Home"],["products","Collection"],["about","Our Story"],["contact","Contact"]] },
            { title: "Support", links: [["contact","Size Guide"],["contact","Care Instructions"],["contact","Returns Policy"],["contact","FAQ"]] },
            { title: "Legal", links: [["home","Privacy Policy"],["home","Terms of Service"],["home","Cookie Policy"],["home","Sitemap"]] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#6B705C", marginBottom: 20 }}>{col.title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map(([pg, label]) => (
                  <button key={label} onClick={() => setPage(pg)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "rgba(255,255,255,0.5)", textAlign: "left", padding: 0, transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.9)"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>© 2025 Là Púráné. All rights reserved. Crafted in India, worn worldwide.</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0, fontStyle: "italic" }}>The art of wearing heritage</p>
        </div>
      </div>
      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr!important;gap:2.5rem!important}}`}</style>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [currentProduct, setCurrentProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setTimeout(() => setLoading(false), 1800); }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const addToCart = useCallback((item) => {
    setCart(prev => {
      const key = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
      const existing = prev.find(i => `${i.id}-${i.selectedSize}-${i.selectedColor}` === key);
      if (existing) return prev.map(i => `${i.id}-${i.selectedSize}-${i.selectedColor}` === key ? { ...i, quantity: i.quantity + item.quantity } : i);
      return [...prev, item];
    });
  }, []);

  const updateCart = useCallback((item, quantity) => {
    const key = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
    setCart(prev => prev.map(i => `${i.id}-${i.selectedSize}-${i.selectedColor}` === key ? { ...i, quantity } : i));
  }, []);

  const removeFromCart = useCallback((item) => {
    const key = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
    setCart(prev => prev.filter(i => `${i.id}-${i.selectedSize}-${i.selectedColor}` !== key));
  }, []);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const setPageAndProduct = useCallback((pg) => {
    setPage(pg);
  }, []);

  const setCurrentProductAndPage = useCallback((product) => {
    setCurrentProduct(product);
    setPage("product");
    window.scrollTo(0, 0);
  }, []);

  if (loading) return (
    <div style={{ position: "fixed", inset: 0, background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
      <div style={{ animation: "pulse 1.5s ease-in-out infinite" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, letterSpacing: "0.2em", color: "#111", margin: "0 0 16px" }}>LÀ PÚRÁNÉ</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.3em", color: "#6B705C", textAlign: "center", textTransform: "uppercase", fontStyle: "italic" }}>The Art of Wearing Heritage</p>
      </div>
      <div style={{ position: "absolute", bottom: 48, width: 240, height: 1, background: "#e5e5e5", overflow: "hidden" }}>
        <div style={{ height: "100%", background: "#6B705C", animation: "load 1.6s ease forwards" }} />
      </div>
      <style>{`
        @keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}
        @keyframes load{from{width:0}to{width:100%}}
      `}</style>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', serif", background: "#fff", minHeight: "100vh" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap" rel="stylesheet" />

      <Navbar page={page} setPage={setPage} cartCount={cartCount} />

      <div style={{ animation: "pageIn 0.5s ease" }}>
        {page === "home" && <HomePage setPage={setPageAndProduct} setCurrentProduct={setCurrentProductAndPage} cart={cart} addToCart={addToCart} />}
        {page === "about" && <AboutPage setPage={setPage} />}
        {page === "products" && <ProductsPage setPage={setPage} setCurrentProduct={setCurrentProductAndPage} addToCart={addToCart} />}
        {page === "product" && currentProduct && <ProductDetailPage product={currentProduct} setPage={setPage} addToCart={addToCart} cart={cart} />}
        {page === "cart" && <CartPage cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} setPage={setPage} />}
        {page === "order" && <OrderPage cart={cart} setPage={setPage} />}
        {page === "contact" && <ContactPage setPage={setPage} />}
      </div>

      <style>{`
        @keyframes pageIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:#f5f3ef}
        ::-webkit-scrollbar-thumb{background:#6B705C;border-radius:3px}
        button:hover{opacity:0.9}
        input::placeholder,textarea::placeholder{color:rgba(0,0,0,0.3)}
      `}</style>
    </div>
  );
}