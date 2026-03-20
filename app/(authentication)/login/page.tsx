import Link from "next/link";

import Input from "@/components/input/input";
import "@/app/(authentication)/login/login.css"

export default function LoginPage() {
    return (
        <div className="container">
            <form className="card">
                <h2>Welcome Back</h2>
                <p>Step into ethereal workspace</p>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        icon={<span className="icon">📧</span>}
                    />
                </div>
                <div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Link href="/forgot-password" className="forgot-link">
                            Forgot?
                        </Link>
                    </div>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        icon={<span className="icon">🔒</span>}
                    />
                </div>
                <button className="btn">Login</button>
            </form>
            <div>
                <p className="auth">{`Don't have an account?`} <Link href="/signup">Sign up</Link></p>
            </div>
        </div>
    );
}