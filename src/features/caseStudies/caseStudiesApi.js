const SEED_CASE_STUDIES = [
  {
    id: "cs-1",
    title: "AI-Powered Customer Support Assistant",
    category: "AI",
    summary:
      "Reduced ticket resolution time by 40% with an intelligent assistant that learns from every conversation.",
    year: 2025,
  },
  {
    id: "cs-2",
    title: "Cross-Platform Fintech Wallet",
    category: "Mobile",
    summary:
      "A secure mobile wallet with biometric login and real-time transaction sync across iOS and Android.",
    year: 2025,
  },
  {
    id: "cs-3",
    title: "DeFi Staking Platform",
    category: "Blockchain",
    summary:
      "Built a staking dashboard processing $2M in locked assets with audited smart contracts.",
    year: 2024,
  },
  {
    id: "cs-4",
    title: "E-Commerce Storefront Redesign",
    category: "Web",
    summary:
      "A blazing-fast storefront that lifted conversion rates by 28% through modern rendering and UX.",
    year: 2024,
  },
  {
    id: "cs-5",
    title: "Real-Time Fraud Detection Engine",
    category: "AI",
    summary:
      "Machine learning pipeline flagging suspicious transactions in under 200ms with 99% precision.",
    year: 2025,
  },
  {
    id: "cs-6",
    title: "NFT Marketplace & Launchpad",
    category: "Blockchain",
    summary:
      "Full-stack marketplace with minting, auctions, and gasless trading for a Web3 audience.",
    year: 2023,
  },
  {
    id: "cs-7",
    title: "Healthcare Appointment Scheduler",
    category: "Mobile",
    summary:
      "Clinic management app handling 10k+ bookings monthly with smart reminders and video visits.",
    year: 2023,
  },
  {
    id: "cs-8",
    title: "Enterprise Analytics Portal",
    category: "Web",
    summary:
      "Role-based analytics dashboard streaming live KPIs to 1,200 employees across 5 regions.",
    year: 2024,
  },
];

const randomDelay = () => Math.floor(Math.random() * 400) + 600;

const rejectsRandomly = () => Math.random() < 0.15;

export function fetchCaseStudies(signal) {
  return new Promise((resolve, reject) => {
    const handleAbort = () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    };

    signal?.addEventListener("abort", handleAbort, { once: true });

    const timer = setTimeout(() => {
      if (signal?.aborted) return;
      if (rejectsRandomly()) {
        reject(new Error("Network failed"));
        return;
      }
      resolve(SEED_CASE_STUDIES);
    }, randomDelay());
  });
}
