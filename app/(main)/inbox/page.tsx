"use client";

import { useState } from "react";
import "./inbox.css"; // we'll create this

// Mock email data
const allMails = [
    {
        id: 1,
        from: "Alex Johnson <alex@work.com>",
        subject: "Project sync – tomorrow at 10",
        body: "Hey team, let's sync up about the new design. I'll share the updated mockups. See you then!",
        category: "primary",
        read: false,
        date: "10:30 AM",
    },
    {
        id: 2,
        from: "Tech Daily <news@techdaily.com>",
        subject: "Your daily tech briefing",
        body: "AI breakthroughs, new gadgets, and more. Read the top stories...",
        category: "social",
        read: true,
        date: "Yesterday",
    },
    {
        id: 3,
        from: "Fashion Week <info@fashionweek.com>",
        subject: "Exclusive: 20% off new arrivals",
        body: "Use code FALL20 to get your discount. Shop now!",
        category: "promotions",
        read: false,
        date: "Nov 12",
    },
    {
        id: 4,
        from: "Sarah Miller <sarah@design.co>",
        subject: "Feedback on the wireframes",
        body: "I love the direction, but we might need to adjust the spacing. Let's discuss.",
        category: "primary",
        read: true,
        date: "Nov 11",
    },
    {
        id: 5,
        from: "Twitter <notify@twitter.com>",
        subject: "Someone liked your tweet",
        body: "@yourhandle, your tweet was liked by 12 people.",
        category: "social",
        read: false,
        date: "Nov 10",
    },
    {
        id: 6,
        from: "Amazon <deal@amazon.com>",
        subject: "Lightning deal: 50% off electronics",
        body: "Hurry, limited time offer!",
        category: "promotions",
        read: true,
        date: "Nov 9",
    },
];

export default function InboxPage() {
    const [activeTab, setActiveTab] = useState<
        "primary" | "social" | "promotions"
    >("primary");
    const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
    const [selectedMail, setSelectedMail] = useState<
        (typeof allMails)[0] | null
    >(null);

    // Filter mails by active tab and read/unread filter
    const filteredMails = allMails
        .filter((mail) => mail.category === activeTab)
        .filter((mail) => {
            if (filter === "unread") return !mail.read;
            if (filter === "read") return mail.read;
            return true;
        });

    const handleMailClick = (mail: (typeof allMails)[0]) => {
        setSelectedMail(mail);
        // Optionally mark as read
        // (We're not updating the mock data permanently; for demo purposes)
    };

    const closeDetail = () => {
        setSelectedMail(null);
    };

    return (
        <div className="inbox-container">
            {/* Left column: tabs, filters, list */}
            <div className={`inbox-list ${selectedMail ? "with-detail" : ""}`}>
                {/* Tabs */}
                <div className="inbox-tabs">
                    <button
                        className={activeTab === "primary" ? "active" : ""}
                        onClick={() => setActiveTab("primary")}
                    >
                        Primary
                    </button>
                    <button
                        className={activeTab === "social" ? "active" : ""}
                        onClick={() => setActiveTab("social")}
                    >
                        Social
                    </button>
                    <button
                        className={activeTab === "promotions" ? "active" : ""}
                        onClick={() => setActiveTab("promotions")}
                    >
                        Promotions
                    </button>
                </div>

                {/* Filters */}
                <div className="inbox-filters">
                    <button
                        className={filter === "all" ? "active" : ""}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </button>
                    <button
                        className={filter === "unread" ? "active" : ""}
                        onClick={() => setFilter("unread")}
                    >
                        Unread
                    </button>
                    <button
                        className={filter === "read" ? "active" : ""}
                        onClick={() => setFilter("read")}
                    >
                        Read
                    </button>
                </div>

                {/* Email list */}
                <div className="email-list">
                    {filteredMails.length === 0 ? (
                        <div className="empty-state">No emails found</div>
                    ) : (
                        filteredMails.map((mail) => (
                            <div
                                key={mail.id}
                                className={`email-item ${!mail.read ? "unread" : ""} ${
                                    selectedMail?.id === mail.id
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => handleMailClick(mail)}
                            >
                                <div className="email-sender">{mail.from}</div>
                                <div className="email-subject">
                                    {mail.subject}
                                </div>
                                <div className="email-date">{mail.date}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Right column: detail view */}
            {selectedMail && (
                <div className="email-detail">
                    <button className="detail-close" onClick={closeDetail}>
                        &times;
                    </button>
                    <h2>{selectedMail.subject}</h2>
                    <p className="detail-from">{selectedMail.from}</p>
                    <div className="detail-body">{selectedMail.body}</div>
                </div>
            )}
        </div>
    );
}
