"use client";

import { useState } from "react";
import "./settings.css";
import { TrashIcon } from "@/public/icons";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import StorageCard from "./components/StorageCard/StorageCard";
import NotificationsCard from "./components/NotificationsCard/NotificationsCard";
import SecurityCard from "./components/SecurityCard/SecurityCard";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NotificationState {
  email: boolean;
  desktop: boolean;
  mentions: boolean;
}

interface SecurityState {
  twoFA: boolean;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [notifications, setNotifications] = useState<NotificationState>({
    email: true,
    desktop: false,
    mentions: true,
  });
  const [security, setSecurity] = useState<SecurityState>({ twoFA: false });

  const handleNotifChange = (key: keyof NotificationState, val: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {

  };

  const handleCancel = () => {
    setNotifications({ email: true, desktop: false, mentions: true });
    setSecurity({ twoFA: false });
  };

  return (
        <div className="root">
            <main className="setting-page">
            <header className="pageHeader">
                <h1>Settings</h1>
                <p>Manage your ethereal experience and security preferences.</p>
            </header>

            <ProfileCard />
            <StorageCard />
            <NotificationsCard state={notifications} onChange={handleNotifChange} />
            <SecurityCard
                twoFA={security.twoFA}
                onTwoFAChange={(val) => setSecurity({ twoFA: val })}
            />

            {/* Footer */}
            <div className="footerActions">
                <button className="btnDanger" type="button">
                <TrashIcon/>
                Deactivate Account
                </button>
                <div className="footerRight">
                <button className="btnCancel" type="button" onClick={handleCancel}>Cancel</button>
                <button className="btnSave" type="button" onClick={handleSave}>Save All Changes</button>
                </div>
            </div>
            </main>
        </div>
  );
}