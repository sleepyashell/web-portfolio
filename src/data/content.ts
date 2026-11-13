import type { Contact, Profile, Project, Skill } from "./types";

export const profile: Profile = {
  name: "Syuraih Umar Khotthob",
  shortName: "Umar",
  headline: ["Product Designer", "Front-end Developer"],
  intro:
    "Informatics student at Universitas Diponegoro. I turn user research into interfaces people enjoy using, and I’m learning to build them end to end.",
  about: [
    "I got into tech the way many people do: growing up glued to laptops and phones, playing games and trying every app I could find, always curious about how they worked. Today that curiosity lives in UI/UX. I love the research side, understanding what people actually need, and I love the creative side just as much, since visual design has always been my thing.",
    "Right now I’m focused on sharpening my design craft while growing into software engineering, so I can take ideas from research all the way to working products.",
  ],
  // Placeholder until the real CV is provided.
  cvUrl: "/cv.pdf",
};

// Mockups exported from Figma frames JB / R / SJ / K / P, numbered in slide order.
const mockups = (id: string, name: string, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    src: `/images/projects/${id}/${i + 1}.webp`,
    alt: `${name} screen ${i + 1}`,
  }));

export const projects: Project[] = [
  {
    id: "salingjaga",
    name: "SalingJaga",
    logo: "/images/works/icons/salingjaga.svg",
    icon: "/images/works/icons/salingjaga.svg",
    accent: "salingjaga",
    team: true,
    context: "UNITY #14 — 3rd Honorable Mention",
    role: "UX Researcher & UI Designer",
    summary:
      "Two-way protection for safer digital transactions between small businesses and their customers.",
    problem:
      "Online fraud costs Indonesians trillions of rupiah, and small businesses (UMKM) selling through WhatsApp and Instagram are easy targets. In our survey of 36 respondents, 94.4% had received scam messages from fake couriers or marketplace CS, 83.3% doubted the authenticity of payment proofs, and 86.1% had faced non-delivery scams. Existing solutions are reactive and hard to use for people with limited tech literacy.",
    process:
      "We ran a survey and in-depth interviews, then built empathy maps and two personas: Silvi, a small business owner, and Yuma, a buyer. Using problem-feature mapping and an Eisenhower Matrix, we narrowed the ideas down to five core features, designed them in Figma, and tested the prototype with users.",
    solution: [
      "Payment proof verification with AI and OCR",
      "URL and bank account checker backed by a fraud report database",
      "Sender identity verification to detect phishing attempts",
      "Community fraud reporting synced with official authority data",
      "Built-in security education for users with limited tech literacy",
    ],
    mockup: "phone",
    images: mockups("salingjaga", "SalingJaga", 9),
  },
  {
    id: "kembali",
    name: "Kembali",
    logo: "/images/works/icons/kembali.svg",
    icon: "/images/works/icons/kembali.svg",
    accent: "kembali",
    team: true,
    context: "UXVIDIA · Arkavidia — Top 12 of 100+ teams",
    role: "UX Researcher & UI Designer",
    summary:
      "A lost-and-found app that helps people get their belongings back, fast and transparently.",
    problem:
      "More than 11,600 items were left behind on Indonesian trains and stations in just ten months of 2025. Most of them are still searched for through scattered social media posts and chain messages. Reporting is confusing, item status is unclear, and owners often miss the “golden time” to recover their things.",
    process:
      "We surveyed users and ran in-depth interviews, then mapped the findings into empathy maps, personas, and user journeys. That surfaced five core problems: fragmented reporting, hard-to-find information, unclear status, slow matching, and low trust in the handover. From there we prioritized features with problem-feature mapping and an Eisenhower Matrix, and validated the prototype through task-based usability testing (SEQ).",
    solution: [
      "AI item scan: snap a photo and AI fills in the item details",
      "Centralized lost and found reports with smart matching",
      "Real-time claim status, so owners always know where things stand",
      "Verified handover using face verification and a digital signature",
      "Officer dashboard to manage, verify, and return items",
    ],
    mockup: "phone",
    images: mockups("kembali", "Kembali", 8),
  },
  {
    id: "jagaborneo",
    name: "JagaBorneo",
    logo: "/images/projects/jagaborneo/logo.svg",
    icon: "/images/projects/jagaborneo/logo.svg",
    iconActive: "/images/works/icons/jagaborneo.svg",
    accent: "jagaborneo",
    team: true,
    context: "Inception · Hackathon",
    role: "Product & UI Designer",
    summary:
      "A geospatial platform for monitoring forest and peatland fires and deforestation in Kalimantan.",
    problem:
      "Forest and land fires burned over 1.16 million hectares in Indonesia in 2023. Satellite hotspot data shows where heat anomalies occur, but not the context around them, such as whether a spot sits on peatland or near forest cover. Without that context, it’s hard to decide which areas need attention first.",
    process:
      "I shaped the product concept and logic with the team: which data to combine, how users should explore it, and how to present uncertain satellite data responsibly. I then designed the interface around an interactive map as the central view. The team built and deployed it as a working web platform.",
    solution: [
      "Interactive hotspot map using NASA FIRMS satellite data, with filters for time, confidence, and region",
      "Peatland and forest-cover layers to show the environmental context",
      "Weather-based fire risk prediction",
      "Community reporting as additional on-the-ground information",
    ],
    mockup: "laptop",
    images: mockups("jagaborneo", "JagaBorneo", 3),
  },
  {
    id: "rintis-ai",
    name: "Rintis AI",
    logo: "/images/works/icons/rintis-ai.svg",
    icon: "/images/works/icons/rintis-ai.svg",
    iconActive: "/images/works/icons/rintis-ai-white.svg",
    accent: "rintis",
    team: true,
    context: "COMPFEST 18 · AI Innovation Challenge",
    role: "Product & UI Designer",
    summary:
      "An explainable AI advisor that helps new sellers find the right product to sell online.",
    problem:
      "Indonesia’s e-commerce market keeps growing, and so does the competition. New sellers have no sales data of their own, so choosing a product means manually checking prices, sales, ratings, and competitors one listing at a time. High demand alone doesn’t make a good opportunity if the market is already crowded.",
    process:
      "I helped define the product logic: how to turn raw marketplace data into decisions a first-time seller can trust. I then designed the web interface so that AI results always come with an explanation, not just a score. The team trained a demand prediction model, built an explainable AI engine, and deployed the system.",
    solution: [
      "Opportunity Discovery: ranks products by predicted demand vs. competition density",
      "Explainable recommendations that show why a product is a good pick",
      "Price simulation for what-if analysis before setting a price",
      "Alternative micro-niche suggestions when a market is too crowded",
    ],
    mockup: "laptop",
    images: mockups("rintis-ai", "Rintis AI", 2),
  },
  {
    id: "pahamind",
    name: "Pahamind",
    logo: "/images/works/icons/pahamind.svg",
    icon: "/images/works/icons/pahamind.svg",
    iconActive: "/images/works/icons/pahamind-white.svg",
    accent: "pahamind",
    team: true,
    context: "Course project",
    role: "UX Researcher & UI Designer",
    summary:
      "An AI-powered study app that turns static PDFs into an active learning experience.",
    problem:
      "Students rely on PDFs, but PDFs are static and passive. In our research with 28 students, 75% struggled to stay focused, 53.6% couldn’t tell which points mattered, and 39.3% rarely tested themselves. Students also keep jumping between a PDF reader, a quiz app, and an AI chatbot, and that interaction gap drains the very focus they need for studying.",
    process:
      "We combined a survey with in-depth interviews with three Informatics students, then built personas, journey maps, and How Might We statements. Feature ideas were prioritized and benchmarked against Duolingo, Quizlet, Notion AI, and Adobe Acrobat. I designed the experience from low-fi wireframes to a high-fi prototype, then ran two rounds of unmoderated usability testing on Maze. Fixes to navigation, labels, and instructions raised the SUS score from 65.45 to 83.25.",
    solution: [
      "Focus On: breaks long documents into bite-sized modules",
      "Test Me: auto-generated quizzes and flashcards with instant feedback",
      "Contextual AI Assistant: explains terms based on the current page",
      "Visual Learning Path: maps how concepts connect",
      "Smart Highlighting and gamified streaks",
    ],
    mockup: "phone",
    images: mockups("pahamind", "Pahamind", 8),
  },
];

export const defaultProjectId = "salingjaga";

export const skills: Skill[] = [
  { name: "React", category: "framework" },
  { name: "Photoshop", category: "tool" },
  { name: "JavaScript", category: "language" },
  { name: "Design Systems", category: "design" },
  { name: "User Research", category: "design" },
  { name: "UX Design", category: "design" },
  { name: "After Effects", category: "tool" },
  { name: "Prototyping", category: "design" },
  { name: "Python", category: "language" },
  { name: "Next.js", category: "framework" },
  { name: "Illustrator", category: "tool" },
  { name: "Figma", category: "tool" },
  { name: "CSS", category: "language" },
  { name: "HTML", category: "language" },
  { name: "Product Design", category: "design" },
  { name: "Usability Testing", category: "design" },
  { name: "React Native", category: "framework" },
];

// Placeholders — replace with real values before launch.
export const contacts: Contact[] = [
  { label: "Email", value: "syuraihumar@gmail.com", href: "mailto:syuraihumar@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/syuraih-umar-khotthob", href: "https://linkedin.com/in/syuraih-umar-khotthob" },
  { label: "GitHub", value: "github.com/sleepyashell", href: "https://github.com/sleepyashell" },
  { label: "Instagram", value: "@syuraihumarr", href: "https://www.instagram.com/syuraihumarr/" },
];
