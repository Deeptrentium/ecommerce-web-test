'use client';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ALL_PRODUCTS } from './data';
import { useCart } from '../context/CartContext';

const ITEMS_PER_PAGE = 24;

function Stars({ rating }) {
    return (
        <div style={{ display: 'flex', gap: '3px', color: '#f59e0b', fontSize: '0.85rem' }}>
            {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ opacity: i < Math.floor(rating) ? 1 : 0.3 }}>★</span>
            ))}
        </div>
    );
}

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [page, setPage] = useState(1);
    const [addedIds, setAddedIds] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const cat = searchParams?.get('cat');
        if (cat) setCategory(cat); else setCategory('All');
        setPage(1);
    }, [searchParams]);

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        return ALL_PRODUCTS.filter(p => {
            const matchCat = category === 'All' || p.category === category;
            const matchSearch = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
            return matchCat && matchSearch;
        });
    }, [search, category]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const safePage = Math.min(page, totalPages);
    const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

    const handleAdd = (e, product) => {
        e.preventDefault();
        addToCart(product, 1);
        setAddedIds(prev => [...prev, product.id]);
        setTimeout(() => setAddedIds(prev => prev.filter(id => id !== product.id)), 1500);
    };

    return (
        <div style={{ animation: 'fadeInUp 0.8s ease' }}>
            <div style={{ marginBottom: '50px' }}>
                <div className="badge badge-primary" style={{ marginBottom: '20px', padding: '8px 18px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    🛒 Global Discovery
                </div>
                <h1 style={{ fontSize: 'clamp(2.5rem, 4.5rem, 4.5rem)', fontWeight: '900', letterSpacing: '-3px', marginBottom: '12px', color: 'white', lineHeight: 1 }}>
                    Catalogue.
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: '500' }}>
                    Searching <span style={{ color: '#8b5cf6', fontWeight: '900' }}>{category.toUpperCase()}</span> — Found {filtered.length} products
                </p>
            </div>

            {/* Search */}
            <div style={{ position: 'relative', marginBottom: '48px' }}>
                <input
                    type="text"
                    placeholder="Search premium items..."
                    className="input"
                    style={{ paddingLeft: '60px', height: '64px', fontSize: '1.1rem', borderRadius: '20px' }}
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
                <span style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }}>🔍</span>
            </div>

            {/* Grid */}
            {paginated.length === 0 ? (
                <div style={{ background: '#151520', borderRadius: '40px', padding: '120px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '5rem', marginBottom: '32px' }}>🔎</div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white' }}>No Matches</h2>
                    <p style={{ color: '#64748b' }}>Try adjusting your search or category filters.</p>
                </div>
            ) : (
                <div className="responsive-product-grid">
                    {paginated.map((product, idx) => (
                        <Link key={product.id} href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="card" style={{ padding: 0, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.06)', animation: `fadeInUp 0.8s ease ${idx * 0.02}s both` }}>
                                <div style={{ aspectRatio: '4/3', width: '100%', background: '#0a0a0f', overflow: 'hidden', position: 'relative' }}>
                                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    {product.tag && (
                                        <div className="badge badge-primary" style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', borderRadius: '10px' }}>
                                            {product.tag}
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <span style={{ fontSize: '0.65rem', fontWeight: '900', color: '#8b5cf6', textTransform: 'uppercase' }}>{product.category}</span>
                                        <Stars rating={product.rating} />
                                    </div>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '10px', color: 'white' }}>{product.name}</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '18px', flex: 1 }}>{product.desc}</p>

                                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px' }}>
                                        <div>
                                            {product.oldPrice && (
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginBottom: '2px' }}>
                                                    ₹{product.oldPrice.toLocaleString('en-IN')}
                                                </div>
                                            )}
                                            <div style={{ fontSize: '1.3rem', fontWeight: '900', color: 'white', whiteSpace: 'nowrap' }}>₹{product.price.toLocaleString('en-IN')}</div>
                                        </div>
                                        <button
                                            onClick={(e) => handleAdd(e, product)}
                                            className="btn btn-primary"
                                            style={{ height: '44px', width: '44px', minWidth: '44px', padding: 0, borderRadius: '12px', background: addedIds.includes(product.id) ? '#10b981' : undefined }}
                                        >
                                            {addedIds.includes(product.id) ? '✓' : '+'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                        <button
                            key={num}
                            onClick={() => setPage(num)}
                            style={{
                                width: '56px', height: '56px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)',
                                background: safePage === num ? 'white' : 'transparent',
                                color: safePage === num ? 'black' : 'var(--text-secondary)',
                                fontWeight: '900', cursor: 'pointer'
                            }}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            )}

            <style jsx>{`
                .responsive-product-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                    gap: 24px;
                    width: 100%;
                }
            `}</style>
        </div>
    );
}
