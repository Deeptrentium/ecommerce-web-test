'use client';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

const departments = [
    'Electronics',
    'Fashion & Clothing',
    'Home & Living',
    'Sports & Outdoors',
    'Smartphones',
    'Laptops & Computers',
    'Footwear',
    'Watches & Accessories',
    'Health & Beauty',
    'Kitchen Appliances',
    'Toys & Games'
];

export default function Sidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentCat = searchParams.get('cat');

    // Hide sidebar on Admin, Auth, and Checkout-related pages
    const hideSidebar = pathname && (
        pathname.startsWith('/admin') ||
        pathname === '/login' ||
        pathname === '/register' ||
        pathname === '/cart' ||
        pathname === '/checkout' ||
        pathname === '/payment' ||
        pathname === '/orders'
    );

    if (hideSidebar) {
        return null;
    }

    return (
        <aside style={{
            width: '320px',
            flexShrink: 0,
            position: 'sticky',
            top: '120px',
            height: 'calc(100vh - 160px)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass)',
            borderRadius: '32px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 30px 60px -15px rgba(0,0,0,1)',
            zIndex: 10
        }} className="desktop-only">

            <div style={{
                background: 'var(--gradient-master)',
                color: 'white',
                padding: '24px 36px',
                borderRadius: '32px 32px 0 0',
                fontWeight: '900',
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                letterSpacing: '-0.5px'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🎛️</span> Departments
            </div>

            <nav style={{ padding: '20px 0', overflowY: 'auto', flex: 1 }} className="sidebar-nav">
                <style>{`
                    .sidebar-nav::-webkit-scrollbar { width: 4px; }
                    .sidebar-nav::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
                    .sidebar-nav::-webkit-scrollbar-thumb:hover { background: var(--accent-purple); }
                `}</style>

                <Link
                    href="/products"
                    style={{
                        width: '100%', textAlign: 'left', background: 'transparent', border: 'none',
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 36px',
                        color: !currentCat && pathname === '/products' ? 'white' : 'var(--text-secondary)',
                        textDecoration: 'none', fontSize: '1rem', transition: 'all 0.4s cubic-bezier(0.2, 0, 0, 1)',
                        fontWeight: '700', cursor: 'pointer',
                        background: !currentCat && pathname === '/products' ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                        borderLeft: !currentCat && pathname === '/products' ? '5px solid #8b5cf6' : '0px solid transparent'
                    }}
                >
                    <span style={{ opacity: 0.5 }}>📦</span> All Products
                </Link>

                <div style={{ padding: '20px 36px 8px', fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    Categories
                </div>

                {departments.map((cat) => (
                    <Link
                        key={cat}
                        href={`/products?cat=${encodeURIComponent(cat)}`}
                        style={{
                            width: '100%', textAlign: 'left', background: 'transparent', border: 'none',
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 36px',
                            color: currentCat === cat ? 'white' : 'var(--text-secondary)',
                            textDecoration: 'none', fontSize: '1.05rem', transition: 'all 0.4s cubic-bezier(0.2, 0, 0, 1)',
                            fontWeight: '700', cursor: 'pointer',
                            background: currentCat === cat ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
                            borderLeft: currentCat === cat ? '5px solid #ec4899' : '0px solid transparent'
                        }}
                    >
                        <span style={{ fontSize: '1.1rem', filter: 'grayscale(0.5)' }}>✨</span>
                        {cat}
                    </Link>
                ))}
            </nav>

            <div style={{ padding: '24px 36px', borderTop: '1px solid var(--border-glass)', background: 'rgba(255,255,255,0.01)' }}>
                <Link href="/contact" style={{ textDecoration: 'none', color: 'var(--accent-soft-purple)', fontSize: '0.85rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🤝</span> Help & Support Center
                </Link>
            </div>
        </aside>
    );
}
