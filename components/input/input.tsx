import React from "react";
import "@/components/input/input.css";
interface InputFieldProps {
    type?: string;
    name: string;
    placeholder: string;
    icon: React.ReactNode;
}

export default function Input({
    type = "text",
    name,
    placeholder,
    icon,
}: InputFieldProps) {
    return (
        <div className="inputWrapper">
            {icon}
            <input type={type} name={name} placeholder={placeholder} />
        </div>
    );
}
