"use client"
import { useState, useRef, useEffect } from "react";
import { CrossIcon, StarIcon, ThreeDotsIcon } from "@/public/icons";
import "./showingMail.css"
import Image from "next/image";

interface Mail {
    id: number;
    from: string;
    to?: string;
    subject: string;
    body: string;
    date: string;
    read: boolean;
    category: string;
}

interface Props {
    selectedMail: Mail;
    closeDetail: () => void;
}

const menuOptions = [
    { label: "Reply", icon: "↩" },
    { label: "Forward", icon: "↪" },
    { label: "Delete", icon: "🗑", danger: true },
    { label: "Move to Spam", icon: "⚠", danger: true },
    { label: "Block Sender", icon: "🚫", danger: true },
    { label: "Mark as Unread", icon: "✉" },
    { label: "Print", icon: "🖨" },
];

export const ShowingMail = ({ selectedMail, closeDetail }: Props) => {
    const [starred, setStarred] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Extract sender name from "Name <email>" format
    const senderName = selectedMail.from.includes("<")
        ? selectedMail.from.split("<")[0].trim()
        : selectedMail.from;

    const senderEmail = selectedMail.from.includes("<")
        ? (selectedMail.from.match(/<(.+)>/)?.[1] ?? selectedMail.from)
        : selectedMail.from;

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="email-detail">
            {/* ── Header ── */}
            <div className="detail-header">
                <h2 className="detail-subject">{selectedMail.subject}</h2>
                <div className="detail-actions">
                    {/* Star toggle */}
                    <button
                        className={`detail-btn ${starred ? "detail-btn--starred" : ""}`}
                        onClick={() => setStarred((prev) => !prev)}
                        title={starred ? "Unstar" : "Star"}
                    >
                        <StarIcon />
                    </button>

                    {/* Three dots menu */}
                    <div className="detail-menu-wrapper" ref={menuRef}>
                        <button
                            className={`detail-btn ${menuOpen ? "detail-btn--active" : ""}`}
                            onClick={() => setMenuOpen((prev) => !prev)}
                            title="More options"
                        >
                            <ThreeDotsIcon />
                        </button>

                        {menuOpen && (
                            <div className="detail-menu">
                                {menuOptions.map((opt) => (
                                    <button
                                        key={opt.label}
                                        className={`detail-menu-item ${opt.danger ? "detail-menu-item--danger" : ""}`}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span className="detail-menu-icon">
                                            {opt.icon}
                                        </span>
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Close */}
                    <button
                        className="detail-btn"
                        onClick={closeDetail}
                        title="Close"
                    >
                        <CrossIcon />
                    </button>
                </div>
            </div>

            {/* ── Sender info ── */}
            <div className="detail-sender-row">
                <div className="detail-avatar">
                    {senderName.charAt(0).toUpperCase()}
                </div>

                <div className="detail-sender-info">
                    <div className="detail-sender-top">
                        <div>
                            <div className="detail-sender-name-row">
                                <h3 className="detail-sender-name">
                                    {senderName}
                                </h3>
                                <span className="detail-sender-email">
                                    &lt;{senderEmail}&gt;
                                </span>
                            </div>
                            <p className="detail-sender-to">
                                To &lt;{selectedMail.to ?? "me"}&gt;
                            </p>
                        </div>
                        <p className="detail-date">{selectedMail.date}</p>
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="detail-body">
                {selectedMail.body.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                ))}
            </div>

            {/* ── Reply bar ── */}
            <div className="detail-reply-bar">
                <button className="detail-reply-btn">↩ Reply</button>
                <button className="detail-reply-btn">↪ Forward</button>
            </div>
        </div>
    );
};
