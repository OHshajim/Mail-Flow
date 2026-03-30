"use client";

import { useState } from "react";
import "./inbox.css";
import { allMails } from "@/public/data";
import Mails from "@/components/mails/mails";
import { ShowingMail } from "@/components/showingMail/showingMail";

export default function InboxPage() {
    const [activeTab, setActiveTab] = useState<"primary" | "social" | "promotions">("primary");
    const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
    const [selectedMail, setSelectedMail] = useState<(typeof allMails)[0] | null>(null);

    const filteredMails = allMails
        .filter((mail) => mail.category === activeTab)
        .filter((mail) => {
            if (filter === "unread") return !mail.read;
            if (filter === "read") return mail.read;
            return true;
        });

    const handleMailClick = (mail: (typeof allMails)[0]) => {
        setSelectedMail(mail);
    };

    const closeDetail = () => {
        setSelectedMail(null);
    };

    return (
        <div className="inbox-container">
            {/* Left column: tabs, filters, list */}
            <div className={`inbox-list ${selectedMail ? "with-detail" : ""}`}>
                <h3 className="page-title">
                    Inbox <span className="page-title-badge">34</span>
                </h3>
                <div className="filter-container">
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
                            className={
                                activeTab === "promotions" ? "active" : ""
                            }
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
                </div>

                {/* Email list */}
                <Mails
                    handleMailClick={handleMailClick}
                    mails={filteredMails}
                    selectedMail={selectedMail}
                />
            </div>

            {/* Right column: detail view */}
            {selectedMail && (
                <ShowingMail
                    closeDetail={closeDetail}
                    selectedMail={selectedMail}
                />
            )}
        </div>
    );
}
