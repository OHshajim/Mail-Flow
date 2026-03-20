import Link from "next/link";

import Input from "@/components/input/input";
import "@/app/(authentication)/login/login.css";

export default function ForgotPasswordPage() {
    return (
        <div className="container">
            <form className="card">
                <div className="font-roboto">
                    <h2>Forgot Password</h2>
                    <p>Enter your email to reset your password</p>
                </div>
                <div>
                    <label htmlFor="email">EMAIL ADDRESS</label>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        icon={<span className="icon">📧</span>}
                    />
                </div>
                <div>
                    <div>
                        <label htmlFor="password">PASSWORD</label>
                    </div>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        icon={<span className="icon">🔒</span>}
                    />
                </div>
                <button className="btn">Reset Password</button>
            </form>
            <div>
                <p className="auth font-plus-jakarta-sans">
                    {`Back to`}{" "}
                    <Link href="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
