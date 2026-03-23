"use client";
import Link from "next/link";

import Input from "@/components/input/input";
import "@/app/(authentication)/auth.css"
import { LockIcon, MailIcon } from "@/public/icons";


export default function LoginPage() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        console.log(data);
    };
    return (
        <div className="container">
            <form className="card" onSubmit={handleSubmit}>
                <div className="font-roboto">
                    <h2>Welcome Back</h2>
                    <p>Step into ethereal workspace</p>
                </div>
                <div>
                    <label htmlFor="email">EMAIL ADDRESS</label>
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        icon={<MailIcon className="icon"/>}
                    />
                </div>
                <div>
                    <div>
                        <label htmlFor="password">PASSWORD</label>
                        <Link
                            href="/forgotPassword"
                            className="forgot-link"
                        >
                            FORGOT?
                        </Link>
                    </div>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        icon={<LockIcon className="icon"/>}
                    />
                </div>
                <button className="btn">Sign In</button>
            </form>
            <div>
                <p className="auth ">
                    {`Don't have an account?`}{" "}
                    <Link href="/register" >Sign up</Link>
                </p>
            </div>
        </div>
    );
}