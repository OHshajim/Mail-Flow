import React from "react";
import "@/components/input/input.css";
interface InputFieldProps {
    type?: string;
    placeholder: string;
    icon: React.ReactNode;
}

export default function Input({
    type = "text",
    placeholder,
    icon,
}: InputFieldProps) {
    return (
        <div className="inputWrapper">
            {icon}
            <input type={type} placeholder={placeholder} />
        </div>
    );
}
