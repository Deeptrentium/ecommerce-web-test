'use client';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ALL_PRODUCTS } from './products/data';

const featuredProducts = ALL_PRODUCTS.slice(40, 50); // Different selection for hero feel

export default function HomePage() {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const scroll = (offset) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
        }
    };

    // Auto-scroll logic for the "one image to another" feel
    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
                if (scrollRef.current.scrollLeft >= maxScroll - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollRef.current.scrollBy({ left: 450, behavior: 'smooth' });
                }
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ animation: 'fadeInUp 1s cubic-bezier(0.2, 0, 0, 1)' }}>

            {/* ─── ELITE HUB: SEARCH & STATUS ─── */}
            <div className="elite-hub">
                <div className="search-bar-container">
                    <div className="search-catalogue">
                        CATALOGUE <span style={{ marginLeft: '12px', fontSize: '0.7rem', opacity: 0.5 }}>▼</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Search for premium products and brands..."
                        className="search-input"
                    />
                    <button className="btn btn-primary search-btn">SEARCH</button>
                </div>

                <div className="status-badge">
                    <div className="status-icon">🛡️</div>
                    <div style={{ textAlign: 'left' }}>
                        <div className="status-title">Verified Store</div>
                        <div className="status-subtitle">TRUSTED BY 140K+ USER</div>
                    </div>
                </div>
            </div>

            {/* ─── LUXURY HERO CANVAS ─── */}
            <div style={{
                background: 'linear-gradient(135deg, #12121c 0%, #08080c 100%)',
                border: '1px solid var(--border-glass)',
                position: 'relative', overflow: 'hidden', borderRadius: '48px',
                padding: '100px 80px', minHeight: '520px', display: 'flex', alignItems: 'center',
                boxShadow: '0 40px 80px -20px rgba(0,0,0,1)', marginBottom: '40px'
            }}>
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)', filter: 'blur(80px)' }} />
                <div style={{ position: 'absolute', bottom: '-20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(236,72,153,0.1), transparent 70%)', filter: 'blur(80px)' }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '650px' }}>
                    <div className="badge" style={{ marginBottom: '32px', padding: '10px 24px', fontSize: '0.8rem', color: 'white', background: 'var(--gradient-master)', border: 'none' }}>
                        NEW ARIVAL · COLLECTION 2026
                    </div>
                    <h1 style={{ fontSize: 'clamp(3.5rem, 5.5rem, 5.5rem)', fontWeight: '900', lineHeight: 0.9, color: 'white', marginBottom: '32px', letterSpacing: '-4px' }}>
                        Redefining <br />Luxury.
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '56px', lineHeight: 1.6, maxWidth: '500px' }}>
                        Discover a curated world of high-end technology, fashion, and lifestyle essentials. Quality without compromise.
                    </p>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <Link href="/products" className="btn btn-primary" style={{ padding: '20px 52px', fontSize: '1.2rem', borderRadius: '20px' }}>Shop Collection</Link>
                        <Link href="/products" className="btn btn-outline" style={{ padding: '20px 48px', fontSize: '1.2rem', borderRadius: '20px' }}>View Exclusives</Link>
                    </div>
                </div>

                <div style={{
                    position: 'absolute', right: '80px', top: '50%', transform: 'translateY(-50%)',
                    fontSize: '280px', opacity: 0.9, animation: 'float 8s ease-in-out infinite',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))'
                }}>
                    🛸
                </div>
            </div>

            {/* ─── TRENDING SLIDER DISCOVERY ─── */}
            <section style={{ padding: '60px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
                    <div>
                        <div className="badge" style={{ marginBottom: '16px', color: 'var(--accent-gold)' }}>⭐ ELITE PICKS</div>
                        <h2 style={{ fontSize: '3.2rem', fontWeight: '900', color: 'white', letterSpacing: '-2px' }}>Curated Selections</h2>
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button onClick={() => scroll(-450)} className="btn btn-outline" style={{ shadow: '0 4px 15px rgba(0,0,0,0.3)', width: '64px', height: '64px', padding: 0, borderRadius: '20px', fontSize: '1.5rem', background: 'rgba(255,255,255,0.03)' }}>‹</button>
                        <button onClick={() => scroll(450)} className="btn btn-outline" style={{ shadow: '0 4px 15px rgba(0,0,0,0.3)', width: '64px', height: '64px', padding: 0, borderRadius: '20px', fontSize: '1.5rem', background: 'rgba(255,255,255,0.03)' }}>›</button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    style={{
                        display: 'flex',
                        gap: '32px',
                        overflowX: 'auto',
                        paddingBottom: '40px',
                        scrollBehavior: 'smooth',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        cursor: 'grab'
                    }}
                    onMouseDown={(e) => {
                        e.currentTarget.style.cursor = 'grabbing';
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.cursor = 'grab';
                    }}
                >
                    <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                    {featuredProducts.map((product, idx) => (
                        <div key={product.id} style={{ minWidth: '400px', flex: '0 0 auto', scrollSnapAlign: 'start' }}>
                            <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                                <div className="card" style={{ padding: 0, overflow: 'hidden', height: '100%', borderRadius: '32px', border: '1px solid var(--border-glass)' }}>
                                    <div style={{ aspectRatio: '16/10', width: '100%', position: 'relative', overflow: 'hidden', background: '#0a0a0f' }}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.5s cubic-bezier(0.2, 0, 0, 1)' }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                        />
                                        <div style={{ position: 'absolute', top: '24px', left: '24px', padding: '8px 16px', background: 'var(--gradient-master)', borderRadius: '12px', color: 'white', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '1px' }}>
                                            {product.tag?.toUpperCase() || 'FEATURED'}
                                        </div>
                                    </div>
                                    <div style={{ padding: '32px' }}>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: '900', letterSpacing: '2px', marginBottom: '8px' }}>{product.category.toUpperCase()}</div>
                                        <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: '950', marginBottom: '16px', letterSpacing: '-0.5px' }}>{product.name}</h3>
                                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                            <div>
                                                {product.oldPrice && (
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginBottom: '4px' }}>
                                                        ₹{product.oldPrice.toLocaleString('en-IN')}
                                                    </div>
                                                )}
                                                <div style={{ fontSize: '1.8rem', fontWeight: '950', color: 'white', letterSpacing: '-1px' }}>₹{product.price.toLocaleString('en-IN')}</div>
                                            </div>
                                            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.4rem' }}>🛒</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── PROFESSIONAL BENEFITS ─── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', padding: '40px 0 100px' }}>
                {[
                    { icon: '🚀', title: 'Sonic Delivery', desc: 'World-class logistics network delivering to your door in 24 hours.' },
                    { icon: '💎', title: 'Authentic Luxury', desc: 'Every item is manually verified by our team of certified experts.' },
                    { icon: '🎧', title: 'Elite Support', desc: 'Dedicated concierge service available 24/7 for our premium members.' }
                ].map((item, i) => (
                    <div key={i} className="card" style={{ padding: '48px', textAlign: 'center', background: 'var(--bg-glass)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '24px' }}>{item.icon}</div>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white', marginBottom: '16px' }}>{item.title}</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
