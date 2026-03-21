"use client";

import "./popup.css";

type PopupType = "success" | "error" | "warning" | "info";

interface PopupProps {
    type?: PopupType;
    message: string;
    onClose?: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
}

export function Popup({
    type = "success",
    message,
    onClose,
    onConfirm,
    confirmText = "OK",
    cancelText = "Cancel",
}: PopupProps) {
    return (
        <div className="popupOverlay">
            <div className={`popup ${type}`}>
                <h3 className="font-roboto">
                    {type === "success" && "✅ Success"}
                    {type === "error" && "❌ Error"}
                    {type === "warning" && "⚠️ Warning"}
                    {type === "info" && "ℹ️ Info"}
                </h3>

                <p className="font-roboto">{message}</p>

                <div className="popupActions">
                    {onClose && (
                        <button className="btn cancel" onClick={onClose}>
                            {cancelText}
                        </button>
                    )}

                    {onConfirm && (
                        <button className="btn confirm" onClick={onConfirm}>
                            {confirmText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
