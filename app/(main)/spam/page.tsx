"use client";

import { useState } from "react";
import { allMails } from "@/public/data";
import Mails from "@/components/mails/mails";
import { ShowingMail } from "@/components/showingMail/showingMail";

export default function SpamPage() {
    const [selectedMail, setSelectedMail] = useState<
        (typeof allMails)[0] | null
    >(null);

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
                    Spam <span className="page-title-badge">4</span>
                </h3>

                {/* Email list */}
                <Mails
                    handleMailClick={handleMailClick}
                    mails={allMails}
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
