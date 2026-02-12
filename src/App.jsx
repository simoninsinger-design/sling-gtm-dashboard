import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend, AreaChart, Area } from "recharts";

const COLORS = {
  bg: "#0B0F1A",
  surface: "#111827",
  card: "#1A2234",
  cardHover: "#1E2A40",
  border: "#2A3A52",
  accent: "#F97316",
  accentDim: "#EA580C",
  accentGlow: "rgba(249,115,22,0.15)",
  green: "#22C55E",
  red: "#EF4444",
  blue: "#3B82F6",
  purple: "#A855F7",
  yellow: "#EAB308",
  cyan: "#06B6D4",
  text: "#F1F5F9",
  textSecondary: "#94A3B8",
  textDim: "#64748B",
};

// --- Animated number utilities ---

function parseStatValue(value) {
  const str = String(value);
  const match = str.match(/^([~<>-]*\$?)([\d,.]+)([BMK%+]*)$/i);
  if (!match) return null;
  const prefix = match[1];
  const num = parseFloat(match[2].replace(/,/g, ""));
  const suffix = match[3];
  if (isNaN(num)) return null;
  return { prefix, num, suffix };
}

function formatAnimatedValue(parsed, currentNum) {
  if (!parsed) return null;
  const { prefix, suffix } = parsed;
  const upper = suffix.toUpperCase();
  let formatted;
  if (upper.includes("B")) {
    formatted = currentNum.toFixed(1);
  } else if (upper.includes("M")) {
    formatted = currentNum >= 10 ? Math.round(currentNum).toString() : currentNum.toFixed(1);
  } else if (upper.includes("K")) {
    formatted = currentNum >= 10 ? Math.round(currentNum).toString() : currentNum.toFixed(1);
  } else if (upper.includes("%")) {
    formatted = Math.round(currentNum).toString();
  } else {
    formatted = currentNum >= 100 ? Math.round(currentNum).toLocaleString() : Math.round(currentNum).toString();
  }
  return `${prefix}${formatted}${suffix}`;
}

function useAnimatedNumber(target, duration = 1500) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    hasAnimated.current = false;
    setDisplay(0);
  }, [target]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { display, ref };
}

const NAV_ITEMS = [
  { id: "exec", label: "Executive Summary", icon: "◆" },
  { id: "market", label: "Market Sizing", icon: "◈" },
  { id: "problem", label: "The Problem", icon: "⚠" },
  { id: "competitors", label: "Competitive Landscape", icon: "⬡" },
  { id: "plan", label: "90-Day Plan", icon: "▶" },
  { id: "roadmap", label: "Growth Roadmap", icon: "◇" },
  { id: "channels", label: "Channel Strategy", icon: "◎" },
  { id: "kpis", label: "KPIs & Metrics", icon: "◉" },
  { id: "cities", label: "City Playbooks", icon: "◐" },
  { id: "risks", label: "Risks & Mitigations", icon: "⚑" },
  { id: "whyme", label: "Why Me", icon: "★" },
];

const remittanceData = [
  { year: "2019", value: 38.5 },
  { year: "2020", value: 40.6 },
  { year: "2021", value: 51.6 },
  { year: "2022", value: 58.5 },
  { year: "2023", value: 63.3 },
  { year: "2024", value: 64.7 },
  { year: "2025*", value: 57.6 },
];

const stateData = [
  { state: "California", remittances: 20.4, population: 14.2, pct: "33%" },
  { state: "Texas", remittances: 9.0, population: 10.8, pct: "15%" },
  { state: "Illinois", remittances: 3.8, population: 2.2, pct: "6%" },
  { state: "Arizona", remittances: 2.9, population: 2.1, pct: "5%" },
  { state: "Georgia", remittances: 2.5, population: 1.1, pct: "4%" },
  { state: "New York", remittances: 2.3, population: 1.3, pct: "4%" },
  { state: "Colorado", remittances: 2.1, population: 1.2, pct: "3%" },
  { state: "Nevada", remittances: 1.8, population: 0.8, pct: "3%" },
];

const competitorCostData = [
  { name: "Sling Money", cost: 0, time: "Seconds", color: COLORS.accent },
  { name: "Wise", cost: 4.8, time: "1-2 days", color: COLORS.blue },
  { name: "Remitly", cost: 3.99, time: "3-5 days", color: COLORS.purple },
  { name: "Western Union", cost: 7.5, time: "Minutes", color: COLORS.yellow },
  { name: "Bank Wire", cost: 35, time: "3-5 days", color: COLORS.red },
];

const channelBudget = [
  { name: "Community Events", value: 35, color: COLORS.accent },
  { name: "Micro-Influencers", value: 25, color: COLORS.blue },
  { name: "Digital Ads", value: 20, color: COLORS.purple },
  { name: "Referral Bonuses", value: 15, color: COLORS.green },
  { name: "PR/Content", value: 5, color: COLORS.cyan },
];

const kpiTimeline = [
  { day: "Day 0", installs: 0, activated: 0, firstTransfer: 0 },
  { day: "Day 15", installs: 800, activated: 480, firstTransfer: 240 },
  { day: "Day 30", installs: 3500, activated: 2100, firstTransfer: 1050 },
  { day: "Day 45", installs: 8000, activated: 5200, firstTransfer: 2800 },
  { day: "Day 60", installs: 16000, activated: 11200, firstTransfer: 6400 },
  { day: "Day 75", installs: 28000, activated: 19600, firstTransfer: 12000 },
  { day: "Day 90", installs: 50000, activated: 35000, firstTransfer: 22500 },
];

const COMPETITORS = [
  {
    name: "Sling Money", type: "Crypto-native", marketShare: "New entrant",
    price: "$0", speed: "Seconds", trust: "Low (new)",
    strengths: ["Zero fees", "Instant delivery", "Modern UX", "Self-custodial"],
    weaknesses: ["No brand recognition", "KYC friction", "No cash-out network"],
    color: COLORS.accent, highlight: true,
  },
  {
    name: "Remitly", type: "Digital-first", marketShare: "23% US→LAC",
    price: "$3.99", speed: "3-5 days", trust: "High",
    strengths: ["Market leader", "Strong brand", "Spanish support", "Cash pickup"],
    weaknesses: ["Fees on every send", "Slow delivery", "Legacy tech"],
    color: COLORS.purple,
  },
  {
    name: "Wise", type: "Digital-first", marketShare: "Growing",
    price: "~$4.80", speed: "1-2 days", trust: "High",
    strengths: ["Transparent pricing", "Multi-currency", "Business accounts"],
    weaknesses: ["Not corridor-focused", "Higher cost than Sling", "Less Latino community trust"],
    color: COLORS.blue,
  },
  {
    name: "Western Union", type: "Legacy incumbent", marketShare: "Declining",
    price: "$7.50", speed: "Minutes", trust: "Very High",
    strengths: ["Massive agent network", "Decades of trust", "Cash pickup everywhere"],
    weaknesses: ["Highest fees", "Outdated UX", "Losing digital share"],
    color: COLORS.yellow,
  },
  {
    name: "Bitso", type: "Crypto-native", marketShare: "$4.3B processed",
    price: "~1%", speed: "Minutes", trust: "Medium",
    strengths: ["Crypto expertise", "Mexico presence", "Fast growing"],
    weaknesses: ["Less US consumer focus", "Crypto stigma", "Regulatory risk"],
    color: COLORS.cyan,
  },
];

const RISKS = [
  {
    title: "Regulatory Complexity", category: "Regulatory",
    likelihood: "Medium", impact: "High",
    description: "US money transmission licenses vary by state. Crypto-based rails face evolving regulation. Compliance missteps could halt operations.",
    mitigation: "Sling already holds FCA registration, MiCA license, and US MSB status. 20% of team is compliance/financial crime. Partner with experienced state-level counsel for MTL compliance.",
    color: COLORS.red,
  },
  {
    title: "Competitive Response", category: "Market",
    likelihood: "High", impact: "Medium",
    description: "Remitly, Wise, or WU could match zero-fee pricing in the corridor to defend share. Price war erodes Sling's key differentiator.",
    mitigation: "Sling's cost structure (Solana, no agent network) enables sustainable $0 fees. Incumbents can't match without destroying margins. Build community moat that survives a price war.",
    color: COLORS.yellow,
  },
  {
    title: "Execution Risk", category: "Operational",
    likelihood: "Medium", impact: "High",
    description: "40-person team attempting 5-city grassroots launch simultaneously. Risk of spreading too thin or key hire delays.",
    mitigation: "Phase 1 focuses on fixing onboarding (internal). Phase 2 starts with LA + Houston only, then expands. Hire community lead in Week 1. Use contract street teams to scale without permanent headcount.",
    color: COLORS.accent,
  },
  {
    title: "Macro / Deportation Fears", category: "External",
    likelihood: "High", impact: "Medium",
    description: "2025 deportation rhetoric and enforcement already reducing corridor volume (-11% Q2 YoY). Target population may withdraw from financial services.",
    mitigation: "Self-custodial wallet = no account seizure risk. Partner with trusted community orgs. Frame around savings: families under economic pressure need $0 fees more, not less.",
    color: COLORS.purple,
  },
  {
    title: "Product / KYC Friction", category: "Product",
    likelihood: "High", impact: "High",
    description: "Current KYC flow requires SSN + biometric selfie from an unknown brand. App reviews show significant drop-off and trust issues.",
    mitigation: "Phase 1 priority: fix onboarding flow. Add trust explainers, progressive disclosure, Spanish-language support, and clear rejection recovery paths. Target 60%→80% KYC completion rate.",
    color: COLORS.blue,
  },
];

// Stat Card
function StatCard({ label, value, sub, color = COLORS.accent, large }) {
  const [hovered, setHovered] = useState(false);
  const parsed = parseStatValue(value);
  const { display, ref: animRef } = useAnimatedNumber(parsed ? parsed.num : 0);
  const displayValue = parsed ? formatAnimatedValue(parsed, display) : value;

  return (
    <div
      ref={animRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? COLORS.cardHover : COLORS.card,
        border: `1px solid ${hovered ? color + "66" : COLORS.border}`,
        borderRadius: 12,
        padding: large ? "28px 24px" : "20px 18px",
        flex: 1,
        minWidth: 160,
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        boxShadow: hovered ? `0 4px 20px ${color}15` : "none",
        transition: "all 0.2s ease",
        cursor: "default",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${color}, transparent)`,
      }} />
      <div style={{ color: COLORS.textSecondary, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ color: COLORS.text, fontSize: large ? 36 : 28, fontWeight: 800, lineHeight: 1.1, fontFamily: "'DM Sans', sans-serif" }}>
        {displayValue}
      </div>
      {sub && <div style={{ color: COLORS.textDim, fontSize: 12, marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

// Phase card for 90-day plan
function PhaseCard({ phase, title, weeks, color, items, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? COLORS.cardHover : COLORS.card,
        border: `1px solid ${isActive ? color : COLORS.border}`,
        borderRadius: 14,
        padding: "24px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        flex: 1,
        minWidth: 280,
        position: "relative",
        overflow: "hidden",
        boxShadow: isActive ? `0 0 30px ${color}22` : "none",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: color, opacity: isActive ? 1 : 0.4,
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{
          background: color, color: "#000", fontSize: 11, fontWeight: 800,
          padding: "3px 10px", borderRadius: 20, letterSpacing: "0.05em",
        }}>{phase}</span>
        <span style={{ color: COLORS.textDim, fontSize: 12 }}>{weeks}</span>
      </div>
      <h3 style={{ color: COLORS.text, fontSize: 18, fontWeight: 700, margin: "10px 0 14px", fontFamily: "'DM Sans', sans-serif" }}>{title}</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{
            color: COLORS.textSecondary,
            fontSize: 13, lineHeight: 1.6,
            paddingLeft: 16,
            position: "relative",
            marginBottom: 4,
          }}>
            <span style={{ position: "absolute", left: 0, color }}>›</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChannelRow({ name, tactic, metric, effort, impact }) {
  const [hovered, setHovered] = useState(false);
  const impactColor = impact === "High" ? COLORS.green : impact === "Medium" ? COLORS.yellow : COLORS.textDim;
  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: `1px solid ${COLORS.border}`,
        background: hovered ? `${COLORS.accent}08` : "transparent",
        transition: "background 0.15s ease",
      }}
    >
      <td style={{ padding: "14px 12px", color: COLORS.text, fontWeight: 600, fontSize: 14 }}>{name}</td>
      <td style={{ padding: "14px 12px", color: COLORS.textSecondary, fontSize: 13 }}>{tactic}</td>
      <td style={{ padding: "14px 12px", color: COLORS.textSecondary, fontSize: 13 }}>{metric}</td>
      <td style={{ padding: "14px 12px" }}>
        <span style={{ background: COLORS.border, color: COLORS.textSecondary, fontSize: 11, padding: "3px 10px", borderRadius: 12 }}>{effort}</span>
      </td>
      <td style={{ padding: "14px 12px" }}>
        <span style={{ background: `${impactColor}22`, color: impactColor, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 12 }}>{impact}</span>
      </td>
    </tr>
  );
}

function CityCard({ city, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isActive ? COLORS.cardHover : COLORS.card,
        border: `1px solid ${isActive ? COLORS.accent : COLORS.border}`,
        borderRadius: 10, padding: "14px 18px", cursor: "pointer",
        textAlign: "left", fontFamily: "inherit", width: "100%",
        transition: "all 0.2s ease",
        boxShadow: isActive ? `0 0 20px ${COLORS.accent}15` : "none",
        transform: hovered && !isActive ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: isActive ? COLORS.accent : COLORS.text }}>{city.name}</div>
          <div style={{ fontSize: 12, color: COLORS.textDim }}>{city.tagline}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.accent }}>{city.remittances}</div>
          <div style={{ fontSize: 10, color: COLORS.textDim }}>remittances/yr</div>
        </div>
      </div>
    </button>
  );
}

function QuoteCard({ quote, source, alignment }) {
  return (
    <div style={{
      background: COLORS.card,
      borderLeft: `4px solid ${COLORS.accent}`,
      borderRadius: "0 12px 12px 0",
      padding: "20px 24px",
      marginBottom: 16,
    }}>
      <div style={{ fontSize: 14, color: COLORS.textSecondary, fontStyle: "italic", lineHeight: 1.7, marginBottom: 8 }}>
        &ldquo;{quote}&rdquo;
      </div>
      <div style={{ fontSize: 11, color: COLORS.textDim, fontWeight: 600, marginBottom: 10 }}>
        — {source}
      </div>
      {alignment && (
        <div style={{ fontSize: 13, color: COLORS.accent, fontWeight: 600, paddingLeft: 12, borderLeft: `2px solid ${COLORS.accent}44` }}>
          → {alignment}
        </div>
      )}
    </div>
  );
}

const CITIES = [
  {
    name: "Los Angeles, CA",
    tagline: "The #1 corridor city — 33% of all US→MX remittances",
    remittances: "$20.4B",
    population: "4.9M Mexican-origin in metro",
    why: "Los Angeles is ground zero. California sends 33% of all US→Mexico remittances ($20.4B in 2024). The East LA / Boyle Heights corridor is 94% Latino and the densest concentration of Mexican-Americans in the country. This is where we prove the model.",
    neighborhoods: [
      { name: "Boyle Heights / East LA", desc: "94% Latino, 85K+ residents. Heart of Mexican LA — El Mercadito marketplace, Cesar Chavez Ave corridor, Our Lady of Guadalupe church. Dense, walkable, high foot traffic.", priority: "Primary" },
      { name: "South LA (Florence-Firestone, Huntington Park)", desc: "Growing Mexican-American population. Mix of established families and recent immigrants. Major Western Union presence.", priority: "Primary" },
      { name: "Pacoima / San Fernando Valley", desc: "85% Latino. Working-class families, many in construction/services. High remittance frequency.", priority: "Secondary" },
      { name: "Santa Ana / Anaheim (Orange County)", desc: "78% Latino in Santa Ana. Separate metro but massive Mexican-origin community with different media market.", priority: "Secondary" },
    ],
    partners: [
      "El Mercadito de Los Angeles — iconic marketplace on 1st St, 3 floors of Mexican vendors",
      "Our Lady of Guadalupe Church (Boyle Heights) — community anchor since 1920s",
      "Plaza de la Raza — cultural arts center in Lincoln Park",
      "Mexican Consulate of Los Angeles — highest-traffic consulate in the US",
      "LA Plaza de Cultura y Artes — Mexican-American cultural museum downtown",
      "Olvera Street marketplace — tourist + local foot traffic, mariachis, festivals",
    ],
    events: [
      { event: "Fiestas Patrias (Sept 15-16)", desc: "Mexican Independence Day celebrations across East LA — massive foot traffic, ideal for demo booths" },
      { event: "Día de los Muertos (Nov 1-2)", desc: "Huge celebrations in Hollywood Forever Cemetery + Olvera Street; 100K+ attendees" },
      { event: "East LA Cinco de Mayo Festival", desc: "Whittier Blvd parade + street fair; 50K+ attendees" },
      { event: "Weekly: El Mercadito Saturdays", desc: "Steady foot traffic every weekend — perfect for recurring demo table presence" },
    ],
    tactics: [
      "Deploy 2-person street team on Cesar Chavez Ave + Whittier Blvd corridors (WU/MG locations)",
      "Poster campaign in 30+ mercados and tiendas with QR codes + \"$0 fees\" messaging in Spanish",
      "Partner with 3-5 LA-based bilingual TikTok creators (East LA lifestyle niche)",
      "Demo table at El Mercadito every Saturday for 8 weeks",
      "Consulate partnership: Sling info at ventanilla de asesoría financiera",
      "WhatsApp group: \"Sling LA\" — seed with 50 early users, grow organically",
    ],
    kpis: { installs: "20K", activated: "14K", firstMX: "9K" },
  },
  {
    name: "Houston, TX",
    tagline: "Texas' remittance capital — the East End is our beachhead",
    remittances: "$9.0B",
    population: "2.3M Mexican-origin in metro",
    why: "Houston is #2 in remittance volume to Mexico. The East End (Second Ward / Magnolia Park) is one of the oldest Mexican-American neighborhoods in Texas, with deep community infrastructure. Houston also has a large construction/energy workforce — high remittance frequency senders.",
    neighborhoods: [
      { name: "Second Ward (Segundo Barrio)", desc: "Houston's oldest Mexican-American neighborhood. Our Lady of Guadalupe Church, Talento Bilingüe de Houston cultural center, Navigation Blvd corridor.", priority: "Primary" },
      { name: "Magnolia Park", desc: "Established 1890, known as \"Little Mexico\" by the 1920s. Working-class, tight-knit, high Ship Channel workforce.", priority: "Primary" },
      { name: "Gulfton / Sharpstown", desc: "Dense immigrant corridor SW of downtown. Mix of Mexican + Central American. High WU/MG traffic.", priority: "Secondary" },
      { name: "Pasadena / Channelview", desc: "Industrial suburbs east of Houston. Large Mexican-American workforce in petrochemical plants.", priority: "Secondary" },
    ],
    partners: [
      "BakerRipley (formerly Neighborhood Centers Inc.) — 70 locations across Houston, deep community trust",
      "AAMA (Association for Advancement of Mexican Americans) — education center in East End",
      "Our Lady of Guadalupe Catholic Church — community anchor since 1912",
      "Talento Bilingüe de Houston — bilingual theater + cultural center in Second Ward",
      "East End Chamber of Commerce — business network across the corridor",
      "Mexican Consulate of Houston — high traffic for matrícula consular",
    ],
    events: [
      { event: "Fiestas Patrias (September)", desc: "Multi-day celebration across East End — parades, live music, food vendors" },
      { event: "Navigation Esplanade Night Market", desc: "Monthly evening market on Navigation Blvd — food, art, community gathering" },
      { event: "East End Street Fest", desc: "Annual festival celebrating East End culture and businesses" },
      { event: "Guadalupe Plaza Park events", desc: "Regular community programming at the Second Ward's central park" },
    ],
    tactics: [
      "Street team on Navigation Blvd (Second Ward) targeting Western Union / MoneyGram foot traffic",
      "Partnership with BakerRipley for demo sessions at their community centers",
      "Poster + QR campaign in East End panaderías, tiendas, and taquerías",
      "Sponsor a booth at Fiestas Patrias (September) — live demo + sign-up incentives",
      "Recruit 2-3 Houston micro-influencers focused on East End / Mexican-American community",
      "WhatsApp group: \"Sling Houston\" — seed via church and BakerRipley networks",
    ],
    kpis: { installs: "12K", activated: "8.5K", firstMX: "5.5K" },
  },
  {
    name: "Chicago, IL",
    tagline: "The Midwest's Mexican capital — La Villita is our proving ground",
    remittances: "$3.8B",
    population: "1.8M Mexican-origin in metro",
    why: "Chicago's Pilsen + Little Village (La Villita) corridor is the largest Mexican-American community in the Midwest. 26th Street is the 2nd highest-grossing shopping district in Chicago after the Magnificent Mile ($900M/year in sales). Dense, walkable, community-driven — perfect for grassroots activation.",
    neighborhoods: [
      { name: "Little Village (La Villita)", desc: "75K+ residents, 77% Mexican-American. 26th St is the \"Mexican Magnificent Mile\" — 500+ businesses in 2 miles. Primary entry point for Mexican immigrants to the Midwest.", priority: "Primary" },
      { name: "Pilsen (Lower West Side)", desc: "Historic Mexican-American neighborhood. Mexican National Museum of Art, annual Fiesta del Sol, vibrant mural culture. Gentrifying but still deeply Mexican.", priority: "Primary" },
      { name: "Back of the Yards", desc: "South Side neighborhood, 80%+ Latino. More working-class, less tourist traffic — authentic community activation opportunity.", priority: "Secondary" },
      { name: "Cicero (suburb)", desc: "87% Latino suburb just west of Little Village. Extension of the La Villita community across city limits.", priority: "Secondary" },
    ],
    partners: [
      "Enlace Chicago — Little Village community org, deep trust, runs programs across the neighborhood",
      "Little Village Chamber of Commerce — 1,000+ member businesses along 26th St",
      "Latinos Progresando — legal services + community programs in Marshall Square",
      "National Museum of Mexican Art (Pilsen) — major cultural institution, 200K+ visitors/year",
      "Mexican Consulate of Chicago — one of the busiest in the US",
      "Little Village Discount Mall — 100+ booths, heavy foot traffic for Mexican goods",
    ],
    events: [
      { event: "26th St Mexican Independence Day Parade (Sept 15)", desc: "54th annual — largest Hispanic parade in Chicago. Tens of thousands of spectators on 26th St." },
      { event: "Fiesta del Sol (July, Pilsen)", desc: "4 days of food, music, carnival. One of Chicago's largest festivals." },
      { event: "Villapalooza (annual, Little Village)", desc: "Music festival promoting arts, culture, community engagement on 26th St." },
      { event: "Weekly: 26th Street Saturday shopping", desc: "Consistent high foot traffic — perfect for recurring demo presence" },
    ],
    tactics: [
      "26th Street blitz: poster + QR campaign in 40+ businesses along the \"Mexican Magnificent Mile\"",
      "Demo booth at Little Village Discount Mall — 100+ vendor booths, heavy weekend traffic",
      "Partner with Enlace Chicago for community demo sessions and referral seeding",
      "Booth at September 15 Independence Day Parade — massive one-day activation opportunity",
      "Fiesta del Sol sponsorship/booth (July) — 4 days, hundreds of thousands of attendees",
      "Recruit 2 Chicago-based creators from Pilsen/La Villita community",
      "WhatsApp group: \"Sling Chicago\" — seed via Enlace + Latinos Progresando networks",
    ],
    kpis: { installs: "10K", activated: "7K", firstMX: "4.5K" },
  },
  {
    name: "Dallas–Fort Worth, TX",
    tagline: "Fast-growing corridor — construction & service workforce hub",
    remittances: "$4.2B",
    population: "2.1M Mexican-origin in metro",
    why: "DFW has one of the fastest-growing Mexican-American populations in the US, driven by construction boom and service economy. Less established community infrastructure than Houston or LA — more opportunity for a new brand to establish early trust. Oak Cliff is the cultural anchor.",
    neighborhoods: [
      { name: "Oak Cliff (North Oak Cliff / Jefferson Blvd)", desc: "Dallas' primary Mexican-American neighborhood. Jefferson Blvd is the commercial spine — restaurants, shops, tiendas. Bishop Arts District nearby draws mixed crowd.", priority: "Primary" },
      { name: "Pleasant Grove", desc: "Southeast Dallas, 75%+ Hispanic. Working-class, high remittance send frequency. Underserved by fintech.", priority: "Primary" },
      { name: "West Dallas / La Bajada", desc: "Historic Latino neighborhood undergoing gentrification. Mix of longtime families and newer immigrants.", priority: "Secondary" },
      { name: "Fort Worth Northside", desc: "Historic Mexican-American community, centered around North Main St corridor.", priority: "Secondary" },
    ],
    partners: [
      "Oak Cliff Chamber of Commerce — Jefferson Blvd business network",
      "Mexican Consulate of Dallas — high traffic for ID and document services",
      "Catholic Diocese of Dallas — extensive Hispanic ministry network",
      "CitySquare — community services organization with deep DFW reach",
      "Latino Cultural Center (Dallas) — city-funded cultural institution",
    ],
    events: [
      { event: "Dallas Fiestas Patrias (September)", desc: "Celebration across Oak Cliff and downtown Dallas" },
      { event: "Cinco de Mayo Oak Cliff", desc: "Jefferson Blvd street festival, food, music" },
      { event: "Fort Worth Northside Dia de los Muertos", desc: "Growing celebration in Fort Worth's Mexican-American community" },
    ],
    tactics: [
      "Jefferson Blvd corridor campaign: poster + QR in 25+ businesses in Oak Cliff",
      "Street team at Western Union locations in Pleasant Grove + Oak Cliff",
      "Consulate partnership for financial literacy + Sling demo sessions",
      "Partner with 2 DFW-based bilingual influencers",
      "WhatsApp group: \"Sling Dallas\" — seed via Oak Cliff business network",
    ],
    kpis: { installs: "5K", activated: "3.5K", firstMX: "2.2K" },
  },
  {
    name: "Phoenix, AZ",
    tagline: "Border-adjacent — high-frequency senders, strong corridor habits",
    remittances: "$2.9B",
    population: "2.1M Mexican-origin in metro",
    why: "Phoenix is border-adjacent with deep, multigenerational ties to Sonora, Mexico. Many residents send remittances weekly or biweekly rather than monthly — higher frequency means faster habit formation. Maryvale is the densest Mexican-American neighborhood in the metro.",
    neighborhoods: [
      { name: "Maryvale", desc: "Phoenix's largest predominantly Latino neighborhood. 77% Hispanic, 200K+ residents. Dense commercial corridors on 35th Ave and Indian School Rd.", priority: "Primary" },
      { name: "South Phoenix / Laveen", desc: "Historic Latino community. Mix of Mexican-American families and Tohono O'odham community. Growing rapidly.", priority: "Primary" },
      { name: "Mesa (West Mesa)", desc: "Suburban but with dense Mexican-American pockets. High remittance sending from construction workers.", priority: "Secondary" },
      { name: "Tucson (South Tucson)", desc: "Separate market but strong border-adjacent corridor to Nogales/Sonora. 80%+ Hispanic.", priority: "Stretch" },
    ],
    partners: [
      "Chicanos Por La Causa — major Phoenix Latino nonprofit, housing + services",
      "Mexican Consulate of Phoenix — high traffic, community trust",
      "Valle del Sol — health + social services serving Latino community",
      "St. Vincent de Paul Catholic Church (Maryvale) — community anchor",
      "Phoenix Hispanic Chamber of Commerce — business network",
    ],
    events: [
      { event: "Phoenix Fiestas Patrias (September)", desc: "Annual celebrations across Maryvale and South Phoenix" },
      { event: "Dia de los Muertos PHX (October-November)", desc: "Growing citywide celebration, main event in downtown Phoenix" },
      { event: "Calle 16 Art Walk + markets", desc: "Monthly arts and culture event in the Roosevelt Row / 16th St corridor" },
    ],
    tactics: [
      "Maryvale corridor campaign: 35th Ave + Indian School Rd — posters + QR in 20+ businesses",
      "Street team outside WU/MG locations in Maryvale + South Phoenix",
      "Partner with Chicanos Por La Causa for demo sessions at their centers",
      "Leverage border proximity angle: \"Send to Sonora in seconds, not days\"",
      "WhatsApp group: \"Sling Phoenix\" — seed via CPLC + church networks",
    ],
    kpis: { installs: "3K", activated: "2K", firstMX: "1.3K" },
  },
];

function CityPlaybooks() {
  const [selectedCity, setSelectedCity] = useState(0);
  const city = CITIES[selectedCity];
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em" }}>City Playbooks</h1>
      <p style={{ color: COLORS.textSecondary, fontSize: 14, marginBottom: 24 }}>Hyper-local execution plans for each target city — specific neighborhoods, community partners, events, and tactics.</p>

      <div style={{ display: "flex", gap: 20, minHeight: 600 }}>
        {/* City selector sidebar */}
        <div style={{ width: 280, minWidth: 280, display: "flex", flexDirection: "column", gap: 8 }}>
          {CITIES.map((c, i) => (
            <CityCard key={i} city={c} isActive={selectedCity === i} onClick={() => setSelectedCity(i)} />
          ))}
          <div style={{ marginTop: 8, background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "14px 18px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Illustrative Scenario (90-Day)</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.textSecondary, marginBottom: 4 }}>
              <span>Total Installs</span><span style={{ fontWeight: 700, color: COLORS.accent }}>~50K</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.textSecondary, marginBottom: 4 }}>
              <span>Total Activated</span><span style={{ fontWeight: 700, color: COLORS.blue }}>~35K</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.textSecondary }}>
              <span>Total MX Transfers</span><span style={{ fontWeight: 700, color: COLORS.green }}>~22.5K</span>
            </div>
          </div>
        </div>

        {/* City detail */}
        <div style={{ flex: 1, overflow: "auto" }}>
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px", marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: COLORS.text, margin: 0 }}>{city.name}</h2>
                <div style={{ fontSize: 13, color: COLORS.textDim, marginTop: 4 }}>{city.tagline}</div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ textAlign: "center", padding: "8px 16px", background: COLORS.surface, borderRadius: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.accent }}>{city.kpis.installs}</div>
                  <div style={{ fontSize: 10, color: COLORS.textDim }}>Installs</div>
                </div>
                <div style={{ textAlign: "center", padding: "8px 16px", background: COLORS.surface, borderRadius: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.blue }}>{city.kpis.activated}</div>
                  <div style={{ fontSize: 10, color: COLORS.textDim }}>Activated</div>
                </div>
                <div style={{ textAlign: "center", padding: "8px 16px", background: COLORS.surface, borderRadius: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.green }}>{city.kpis.firstMX}</div>
                  <div style={{ fontSize: 10, color: COLORS.textDim }}>1st MX Transfer</div>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8 }}>{city.why}</div>
          </div>

          {/* Neighborhoods */}
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px", marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: COLORS.accent }}>Target Neighborhoods</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {city.neighborhoods.map((n, i) => (
                <div key={i} style={{ padding: "14px 16px", background: COLORS.surface, borderRadius: 10, borderLeft: `3px solid ${n.priority === "Primary" ? COLORS.accent : n.priority === "Secondary" ? COLORS.blue : COLORS.textDim}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>{n.name}</div>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10,
                      background: n.priority === "Primary" ? `${COLORS.accent}22` : `${COLORS.blue}22`,
                      color: n.priority === "Primary" ? COLORS.accent : COLORS.blue,
                    }}>{n.priority}</span>
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.6 }}>{n.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Partners + Events side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: COLORS.green }}>Community Partners</h3>
              {city.partners.map((p, i) => (
                <div key={i} style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.7, paddingLeft: 16, position: "relative", marginBottom: 6 }}>
                  <span style={{ position: "absolute", left: 0, color: COLORS.green }}>●</span>{p}
                </div>
              ))}
            </div>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: COLORS.purple }}>Key Events & Moments</h3>
              {city.events.map((e, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>{e.event}</div>
                  <div style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.5 }}>{e.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Execution Tactics */}
          <div style={{ background: `linear-gradient(135deg, ${COLORS.accent}10, transparent)`, border: `1px solid ${COLORS.accent}33`, borderRadius: 14, padding: "24px" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: COLORS.accent }}>Execution Tactics</h3>
            {city.tactics.map((t, i) => (
              <div key={i} style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 20, position: "relative", marginBottom: 4 }}>
                <span style={{ position: "absolute", left: 0, fontWeight: 800, color: COLORS.accent, fontSize: 12 }}>{i + 1}.</span>{t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("exec");
  const [activePhase, setActivePhase] = useState(0);
  const [animateIn, setAnimateIn] = useState(false);
  const [visited, setVisited] = useState({ exec: true });
  const [hoveredNav, setHoveredNav] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    setAnimateIn(false);
    const t = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(t);
  }, [active]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      const idx = NAV_ITEMS.findIndex(item => item.id === active);
      if ((e.key === "ArrowDown" || e.key === "j") && idx < NAV_ITEMS.length - 1) {
        e.preventDefault();
        const nextId = NAV_ITEMS[idx + 1].id;
        setActive(nextId);
        setVisited(prev => ({ ...prev, [nextId]: true }));
        if (contentRef.current) contentRef.current.scrollTop = 0;
      }
      if ((e.key === "ArrowUp" || e.key === "k") && idx > 0) {
        e.preventDefault();
        const prevId = NAV_ITEMS[idx - 1].id;
        setActive(prevId);
        setVisited(prev => ({ ...prev, [prevId]: true }));
        if (contentRef.current) contentRef.current.scrollTop = 0;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  const visitedCount = Object.keys(visited).length;
  const progressPct = (visitedCount / NAV_ITEMS.length) * 100;

  const navigate = (id) => {
    setActive(id);
    setVisited(prev => ({ ...prev, [id]: true }));
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  return (
    <div style={{
      display: "flex", height: "100vh", width: "100vw",
      background: COLORS.bg, color: COLORS.text,
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* Sidebar */}
      <nav style={{
        width: 240, minWidth: 240,
        background: COLORS.surface,
        borderRight: `1px solid ${COLORS.border}`,
        display: "flex", flexDirection: "column",
        padding: "0",
      }}>
        <div style={{ padding: "24px 20px 20px", borderBottom: `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDim})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 800, color: "#fff",
            }}>S</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.text, letterSpacing: "-0.02em" }}>Sling Money</div>
              <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>US GTM Strategy</div>
            </div>
          </div>
        </div>

        <div style={{ padding: "12px 10px", flex: 1 }}>
          <div style={{ height: 2, background: COLORS.border, borderRadius: 1, marginBottom: 12, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progressPct}%`, background: COLORS.accent, borderRadius: 1, transition: "width 0.3s ease" }} />
          </div>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{
                width: "100%",
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", marginBottom: 2,
                borderRadius: 8, border: "none", cursor: "pointer",
                background: active === item.id ? COLORS.accentGlow : hoveredNav === item.id ? `${COLORS.textDim}15` : "transparent",
                color: active === item.id ? COLORS.accent : COLORS.textSecondary,
                fontSize: 13, fontWeight: active === item.id ? 700 : 500,
                fontFamily: "inherit", textAlign: "left",
                transition: "all 0.15s ease",
              }}
            >
              <span style={{ fontSize: 14, width: 20, textAlign: "center", opacity: active === item.id ? 1 : 0.5 }}>{item.icon}</span>
              {item.label}
              {visited[item.id] && active !== item.id && (
                <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: 3, background: COLORS.green, opacity: 0.5 }} />
              )}
            </button>
          ))}
        </div>

        <div style={{ padding: "16px 20px", borderTop: `1px solid ${COLORS.border}`, fontSize: 11, color: COLORS.textDim }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Prepared for Interview</div>
          <div>Sling Money — US GTM Lead</div>
          <div style={{ marginTop: 4, opacity: 0.6 }}>Feb 2026 — Confidential</div>
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6, opacity: 0.5 }}>
            <span style={{ background: COLORS.border, padding: "2px 6px", borderRadius: 4, fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}>↑↓</span>
            <span style={{ fontSize: 10 }}>or</span>
            <span style={{ background: COLORS.border, padding: "2px 6px", borderRadius: 4, fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}>J/K</span>
            <span style={{ fontSize: 10 }}>to navigate</span>
          </div>
          <button
            onClick={() => window.print()}
            style={{
              background: COLORS.border, color: COLORS.textDim,
              border: "none", borderRadius: 6, padding: "6px 12px",
              fontSize: 10, fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit", marginTop: 8, width: "100%",
              transition: "opacity 0.15s ease",
            }}
          >Print / Export PDF</button>
        </div>
      </nav>

      {/* Main Content */}
      <main
        ref={contentRef}
        style={{
          flex: 1, overflow: "auto", padding: "32px 40px",
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          backgroundImage: "radial-gradient(circle at 50% 0%, rgba(249,115,22,0.03) 0%, transparent 50%)",
        }}
      >
        {/* EXECUTIVE SUMMARY */}
        {active === "exec" && (
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.03em" }}>
              <span style={{ color: COLORS.accent }}>Sling Money:</span> US↔Mexico Corridor Strategy
            </h1>
            <p style={{ color: COLORS.textSecondary, fontSize: 15, lineHeight: 1.7, maxWidth: 720, marginBottom: 32 }}>
              A strategic framework for winning the US→Mexico corridor — the world&apos;s largest bilateral remittance flow — through community-led distribution, grassroots trust-building, and Sling&apos;s zero-fee advantage.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
              <StatCard label="Corridor TAM" value="$64.7B" sub="US→Mexico remittances, 2024 (BBVA)" large color={COLORS.accent} />
              <StatCard label="Target Population" value="38M+" sub="Mexican-origin in US (Census 2024)" large color={COLORS.blue} />
              <StatCard label="Avg Transaction" value="$395" sub="151M transactions/year (Banxico)" large color={COLORS.green} />
              <StatCard label="Incumbent Avg Cost" value="~3%" sub="$15.13 on $500 send (World Bank)" large color={COLORS.red} />
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "28px 28px 20px", marginBottom: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: COLORS.accent }}>⚡ The Thesis</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 8 }}>Why This Corridor, Why Now</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {[
                      "World's largest remittance corridor ($64.7B/yr)",
                      "Sling just launched Mexico support (SPEI integration)",
                      "Incumbents charge 3-7% fees; Sling charges zero",
                      "99% of remittances are electronic — mobile-ready",
                      "47% of volume comes from CA + TX — geographic focus",
                      "New 1% remittance tax (2025 bill) makes free even more compelling",
                    ].map((t, i) => (
                      <li key={i} style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 16, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: COLORS.green }}>✓</span>{t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 8 }}>Strategic Alignment with CEO Vision</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {[
                      '"Start where Venmo isn\'t" — international corridors first (Hudack, Blockworks)',
                      '"Follow WhatsApp\'s growth model" — critical mass abroad, then domestic',
                      '"Sling Links are inherently viral" — every non-user payment = acquisition',
                      "Lean team (~40) demands focused, high-leverage bets",
                      "Currently gross-margin negative — must prove corridor PMF before Series B",
                      "Fixes the #1 blocker (onboarding friction) within a concrete use case",
                    ].map((t, i) => (
                      <li key={i} style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 16, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: COLORS.accent }}>→</span>{t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CEO Strategic Alignment */}
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: COLORS.text }}>CEO Vision Alignment</h3>
              <QuoteCard
                quote="Start where Venmo isn't"
                source="Mike Hudack, Blockworks Interview"
                alignment="This plan targets the corridor Venmo ignores"
              />
              <QuoteCard
                quote="We're going to go straight for it... 10% chance at making money transfer entirely free for everyone, and that's just too big a prize to ignore"
                source="Mike Hudack, Substack"
                alignment="Community-led GTM is how you win that bet"
              />
              <QuoteCard
                quote="Follow WhatsApp's growth model"
                source="Mike Hudack, FinTech Insider"
                alignment="WhatsApp grew through diaspora word-of-mouth — exactly what this plan replicates"
              />
            </div>

            {/* Product Deep-Dive */}
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px", marginBottom: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Sling Product Deep-Dive</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.blue, marginBottom: 8 }}>Tech Stack</h4>
                  {["Solana blockchain (sub-cent fees)", "Bridge by Stripe (virtual accounts)", "Plaid (bank connectivity)", "Visa Direct / MC Send (instant payouts)", "RTP + FedNow (US instant rails)", "SEPA Instant (EU rails)"].map((t, i) => (
                    <div key={i} style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 14, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: COLORS.blue, fontSize: 8, top: 6 }}>●</span>{t}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.green, marginBottom: 8 }}>Key Features</h4>
                  {["P2P transfers — $0, instant", "Sling Links (send to non-users)", "145+ countries, 40+ currencies", "Virtual USD/EUR accounts", "Virtual Visa debit card (0% FX)", "Self-custodial wallet"].map((t, i) => (
                    <div key={i} style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 14, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: COLORS.green, fontSize: 8, top: 6 }}>●</span>{t}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.purple, marginBottom: 8 }}>Business Model</h4>
                  {["Currently free (gross-margin negative)", "Future: Visa card interchange", "Virtual Account deposits: 0.1%", "FX spread on exotic pairs", "Premium tier (potential)", "Unit economics improve at scale"].map((t, i) => (
                    <div key={i} style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 14, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: COLORS.purple, fontSize: 8, top: 6 }}>●</span>{t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: `linear-gradient(135deg, ${COLORS.accent}15, ${COLORS.accent}05)`, border: `1px solid ${COLORS.accent}33`, borderRadius: 14, padding: "20px 24px" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, marginBottom: 6 }}>What Good Could Look Like (90 Days)</h4>
              <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: 0, lineHeight: 1.7 }}>
                Illustrative scenario: <strong style={{ color: COLORS.text }}>50K installs → 35K activated → 22.5K first MX transfers</strong>. These aren&apos;t promises — they&apos;re a framework for what a well-executed corridor launch could look like, calibrated to generate meaningful Series B data.
              </p>
            </div>
          </div>
        )}

        {/* MARKET SIZING */}
        {active === "market" && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em" }}>Market Sizing: The Opportunity</h1>
            <p style={{ color: COLORS.textSecondary, fontSize: 14, marginBottom: 28 }}>The US→Mexico corridor is the world's largest bilateral remittance flow — and it's digitizing fast.</p>

            <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.textSecondary, marginBottom: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>Remittances to Mexico (USD Billions)</h3>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px 20px 16px", marginBottom: 28 }}>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={remittanceData}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={COLORS.accent} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={COLORS.accent} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="year" stroke={COLORS.textDim} fontSize={12} />
                  <YAxis stroke={COLORS.textDim} fontSize={12} tickFormatter={v => `$${v}B`} />
                  <Tooltip contentStyle={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 13 }} formatter={v => [`$${v}B`, "Remittances"]} />
                  <Area type="monotone" dataKey="value" stroke={COLORS.accent} strokeWidth={3} fill="url(#areaGrad)" />
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ fontSize: 11, color: COLORS.textDim, textAlign: "right", marginTop: 4 }}>Source: BBVA Research / Banco de México, 2025. *2025 projected based on Q2 trend.</div>
            </div>

            {/* 2025 Headwinds */}
            <div style={{ background: `linear-gradient(135deg, ${COLORS.yellow}08, ${COLORS.red}05)`, border: `1px solid ${COLORS.yellow}33`, borderRadius: 14, padding: "24px", marginBottom: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.yellow, marginBottom: 6 }}>The Corridor Is Cooling — And That&apos;s Part of the Strategy</h3>
              <p style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.7, marginBottom: 16 }}>
                Q2 2025 saw the steepest decline in US→Mexico remittances since 2012. Deportation fears, a weakening migrant labor market, and a new 1% remittance tax are reducing flow. But for Sling, this is opportunity: price-sensitive senders respond <strong style={{ color: COLORS.text }}>more</strong> to &ldquo;$0 fees&rdquo; when every dollar counts.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <StatCard label="Q2 2025 YoY" value="-11%" sub="Steepest quarterly drop since 2012 (FXC Intel)" color={COLORS.red} />
                <StatCard label="New Remittance Tax" value="1%" sub="'One Big Beautiful Bill' Act, 2025" color={COLORS.yellow} />
                <StatCard label="Avg Transaction" value="$393" sub="4th consecutive quarterly decline (Banxico)" color={COLORS.accent} />
              </div>
            </div>

            <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.textSecondary, marginBottom: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>Top States by Remittance Volume to Mexico</h3>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "20px", marginBottom: 28 }}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={stateData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} horizontal={false} />
                  <XAxis type="number" stroke={COLORS.textDim} fontSize={12} tickFormatter={v => `$${v}B`} />
                  <YAxis type="category" dataKey="state" stroke={COLORS.textDim} fontSize={12} width={80} />
                  <Tooltip contentStyle={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 13 }} formatter={v => [`$${v}B`, "Remittances"]} />
                  <Bar dataKey="remittances" fill={COLORS.accent} radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ fontSize: 11, color: COLORS.textDim, textAlign: "right" }}>Source: Banco de México 2024, via BBVA Research</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
              <StatCard label="Mexican-Origin Pop (CA)" value="14.2M" sub="33% of state population" color={COLORS.accent} />
              <StatCard label="Mexican-Origin Pop (TX)" value="10.8M" sub="35% of state population" color={COLORS.blue} />
              <StatCard label="CA+TX Remittance Share" value="47%" sub="$29.4B of $62.5B total" color={COLORS.green} />
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Addressable Market Funnel</h3>
              {[
                { label: "Total Mexican-origin population in US", value: "38M+", width: "100%", color: COLORS.accent },
                { label: "Estimated remittance senders (68% send)", value: "~26M", width: "68%", color: COLORS.blue },
                { label: "Digital-first senders (mobile apps)", value: "~15M", width: "40%", color: COLORS.purple },
                { label: "Reachable in CA + TX (Phase 1 focus)", value: "~8M", width: "21%", color: COLORS.green },
                { label: "Year 1 realistic capture target (0.3%)", value: "~50K", width: "3%", color: COLORS.cyan },
              ].map((row, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: COLORS.textSecondary }}>{row.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: row.color }}>{row.value}</span>
                  </div>
                  <div style={{ height: 8, background: COLORS.border, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: row.width, background: row.color, borderRadius: 4, transition: "width 0.8s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* THE PROBLEM */}
        {active === "problem" && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em" }}>The Two Problems to Solve</h1>
            <p style={{ color: COLORS.textSecondary, fontSize: 14, marginBottom: 28 }}>Before we can win the corridor, we must fix the front door. Both problems are solvable in 90 days.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.red}44`, borderRadius: 14, padding: "24px" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.red, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Problem #1</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: COLORS.text, marginBottom: 12 }}>Onboarding Kills Conversion</h3>
                <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                  App Store and Google Play reviews reveal a consistent pattern: users download the app, provide sensitive information (SSN, selfies), and then get stuck in verification limbo — sometimes for days. Many are rejected with no explanation.
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.red, marginBottom: 8 }}>Evidence from reviews:</div>
                {[
                  '"It just freezes on verifying identity... gave them my social and selfies"',
                  '"Rejected my account and cannot tell me the reason"',
                  '"18-24 hours stuck mid-transaction... only resolved through extensive live support"',
                  '"We are a small team doing our best to get through every case"'
                ].map((q, i) => (
                  <div key={i} style={{ fontSize: 12, color: COLORS.textDim, fontStyle: "italic", lineHeight: 1.6, paddingLeft: 12, borderLeft: `2px solid ${COLORS.red}44`, marginBottom: 8 }}>{q}</div>
                ))}
              </div>

              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.yellow}44`, borderRadius: 14, padding: "24px" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.yellow, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Problem #2</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: COLORS.text, marginBottom: 12 }}>Zero Brand Trust in US Market</h3>
                <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                  For a money app targeting immigrant communities — who are often targets of scams — trust is everything. Sling has no US brand recognition, no physical presence, and asks for SSN during onboarding. Multiple reviewers call it a "scam."
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.yellow, marginBottom: 8 }}>Trust deficit signals:</div>
                {[
                  "No brand recognition among target demographic",
                  "Asks for SSN + facial selfie from unfamiliar app",
                  "No physical presence in communities",
                  "No Spanish-language marketing or support visible",
                  "Competitor incumbents (WU, Remitly) have decades of trust"
                ].map((t, i) => (
                  <div key={i} style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 16, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: COLORS.yellow }}>•</span>{t}
                  </div>
                ))}
              </div>
            </div>

            <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.textSecondary, marginBottom: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>Cost to Send $500 to Mexico</h3>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px 20px 16px", marginBottom: 28 }}>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={competitorCostData} margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="name" stroke={COLORS.textDim} fontSize={12} />
                  <YAxis stroke={COLORS.textDim} fontSize={12} tickFormatter={v => `$${v}`} />
                  <Tooltip contentStyle={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 13 }} formatter={(v, n, p) => [`$${v} fee (${p.payload.time})`, "Cost"]} />
                  <Bar dataKey="cost" radius={[6, 6, 0, 0]}>
                    {competitorCostData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ fontSize: 11, color: COLORS.textDim, textAlign: "right" }}>Source: World Bank Remittance Prices Q3 2024, company websites</div>
            </div>

            <div style={{ background: `linear-gradient(135deg, ${COLORS.green}12, transparent)`, border: `1px solid ${COLORS.green}33`, borderRadius: 14, padding: "20px 24px" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.green, marginBottom: 6 }}>The Sling Advantage is Massive — if People Know About It</h4>
              <p style={{ fontSize: 13, color: COLORS.textSecondary, margin: 0, lineHeight: 1.7 }}>
                At $0 fees and instant delivery, Sling saves the average sender <strong style={{ color: COLORS.text }}>~$15 per transaction</strong> vs. incumbents. Over 12 monthly sends, that's <strong style={{ color: COLORS.text }}>$180/year back in their pocket</strong>. For families sending $400/month, Sling turns dead fees into groceries. The challenge is not the product — it's awareness and trust.
              </p>
            </div>
          </div>
        )}

        {/* COMPETITIVE LANDSCAPE */}
        {active === "competitors" && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em" }}>Competitive Landscape</h1>
            <p style={{ color: COLORS.textSecondary, fontSize: 14, marginBottom: 28 }}>Head-to-head comparison of key players in the US→Mexico remittance corridor.</p>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "4px 0", marginBottom: 28, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    {["Company", "Type", "Market Share", "Cost ($500)", "Speed", "Trust"].map(h => (
                      <th key={h} style={{ padding: "14px 12px", textAlign: "left", fontSize: 11, fontWeight: 700, color: COLORS.textDim, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPETITORS.map((c, i) => (
                    <tr key={i} style={{
                      borderBottom: `1px solid ${COLORS.border}`,
                      background: c.highlight ? `${COLORS.accent}10` : "transparent",
                    }}>
                      <td style={{ padding: "14px 12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 8, height: 8, borderRadius: 4, background: c.color }} />
                          <span style={{ color: COLORS.text, fontWeight: 700, fontSize: 14 }}>{c.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 12px", color: COLORS.textSecondary, fontSize: 13 }}>{c.type}</td>
                      <td style={{ padding: "14px 12px", color: COLORS.textSecondary, fontSize: 13 }}>{c.marketShare}</td>
                      <td style={{ padding: "14px 12px", color: c.highlight ? COLORS.green : COLORS.textSecondary, fontWeight: c.highlight ? 700 : 400, fontSize: 13 }}>{c.price}</td>
                      <td style={{ padding: "14px 12px", color: c.highlight ? COLORS.green : COLORS.textSecondary, fontWeight: c.highlight ? 700 : 400, fontSize: 13 }}>{c.speed}</td>
                      <td style={{ padding: "14px 12px", color: COLORS.textSecondary, fontSize: 13 }}>{c.trust}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
              <div style={{ background: `linear-gradient(135deg, ${COLORS.green}10, transparent)`, border: `1px solid ${COLORS.green}33`, borderRadius: 14, padding: "24px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.green, marginBottom: 14 }}>Sling&apos;s Product Advantage</h3>
                {["Zero fees on every send — no other player matches this", "Instant delivery (seconds vs days)", "Self-custodial: no account seizure risk", "Modern UX built for mobile-first users", "Sling Links: viral growth built into the product", "Crypto rails enable structurally lower costs"].map((t, i) => (
                  <div key={i} style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 16, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: COLORS.green }}>✓</span>{t}
                  </div>
                ))}
              </div>
              <div style={{ background: `linear-gradient(135deg, ${COLORS.red}10, transparent)`, border: `1px solid ${COLORS.red}33`, borderRadius: 14, padding: "24px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.red, marginBottom: 14 }}>The Distribution Gap</h3>
                {["Zero brand recognition in target demographic", "No physical presence or agent network", "KYC friction killing conversion", "No Spanish-language marketing visible", "No cash pickup option in Mexico (digital-only)", "Incumbents have decades of community trust"].map((t, i) => (
                  <div key={i} style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 16, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: COLORS.red }}>✗</span>{t}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: `linear-gradient(135deg, ${COLORS.accent}15, ${COLORS.accent}05)`, border: `1px solid ${COLORS.accent}33`, borderRadius: 14, padding: "20px 24px" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, marginBottom: 6 }}>The Bottom Line</h4>
              <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: 0, lineHeight: 1.7 }}>
                Sling wins on product — <strong style={{ color: COLORS.text }}>the gap is distribution and trust</strong>, which is exactly what this GTM plan solves. No competitor can match $0 fees and instant delivery. The challenge is making the right people <em>know</em> that, and <em>trust</em> it.
              </p>
            </div>
          </div>
        )}

        {/* 90-DAY PLAN */}
        {active === "plan" && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em" }}>The 90-Day Framework</h1>
            <p style={{ color: COLORS.textSecondary, fontSize: 14, marginBottom: 28 }}>Three phases I&apos;d propose: fix the front door, seed the community, then scale what works.</p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
              <PhaseCard
                phase="PHASE 1" title="Fix the Front Door" weeks="Weeks 1–3" color={COLORS.red}
                isActive={activePhase === 0} onClick={() => setActivePhase(0)}
                items={[
                  "Audit KYC funnel: map every drop-off point with product/eng team",
                  "Add real-time verification status UI (\"Step 2 of 3: Checking ID...\")",
                  "Create Spanish-language onboarding flow & support center",
                  "Add \"Why we need your SSN\" trust explainer modal with security badges",
                  "Build rejection email with clear reasons + retry path",
                  "Set up onboarding analytics: install→signup→KYC start→verified→first load→first send",
                  "Goal: meaningfully improve KYC completion rate",
                ]}
              />
              <PhaseCard
                phase="PHASE 2" title="Seed the Corridor" weeks="Weeks 4–8" color={COLORS.accent}
                isActive={activePhase === 1} onClick={() => setActivePhase(1)}
                items={[
                  "Launch \"$0 Fees Forever\" campaign in LA + Houston + Dallas + Chicago",
                  "Partner with 10-15 Mexican-American micro-influencers (50K-200K followers)",
                  "Host Sling demo days at community centers, churches, mercados in target cities",
                  "Deploy street teams at remittance hotspots (Western Union locations, check-cashing stores)",
                  "Launch bilingual TikTok/Reels content series: fees comparison, live demos, user stories",
                  "Activate referral program: $10 for referrer + $10 for new user on first MX transfer",
                  "Seed WhatsApp community groups for each target city",
                ]}
              />
              <PhaseCard
                phase="PHASE 3" title="Scale What Works" weeks="Weeks 9–12" color={COLORS.green}
                isActive={activePhase === 2} onClick={() => setActivePhase(2)}
                items={[
                  "Analyze: which cities, channels, and messages drove highest activation?",
                  "Double down on top 3 performing channels; kill underperformers",
                  "Scale paid digital: Meta/Instagram geo-targeted ads to high-density ZIP codes",
                  "Launch \"Sling Ambassadors\" program: power users become local evangelists",
                  "Begin earned PR push: stories of families saving $180+/year in fees",
                  "Prepare Series B corridor data: TPV, CAC, LTV signals, retention curves",
                  "Expand playbook to #2 corridor (US→Guatemala or US→Colombia)",
                ]}
              />
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Phase Detail: {["Fix the Front Door", "Seed the Corridor", "Scale What Works"][activePhase]}</h3>
              {activePhase === 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.red, marginBottom: 8 }}>Onboarding Conversion Playbook</h4>
                    <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8 }}>
                      The current KYC flow asks for high-trust information (SSN, facial biometrics) from an unknown brand. For immigrant communities with valid concerns about data sharing, this is a dealbreaker. The fix isn't removing KYC — it's building trust <em>before</em> and <em>during</em> the ask.
                    </div>
                    <div style={{ marginTop: 16 }}>
                      {[
                        { label: "Pre-KYC trust layer", desc: "Show regulatory badges (FCA, MiCA, US MSB) + real user testimonials in Spanish before asking for SSN" },
                        { label: "Progressive disclosure", desc: "Let users explore the app, see rates, and experience the product before requiring full verification" },
                        { label: "Transparent status", desc: "Replace silent loading spinners with clear step-by-step verification progress" },
                        { label: "Recovery flows", desc: "Rejection email with specific reason + 1-click retry path instead of dead-end" },
                      ].map((item, i) => (
                        <div key={i} style={{ marginBottom: 12 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>{item.label}</div>
                          <div style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.6 }}>{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.red, marginBottom: 8 }}>Localization Quick Wins</h4>
                    {[
                      "Full Spanish-language app flow (not just translated — culturally adapted)",
                      "Spanish-language customer support (24/7 via AI + human escalation)",
                      "Help center articles in Spanish covering Mexico-specific use cases",
                      "MXN display option alongside USD for intuitive amount entry",
                      "Recipient flow optimized for Mexican bank accounts + SPEI",
                      "\"Enviar a México\" as prominent home screen action",
                    ].map((t, i) => (
                      <div key={i} style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 16, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: COLORS.red }}>›</span>{t}
                      </div>
                    ))}
                    <div style={{ marginTop: 20, padding: "14px 16px", background: `${COLORS.red}11`, border: `1px solid ${COLORS.red}33`, borderRadius: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.red, marginBottom: 4 }}>Success Signal — Phase 1</div>
                      <div style={{ fontSize: 13, color: COLORS.textSecondary }}>Meaningful improvement in KYC completion rate (baseline from app review complaint frequency)</div>
                    </div>
                  </div>
                </div>
              )}
              {activePhase === 1 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent, marginBottom: 8 }}>Target Cities (by remittance volume)</h4>
                    {[
                      { city: "Los Angeles, CA", why: "#1 metro for MX remittances; 4.9M Mexican-origin" },
                      { city: "Houston, TX", why: "#2 metro; 2.3M Mexican-origin; construction/energy workers" },
                      { city: "Dallas-Fort Worth, TX", why: "Fast-growing Mexican-American community; 2.1M" },
                      { city: "Chicago, IL", why: "3rd largest Mexican-American community; 1.8M" },
                      { city: "Phoenix, AZ", why: "Border city; high remittance frequency" },
                    ].map((c, i) => (
                      <div key={i} style={{ marginBottom: 12, padding: "10px 14px", background: COLORS.surface, borderRadius: 8 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent }}>{c.city}</div>
                        <div style={{ fontSize: 12, color: COLORS.textDim }}>{c.why}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent, marginBottom: 8 }}>Community Activation Playbook</h4>
                    {[
                      { tactic: "Mercado & Tienda partnerships", desc: "QR code posters in 50+ Mexican grocery stores per city; staff trained to demo" },
                      { tactic: "Church network", desc: "Partner with Catholic parishes in target neighborhoods; after-service demo tables" },
                      { tactic: "Consulado events", desc: "Presence at Mexican consulate events in LA, Houston, Chicago (high-trust setting)" },
                      { tactic: "Remittance counter ambush", desc: "Street teams outside Western Union/MoneyGram locations showing live fee comparison" },
                      { tactic: "WhatsApp seeding", desc: "Create Sling user groups per city; power users share tips and invite contacts" },
                    ].map((t, i) => (
                      <div key={i} style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>{t.tactic}</div>
                        <div style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.5 }}>{t.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activePhase === 2 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.green, marginBottom: 8 }}>Scale Decision Framework</h4>
                    <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                      By Week 8, we'll have clear data on which channels drive the highest-quality activations (cost per activated user who completes first MX transfer). Scaling decisions will be ruthlessly data-driven:
                    </div>
                    {[
                      { metric: "CAC < $8 per activated user", action: "Scale aggressively" },
                      { metric: "CAC $8-15 per activated user", action: "Optimize creative and targeting" },
                      { metric: "CAC > $15 per activated user", action: "Pause and redeploy budget" },
                    ].map((r, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: COLORS.surface, borderRadius: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 13, color: COLORS.textSecondary }}>{r.metric}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? COLORS.green : i === 1 ? COLORS.yellow : COLORS.red }}>{r.action}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.green, marginBottom: 8 }}>Series B Data Package</h4>
                    <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                      The 90-day corridor blitz generates the exact data Sling needs for a compelling Series B story:
                    </div>
                    {[
                      "Total Payment Volume (TPV) in MX corridor — proof of product-market fit",
                      "CAC by channel — shows capital-efficient growth path",
                      "Week 1/4/8 retention curves — demonstrates stickiness",
                      "Organic viral coefficient (Sling Links generated per user)",
                      "NPS score for corridor users (target: 60+)",
                      "Corridor replication roadmap (MX → Guatemala → Colombia → Brazil)",
                    ].map((t, i) => (
                      <div key={i} style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 16, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: COLORS.green }}>✓</span>{t}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* GROWTH ROADMAP */}
        {active === "roadmap" && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em" }}>Growth Roadmap</h1>
            <p style={{ color: COLORS.textSecondary, fontSize: 14, marginBottom: 28 }}>The 90-day framework proves the model. Here&apos;s how I&apos;d think about scaling it into a multi-corridor growth engine.</p>

            {/* Timeline bar */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 32, position: "relative" }}>
              {[
                { label: "Days 1–90", phase: "Prove", color: COLORS.accent },
                { label: "Months 4–6", phase: "Scale", color: COLORS.blue },
                { label: "Months 7–12", phase: "Expand", color: COLORS.green },
                { label: "Year 2+", phase: "Dominate", color: COLORS.purple },
              ].map((p, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 20,
                    background: `${p.color}22`, border: `3px solid ${p.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 800, color: p.color, zIndex: 1,
                  }}>{i + 1}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: p.color, marginTop: 8 }}>{p.phase}</div>
                  <div style={{ fontSize: 10, color: COLORS.textDim, marginTop: 2 }}>{p.label}</div>
                  {i < 3 && (
                    <div style={{
                      position: "absolute", top: 20, left: "60%", width: "80%",
                      height: 2, background: `linear-gradient(90deg, ${p.color}, ${[COLORS.blue, COLORS.green, COLORS.purple][i]})`,
                      opacity: 0.4,
                    }} />
                  )}
                </div>
              ))}
            </div>

            {/* Phase 1: Prove */}
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.accent}33`, borderRadius: 14, padding: "24px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: COLORS.accent }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20, background: `${COLORS.accent}22`, color: COLORS.accent, letterSpacing: "0.05em" }}>PHASE 1 — DAYS 1–90</span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, marginTop: 8 }}>Prove the Model</h3>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.accent }}>50K</div>
                  <div style={{ fontSize: 10, color: COLORS.textDim }}>installs (scenario)</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.7, marginBottom: 14 }}>
                Fix the front door (KYC/onboarding), seed 5 target cities with grassroots activations, and generate enough corridor data to prove product-market fit.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  { metric: "35K", label: "Activated users", color: COLORS.blue },
                  { metric: "22.5K", label: "First MX transfers", color: COLORS.green },
                  { metric: "<$8", label: "Blended CAC", color: COLORS.purple },
                ].map((m, i) => (
                  <div key={i} style={{ background: COLORS.surface, borderRadius: 8, padding: "10px 14px", textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: m.color }}>{m.metric}</div>
                    <div style={{ fontSize: 10, color: COLORS.textDim }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase 2: Scale */}
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.blue}33`, borderRadius: 14, padding: "24px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: COLORS.blue }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20, background: `${COLORS.blue}22`, color: COLORS.blue, letterSpacing: "0.05em" }}>PHASE 2 — MONTHS 4–6</span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, marginTop: 8 }}>Scale What Works</h3>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.blue }}>100K+</div>
                  <div style={{ fontSize: 10, color: COLORS.textDim }}>activated (aspirational)</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.7, marginBottom: 14 }}>
                By Month 4, we have clear data on which channels, cities, and messages drive the highest-quality activations. Now we double down ruthlessly.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.blue, marginBottom: 8 }}>Key Objectives</h4>
                  {[
                    "Kill underperforming channels, 3x budget on winners",
                    "Scale paid digital (Meta/IG) with proven creative",
                    "Launch Sling Ambassadors program — power users become local evangelists",
                    "Expand street teams to all 5 cities simultaneously",
                    "Hit 8,000+ Monthly Active Senders to Mexico (MAS-MX)",
                    "Begin earned PR push: family savings stories in Latino media",
                  ].map((t, i) => (
                    <div key={i} style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 14, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: COLORS.blue }}>›</span>{t}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.blue, marginBottom: 8 }}>Series B Data Package</h4>
                  {[
                    { label: "Total Payment Volume (TPV)", target: "$25M+" },
                    { label: "CAC by channel", target: "Proven <$8" },
                    { label: "Week 4/8 retention", target: "45%+" },
                    { label: "Viral coefficient (Sling Links)", target: "1.5+" },
                    { label: "NPS (corridor users)", target: "60+" },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 4 ? `1px solid ${COLORS.border}` : "none" }}>
                      <span style={{ fontSize: 12, color: COLORS.textDim }}>{r.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.blue }}>{r.target}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phase 3: Expand */}
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.green}33`, borderRadius: 14, padding: "24px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: COLORS.green }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20, background: `${COLORS.green}22`, color: COLORS.green, letterSpacing: "0.05em" }}>PHASE 3 — MONTHS 7–12</span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, marginTop: 8 }}>Expand to New Corridors</h3>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.green }}>3</div>
                  <div style={{ fontSize: 10, color: COLORS.textDim }}>corridors (potential)</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.7, marginBottom: 14 }}>
                The Mexico playbook becomes a repeatable corridor expansion template. Each new corridor starts faster because we&apos;ve already built the muscle.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.green, marginBottom: 8 }}>Corridor Expansion Sequence</h4>
                  {[
                    { corridor: "US → Guatemala", size: "$18.3B", why: "2nd largest LAC corridor, overlapping communities with MX" },
                    { corridor: "US → Colombia", size: "$9.5B", why: "Fast-growing digital-first senders, strong NYC/Miami presence" },
                    { corridor: "US → El Salvador", size: "$8.2B", why: "High remittance dependence (24% of GDP), strong community orgs" },
                  ].map((c, i) => (
                    <div key={i} style={{ padding: "10px 14px", background: COLORS.surface, borderRadius: 8, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.green }}>{c.corridor}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.textDim }}>{c.size}</span>
                      </div>
                      <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>{c.why}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.green, marginBottom: 8 }}>Operational Milestones</h4>
                  {[
                    "Hire regional community leads for Guatemala + Colombia corridors",
                    "Replicate city playbook template in new corridor cities (NYC, Miami, DC)",
                    "Build strategic partnerships: Mexican/Guatemalan grocery chains, prepaid card networks",
                    "Launch Sling for Business — SMB remittance product for restaurants, construction companies",
                    "Grow ambassador program to 200+ active evangelists across all corridors",
                    "Explore cash-out partnerships in destination countries",
                  ].map((t, i) => (
                    <div key={i} style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 14, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: COLORS.green }}>›</span>{t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phase 4: Dominate */}
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.purple}33`, borderRadius: 14, padding: "24px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: COLORS.purple }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20, background: `${COLORS.purple}22`, color: COLORS.purple, letterSpacing: "0.05em" }}>PHASE 4 — YEAR 2+</span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, marginTop: 8 }}>Multi-Corridor Dominance</h3>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.purple }}>10+</div>
                  <div style={{ fontSize: 10, color: COLORS.textDim }}>corridors (long-term vision)</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.7, marginBottom: 14 }}>
                Sling becomes the default app for diaspora money movement globally — replicating the WhatsApp growth model Hudack envisions.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.purple, marginBottom: 8 }}>Global Corridors</h4>
                  {[
                    "US → Brazil ($3.5B)",
                    "US → Philippines ($38B)",
                    "US → India ($32B)",
                    "UK → Nigeria ($5.2B)",
                    "EU → Morocco ($11B)",
                  ].map((t, i) => (
                    <div key={i} style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 14, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: COLORS.purple }}>›</span>{t}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.purple, marginBottom: 8 }}>Org Growth</h4>
                  {[
                    "Regional GTM leads per corridor",
                    "In-house content studio (bilingual)",
                    "Partnerships & BD team",
                    "Growth analytics & experimentation",
                    "Community ops at scale",
                  ].map((t, i) => (
                    <div key={i} style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 14, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: COLORS.purple }}>›</span>{t}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.purple, marginBottom: 8 }}>Product Expansion</h4>
                  {[
                    "Sling for Business (SMB payroll)",
                    "Physical debit card rollout",
                    "Cash deposit network",
                    "Savings/yield features",
                    "Web/desktop platform",
                  ].map((t, i) => (
                    <div key={i} style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 14, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: COLORS.purple }}>›</span>{t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: `linear-gradient(135deg, ${COLORS.accent}15, ${COLORS.accent}05)`, border: `1px solid ${COLORS.accent}33`, borderRadius: 14, padding: "20px 24px" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, marginBottom: 6 }}>The Compounding Advantage</h4>
              <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: 0, lineHeight: 1.7 }}>
                Each corridor we win makes the next one easier. Community trust transfers across diaspora networks. The ambassador playbook becomes a template. The data compounds. By Year 2, Sling isn&apos;t just a remittance app — it&apos;s <strong style={{ color: COLORS.text }}>the financial platform for global diaspora communities</strong>.
              </p>
            </div>
          </div>
        )}

        {/* CHANNEL STRATEGY */}
        {active === "channels" && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em" }}>Channel Strategy</h1>
            <p style={{ color: COLORS.textSecondary, fontSize: 14, marginBottom: 28 }}>Community-first, digital-second. Trust is built in person, then amplified online.</p>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "4px 0", marginBottom: 28, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    {["Channel", "Tactic", "Primary Metric", "Effort", "Impact"].map(h => (
                      <th key={h} style={{ padding: "14px 12px", textAlign: "left", fontSize: 11, fontWeight: 700, color: COLORS.textDim, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <ChannelRow name="Community Events" tactic="Demo days at mercados, churches, consulates in 5 target cities" metric="Installs per event" effort="High" impact="High" />
                  <ChannelRow name="Street Teams" tactic="Guerrilla presence at WU/MG locations; live fee comparisons" metric="Signups per hour" effort="Medium" impact="High" />
                  <ChannelRow name="Micro-Influencers" tactic="10-15 bilingual creators (50K-200K) in target cities" metric="CPM + installs" effort="Medium" impact="High" />
                  <ChannelRow name="Referral Program" tactic="$10 + $10 bonus on first MX transfer via invite code" metric="Viral coefficient" effort="Low" impact="High" />
                  <ChannelRow name="WhatsApp Groups" tactic="Seed user communities per city; share tips, invite friends" metric="Group growth rate" effort="Low" impact="Medium" />
                  <ChannelRow name="Paid Social" tactic="Meta/Instagram geo-targeted ads to high-density ZIP codes" metric="CPI + CAC" effort="Medium" impact="Medium" />
                  <ChannelRow name="TikTok/Reels" tactic="Bilingual short-form: fees comparison, live demos, user stories" metric="Views + profile clicks" effort="Medium" impact="Medium" />
                  <ChannelRow name="PR/Earned Media" tactic="Family savings stories in Latino media (Univision, La Opinión)" metric="Reach + trust signal" effort="High" impact="Medium" />
                  <ChannelRow name="App Store Optimization" tactic="Spanish-language listing, 'enviar dinero a México' keywords" metric="Organic install rate" effort="Low" impact="Medium" />
                  <ChannelRow name="Partnerships" tactic="Explore integration with Mexican grocery chains, prepaid networks" metric="Partner-driven installs" effort="High" impact="Medium" />
                </tbody>
              </table>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Budget Allocation (% of total)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={channelBudget} cx="50%" cy="50%" outerRadius={80} innerRadius={45} paddingAngle={3} dataKey="value">
                      {channelBudget.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 13 }} formatter={v => [`${v}%`]} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                  {channelBudget.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} />
                      <span style={{ fontSize: 11, color: COLORS.textSecondary }}>{item.name} ({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Why Community-First Wins</h3>
                <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8 }}>
                  For immigrant communities, trust flows through personal relationships — not banner ads. The WhatsApp growth playbook that Hudack himself references was built on word-of-mouth within diaspora communities.
                </div>
                <div style={{ marginTop: 16 }}>
                  {[
                    { stat: "92%", desc: "of Latinos trust recommendations from friends/family (Nielsen)" },
                    { stat: "3.2x", desc: "higher conversion from community events vs. digital ads in fintech (industry benchmark)" },
                    { stat: "68%", desc: "of Mexican immigrants in US send money home (Migration Policy Institute)" },
                    { stat: "$0", desc: "Sling's cost advantage — the demo IS the close" },
                  ].map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "baseline", marginBottom: 10 }}>
                      <span style={{ fontSize: 20, fontWeight: 800, color: COLORS.accent, minWidth: 52 }}>{s.stat}</span>
                      <span style={{ fontSize: 12, color: COLORS.textDim }}>{s.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KPIs & METRICS */}
        {active === "kpis" && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em" }}>KPIs & Scenario Modeling</h1>
            <p style={{ color: COLORS.textSecondary, fontSize: 14, marginBottom: 28 }}>The metrics that matter, and an illustrative scenario for what a successful 90-day corridor launch could produce.</p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
              <StatCard label="Installs (90d)" value="50K" sub="Illustrative scenario" color={COLORS.accent} />
              <StatCard label="Activated (KYC'd)" value="35K" sub="~70% of installs" color={COLORS.blue} />
              <StatCard label="First MX Transfer" value="22.5K" sub="~64% of activated" color={COLORS.green} />
              <StatCard label="Target CAC" value="<$8" sub="Benchmark goal" color={COLORS.purple} />
            </div>

            <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.textSecondary, marginBottom: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>Illustrative Growth Curve (90 Days)</h3>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px 20px 16px", marginBottom: 28 }}>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={kpiTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="day" stroke={COLORS.textDim} fontSize={12} />
                  <YAxis stroke={COLORS.textDim} fontSize={12} tickFormatter={v => v >= 1000 ? `${v / 1000}K` : v} />
                  <Tooltip contentStyle={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 13 }} formatter={v => [v.toLocaleString()]} />
                  <Legend wrapperStyle={{ fontSize: 12, color: COLORS.textSecondary }} />
                  <Line type="monotone" dataKey="installs" stroke={COLORS.accent} strokeWidth={3} dot={{ r: 4 }} name="Installs" />
                  <Line type="monotone" dataKey="activated" stroke={COLORS.blue} strokeWidth={3} dot={{ r: 4 }} name="Activated" />
                  <Line type="monotone" dataKey="firstTransfer" stroke={COLORS.green} strokeWidth={3} dot={{ r: 4 }} name="First MX Transfer" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "4px 0", marginBottom: 28, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    {["KPI", "Phase 1 (Day 30)", "Phase 2 (Day 60)", "Phase 3 (Day 90)", "Why It Matters"].map(h => (
                      <th key={h} style={{ padding: "14px 12px", textAlign: "left", fontSize: 11, fontWeight: 700, color: COLORS.textDim, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["KYC Completion Rate", "75%", "80%", "82%", "Gates all downstream metrics"],
                    ["Install → First MX Transfer", "30%", "40%", "45%", "True activation signal"],
                    ["Blended CAC", "$12", "$9", "<$8", "Unit economics for Series B"],
                    ["Week 4 Retention", "—", "40%", "45%", "Proves stickiness"],
                    ["Sling Links per User", "0.8", "1.5", "2.0", "Viral coefficient = free growth"],
                    ["NPS (corridor users)", "—", "55", "60+", "Word of mouth fuel"],
                    ["Avg Transaction Value", "$350", "$380", "$400", "Moving toward corridor avg ($395)"],
                    ["Monthly Transfers/User", "1.2", "1.8", "2.2", "Frequency = habit"],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{
                          padding: "12px 12px",
                          fontSize: 13,
                          color: j === 0 ? COLORS.text : COLORS.textSecondary,
                          fontWeight: j === 0 ? 600 : 400,
                        }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: `linear-gradient(135deg, ${COLORS.purple}12, transparent)`, border: `1px solid ${COLORS.purple}33`, borderRadius: 14, padding: "20px 24px" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.purple, marginBottom: 6 }}>The North Star Metric</h4>
              <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: 0, lineHeight: 1.7 }}>
                <strong style={{ color: COLORS.text }}>Monthly Active Senders to Mexico (MAS-MX)</strong> — users who complete ≥1 transfer to Mexico per month. This captures acquisition, activation, AND retention in one number. The metric I&apos;d obsess over from Day 1.
              </p>
            </div>
          </div>
        )}

        {/* CITY PLAYBOOKS */}
        {active === "cities" && (
          <CityPlaybooks />
        )}

        {/* BUDGET — REMOVED: too prescriptive for interview context */}
        {false && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em" }}>Budget & Resource Plan</h1>
            <p style={{ color: COLORS.textSecondary, fontSize: 14, marginBottom: 28 }}>Lean and focused — designed for a 40-person startup, not a Fortune 500.</p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
              <StatCard label="Total 90-Day Budget" value="$350K" sub="Marketing + ops spend" large color={COLORS.accent} />
              <StatCard label="Target CAC" value="<$8" sub="Blended all channels" large color={COLORS.blue} />
              <StatCard label="Cost per MX Transfer" value="<$16" sub="Full funnel: install→transfer" large color={COLORS.green} />
              <StatCard label="New Hires Needed" value="2-3" sub="Corridor-specific roles" large color={COLORS.purple} />
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "4px 0", marginBottom: 28, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    {["Line Item", "Phase 1", "Phase 2", "Phase 3", "Total", "Notes"].map(h => (
                      <th key={h} style={{ padding: "14px 12px", textAlign: "left", fontSize: 11, fontWeight: 700, color: COLORS.textDim, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Community Events", "$5K", "$40K", "$30K", "$75K", "5 cities × 3 events/city avg"],
                    ["Street Team Ops", "$0", "$25K", "$20K", "$45K", "Contract teams in LA, Houston, Chicago"],
                    ["Micro-Influencers", "$0", "$35K", "$50K", "$85K", "10-15 creators; scale winners"],
                    ["Referral Bonuses", "$5K", "$20K", "$30K", "$55K", "$10+$10 per referral; capped"],
                    ["Paid Digital (Meta/TikTok)", "$0", "$10K", "$30K", "$40K", "Scale Phase 3 only if CAC works"],
                    ["Content Production", "$10K", "$10K", "$10K", "$30K", "Bilingual video + design assets"],
                    ["PR/Earned Media", "$0", "$5K", "$10K", "$15K", "Latino media pitching"],
                    ["Localization/Translation", "$5K", "$0", "$0", "$5K", "One-time Spanish localization sprint"],
                    ["Total", "$25K", "$145K", "$180K", "$350K", ""],
                  ].map((row, i) => (
                    <tr key={i} style={{
                      borderBottom: `1px solid ${COLORS.border}`,
                      background: i === 8 ? `${COLORS.accent}11` : "transparent",
                    }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{
                          padding: "12px 12px",
                          fontSize: 13,
                          color: j === 0 || i === 8 ? COLORS.text : COLORS.textSecondary,
                          fontWeight: j === 0 || i === 8 ? 700 : 400,
                        }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Hiring Plan (2-3 roles)</h3>
                {[
                  { role: "US Community & Corridor Lead", loc: "LA or Houston", why: "Bilingual; owns events, street teams, partnerships in target cities" },
                  { role: "Bilingual Content Creator", loc: "Remote (US)", why: "TikTok/Reels native; Spanish-first; turns fees comparisons into viral content" },
                  { role: "Growth Analyst (stretch hire)", loc: "Remote", why: "Owns funnel analytics, CAC tracking, A/B testing on onboarding flow" },
                ].map((r, i) => (
                  <div key={i} style={{ marginBottom: 14, padding: "12px 16px", background: COLORS.surface, borderRadius: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>{r.role}</div>
                      <span style={{ fontSize: 11, color: COLORS.textDim, background: COLORS.border, padding: "2px 8px", borderRadius: 10 }}>{r.loc}</span>
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.textDim, marginTop: 4 }}>{r.why}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Why This Budget Works</h3>
                <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                  $350K is approximately 1.75% of the $20M raised. This is conservative enough to extend runway while aggressive enough to generate meaningful data for a Series B story.
                </div>
                {[
                  { label: "If we hit 50K installs at $350K spend:", value: "$7 blended CPI", color: COLORS.green },
                  { label: "If 22.5K complete first MX transfer:", value: "$15.56 per sending user", color: COLORS.blue },
                  { label: "If avg user sends $400/month × 6 months:", value: "$2,400 TPV per user", color: COLORS.accent },
                  { label: "Cohort TPV potential (22.5K users):", value: "$54M TPV in 6 months", color: COLORS.purple },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? `1px solid ${COLORS.border}` : "none" }}>
                    <span style={{ fontSize: 12, color: COLORS.textDim }}>{r.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RISKS & MITIGATIONS */}
        {active === "risks" && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em" }}>Risks & Mitigations</h1>
            <p style={{ color: COLORS.textSecondary, fontSize: 14, marginBottom: 28 }}>Every plan has risks. Here&apos;s what could go wrong, and how we&apos;re prepared.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
              {RISKS.map((risk, i) => (
                <div key={i} style={{
                  background: COLORS.card,
                  border: `1px solid ${risk.color}33`,
                  borderRadius: 14,
                  padding: "24px",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: risk.color }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20,
                      background: `${risk.color}22`, color: risk.color, letterSpacing: "0.05em", textTransform: "uppercase",
                    }}>{risk.category}</span>
                    <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
                      <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 8, background: COLORS.surface, color: COLORS.textDim }}>
                        L: {risk.likelihood}
                      </span>
                      <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 8, background: COLORS.surface, color: COLORS.textDim }}>
                        I: {risk.impact}
                      </span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 10 }}>{risk.title}</h3>
                  <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.7, marginBottom: 14 }}>{risk.description}</div>
                  <div style={{
                    background: `${risk.color}08`,
                    border: `1px solid ${risk.color}22`,
                    borderRadius: 10,
                    padding: "12px 16px",
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: risk.color, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>Mitigation</div>
                    <div style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.6 }}>{risk.mitigation}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: `linear-gradient(135deg, ${COLORS.green}12, transparent)`, border: `1px solid ${COLORS.green}33`, borderRadius: 14, padding: "20px 24px" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.green, marginBottom: 6 }}>The Meta-Risk: Doing Nothing</h4>
              <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: 0, lineHeight: 1.7 }}>
                The biggest risk isn&apos;t executing this plan imperfectly — it&apos;s <strong style={{ color: COLORS.text }}>not executing it at all</strong>. Sling has a structural cost advantage that competitors can&apos;t easily replicate. The window to establish corridor presence while the market is in flux won&apos;t stay open forever. Speed matters more than perfection.
              </p>
            </div>
          </div>
        )}

        {/* WHY ME */}
        {active === "whyme" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 32 }}>
              <img
                src="/headshot.jpg"
                alt="Simon Insinger"
                style={{
                  width: 80, height: 80, borderRadius: 40,
                  objectFit: "cover",
                  border: `3px solid ${COLORS.accent}`,
                  boxShadow: `0 0 20px ${COLORS.accent}22`,
                }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <div>
                <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.03em" }}>
                  Why <span style={{ color: COLORS.accent }}>Me</span>
                </h1>
                <p style={{ color: COLORS.textSecondary, fontSize: 15, lineHeight: 1.7, maxWidth: 720, margin: 0 }}>
                  This role needs someone who can sell to communities, ship with engineers, negotiate with counterparties, and move city-to-city building from zero. I&apos;ve done all four — repeatedly.
                </p>
              </div>
            </div>

            {/* The Rare Combination */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
              {[
                { title: "Operator", desc: "CEO of Agori — built GTM, partnerships, program ops, and contracting from zero. Negotiated high 5-figure deals with multi-billion-dollar quant firms.", color: COLORS.accent, icon: "⚡" },
                { title: "Crypto-Native", desc: "President of Michigan Blockchain. Manage >$50M in delegations. Build Polymarket trading bots. Started in crypto at 14.", color: COLORS.blue, icon: "◈" },
                { title: "Community Builder", desc: "Lead 200+ members at Michigan Blockchain. Organize the Midwest Blockchain Conference. Built multi-campus network through Agori. Grassroots distribution through events, ambassadors, and competitions.", color: COLORS.green, icon: "◎" },
                { title: "Distribution Executor", desc: "Built and sold a landscaping business. Ran investor DD and deal sourcing. Helped foreign founders break into US markets. City-by-city, network-by-network.", color: COLORS.purple, icon: "▶" },
              ].map((card, i) => (
                <div key={i} style={{
                  background: COLORS.card, border: `1px solid ${card.color}33`,
                  borderRadius: 14, padding: "20px", position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: card.color }} />
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: card.color, marginBottom: 8 }}>{card.title}</h3>
                  <div style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.7 }}>{card.desc}</div>
                </div>
              ))}
            </div>

            {/* Track Record */}
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px", marginBottom: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Track Record</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent, marginBottom: 10 }}>Revenue & Contracting</h4>
                  {[
                    "Negotiated high 5-figure contracts with multi-billion-dollar quant firms",
                    "Raised angel capital for Agori",
                    "Built and sold a landscaping business serving pro sports teams and athletes",
                    "Managed fund that grew 2,000%+",
                  ].map((t, i) => (
                    <div key={i} style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 16, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: COLORS.accent }}>›</span>{t}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: COLORS.green, marginBottom: 10 }}>Community & Distribution</h4>
                  {[
                    "200+ members led at Michigan Blockchain",
                    "Organized the Midwest Blockchain Conference at Michigan",
                    "~50 students taught per semester",
                    ">$50M in validator delegations managed",
                    "Multi-campus network built through Agori competitions",
                    "Accepted to Nucleus NEXT Fellowship — mentored by top VCs",
                  ].map((t, i) => (
                    <div key={i} style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8, paddingLeft: 16, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: COLORS.green }}>›</span>{t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Why This Problem */}
            <div style={{ background: COLORS.card, borderLeft: `4px solid ${COLORS.accent}`, borderRadius: "0 14px 14px 0", padding: "24px", marginBottom: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.accent, marginBottom: 12 }}>Why This Problem</h3>
              <div style={{ fontSize: 14, color: COLORS.textSecondary, lineHeight: 1.8 }}>
                Running a crypto fund, I worked closely with foreign founders — world-class operators constrained by weak local economies and broken payment rails. I watched talented people produce incredible work and fail to capture the upside because their currencies, settlement systems, and access to US markets were fundamentally broken.
              </div>
              <div style={{ fontSize: 14, color: COLORS.textSecondary, lineHeight: 1.8, marginTop: 12 }}>
                I&apos;ve been telling friends I&apos;d do cross-border payments after my current venture. Sling is the company building what I&apos;ve been angry about — <strong style={{ color: COLORS.text }}>real economic utility on real rails</strong>. I don&apos;t want to build another dashboard for traders. I want to build distribution that gets people paid.
              </div>
            </div>

            {/* Direct Fit */}
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px", marginBottom: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Direct Fit: Role Requirements → My Experience</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                {[
                  { need: "Grassroots community activation", have: "Built Michigan Blockchain to 200+ members; multi-campus Agori network; event-led distribution" },
                  { need: "Partnership & enterprise sales", have: "High 5-figure quant-firm contracts; sponsor/recruiter pipeline; stakeholder management at scale" },
                  { need: "Crypto/stablecoin fluency", have: "Solana validator operator; >$50M delegations; Polymarket bot builder; crypto since age 14" },
                  { need: "City-by-city field execution", have: "Multi-city network built through Agori + Blockchain; frequent travel to LA, SF, Denver; flexible schedule (Mon/Wed classes)" },
                  { need: "Startup intensity (40-person team)", have: "Founded Agori from zero; built and sold a services business; fund operator; doesn't need motivation — needs difficulty" },
                  { need: "Cross-border / diaspora understanding", have: "Operated a crypto fund helping foreign founders access US markets; firsthand exposure to payment friction and economic mismatch" },
                ].map((row, i) => (
                  <div key={i} style={{
                    padding: "14px 16px",
                    borderBottom: i < 4 ? `1px solid ${COLORS.border}` : "none",
                    borderRight: i % 2 === 0 ? `1px solid ${COLORS.border}` : "none",
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.accent, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>
                      {row.need}
                    </div>
                    <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.6 }}>{row.have}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logistics */}
            <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
              <StatCard label="Base" value="Michigan" sub="Sophomore — Business & BCN, Entrepreneurship minor" color={COLORS.blue} />
              <StatCard label="Schedule" value="Flexible" sub="Classes Mon/Wed only — rest is execution" color={COLORS.green} />
              <StatCard label="Travel" value="Frequent" sub="LA, SF, Denver regularly" color={COLORS.accent} />
              <StatCard label="Spanish" value="Functional" sub="Committed to rapid improvement" color={COLORS.purple} />
            </div>

            <div style={{ background: `linear-gradient(135deg, ${COLORS.accent}15, ${COLORS.accent}05)`, border: `1px solid ${COLORS.accent}33`, borderRadius: 14, padding: "20px 24px" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, marginBottom: 6 }}>The Ask</h4>
              <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: 0, lineHeight: 1.7 }}>
                I built this dashboard not because I had to, but because <strong style={{ color: COLORS.text }}>this is the kind of problem I obsess over</strong> — distribution for products that matter, in markets that are underserved, using playbooks I&apos;ve run before. I&apos;m not looking for a job. I&apos;m looking for the right problem at the right company. <strong style={{ color: COLORS.text }}>Sling is it.</strong>
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
