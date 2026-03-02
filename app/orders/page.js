'use client';
import { useState } from 'react';
import Link from 'next/link';

const orders = [
    {
        id: 'ORD-20260001',
        date: '25 Feb 2026',
        status: 'Delivered',
        total: 24549,
        items: [
            { name: 'AirPods Pro Max', emoji: '🎧', price: 22549, qty: 1 },
            { name: 'Phone Case', emoji: '📱', price: 999, qty: 2 },
        ],
        address: '42B, Shivaji Nagar, Mumbai',
        payment: 'UPI · GPay',
        eta: 'Delivered on 25 Feb 2026',
    },
    {
        id: 'ORD-20260002',
        date: '23 Feb 2026',
        status: 'Out for Delivery',
        total: 135499,
        items: [
            { name: 'MacBook Pro 16"', emoji: '💻', price: 134499, qty: 1 },
            { name: 'USB-C Hub', emoji: '🔌', price: 1000, qty: 1 },
        ],
        address: '10, MG Road, Bengaluru',
        payment: 'Credit Card · HDFC',
        eta: 'Expected by today by 9 PM',
    },
    {
        id: 'ORD-20260003',
        date: '20 Feb 2026',
        status: 'Processing',
        total: 2360,
        items: [
            { name: 'Nike Air Max', emoji: '👟', price: 1180, qty: 2 },
        ],
        address: '7, Park Street, Kolkata',
        payment: 'Cash on Delivery',
        eta: 'Expected by 28 Feb 2026',
    },
    {
        id: 'ORD-20260004',
        date: '15 Feb 2026',
        status: 'Cancelled',
        total: 5999,
        items: [
            { name: 'Mechanical Keyboard', emoji: '⌨️', price: 5999, qty: 1 },
        ],
        address: '3, Civil Lines, Delhi',
        payment: 'UPI · PhonePe',
        eta: 'Cancelled on 16 Feb 2026',
    },
];

const statusConfig = {
    'Delivered': { color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)', icon: '✅' },
    'Out for Delivery': { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)', icon: '🚚' },
    'Processing': { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)', icon: '⚙️' },
    'Cancelled': { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.25)', icon: '❌' },
};

const trackSteps = ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

export default function OrdersPage() {
    const [expanded, setExpanded] = useState(null);
    const [filter, setFilter] = useState('All');

    const filters = ['All', 'Delivered', 'Out for Delivery', 'Processing', 'Cancelled'];
    const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter);

    const getStepIndex = (status) => {
        const map = { 'Processing': 1, 'Shipped': 2, 'Out for Delivery': 3, 'Delivered': 4, 'Cancelled': -1 };
        return map[status] ?? 0;
    };

    return (
        <div className="orders-page page-wrapper">
            <section className="section">
                <div style={{ marginBottom: '48px' }}>
                    <div className="badge badge-primary" style={{ marginBottom: '16px' }}>📦 My Orders</div>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: '900', letterSpacing: '-1.5px' }}>Order History</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Track and manage all your orders</p>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '36px', flexWrap: 'wrap' }}>
                    {filters.map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{
                            padding: '8px 20px', borderRadius: '100px', cursor: 'pointer',
                            border: `1.5px solid ${filter === f ? '#8b5cf6' : 'rgba(255,255,255,0.1)'}`,
                            background: filter === f ? 'rgba(139,92,246,0.15)' : 'transparent',
                            color: filter === f ? '#8b5cf6' : 'var(--text-secondary)',
                            fontWeight: '600', fontSize: '0.85rem', transition: 'all 0.2s',
                        }}>{f} {f === 'All' ? `(${orders.length})` : `(${orders.filter(o => o.status === f).length})`}</button>
                    ))}
                </div>

                {filtered.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '80px 40px' }}>
                        <div style={{ fontSize: '64px', marginBottom: '20px' }}>📭</div>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '12px' }}>No orders found</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>You have no {filter.toLowerCase()} orders.</p>
                        <Link href="/products" className="btn btn-primary">Start Shopping →</Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {filtered.map(order => {
                            const sc = statusConfig[order.status];
                            const isOpen = expanded === order.id;
                            const stepIdx = getStepIndex(order.status);

                            return (
                                <div key={order.id} className="card" style={{ padding: 0, overflow: 'hidden', borderColor: isOpen ? 'rgba(139,92,246,0.3)' : undefined }}>
                                    <div
                                        style={{ padding: '24px 28px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}
                                        onClick={() => setExpanded(isOpen ? null : order.id)}
                                    >
                                        <div style={{ flex: 1, minWidth: '200px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px', flexWrap: 'wrap' }}>
                                                <span style={{ fontWeight: '800', fontSize: '1rem' }}>{order.id}</span>
                                                <span style={{
                                                    padding: '3px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700',
                                                    background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                                                }}>{sc.icon} {order.status}</span>
                                            </div>
                                            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Placed on {order.date} · {order.items.length} item{order.items.length > 1 ? 's' : ''}</div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {order.items.slice(0, 3).map((item, i) => (
                                                <div key={i} style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--gradient-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', border: '1px solid rgba(255,255,255,0.07)' }}>{item.emoji}</div>
                                            ))}
                                        </div>

                                        <div style={{ textAlign: 'right', minWidth: '120px' }}>
                                            <div style={{ fontWeight: '900', fontSize: '1.15rem', color: 'var(--accent-purple)' }}>₹{order.total.toLocaleString('en-IN')}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{order.payment}</div>
                                        </div>

                                        <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>⌄</div>
                                    </div>

                                    {isOpen && (
                                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '28px', animation: 'fadeInUp 0.25s ease' }}>
                                            {order.status !== 'Cancelled' && (
                                                <div style={{ marginBottom: '32px' }}>
                                                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Tracking</div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                                                        {trackSteps.map((s, i) => {
                                                            const done = i <= stepIdx;
                                                            const active = i === stepIdx;
                                                            return (
                                                                <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < trackSteps.length - 1 ? 1 : 'none' }}>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                                                        <div style={{
                                                                            width: active ? '36px' : '28px', height: active ? '36px' : '28px', borderRadius: '50%',
                                                                            background: done ? (active ? 'linear-gradient(135deg,#8b5cf6,#7c3aed)' : '#8b5cf6') : 'rgba(255,255,255,0.07)',
                                                                            border: `2px solid ${done ? '#8b5cf6' : 'rgba(255,255,255,0.12)'}`,
                                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                            fontSize: active ? '14px' : '11px', fontWeight: '800', color: done ? 'white' : 'var(--text-muted)',
                                                                            boxShadow: active ? '0 4px 16px rgba(139,92,246,0.5)' : 'none',
                                                                            transition: 'all 0.3s',
                                                                        }}>{done ? '✓' : ''}</div>
                                                                        <span style={{ fontSize: '0.65rem', fontWeight: done ? '700' : '500', color: done ? 'var(--text-primary)' : 'var(--text-muted)', textAlign: 'center', maxWidth: '64px' }}>{s}</span>
                                                                    </div>
                                                                    {i < trackSteps.length - 1 && (
                                                                        <div style={{ flex: 1, height: '2px', background: i < stepIdx ? '#8b5cf6' : 'rgba(255,255,255,0.08)', margin: '0 4px', marginBottom: '20px', transition: 'all 0.3s' }} />
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '10px', background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.15)', fontSize: '0.83rem', color: 'var(--accent-purple)', fontWeight: '600' }}>
                                                        🕐 {order.eta}
                                                    </div>
                                                </div>
                                            )}

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                                <div>
                                                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Items</div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                        {order.items.map((item, i) => (
                                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                                                <span style={{ fontSize: '24px' }}>{item.emoji}</span>
                                                                <div style={{ flex: 1 }}>
                                                                    <div style={{ fontWeight: '600', fontSize: '0.88rem' }}>{item.name}</div>
                                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Qty: {item.qty}</div>
                                                                </div>
                                                                <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--accent-purple)' }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Delivery Info</div>
                                                    <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                        <div style={{ display: 'flex', gap: '10px', fontSize: '0.85rem' }}>
                                                            <span>📍</span>
                                                            <span style={{ color: 'var(--text-secondary)' }}>{order.address}</span>
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '10px', fontSize: '0.85rem' }}>
                                                            <span>💳</span>
                                                            <span style={{ color: 'var(--text-secondary)' }}>{order.payment}</span>
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '10px', fontSize: '0.85rem' }}>
                                                            <span>🧾</span>
                                                            <span style={{ fontWeight: '800', color: 'var(--accent-purple)' }}>₹{order.total.toLocaleString('en-IN')}</span>
                                                        </div>
                                                    </div>
                                                    {order.status === 'Delivered' && (
                                                        <button className="btn btn-outline" style={{ width: '100%', marginTop: '14px', fontSize: '0.85rem' }}>
                                                            ⭐ Rate & Review
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}
