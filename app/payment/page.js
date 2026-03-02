'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function PaymentPage() {
    const router = useRouter();
    const { cartItems, subtotal, clearCart } = useCart();

    const [method, setMethod] = useState('upi');
    const [upiId, setUpiId] = useState('');
    const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
    const [upiError, setUpiError] = useState('');
    const [cardErrors, setCardErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const tax = Math.round(subtotal * 0.18);
    const shipping = subtotal > 499 ? 0 : 49;
    const totalAmount = subtotal + tax + shipping;

    const formatCardNumber = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    const formatExpiry = (val) => {
        const d = val.replace(/\D/g, '').slice(0, 4);
        return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
    };

    const validateUpi = () => {
        if (!upiId.includes('@')) { setUpiError('Enter a valid UPI ID (e.g. name@upi)'); return false; }
        setUpiError('');
        return true;
    };

    const validateCard = () => {
        const e = {};
        if (card.number.replace(/\s/g, '').length < 16) e.number = 'Enter 16-digit card number';
        if (!card.name.trim()) e.name = 'Cardholder name required';
        if (card.expiry.length < 5) e.expiry = 'Enter valid expiry MM/YY';
        if (card.cvv.length < 3) e.cvv = 'Enter 3-digit CVV';
        setCardErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleConfirmOrder = async () => {
        if (method === 'upi' && !validateUpi()) return;
        if (method === 'card' && !validateCard()) return;

        setLoading(true);
        // Simulate processing
        await new Promise(r => setTimeout(r, 2000));
        setLoading(false);
        setSuccess(true);

        // Clear cart after successful order
        setTimeout(() => {
            clearCart();
            router.push('/orders');
        }, 2500);
    };

    if (success) {
        return (
            <div className="payment-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInUp 0.8s ease' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '120px', marginBottom: '32px', filter: 'drop-shadow(0 0 30px var(--accent-purple))' }}>💎</div>
                    <h1 style={{ fontSize: '3rem', fontWeight: '950', color: 'white', letterSpacing: '-2px', marginBottom: '16px' }}>Order Confirmed.</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '48px' }}>Your luxury curated selection is being processed for priority shipment.</p>
                    <div className="badge" style={{ padding: '12px 24px', background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>TRANSACTION SUCCESSFUL ✓</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '32px' }}>Redirecting to your Order Archive...</p>
                </div>
            </div>
        );
    }

    const methods = [
        { id: 'upi', label: 'UPI INSTANT', icon: '📱', desc: 'Secure transfer via Nexus Pay, GPay, or UPI' },
        { id: 'card', label: 'ELITE CARD', icon: '💳', desc: 'Visa, Mastercard, or Luxury Platinum' },
        { id: 'cod', label: 'DELIVERY DISBURSEMENT', icon: '💵', desc: 'Cash on Delivery (Standard Verification)' },
    ];

    return (
        <div className="payment-page" style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0, 0, 1)' }}>
            <div style={{ marginBottom: '60px' }}>
                <div className="badge" style={{ marginBottom: '16px', color: 'var(--accent-purple)', background: 'rgba(139,92,246,0.1)' }}>🔒 ENCRYPTED GATEWAY</div>
                <h1 style={{ fontSize: 'clamp(2rem, 3.5rem, 3.5rem)', fontWeight: '950', color: 'white', letterSpacing: '-2.5px', lineHeight: 1 }}>Finalize Acquisition.</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: '500', marginTop: '12px' }}>Choose your strategic payment method to confirm your order.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '50px', alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {methods.map(m => (
                        <div key={m.id} onClick={() => setMethod(m.id)} style={{
                            padding: '32px', borderRadius: '32px', cursor: 'pointer',
                            border: `2px solid ${method === m.id ? 'var(--accent-purple)' : 'var(--border-glass)'}`,
                            background: method === m.id ? 'rgba(139,92,246,0.05)' : '#0a0a0f',
                            transition: 'all 0.4s cubic-bezier(0.2, 0, 0, 1)',
                            position: 'relative', overflow: 'hidden'
                        }}>
                            {method === m.id && (
                                <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)', filter: 'blur(30px)' }} />
                            )}

                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                <div style={{
                                    width: '64px', height: '64px', borderRadius: '20px', fontSize: '28px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: method === m.id ? 'var(--accent-purple)' : 'rgba(255,255,255,0.03)',
                                    color: 'white', transition: 'all 0.3s'
                                }}>{m.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '900', fontSize: '1.1rem', color: 'white', letterSpacing: '0.5px' }}>{m.label}</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500', marginTop: '4px' }}>{m.desc}</div>
                                </div>
                                <div style={{
                                    width: '24px', height: '24px', borderRadius: '50%',
                                    border: `2px solid ${method === m.id ? 'var(--accent-purple)' : 'var(--text-muted)'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {method === m.id && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-purple)' }} />}
                                </div>
                            </div>

                            {/* Method Specific Content */}
                            {method === 'upi' && m.id === 'upi' && (
                                <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid var(--border-glass)' }}>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '1px' }}>UPI IDENTIFIER</label>
                                    <input
                                        className="input" placeholder="nexus.id@upi" value={upiId}
                                        onChange={e => { setUpiId(e.target.value); setUpiError(''); }}
                                        onClick={e => e.stopPropagation()}
                                        style={{ height: '60px', borderRadius: '16px', fontSize: '1.2rem', fontWeight: '700' }}
                                    />
                                    {upiError && <p style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '700', marginTop: '12px' }}>⚠ {upiError}</p>}
                                </div>
                            )}

                            {method === 'card' && m.id === 'card' && (
                                <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid var(--border-glass)' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '1px' }}>VIRTUAL CARD NUMBER</label>
                                            <input className="input" placeholder="0000 0000 0000 0000"
                                                value={card.number} onClick={e => e.stopPropagation()}
                                                onChange={e => setCard(p => ({ ...p, number: formatCardNumber(e.target.value) }))}
                                                style={{ height: '60px', borderRadius: '16px', fontSize: '1.2rem', fontWeight: '700', letterSpacing: '4px' }}
                                            />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '1px' }}>EXPIRY</label>
                                                <input className="input" placeholder="MM/YY"
                                                    value={card.expiry} onClick={e => e.stopPropagation()}
                                                    onChange={e => setCard(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                                                    style={{ height: '60px', borderRadius: '16px', fontSize: '1.1rem', fontWeight: '700' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '1px' }}>CVV SECURE</label>
                                                <input className="input" placeholder="•••" maxLength={3} type="password"
                                                    value={card.cvv} onClick={e => e.stopPropagation()}
                                                    onChange={e => setCard(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '') }))}
                                                    style={{ height: '60px', borderRadius: '16px', fontSize: '1.1rem', fontWeight: '700' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* SUMMARY PANEL */}
                <div style={{ position: 'sticky', top: '120px' }}>
                    <div style={{
                        background: '#0a0a0f', border: '1px solid var(--border-glass)',
                        borderRadius: '40px', padding: '40px', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.8)'
                    }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '950', color: 'white', marginBottom: '32px', letterSpacing: '-1px' }}>Order Total.</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontWeight: '500' }}>
                                <span>Subtotal</span>
                                <span style={{ color: 'white', fontWeight: '800' }}>₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontWeight: '500' }}>
                                <span>Shipping</span>
                                <span style={{ color: shipping === 0 ? '#10b981' : 'white', fontWeight: '800' }}>{shipping === 0 ? '🎉 ELITE FREE' : `₹${shipping}`}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontWeight: '500' }}>
                                <span>GST (Govt. 18%)</span>
                                <span style={{ color: 'white', fontWeight: '800' }}>₹{tax.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <div style={{ height: '1px', background: 'var(--border-glass)', marginBottom: '32px' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                            <span style={{ fontWeight: '800', color: 'white' }}>Payable Amount</span>
                            <div style={{ textAlign: 'right', fontWeight: '950', fontSize: '2rem', color: 'white', letterSpacing: '-1.5px' }}>
                                ₹{totalAmount.toLocaleString('en-IN')}
                            </div>
                        </div>

                        {/* FINAL CONFIRMATION BUTTON */}
                        <button
                            onClick={handleConfirmOrder}
                            disabled={loading}
                            className="submit-btn"
                            style={{ height: '72px', fontSize: '1.2rem', borderRadius: '20px' }}
                        >
                            {loading ? 'SYNCHRONIZING SECURELY...' : (
                                method === 'cod' ? 'CONFIRM ORDER ✓' : `FINALIZE & PAY ₹${totalAmount.toLocaleString('en-IN')} →`
                            )}
                        </button>

                        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '800' }}>
                            🔒 256-BIT MILITARY-GRADE ENCRYPTION
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
