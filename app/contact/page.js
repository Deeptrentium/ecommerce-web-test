'use client';
import { useState } from 'react';

const contactInfo = [
    { icon: '📧', label: 'Email Us', value: 'support@shopeasy.in', sub: 'We reply within 24 hours' },
    { icon: '📞', label: 'Call Us', value: '+91 98765 43210', sub: 'Mon – Sat, 9 AM – 6 PM' },
    { icon: '📍', label: 'Our Office', value: 'ShopEasy HQ, Bandra West', sub: 'Mumbai, Maharashtra 400050' },
];

const faqs = [
    { q: 'How do I track my order?', a: 'Go to Orders page and click on the order to see live tracking status.' },
    { q: 'What is the return policy?', a: 'We offer hassle-free 30-day returns on all products. No questions asked.' },
    { q: 'How long does delivery take?', a: 'Standard delivery takes 3–5 days. Express delivery is available at checkout.' },
    { q: 'Are my payments secure?', a: 'Yes! All payments are 256-bit SSL encrypted and PCI-DSS compliant.' },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.subject.trim()) e.subject = 'Subject is required';
        if (!form.message.trim() || form.message.length < 10) e.message = 'Message must be at least 10 characters';
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: value }));
        if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setErrors({});
        setLoading(true);
        await new Promise(r => setTimeout(r, 2000));
        setLoading(false);
        setSent(true);
    };

    return (
        <div className="page-wrapper">
            <section style={{ padding: '80px 48px 0', maxWidth: '1280px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <div className="badge badge-primary" style={{ marginBottom: '16px' }}>💬 Get in Touch</div>
                    <h1 style={{ fontSize: '3.2rem', fontWeight: '900', letterSpacing: '-2px', marginBottom: '16px' }}>
                        We are here to <span style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>help you</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
                        Have a question, feedback, or need support? Our team is always ready to assist you.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginBottom: '72px' }}>
                    {contactInfo.map(({ icon, label, value, sub }) => (
                        <div key={label} className="card" style={{ textAlign: 'center', padding: '32px 24px' }}>
                            <div style={{
                                width: '64px', height: '64px', borderRadius: '18px', margin: '0 auto 20px',
                                background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px',
                            }}>{icon}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{label}</div>
                            <div style={{ fontWeight: '800', fontSize: '1rem', marginBottom: '6px' }}>{value}</div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{sub}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '80px', alignItems: 'start' }}>
                    <div className="card" style={{ padding: '40px' }}>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '8px' }}>Send us a message</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '32px' }}>
                            Fill out the form and we will get back to you within 24 hours.
                        </p>

                        {sent ? (
                            <div style={{ textAlign: 'center', padding: '48px 24px', animation: 'fadeInUp 0.5s ease' }}>
                                <div style={{ fontSize: '72px', marginBottom: '20px' }}>🎉</div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '10px', color: '#10b981' }}>Message Sent!</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '28px' }}>
                                    Thank you, <strong>{form.name}</strong>! We have received your message and will reply to <strong>{form.email}</strong> shortly.
                                </p>
                                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="btn btn-outline">
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>Full Name</label>
                                        <input
                                            name="name" value={form.name} onChange={handleChange}
                                            placeholder="John Doe" className="input"
                                            style={{ borderColor: errors.name ? '#ef4444' : undefined }}
                                        />
                                        {errors.name && <p style={{ fontSize: '0.76rem', color: '#ef4444', marginTop: '5px' }}>⚠ {errors.name}</p>}
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>Email Address</label>
                                        <input
                                            name="email" value={form.email} onChange={handleChange}
                                            placeholder="you@example.com" type="email" className="input"
                                            style={{ borderColor: errors.email ? '#ef4444' : undefined }}
                                        />
                                        {errors.email && <p style={{ fontSize: '0.76rem', color: '#ef4444', marginTop: '5px' }}>⚠ {errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>Subject</label>
                                    <input
                                        name="subject" value={form.subject} onChange={handleChange}
                                        placeholder="How can we help?" className="input"
                                        style={{ borderColor: errors.subject ? '#ef4444' : undefined }}
                                    />
                                    {errors.subject && <p style={{ fontSize: '0.76rem', color: '#ef4444', marginTop: '5px' }}>⚠ {errors.subject}</p>}
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>Message</label>
                                    <textarea
                                        name="message" value={form.message} onChange={handleChange}
                                        placeholder="Describe your issue or question in detail..."
                                        rows={5} className="input"
                                        style={{ resize: 'vertical', minHeight: '120px', borderColor: errors.message ? '#ef4444' : undefined }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                                        {errors.message
                                            ? <p style={{ fontSize: '0.76rem', color: '#ef4444' }}>⚠ {errors.message}</p>
                                            : <span />
                                        }
                                        <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{form.message.length} chars</span>
                                    </div>
                                </div>

                                <button type="submit" disabled={loading} className="submit-btn" style={{ margin: 0 }}>
                                    {loading ? <><span className="spinner" /> Sending...</> : 'Send Message →'}
                                </button>
                            </form>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div className="card" style={{ padding: '32px' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '8px' }}>🕐 Support Hours</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px' }}>Our team is available to help you during these hours.</p>
                            {[
                                { day: 'Monday – Friday', time: '9:00 AM – 8:00 PM' },
                                { day: 'Saturday', time: '10:00 AM – 6:00 PM' },
                                { day: 'Sunday', time: 'Closed' },
                            ].map(({ day, time }) => (
                                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '0.88rem' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>{day}</span>
                                    <span style={{ fontWeight: '700', color: time === 'Closed' ? '#ef4444' : '#10b981' }}>{time}</span>
                                </div>
                            ))}
                        </div>

                        <div className="card" style={{ padding: '32px' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px' }}>🔗 Find us on</h3>
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                {[
                                    { name: 'Twitter', icon: '🐦', color: '#1DA1F2' },
                                    { name: 'Instagram', icon: '📸', color: '#E1306C' },
                                    { name: 'Facebook', icon: '📘', color: '#4267B2' },
                                    { name: 'LinkedIn', icon: '💼', color: '#0077B5' },
                                ].map(({ name, icon, color }) => (
                                    <button key={name} style={{
                                        padding: '10px 18px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '600',
                                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
                                        color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                                        transition: 'all 0.2s', fontFamily: 'Inter',
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                                    >
                                        {icon} {name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '80px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', textAlign: 'center', marginBottom: '40px', letterSpacing: '-0.5px' }}>
                        Frequently Asked Questions
                    </h2>
                    <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {faqs.map((faq, i) => (
                            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px' }}>
                                    <span style={{ fontWeight: '700', fontSize: '0.97rem' }}>{faq.q}</span>
                                    <span style={{
                                        fontSize: '1.2rem', color: 'var(--accent-purple)',
                                        transform: openFaq === i ? 'rotate(180deg)' : 'none',
                                        transition: 'transform 0.3s ease',
                                    }}>⌄</span>
                                </div>
                                {openFaq === i && (
                                    <div style={{ padding: '0 24px 20px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7', animation: 'fadeInUp 0.2s ease' }}>
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
