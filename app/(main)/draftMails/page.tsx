"use client";

import { useState } from "react";
import { allMails } from "@/public/data";
import Mails from "@/components/mails/mails";
import ComposeEmail from "@/components/composePanel/compose";

export default function DraftMailsPage() {

    const [selectedMail, setSelectedMail] = useState<(typeof allMails)[0] | null>(null);
    const handleMailClick = (mail: (typeof allMails)[0]) => {
        setSelectedMail(mail);
    };
    const closeDetail = () => {
        setSelectedMail(null);
    };

    return (
        <div className={`inbox-container ${selectedMail ? "mail-open" : ""}`}>
            {/* Left column: tabs, filters, list */}
            <div className={`inbox-list `}>
                <h3 className="page-title">
                    Inbox <span className="page-title-badge">34</span>
                </h3>
                {/* Email list */}
                <Mails
                    handleMailClick={handleMailClick}
                    mails={allMails}
                    selectedMail={selectedMail}
                />
            </div>
            {selectedMail && (
                <ComposeEmail
                    onClose={closeDetail}
                    defaultSubject={selectedMail.subject}
                    defaultTo={selectedMail.from}
                />
            )}
        </div>
    );
}
