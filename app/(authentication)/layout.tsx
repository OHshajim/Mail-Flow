import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
    title: "Mail Flow || Authentication",
    description: "Authentication",
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="container">
            {children}
        </div>
    );
}
