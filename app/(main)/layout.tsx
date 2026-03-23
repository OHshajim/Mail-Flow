"use client";

import { useState } from "react";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import "@/app/(main)/main.css";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [composeOpen, setComposeOpen] = useState(false);

    return (
        <div className="layout">
            {/* Navbar */}
            <Navbar onMenuClick={() => setMobileMenuOpen(true)} />

            {/* Sidebar + Content */}
            <div className="main-container">
                <Sidebar
                    isMobileMenuOpen={mobileMenuOpen}
                    closeMobileMenu={() => setMobileMenuOpen(false)}
                    onComposeClick={() => setComposeOpen(true)}
                />

                <main className="main-content">{children}</main>
            </div>

            {/* Compose Panel */}
            {/* {composeOpen && (
               
            )} */}
        </div>
    );
}
