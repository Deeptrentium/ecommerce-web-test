'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!form.email) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address';
        if (!form.password) errs.password = 'Password is required';
        else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setErrors({});
        setLoading(true);
        await new Promise(r => setTimeout(r, 1800));
        setLoading(false);
        alert('Login successful! Welcome back to ShopEasy 🛍️');
    };

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    };

    return (
        <div className="login-page">
            {/* ─── Left Branding Panel ─── */}
            <div className="login-left">
                <div className="left-content">
                    <div className="brand-logo-large">🛍️ ShopEasy</div>
                    <div className="brand-tagline">Your favourite online store</div>

                    <span className="left-hero-icon">🎁</span>

                    <h2 className="left-headline">
                        Everything you love,<br />all in one place
                    </h2>
                    <p className="left-sub">
                        Shop from thousands of trusted brands with lightning-fast delivery and hassle-free returns.
                    </p>

                    <div className="left-features">
                        {[
                            { icon: '🚚', text: 'Free delivery on orders over ₹499' },
                            { icon: '🔄', text: 'Easy 30-day returns & exchanges' },
                            { icon: '🔒', text: '100% secure payments' },
                            { icon: '⭐', text: 'Trusted by 2M+ happy shoppers' },
                        ].map(({ icon, text }) => (
                            <div key={text} className="left-feature-item">
                                <span className="left-feature-icon">{icon}</span>
                                <span className="left-feature-text">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── Right Form Panel ─── */}
            <div className="login-right">
                <div className="login-form-wrapper">

                    <h1 className="form-title">Welcome back! 👋</h1>
                    <p className="form-subtitle">Sign in to your ShopEasy account to continue shopping.</p>

                    {/* Social Login */}
                    <div className="social-btns">
                        <button className="social-btn">
                            <span>🔴</span> Google
                        </button>
                        <button className="social-btn">
                            <span>📘</span> Facebook
                        </button>
                    </div>

                    <div className="or-divider">
                        <div className="or-line" />
                        <span className="or-text">or continue with email</span>
                        <div className="or-line" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} noValidate>

                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                className={`form-input${errors.email ? ' error' : ''}`}
                                autoComplete="off"
                            />
                            {errors.email && <p className="form-error">⚠ {errors.email}</p>}
                        </div>

                       
                        <div className="form-group">
                            <div className="form-label-row">
                                <label htmlFor="password" className="form-label" style={{ margin: 0 }}>Password</label>
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>
                            <div className="input-wrapper">
                                <input
                                    id="password"
                                    type={showPass ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className={`form-input${errors.password ? ' error' : ''}`}
                                    style={{ paddingRight: '48px' }}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="pass-toggle"
                                    onClick={() => setShowPass(p => !p)}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPass ? '🙈' : '👁️'}
                                </button>
                            </div>
                            {errors.password && <p className="form-error">⚠ {errors.password}</p>}
                        </div>

                        {/* Remember me */}
                        <div className="remember-row">
                            <input type="checkbox" id="remember" className="remember-checkbox" />
                            <label htmlFor="remember" className="remember-label">
                                Remember me for 30 days
                            </label>
                        </div>

                        {/* Submit */}
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In →'
                            )}
                        </button>
                    </form>

                    <div className="form-divider" />

                    <p className="signup-prompt">
                        New to ShopEasy?{' '}
                        <Link href="/register" className="signup-link">
                            Create a free account →
                        </Link>
                    </p>

                    {/* Trust badges */}
                    <div className="trust-row">
                        <span className="trust-item">🔒 SSL Secure</span>
                        <span className="trust-item">💳 Safe Pay</span>
                        <span className="trust-item">🛡️ Protected</span>
                    </div>

                </div>
            </div>
        </div>
    );
}
