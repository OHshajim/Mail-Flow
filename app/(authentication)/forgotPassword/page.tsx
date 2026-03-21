import Link from "next/link";

import Input from "@/components/input/input";
import "@/app/(authentication)/auth.css";

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
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        icon={<span className="icon">📧</span>}
                    />
                </div>
                <button className="btn">Send Reset Link</button>
            </form>
            <div>
                <p className="auth ">
                    {`Back to`}{" "}
                    <Link href="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
