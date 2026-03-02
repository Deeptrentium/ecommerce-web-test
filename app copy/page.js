import Link from 'next/link';

const featuredProducts = [
    { id: 1, name: 'AirPods Pro Max', price: '$549', oldPrice: '$699', rating: 5, reviews: 2341, tag: 'Best Seller', emoji: '🎧' },
    { id: 2, name: 'MacBook Pro 16"', price: '$2,399', oldPrice: '$2,799', rating: 5, reviews: 1892, tag: 'New', emoji: '💻' },
    { id: 3, name: 'iPhone 15 Ultra', price: '$1,199', oldPrice: '$1,399', rating: 4, reviews: 4521, tag: 'Hot', emoji: '📱' },
    { id: 4, name: 'Apple Watch S9', price: '$399', oldPrice: '$499', rating: 5, reviews: 3102, tag: 'Sale', emoji: '⌚' },
];

const categories = [
    { name: 'Electronics', emoji: '⚡', count: '240+ items', color: '#6c63ff' },
    { name: 'Fashion', emoji: '👗', count: '580+ items', color: '#ec4899' },
    { name: 'Home & Living', emoji: '🏠', count: '320+ items', color: '#10b981' },
    { name: 'Sports', emoji: '🏋️', count: '190+ items', color: '#f59e0b' },
    { name: 'Beauty', emoji: '💄', count: '450+ items', color: '#a855f7' },
    { name: 'Books', emoji: '📚', count: '1200+ items', color: '#06b6d4' },
];

const stats = [
    { value: '50K+', label: 'Happy Customers' },
    { value: '10K+', label: 'Products' },
    { value: '99%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Support' },
];

export default function HomePage() {
    return (
        <div className="page-wrapper">

            {/* Hero Section */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                background: 'radial-gradient(ellipse at 20% 50%, rgba(108,99,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.1) 0%, transparent 50%), var(--bg-primary)',
                padding: '0 48px',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Decorative blobs */}
                <div style={{
                    position: 'absolute', top: '15%', right: '10%',
                    width: '400px', height: '400px',
                    background: 'radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)',
                    borderRadius: '50%', filter: 'blur(40px)', animation: 'float 6s ease-in-out infinite'
                }} />
                <div style={{
                    position: 'absolute', bottom: '20%', left: '5%',
                    width: '300px', height: '300px',
                    background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)',
                    borderRadius: '50%', filter: 'blur(40px)', animation: 'float 8s ease-in-out infinite reverse'
                }} />

                <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
                    <div style={{ animation: 'fadeInUp 0.8s ease' }}>
                        <div className="badge badge-primary" style={{ marginBottom: '24px' }}>
                            🚀 New Collection 2026
                        </div>
                        <h1 style={{
                            fontSize: '4rem', fontWeight: '900', lineHeight: '1.1',
                            letterSpacing: '-2px', marginBottom: '24px',
                        }}>
                            Shop the{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #6c63ff, #a855f7, #ec4899)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                            }}>
                                Future
                            </span>
                            <br />of Retail
                        </h1>
                        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: '1.7', maxWidth: '480px' }}>
                            Discover thousands of premium products handpicked for you. Enjoy fast shipping, easy returns, and unbeatable prices every day.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <Link href="/products" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
                                Shop Now →
                            </Link>
                            <Link href="/products" className="btn btn-outline" style={{ fontSize: '1rem', padding: '14px 32px' }}>
                                View Deals
                            </Link>
                        </div>

                        {/* Stats */}
                        <div style={{ display: 'flex', gap: '40px', marginTop: '56px', paddingTop: '40px', borderTop: '1px solid var(--border-glass)' }}>
                            {stats.map(({ value, label }) => (
                                <div key={label}>
                                    <div style={{ fontSize: '1.8rem', fontWeight: '800', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{value}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hero Visual */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', animation: 'float 5s ease-in-out infinite' }}>
                        <div style={{
                            width: '380px', height: '380px',
                            background: 'var(--gradient-card)',
                            border: '1px solid var(--border-glass)',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '160px',
                            boxShadow: '0 0 80px rgba(108,99,255,0.3)',
                            position: 'relative',
                        }}>
                            🛍️
                            <div style={{
                                position: 'absolute', top: '30px', right: '20px',
                                background: 'rgba(16,185,129,0.9)', backdropFilter: 'blur(10px)',
                                padding: '8px 16px', borderRadius: '100px',
                                fontSize: '0.8rem', fontWeight: '700', color: 'white',
                                boxShadow: '0 4px 16px rgba(16,185,129,0.4)'
                            }}>
                                ✓ Free Shipping
                            </div>
                            <div style={{
                                position: 'absolute', bottom: '40px', left: '10px',
                                background: 'rgba(108,99,255,0.9)', backdropFilter: 'blur(10px)',
                                padding: '8px 16px', borderRadius: '100px',
                                fontSize: '0.8rem', fontWeight: '700', color: 'white',
                                boxShadow: '0 4px 16px rgba(108,99,255,0.4)'
                            }}>
                                ⚡ Flash Sales
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="section">
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Browse by Category</div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px' }}>Shop by Category</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '12px', fontSize: '1.05rem' }}>Find exactly what you're looking for</p>
                </div>
                <div className="grid-3">
                    {categories.map(({ name, emoji, count, color }) => (
                        <Link key={name} href="/products" style={{ textDecoration: 'none' }}>
                            <div className="card" style={{
                                display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer',
                                background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
                                borderColor: `${color}30`,
                            }}>
                                <div style={{
                                    width: '60px', height: '60px', borderRadius: '16px',
                                    background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '28px', flexShrink: 0,
                                }}>
                                    {emoji}
                                </div>
                                <div>
                                    <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>{name}</div>
                                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{count}</div>
                                </div>
                                <div style={{ marginLeft: 'auto', color: color, fontSize: '1.2rem' }}>→</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="section" style={{ paddingTop: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
                    <div>
                        <div className="badge badge-primary" style={{ marginBottom: '12px' }}>✨ Handpicked</div>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-1px' }}>Featured Products</h2>
                    </div>
                    <Link href="/products" className="btn btn-outline">View All →</Link>
                </div>
                <div className="grid-4">
                    {featuredProducts.map(({ id, name, price, oldPrice, rating, reviews, tag, emoji }) => (
                        <div key={id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                            <div style={{
                                height: '180px', background: 'var(--gradient-card)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '72px', position: 'relative',
                            }}>
                                {emoji}
                                <div className="badge badge-primary" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                                    {tag}
                                </div>
                            </div>
                            <div style={{ padding: '20px' }}>
                                <h3 style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '8px' }}>{name}</h3>
                                <div className="stars" style={{ marginBottom: '8px', fontSize: '0.85rem' }}>
                                    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                                    <span style={{ color: 'var(--text-secondary)', marginLeft: '6px', fontSize: '0.8rem' }}>({reviews.toLocaleString()})</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                                    <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-primary)' }}>{price}</span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>{oldPrice}</span>
                                </div>
                                <button className="btn btn-primary" style={{ width: '100%', fontSize: '0.85rem' }}>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Banner CTA */}
            <section style={{ padding: '0 48px 80px' }}>
                <div style={{
                    maxWidth: '1280px', margin: '0 auto',
                    background: 'linear-gradient(135deg, #6c63ff 0%, #a855f7 50%, #ec4899 100%)',
                    borderRadius: 'var(--radius-xl)', padding: '64px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute', top: '-50%', right: '-10%',
                        width: '400px', height: '400px',
                        background: 'rgba(255,255,255,0.08)',
                        borderRadius: '50%',
                    }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '12px', letterSpacing: '-1px' }}>
                            Get 20% Off Your First Order! 🎉
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem' }}>
                            Sign up today and unlock exclusive deals just for you.
                        </p>
                    </div>
                    <Link href="/register" className="btn" style={{
                        background: 'white', color: '#6c63ff', borderRadius: '12px',
                        padding: '14px 32px', fontSize: '1rem', fontWeight: '700',
                        flexShrink: 0, position: 'relative', zIndex: 1,
                        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    }}>
                        Claim Offer →
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                borderTop: '1px solid var(--border-glass)',
                padding: '40px 48px',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.875rem',
            }}>
                <div style={{ marginBottom: '8px', fontSize: '1.4rem', fontWeight: '800', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    ⚡ NexStore
                </div>
                © 2026 NexStore. All rights reserved. Built with ❤️ and Next.js
            </footer>
        </div>
    );
}
