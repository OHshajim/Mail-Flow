"use client";

import { useState, useRef, useEffect } from "react";
import "@/components/navbar/navbar.css";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        { icon: "👤", label: "Filter", href: "#" },
        { icon: "⚙️", label: "Read", href: "#" },
        { icon: "🌙", label: "Bin", href: "#" },
        { icon: "🌙", label: "Block", href: "#" },
        { icon: "🌙", label: "Star", href: "#" },
        
    ];

    return (
        <nav className="nb">
            <div className="nb-inner">
                {/* Logo + Name */}
                <Link href="/" className="nb-logo" aria-label="Home">
                    <Image
                        className="nb-logo-icon"
                        src="/logo.svg"
                        alt="MailFlow"
                        width={40}
                        height={40}
                        loading="lazy"
                    />
                    <span className="nb-logo-name">MailFlow</span>
                </Link>
                <div className="nb-right">
                    {/* Search */}
                    <div className="nb-search">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="search"
                            placeholder="Search emails, people..."
                            aria-label="Search"
                        />
                    </div>
                    {/* 3-dot dropdown */}
                    <div className="nb-dd-wrap" ref={dropdownRef}>
                        <button
                            className="nb-dots-btn"
                            aria-label="More options"
                            aria-haspopup="true"
                            aria-expanded={dropdownOpen}
                            onClick={() => setDropdownOpen((v) => !v)}
                        >
                            <div className="nb-dots-inner">
                                <div className="nb-dot" />
                                <div className="nb-dot" />
                                <div className="nb-dot" />
                            </div>
                        </button>
                        <ul
                            className={`nb-dd${dropdownOpen ? " open" : ""}`}
                            role="menu"
                        >
                            {menuItems.map((item) => (
                                <li key={item.label} role="menuitem">
                                    <a
                                        href={item.href}
                                        className={`nb-dd-item`}
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <span>{item.icon}</span>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
