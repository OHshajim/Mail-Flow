import {
    AllMailIcon,
    BillIcon,
    CrossIcon,
    DraftIcon,
    InboxIcon,
    InfoIcon,
    MailIcon,
    QuestionIcon,
    RocketIcon,
    SeildIcon,
    SentIcon,
    StarIcon,
    SubscribeIcon,
    TrashIcon,
    UserIcon,
} from "./icons";

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
        href: "/subscriptions",
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
        href: "/help&suggestions",
    },
];

export const allMails = [
    // ── PRIMARY ──────────────────────────────────────────────
    {
        id: 1,
        from: "Lena Hartman <lena.hartman@acmecorp.com>",
        subject: "Q4 roadmap review – need your input",
        body: "Hi, I've put together the initial Q4 roadmap draft and wanted to run it by you before the leadership review next Thursday. There are a few areas where I'm genuinely torn and your perspective would really help me land on the right call.\n\nThe biggest open question is the API redesign. Engineering estimates it at 6–8 weeks of focused work, but if we start it in Q4 we risk shipping it incomplete before the holidays, which could be worse than just waiting. On the other hand, two enterprise clients have explicitly mentioned it as a blocker for renewal. I've been going back and forth on whether to scope it down to just the auth layer in Q4 and push the rest to Q1, or keep it fully out of scope and compensate with a workaround for those two accounts.\n\nThe second thing I'd love your take on is the mobile push notification work. It's been on the backlog for three quarters now and the customer success team is getting pressure from a handful of SMB clients. It's not complex, maybe two weeks of work, but I'm not sure it moves the needle enough to justify the prioritization given everything else.\n\nI'll drop a Notion link in Slack once I've cleaned up the doc. Can we find 30 minutes this week or early next? Thursday afternoon or Friday morning work best for me.",
        category: "primary",
        read: false,
        date: "9:14 AM",
    },
    {
        id: 2,
        from: "Marcus Webb <m.webb@clientside.io>",
        subject: "Contract renewal – action required by Nov 20",
        body: "Hey, just a heads-up that our current services agreement expires on December 1st. I know we've both been heads-down lately, so I wanted to flag this early rather than let it sneak up on us.\n\nI've attached the updated contract. The vast majority of it is unchanged from last year — same SLA structure, same billing cadence, same support tiers. The one meaningful addition is Clause 7, which covers data residency. Given some of the regulatory changes in the EU this year, our legal team added language requiring that all customer data processed under this agreement remain within designated EU data centers unless explicitly opted out of in writing. If your infrastructure is US-based, we may need a quick call with your compliance person to sort out the opt-out formality.\n\nThere's also a small price adjustment — 4% across the board to reflect CPI, which we discussed briefly at the QBR in September. That brings the annual total to $47,320.\n\nLegal wants countersigned copies back by November 20th to ensure there's no lapse in coverage. DocuSign link is embedded in the attachment. Let me know if anything jumps out or if you'd rather get on a call to walk through it together.",
        category: "primary",
        read: false,
        date: "8:02 AM",
    },
    {
        id: 3,
        from: "Priya Nair <priya@studio-n.design>",
        subject: "Brand refresh assets – all files uploaded",
        body: "Everything is live in the shared drive under /Brand Refresh 2024/Final Deliverables. Here's a quick rundown of what's in there:\n\nLogo Suite: Full-color, monochrome, and reversed variants in SVG, PNG (1x, 2x, 3x), and PDF. The wordmark and icon are separated so engineering can use them independently.\n\nColor Tokens: I've exported a JSON token file compatible with Style Dictionary, plus a Figma variables file. The new primary is #3B5BDB, which replaced the old #4A6CF7. It has much better contrast on both light and dark backgrounds — we're at 5.1:1 on white, which clears WCAG AA.\n\nTypography: We're moving from Inter to Plus Jakarta Sans for headings, keeping Inter for body text. The type scale is documented in the guide with rem values and line-height recommendations for each step.\n\nMotion: I've added a short motion principles doc — nothing prescriptive, just four guiding values (purposeful, quick, subtle, consistent) with a few reference examples.\n\nOne thing to flag: the favicon still needs a pass. The current version gets a bit muddy at 16x16. I'll have a revised version to you by end of week. Everything else is final and ready for handoff.",
        category: "primary",
        read: true,
        date: "Yesterday",
    },
    {
        id: 4,
        from: "James Okafor <james.okafor@devteam.co>",
        subject: "Production deploy scheduled – Friday 11 PM UTC",
        body: "We're planning to push v2.4.1 to production this Friday at 11 PM UTC. Expected deployment window is 45–60 minutes, with a hard rollback threshold of 90 minutes if we see error rates spike above 2%.\n\nHere's what's in the release:\n\n— Payment gateway fix: The intermittent timeout issue affecting Stripe webhooks has been traced to a race condition in the event handler. The fix has been running in staging for 8 days with zero recurrences.\n— Pagination refactor: The old offset-based pagination on the activity feed is replaced with cursor-based. This should fix the duplicate-item bug some users reported and reduce DB load on large accounts by roughly 40%.\n— New onboarding flow: The three-step wizard is live behind a feature flag (ONBOARDING_V2). We'll enable it for 10% of new signups initially and ramp over the following week.\n— Dependency upgrades: Node 18 → 20, Prisma 5.2 → 5.6, and a handful of minor package bumps.\n\nI'll be monitoring the rollout personally and have PagerDuty set up for anything P1. If you notice anything behaving unexpectedly on your end in the hour after deploy, ping me directly on Slack rather than creating a ticket — faster to triage in real time.",
        category: "primary",
        read: false,
        date: "Yesterday",
    },
    {
        id: 5,
        from: "Clara Mendes <c.mendes@finops.org>",
        subject: "Invoice #4471 – payment 8 days overdue",
        body: "I hope you're doing well. I'm reaching out because Invoice #4471 for $3,200 was due on November 5th and we haven't received payment or a response to our previous reminder sent on November 8th.\n\nI understand that things get busy, and I don't want to assume the worst — it's possible this slipped through or landed in the wrong inbox. That said, our accounts receivable process does flag invoices for escalation after 10 business days, so I wanted to give you a heads-up before that happens.\n\nIf the payment has already been initiated, please send me the transaction reference and I'll mark it as pending on our end. If there's an issue with the invoice itself — wrong PO number, incorrect billing address, anything like that — let me know and I'll get a corrected version out to you same day.\n\nIf there's a cash flow concern on your end, I'm happy to discuss a brief extension or a payment plan. We'd rather work something out than let this become a problem for either side. You can reach me directly at +1 (415) 203-9871 or just reply here.",
        category: "primary",
        read: true,
        date: "Nov 13",
    },
    {
        id: 6,
        from: "Yuki Tanaka <yuki.t@research.lab>",
        subject: "Whitepaper co-authorship proposal",
        body: "I hope this finds you well. I've been following your work on inference benchmarking — particularly the latency comparisons you published in September — and I think there's a really compelling paper in the overlap between your empirical approach and the theoretical framing I've been developing.\n\nI'm putting together a whitepaper tentatively titled 'Edge Inference Latency Under Real-World Constraints: A Unified Framework' targeting IEEE Spectrum. The angle is to bridge the gap between lab benchmarks (which tend to optimize for ideal conditions) and the messier reality of edge deployments with variable connectivity, thermal throttling, and mixed-precision workloads.\n\nMy contribution would be the theoretical model and the related work survey. What I'm hoping you'd bring is the empirical data and methodology — your benchmark suite is exactly the kind of grounding the paper needs to be credible to practitioners, not just researchers.\n\nExpected length is around 4,500 words. I'd want to submit before the January 15th deadline for the March issue. If we split the writing roughly 60/40, I'd estimate 8–10 hours of your time total, spread over 6 weeks.\n\nNo pressure at all if your plate is full — but if you're even 60% interested, I'd love to jump on a call and talk through whether this feels like a good fit.",
        category: "primary",
        read: false,
        date: "Nov 11",
    },

    // ── SOCIAL ───────────────────────────────────────────────
    {
        id: 7,
        from: "LinkedIn <messaging-noreply@linkedin.com>",
        subject: "Sofia Reyes sent you a message",
        body: "Hi! I came across your profile while researching people working at the intersection of distributed systems and developer tooling, and your post on consistency models in event-driven architectures genuinely stopped my scroll — that was one of the clearest explanations of eventual consistency I've read outside of a textbook.\n\nI'm a staff engineer at Meridian (Series B, 120 people, infrastructure tooling space) and we're grappling with a lot of the same tradeoffs you wrote about. We recently migrated a core service from a request/response pattern to an event-driven model and the operational complexity has been... humbling. Your point about making failure modes explicit rather than hiding them behind retries really resonated.\n\nI'd love to connect and potentially swap notes — no agenda beyond genuine curiosity. If you ever write more on this topic or do any speaking, I'd be first in line to read/attend. Either way, keep writing — it's genuinely useful.",
        category: "social",
        read: false,
        date: "11:45 AM",
    },
    {
        id: 8,
        from: "GitHub <noreply@github.com>",
        subject: "3 new comments on PR #284 – auth middleware refactor",
        body: "@rkowalski: 'Nice refactor overall — the separation of concerns is much cleaner. One suggestion: could we extract the token validation logic into its own middleware function? Right now it's inlined in three places and if the signing algorithm ever changes we'd have to update all three. A shared validateToken(req, res, next) would make it easier to test in isolation too.'\n\n@m_chen: 'Agreed with Roman. Also, line 147 — you're calling jwt.verify() synchronously inside an async function without awaiting it. It won't cause a bug here because verify() is synchronous, but it's a bit misleading to read. Minor nit.'\n\n@rkowalski: 'One more thing — the error messages on lines 203 and 218 are leaking internal detail (\"JWT malformed\" and \"Invalid signature\"). Might want to normalize those to a generic 401 message before this goes to prod. Security review would flag it otherwise.'\n\nYou have 2 unresolved review threads. The PR is currently approved with comments — address the feedback and re-request review when ready.",
        category: "social",
        read: false,
        date: "10:57 AM",
    },
    {
        id: 9,
        from: "Reddit <noreply@reddit.com>",
        subject: "Your post is trending in r/webdev – 1.4k upvotes",
        body: "Your post 'Why I migrated from REST to tRPC after 3 years — and what I actually learned' is trending in r/webdev with 1,412 upvotes and 118 comments.\n\nTop comments so far:\n\nu/devbyte99: 'The part about end-to-end type safety reducing the feedback loop between frontend and backend is exactly what sold me too. No more \"wait, what does this endpoint return?\" conversations.'\n\nu/nullpointer_ex: 'Counterpoint: tRPC is great until you need to expose your API to a third party or build a mobile client that isn't React Native. REST/OpenAPI still wins for anything that needs to be consumed outside your monorepo.'\n\nu/async_await_sleep: 'Honest question — how do you handle versioning? That's the one thing that's kept me from adopting it at work. We have 4 mobile app versions in the wild at any given time.'\n\nYour post has also been crossposted to r/typescript and r/node. Check out the full discussion.",
        category: "social",
        read: true,
        date: "Yesterday",
    },
    {
        id: 10,
        from: "Substack <no-reply@substack.com>",
        subject:
            "New from Lenny's Newsletter: 'The 5 traits that separate great PMs'",
        body: "This week Lenny Rachitsky breaks down what he's observed across hundreds of PM interviews and references from founders at Figma, Notion, Stripe, and Linear.\n\nThe five traits he identifies are: (1) Decision velocity — the ability to make a good-enough call with incomplete information rather than stalling for certainty that never comes; (2) Stakeholder trust — not just managing up, but making engineering and design feel like genuine partners rather than execution resources; (3) Ruthless prioritization — being willing to say no to good ideas in service of great ones, and making that call transparently; (4) User proximity — maintaining a direct line to actual users rather than relying entirely on data and intermediaries; and (5) Written clarity — the ability to turn ambiguity into a crisp document that aligns a room.\n\nThe piece is particularly sharp on decision velocity. Lenny argues that most underperforming PMs aren't bad at analysis — they're bad at committing. The cost of a reversible wrong decision is almost always lower than the cost of prolonged indecision, and great PMs have internalized that asymmetry.\n\nFull post is behind the paywall for paid subscribers. Free summary available at the link.",
        category: "social",
        read: false,
        date: "Nov 13",
    },

    // ── PROMOTIONS ───────────────────────────────────────────
    {
        id: 11,
        from: "Figma <hello@figma.com>",
        subject: "Introducing Figma AI – now in beta for Pro and Org",
        body: "Design just got a lot faster. Figma AI is rolling out to all Professional and Organization plans, and we want you to be among the first to try it.\n\nHere's what's available in the beta:\n\nGenerate UI from a prompt: Describe a screen and Figma AI will produce a working layout using your existing component library. It respects your design system — so the output uses your actual button styles, color tokens, and spacing scale, not generic placeholders.\n\nAuto-rename layers: Click one button and Figma AI will rename every layer in your file based on what it actually contains. No more 'Group 47' or 'Rectangle 12'.\n\nDesign suggestions: Select any frame and get AI-generated alternatives — different layouts, spacing adjustments, or component swaps — that you can one-click apply or dismiss.\n\nRemove background: Built directly into the image tools. Select an image, click 'Remove background', done.\n\nWe've thought carefully about the ethics here. Figma AI is trained on a dataset that does not include community files without explicit consent. You can read our full AI transparency note at figma.com/ai-transparency.\n\nJoin the beta from the Help menu inside Figma → 'Beta features' → 'Figma AI'. We'd love your feedback.",
        category: "promotions",
        read: false,
        date: "8:30 AM",
    },
    {
        id: 12,
        from: "Vercel <team@vercel.com>",
        subject: "Your Pro plan renews in 3 days – and a Team upgrade offer",
        body: "Just a quick heads-up: your Vercel Pro subscription renews on November 18th and your card on file will be charged $20. No action needed if everything looks good.\n\nA couple of things worth knowing before renewal:\n\nNew in Pro since your last renewal: Edge Middleware is now included at no extra cost (previously add-on), build concurrency has increased from 12 to 20 parallel builds, and we've added DDoS mitigation at the edge for all Pro deployments.\n\nConsidering a team? If you're working with collaborators, the Team plan gives you per-member access controls, audit logs, SAML SSO, and advanced spend controls. If you upgrade before your renewal date, we'll credit the remaining days of your Pro plan and give you the first 3 months of Team at the Pro price. After that it's $50/month for up to 5 members.\n\nYour current usage this billing period: 94,000 edge function invocations (limit: 500,000), 38 GB bandwidth (limit: 1 TB), 180 build minutes (limit: 6,000). You're well within limits.\n\nQuestions? Reply to this email or chat with us at vercel.com/support.",
        category: "promotions",
        read: true,
        date: "Yesterday",
    },
    {
        id: 13,
        from: "Framer <hey@framer.com>",
        subject: "Black Friday: 40% off – biggest sale of the year",
        body: "Our Black Friday sale is live. Get 40% off Framer Mini, Basic, and Pro — no catches, no usage restrictions, just 40% off for as long as you're subscribed.\n\nUse code BLACKFRI40 at checkout. Offer ends November 30th at midnight PST.\n\nWhat's new since you last checked:\n\nFramer AI: Generate a full multi-page site from a text description. It's not a rough draft you have to redo — it's actually production-ready, responsive, and CMS-connected out of the box.\n\nLocalization: Publish your site in multiple languages with auto-translation and a built-in translation management UI. No third-party integrations required.\n\nAnalytics: Native analytics dashboard inside Framer. See page views, bounce rate, session duration, and top referrers without adding a script tag.\n\nFramer now hosts over 200,000 live sites. If you've been on the fence, this is the lowest price we've offered since launch. The Pro plan at 40% off works out to $9/month — less than most domain registrations.\n\nStart your free trial or apply the code at checkout: framer.com/pricing.",
        category: "promotions",
        read: false,
        date: "Nov 13",
    },
    {
        id: 14,
        from: "AWS <aws-marketing@amazon.com>",
        subject: "You have $150 in credits expiring December 31st",
        body: "Your AWS account has $150.00 in promotional credits that expire on December 31st, 2024. Based on your current usage patterns, you're unlikely to consume them before the deadline.\n\nHere are a few ways to put them to work before they expire:\n\nExperiment with Bedrock: Your credits cover Amazon Bedrock API calls. If you've been curious about integrating foundation models into your app, this is a zero-cost way to prototype. Claude, Llama 2, Stable Diffusion, and Titan are all available.\n\nTry Aurora Serverless v2: Spin up a serverless Postgres-compatible database that scales to zero when idle. Good fit for staging environments or low-traffic side projects. Your credits cover roughly 200 hours of 0.5 ACU compute.\n\nLoad test with EC2: Spin up a temporary fleet of t3.medium instances for load testing. $150 covers approximately 300 instance-hours, enough for a serious stress test.\n\nRun a data pipeline: Use Glue + S3 + Athena to analyze a dataset you've been sitting on. The serverless billing model means credits go a long way for batch workloads.\n\nTo check your credit balance and eligible services, go to AWS Console → Billing → Credits. Credits apply automatically — no code needed.",
        category: "promotions",
        read: true,
        date: "Nov 11",
    },
    {
        id: 15,
        from: "Raycast <hello@raycast.com>",
        subject: "Raycast Pro is here – AI, sync, and more",
        body: "Raycast Pro is officially out of beta and available to everyone. Here's everything that's included and why we think it's worth it.\n\nAI Commands: Ask anything from the command bar. Summarize a webpage, rewrite a Slack message in a different tone, generate a regex, explain a stack trace, convert a JSON blob to TypeScript types. The AI is context-aware — it knows what's on your screen and what you've copied.\n\nCloud Sync: Your extensions, hotkeys, snippets, and preferences sync instantly across all your Macs. If you work across a personal and work machine, this alone saves a meaningful amount of setup time every time you reinstall or get a new computer.\n\nCustom Themes: 40+ themes available in the store, or build your own with the theme editor. Dark mode, light mode, high contrast, and seasonal variants.\n\nUnlimited Snippets: The free plan caps snippets at 25. Pro removes the limit. If you use text expansion heavily, you'll hit the free cap quickly.\n\nTeam Sharing: Share extensions, snippets, and scripts with your team. One person builds it, everyone benefits. Particularly useful for engineering teams with custom internal tooling.\n\nPro is $8/month or $96/year, with a 14-day free trial and no credit card required to start. We've also kept the free tier genuinely useful — this isn't a bait and switch. But if you live in Raycast, Pro is worth it.",
        category: "promotions",
        read: false,
        date: "Nov 10",
    },
];

export const faqs = [
     {
         question: "How do I reset my master password?",
         answer: "To reset your master password, navigate to Account Settings > Security > Reset Password. You will need to confirm your identity via your registered mobile device or recovery email.",
     },
     {
         question: "What should I do if I'm not receiving emails?",
         answer: "First, check your spam folder. Then verify your filters and forwarding settings. If the issue persists, try removing and re-adding your email account or contact our support team.",
     },
     {
         question: "Can I use my own custom domain?",
         answer: "Yes, custom domains are supported on our Professional and Enterprise plans. You can add and verify your domain from the Workspace Settings > Domains section.",
     },
     {
         question: "How do I upgrade my current plan?",
         answer: 'Go to Billing & Subscription in your account settings, click "Upgrade Plan", and choose your desired plan. Changes take effect immediately and are prorated.',
     },
     {
         question: "How secure is my data on AuraMail?",
         answer: "AuraMail uses end-to-end encryption (E2EE) for all emails and attachments. We also comply with GDPR and CCPA regulations, and all data is stored in encrypted form.",
     },
 ];

export const supportCategories = [
    {
        title: "Getting Started",
        icon: <RocketIcon size={20} />,
        categories: [
            "Setup your first workspace",
            "Importing your contacts",
            "Customizing your interface",
        ],
    },
    {
        title: "Account & Workspace",
        icon: <UserIcon size={20} />,
        categories: [
            "Profile visibility",
            "Linking third-party accounts",
            "Two-factor authentication",
        ],
    },
    {
        title: "Email Features",
        icon: <MailIcon size={20} />,
        categories: [
            "Smart Categorization",
            "Scheduled sending",
            "Email templates",
            "Customizing your interface",
            "Recovering deleted emails",
        ],
    },
    {
        title: "Billing & Subscription",
        icon: <BillIcon size={20} />,
        categories: [
            "Managing your subscription",
            "Downloading invoices",
            "Payment methods",
            "Upgrading your plan",
            "Subscription cancellation",
        ],
    },
    {
        title: "Troubleshooting",
        icon: <CrossIcon size={20} />,
        categories: [
            "Syncing problems",
            "Downloading invoices",
            "App connectivity issues",
        ],
    },
    {
        title: "Security & Troubleshooting",
        icon: <SeildIcon size={20} />,
        categories: [
            "Data Encryption (E2EE)",
            "Spam & Phishing protection",
            "Report suspicious activity",
        ],
    },
];


// For subscription page 
export const plans = [
    {
        name: "Beginner",
        description:
            "Perfect for individuals getting started with email management.",
        priceMonthly: 0,
        priceYearly: 0,
        isFree: true,
        buttonText: "Get Started",
        badge: null,
        features: [
            "Access to inbox and basic email tools",
            "Send & receive emails",
            "Basic spam protection",
            "Custom email signatures",
            "5GB secure cloud storage",
        ],
    },
    {
        name: "Intermediate",
        description:
            "Ideal for professionals who need more control and productivity tools.",
        priceMonthly: 299,
        priceYearly: 2870,
        isFree: false,
        buttonText: "Upgrade Now",
        badge: "Most Popular",
        features: [
            "Everything in Intermediate",
            "50GB cloud storage",
            "Dedicated account manager",
            "Advanced team collaboration",
            "Custom security policies",
            "24/7 phone support",
            "SLA guarantee",
        ],
    },
    {
        name: "Top Plan",
        description:
            "Best for teams and power users who need advanced collaboration.",
        priceMonthly: 799,
        priceYearly: 7670,
        isFree: false,
        buttonText: "Go Premium",
        badge: "Top Plan",
        features: [
            "Everything in Beginner",
            "Unlimited storage",
            "AI-powered email suggestions",
            "Advanced spam & security filters",
            "Email scheduling & snooze",
            "Priority customer support",
            "Team collaboration tools",
            "Advanced analytics & insights",
        ],
    },
];