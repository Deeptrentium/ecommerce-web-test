'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', agree: false });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Full name is required';
        if (!form.email) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
        if (!form.password) errs.password = 'Password is required';
        else if (form.password.length < 6) errs.password = 'Minimum 6 characters';
        if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
        if (!form.agree) errs.agree = 'You must accept the terms';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setErrors({});
        setLoading(true);
        await new Promise(r => setTimeout(r, 2000));
        setLoading(false);
        alert('Account created! Welcome to ShopEasy! 🎉');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    return (
        <div className="login-page register-page">
            {/* ─── Left Panel (Benefits) ─── */}
            <div className="login-left">
                <div className="left-content">
                    <div className="brand-logo-large">🛍️ ShopEasy</div>
                    <div className="brand-tagline">Start your premium journey</div>

                    <span className="left-hero-icon">🚀</span>

                    <h2 className="left-headline">
                        Join the future<br />of retail shopping
                    </h2>
                    <p className="left-sub">
                        Create an account to unlock exclusive deals, track your orders, and enjoy faster peak-season checkouts.
                    </p>

                    <div className="left-features">
                        {[
                            { icon: '💎', text: 'Exclusive VIP Membership Access' },
                            { icon: '⭐', text: 'Earn points on every purchase' },
                            { icon: '⚡', text: 'Priority 24h Sonic Delivery' },
                            { icon: '🎟️', text: 'Special first-order discount code' },
                        ].map(({ icon, text }) => (
                            <div key={text} className="left-feature-item">
                                <span className="left-feature-icon">{icon}</span>
                                <span className="left-feature-text">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── Right Panel (Registration Form) ─── */}
            <div className="login-right">
                <div className="login-form-wrapper">
                    <h1 className="form-title">Create account</h1>
                    <p className="form-subtitle">Join thousands of happy shoppers today 🎉</p>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={handleChange}
                                className={`form-input${errors.name ? ' error' : ''}`}
                            />
                            {errors.name && <p className="form-error">⚠ {errors.name}</p>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                className={`form-input${errors.email ? ' error' : ''}`}
                            />
                            {errors.email && <p className="form-error">⚠ {errors.email}</p>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="input-wrapper">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Create strong password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className={`form-input${errors.password ? ' error' : ''}`}
                                />
                                <button type="button" onClick={() => setShowPass(p => !p)} className="pass-toggle">{showPass ? '🙈' : '👁️'}</button>
                            </div>
                            {errors.password && <p className="form-error">⚠ {errors.password}</p>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                name="confirm"
                                placeholder="Repeat your password"
                                value={form.confirm}
                                onChange={handleChange}
                                className={`form-input${errors.confirm ? ' error' : ''}`}
                            />
                            {errors.confirm && <p className="form-error">⚠ {errors.confirm}</p>}
                        </div>

                        <div className="remember-row">
                            <input type="checkbox" name="agree" id="agree" checked={form.agree} onChange={handleChange} className="remember-checkbox" />
                            <label htmlFor="agree" className="remember-label">I agree to the Terms & Privacy Policy</label>
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Account creating...' : 'Create Account →'}
                        </button>
                    </form>

                    <div className="form-divider" />
                    <p className="signup-prompt">Already have an account? <Link href="/login" className="signup-link">Sign in →</Link></p>
                </div>
            </div>
        </div>
    );
}
