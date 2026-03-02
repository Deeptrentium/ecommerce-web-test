'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProductById, ALL_PRODUCTS } from '../data';
import { useCart } from '../../context/CartContext';

const TAG_COLORS = {
    'Bestseller': { bg: 'rgba(139,92,246,0.2)', color: '#a78bfa', border: 'rgba(139,92,246,0.5)' },
    'Trending': { bg: 'rgba(16,185,129,0.2)', color: '#34d399', border: 'rgba(16,185,129,0.5)' },
    'New': { bg: 'rgba(236,72,153,0.2)', color: '#f472b6', border: 'rgba(236,72,153,0.5)' },
};

function Stars({ rating, size = '1rem' }) {
    return (
        <span style={{ display: 'inline-flex', gap: '4px', color: '#f59e0b', fontSize: size }}>
            {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ opacity: i < Math.floor(rating) ? 1 : 0.2 }}>★</span>
            ))}
        </span>
    );
}

export default function ProductDetailPage() {
    const { id } = useParams();
    const product = getProductById(id);

    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const [activeTab, setTab] = useState('desc');
    const [currentImageIdx, setCurrentImageIdx] = useState(0);

    const hasImages = product?.images && product.images.length > 0;
    const currentImageUrl = hasImages ? product.images[currentImageIdx] : product?.image;

    const { addToCart } = useCart();

    const related = ALL_PRODUCTS.filter(
        p => p.category === product?.category && p.id !== product?.id
    ).slice(0, 4);

    if (!product) {
        return (
            <div style={{ textAlign: 'center', paddingTop: '100px', animation: 'fadeInUp 1s ease' }}>
                <div style={{ fontSize: '100px', marginBottom: '32px' }}>🔎</div>
                <h1 style={{ fontSize: '3rem', fontWeight: '900', color: 'white', marginBottom: '16px' }}>Collection Not Found.</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '48px' }}>The item you requested is no longer in our curated catalogue.</p>
                <Link href="/products" className="btn btn-primary" style={{ padding: '20px 52px', fontSize: '1.1rem', borderRadius: '20px' }}>
                    Return to Catalogue
                </Link>
            </div>
        );
    }

    const tagStyle = TAG_COLORS[product.tag];

    const handleAddToCart = () => {
        addToCart(product, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0, 0, 1)' }}>
            
            {/* ─── NAVIGATION BAR ─── */}
            <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '60px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>HOME</Link>
                    <span style={{ opacity: 0.3 }}>/</span>
                    <Link href="/products" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>CATALOGUE</Link>
                    <span style={{ opacity: 0.3 }}>/</span>
                    <span style={{ color: 'var(--accent-soft-purple)' }}>{product.name}</span>
                </div>
                <Link href="/products" style={{ fontSize: '0.85rem', fontWeight: '900', color: 'white', textDecoration: 'none', opacity: 0.6 }}>
                    Back to Selection ↲
                </Link>
            </nav>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'start', marginBottom: '80px' }}>
                
                {/* ─── LEFT: PREVIEW GALLERY ─── */}
                <div style={{ position: 'sticky', top: '120px' }}>
                    <div style={{ 
                        background: '#0a0a0f', 
                        borderRadius: '40px', 
                        border: '1px solid var(--border-glass)',
                        aspectRatio: '1/1',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative', overflow: 'hidden',
                        boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)'
                    }}>
                        {/* Dramatic Glow */}
                        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)', filter: 'blur(50px)' }} />
                        
                        <img 
                            src={currentImageUrl} 
                            alt={product.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.5s cubic-bezier(0.2, 0, 0, 1)' }} 
                            onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                        />

                        {tagStyle && (
                            <div style={{ 
                                position: 'absolute', top: '32px', left: '32px', 
                                padding: '12px 24px', borderRadius: '16px', 
                                background: tagStyle.bg, color: tagStyle.color, 
                                border: `1px solid ${tagStyle.border}`,
                                fontSize: '0.8rem', fontWeight: '900', letterSpacing: '1px',
                                backdropFilter: 'blur(10px)'
                            }}>
                                {product.tag.toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* Thumbnails if available */}
                    {hasImages && (
                        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                            {product.images.map((img, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => setCurrentImageIdx(i)}
                                    style={{ 
                                        width: '80px', height: '80px', borderRadius: '16px', overflow: 'hidden',
                                        border: currentImageIdx === i ? '2px solid var(--accent-purple)' : '2px solid transparent',
                                        padding: 0, cursor: 'pointer', background: '#0a0a0f', transition: 'all 0.3s'
                                    }}
                                >
                                    <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: currentImageIdx === i ? 1 : 0.4 }} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── RIGHT: PRODUCT ARCHITECTURE ─── */}
                <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--accent-purple)', fontWeight: '900', letterSpacing: '2px', marginBottom: '16px' }}>
                        {product.category.toUpperCase()}
                    </div>
                    
                    <h1 style={{ fontSize: 'clamp(2.5rem, 3.8rem, 3.8rem)', fontWeight: '950', color: 'white', letterSpacing: '-3px', lineHeight: 1.1, marginBottom: '24px' }}>
                        {product.name}
                    </h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                        <Stars rating={product.rating} size="1.3rem" />
                        <span style={{ height: '20px', width: '1px', background: 'var(--border-glass)' }} />
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '700' }}>
                            {product.rating}.0 RATING · {product.reviews} VERIFIED REVIEWS
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', marginBottom: '20px' }}>
                        <div style={{ fontSize: '3.5rem', fontWeight: '950', color: 'white', letterSpacing: '-2px', lineHeight: 1 }}>
                            ₹{product.price.toLocaleString('en-IN')}
                        </div>
                        {product.oldPrice && (
                            <div style={{ fontSize: '1.4rem', color: 'var(--text-muted)', textDecoration: 'line-through', fontWeight: '700', marginBottom: '4px' }}>
                                ₹{product.oldPrice.toLocaleString('en-IN')}
                            </div>
                        )}
                        <div style={{ 
                            padding: '10px 18px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)', color: '#10b981', 
                            fontSize: '0.9rem', fontWeight: '900', marginBottom: '6px' 
                        }}>
                             SAVE {Math.round((1 - product.price/product.oldPrice) * 100)}% TODAY
                        </div>
                    </div>

                    <p style={{ color: 'var(--accent-green)', fontWeight: '800', fontSize: '0.85rem', marginBottom: '48px' }}>
                        ✓ PRIORITY SHIPPING AVAILABLE · ✓ LIFETIME SUPPORT INCLUDED
                    </p>

                    <div style={{ height: '1px', background: 'var(--border-glass)', marginBottom: '48px' }} />

                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: '500', marginBottom: '56px' }}>
                        {product.longDesc || product.desc}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '24px', marginBottom: '40px' }}>
                        {/* QTY Control */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)',
                            borderRadius: '24px', padding: '8px'
                        }}>
                            <button onClick={() => setQty(q => Math.max(1, q-1))} style={{ width: '48px', height: '48px', borderRadius: '16px', border: 'none', background: 'transparent', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>−</button>
                            <span style={{ flex: 1, textAlign: 'center', fontWeight: '900', fontSize: '1.2rem', color: 'white' }}>{qty}</span>
                            <button onClick={() => setQty(q => q+1)} style={{ width: '48px', height: '48px', borderRadius: '16px', border: 'none', background: 'var(--gradient-master)', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>+</button>
                        </div>

                        {/* CTA */}
                        <button 
                            onClick={handleAddToCart}
                            className="submit-btn" 
                            style={{ 
                                margin: 0, height: '64px', fontSize: '1.2rem', borderRadius: '24px',
                                background: added ? '#10b981' : 'var(--gradient-master)'
                            }}
                        >
                            {added ? 'ITEM ADDED ✓' : `ADD TO BASKET — ₹${(product.price * qty).toLocaleString('en-IN')}`}
                        </button>
                    </div>

                    {/* Trust Signals */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '24px', border: '1px solid var(--border-glass)' }}>
                        {[
                            { icon: '🔒', text: 'SECURE' },
                            { icon: '🚚', text: 'FAST' },
                            { icon: '⭐', text: 'ELITE' },
                            { icon: '🛡️', text: 'WARRANTY' }
                        ].map((item, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{item.icon}</div>
                                <div style={{ fontSize: '0.65rem', fontWeight: '900', color: 'var(--text-muted)' }}>{item.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── TABS: DEEP DATA ─── */}
            <section style={{ marginBottom: '100px' }}>
                <div style={{ display: 'flex', gap: '48px', borderBottom: '1px solid var(--border-glass)', marginBottom: '48px' }}>
                    {['desc', 'specs'].map(t => (
                        <button 
                            key={t}
                            onClick={() => setTab(t)}
                            style={{ 
                                padding: '20px 0', background: 'transparent', border: 'none',
                                borderBottom: activeTab === t ? '3px solid white' : '3px solid transparent',
                                color: activeTab === t ? 'white' : 'var(--text-muted)',
                                fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.3s'
                            }}
                        >
                            {t === 'desc' ? 'SPECIFICATIONS & DETAILS' : 'TECHNICAL ARCHITECTURE'}
                        </button>
                    ))}
                </div>

                <div style={{ maxWidth: '800px', lineHeight: 1.8, fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                    {activeTab === 'desc' ? (
                        <div style={{ animation: 'fadeInUp 0.5s ease' }}>
                            {product.longDesc}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '40px' }}>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '16px' }}>Verified Highlights</h4>
                                    <ul style={{ paddingLeft: '20px', fontSize: '0.95rem' }}>
                                        <li>Premium Grade Build Quality</li>
                                        <li>Enterprise Standard Durability</li>
                                        <li>Hand-Inspected for Perfection</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '16px' }}>Package Contents</h4>
                                    <ul style={{ paddingLeft: '20px', fontSize: '0.95rem' }}>
                                        <li>Master {product.name} Unit</li>
                                        <li>Luxury Protection Sleeve</li>
                                        <li>Digital Authenticity Certificate</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ animation: 'fadeInUp 0.5s ease' }}>
                            {product.specs.map((s, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <span style={{ fontWeight: '800', color: 'white' }}>{s.label}</span>
                                    <span style={{ color: 'var(--accent-soft-purple)', fontWeight: '600' }}>{s.value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ─── SUGGESTIONS ─── */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '2.4rem', fontWeight: '950', color: 'white', letterSpacing: '-2px' }}>Curated Recommendations.</h2>
                    <Link href="/products" style={{ color: 'var(--accent-soft-purple)', fontWeight: '900', textDecoration: 'none', fontSize: '0.9rem' }}>DISCOVER ALL →</Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
                    {related.map(p => (
                        <Link key={p.id} href={`/products/${p.id}`} style={{ textDecoration: 'none' }}>
                            <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '24px' }}>
                                <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#0a0a0f' }}>
                                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '24px' }}>
                                    <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: '800', marginBottom: '8px' }}>{p.name}</h4>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontWeight: '900', color: 'white', fontSize: '1.2rem' }}>₹{p.price.toLocaleString('en-IN')}</div>
                                        <Stars rating={p.rating} size="0.75rem" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
