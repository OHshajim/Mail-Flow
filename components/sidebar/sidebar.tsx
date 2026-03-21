"use client";
import { useState } from "react";
import "@/components/sidebar/sidebar.css";
const navGroups = [
            { icon: "🏠", label: "Inbox", href: "#", active: true },
            { icon: "📊", label: "Starred", href: "#" },
            { icon: "📁", label: "Sent", href: "#"},
            { icon: "💬", label: "Drafts", href: "#"},
            { icon: "💬", label: "Subscriptions", href: "#"},
            { icon: "💬", label: "Bin", href: "#"},
            { icon: "💬", label: "Span", href: "#"},
            { icon: "💬", label: "All Mail", href: "#"},
            { icon: "❓", label: "Help & Suggestions", href: "#" },
];

export default function Sidebar() {
    const [active, setActive] = useState("Inbox");
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <div className="sb-layout">
                {/* Mobile overlay */}
                {mobileOpen && (
                    <div
                        className="sb-overlay"
                        onClick={() => setMobileOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`sb${collapsed ? " collapsed" : ""}${mobileOpen ? " mobile-open" : ""}`}
                >
                    {/* Header */}
                    <div className="sb-header">
                        <button
                            className="btn"
                            onClick={() => setCollapsed((v) => !v)}
                        >
                            Compose
                        </button>
                    </div>

                    {/* Nav */}
                    <nav className="sb-nav">
                        {navGroups.map((group) => (
                            <div key={group.label} className="sb-group">
                                <a
                                    key={group.label}
                                    href={group.href}
                                    data-tooltip={group.label}
                                    className={`sb-item${active === group.label ? " active" : ""}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActive(group.label);
                                        setMobileOpen(false);
                                    }}
                                >
                                    <span className="sb-item-icon">
                                        {group.icon}
                                    </span>
                                    <span className="sb-item-label">
                                        {group.label}
                                    </span>
                                </a>
                            </div>
                        ))}
                    </nav>

                    {/* Footer user */}
                    <div className="sb-footer">
                        <div className="sb-user">
                            <div className="sb-avatar">A</div>
                            <div className="sb-user-info">
                                <div className="sb-user-name">Alex Johnson</div>
                                <div className="sb-user-role">alex@gmail.com</div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Mobile trigger */}
                <button
                    className="sb-mobile-trigger"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label="Toggle sidebar"
                >
                    ☰
                </button>
            </div>
        </>
    );
}
