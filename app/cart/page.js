'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function CartPage() {
    const router = useRouter();
    const { cartItems, updateQty, removeItem, clearCart, subtotal } = useCart();
    const [coupon, setCoupon] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);

    const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
    const shipping = subtotal > 499 ? 0 : 49;
    const total = subtotal - discount + shipping;

    const applyCoupon = () => {
        if (coupon.trim().toUpperCase() === 'NEX10') {
            setCouponApplied(true);
        } else {
            alert('Invalid coupon. Try: NEX10');
        }
    };

    return (
        <div className="cart-page" style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0, 0, 1)' }}>

            {/* ─── HEADER SECTION ─── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px', flexWrap: 'wrap', gap: '24px' }}>
                <div>
                    <div className="badge" style={{ marginBottom: '16px', color: 'var(--accent-purple)', background: 'rgba(139, 92, 246, 0.1)' }}>🛒 GLOBAL BASKET</div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 4rem, 4rem)', fontWeight: '900', letterSpacing: '-2.5px', color: 'white', lineHeight: 1 }}>Shopping Cart.</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: '500', marginTop: '12px' }}>
                        {cartItems.length === 0
                            ? 'Your basket is currently empty.'
                            : `Reviewing ${cartItems.length} curated selection${cartItems.length > 1 ? 's' : ''}`
                        }
                    </p>
                </div>
                {cartItems.length > 0 && (
                    <button
                        onClick={clearCart}
                        className="btn btn-outline"
                        style={{ padding: '16px 32px', borderRadius: '16px', fontSize: '0.9rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                    >
                        🗑 Clear All Items
                    </button>
                )}
            </div>

            {cartItems.length === 0 ? (
                <div style={{ background: '#0a0a0f', borderRadius: '48px', padding: '120px 40px', textAlign: 'center', border: '1px solid var(--border-glass)', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5)' }}>
                    <div style={{ fontSize: '120px', marginBottom: '32px', animation: 'float 6s ease-in-out infinite' }}>🛍️</div>
                    <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: 'white', marginBottom: '16px', letterSpacing: '-1px' }}>Your Cart is Empty</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '48px', maxWidth: '450px', margin: '0 auto 48px' }}>
                        Your next obsession is just a click away. Start exploring our premium collection of high-end essentials.
                    </p>
                    <Link href="/products" className="btn btn-primary" style={{ padding: '20px 56px', fontSize: '1.1rem', borderRadius: '20px' }}>
                        Browse Collection →
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '50px', alignItems: 'start' }}>

                    {/* ─── ITEMS LIST ─── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {cartItems.map(item => (
                            <div
                                key={item.id}
                                className="card"
                                style={{ display: 'flex', alignItems: 'center', gap: '32px', padding: '24px 32px', position: 'relative', overflow: 'hidden' }}
                            >
                                {/* Background Glow */}
                                <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(139,92,246,0.05), transparent 70%)', filter: 'blur(30px)' }} />

                                <div style={{
                                    width: '130px', height: '100px', borderRadius: '20px',
                                    position: 'relative', overflow: 'hidden', flexShrink: 0,
                                    border: '1px solid var(--border-glass)',
                                }}>
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>

                                <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>
                                        {item.category}
                                    </div>
                                    <h3 style={{ fontWeight: '800', fontSize: '1.2rem', color: 'white', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {item.name}
                                    </h3>
                                    <div style={{ fontSize: '1.4rem', fontWeight: '900', color: 'white' }}>
                                        ₹{item.price.toLocaleString('en-IN')}
                                    </div>
                                </div>

                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '4px',
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid var(--border-glass)',
                                    borderRadius: '16px', padding: '4px',
                                }}>
                                    <button
                                        onClick={() => updateQty(item.id, -1)}
                                        style={{
                                            width: '40px', height: '40px', background: 'transparent',
                                            border: 'none', color: 'white',
                                            fontSize: '1.3rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            transition: 'opacity 0.2s'
                                        }}
                                        disabled={item.qty <= 1}
                                    >−</button>
                                    <span style={{ width: '40px', textAlign: 'center', fontWeight: '900', fontSize: '1.1rem', color: 'white' }}>
                                        {item.qty}
                                    </span>
                                    <button
                                        onClick={() => updateQty(item.id, 1)}
                                        style={{
                                            width: '40px', height: '40px',
                                            background: 'var(--gradient-master)',
                                            border: 'none', color: 'white', borderRadius: '12px',
                                            fontSize: '1.3rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}
                                    >+</button>
                                </div>

                                <div style={{ textAlign: 'right', minWidth: '130px', marginLeft: '20px' }}>
                                    <div style={{ fontWeight: '900', fontSize: '1.4rem', color: 'white', marginBottom: '12px' }}>
                                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        style={{
                                            background: 'transparent', border: 'none', color: '#ef4444',
                                            fontSize: '0.8rem', fontWeight: '800', cursor: 'pointer',
                                            textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6,
                                            transition: 'opacity 0.3s'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                                        onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
                                    >
                                        Remove Item
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* COUPON SECTION */}
                        <div className="card" style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '24px 32px' }}>
                            <div style={{ fontSize: '1.8rem' }}>🎫</div>
                            <input
                                className="input"
                                placeholder="Enter promo code (try NEX10)"
                                value={coupon}
                                onChange={e => setCoupon(e.target.value)}
                                style={{ flex: 1, height: '60px', background: 'transparent', border: 'none', borderBottom: '2px solid var(--border-glass)', borderRadius: 0, fontSize: '1.1rem' }}
                            />
                            <button
                                onClick={applyCoupon}
                                disabled={couponApplied}
                                className="btn btn-primary"
                                style={{ padding: '0 40px', height: '56px', borderRadius: '14px', fontSize: '1rem', fontWeight: '900' }}
                            >
                                {couponApplied ? 'Applied ✓' : 'Validate'}
                            </button>
                        </div>
                    </div>

                    {/* ─── SUMMARY PANEL ─── */}
                    <div style={{ position: 'sticky', top: '120px' }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #12121c 0%, #08080c 100%)',
                            border: '1px solid var(--border-glass)',
                            borderRadius: '40px', padding: '40px',
                            boxShadow: '0 50px 100px -20px rgba(0,0,0,1)'
                        }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: '950', color: 'white', marginBottom: '32px', letterSpacing: '-1.5px' }}>Check-out Summary</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                                    <span>Base Subtotal</span>
                                    <span style={{ color: 'white', fontWeight: '700' }}>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>

                                {couponApplied && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                                        <span style={{ color: '#10b981', fontWeight: '700' }}>Promotion Discount (10%)</span>
                                        <span style={{ color: '#10b981', fontWeight: '900' }}>− ₹{discount.toLocaleString('en-IN')}</span>
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                                    <span>Logistics & Shipping</span>
                                    <span style={{ color: shipping === 0 ? '#10b981' : 'white', fontWeight: '700' }}>
                                        {shipping === 0 ? '🎉 PRIORITY FREE' : '₹' + shipping}
                                    </span>
                                </div>
                            </div>

                            <div style={{ height: '1px', background: 'var(--border-glass)', marginBottom: '32px' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                                <span style={{ fontWeight: '800', fontSize: '1.2rem', color: 'white' }}>Final Amount</span>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: '900', fontSize: '2.5rem', color: 'white', letterSpacing: '-2px', lineHeight: 1 }}>
                                        ₹{total.toLocaleString('en-IN')}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', fontWeight: '700' }}>INCLUSIVE OF ALL TAXES</div>
                                </div>
                            </div>

                            <button
                                onClick={() => router.push('/checkout')}
                                className="submit-btn"
                                style={{ height: '72px', fontSize: '1.3rem', letterSpacing: '0.5px' }}
                            >
                                Confirm and Proceed →
                            </button>

                            <Link
                                href="/products"
                                className="btn btn-outline"
                                style={{ width: '100%', marginTop: '20px', padding: '18px', borderRadius: '18px', textAlign: 'center', display: 'block', fontSize: '1rem', fontWeight: '800' }}
                            >
                                Continue Shopping
                            </Link>

                            <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.7rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    <span style={{ display: 'block', fontSize: '1rem', marginBottom: '4px' }}>🛡️</span>
                                    ENCRYPTED SSL
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.7rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    <span style={{ display: 'block', fontSize: '1rem', marginBottom: '4px' }}>🏁</span>
                                    SAFE DELIVERY
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
