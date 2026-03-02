'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const pathname = usePathname();
    const { totalItems } = useCart();
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    if (pathname && pathname.startsWith('/admin')) {
        return null;
    }

    const links = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Products' },
        { href: '/cart', label: 'Cart' },
        { href: '/orders', label: 'Orders' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <nav className="shopeasy-navbar">
            <Link href="/" className="nav-brand">
                <div className="brand-icon">🛍️</div>
                <span className="brand-text">ShopEasy</span>
            </Link>

            <ul className="nav-links">
                {links.map(({ href, label }) => (
                    <li key={href}>
                        <Link href={href} className={pathname === href ? 'nav-active' : ''}>
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="nav-actions">
                <button
                    onClick={toggleTheme}
                    className="theme-toggle-btn"
                    title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>

                <div className="nav-status-group">
                    <Link href="/cart" className="nav-cart-wrapper">
                        <span className="cart-icon-styled">🛒</span>
                        {totalItems > 0 && <span>{totalItems}</span>}
                    </Link>
                    <Link href="/login" className="auth-nav-link">Login/Sign Up</Link>
                </div>
            </div>
        </nav>
    );
}
