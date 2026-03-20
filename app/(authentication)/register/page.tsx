import Link from "next/link";

import Input from "@/components/input/input";
import "@/app/(authentication)/login/login.css";

export default function RegisterPage() {
    return (
        <div className="container">
            <form className="card">
                <div className="font-roboto">
                    <h2>Create Account</h2>
                    <p>Join the next generation of digital workspace.</p>
                </div>
                <div>
                    <label htmlFor="name">FULL NAME</label>
                    <Input
                        type="text"
                        placeholder="Enter your full name"
                        icon={<span className="icon">�</span>}
                    />
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
                <button className="btn">Sign Up</button>
            </form>
            <div>
                <p className="auth font-plus-jakarta-sans">
                    {`Already have an account?`}{" "}
                    <Link href="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
