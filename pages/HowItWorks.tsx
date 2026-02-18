"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  UserCheck,
  CalendarDays,
  Video,
  BookOpen,
  Play,
  X,
  CheckCircle,
  ArrowRight,
  ArrowDown,
  Star,
  Globe,
  Clock,
  Award,
  Shield,
  Users,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

// ── Styles — same CSS variables / fonts / animations as Tutors.tsx ─────────
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

  .hex-bg {
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='.3' opacity='.055' d='M40 4L76 24L76 56L40 76L4 56L4 24Z'/%3E%3C/svg%3E");
  }
  .diamond-bg {
    background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 2L58 30L30 58L2 30Z' fill='none' stroke='%23c9973a' stroke-width='.4' opacity='.08'/%3E%3C/svg%3E");
  }

  @keyframes fadeUp    { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimText  { 0%{background-position:-500px 0} 100%{background-position:500px 0} }
  @keyframes glowPulse { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:.75;transform:scale(1.06)} }
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
  @keyframes rotateSlow{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes shimBar   { 0%{left:-100%} 100%{left:200%} }
  @keyframes cardIn    { from{opacity:0;transform:translateY(28px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes pulse2    { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.5);opacity:0} }
  @keyframes borderSpin{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

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

  .h1{animation:fadeUp .7s cubic-bezier(.16,1,.3,1) both}
  .h2{animation:fadeUp .7s .1s cubic-bezier(.16,1,.3,1) both}
  .h3{animation:fadeUp .7s .2s cubic-bezier(.16,1,.3,1) both}
  .h4{animation:fadeUp .7s .3s cubic-bezier(.16,1,.3,1) both}
  .h5{animation:fadeUp .7s .4s cubic-bezier(.16,1,.3,1) both}

  .sec-label{
    font-family:'Cinzel',serif;font-size:11px;font-weight:700;
    letter-spacing:.28em;text-transform:uppercase;color:var(--gold);
  }

  /* ── Original Feature Cards — restyled ── */
  .feat-nav-card {
    position:relative;
    background:rgba(255,255,255,.03);
    border:1px solid rgba(255,255,255,.07);
    border-radius:28px;
    padding:32px 20px 28px;
    display:flex;flex-direction:column;align-items:center;justify-content:space-between;
    cursor:pointer;
    transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s ease,border-color .3s;
    overflow:hidden;
    animation:cardIn .6s cubic-bezier(.16,1,.3,1) both;
  }
  .feat-nav-card:hover {
    transform:translateY(-12px) scale(1.02);
    border-color:rgba(201,151,58,.35);
    box-shadow:0 32px 64px rgba(0,0,0,.45),0 0 0 1px rgba(201,151,58,.2);
  }
  .feat-nav-card:hover .fnc-icon-wrap { transform:rotate(8deg) scale(1.08); }
  .feat-nav-card:hover .fnc-arrow { transform:translateY(4px); background:var(--gold)!important; }
  .fnc-icon-wrap { transition:transform .5s cubic-bezier(.16,1,.3,1); }
  .fnc-arrow { transition:transform .35s ease, background .3s; }

  /* shimmer sweep */
  .shb{position:relative;overflow:hidden;}
  .shb::after{
    content:'';position:absolute;inset:0;pointer-events:none;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.045),transparent);
    animation:shimBar 3.5s ease-in-out infinite;
  }

  /* step image card */
  .sc{
    background:rgba(255,255,255,.025);
    border:1px solid rgba(255,255,255,.06);
    border-radius:28px;overflow:hidden;
    transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s ease;
    cursor:pointer;position:relative;
  }
  .sc:hover{ transform:translateY(-8px); box-shadow:0 40px 80px rgba(0,0,0,.45),0 0 0 1px rgba(201,151,58,.2)!important; }
  .sc:hover .si{ transform:scale(1.07); }
  .si{ transition:transform .7s ease; }
  .sc:hover .sov{ opacity:1!important; }

  .badge{
    display:inline-flex;align-items:center;gap:5px;
    padding:3px 10px;border-radius:100px;
    font-family:'Cinzel',serif;font-size:8px;font-weight:700;letter-spacing:.14em;
    text-transform:uppercase;
  }

  .feat-why{transition:transform .35s ease,box-shadow .35s ease;}
  .feat-why:hover{transform:translateY(-8px);}

  /* nav pills */
  .sp{
    display:inline-flex;align-items:center;gap:7px;
    padding:8px 18px;border-radius:100px;
    font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.16em;
    text-transform:uppercase;cursor:pointer;
    border:1px solid rgba(255,255,255,.07);
    color:rgba(255,255,255,.4);background:rgba(255,255,255,.03);
    transition:all .25s;white-space:nowrap;
  }
  .sp:hover{color:var(--gold-lt);border-color:rgba(201,151,58,.3);background:rgba(201,151,58,.06);}
  .sp-a{
    background:linear-gradient(135deg,rgba(201,151,58,.2),rgba(201,151,58,.08))!important;
    border-color:rgba(201,151,58,.5)!important;color:var(--gold-lt)!important;
    box-shadow:0 4px 16px rgba(201,151,58,.15)!important;
  }
`;

// ── Data ──────────────────────────────────────────────────────────────────────
const featureCards = [
  {
    id: "step-1",
    icon: BookOpen,
    title: "Choose Course",
    subtitle: "Find your path",
    accent: "#c9973a",
  },
  {
    id: "step-2",
    icon: UserCheck,
    title: "Tutor Match",
    subtitle: "Perfect pairing",
    accent: "#2fcf87",
  },
  {
    id: "step-3",
    icon: CalendarDays,
    title: "Free Trial",
    subtitle: "Try it out",
    accent: "#7eb8ff",
  },
  {
    id: "step-4",
    icon: Video,
    title: "Live Classes",
    subtitle: "Engage & Learn",
    accent: "#ff8fa3",
  },
  {
    id: "step-5",
    icon: GraduationCap,
    title: "Certification",
    subtitle: "Goal achieved",
    accent: "#b58cff",
  },
];

const processSteps = [
  {
    id: "step-1",
    number: "01",
    icon: BookOpen,
    title: "Choose Your Course",
    subtitle: "Your Learning Path",
    tag: "Begin Here",
    accent: "#c9973a",
    description:
      "Select from our wide range of programs including Noorani Qaida for beginners, advanced Tajweed rules, or specialized Hifz memorization tracks. Our advisors help you pick the level that matches your current proficiency.",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://www.youtube.com/embed/S_T16BfE96c",
    badges: ["Noorani Qaida", "Tajweed", "Hifz"],
  },
  {
    id: "step-2",
    number: "02",
    icon: UserCheck,
    title: "Get Matched with a Tutor",
    subtitle: "Personalised Match",
    tag: "Certified Scholars",
    accent: "#2fcf87",
    description:
      "Based on your preferences for gender, language (English, Arabic, Urdu, etc.), and age group, we assign you a certified scholar. Every tutor is an Ijazah holder and Al-Azhar trained professional.",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=1200",
    badges: ["Al-Azhar", "Ijazah Holder", "Verified"],
  },
  {
    id: "step-3",
    number: "03",
    icon: CalendarDays,
    title: "Book Your Free Trial",
    subtitle: "Zero Commitment",
    tag: "30 Min Free",
    accent: "#7eb8ff",
    description:
      "Schedule a 30-minute session at a time that works for you, 24/7. This evaluation session is completely free — no credit card or commitment required. Meet your teacher and see our interactive portal in action.",
    image:
      "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&q=80&w=1200",
    badges: ["No Credit Card", "24/7 Booking", "Live Session"],
  },
  {
    id: "step-4",
    number: "04",
    icon: Video,
    title: "Start 1-on-1 Live Classes",
    subtitle: "Immersive Learning",
    tag: "HD Video",
    accent: "#ff8fa3",
    description:
      "Connect with your teacher via our high-quality video classroom. Students benefit from real-time feedback, screen sharing, and a digital whiteboard that makes learning Tajweed and Arabic interactive and fun.",
    image:
      "https://images.unsplash.com/photo-1588702547319-3571cd511d0b?auto=format&fit=crop&q=80&w=1200",
    badges: ["HD Video", "Whiteboard", "Screen Share"],
  },
  {
    id: "step-5",
    number: "05",
    icon: GraduationCap,
    title: "Track Progress & Get Certified",
    subtitle: "Globally Recognised",
    tag: "Achievement",
    accent: "#b58cff",
    description:
      "Your learning is monitored through weekly evaluations and monthly reports. Upon completing a level or memorizing a portion of the Quran, you will receive an official certification recognized globally.",
    image:
      "https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80&w=1200",
    badges: ["Weekly Evals", "Official Cert", "Global Recognition"],
  },
];

const stats = [
  { icon: Globe, value: "50+", label: "Countries Served" },
  { icon: Star, value: "4.9", label: "Avg Rating" },
  { icon: Clock, value: "24/7", label: "Availability" },
  { icon: Award, value: "1,200+", label: "Certified Tutors" },
  { icon: Users, value: "15K+", label: "Students Taught" },
];

const whyUs = [
  {
    icon: Award,
    title: "Al-Azhar Certified",
    color: "#c9973a",
    desc: "Every tutor holds credentials from Al-Azhar University — the gold standard in Islamic scholarship.",
  },
  {
    icon: Shield,
    title: "Background Verified",
    color: "#2fcf87",
    desc: "All tutors undergo thorough vetting, credential checks, and trial teaching before joining our platform.",
  },
  {
    icon: Clock,
    title: "Flexible 24/7",
    color: "#7eb8ff",
    desc: "Schedule classes at any hour across any timezone. Learning that fits your life.",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    color: "#ff8fa3",
    desc: "Our tutors speak 20+ languages, helping students learn comfortably in their native tongue.",
  },
];

// ── Dialog ────────────────────────────────────────────────────────────────────
const Dialog = ({
  src,
  onClose,
}: {
  src: string | null;
  onClose: () => void;
}) => {
  if (!src) return null;
  const isVideo = src.includes("embed") || src.includes("youtube");
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(2,11,6,.96)",
        backdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 900,
          borderRadius: 24,
          overflow: "hidden",
          border: "1px solid rgba(201,151,58,.25)",
          boxShadow: "0 40px 100px rgba(0,0,0,.6)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(255,255,255,.08)",
            border: "1px solid rgba(255,255,255,.14)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={18} />
        </button>
        <div style={{ aspectRatio: "16/9", background: "#000" }}>
          {isVideo ? (
            <iframe
              style={{ width: "100%", height: "100%", border: "none" }}
              src={`${src}?autoplay=1`}
              allow="autoplay; fullscreen"
            />
          ) : (
            <img
              src={src}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ── Step Row ──────────────────────────────────────────────────────────────────
const StepRow = ({
  step,
  index,
  onOpen,
}: {
  step: (typeof processSteps)[0];
  index: number;
  onOpen: (s: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const rev = index % 2 !== 0;
  const media = step.videoUrl || step.image;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={step.id}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 52,
        alignItems: "center",
        direction: rev ? "rtl" : "ltr",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: "opacity .7s ease, transform .7s ease",
      }}
    >
      {/* TEXT */}
      <div style={{ direction: "ltr" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".25em",
              color: step.accent,
            }}
          >
            STEP {step.number}
          </span>
          <div
            style={{
              height: 1,
              width: 40,
              background: `linear-gradient(90deg,${step.accent}80,transparent)`,
            }}
          />
          <span
            className="badge"
            style={{
              background: `${step.accent}18`,
              border: `1px solid ${step.accent}35`,
              color: step.accent,
            }}
          >
            {step.tag}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(26px,3.2vw,46px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.12,
            marginBottom: 16,
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,.45)",
            fontSize: 16,
            lineHeight: 1.85,
            marginBottom: 24,
            maxWidth: 440,
          }}
        >
          {step.description}
        </p>

        {/* badges */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          {step.badges.map((b, i) => (
            <span
              key={i}
              className="badge"
              style={{
                background: `${step.accent}15`,
                border: `1px solid ${step.accent}30`,
                color: step.accent,
              }}
            >
              <CheckCircle size={8} /> {b}
            </span>
          ))}
        </div>

        {/* mini features grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 32,
          }}
        >
          {[
            "Certified Scholars",
            "Flexible 24/7",
            "Interactive Dashboard",
            "Monthly Progress",
          ].map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.06)",
                borderRadius: 12,
                padding: "10px 14px",
              }}
            >
              <CheckCircle
                size={14}
                color={step.accent}
                style={{ flexShrink: 0 }}
              />
              <span
                style={{
                  color: "rgba(255,255,255,.55)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {f}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => onOpen(media)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: `linear-gradient(135deg,${step.accent},${step.accent}aa)`,
            color: "#020b06",
            padding: "13px 28px",
            borderRadius: 14,
            fontFamily: "'Cinzel',serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: ".1em",
            cursor: "pointer",
            border: "none",
            boxShadow: `0 6px 24px ${step.accent}40`,
            transition: "transform .25s,box-shadow .25s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.transform = "scale(1.04)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.transform = "")
          }
        >
          {step.videoUrl ? (
            <>
              <Play size={14} fill="#020b06" /> Watch Preview
            </>
          ) : (
            <>
              Explore Step <ExternalLink size={13} />
            </>
          )}
          <ArrowRight size={14} />
        </button>
      </div>

      {/* IMAGE */}
      <div style={{ direction: "ltr", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: -20,
            borderRadius: 40,
            background: `radial-gradient(ellipse,${step.accent}15 0%,transparent 70%)`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: -20,
            right: -10,
            zIndex: 0,
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 160,
            fontWeight: 700,
            lineHeight: 1,
            color: `${step.accent}08`,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {step.number}
        </span>

        <div
          className="sc shb"
          onClick={() => onOpen(media)}
          style={{
            position: "relative",
            zIndex: 1,
            boxShadow: "0 16px 60px rgba(0,0,0,.4)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              zIndex: 2,
              background: `linear-gradient(90deg,transparent,${step.accent},transparent)`,
            }}
          />
          <div
            style={{ height: 320, overflow: "hidden", position: "relative" }}
          >
            <img
              src={step.image}
              alt={step.title}
              className="si"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "grayscale(12%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top,rgba(2,11,6,.85) 0%,rgba(2,11,6,.1) 55%,transparent 100%)",
              }}
            />
            {/* hover play */}
            <div
              className="sov"
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0,
                transition: "opacity .3s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: step.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 8px 32px ${step.accent}60`,
                }}
              >
                <Play
                  size={28}
                  fill="#020b06"
                  color="#020b06"
                  style={{ marginLeft: 3 }}
                />
              </div>
            </div>
            {/* bottom label */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(2,11,6,.85)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${step.accent}30`,
                borderRadius: 100,
                padding: "7px 14px",
              }}
            >
              <step.icon size={14} color={step.accent} />
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: ".15em",
                  color: step.accent,
                }}
              >
                {step.subtitle}
              </span>
            </div>
            {/* top-right pill */}
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "rgba(2,11,6,.75)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(47,207,135,.3)",
                borderRadius: 100,
                padding: "5px 12px",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <CheckCircle size={11} color="#2fcf87" />
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: ".14em",
                  color: "#2fcf87",
                }}
              >
                STEP {step.number} OF 5
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const HowItWorks: React.FC = () => {
  const [mediaSrc, setMediaSrc] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState("step-1");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setActiveStep(id);
  };

  useEffect(() => {
    const fn = () => {
      for (const s of processSteps) {
        const el = document.getElementById(s.id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 220 && r.bottom > 220) {
            setActiveStep(s.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
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
        }}
      >
        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section
          style={{
            background:
              "radial-gradient(ellipse 130% 80% at 20% 0%,#0d4a2a 0%,transparent 55%),radial-gradient(ellipse 80% 100% at 85% 100%,#062418 0%,transparent 50%),#020b06",
            padding: "100px 24px 72px",
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
              fontSize: "clamp(140px,20vw,300px)",
              color: "rgba(255,255,255,.016)",
              fontWeight: 700,
              userSelect: "none",
              pointerEvents: "none",
              lineHeight: 1,
            }}
          >
            علم
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
              maxWidth: 1320,
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
              <span className="sec-label">The Academy Experience</span>
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
              Designed for
              <br />
              <span className="gold-shimmer" style={{ fontWeight: 700 }}>
                Quranic Excellence
              </span>
            </h1>

            <p
              className="h3"
              style={{
                color: "rgba(255,255,255,.45)",
                fontSize: 18,
                lineHeight: 1.85,
                maxWidth: 580,
                margin: "0 auto 16px",
              }}
            >
              Join thousands of families worldwide in a structured, 1-on-1
              learning environment that adapts to your pace and lifestyle.
            </p>

            {/* stats */}
            <div
              className="h4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 36,
                flexWrap: "wrap",
                marginBottom: 72,
                marginTop: 36,
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      color: "var(--gold-lt)",
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    <s.icon
                      size={15}
                      color="var(--gold)"
                      style={{ opacity: 0.8 }}
                    />
                    {s.value}
                  </div>
                  <span
                    style={{
                      color: "rgba(255,255,255,.3)",
                      fontSize: 11,
                      letterSpacing: ".08em",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* ── ORIGINAL 5 FEATURE CARDS — restyled with dark luxury palette ── */}
            <div
              className="h5"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "clamp(12px, 3vw, 20px)",
                maxWidth: 1100,
                margin: "0 auto",
              }}
            >
              {featureCards.map((card, idx) => (
                <div
                  key={card.id}
                  className="feat-nav-card shb"
                  onClick={() => scrollToSection(card.id)}
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  {/* top accent bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: `linear-gradient(90deg,transparent,${card.accent},transparent)`,
                    }}
                  />

                  {/* ambient glow */}
                  <div
                    style={{
                      position: "absolute",
                      top: -20,
                      right: -20,
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      background: `radial-gradient(circle,${card.accent}18 0%,transparent 70%)`,
                      pointerEvents: "none",
                    }}
                  />

                  {/* icon */}
                  <div
                    className="fnc-icon-wrap"
                    style={{
                      width: 72,
                      height: 72,
                      background: `${card.accent}14`,
                      border: `1px solid ${card.accent}30`,
                      borderRadius: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                      boxShadow: `0 0 24px ${card.accent}18`,
                    }}
                  >
                    <card.icon
                      size={32}
                      color={card.accent}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* text */}
                  <div
                    style={{ textAlign: "center", marginBottom: 20, flex: 1 }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#fff",
                        marginBottom: 6,
                        lineHeight: 1.2,
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        color: card.accent,
                        opacity: 0.85,
                      }}
                    >
                      {card.subtitle}
                    </p>
                  </div>

                  {/* arrow button */}
                  <div
                    className="fnc-arrow"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: `${card.accent}20`,
                      border: `1px solid ${card.accent}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: card.accent,
                    }}
                  >
                    <ArrowDown size={18} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STICKY STEP NAV ═══════════════════════════════════════════════ */}
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
              maxWidth: 1320,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            {processSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => scrollToSection(step.id)}
                className={`sp${activeStep === step.id ? " sp-a" : ""}`}
                style={{ border: "none", cursor: "pointer" }}
              >
                <step.icon size={12} />
                {step.number}. {step.subtitle}
              </button>
            ))}
          </div>
        </div>

        {/* ══ SECTION HEADER ════════════════════════════════════════════════ */}
        <section
          style={{
            background:
              "linear-gradient(180deg,var(--forest) 0%,var(--deep) 10%)",
            padding: "80px 24px 0",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div
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
              <span className="sec-label">Step by Step</span>
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
                fontSize: "clamp(30px,4.5vw,58px)",
                fontWeight: 600,
                color: "#fff",
                marginBottom: 16,
              }}
            >
              How Our Academy <span className="gold-text">Transforms</span>{" "}
              Learning
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,.35)",
                fontSize: 16,
                lineHeight: 1.8,
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              Five carefully designed milestones that guide you from first
              contact to certified fluency.
            </p>
          </div>
        </section>

        {/* ══ STEPS ═════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "72px 24px 120px",
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
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 100 }}>
              {processSteps.map((step, idx) => (
                <StepRow
                  key={step.id}
                  step={step}
                  index={idx}
                  onOpen={setMediaSrc}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY US ════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: "var(--deep)",
            padding: "80px 24px 100px",
            position: "relative",
            overflow: "hidden",
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
              width: 700,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse,rgba(201,151,58,.04) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              maxWidth: 1320,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p
                className="sec-label"
                style={{ marginBottom: 16, display: "block" }}
              >
                Our Guarantee
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(28px,4vw,52px)",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                Why Our Academy Is <span className="gold-text">Different</span>
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "clamp(16px, 4vw, 24px)",
              }}
            >
              {whyUs.map((f, i) => (
                <div
                  key={i}
                  className="feat-why"
                  style={{
                    textAlign: "center",
                    background: "rgba(255,255,255,.025)",
                    border: "1px solid rgba(255,255,255,.06)",
                    borderRadius: 22,
                    padding: "40px 28px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.boxShadow =
                      `0 32px 64px rgba(0,0,0,.4),0 0 0 1px ${f.color}30`)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.boxShadow = "")
                  }
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: `linear-gradient(90deg,transparent,${f.color},transparent)`,
                    }}
                  />
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: `${f.color}18`,
                      border: `1px solid ${f.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      color: f.color,
                      boxShadow: `0 0 24px ${f.color}20`,
                    }}
                  >
                    <f.icon size={22} />
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
                    {f.title}
                  </h4>
                  <p
                    style={{
                      color: "rgba(255,255,255,.38)",
                      fontSize: 13,
                      lineHeight: 1.75,
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIAL ═══════════════════════════════════════════════════ */}
        <section
          style={{
            background:
              "linear-gradient(180deg,var(--deep) 0%,var(--forest) 100%)",
            padding: "72px 24px",
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                marginBottom: 24,
              }}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={18}
                  fill="var(--gold-m)"
                  color="var(--gold-m)"
                />
              ))}
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(18px,2.5vw,30px)",
                fontWeight: 600,
                fontStyle: "italic",
                color: "rgba(255,255,255,.8)",
                lineHeight: 1.7,
                marginBottom: 28,
              }}
            >
              "Within 3 months, my daughter was reading Surah Al-Fatiha with
              perfect Tajweed. The tutors are extraordinarily patient and the
              journey is seamlessly structured."
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "var(--gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#020b06",
                }}
              >
                S
              </div>
              <div style={{ textAlign: "left" }}>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>
                  Sarah A.
                </p>
                <p style={{ color: "rgba(255,255,255,.35)", fontSize: 12 }}>
                  Parent · United Kingdom
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ BOTTOM CTA ════════════════════════════════════════════════════ */}
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
              Begin Today — It's Free
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
              Begin Your
              <br />
              <span
                className="gold-shimmer"
                style={{ fontWeight: 700, fontStyle: "italic" }}
              >
                Quranic Quest
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
              No commitment needed. Book your free 30-minute trial and
              experience the difference of truly personalised Quran learning.
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
                to="/courses"
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
                View Catalog
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
      <Dialog src={mediaSrc} onClose={() => setMediaSrc(null)} />
    </>
  );
};

export default HowItWorks;
