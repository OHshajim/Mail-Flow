import Image from "next/image";
import "./mails.css";
import { useState } from "react";
import { BlockIcon, CancelIcon, InfoIcon, TrashIcon } from "@/public/icons";

const Mails = ({
    mails = [],
    handleMailClick,
    selectedMail,
}: {
    mails: any[];
    handleMailClick: (mail: any) => void;
    selectedMail: any;
}) => {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const toggleSelect = (e: React.MouseEvent, mailId: string) => {
        e.stopPropagation(); // prevent card click / mail open
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(mailId) ? next.delete(mailId) : next.add(mailId);
            return next;
        });
    };

    const clearSelection = () => setSelectedIds(new Set());

    const handleBulkAction = (action: "block" | "spam" | "archive") => {
        console.log(`${action}:`, Array.from(selectedIds));
        // wire up your real handlers here
        clearSelection();
    };

    if (!mails.length) {
        return <div className="empty-state">No emails found</div>;
    }

    return (
        <div className="email-list-wrapper">
            {/* ── Bulk action toolbar ── */}
            {selectedIds.size > 0 && (
                <div className="bulk-toolbar">
                    <span className="bulk-count">
                        {selectedIds.size} selected
                    </span>
                    <div className="bulk-actions">
                        <button
                            className="bulk-btn block"
                            onClick={() => handleBulkAction("block")}
                        >
                            <BlockIcon /> Block
                        </button>
                        <button
                            className="bulk-btn spam"
                            onClick={() => handleBulkAction("spam")}
                        >
                            <InfoIcon /> Spam
                        </button>
                        <button
                            className="bulk-btn archive"
                            onClick={() => handleBulkAction("archive")}
                        >
                            <TrashIcon /> Archive
                        </button>
                        <button
                            className="bulk-btn cancel"
                            onClick={clearSelection}
                        >
                            <CancelIcon size={20}/>
                        </button>
                    </div>
                </div>
            )}

            {/* ── Email list ── */}
            <div className="email-list">
                {mails.map((mail) => {
                    const isChecked = selectedIds.has(mail.id);
                    return (
                        <div
                            key={mail.id}
                            className={`email-item ${!mail.read ? "unread" : ""} ${
                                selectedMail?.id === mail.id ? "selected" : ""
                            } ${isChecked ? "checked" : ""}`}
                            onClick={() => handleMailClick(mail)}
                        >
                            {/* ── Avatar with checkbox overlay ── */}
                            <div
                                className={`avatar-wrapper ${isChecked ? "avatar-checked" : ""}`}
                                onClick={(e) => toggleSelect(e, mail.id)}
                                title={isChecked ? "Deselect" : "Select"}
                            >
                                <Image
                                    src="/logo.svg"
                                    alt="User-photo"
                                    width={50}
                                    height={50}
                                    className="avatar-img"
                                />
                                {/* tick overlay */}
                                <div className="avatar-tick">
                                    <svg
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            cx="10"
                                            cy="10"
                                            r="10"
                                            fill="#4F46E5"
                                        />
                                        <path
                                            d="M5.5 10.5L8.5 13.5L14.5 7"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* ── Email body ── */}
                            <div className="email-item-body">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <h4 className="email-sender">
                                        {mail.from}
                                    </h4>
                                    <p className="email-date">{mail.date}</p>
                                </div>
                                <h4 className="email-subject">
                                    {mail.subject}
                                </h4>
                                <p className="email-body">{mail.body}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Mails;
