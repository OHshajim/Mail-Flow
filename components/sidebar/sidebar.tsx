"use client";
import { useState } from "react";
import "@/components/sidebar/sidebar.css";
import { AllMailIcon, DraftIcon, InboxIcon, InfoIcon, QuestionIcon, SentIcon, SettingIcon, StarIcon, SubscribeIcon, TrashIcon } from "@/public/icons";
import Link from "next/link";

const navGroups = [
            { icon: <InboxIcon className="sb-item-icon" />, label: "Inbox", href: "/", active: true },
            { icon: <StarIcon className="sb-item-icon" />, label: "Starred", href: "/starred" },
            { icon: <SentIcon className="sb-item-icon" />, label: "Sent", href: "/send"},
            { icon: <DraftIcon className="sb-item-icon" />, label: "Drafts", href: "/draftMail"},
            { icon: <SubscribeIcon className="sb-item-icon"/>, label: "Subscriptions", href: "/subscribe"},
            { icon: <TrashIcon className="sb-item-icon" size={20}/>, label: "Bin", href: "/bin"},
            { icon: <InfoIcon className="sb-item-icon"/>, label: "Spam", href: "/spam"},
            { icon: <AllMailIcon className="sb-item-icon"/>, label: "All Mail", href: "/allMail"},
            { icon: <QuestionIcon className="sb-item-icon"/>, label: "Help & Suggestions", href: "/help" },
];

export default function Sidebar() {
    const [active, setActive] = useState("Inbox");
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <div className="sb-layout">
                {/* Sidebar */}
                <aside className={`sb${collapsed ? " collapsed" : ""}`}>
                    {/* Header */}
                    <div className="sb-header">
                        <button
                            className="btn"
                            style={
                                collapsed
                                    ? {
                                          padding: "12px",
                                          width: "50px",
                                          height: "50px",
                                      }:
                                      {}
                            }
                            onClick={() => setCollapsed((v) => !v)}
                        >
                            {collapsed ? "+" : "Compose"}
                        </button>
                    </div>

                    {/* Nav */}
                    <nav className="sb-nav">
                        {navGroups.map((group) => (
                            <div key={group.label} className="sb-group">
                                <Link
                                    key={group.label}
                                    href={group.href}
                                    data-tooltip={group.label}
                                    className={`sb-item${active === group.label ? " active" : ""}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActive(group.label);
                                    }}
                                >
                                    {group.icon}
                                    {collapsed || (
                                        <span className="sb-item-label">
                                            {group.label}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        ))}
                    </nav>

                    {/* Footer user */}
                    <div className="sb-footer">
                        <div className="sb-user">
                            <div className="sb-avatar">A</div>
                            <div className="sb-user-info">
                                <div className="sb-user-name">Alex Johnson</div>
                                <div className="sb-user-role">
                                    alex@gmail.com
                                </div>
                            </div>
                        </div>
                        <SettingIcon/>
                    </div>
                </aside>
            </div>
        </>
    );
}
