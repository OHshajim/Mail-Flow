"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import "./compose.css";
import { BlockIcon, CancelIcon, DraftIcon, ExpandIcon, FileIcon, LinkedIcon, ListIcon, NumericListIcon, SentIcon, SkipIcon } from "@/public/icons";

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
            label: <NumericListIcon/>,
            title: "Ordered list",
            style: {},
        },
        {
            cmd: "insertUnorderedList",
            label: <ListIcon/>,
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
    const syncFormats = () => {
        const next = new Set<string>();
        FORMAT_CMDS.forEach((c) => {
            if (document.queryCommandState(c)) next.add(c);
        });
        setFormats(next);
    };

    const exec = useCallback((cmd: string, value?: string) => {
        editorRef.current?.focus();
        document.execCommand(cmd, false, value);
        syncFormats();
    }, []);


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
                        {/* Save to draft  */}
                        <button
                            className="cm-bar-btn"
                            onClick={handleSaveDraft}
                            title="Save draft"
                        >
                            <SkipIcon size={16}/>
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
                            {isFull ? <BlockIcon size={16}/> : <ExpandIcon size={16}/>}
                        </button>

                        {/* Close */}
                        <button
                            className="cm-bar-btn cm-bar-btn--close"
                            onClick={onClose}
                            title="Close"
                        >
                            <CancelIcon />
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
                                <CancelIcon />
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
                                <CancelIcon />
                            </button>
                        </div>
                    )}

                    <div className="cm-field">
                        <input
                            className="cm-input"
                            type="text"
                            placeholder="Subject"
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
                            <LinkedIcon size={16}/>
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
                                    <CancelIcon />
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
                                <FileIcon />
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
                                    <CancelIcon />
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
                            <FileIcon />
                        </button>
                        <input
                            ref={fileRef}
                            type="file"
                            multiple
                            hidden
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="cm-btn-container">
                        <button
                            className={`btn cm-draft`}
                            onClick={handleSaveDraft}
                        >
                            
                            <DraftIcon />
                            <span>Save Draft</span>
                        </button>
                        <button
                            className={`btn cm-send${sending ? " cm-send--busy" : ""}`}
                            onClick={handleSend}
                            disabled={sending || !to.trim()}
                        >
                            {sending ? (
                                <span className="cm-spinner" />
                            ) : (
                                <>
                                    <SentIcon />
                                    <span>Send</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
