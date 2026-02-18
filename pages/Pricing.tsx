"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  X,
  Star,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Lock,
  Heart,
  Gift,
  BookOpen,
  Video,
  MessageCircle,
  ChevronDown,
  Sparkles,
  Crown,
  Gem,
  Calculator,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// STYLES (Responsive + reduced section padding + animated trust icons)
// ─────────────────────────────────────────────────────────────────────────────
const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,600&family=Cinzel:wght@400;600;700;900&family=Nunito:wght@400;500;600;700;800&display=swap');

  :root {
    --deep:    #020b06;
    --forest:  #051610;
    --em-dk:   #0a2e18;
    --em-md:   #0e4224;
    --em-lt:   #2fcf87;
    --gold:    #c9973a;
    --gold-m:  #e4b558;
    --gold-lt: #f5d98e;
  }

  * { box-sizing: border-box; }
  html, body { max-width: 100%; overflow-x: hidden; }
  img, svg, video, iframe { max-width: 100%; }
  a { color: inherit; }

  .hex-bg {
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='.3' opacity='.055' d='M40 4L76 24L76 56L40 76L4 56L4 24Z'/%3E%3C/svg%3E");
  }
  .diamond-bg {
    background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 2L58 30L30 58L2 30Z' fill='none' stroke='%23c9973a' stroke-width='.4' opacity='.08'/%3E%3C/svg%3E");
  }

  @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimText  { 0%{background-position:-500px 0} 100%{background-position:500px 0} }
  @keyframes glowPulse { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:.75;transform:scale(1.06)} }
  @keyframes rotateSlow{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes shimBar   { 0%{left:-100%} 100%{left:200%} }
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

  /* trust icon animations */
  @keyframes iconPop { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
  @keyframes iconSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
  @keyframes iconWiggle { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(8deg)} }

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
  .h5{animation:fadeUp .7s .4s cubic-bezier(.16,1,.3,1) both}

  .sec-label {
    font-family:'Cinzel',serif;font-size:11px;font-weight:700;
    letter-spacing:.28em;text-transform:uppercase;color:var(--gold);
  }

  /* shimmer sweep */
  .shb{position:relative;overflow:hidden;}
  .shb::after{
    content:'';position:absolute;inset:0;pointer-events:none;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent);
    animation:shimBar 3.5s ease-in-out infinite;
  }

  /* badge */
  .badge{
    display:inline-flex;align-items:center;gap:6px;
    padding:4px 10px;border-radius:100px;
    font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:.12em;
    text-transform:uppercase;
    white-space:nowrap;
  }

  /* plan card */
  .plan-card {
    background:rgba(255,255,255,.025);
    border:1px solid rgba(255,255,255,.07);
    border-radius:28px;
    overflow:hidden;
    transition:transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s ease, border-color .3s;
    position:relative;
  }
  .plan-card:hover {
    transform:translateY(-12px);
    box-shadow:0 48px 96px rgba(0,0,0,.5),0 0 0 1px rgba(201,151,58,.25);
  }
  .plan-card-popular {
    border-color:rgba(201,151,58,.4)!important;
    box-shadow:0 24px 64px rgba(0,0,0,.4),0 0 0 1px rgba(201,151,58,.2);
    transform:translateY(-8px) scale(1.02);
  }
  .plan-card-popular:hover {
    transform:translateY(-20px) scale(1.02)!important;
    box-shadow:0 56px 100px rgba(0,0,0,.55),0 0 0 1px rgba(201,151,58,.45)!important;
  }

  /* feature check row */
  .feat-row {
    display:flex;align-items:flex-start;gap:10px;
    padding:9px 0;
    border-bottom:1px solid rgba(255,255,255,.04);
    transition:background .2s;
  }
  .feat-row:last-child{border-bottom:none;}
  .feat-row:hover{background:rgba(255,255,255,.02);border-radius:8px;padding-left:6px;}

  /* FAQ */
  .faq-item {
    border:1px solid rgba(255,255,255,.07);
    border-radius:18px;
    overflow:hidden;
    transition:border-color .3s, box-shadow .3s;
    margin-bottom:12px;
  }
  .faq-item:hover{border-color:rgba(201,151,58,.25);}
  .faq-item.open{border-color:rgba(201,151,58,.35);box-shadow:0 8px 32px rgba(0,0,0,.3);}
  .faq-trigger{
    width:100%;display:flex;align-items:center;justify-content:space-between;
    padding:18px 22px;background:none;border:none;cursor:pointer;
    text-align:left;gap:16px;
  }

  /* toggle pill */
  .toggle-wrap{
    display:inline-flex;align-items:center;gap:0;
    background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);
    border-radius:100px;padding:4px;
    flex-wrap:wrap;
  }
  .toggle-btn{
    padding:9px 22px;border-radius:100px;border:none;cursor:pointer;
    font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.12em;
    text-transform:uppercase;transition:all .3s;color:rgba(255,255,255,.4);background:transparent;
    white-space:nowrap;
  }
  .toggle-btn-a{
    background:linear-gradient(135deg,var(--gold-m),var(--gold))!important;
    color:#020b06!important;box-shadow:0 4px 16px rgba(201,151,58,.3)!important;
  }

  /* included card */
  .inc-card{
    background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.06);
    border-radius:22px;padding:26px 22px;
    transition:transform .35s ease,box-shadow .35s ease;
    position:relative;overflow:hidden;
  }
  .inc-card:hover{
    transform:translateY(-8px);
    box-shadow:0 32px 64px rgba(0,0,0,.4);
  }

  /* trust badges */
  .trust-grid{
    display:grid;
    grid-template-columns: repeat(6, 1fr);
    gap:14px;
  }
  .trust-badge{
    display:flex;flex-direction:column;align-items:center;gap:6px;
    padding:18px 14px;
    background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.06);
    border-radius:18px;text-align:center;
    transition:border-color .3s, transform .3s;
    min-width:0;
  }
  .trust-badge:hover{border-color:rgba(201,151,58,.25);transform:translateY(-4px);}
  .trust-icon-wrap{
    width:44px;height:44px;border-radius:16px;
    display:flex;align-items:center;justify-content:center;
    background:rgba(201,151,58,.12);
    border:1px solid rgba(201,151,58,.22);
    box-shadow:0 0 22px rgba(201,151,58,.08);
    color:var(--gold);
  }
  .icon-pop{ animation:iconPop 2.6s ease-in-out infinite; transform-origin:center; }
  .icon-spin{ animation:iconSpin 7s linear infinite; transform-origin:center; }
  .icon-wiggle{ animation:iconWiggle 2.4s ease-in-out infinite; transform-origin:center; }

  /* calculator */
  .calc-range{
    -webkit-appearance:none;appearance:none;
    width:100%;height:6px;border-radius:3px;outline:none;cursor:pointer;
    background:linear-gradient(to right,var(--gold) 0%,var(--gold) var(--pct,50%),rgba(255,255,255,.1) var(--pct,50%),rgba(255,255,255,.1) 100%);
  }
  .calc-range::-webkit-slider-thumb{
    -webkit-appearance:none;width:22px;height:22px;border-radius:50%;
    background:linear-gradient(135deg,var(--gold-m),var(--gold));
    box-shadow:0 4px 12px rgba(201,151,58,.5);cursor:pointer;
    border:2px solid #020b06;
  }

  /* Responsive */
  @media (max-width: 1100px){
    .trust-grid{ grid-template-columns: repeat(3, 1fr) !important; }
  }
  @media (max-width: 980px){
    .calc-two-col{ grid-template-columns: 1fr !important; gap:22px !important; }
  }
  @media (max-width: 860px){
    .faq-trigger{ padding:16px 16px !important; }
  }
  @media (max-width: 640px){
    .trust-grid{ grid-template-columns: repeat(2, 1fr) !important; }
    .inc-card{ padding:22px 16px !important; border-radius:18px !important; }
    .badge{ font-size:8px !important; }
  }
  @media (max-width: 420px){
    .trust-grid{ grid-template-columns: 1fr !important; }
    .toggle-btn{ padding:9px 14px !important; }
  }

  /* Reduce hover lift on touch devices */
  @media (hover: none){
    .plan-card:hover{ transform:none !important; }
    .plan-card-popular:hover{ transform:translateY(-8px) scale(1.02) !important; }
    .inc-card:hover{ transform:none !important; }
    .trust-badge:hover{ transform:none !important; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: BookOpen,
    accent: "#2fcf87",
    monthlyPrice: 29,
    yearlyPrice: 23,
    subtitle: "Perfect for beginners",
    badge: null as null | string,
    features: [
      { text: "2 Classes per week", included: true },
      { text: "1 Subject of choice", included: true },
      { text: "Certified tutor matching", included: true },
      { text: "30-min free trial", included: true },
      { text: "Progress reports (monthly)", included: true },
      { text: "Parent dashboard access", included: true },
      { text: "Priority tutor selection", included: false },
      { text: "Sibling discount", included: false },
      { text: "Dedicated academic advisor", included: false },
      { text: "Certificate of completion", included: false },
    ],
  },
  {
    id: "family",
    name: "Family",
    icon: Crown,
    accent: "#c9973a",
    monthlyPrice: 59,
    yearlyPrice: 47,
    subtitle: "Most popular for families",
    badge: "Most Popular",
    features: [
      { text: "5 Classes per week", included: true },
      { text: "2 Subjects of choice", included: true },
      { text: "Certified tutor matching", included: true },
      { text: "30-min free trial", included: true },
      { text: "Progress reports (weekly)", included: true },
      { text: "Parent dashboard access", included: true },
      { text: "Priority tutor selection", included: true },
      { text: "Sibling discount (up to 3)", included: true },
      { text: "Dedicated academic advisor", included: false },
      { text: "Certificate of completion", included: true },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    icon: Gem,
    accent: "#b58cff",
    monthlyPrice: 99,
    yearlyPrice: 79,
    subtitle: "For serious learners",
    badge: "Best Value",
    features: [
      { text: "Unlimited classes", included: true },
      { text: "All subjects unlocked", included: true },
      { text: "Certified tutor matching", included: true },
      { text: "30-min free trial", included: true },
      { text: "Progress reports (real-time)", included: true },
      { text: "Parent dashboard access", included: true },
      { text: "Priority tutor selection", included: true },
      { text: "Sibling discount (unlimited)", included: true },
      { text: "Dedicated academic advisor", included: true },
      { text: "Certificate of completion", included: true },
    ],
  },
];

const included = [
  {
    icon: Video,
    title: "HD Video Classes",
    desc: "Crystal-clear 1-on-1 video sessions with screen sharing and digital whiteboard.",
    color: "#c9973a",
  },
  {
    icon: BookOpen,
    title: "Interactive Portal",
    desc: "Access course materials, recordings, and homework assignments anytime.",
    color: "#2fcf87",
  },
  {
    icon: MessageCircle,
    title: "Direct Tutor Messaging",
    desc: "Stay connected with your teacher between sessions for questions.",
    color: "#7eb8ff",
  },
  {
    icon: BadgeCheck,
    title: "Official Certification",
    desc: "Globally recognised certificates upon completing each level.",
    color: "#ff8fa3",
  },
  {
    icon: RefreshCw,
    title: "Flexible Rescheduling",
    desc: "Life happens — reschedule any session up to 2 hours before with no penalty.",
    color: "#b58cff",
  },
  {
    icon: Heart,
    title: "Progress Tracking",
    desc: "Detailed weekly reports and milestone tracking for parents and students.",
    color: "#ffd166",
  },
];

const faqs = [
  {
    q: "Can I change my plan at any time?",
    a: "Yes — you can upgrade, downgrade, or cancel your plan at any time from your dashboard. Changes take effect at the start of your next billing cycle with no hidden fees.",
  },
  {
    q: "What happens after my free trial?",
    a: "After your 30-minute free trial, you'll be invited to choose a plan. There is absolutely no obligation — if you don't love it, simply don't subscribe.",
  },
  {
    q: "Are there any registration or setup fees?",
    a: "None whatsoever. The price you see is the price you pay. No registration fee, no material fee, no hidden charges of any kind.",
  },
  {
    q: "How do sibling discounts work?",
    a: "On Family and Elite plans, each additional sibling receives a 20% discount automatically applied at checkout. You can add up to 3 siblings on Family, and unlimited on Elite.",
  },
  {
    q: "What is your refund policy?",
    a: "We offer a 30-day money-back guarantee on your first month. If you are not satisfied for any reason, contact us and we will issue a full refund — no questions asked.",
  },
  {
    q: "Can I request a specific tutor?",
    a: "On the Family and Elite plans, you can browse our verified tutor roster and request a specific teacher. On Starter, we match you based on your preferences.",
  },
  {
    q: "Is my payment information secure?",
    a: "All payments are processed through Stripe, which is PCI-DSS Level 1 certified — the highest level of payment security available.",
  },
];

type TrustBadge = {
  icon: React.ComponentType<any>;
  value: string;
  sub: string;
  animClass: "icon-pop" | "icon-spin" | "icon-wiggle";
};

const trustBadges: TrustBadge[] = [
  {
    icon: ShieldCheck,
    value: "SSL Encrypted",
    sub: "Secure checkout",
    animClass: "icon-pop",
  },
  {
    icon: RefreshCw,
    value: "30-Day Refund",
    sub: "Money-back guarantee",
    animClass: "icon-spin",
  },
  {
    icon: Lock,
    value: "No Hidden Fees",
    sub: "Transparent pricing",
    animClass: "icon-wiggle",
  },
  {
    icon: Heart,
    value: "5,000+ Families",
    sub: "Trust us worldwide",
    animClass: "icon-pop",
  },
  {
    icon: BadgeCheck,
    value: "Al-Azhar Certified",
    sub: "Verified scholars",
    animClass: "icon-wiggle",
  },
  {
    icon: Gift,
    value: "Free Trial",
    sub: "No card needed",
    animClass: "icon-pop",
  },
];

const testimonials = [
  {
    name: "Ahmed K.",
    location: "UK",
    stars: 5,
    text: "The Family plan is incredible value. My 3 children all have lessons and the sibling discount made it very affordable for us.",
  },
  {
    name: "Fatima S.",
    location: "USA",
    stars: 5,
    text: "Switched from Starter to Elite and the difference is night and day. Having a dedicated advisor changed everything.",
  },
  {
    name: "Omar R.",
    location: "Australia",
    stars: 5,
    text: "30-day money back guarantee gave me the confidence to try. We've now been on the Family plan for 8 months straight.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL-REVEAL HOOK
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
// FAQ ITEM
// ─────────────────────────────────────────────────────────────────────────────
const FaqItem = ({ item, idx }: { item: (typeof faqs)[0]; idx: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`faq-item${open ? " open" : ""}`}
      style={{ animationDelay: `${idx * 0.06}s` }}
    >
      <button
        className="faq-trigger"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 18,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.35,
          }}
        >
          {item.q}
        </span>

        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            flexShrink: 0,
            background: open
              ? "linear-gradient(135deg,var(--gold-m),var(--gold))"
              : "rgba(255,255,255,.06)",
            border: `1px solid ${open ? "transparent" : "rgba(255,255,255,.1)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all .3s",
            color: open ? "#020b06" : "rgba(255,255,255,.5)",
          }}
        >
          <ChevronDown
            size={16}
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0)",
              transition: "transform .3s",
            }}
          />
        </div>
      </button>

      <div
        style={{
          maxHeight: open ? 340 : 0,
          overflow: "hidden",
          transition: "max-height .4s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <p
          style={{
            padding: "0 22px 18px",
            color: "rgba(255,255,255,.45)",
            fontSize: 15,
            lineHeight: 1.85,
          }}
        >
          {item.a}
        </p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PLAN CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
const PlanCalc = () => {
  const [sessions, setSessions] = useState(3);
  const [siblings, setSiblings] = useState(1);

  const perSession = 18;
  const siblingDiscount = siblings > 1 ? 0.2 : 0;

  const weekly = sessions * perSession * siblings * (1 - siblingDiscount);
  const monthly = weekly * 4.33;
  const saved = sessions * perSession * siblings * 4.33 - monthly;

  const pct1 = ((sessions - 1) / 6) * 100;
  const pct2 = ((siblings - 1) / 3) * 100;

  return (
    <div
      style={{
        background: "rgba(255,255,255,.025)",
        border: "1px solid rgba(201,151,58,.2)",
        borderRadius: 24,
        padding: "32px 24px",
        boxShadow: "0 20px 56px rgba(0,0,0,.38)",
        position: "relative",
        overflow: "hidden",
      }}
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
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 22,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: "rgba(201,151,58,.15)",
            border: "1px solid rgba(201,151,58,.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--gold)",
          }}
        >
          <Calculator size={20} />
        </div>
        <div>
          <p className="sec-label" style={{ marginBottom: 2 }}>
            Plan Calculator
          </p>
          <p style={{ color: "rgba(255,255,255,.3)", fontSize: 12 }}>
            Estimate your monthly cost
          </p>
        </div>
      </div>

      {/* Sessions slider */}
      <div style={{ marginBottom: 22 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <label
            style={{
              color: "rgba(255,255,255,.6)",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            Classes per week
          </label>
          <span
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 20,
              fontWeight: 700,
              color: "var(--gold-m)",
            }}
          >
            {sessions}
          </span>
        </div>

        <input
          type="range"
          min={1}
          max={7}
          value={sessions}
          className="calc-range"
          style={{ "--pct": pct1 + "%" } as React.CSSProperties}
          onChange={(e) => setSessions(+e.target.value)}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
          }}
        >
          <span style={{ color: "rgba(255,255,255,.2)", fontSize: 11 }}>1</span>
          <span style={{ color: "rgba(255,255,255,.2)", fontSize: 11 }}>7</span>
        </div>
      </div>

      {/* Siblings slider */}
      <div style={{ marginBottom: 26 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <label
            style={{
              color: "rgba(255,255,255,.6)",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            Number of students
          </label>
          <span
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 20,
              fontWeight: 700,
              color: "var(--gold-m)",
            }}
          >
            {siblings}
          </span>
        </div>

        <input
          type="range"
          min={1}
          max={4}
          value={siblings}
          className="calc-range"
          style={{ "--pct": pct2 + "%" } as React.CSSProperties}
          onChange={(e) => setSiblings(+e.target.value)}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
          }}
        >
          <span style={{ color: "rgba(255,255,255,.2)", fontSize: 11 }}>1</span>
          <span style={{ color: "rgba(255,255,255,.2)", fontSize: 11 }}>4</span>
        </div>
      </div>

      {/* result */}
      <div
        style={{
          background:
            "linear-gradient(135deg,rgba(201,151,58,.12),rgba(201,151,58,.05))",
          border: "1px solid rgba(201,151,58,.2)",
          borderRadius: 18,
          padding: "18px 18px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 10,
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                color: "rgba(255,255,255,.4)",
                fontSize: 12,
                marginBottom: 4,
              }}
            >
              Estimated monthly
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 6,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 44,
                  fontWeight: 700,
                  color: "var(--gold-m)",
                  lineHeight: 1,
                }}
              >
                ${Math.round(monthly)}
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,.3)",
                  fontSize: 13,
                  marginBottom: 6,
                }}
              >
                /mo
              </span>
            </div>
          </div>

          {siblings > 1 && (
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  color: "rgba(255,255,255,.3)",
                  fontSize: 11,
                  marginBottom: 6,
                }}
              >
                Sibling discount
              </p>
              <span
                className="badge"
                style={{
                  background: "rgba(47,207,135,.15)",
                  border: "1px solid rgba(47,207,135,.3)",
                  color: "#2fcf87",
                }}
              >
                Saving ${Math.round(saved)}/mo
              </span>
            </div>
          )}
        </div>

        <p
          style={{
            color: "rgba(255,255,255,.3)",
            fontSize: 12,
            lineHeight: 1.6,
          }}
        >
          {sessions} class{sessions > 1 ? "es" : ""}/week · {siblings} student
          {siblings > 1 ? "s" : ""} · 20% annual discount available
        </p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
const PricingPage: React.FC = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const plansReveal = useReveal();
  const includedReveal = useReveal();
  const calcReveal = useReveal();
  const faqReveal = useReveal();
  const trustReveal = useReveal();

  const maxFeatures = 7;

  const plansWithLimitedFeatures = useMemo(() => {
    return plans.map((p) => ({
      ...p,
      features: p.features.slice(0, maxFeatures),
    }));
  }, []);

  return (
    <>
      <style>{pageStyles}</style>

      <div
        style={{
          fontFamily: "'Nunito',sans-serif",
          background: "var(--deep)",
          minHeight: "100vh",
          color: "#fff",
          overflowX: "hidden",
        }}
      >
        {/* ══════════════════════════════ HERO (reduced padding) */}
        <section
          style={{
            background:
              "radial-gradient(ellipse 130% 80% at 20% 0%,#0d4a2a 0%,transparent 55%),radial-gradient(ellipse 80% 100% at 85% 100%,#062418 0%,transparent 50%),#020b06",
            padding: "86px 18px 58px",
            position: "relative",
            overflow: "hidden",
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
              right: "-2%",
              transform: "translateY(-50%)",
              fontFamily: "serif",
              fontSize: "clamp(120px,18vw,260px)",
              color: "rgba(255,255,255,.016)",
              fontWeight: 700,
              userSelect: "none",
              pointerEvents: "none",
              lineHeight: 1,
            }}
          >
            سعر
          </div>

          <div
            className="glow-pulse"
            style={{
              position: "absolute",
              top: "-12%",
              left: "8%",
              width: 460,
              height: 460,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(22,160,92,.1) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

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
            <div
              className="h1"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginBottom: 16,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  height: 1,
                  width: 54,
                  background:
                    "linear-gradient(90deg,transparent,rgba(201,151,58,.6))",
                }}
              />
              <span style={{ color: "var(--gold)", fontSize: 10 }}>✦</span>
              <span className="sec-label">Transparent Pricing</span>
              <span style={{ color: "var(--gold)", fontSize: 10 }}>✦</span>
              <div
                style={{
                  height: 1,
                  width: 54,
                  background:
                    "linear-gradient(90deg,rgba(201,151,58,.6),transparent)",
                }}
              />
            </div>

            <h1
              className="h2"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(40px,7vw,84px)",
                fontWeight: 300,
                color: "#fff",
                lineHeight: 1.08,
                marginBottom: 16,
              }}
            >
              Invest in Your
              <br />
              <span className="gold-shimmer" style={{ fontWeight: 700 }}>
                Spiritual Future
              </span>
            </h1>

            <p
              className="h3"
              style={{
                color: "rgba(255,255,255,.45)",
                fontSize: 17,
                lineHeight: 1.85,
                maxWidth: 560,
                margin: "0 auto 30px",
              }}
            >
              World-class Quranic education at a price that makes it accessible
              to every family. No hidden fees. Ever.
            </p>

            {/* billing toggle */}
            <div
              className="h4"
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <div className="toggle-wrap">
                <button
                  className={`toggle-btn${billing === "monthly" ? " toggle-btn-a" : ""}`}
                  onClick={() => setBilling("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`toggle-btn${billing === "yearly" ? " toggle-btn-a" : ""}`}
                  onClick={() => setBilling("yearly")}
                >
                  Annual
                </button>
              </div>
            </div>

            {billing === "yearly" && (
              <span
                className="badge h5"
                style={{
                  background: "rgba(47,207,135,.15)",
                  border: "1px solid rgba(47,207,135,.3)",
                  color: "#2fcf87",
                }}
              >
                <Sparkles size={10} /> Save up to 20% with annual billing
              </span>
            )}
          </div>
        </section>

        {/* ══════════════════════════════ PLANS (reduced padding) */}
        <section
          style={{
            padding: "56px 18px 64px",
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
            ref={plansReveal.ref}
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(14px, 4vw, 22px)",
              opacity: plansReveal.vis ? 1 : 0,
              transform: plansReveal.vis ? "translateY(0)" : "translateY(34px)",
              transition: "opacity .7s ease, transform .7s ease",
            }}
          >
            {plansWithLimitedFeatures.map((plan, idx) => {
              const price =
                billing === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
              const isPopular = plan.badge === "Most Popular";

              return (
                <div
                  key={plan.id}
                  className={`plan-card shb${isPopular ? " plan-card-popular" : ""}`}
                  style={{
                    transitionDelay: `${idx * 0.1}s`,
                    boxShadow: isPopular
                      ? "0 22px 58px rgba(0,0,0,.4),0 0 0 1px rgba(201,151,58,.2)"
                      : "0 8px 30px rgba(0,0,0,.3)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: `linear-gradient(90deg,transparent,${plan.accent},transparent)`,
                    }}
                  />

                  {plan.badge && (
                    <div
                      style={{
                        background: isPopular
                          ? "linear-gradient(135deg,var(--gold-m),var(--gold))"
                          : `linear-gradient(135deg,${plan.accent}cc,${plan.accent}88)`,
                        color: "#020b06",
                        textAlign: "center",
                        padding: "7px 0",
                        fontFamily: "'Cinzel',serif",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: ".18em",
                      }}
                    >
                      {isPopular ? "✦ " : ""}
                      {plan.badge.toUpperCase()}
                      {isPopular ? " ✦" : ""}
                    </div>
                  )}

                  <div style={{ padding: "26px 22px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        marginBottom: 18,
                      }}
                    >
                      <div
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 15,
                          background: `${plan.accent}18`,
                          border: `1px solid ${plan.accent}30`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: plan.accent,
                          boxShadow: `0 0 20px ${plan.accent}18`,
                        }}
                      >
                        <plan.icon size={24} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3
                          style={{
                            fontFamily: "'Cinzel',serif",
                            fontSize: 16,
                            fontWeight: 700,
                            color: "#fff",
                            marginBottom: 2,
                          }}
                        >
                          {plan.name}
                        </h3>
                        <p
                          style={{
                            color: "rgba(255,255,255,.35)",
                            fontSize: 12,
                          }}
                        >
                          {plan.subtitle}
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        marginBottom: 8,
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 6,
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 52,
                          fontWeight: 700,
                          color: "#fff",
                          lineHeight: 1,
                        }}
                      >
                        ${price}
                      </span>
                      <span
                        style={{
                          color: "rgba(255,255,255,.3)",
                          fontSize: 14,
                          marginBottom: 8,
                        }}
                      >
                        /month
                      </span>
                    </div>

                    {billing === "yearly" && (
                      <p
                        style={{
                          color: "rgba(255,255,255,.25)",
                          fontSize: 12,
                          marginBottom: 18,
                        }}
                      >
                        Billed ${price * 12}/year · Save $
                        {(plan.monthlyPrice - price) * 12}/yr
                      </p>
                    )}

                    <div
                      style={{
                        height: 1,
                        background: `linear-gradient(90deg,transparent,${plan.accent}40,transparent)`,
                        margin: "16px 0",
                      }}
                    />

                    {/* Features: max 7, no bullet points */}
                    <div style={{ marginBottom: 22 }}>
                      {plan.features.map((f, fi) => (
                        <div key={fi} className="feat-row">
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              flexShrink: 0,
                              background: f.included
                                ? `${plan.accent}20`
                                : "rgba(255,255,255,.04)",
                              border: `1px solid ${f.included ? plan.accent + "50" : "rgba(255,255,255,.08)"}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginTop: 1,
                            }}
                          >
                            {f.included ? (
                              <Check size={11} color={plan.accent} />
                            ) : (
                              <X size={10} color="rgba(255,255,255,.2)" />
                            )}
                          </div>
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: f.included
                                ? "rgba(255,255,255,.75)"
                                : "rgba(255,255,255,.2)",
                              lineHeight: 1.5,
                            }}
                          >
                            {f.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/book-free-trial"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        padding: "14px 0",
                        borderRadius: 14,
                        textDecoration: "none",
                        fontFamily: "'Cinzel',serif",
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: ".1em",
                        transition: "all .3s",
                        ...(isPopular
                          ? {
                              background:
                                "linear-gradient(135deg,var(--gold-m),var(--gold))",
                              color: "#020b06",
                              boxShadow: "0 6px 24px rgba(201,151,58,.4)",
                            }
                          : {
                              background: `${plan.accent}15`,
                              border: `1px solid ${plan.accent}40`,
                              color: plan.accent,
                            }),
                      }}
                    >
                      Start Free Trial <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <p
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,.25)",
              fontSize: 13,
              marginTop: 22,
              padding: "0 12px",
            }}
          >
            All plans include a{" "}
            <span style={{ color: "var(--gold-m)", fontWeight: 700 }}>
              30-minute free trial
            </span>{" "}
            — no credit card required
          </p>
        </section>

        {/* ══════════════════════════════ TRUST BADGES (animated lucide icons) */}
        <section
          ref={trustReveal.ref}
          style={{
            background: "var(--deep)",
            padding: "40px 18px",
            opacity: trustReveal.vis ? 1 : 0,
            transform: trustReveal.vis ? "translateY(0)" : "translateY(28px)",
            transition: "opacity .7s ease, transform .7s ease",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="trust-grid">
              {trustBadges.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className="trust-badge"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <div className="trust-icon-wrap" aria-hidden="true">
                      <Icon size={22} className={b.animClass} />
                    </div>
                    <p
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#fff",
                        letterSpacing: ".08em",
                        marginTop: 2,
                      }}
                    >
                      {b.value}
                    </p>
                    <p style={{ color: "rgba(255,255,255,.3)", fontSize: 11 }}>
                      {b.sub}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════ WHAT'S INCLUDED (reduced padding) */}
        <section
          style={{
            background:
              "linear-gradient(180deg,var(--deep) 0%,var(--forest) 100%)",
            padding: "56px 18px 64px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="diamond-bg"
            style={{ position: "absolute", inset: 0 }}
          />

          <div
            ref={includedReveal.ref}
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              opacity: includedReveal.vis ? 1 : 0,
              transform: includedReveal.vis
                ? "translateY(0)"
                : "translateY(28px)",
              transition: "opacity .7s ease, transform .7s ease",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 34 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  marginBottom: 12,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    height: 1,
                    width: 54,
                    background:
                      "linear-gradient(90deg,transparent,rgba(201,151,58,.6))",
                  }}
                />
                <span style={{ color: "var(--gold)", fontSize: 10 }}>✦</span>
                <span className="sec-label">Every Plan Includes</span>
                <span style={{ color: "var(--gold)", fontSize: 10 }}>✦</span>
                <div
                  style={{
                    height: 1,
                    width: 54,
                    background:
                      "linear-gradient(90deg,rgba(201,151,58,.6),transparent)",
                  }}
                />
              </div>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(26px,4vw,48px)",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                Everything You Need to{" "}
                <span className="gold-text">Succeed</span>
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "clamp(14px, 4vw, 22px)",
              }}
            >
              {included.map((item, i) => (
                <div
                  key={i}
                  className="inc-card shb"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: `linear-gradient(90deg,transparent,${item.color},transparent)`,
                    }}
                  />

                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      background: `${item.color}18`,
                      border: `1px solid ${item.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                      color: item.color,
                      boxShadow: `0 0 20px ${item.color}18`,
                    }}
                  >
                    <item.icon size={22} />
                  </div>

                  <h4
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: 10,
                    }}
                  >
                    {item.title}
                  </h4>

                  <p
                    style={{
                      color: "rgba(255,255,255,.4)",
                      fontSize: 13,
                      lineHeight: 1.75,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════ CALCULATOR + INVESTMENT (reduced padding) */}
        <section
          style={{
            background: "var(--forest)",
            padding: "56px 18px 68px",
            position: "relative",
          }}
        >
          <div
            className="hex-bg"
            style={{ position: "absolute", inset: 0, opacity: 0.5 }}
          />

          <div
            className="glow-pulse"
            style={{
              position: "absolute",
              bottom: "5%",
              right: "-5%",
              width: 440,
              height: 440,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(22,160,92,.06) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            ref={calcReveal.ref}
            className="calc-two-col"
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 44,
              alignItems: "center",
              opacity: calcReveal.vis ? 1 : 0,
              transform: calcReveal.vis ? "translateY(0)" : "translateY(28px)",
              transition: "opacity .7s ease, transform .7s ease",
            }}
          >
            <PlanCalc />

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    height: 1,
                    width: 40,
                    background:
                      "linear-gradient(90deg,transparent,rgba(201,151,58,.6))",
                  }}
                />
                <span className="sec-label">Why Choose Us</span>
              </div>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(26px,3.5vw,48px)",
                  fontWeight: 600,
                  color: "#fff",
                  lineHeight: 1.1,
                  marginBottom: 14,
                }}
              >
                Invest in Your
                <br />
                <span className="gold-text">Spiritual Future</span>
              </h2>

              <p
                style={{
                  color: "rgba(255,255,255,.45)",
                  fontSize: 16,
                  lineHeight: 1.85,
                  marginBottom: 20,
                }}
              >
                We believe quality Quranic education should be accessible to
                everyone. Our pricing sustains world-class scholars while
                remaining affordable for families globally.
              </p>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {[
                  "No Hidden Registration Fees",
                  "Secure Monthly Billing via Stripe",
                  "Family Group Discounts Available",
                  "30-Day Money Back Guarantee",
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(255,255,255,.06)",
                      borderRadius: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: "rgba(201,151,58,.15)",
                        border: "1px solid rgba(201,151,58,.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Check size={13} color="var(--gold)" />
                    </div>

                    <span
                      style={{
                        color: "rgba(255,255,255,.7)",
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════ TESTIMONIALS (reduced padding) */}
        <section
          style={{
            background:
              "linear-gradient(180deg,var(--forest) 0%,var(--deep) 100%)",
            padding: "56px 18px",
            position: "relative",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 34 }}>
              <p
                className="sec-label"
                style={{ marginBottom: 12, display: "block" }}
              >
                What Families Say
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(24px,3.5vw,44px)",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                Trusted by <span className="gold-text">5,000+ Families</span>{" "}
                Worldwide
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "clamp(14px, 4vw, 22px)",
              }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="inc-card shb"
                  style={{
                    background: "rgba(255,255,255,.025)",
                    border: "1px solid rgba(255,255,255,.06)",
                  }}
                >
                  <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        fill="var(--gold-m)"
                        color="var(--gold-m)"
                      />
                    ))}
                  </div>

                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontStyle: "italic",
                      fontSize: 17,
                      fontWeight: 600,
                      color: "rgba(255,255,255,.75)",
                      lineHeight: 1.7,
                      marginBottom: 20,
                    }}
                  >
                    "{t.text}"
                  </p>

                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "var(--gold)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 17,
                        fontWeight: 700,
                        color: "#020b06",
                      }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <p
                        style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}
                      >
                        {t.name}
                      </p>
                      <p
                        style={{ color: "rgba(255,255,255,.3)", fontSize: 11 }}
                      >
                        {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════ FAQ (reduced padding) */}
        <section
          style={{
            background: "var(--deep)",
            padding: "56px 18px 64px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="diamond-bg"
            style={{ position: "absolute", inset: 0 }}
          />

          <div
            ref={faqReveal.ref}
            style={{
              maxWidth: 800,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              opacity: faqReveal.vis ? 1 : 0,
              transform: faqReveal.vis ? "translateY(0)" : "translateY(28px)",
              transition: "opacity .7s ease, transform .7s ease",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 34 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  marginBottom: 12,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    height: 1,
                    width: 54,
                    background:
                      "linear-gradient(90deg,transparent,rgba(201,151,58,.6))",
                  }}
                />
                <span style={{ color: "var(--gold)", fontSize: 10 }}>✦</span>
                <span className="sec-label">Common Questions</span>
                <span style={{ color: "var(--gold)", fontSize: 10 }}>✦</span>
                <div
                  style={{
                    height: 1,
                    width: 54,
                    background:
                      "linear-gradient(90deg,rgba(201,151,58,.6),transparent)",
                  }}
                />
              </div>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(24px,3.5vw,46px)",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                Frequently Asked <span className="gold-text">Questions</span>
              </h2>
            </div>

            {faqs.map((f, i) => (
              <FaqItem key={i} item={f} idx={i} />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════ CTA (reduced padding) */}
        <section
          style={{
            background:
              "radial-gradient(ellipse 120% 80% at 50% 50%,#0d4a2a 0%,#020b06 70%)",
            padding: "70px 18px",
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
              width: 560,
              height: 560,
              borderRadius: "50%",
              border: "1px dashed rgba(201,151,58,.1)",
              animation: "rotateSlow 50s linear infinite",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              width: 160,
              height: 1,
              margin: "0 auto 34px",
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
              style={{ marginBottom: 14, display: "block" }}
            >
              Start Today — It's Free
            </p>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(30px,5vw,62px)",
                fontWeight: 300,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: 18,
              }}
            >
              Begin Your
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
                maxWidth: 520,
                margin: "0 auto 30px",
              }}
            >
              Start with a free trial and choose a plan only when you're ready.
              No pressure, no hidden costs, just pure learning.
            </p>

            <div
              style={{
                display: "flex",
                gap: 14,
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
                  padding: "16px 42px",
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
                to="/courses"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.12)",
                  color: "rgba(255,255,255,.7)",
                  padding: "16px 32px",
                  borderRadius: 16,
                  fontFamily: "'Cinzel',serif",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: ".1em",
                  textDecoration: "none",
                }}
              >
                View All Plans
              </Link>
            </div>
          </div>

          <div
            style={{
              width: 160,
              height: 1,
              margin: "34px auto 0",
              background:
                "linear-gradient(90deg,transparent,var(--gold),transparent)",
            }}
          />
        </section>
      </div>
    </>
  );
};

export default PricingPage;
