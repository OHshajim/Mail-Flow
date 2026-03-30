"use client";

import { useState, useRef, useEffect } from "react";
import "@/components/navbar/navbar.css";
import Image from "next/image";
import Link from "next/link";
import { BlockIcon, DraftIcon, ThreeDotsIcon, MenuIcon } from "@/public/icons";

interface NavbarProps {
    onMenuClick?: () => void; // Optional: opens mobile sidebar
}

export default function Navbar({ onMenuClick }: NavbarProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
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
        { icon: <DraftIcon />, label: "Read", href: "#" },
        { icon: <BlockIcon />, label: "Block", href: "#" },
    ];

    return (
        <nav className="nb">
            <div className="nb-inner">
                {/* Mobile menu button - visible only on mobile */}
                <button
                    className="nb-menu-btn"
                    onClick={onMenuClick}
                    aria-label="Open menu"
                >
                    <MenuIcon size={20} />
                </button>

                {/* Logo + Name */}
                <Link href="/inbox" className="nb-logo" aria-label="Home">
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
                                <ThreeDotsIcon className="nb-dot" />
                            </div>
                        </button>
                        <ul
                            className={`nb-dd${dropdownOpen ? " open" : ""}`}
                            role="menu"
                        >
                            {menuItems.map((item) => (
                                <li key={item.label} role="menuitem">
                                    <Link
                                        href={item.href}
                                        className="nb-dd-item"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <span>{item.icon}</span>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
