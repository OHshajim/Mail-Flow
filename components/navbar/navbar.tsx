import "@/components/navbar/navbar.css";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon } from "@/public/icons";

interface NavbarProps {
    onMenuClick?: () => void; // Optional: opens mobile sidebar
}

export default function Navbar({ onMenuClick }: NavbarProps) {
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

                </div>
            </div>
        </nav>
    );
}
