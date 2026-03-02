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
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bgMove {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .login-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'Inter', sans-serif;
        }

        /* ─── Left Panel ─── */
        .login-left {
          background: linear-gradient(135deg, #1a0533, #2d1060, #0f1a40);
          background-size: 200% 200%;
          animation: bgMove 8s ease infinite;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 60px 48px;
          position: relative;
          overflow: hidden;
        }

        .login-left::before {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%);
          top: -100px; left: -100px;
        }

        .login-left::after {
          content: '';
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%);
          bottom: -80px; right: -80px;
        }

        .left-content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: white;
        }

        .brand-logo {
          font-size: 2.4rem;
          font-weight: 900;
          letter-spacing: -1px;
          margin-bottom: 12px;
        }

        .brand-tagline {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.6);
          margin-bottom: 56px;
          font-weight: 500;
        }

        .left-hero-icon {
          font-size: 100px;
          margin-bottom: 32px;
          display: block;
          filter: drop-shadow(0 8px 32px rgba(139,92,246,0.5));
        }

        .left-headline {
          font-size: 2rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        .left-sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.65);
          line-height: 1.7;
          max-width: 320px;
          margin: 0 auto 48px;
        }

        .left-features {
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-align: left;
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
        }

        .left-feature-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .left-feature-icon {
          font-size: 1.3rem;
          flex-shrink: 0;
        }

        .left-feature-text {
          font-size: 0.88rem;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
        }

        /* ─── Right Panel ─── */
        .login-right {
          background: #0c0c14;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 48px;
        }

        .login-form-wrapper {
          width: 100%;
          max-width: 420px;
          animation: fadeInUp 0.6s ease;
        }

        .form-title {
          font-size: 1.9rem;
          font-weight: 800;
          color: #f1f5f9;
          margin-bottom: 6px;
          letter-spacing: -0.5px;
        }

        .form-subtitle {
          font-size: 0.92rem;
          color: #64748b;
          margin-bottom: 36px;
        }

        /* Social Buttons */
        .social-btns {
          display: flex;
          gap: 12px;
          margin-bottom: 28px;
        }

        .social-btn {
          flex: 1;
          padding: 11px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: #f1f5f9;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .social-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }

        .or-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
        }

        .or-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        .or-text {
          font-size: 0.8rem;
          color: #475569;
          white-space: nowrap;
        }

        /* Form Fields */
        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: #94a3b8;
          margin-bottom: 8px;
        }

        .form-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .forgot-link {
          font-size: 0.82rem;
          color: #8b5cf6;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .forgot-link:hover {
          color: #a78bfa;
        }

        .input-wrapper {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 13px 16px;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #f1f5f9;
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139,92,246,0.15);
          background: rgba(139,92,246,0.05);
        }

        .form-input::placeholder {
          color: #334155;
        }

        .form-input.error {
          border-color: #ef4444;
        }

        .form-input.error:focus {
          box-shadow: 0 0 0 3px rgba(239,68,68,0.15);
        }

        .pass-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          color: #475569;
          padding: 4px;
          transition: color 0.2s;
        }

        .pass-toggle:hover { color: #94a3b8; }

        .form-error {
          font-size: 0.8rem;
          color: #ef4444;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Remember me */
        .remember-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
        }

        .remember-checkbox {
          width: 16px;
          height: 16px;
          accent-color: #8b5cf6;
          cursor: pointer;
        }

        .remember-label {
          font-size: 0.87rem;
          color: #64748b;
          cursor: pointer;
        }

        /* Submit Button */
        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 24px rgba(139,92,246,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 24px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(139,92,246,0.6);
        }

        .submit-btn:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }

        /* Divider */
        .form-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 0 0 24px;
        }

        .signup-prompt {
          text-align: center;
          font-size: 0.9rem;
          color: #64748b;
        }

        .signup-link {
          color: #8b5cf6;
          text-decoration: none;
          font-weight: 700;
          transition: color 0.2s;
        }

        .signup-link:hover { color: #a78bfa; }

        /* Trust badges */
        .trust-row {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: #475569;
          font-weight: 500;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .login-page { grid-template-columns: 1fr; }
          .login-left { display: none; }
          .login-right { padding: 80px 24px 40px; }
        }
      `}</style>

            <div className="login-page">

                {/* ─── Left Branding Panel ─── */}
                <div className="login-left">
                    <div className="left-content">
                        <div className="brand-logo">🛍️ ShopEasy</div>
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
                                    autoComplete="email"
                                />
                                {errors.email && <p className="form-error">⚠ {errors.email}</p>}
                            </div>

                            {/* Password */}
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
                                        autoComplete="current-password"
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
        </>
    );
}
