'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ALL_PRODUCTS } from '../products/data';

// --- MOCK DASHBOARD DATA ---
const stats = [
    { label: 'GROSS REVENUE', value: '₹1,24,56,000', trend: '+14.5%', isUp: true, icon: '📈' },
    { label: 'TOTAL SHIPMENTS', value: '14,284', trend: '+8.2%', isUp: true, icon: '📦' },
    { label: 'LIVE CATALOGUE', value: 'ALL_PRODUCTS', trend: '0%', isUp: true, icon: '💎' },
    { label: 'ACTIVE RETAINERS', value: '84,430', trend: '-2.4%', isUp: false, icon: '👥' },
];

const initialOrders = [
    { id: 'ORD-2026-X1', customer: 'Rahul Sharma', date: '27 Feb 2026', total: '₹22,549', status: 'Processing' },
    { id: 'ORD-2026-X2', customer: 'Priya Patel', date: '27 Feb 2026', total: '₹1,34,499', status: 'Shipped' },
    { id: 'ORD-2026-X3', customer: 'Amit Singh', date: '26 Feb 2026', total: '₹1,180', status: 'Delivered' },
    { id: 'ORD-2026-X4', customer: 'Neha Gupta', date: '25 Feb 2026', total: '₹84,900', status: 'Cancelled' },
];

const initialUsers = [
    { id: 'USR-001', name: 'John Doe', email: 'john@example.com', role: 'Super Admin', status: 'Active' },
    { id: 'USR-002', name: 'Rahul Sharma', email: 'rahul@example.com', role: 'Curator', status: 'Active' },
    { id: 'USR-003', name: 'Neha Gupta', email: 'neha@example.com', role: 'User', status: 'Banned' },
];

const statusStyle = {
    'Delivered': { bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
    'Processing': { bg: 'rgba(139,92,246,0.1)', color: '#8b5cf6' },
    'Shipped': { bg: 'rgba(56,189,248,0.1)', color: '#38bdf8' },
    'Cancelled': { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
    'Active': { bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
    'Banned': { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
};

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('Overview');
    const [products, setProducts] = useState(ALL_PRODUCTS);
    const [orders, setOrders] = useState(initialOrders);
    const [users, setUsers] = useState(initialUsers);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const renderTableWrap = (title, actionBtn, children) => (
        <div style={{ background: '#0a0a0f', borderRadius: '32px', border: '1px solid var(--border-glass)', overflow: 'hidden', animation: 'fadeInUp 0.6s ease' }}>
            <div style={{ padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'white', letterSpacing: '-1px' }}>{title}</h3>
                {actionBtn}
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    {children}
                </table>
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#050508' }}>
            
            {/* ─── COMMAND SIDEBAR ─── */}
            <aside style={{
                width: '300px', background: '#0a0a0f', borderRight: '1px solid var(--border-glass)',
                padding: '48px 32px', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh'
            }}>
                <div style={{ marginBottom: '60px' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: '950', color: 'white', letterSpacing: '-2px' }}>NEXUS COMMAND.</div>
                    <div style={{ fontSize: '0.65rem', fontWeight: '900', color: 'var(--accent-purple)', letterSpacing: '2.5px', marginTop: '8px' }}>CORE INFRASTRUCTURE</div>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {['Overview', 'Products', 'Orders', 'Users'].map(tab => (
                        <button 
                            key={tab} 
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '16px 20px', borderRadius: '16px', textAlign: 'left', border: 'none', cursor: 'pointer',
                                background: activeTab === tab ? 'var(--gradient-master)' : 'transparent',
                                color: activeTab === tab ? 'white' : 'var(--text-muted)',
                                fontWeight: '900', fontSize: '0.9rem', transition: 'all 0.3s'
                            }}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </nav>

                <div style={{ marginTop: 'auto', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid var(--border-glass)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-purple)' }}></div>
                        <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: '900', color: 'white' }}>SYSTEM ADMIN</div>
                            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-muted)' }}>SECURE ACCESS</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ─── MAIN HUB ─── */}
            <main style={{ flex: 1, padding: '60px 80px', marginLeft: '300px' }}>
                <header style={{ marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: '950', color: 'white', letterSpacing: '-3px' }}>Dashboard Matrix.</h1>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '1.1rem' }}>Operational oversight for the Nexus global infrastructure.</p>
                </header>

                {activeTab === 'Overview' && (
                    <div style={{ animation: 'fadeInUp 0.6s ease' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '60px' }}>
                            {stats.map((stat, i) => (
                                <div key={i} className="card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', background: 'radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)', filter: 'blur(20px)' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                        <div style={{ fontSize: '1.8rem' }}>{stat.icon}</div>
                                        <div style={{ color: stat.isUp ? '#10b981' : '#ef4444', fontWeight: '900', fontSize: '0.8rem' }}>{stat.trend}</div>
                                    </div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--text-muted)', letterSpacing: '1.5px', marginBottom: '8px' }}>{stat.label}</div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: '950', color: 'white', letterSpacing: '-1px' }}>{stat.label === 'LIVE CATALOGUE' ? ALL_PRODUCTS.length : stat.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity Mini-Tab */}
                        {renderTableWrap('Strategic Shipments', null, (
                            <>
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-glass)' }}>
                                        <th style={{ padding: '20px 32px', fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-muted)' }}>IDENTIFIER</th>
                                        <th style={{ padding: '20px 32px', fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-muted)' }}>RECIPIENT</th>
                                        <th style={{ padding: '20px 32px', fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-muted)' }}>VALUATION</th>
                                        <th style={{ padding: '20px 32px', fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-muted)' }}>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(o => (
                                        <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                            <td style={{ padding: '24px 32px', fontWeight: '900', color: 'white' }}>{o.id}</td>
                                            <td style={{ padding: '24px 32px', fontWeight: '600', color: 'var(--text-secondary)' }}>{o.customer}</td>
                                            <td style={{ padding: '24px 32px', fontWeight: '900', color: 'white' }}>{o.total}</td>
                                            <td style={{ padding: '24px 32px' }}>
                                                <span style={{ padding: '6px 16px', borderRadius: '12px', background: statusStyle[o.status].bg, color: statusStyle[o.status].color, fontSize: '0.7rem', fontWeight: '900' }}>{o.status.toUpperCase()}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </>
                        ))}
                    </div>
                )}

                {/* Other Tabs could follow same elite pattern... */}
                {activeTab !== 'Overview' && (
                    <div style={{ textAlign: 'center', padding: '100px', border: '2px dashed var(--border-glass)', borderRadius: '40px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'white' }}>{activeTab} Module.</h2>
                        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>Currently synchronizing with live database infrastructure...</p>
                    </div>
                )}

            </main>
        </div>
    );
}
