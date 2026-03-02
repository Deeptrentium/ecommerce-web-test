'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

const steps = ['DELIVERY ARCHITECTURE', 'STRATEGIC SUMMARY', 'SECURE PAYMENT'];

export default function CheckoutPage() {
    const router = useRouter();
    const { cartItems, subtotal } = useCart();

    const [step, setStep] = useState(0);
    const [form, setForm] = useState({
        fullName: '', phone: '', pincode: '', address: '', city: '', state: '', landmark: '', type: 'Home',
    });
    const [errors, setErrors] = useState({});

    const tax = Math.round(subtotal * 0.18);
    const shipping = subtotal > 499 ? 0 : 49;
    const total = subtotal + shipping + tax;

    const validate = () => {
        const e = {};
        if (!form.fullName.trim()) e.fullName = 'Full identity required';
        if (!form.phone || !/^\d{10}$/.test(form.phone)) e.phone = 'Valid coordinate required (10-digit)';
        if (!form.pincode || !/^\d{6}$/.test(form.pincode)) e.pincode = 'Six-digit region code required';
        if (!form.address.trim()) e.address = 'Primary delivery vector required';
        if (!form.city.trim()) e.city = 'City classification required';
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: value }));
        if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
    };

    const handleNext = () => {
        if (step === 0) {
            const e = validate();
            if (Object.keys(e).length > 0) { setErrors(e); return; }
        }
        if (step === 1) {
            router.push('/payment');
            return;
        }
        setStep(s => s + 1);
    };

    return (
        <div className="checkout-page" style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.2, 0, 0, 1)' }}>

            {/* ─── STAGE TRACKER ─── */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '80px', flexWrap: 'wrap' }}>
                {steps.map((s, i) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                            width: '48px', height: '48px', borderRadius: '14px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1rem',
                            background: i <= step ? 'var(--gradient-master)' : 'rgba(255,255,255,0.03)',
                            color: i <= step ? 'white' : 'var(--text-muted)',
                            boxShadow: i === step ? '0 10px 20px rgba(139,92,246,0.3)' : 'none',
                            transition: 'all 0.4s cubic-bezier(0.2, 0, 0, 1)',
                            border: '1px solid var(--border-glass)'
                        }}>
                            {i < step ? '✓' : i + 1}
                        </div>
                        <span style={{
                            fontWeight: '900', fontSize: '0.75rem', letterSpacing: '2px',
                            color: i === step ? 'white' : 'var(--text-muted)',
                            transition: 'color 0.3s'
                        }}>{s}</span>
                        {i < steps.length - 1 && (
                            <div style={{ width: '60px', height: '1px', background: i < step ? 'var(--accent-purple)' : 'var(--border-glass)', marginLeft: '12px' }} />
                        )}
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '60px', alignItems: 'start' }}>

                {/* ─── LEFT PANEL: CONFIGURATION ─── */}
                <div>
                    {step === 0 && (
                        <div className="card" style={{ padding: '48px', background: '#0a0a0f' }}>
                            <div style={{ marginBottom: '40px' }}>
                                <div className="badge" style={{ marginBottom: '12px' }}>DESTINATION PORT</div>
                                <h1 style={{ fontSize: '2.5rem', fontWeight: '950', color: 'white', letterSpacing: '-2px' }}>Operational Logistics.</h1>
                                <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontWeight: '500' }}>Specify the coordinate vector for your curated delivery.</p>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
                                {['Home', 'Work', 'Nexus Hub'].map(t => (
                                    <button key={t} onClick={() => setForm(p => ({ ...p, type: t }))} style={{
                                        padding: '12px 28px', borderRadius: '12px', border: '1px solid',
                                        borderColor: form.type === t ? 'var(--accent-purple)' : 'var(--border-glass)',
                                        background: form.type === t ? 'rgba(139,92,246,0.1)' : 'transparent',
                                        color: form.type === t ? 'white' : 'var(--text-secondary)',
                                        fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.3s',
                                    }}>{t.toUpperCase()}</button>
                                ))}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                                {[
                                    { name: 'fullName', label: 'LEGAL FULL IDENTITY', placeholder: 'Enter recipient name', col: 2 },
                                    { name: 'phone', label: 'COMMS CHANNEL (PHONE)', placeholder: '10-digit mobile number', col: 1 },
                                    { name: 'pincode', label: 'GEOGRAPHIC PINCODE', placeholder: '6-digit region code', col: 1 },
                                    { name: 'address', label: 'PRIMARY STREET ARCHITECTURE', placeholder: 'Building / Suite / Road', col: 2 },
                                    { name: 'city', label: 'URBAN CENTER (CITY)', placeholder: 'Specify city', col: 1 },
                                    { name: 'state', label: 'REGIONAL STATE', placeholder: 'Specify state', col: 1 },
                                ].map(f => (
                                    <div key={f.name} style={{ gridColumn: `span ${f.col}` }}>
                                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '900', color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '1px' }}>{f.label}</label>
                                        <input
                                            name={f.name} value={form[f.name]} onChange={handleChange}
                                            placeholder={f.placeholder} className="input"
                                            style={{ height: '60px', borderRadius: '16px', borderColor: errors[f.name] ? '#ef4444' : undefined }}
                                        />
                                        {errors[f.name] && <p style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: '700', marginTop: '8px' }}>⚠ {errors[f.name]}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="card" style={{ padding: '48px', background: '#0a0a0f' }}>
                            <div style={{ marginBottom: '40px' }}>
                                <div className="badge" style={{ marginBottom: '12px' }}>FINAL AUDIT</div>
                                <h1 style={{ fontSize: '2.5rem', fontWeight: '950', color: 'white', letterSpacing: '-2px' }}>Curated Review.</h1>
                                <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontWeight: '500' }}>Review your strategic inventory before final acquisition.</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                                {cartItems.map(item => (
                                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid var(--border-glass)' }}>
                                        <div style={{ width: '80px', height: '80px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
                                            <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '900', fontSize: '1.1rem', color: 'white' }}>{item.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700', marginTop: '4px' }}>UNIT COUNT: {item.qty}</div>
                                        </div>
                                        <div style={{ fontWeight: '950', fontSize: '1.2rem', color: 'white' }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ padding: '32px', background: 'rgba(139,92,246,0.05)', borderRadius: '24px', border: '1px solid rgba(139,92,246,0.2)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem' }}>
                                    <span style={{ color: 'var(--text-muted)', fontWeight: '800' }}>LOGISTICS TARGET</span>
                                    <span style={{ color: 'white', fontWeight: '900' }}>{form.fullName.toUpperCase()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    <span style={{ color: 'var(--text-muted)', fontWeight: '800' }}>VECTOR ARCHITECTURE</span>
                                    <span style={{ color: 'var(--accent-purple)', fontWeight: '900' }}>{form.address}, {form.city.toUpperCase()}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ─── RIGHT PANEL: QUOTATION ─── */}
                <div style={{ position: 'sticky', top: '120px' }}>
                    <div className="card" style={{ padding: '40px', background: 'linear-gradient(135deg, #12121c 0%, #08080c 100%)' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '950', marginBottom: '32px', letterSpacing: '-1px' }}>Strategic Quote.</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', color: 'var(--text-secondary)' }}>
                                <span>Subtotal</span>
                                <span style={{ color: 'white', fontWeight: '800' }}>₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', color: 'var(--text-secondary)' }}>
                                <span>Govt. Tax (GST)</span>
                                <span style={{ color: 'white', fontWeight: '800' }}>₹{tax.toLocaleString('en-IN')}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', color: 'var(--text-secondary)' }}>
                                <span>Logistics Fee</span>
                                <span style={{ color: shipping === 0 ? '#10b981' : 'white', fontWeight: '800' }}>{shipping === 0 ? '🎉 PRIORITY FREE' : `₹${shipping}`}</span>
                            </div>
                        </div>

                        <div style={{ height: '1px', background: 'var(--border-glass)', marginBottom: '32px' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                            <span style={{ fontWeight: '900', color: 'white' }}>Final Valuation</span>
                            <span style={{ fontWeight: '950', fontSize: '2rem', color: 'white' }}>₹{total.toLocaleString('en-IN')}</span>
                        </div>

                        <button onClick={handleNext} className="submit-btn" style={{ height: '72px', borderRadius: '20px', fontSize: '1.1rem' }}>
                            {step === 0 ? 'SYNCHRONIZE & REVIEW →' : 'PROCEED TO ACQUISITION →'}
                        </button>

                        {step > 0 && (
                            <button onClick={() => setStep(s => s - 1)} className="btn btn-outline" style={{ width: '100%', marginTop: '16px', height: '60px', borderRadius: '16px' }}>
                                ← REVISE PARAMETERS
                            </button>
                        )}

                        <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '800' }}>
                            🔒 SECURITY VERIFIED · NEXUS ENCRYPTION
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
