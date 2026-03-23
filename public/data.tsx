import { AllMailIcon, DraftIcon, InboxIcon, InfoIcon, QuestionIcon, SentIcon, StarIcon, SubscribeIcon, TrashIcon } from "./icons";

export const navGroups = [
    {
        icon: <InboxIcon className="sb-item-icon" />,
        label: "Inbox",
        href: "/inbox",
        active: true,
    },
    {
        icon: <StarIcon className="sb-item-icon" />,
        label: "Starred",
        href: "/starred",
    },
    {
        icon: <SentIcon className="sb-item-icon" />,
        label: "Sent",
        href: "/send",
    },
    {
        icon: <DraftIcon className="sb-item-icon" />,
        label: "Drafts",
        href: "/draftMail",
    },
    {
        icon: <SubscribeIcon className="sb-item-icon" />,
        label: "Subscriptions",
        href: "/subscribe",
    },
    {
        icon: <TrashIcon className="sb-item-icon" size={20} />,
        label: "Bin",
        href: "/bin",
    },
    {
        icon: <InfoIcon className="sb-item-icon" />,
        label: "Spam",
        href: "/spam",
    },
    {
        icon: <AllMailIcon className="sb-item-icon" />,
        label: "All Mail",
        href: "/allMail",
    },
    {
        icon: <QuestionIcon className="sb-item-icon" />,
        label: "Help & Suggestions",
        href: "/help",
    },
];