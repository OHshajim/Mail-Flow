"use client";

import Link from "next/link";

import Input from "@/components/input/input";
import "@/app/(authentication)/auth.css";
import { LockIcon, MailIcon, UserIcon } from "@/public/icons";

export default function RegisterPage() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        console.log(data);
    };
    return (
        <div className="container">
            <form className="card" onSubmit={handleSubmit}>
                <div className="font-roboto">
                    <h2>Create Account</h2>
                    <p>Join the next generation of digital workspace.</p>
                </div>
                <div>
                    <label htmlFor="name">FULL NAME</label>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        icon={<UserIcon className="icon"/>}
                    />
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
                    </div>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        icon={<LockIcon className="icon"/>}
                    />
                </div>
                <button className="btn">Sign Up</button>
            </form>
            <div>
                <p className="auth ">
                    {`Already have an account?`}{" "}
                    <Link href="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
