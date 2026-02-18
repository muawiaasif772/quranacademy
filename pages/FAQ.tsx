import React, { useState, useMemo, useRef, useEffect } from "react";
import { FAQS } from "../data";
import {
  ChevronDown,
  Search,
  MessageSquare,
  Phone,
  HelpCircle,
  BookOpen,
  CreditCard,
  Video,
  Users,
  Star,
  ArrowRight,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// STYLES — same palette as HowItWorks / Tutors / Pricing
// ─────────────────────────────────────────────────────────────────────────────
const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,600&family=Cinzel:wght@400;600;700;900&family=Nunito:wght@400;500;600;700;800&display=swap');

  :root {
    --deep:    #020b06;
    --forest:  #051610;
    --em-lt:   #2fcf87;
    --gold:    #c9973a;
    --gold-m:  #e4b558;
    --gold-lt: #f5d98e;
  }

  .hex-bg {
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='.3' opacity='.055' d='M40 4L76 24L76 56L40 76L4 56L4 24Z'/%3E%3C/svg%3E");
  }
  .diamond-bg {
    background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 2L58 30L30 58L2 30Z' fill='none' stroke='%23c9973a' stroke-width='.4' opacity='.08'/%3E%3C/svg%3E");
  }

  @keyframes fadeUp    { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimText  { 0%{background-position:-500px 0} 100%{background-position:500px 0} }
  @keyframes glowPulse { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:.75;transform:scale(1.06)} }
  @keyframes shimBar   { 0%{left:-100%} 100%{left:200%} }
  @keyframes rotateSlow{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

  .gold-shimmer {
    background:linear-gradient(90deg,var(--gold) 0%,var(--gold-lt) 35%,#fff8e0 50%,var(--gold-lt) 65%,var(--gold) 100%);
    background-size:500px 100%;
    animation:shimText 4s linear infinite;
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  }
  .gold-text {
    background:linear-gradient(135deg,var(--gold-lt) 0%,var(--gold-m) 50%,var(--gold) 100%);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  }
  .glow-pulse { animation:glowPulse 4s ease-in-out infinite; }
  .float-anim { animation:float 5s ease-in-out infinite; }

  .h1{animation:fadeUp .7s cubic-bezier(.16,1,.3,1) both}
  .h2{animation:fadeUp .7s .1s cubic-bezier(.16,1,.3,1) both}
  .h3{animation:fadeUp .7s .2s cubic-bezier(.16,1,.3,1) both}
  .h4{animation:fadeUp .7s .3s cubic-bezier(.16,1,.3,1) both}

  .sec-label {
    font-family:'Cinzel',serif;font-size:11px;font-weight:700;
    letter-spacing:.28em;text-transform:uppercase;color:var(--gold);
  }

  /* shimmer sweep on cards */
  .shb{position:relative;overflow:hidden;}
  .shb::after{
    content:'';position:absolute;inset:0;pointer-events:none;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent);
    animation:shimBar 3.5s ease-in-out infinite;
  }

  /* search input */
  .faq-search {
    width:100%;
    background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.09);
    border-radius:18px;
    padding:16px 20px 16px 52px;
    color:#fff;
    font-family:'Nunito',sans-serif;font-size:15px;font-weight:600;
    outline:none;transition:all .3s;
  }
  .faq-search::placeholder{color:rgba(255,255,255,.22);}
  .faq-search:focus{
    border-color:rgba(201,151,58,.45);
    background:rgba(255,255,255,.06);
    box-shadow:0 0 0 4px rgba(201,151,58,.08);
  }

  /* category pill */
  .cat-pill {
    display:inline-flex;align-items:center;gap:7px;
    padding:9px 20px;border-radius:100px;
    font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:.16em;
    text-transform:uppercase;cursor:pointer;
    border:1px solid rgba(255,255,255,.08);
    color:rgba(255,255,255,.42);background:rgba(255,255,255,.03);
    transition:all .25s;white-space:nowrap;
  }
  .cat-pill:hover{color:var(--gold-lt);border-color:rgba(201,151,58,.3);background:rgba(201,151,58,.06);}
  .cat-pill-a{
    background:linear-gradient(135deg,rgba(201,151,58,.2),rgba(201,151,58,.08))!important;
    border-color:rgba(201,151,58,.5)!important;color:var(--gold-lt)!important;
    box-shadow:0 4px 16px rgba(201,151,58,.15)!important;
  }

  /* faq accordion */
  .faq-item {
    border:1px solid rgba(255,255,255,.07);
    border-radius:20px;overflow:hidden;
    transition:border-color .3s, box-shadow .3s, transform .3s;
    background:rgba(255,255,255,.025);
    position:relative;
  }
  .faq-item::before {
    content:'';position:absolute;top:0;left:0;right:0;height:2px;
    background:linear-gradient(90deg,transparent,rgba(201,151,58,.0),transparent);
    transition:background .3s;
  }
  .faq-item:hover { border-color:rgba(201,151,58,.2); transform:translateX(4px); }
  .faq-item:hover::before { background:linear-gradient(90deg,transparent,rgba(201,151,58,.4),transparent); }
  .faq-item.faq-open {
    border-color:rgba(201,151,58,.4)!important;
    box-shadow:0 12px 40px rgba(0,0,0,.35),0 0 0 1px rgba(201,151,58,.15)!important;
    transform:translateX(0)!important;
  }
  .faq-item.faq-open::before { background:linear-gradient(90deg,transparent,var(--gold),transparent)!important; }

  .faq-trigger {
    width:100%;display:flex;align-items:center;justify-content:space-between;
    padding:24px 28px;background:none;border:none;cursor:pointer;text-align:left;gap:16px;
  }

  /* contact card */
  .contact-card {
    background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);
    border-radius:22px;padding:32px 28px;text-align:center;
    transition:transform .35s ease,border-color .3s,box-shadow .35s;
    position:relative;overflow:hidden;
  }
  .contact-card:hover {
    transform:translateY(-8px);
    box-shadow:0 32px 64px rgba(0,0,0,.4);
  }

  /* stat counter */
  .stat-pill {
    display:flex;flex-direction:column;align-items:center;gap:4px;
    padding:20px 28px;
    background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);
    border-radius:16px;text-align:center;
  }

  /* highlighted answer keyword */
  .ans-highlight { color:var(--gold-m); font-weight:700; }

  /* no results */
  .no-results {
    text-align:center;padding:60px 24px;
    color:rgba(255,255,255,.3);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// FALLBACK DATA (used if FAQS import is empty)
// ─────────────────────────────────────────────────────────────────────────────
const FALLBACK_FAQS = [
  {
    id: "f1",
    category: "Getting Started",
    question: "How do I start learning Quran online?",
    answer:
      "Simply book a free 30-minute trial session — no credit card required. Our team will match you with a certified tutor based on your level, language, and goals. You'll get instant access to our learning portal.",
  },
  {
    id: "f2",
    category: "Getting Started",
    question: "Is there a free trial available?",
    answer:
      "Yes! Every new student receives a completely free 30-minute introductory session. This helps you meet your tutor, experience our platform, and decide if we're the right fit — with absolutely no obligation to continue.",
  },
  {
    id: "f3",
    category: "Tutors",
    question: "Are all tutors certified and qualified?",
    answer:
      "Every tutor on our platform is an Ijazah-certified scholar, many holding degrees from Al-Azhar University. All tutors undergo background checks, credential verification, and a trial teaching assessment before joining.",
  },
  {
    id: "f4",
    category: "Tutors",
    question: "Can I choose my own tutor?",
    answer:
      "On Family and Elite plans you can browse our roster and request a specific tutor. On Starter, we match you based on gender, language, and age-group preferences to ensure the best learning environment.",
  },
  {
    id: "f5",
    category: "Classes",
    question: "What subjects can I learn?",
    answer:
      "We offer Noorani Qaida, Quran Recitation, Tajweed, Quran Memorization (Hifz), Arabic Language, and Islamic Studies. Each subject is available from beginner to advanced level.",
  },
  {
    id: "f6",
    category: "Classes",
    question: "How long is each session?",
    answer:
      "Standard sessions are 45 minutes. On Elite plans you can request extended 60-minute sessions. The free trial is 30 minutes and gives a genuine taste of the full experience.",
  },
  {
    id: "f7",
    category: "Classes",
    question: "Can I reschedule or cancel a class?",
    answer:
      "You may reschedule any session up to 2 hours before the start time with no penalty. Cancellations with less notice count against your monthly allowance on Starter plans, but Elite students have unlimited flexibility.",
  },
  {
    id: "f8",
    category: "Pricing",
    question: "Are there any hidden fees?",
    answer:
      "None whatsoever. The price shown on our plans is the only price you pay. No registration fee, no material fee, no platform fee. We believe in complete pricing transparency.",
  },
  {
    id: "f9",
    category: "Pricing",
    question: "Do you offer a money-back guarantee?",
    answer:
      "Yes — we offer a full 30-day money-back guarantee on your first month. If you are not satisfied for any reason, contact our support team and we will issue a complete refund, no questions asked.",
  },
  {
    id: "f10",
    category: "Technical",
    question: "What do I need to attend classes?",
    answer:
      "A stable internet connection, a device with a camera and microphone (laptop, tablet, or phone), and a quiet space. Our platform works in any modern browser — no downloads needed.",
  },
  {
    id: "f11",
    category: "Technical",
    question: "Is my payment information safe?",
    answer:
      "All payments are processed through Stripe, which holds PCI-DSS Level 1 certification — the highest level of payment security. We never store your card details on our servers.",
  },
  {
    id: "f12",
    category: "Family",
    question: "Can multiple children share one account?",
    answer:
      "On Family and Elite plans, siblings can each have their own tutor, schedule, and progress tracking under one family account. Sibling discounts of 20% apply from the second student onwards.",
  },
];

const CATEGORIES = [
  "All",
  "Getting Started",
  "Tutors",
  "Classes",
  "Pricing",
  "Technical",
  "Family",
];

const CAT_ICONS: Record<string, React.ElementType> = {
  All: HelpCircle,
  "Getting Started": BookOpen,
  Tutors: Users,
  Classes: Video,
  Pricing: CreditCard,
  Technical: MessageSquare,
  Family: Star,
};

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL REVEAL HOOK
// ─────────────────────────────────────────────────────────────────────────────
const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
};

// ─────────────────────────────────────────────────────────────────────────────
// FAQ ACCORDION ITEM
// ─────────────────────────────────────────────────────────────────────────────
const FaqItem = ({
  faq,
  isOpen,
  onToggle,
  idx,
  accent,
}: {
  faq: { id: string; question: string; answer: string; category?: string };
  isOpen: boolean;
  onToggle: () => void;
  idx: number;
  accent: string;
}) => (
  <div
    className={`faq-item${isOpen ? " faq-open" : ""}`}
    style={{ animationDelay: `${idx * 0.05}s` }}
  >
    <button className="faq-trigger" onClick={onToggle}>
      {/* number */}
      <span
        style={{
          fontFamily: "'Cinzel',serif",
          fontSize: 11,
          fontWeight: 700,
          color: isOpen ? accent : "rgba(255,255,255,.2)",
          letterSpacing: ".1em",
          flexShrink: 0,
          minWidth: 28,
          transition: "color .3s",
        }}
      >
        {String(idx + 1).padStart(2, "0")}
      </span>

      <span
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(16px,2vw,20px)",
          fontWeight: 700,
          color: isOpen ? "#fff" : "rgba(255,255,255,.8)",
          lineHeight: 1.35,
          flex: 1,
          transition: "color .3s",
        }}
      >
        {faq.question}
      </span>

      {/* chevron button */}
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          flexShrink: 0,
          background: isOpen
            ? `linear-gradient(135deg,${accent}cc,${accent}88)`
            : "rgba(255,255,255,.05)",
          border: `1px solid ${isOpen ? accent + "60" : "rgba(255,255,255,.1)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isOpen ? "#020b06" : "rgba(255,255,255,.45)",
          transition: "all .35s cubic-bezier(.16,1,.3,1)",
          boxShadow: isOpen ? `0 4px 16px ${accent}40` : "none",
        }}
      >
        <ChevronDown
          size={16}
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform .35s",
          }}
        />
      </div>
    </button>

    {/* answer panel */}
    <div
      style={{
        maxHeight: isOpen ? 400 : 0,
        overflow: "hidden",
        transition: "max-height .45s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <div style={{ padding: "0 28px 28px 64px" }}>
        {/* accent divider */}
        <div
          style={{
            height: 1,
            marginBottom: 18,
            background: `linear-gradient(90deg,${accent}50,transparent)`,
          }}
        />
        <p
          style={{
            color: "rgba(255,255,255,.55)",
            fontSize: 15,
            lineHeight: 1.9,
            fontFamily: "'Nunito',sans-serif",
          }}
        >
          {faq.answer}
        </p>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export const FAQ: React.FC = () => {
  const allFaqs = (FAQS && FAQS.length ? FAQS : FALLBACK_FAQS) as any[];

  const [openId, setOpenId] = useState<string | null>(allFaqs[0]?.id ?? null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const heroReveal = useReveal();
  const listReveal = useReveal();
  const contactReveal = useReveal();

  // accent colours per category
  const accentMap: Record<string, string> = {
    "Getting Started": "#c9973a",
    Tutors: "#2fcf87",
    Classes: "#7eb8ff",
    Pricing: "#ff8fa3",
    Technical: "#b58cff",
    Family: "#ffd166",
    All: "#c9973a",
  };

  const filtered = useMemo(() => {
    return allFaqs.filter((f) => {
      const matchCat = category === "All" || (f.category || "") === category;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [allFaqs, category, search]);

  // stats
  const totalFaqs = allFaqs.length;
  const totalCats = [
    ...new Set(allFaqs.map((f: any) => f.category).filter(Boolean)),
  ].length;
  const openedPct = Math.round(
    (filtered.filter((f) => f.id === openId).length /
      Math.max(filtered.length, 1)) *
      100,
  );

  return (
    <>
      <style>{pageStyles}</style>
      <div
        style={{
          fontFamily: "'Nunito',sans-serif",
          background: "var(--deep)",
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        {/* ══════════════════════ HERO */}
        <section
          style={{
            background:
              "radial-gradient(ellipse 130% 80% at 20% 0%,#0d4a2a 0%,transparent 55%),radial-gradient(ellipse 80% 100% at 85% 100%,#062418 0%,transparent 50%),#020b06",
            padding: "110px 24px 80px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="hex-bg"
            style={{ position: "absolute", inset: 0, opacity: 0.6 }}
          />

          {/* Arabic watermark */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "-2%",
              transform: "translateY(-50%)",
              fontFamily: "serif",
              fontSize: "clamp(140px,18vw,280px)",
              color: "rgba(255,255,255,.016)",
              fontWeight: 700,
              userSelect: "none",
              pointerEvents: "none",
              lineHeight: 1,
            }}
          >
            سؤال
          </div>

          <div
            className="glow-pulse"
            style={{
              position: "absolute",
              top: "-8%",
              left: "8%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(22,160,92,.1) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* gold top border */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background:
                "linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",
            }}
          />

          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              textAlign: "center",
            }}
          >
            {/* label row */}
            <div
              className="h1"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  height: 1,
                  width: 60,
                  background:
                    "linear-gradient(90deg,transparent,rgba(201,151,58,.6))",
                }}
              />
              <span style={{ color: "var(--gold)", fontSize: 10 }}>✦</span>
              <span className="sec-label">Knowledge Base</span>
              <span style={{ color: "var(--gold)", fontSize: 10 }}>✦</span>
              <div
                style={{
                  height: 1,
                  width: 60,
                  background:
                    "linear-gradient(90deg,rgba(201,151,58,.6),transparent)",
                }}
              />
            </div>

            <h1
              className="h2"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(44px,7vw,88px)",
                fontWeight: 300,
                color: "#fff",
                lineHeight: 1.08,
                marginBottom: 20,
              }}
            >
              Common
              <br />
              <span className="gold-shimmer" style={{ fontWeight: 700 }}>
                Questions
              </span>
            </h1>

            <p
              className="h3"
              style={{
                color: "rgba(255,255,255,.45)",
                fontSize: 18,
                lineHeight: 1.85,
                maxWidth: 520,
                margin: "0 auto 44px",
              }}
            >
              Everything you need to know about our academy, tutors, classes,
              and pricing — answered clearly.
            </p>

            {/* search bar */}
            <div
              className="h4"
              style={{
                position: "relative",
                maxWidth: 560,
                margin: "0 auto 36px",
              }}
            >
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: 18,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(255,255,255,.3)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="faq-search"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,.08)",
                    border: "1px solid rgba(255,255,255,.1)",
                    color: "rgba(255,255,255,.5)",
                    borderRadius: 8,
                    padding: "4px 10px",
                    cursor: "pointer",
                    fontFamily: "'Cinzel',serif",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: ".12em",
                  }}
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* stats strip */}
            <div
              className="h4"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 32,
                flexWrap: "wrap",
              }}
            >
              {[
                { value: `${totalFaqs}+`, label: "Questions answered" },
                { value: `${totalCats}`, label: "Topic categories" },
                { value: "24/7", label: "Support available" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "var(--gold-m)",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,.3)",
                      fontSize: 11,
                      letterSpacing: ".08em",
                      marginTop: 4,
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ CATEGORY FILTER */}
        <div
          style={{
            background: "rgba(2,11,6,.97)",
            borderTop: "1px solid rgba(255,255,255,.05)",
            borderBottom: "1px solid rgba(255,255,255,.05)",
            padding: "14px 24px",
            position: "sticky",
            top: 0,
            zIndex: 50,
            backdropFilter: "blur(24px)",
          }}
        >
          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            {CATEGORIES.map((cat) => {
              const Icon = CAT_ICONS[cat] || HelpCircle;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`cat-pill${category === cat ? " cat-pill-a" : ""}`}
                  style={{ border: "none", cursor: "pointer" }}
                >
                  <Icon size={11} />
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════ FAQ LIST */}
        <section
          style={{
            padding: "72px 24px 100px",
            background:
              "linear-gradient(180deg,var(--forest) 0%,var(--deep) 100%)",
            position: "relative",
          }}
        >
          <div
            className="hex-bg"
            style={{ position: "absolute", inset: 0, opacity: 0.4 }}
          />
          <div
            ref={listReveal.ref}
            style={{
              maxWidth: 860,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              opacity: listReveal.vis ? 1 : 0,
              transform: listReveal.vis ? "translateY(0)" : "translateY(32px)",
              transition: "opacity .7s ease, transform .7s ease",
            }}
          >
            {/* result count */}
            {search && (
              <div
                style={{
                  marginBottom: 24,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span className="sec-label">
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""} for
                  "{search}"
                </span>
              </div>
            )}

            {/* category heading */}
            {!search && category !== "All" && (
              <div
                style={{
                  marginBottom: 32,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: `${accentMap[category]}18`,
                    border: `1px solid ${accentMap[category]}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: accentMap[category],
                  }}
                >
                  {React.createElement(CAT_ICONS[category] || HelpCircle, {
                    size: 20,
                  })}
                </div>
                <div>
                  <p
                    className="sec-label"
                    style={{ color: accentMap[category] }}
                  >
                    {category}
                  </p>
                  <p style={{ color: "rgba(255,255,255,.3)", fontSize: 12 }}>
                    {filtered.length} question{filtered.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="no-results">
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 48,
                    marginBottom: 8,
                  }}
                >
                  🔍
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 28,
                    color: "rgba(255,255,255,.4)",
                    marginBottom: 8,
                  }}
                >
                  No questions found
                </p>
                <p style={{ fontSize: 14 }}>
                  Try a different search term or category
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                  style={{
                    marginTop: 20,
                    padding: "10px 24px",
                    borderRadius: 100,
                    background: "rgba(201,151,58,.12)",
                    border: "1px solid rgba(201,151,58,.3)",
                    color: "var(--gold-lt)",
                    cursor: "pointer",
                    fontFamily: "'Cinzel',serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: ".14em",
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {filtered.map((faq: any, idx: number) => {
                  const cat = faq.category || "All";
                  const accent = accentMap[cat] || "var(--gold)";
                  return (
                    <FaqItem
                      key={faq.id}
                      faq={faq}
                      isOpen={openId === faq.id}
                      onToggle={() =>
                        setOpenId(openId === faq.id ? null : faq.id)
                      }
                      idx={idx}
                      accent={accent}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════ STILL HAVE QUESTIONS — contact cards */}
        <section
          ref={contactReveal.ref}
          style={{
            background: "var(--deep)",
            padding: "80px 24px 100px",
            position: "relative",
            overflow: "hidden",
            opacity: contactReveal.vis ? 1 : 0,
            transform: contactReveal.vis ? "translateY(0)" : "translateY(32px)",
            transition: "opacity .7s ease, transform .7s ease",
          }}
        >
          <div
            className="diamond-bg"
            style={{ position: "absolute", inset: 0 }}
          />
          <div
            className="glow-pulse"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 600,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse,rgba(201,151,58,.04) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 14,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    height: 1,
                    width: 60,
                    background:
                      "linear-gradient(90deg,transparent,rgba(201,151,58,.6))",
                  }}
                />
                <span style={{ color: "var(--gold)", fontSize: 10 }}>✦</span>
                <span className="sec-label">We're Here For You</span>
                <span style={{ color: "var(--gold)", fontSize: 10 }}>✦</span>
                <div
                  style={{
                    height: 1,
                    width: 60,
                    background:
                      "linear-gradient(90deg,rgba(201,151,58,.6),transparent)",
                  }}
                />
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(28px,4vw,52px)",
                  fontWeight: 600,
                  color: "#fff",
                  marginBottom: 14,
                }}
              >
                Still Have <span className="gold-text">Questions?</span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,.35)",
                  fontSize: 16,
                  maxWidth: 480,
                  margin: "0 auto",
                }}
              >
                Our team of scholars and support staff is available around the
                clock to help you.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "clamp(16px, 4vw, 24px)",
              }}
            >
              {/* Live Chat */}
              <div
                className="contact-card shb"
                style={{ borderColor: "rgba(201,151,58,.15)" }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background:
                      "linear-gradient(90deg,transparent,var(--gold),transparent)",
                  }}
                />
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    margin: "0 auto 20px",
                    background: "rgba(201,151,58,.15)",
                    border: "1px solid rgba(201,151,58,.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gold)",
                    boxShadow: "0 0 24px rgba(201,151,58,.15)",
                  }}
                >
                  <MessageSquare size={24} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 10,
                  }}
                >
                  Live Chat
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,.35)",
                    fontSize: 13,
                    lineHeight: 1.7,
                    marginBottom: 24,
                  }}
                >
                  Chat with our academic team instantly. Available 24/7 for any
                  questions.
                </p>
                <Link
                  to="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background:
                      "linear-gradient(135deg,var(--gold-m),var(--gold))",
                    color: "#020b06",
                    padding: "11px 24px",
                    borderRadius: 12,
                    fontFamily: "'Cinzel',serif",
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: ".1em",
                    textDecoration: "none",
                    boxShadow: "0 4px 16px rgba(201,151,58,.3)",
                  }}
                >
                  Start Chat <ArrowRight size={12} />
                </Link>
              </div>

              {/* WhatsApp */}
              <div
                className="contact-card shb"
                style={{ borderColor: "rgba(47,207,135,.15)" }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background:
                      "linear-gradient(90deg,transparent,#2fcf87,transparent)",
                  }}
                />
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    margin: "0 auto 20px",
                    background: "rgba(47,207,135,.15)",
                    border: "1px solid rgba(47,207,135,.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2fcf87",
                    boxShadow: "0 0 24px rgba(47,207,135,.15)",
                  }}
                >
                  <Phone size={24} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 10,
                  }}
                >
                  WhatsApp
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,.35)",
                    fontSize: 13,
                    lineHeight: 1.7,
                    marginBottom: 24,
                  }}
                >
                  Message us on WhatsApp for a quick response from our support
                  team.
                </p>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(47,207,135,.15)",
                    border: "1px solid rgba(47,207,135,.35)",
                    color: "#2fcf87",
                    padding: "11px 24px",
                    borderRadius: 12,
                    fontFamily: "'Cinzel',serif",
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: ".1em",
                    textDecoration: "none",
                  }}
                >
                  WhatsApp Now <ArrowRight size={12} />
                </a>
              </div>

              {/* Email */}
              <div
                className="contact-card shb"
                style={{ borderColor: "rgba(127,178,255,.15)" }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background:
                      "linear-gradient(90deg,transparent,#7eb8ff,transparent)",
                  }}
                />
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    margin: "0 auto 20px",
                    background: "rgba(127,178,255,.15)",
                    border: "1px solid rgba(127,178,255,.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#7eb8ff",
                    boxShadow: "0 0 24px rgba(127,178,255,.12)",
                  }}
                >
                  <Mail size={24} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 10,
                  }}
                >
                  Email Support
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,.35)",
                    fontSize: 13,
                    lineHeight: 1.7,
                    marginBottom: 24,
                  }}
                >
                  Send us a detailed email and we'll respond within 2 business
                  hours.
                </p>
                <a
                  href="mailto:support@academy.com"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(127,178,255,.12)",
                    border: "1px solid rgba(127,178,255,.3)",
                    color: "#7eb8ff",
                    padding: "11px 24px",
                    borderRadius: 12,
                    fontFamily: "'Cinzel',serif",
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: ".1em",
                    textDecoration: "none",
                  }}
                >
                  Send Email <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════ BOTTOM CTA */}
        <section
          style={{
            background:
              "radial-gradient(ellipse 120% 80% at 50% 50%,#0d4a2a 0%,#020b06 70%)",
            padding: "100px 24px",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <div
            className="hex-bg"
            style={{ position: "absolute", inset: 0, opacity: 0.6 }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 600,
              height: 600,
              borderRadius: "50%",
              border: "1px dashed rgba(201,151,58,.1)",
              animation: "rotateSlow 50s linear infinite",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              width: 180,
              height: 1,
              margin: "0 auto 52px",
              background:
                "linear-gradient(90deg,transparent,var(--gold),transparent)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 680,
              margin: "0 auto",
            }}
          >
            <p
              className="sec-label"
              style={{ marginBottom: 20, display: "block" }}
            >
              Ready to Begin?
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(32px,5vw,68px)",
                fontWeight: 300,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >
              Start Your
              <br />
              <span
                className="gold-shimmer"
                style={{ fontWeight: 700, fontStyle: "italic" }}
              >
                Quranic Journey
              </span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,.4)",
                fontSize: 17,
                lineHeight: 1.85,
                maxWidth: 500,
                margin: "0 auto 44px",
              }}
            >
              Book your free trial and experience world-class Quranic education
              — no credit card required.
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/book-free-trial"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background:
                    "linear-gradient(135deg,var(--gold-m),var(--gold))",
                  color: "#020b06",
                  padding: "18px 48px",
                  borderRadius: 16,
                  fontFamily: "'Cinzel',serif",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: ".1em",
                  textDecoration: "none",
                  boxShadow:
                    "0 8px 32px rgba(201,151,58,.4),inset 0 1px 0 rgba(255,255,255,.25)",
                }}
              >
                <span style={{ fontSize: 16 }}>✦</span> Book Free Trial{" "}
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.12)",
                  color: "rgba(255,255,255,.7)",
                  padding: "18px 36px",
                  borderRadius: 16,
                  fontFamily: "'Cinzel',serif",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: ".1em",
                  textDecoration: "none",
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div
            style={{
              width: 180,
              height: 1,
              margin: "52px auto 0",
              background:
                "linear-gradient(90deg,transparent,var(--gold),transparent)",
            }}
          />
        </section>
      </div>
    </>
  );
};
