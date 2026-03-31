"use client";
import { useState } from "react";
import { allMails } from "@/public/data";
import Mails from "@/components/mails/mails";
import { ShowingMail } from "@/components/showingMail/showingMail";

export default function InboxPage() {
    const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
    const [selectedMail, setSelectedMail] = useState<
        (typeof allMails)[0] | null
    >(null);

    const filteredMails = allMails
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
        <div className={`inbox-container ${selectedMail ? "mail-open" : ""}`}>
            {/* Left column: tabs, filters, list */}
             <div className="inbox-list">
                <h3 className="page-title">
                    All Mails <span className="page-title-badge">34</span>
                </h3>
                <div className="filter-container">
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
