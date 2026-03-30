"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import "./compose.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AttachedFile {
    id: string;
    name: string;
    size: number;
}

interface ComposeData {
    to: string;
    cc: string;
    bcc: string;
    subject: string;
    body: string;
    attachments: AttachedFile[];
}

interface Props {
    onClose: () => void;
    onSaveDraft?: (data: ComposeData) => void;
    onSend?: (data: ComposeData) => void;
    defaultTo?: string;
    defaultSubject?: string;
}

type ViewMode = "default" | "full";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const IC = {
    Close: () => (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
                d="M1 1l9 9M10 1L1 10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    ),
    Draft: () => (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
                d="M2.5 6.5h8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    ),
    ExpandFull: () => (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
                d="M1 4.5V1h3.5M8.5 1H12v3.5M12 8.5V12H8.5M4.5 12H1V8.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    ZoomOut: () => (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
                d="M4.5 1H1v3.5M12 4.5V1H8.5M8.5 12H12V8.5M1 8.5V12h3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    Send: () => (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
                d="M12.5 7L1 2l2.5 5L1 12l11.5-5z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.5 7h5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    ),
    Attach: () => (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
                d="M12 6.5l-5 5a3.5 3.5 0 01-5-5l5.5-5.5a2 2 0 013 3L5 9.5A1 1 0 013.5 8L8 3.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    Image: () => (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect
                x="1"
                y="2"
                width="12"
                height="10"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.4"
            />
            <circle
                cx="4.5"
                cy="5.5"
                r="1"
                stroke="currentColor"
                strokeWidth="1.2"
            />
            <path
                d="M1 10l3.5-3 2 2 2-2 3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    Link: () => (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
                d="M5.5 8.5a3 3 0 004.2.2l1.8-1.8a3 3 0 00-4.3-4.2L5.8 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
            />
            <path
                d="M8.5 5.5a3 3 0 00-4.2-.2L2.5 7.1a3 3 0 004.3 4.2L8.2 10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
            />
        </svg>
    ),
    Trash: () => (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
                d="M2 3.5h10M4.5 3.5V2.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v1M5.5 6.5v4M8.5 6.5v4M3 3.5l.7 7.7a1 1 0 001 .8h4.6a1 1 0 001-.8L11 3.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    Undo: () => (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
                d="M2 4.5H7a3.5 3.5 0 010 7H4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2 4.5l2-2M2 4.5l2 2"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
            />
        </svg>
    ),
    Redo: () => (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
                d="M11 4.5H6a3.5 3.5 0 000 7h3"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11 4.5l-2-2M11 4.5l-2 2"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
            />
        </svg>
    ),
};

// ─── Toolbar ──────────────────────────────────────────────────────────────────

const TOOLBAR_GROUPS = [
    [
        { cmd: "bold", label: "B", title: "Bold", style: { fontWeight: 700 } },
        {
            cmd: "italic",
            label: "I",
            title: "Italic",
            style: { fontStyle: "italic" as const },
        },
        {
            cmd: "underline",
            label: "U",
            title: "Underline",
            style: { textDecoration: "underline" },
        },
        {
            cmd: "strikeThrough",
            label: "S",
            title: "Strikethrough",
            style: { textDecoration: "line-through" },
        },
    ],
    [
        {
            cmd: "insertOrderedList",
            label: "OL",
            title: "Ordered list",
            style: {},
        },
        {
            cmd: "insertUnorderedList",
            label: "UL",
            title: "Unordered list",
            style: {},
        },
    ],
    [
        { cmd: "justifyLeft", label: "L", title: "Align left", style: {} },
        { cmd: "justifyCenter", label: "C", title: "Center", style: {} },
        { cmd: "justifyRight", label: "R", title: "Align right", style: {} },
    ],
    [
        { cmd: "indent", label: "→", title: "Indent", style: {} },
        { cmd: "outdent", label: "←", title: "Outdent", style: {} },
        {
            cmd: "insertHorizontalRule",
            label: "—",
            title: "Horizontal rule",
            style: {},
        },
        { cmd: "removeFormat", label: "Tx", title: "Clear format", style: {} },
    ],
] as const;

const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "28px"];
const FORMAT_CMDS = [
    "bold",
    "italic",
    "underline",
    "strikeThrough",
    "insertOrderedList",
    "insertUnorderedList",
] as const;

function fmtBytes(b: number) {
    if (b < 1024) return `${b} B`;
    if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
    return `${(b / 1048576).toFixed(1)} MB`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ComposeEmail({
    onClose,
    onSaveDraft,
    onSend,
    defaultTo = "",
    defaultSubject = "",
}: Props) {
    const [to, setTo] = useState(defaultTo);
    const [cc, setCc] = useState("");
    const [bcc, setBcc] = useState("");
    const [subject, setSubject] = useState(defaultSubject);
    const [showCc, setShowCc] = useState(false);
    const [showBcc, setShowBcc] = useState(false);
    const [files, setFiles] = useState<AttachedFile[]>([]);
    const [fontSize, setFontSize] = useState("14px");
    const [linkUrl, setLinkUrl] = useState("");
    const [showLink, setShowLink] = useState(false);
    const [formats, setFormats] = useState<Set<string>>(new Set());
    const [view, setView] = useState<ViewMode>("default");
    const [sending, setSending] = useState(false);

    const editorRef = useRef<HTMLDivElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (showLink) linkRef.current?.focus();
    }, [showLink]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSend();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [to, sending]);

    // ── Editor ──────────────────────────────────────────────────────────────

    const exec = useCallback((cmd: string, value?: string) => {
        editorRef.current?.focus();
        document.execCommand(cmd, false, value);
        syncFormats();
    }, []);

    const syncFormats = () => {
        const next = new Set<string>();
        FORMAT_CMDS.forEach((c) => {
            if (document.queryCommandState(c)) next.add(c);
        });
        setFormats(next);
    };

    const applySize = (size: string) => {
        setFontSize(size);
        editorRef.current?.focus();
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || !sel.rangeCount) return;
        const span = document.createElement("span");
        span.style.fontSize = size;
        try {
            sel.getRangeAt(0).surroundContents(span);
        } catch {}
    };

    const insertLink = () => {
        if (!linkUrl.trim()) return;
        exec(
            "createLink",
            linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`,
        );
        setLinkUrl("");
        setShowLink(false);
    };

    // ── Files ────────────────────────────────────────────────────────────────

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const added = Array.from(e.target.files ?? []).map((f) => ({
            id: Math.random().toString(36).slice(2),
            name: f.name,
            size: f.size,
        }));
        setFiles((p) => [...p, ...added]);
        e.target.value = "";
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) =>
            exec("insertImage", ev.target?.result as string);
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    // ── Actions ──────────────────────────────────────────────────────────────

    const getDraft = (): ComposeData => ({
        to,
        cc,
        bcc,
        subject,
        body: editorRef.current?.innerHTML ?? "",
        attachments: files,
    });

    const handleSaveDraft = () => {
        onSaveDraft?.(getDraft());
        onClose();
    };

    const handleSend = async () => {
        if (!to.trim() || sending) return;
        setSending(true);
        await new Promise((r) => setTimeout(r, 900));
        onSend?.(getDraft());
        setSending(false);
        onClose();
    };

    const isFull = view === "full";

    return (
        <div
            className="cm-backdrop"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className={`cm${isFull ? " cm--full" : ""}`}
                role="dialog"
                aria-label="Compose email"
            >
                {/* ── Title bar ── */}
                <div className="cm-bar">
                    <span className="cm-bar-title">New Message</span>

                    <div className="cm-bar-btns">
                        {/* Save to draft  ─  minus / dash icon */}
                        <button
                            className="cm-bar-btn"
                            onClick={handleSaveDraft}
                            title="Save draft"
                        >
                            <IC.Draft />
                        </button>

                        {/* Expand full ↔ Zoom out */}
                        <button
                            className="cm-bar-btn"
                            onClick={() =>
                                setView((v) =>
                                    v === "default" ? "full" : "default",
                                )
                            }
                            title={isFull ? "Restore size" : "Expand"}
                        >
                            {isFull ? <IC.ZoomOut /> : <IC.ExpandFull />}
                        </button>

                        {/* Close */}
                        <button
                            className="cm-bar-btn cm-bar-btn--close"
                            onClick={onClose}
                            title="Close"
                        >
                            <IC.Close />
                        </button>
                    </div>
                </div>

                {/* ── Fields ── */}
                <div className="cm-fields">
                    <div className="cm-field">
                        <label className="cm-label">To</label>
                        <input
                            className="cm-input"
                            type="email"
                            placeholder="recipient@example.com"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            autoFocus
                        />
                        <div className="cm-field-toggles">
                            {!showCc && (
                                <button
                                    className="cm-toggle"
                                    onClick={() => setShowCc(true)}
                                >
                                    Cc
                                </button>
                            )}
                            {!showBcc && (
                                <button
                                    className="cm-toggle"
                                    onClick={() => setShowBcc(true)}
                                >
                                    Bcc
                                </button>
                            )}
                        </div>
                    </div>

                    {showCc && (
                        <div className="cm-field">
                            <label className="cm-label">Cc</label>
                            <input
                                className="cm-input"
                                type="email"
                                placeholder="cc@example.com"
                                value={cc}
                                onChange={(e) => setCc(e.target.value)}
                            />
                            <button
                                className="cm-toggle cm-toggle--x"
                                onClick={() => {
                                    setShowCc(false);
                                    setCc("");
                                }}
                            >
                                <IC.Close />
                            </button>
                        </div>
                    )}

                    {showBcc && (
                        <div className="cm-field">
                            <label className="cm-label">Bcc</label>
                            <input
                                className="cm-input"
                                type="email"
                                placeholder="bcc@example.com"
                                value={bcc}
                                onChange={(e) => setBcc(e.target.value)}
                            />
                            <button
                                className="cm-toggle cm-toggle--x"
                                onClick={() => {
                                    setShowBcc(false);
                                    setBcc("");
                                }}
                            >
                                <IC.Close />
                            </button>
                        </div>
                    )}

                    <div className="cm-field">
                        <label className="cm-label">Subject</label>
                        <input
                            className="cm-input"
                            type="text"
                            placeholder="Add a subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                </div>

                {/* ── Toolbar ── */}
                <div className="cm-toolbar">
                    <select
                        className="cm-select"
                        value={fontSize}
                        onChange={(e) => applySize(e.target.value)}
                        title="Font size"
                    >
                        {FONT_SIZES.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>

                    <div className="cm-divider" />

                    {TOOLBAR_GROUPS.map((group, gi) => (
                        <div key={gi} className="cm-tbgroup">
                            {group.map(({ cmd, label, title, style }) => (
                                <button
                                    key={cmd}
                                    className={`cm-tool${formats.has(cmd) ? " cm-tool--on" : ""}`}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        exec(cmd);
                                    }}
                                    title={title}
                                    style={style}
                                >
                                    {label}
                                </button>
                            ))}
                            {gi < TOOLBAR_GROUPS.length - 1 && (
                                <div className="cm-divider" />
                            )}
                        </div>
                    ))}

                    <div className="cm-divider" />

                    {/* Link */}
                    <div className="cm-link-wrap">
                        <button
                            className={`cm-tool${showLink ? " cm-tool--on" : ""}`}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                setShowLink((p) => !p);
                            }}
                            title="Insert link"
                        >
                            <IC.Link />
                        </button>
                        {showLink && (
                            <div className="cm-link-popup">
                                <input
                                    ref={linkRef}
                                    className="cm-link-input"
                                    type="url"
                                    placeholder="https://example.com"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && insertLink()
                                    }
                                />
                                <button
                                    className="cm-link-ok"
                                    onClick={insertLink}
                                >
                                    Insert
                                </button>
                                <button
                                    className="cm-link-x"
                                    onClick={() => setShowLink(false)}
                                >
                                    <IC.Close />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Inline image */}
                    <button
                        className="cm-tool"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            imgRef.current?.click();
                        }}
                        title="Insert image"
                    >
                        <IC.Image />
                    </button>
                    <input
                        ref={imgRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />

                    <div className="cm-divider" />

                    <button
                        className="cm-tool"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            exec("undo");
                        }}
                        title="Undo"
                    >
                        <IC.Undo />
                    </button>
                    <button
                        className="cm-tool"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            exec("redo");
                        }}
                        title="Redo"
                    >
                        <IC.Redo />
                    </button>
                </div>

                {/* ── Editor ── */}
                <div
                    ref={editorRef}
                    className="cm-editor"
                    contentEditable
                    suppressContentEditableWarning
                    onInput={syncFormats}
                    onKeyUp={syncFormats}
                    onMouseUp={syncFormats}
                    data-placeholder="Write your message..."
                    style={{ fontSize }}
                />

                {/* ── Attachment chips ── */}
                {files.length > 0 && (
                    <div className="cm-chips">
                        {files.map((f) => (
                            <div key={f.id} className="cm-chip">
                                <IC.Attach />
                                <span className="cm-chip-name">{f.name}</span>
                                <span className="cm-chip-size">
                                    {fmtBytes(f.size)}
                                </span>
                                <button
                                    className="cm-chip-x"
                                    onClick={() =>
                                        setFiles((p) =>
                                            p.filter((x) => x.id !== f.id),
                                        )
                                    }
                                >
                                    <IC.Close />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Footer ── */}
                <div className="cm-footer">
                    <div className="cm-footer-left">

                        <button
                            className="cm-foot-btn"
                            onClick={() => fileRef.current?.click()}
                            title="Attach file"
                        >
                            <IC.Attach />
                        </button>
                        <input
                            ref={fileRef}
                            type="file"
                            multiple
                            hidden
                            onChange={handleFileChange}
                        />
                    </div>
                    <div style={{display:"flex", gap:"12px"}}>
                        <button
                            className={`cm-send${sending ? " cm-send--busy" : ""}`}
                            onClick={handleSend}
                            disabled={sending || !to.trim()}
                        >
                            {sending ? (
                                <span className="cm-spinner" />
                            ) : (
                                <>
                                    <IC.Send />
                                    <span>Send</span>
                                </>
                            )}
                        </button>
                        <button
                            className={`cm-send${sending ? " cm-send--busy" : ""}`}
                            onClick={handleSend}
                            disabled={sending || !to.trim()}
                        >
                            {sending ? (
                                <span className="cm-spinner" />
                            ) : (
                                <>
                                    <IC.Send />
                                    <span>Save Draft</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
