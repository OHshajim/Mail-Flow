"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import "@/components/sidebar/sidebar.css";
import { SettingIcon } from "@/public/icons";
import { navGroups } from "@/public/data";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Sidebar({
    isMobileMenuOpen,
    closeMobileMenu,
    onComposeClick,
}: {
    isMobileMenuOpen: boolean;
    closeMobileMenu: () => void;
    onComposeClick: () => void;
}) {
    const pathname = usePathname();
    const [active, setActive] = useState("Inbox");
    const [collapsed, setCollapsed] = useState(false);
    const [isMediumScreen, setIsMediumScreen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [hoverExpand, setHoverExpand] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);

    // Responsive logic
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            setIsMobile(width <= 768);
            setIsMediumScreen(width <= 1080 && width > 768);

            if (width <= 1080 && width > 768) {
                setCollapsed(true);
            } else if (width > 1080) {
                setCollapsed(false);
            }

            if (width > 768) closeMobileMenu();
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close on outside click (mobile)
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                isMobileMenuOpen &&
                overlayRef.current &&
                !overlayRef.current.contains(e.target as Node)
            ) {
                closeMobileMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobileMenuOpen]);

    // Lock scroll
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    }, [isMobileMenuOpen]);

    const shouldHoverExpand = collapsed && isMediumScreen && !isMobile;

    const content = (
        <aside
            className={`sb ${collapsed ? "collapsed" : ""} ${
                hoverExpand && shouldHoverExpand ? "hover-expand" : ""
            }`}
            onMouseEnter={() => shouldHoverExpand && setHoverExpand(true)}
            onMouseLeave={() => shouldHoverExpand && setHoverExpand(false)}
        >
            {/* Header */}
            <div className="sb-header">
                <button
                    className="btn"
                    onClick={onComposeClick}
                    style={
                        collapsed && !hoverExpand
                            ? {
                                  width: "50px",
                                  height: "50px",
                                  padding: "0",
                                  justifyContent: "center",
                              }
                            : {}
                    }
                >
                    {!collapsed || hoverExpand ? "Compose" : "+"}
                </button>
            </div>

            {/* Nav */}
            <nav className="sb-nav">
                {navGroups.map((group) => (
                    <Link
                        href={group.href}
                        key={group.label}
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            className={`sb-item ${
                                pathname === group.href ? "active" : ""
                            }`}
                            onClick={() => {
                                if (isMobile) closeMobileMenu();
                            }}
                        >
                            {group.icon}
                            {(!collapsed || hoverExpand) && (
                                <span className="sb-item-label">
                                    {group.label}
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
            </nav>

            {/* Footer */}
            <div className="sb-footer">
                <div className="sb-user">
                    <Image
                        src={"/logo.svg"}
                        alt="User-Image"
                        className="sb-avatar"
                        width={50}
                        height={50}
                        loading="lazy"
                    />
                    {(!collapsed || hoverExpand) && (
                        <div className="sb-user-info">
                            <div className="sb-user-name">Alex Johnson</div>
                            <div className="sb-user-role">alex@gmail.com</div>
                        </div>
                    )}
                </div>

                <Link href="/settings" className="sb-setting-link">
                    <SettingIcon />
                </Link>
            </div>
        </aside>
    );

    return (
        <>
            {/* Desktop */}
            {!isMobile && content}

            {/* Mobile */}
            {isMobile && isMobileMenuOpen && (
                <div className="mobile-overlay">
                    <div
                        className="mobile-overlay-backdrop"
                        onClick={closeMobileMenu}
                    />
                    <div ref={overlayRef} className="mobile-sidebar-container">
                        {content}
                    </div>
                </div>
            )}
        </>
    );
}
