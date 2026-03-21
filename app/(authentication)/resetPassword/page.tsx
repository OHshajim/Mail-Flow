"use client";

import { useState } from "react";
import Input from "@/components/input/input";
import "@/app/(authentication)/auth.css";
import { Popup } from "@/components/popup/popup";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Password reset submitted");

        // simulate success
        setShowPopup(true);
    };

    return (
        <div className="container">
            {/* ✅ POPUP RENDER */}
            {showPopup && (
                <Popup
                    type="success"
                    message="Password reset successful!"
                    onConfirm={() => router.push("/login")}
                    confirmText="Go to Login"
                />
            )}

            <form className="card" onSubmit={handleSubmit}>
                <div className="font-roboto">
                    <h2>Reset Password</h2>
                    <p>Enter your new password</p>
                </div>

                <Input
                    name="password"
                    type="password"
                    placeholder="New password"
                    icon={<span className="icon">🔒</span>}
                />

                <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    icon={<span className="icon">🔒</span>}
                />

                <button className="btn">Reset Password</button>
            </form>
        </div>
    );
}
