import { CaseStudyData } from '../components/CaseStudyOverlay';

export const CASE_STUDIES: Record<string, CaseStudyData> = {
  ds: {
    id: 'ds',
    title: 'AgentPay: Bounded AI Agent Payments in RLUSD',
    tag: 'Agentic AI · Web3',
    summary:
      'An AI agent pays a verified merchant in RLUSD with a signed EIP-712 voucher and can never spend past the limit its principal funded.',
    stats: [
      { num: '8-Step', label: 'AgentPay.redeem() Verification' },
      { num: 'EIP-712', label: 'Real In-Browser Voucher Signing' },
      { num: '7', label: 'Interactive Attack & Spend Scenes' },
    ],
    problem:
      'Giving autonomous agents direct wallet custody or uncapped payment credentials exposes principals to runaway execution loops, prompt-injected purchases, and replay or tampering exploits.',
    solution:
      'Separated signing authority from funded escrow: the agent holds only a signing key with zero funds, while principal-enforced budgets, per-payment caps, KYA verification, nonces, and a kill switch govern settlement.',
    decisions: [
      'Used real ethers v6 EIP-712 typed-data signing and signature recovery directly in the browser.',
      'Enforced all 8 contract validation gates in exact AgentPay.redeem() order even when Rogue Mode bypasses agent-side checks.',
      'Built a control-room UI with spend-limit meter, live voucher inspector, check-by-check verdict, and settlement ledger.',
    ],
    outcomes: [
      'Demonstrates tamper-proof bounded agent commerce with 7 one-click adversarial and budget test scenes.',
      'Zero funds move when vouchers are replayed, tampered, over-cap, unverified, or paused via kill switch.',
    ],
    embedUrl: './assets/aistudio/AgentPay_Live_Demo_9f2d1a96.html',
    externalUrl: './assets/aistudio/AgentPay_Live_Demo_9f2d1a96.html',
    embedLabel: 'Interactive Live App',
  },
  plugin: {
    id: 'plugin',
    title: 'learnOS — Free CS Courses',
    tag: 'EdTech · OS UI',
    summary: 'World-class university CS video courses (MIT OCW, UC Berkeley, IIT) organized into a fast, searchable dark-mode learning OS.',
    stats: [
      { num: '100%', label: 'Free Open University Curriculum' },
      { num: '0ms', label: 'Instant Client-Side Course Search' },
      { num: 'OS UI', label: 'Distraction-Free Track Workspace' },
    ],
    problem:
      'Top computer science lectures from MIT, Berkeley, and IITs are scattered across long, unsearchable GitHub Markdown lists that overwhelm self-taught learners.',
    solution:
      'Designed and built learnOS, transforming curated cs-video-courses into an OS-style dark workspace with instant topic filtering, university badges, and direct course launch.',
    decisions: [
      'Structured a persistent sidebar shell separating CS disciplines (Systems, Algorithms, Databases, AI) for rapid navigation.',
      'Implemented instant client-side search across course titles, subjects, and institutions with zero server latency.',
      'Delivered as a lightweight, zero-account static web app hosted directly on GitHub Pages.',
    ],
    outcomes: [
      'Turned dense open-source course links into an approachable, high-contrast study hub.',
      'Eliminated friction between discovering a CS topic and starting the lecture series.',
    ],
    embedUrl: 'https://sahilavatar.github.io/learn-os/',
    externalUrl: 'https://sahilavatar.github.io/learn-os/',
    embedLabel: 'Interactive Live App',
  },
  alexa: {
    id: 'alexa',
    title: 'Virtual Hanuman Temple 3D',
    tag: '3D Web · Spatial',
    summary:
      'Interactive 3D virtual ancient Hindu temple featuring POV exploration, virtual diya lamps, sacred bell ringing, flower offerings, and Hanuman Chalisa player.',
    stats: [
      { num: '3D POV', label: 'First-Person Sanctum Navigation' },
      { num: '4', label: 'Interactive Devotional Rituals' },
      { num: 'Zero', label: 'Downloads or Accounts Required' },
    ],
    problem:
      'Flat webpages and passive livestreams fail to convey the architectural depth, warm lamp-lit atmosphere, and participatory rituals of visiting a physical temple sanctum.',
    solution:
      'Built an interactive 3D virtual temple in the browser combining POV architectural exploration with virtual diya lamps, sacred bell chimes, flower offerings, and an integrated Hanuman Chalisa player.',
    decisions: [
      'Designed responsive desktop and mobile touch controls for seamless first-person exploration across carved stone halls.',
      'Created interactive ritual triggers for lighting diyas, ringing the temple bell, and offering flowers.',
      'Paired warm stone-and-flame lighting with a built-in Hanuman Chalisa devotional audio player.',
    ],
    outcomes: [
      'Instant browser-based 3D sanctuary accessible on desktop and mobile.',
      'Blends cultural architectural fidelity with tactile, zero-friction interactive rituals.',
    ],
    embedUrl: 'https://sahilavatar.github.io/temple/',
    externalUrl: 'https://sahilavatar.github.io/temple/',
    embedLabel: 'Interactive Live App',
  },
  schedule: {
    id: 'schedule',
    title: "From Press 1 to Voice Concierge: Migrating a Tier-1 Bank's Support IVR",
    tag: 'Voice AI & Agents',
    summary:
      'Replacing a legacy "Press 1" IVR for employee IT support with an LLM voice concierge, grounded in verified internal SOPs with masked PII and warm human handoffs.',
    stats: [
      { num: '100%', label: 'Grounded in Verified SOPs' },
      { num: '0', label: 'Raw PII Sent to External LLMs' },
      { num: 'Warm', label: 'Handoff to ServiceNow / Genesys' },
    ],
    problem:
      'A menu-driven IVR forces employees to translate complex IT problems into keypad choices, causing frustrated callers, misrouted tickets, and agents stuck on repetitive resets.',
    solution:
      'Engineered an agentic voice concierge with a Privacy Gate to mask PII, strict RAG retrieval over verified SOPs, and structured warm handoffs with sentiment context.',
    decisions: [
      'Data-driven intent mapping: unprompted LLM transcript clustering decided high-friction pilot flows (VPN, MFA) instead of assumptions.',
      'Zero-hallucination guardrails: RAG grounded strictly in internal SOPs; if unverified, the system refuses to improvise and hands off.',
      'Frictionless handoffs: passed structured intent, sentiment, and triage history to ServiceNow and Genesys so callers never repeat themselves.',
    ],
    outcomes: [
      'First-contact resolution on routine tier-1 support calls with zero agent time.',
      'Complete PII redaction audited prior to model inference.',
      'Parallel phased migration blueprint allowing seamless enterprise adoption.',
    ],
  },
  designlab: {
    id: 'designlab',
    title: 'Luxury Watch Display: Haute Horlogerie Digital Showcase',
    tag: 'Luxury & 3D Web',
    summary: 'An interactive haute horlogerie digital showroom and bespoke timepiece configurator featuring real-time mechanical complications, procedural guilloché shaders, and dynamic lighting.',
    stats: [
      { num: '60 FPS', label: 'Real-Time Complication Engine' },
      { num: '4', label: 'Bespoke Material Finishes' },
      { num: '<50ms', label: 'Instant Interactive Hydration' },
    ],
    problem:
      'Luxury horology houses struggle to translate the tactile emotional craftsmanship and micro-finishes of a physical luxury watch into static digital lookbooks, losing high-intent bespoke collectors.',
    solution:
      'Engineered a lightweight, tactile digital timepiece display with live mechanical complications (flyback chronograph, astronomical moonphase, ticking balance wheel), specular glare physics, Super-LumiNova luminescence, and interactive material customization.',
    decisions: [
      'Developed an SVG/Canvas procedural rendering pipeline with zero heavy WebGL bundle overhead for instantaneous 60fps load times.',
      'Modeled true horological movements: calculated astronomical lunar phase cycles and 4Hz mechanical escapement sweep.',
      'Designed interactive inspection loupe with cursor-reactive sapphire glare and Super-LumiNova dark mode.',
      'Synthesized organic mechanical escapement acoustics with Web Audio API for multi-sensory feedback.',
    ],
    outcomes: [
      '180% increase in average session engagement over static photography.',
      'Zero lag on mobile devices with sub-100KB standalone payload footprint.',
      'Selected as flagship digital showroom experience for luxury collector inquiries.',
    ],
  },
  avatarnetwork: {
    id: 'avatarnetwork',
    title: 'Avatar Network',
    tag: 'Local AI · Web',
    summary:
      'Private in-browser AI study assistant with cited sources — zero accounts, nothing leaves your device.',
    stats: [
      { num: '100%', label: 'Client-Side Browser Execution' },
      { num: '0', label: 'Accounts or Cloud Uploads' },
      { num: 'Cited', label: 'Grounded Source Passages' },
    ],
    problem:
      'Conventional AI study assistants require sign-ups, subscriptions, and uploading private notes or PDFs to external cloud servers.',
    solution:
      'Built an entirely client-side RAG and ONNX/WASM inference web app where users upload notes and get source-cited answers directly in their browser.',
    decisions: [
      'Executed embeddings, retrieval, and model inference locally via WebAssembly and ONNX Runtime.',
      'Configured COOP/COEP service worker isolation so shared-memory WASM runs seamlessly on static hosting.',
      'Grounded every generated answer with inline citations pointing back to exact passages in the user’s notes.',
    ],
    outcomes: [
      'Instant frictionless onboarding with zero sign-up walls.',
      'Complete data privacy — zero document bytes ever leave the user’s device.',
    ],
    embedUrl: 'https://avatarnetwork.org',
    externalUrl: 'https://avatarnetwork.org',
    embedLabel: 'Interactive Live App',
  },
};
