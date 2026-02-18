import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  Quote,
  Heart,
  ChevronLeft,
  ChevronRight,
  Award,
  Users,
  BookOpen,
  Globe,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatsRibbon from "@/components/stateRibon";

// ── Fallback testimonials ──────────────────────────────────────────────────────
const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    name: "Aisha Rahman",
    location: "London, UK",
    text: "SubhanAllah, within 3 months I went from struggling with basic letters to reciting full surahs with proper Tajweed. My tutor's patience and expertise transformed my relationship with the Quran completely.",
    course: "Quran Recitation",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
  },
  {
    id: 2,
    name: "Omar Al-Farsi",
    location: "Dubai, UAE",
    text: "The 1-on-1 sessions made all the difference. I've tried group classes before but never progressed this fast. My son completed his first Juz in just 2 months – the Hafiz tutors are truly exceptional.",
    course: "Quran Memorization",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
  },
  {
    id: 3,
    name: "Fatima Malik",
    location: "Toronto, Canada",
    text: "I finally understand the words I recite in salah. The Arabic Language course opened an entirely new world for me. The curriculum is perfectly structured and the tutors are incredibly knowledgeable.",
    course: "Arabic Language",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
  },
  {
    id: 4,
    name: "Yusuf Al-Amin",
    location: "New York, USA",
    text: "As a busy professional, I needed flexible scheduling. This academy accommodated my schedule perfectly. The quality of teaching rivals anything I've encountered in person. Truly blessed to have found this.",
    course: "Tajweed Mastery",
    avatar: "https://i.pravatar.cc/150?img=68",
    rating: 5,
  },
  {
    id: 5,
    name: "Mariam Hussain",
    location: "Melbourne, Australia",
    text: "My children aged 6 and 9 absolutely love their sessions. The tutors have a beautiful way of making Quran learning exciting and fun. As a parent I couldn't be more grateful for this program.",
    course: "Kids Quran Program",
    avatar: "https://i.pravatar.cc/150?img=45",
    rating: 5,
  },
  {
    id: 6,
    name: "Ibrahim Siddiqui",
    location: "Karachi, Pakistan",
    text: "The Ijazah pathway is extraordinary. I'm now connected to an unbroken chain of transmission going back to the Prophet ﷺ himself. This is not just education — it is a sacred inheritance.",
    course: "Quran Memorization",
    avatar: "https://i.pravatar.cc/150?img=15",
    rating: 5,
  },
];

const STATS = [
  { value: "15,000+", label: "Students Worldwide", icon: Users },
  { value: "98%", label: "Satisfaction Rate", icon: Heart },
  { value: "50+", label: "Countries Reached", icon: Globe },
  { value: "200+", label: "Certified Scholars", icon: Award },
];

const COURSE_COLORS: Record<string, { color: string; dim: string }> = {
  "Quran Recitation": { color: "#c9973a", dim: "rgba(201,151,58,.15)" },
  "Quran Memorization": { color: "#2fcf87", dim: "rgba(47,207,135,.12)" },
  "Arabic Language": { color: "#7eb8ff", dim: "rgba(126,184,255,.12)" },
  "Tajweed Mastery": { color: "#b58cff", dim: "rgba(181,140,255,.12)" },
  "Kids Quran Program": { color: "#ff8fa3", dim: "rgba(255,143,163,.12)" },
  "Islamic Studies": { color: "#ffd166", dim: "rgba(255,209,102,.12)" },
};

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,600&family=Cinzel:wght@400;600;700;900&family=Nunito:wght@400;500;600;700;800&display=swap');

  :root {
    --deep:    #020b06;
    --forest:  #051610;
    --em-dk:   #0a2e18;
    --em-md:   #0e4224;
    --em-vv:   #16a05c;
    --em-lt:   #2fcf87;
    --gold:    #c9973a;
    --gold-m:  #e4b558;
    --gold-lt: #f5d98e;
    --cream:   #fdfaf3;
    --ivory:   #f8f3e8;
  }

  /* ── Hex + Diamond BG patterns ── */
  .hex-bg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='.3' opacity='.055' d='M40 4L76 24L76 56L40 76L4 56L4 24Z'/%3E%3C/svg%3E");
  }
  .diamond-bg {
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 2L58 30L30 58L2 30Z' fill='none' stroke='%23c9973a' stroke-width='.4' opacity='.09'/%3E%3C/svg%3E");
  }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes shimmerText {
    0%   { background-position:-500px 0; }
    100% { background-position: 500px 0; }
  }
  @keyframes glowPulse {
    0%,100% { opacity:.35; transform:scale(1); }
    50%      { opacity:.75; transform:scale(1.06); }
  }
  @keyframes floatUp {
    0%,100% { transform:translateY(0px); }
    50%      { transform:translateY(-8px); }
  }
  @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes starPop {
    0%  { transform:scale(0) rotate(-30deg); opacity:0; }
    70% { transform:scale(1.2) rotate(5deg); opacity:1; }
    100%{ transform:scale(1) rotate(0deg); opacity:1; }
  }
  @keyframes slideInCard {
    from { opacity:0; transform:translateX(40px) scale(.97); }
    to   { opacity:1; transform:translateX(0) scale(1); }
  }
  @keyframes countUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes borderGlow {
    0%,100% { box-shadow: 0 0 0 1px rgba(201,151,58,.2), 0 8px 32px rgba(0,0,0,.4); }
    50%      { box-shadow: 0 0 0 1px rgba(201,151,58,.5), 0 16px 48px rgba(201,151,58,.1), 0 8px 32px rgba(0,0,0,.4); }
  }
  @keyframes quoteFloat {
    0%,100% { transform:translateY(0) rotate(-5deg); opacity:.12; }
    50%      { transform:translateY(-10px) rotate(-5deg); opacity:.2; }
  }
  @keyframes shimBar {
    0%{left:-100%} 100%{left:200%}
  }
  @keyframes heartBeat {
    0%,100% { transform:scale(1); }
    14%     { transform:scale(1.3); }
    28%     { transform:scale(1); }
    42%     { transform:scale(1.15); }
    70%     { transform:scale(1); }
  }

  /* ── Utility classes ── */
  .gold-shimmer {
    background: linear-gradient(90deg,var(--gold) 0%,var(--gold-lt) 35%,#fff8e0 50%,var(--gold-lt) 65%,var(--gold) 100%);
    background-size: 500px 100%;
    animation: shimmerText 4s linear infinite;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .gold-text {
    background: linear-gradient(135deg,var(--gold-lt) 0%,var(--gold-m) 50%,var(--gold) 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .glow-pulse { animation:glowPulse 4s ease-in-out infinite; }
  .float-anim { animation:floatUp 5s ease-in-out infinite; }
  .sec-label  { font-family:'Cinzel',serif; font-size:11px; font-weight:700; letter-spacing:.28em; text-transform:uppercase; color:var(--gold); }

  /* ── Review Card ── */
  .review-card {
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 24px;
    padding: 36px;
    position: relative;
    overflow: hidden;
    transition: transform .45s cubic-bezier(.16,1,.3,1), box-shadow .45s ease, border-color .45s ease;
    cursor: default;
    backdrop-filter: blur(12px);
    display: flex;
    flex-direction: column;
    animation: slideInCard .6s cubic-bezier(.16,1,.3,1) both;
  }
  .review-card:hover {
    transform: translateY(-10px) scale(1.015);
    box-shadow: 0 40px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(201,151,58,.25);
    border-color: rgba(201,151,58,.2);
  }

  /* ── Featured card ── */
  .review-card-featured {
    background: linear-gradient(145deg, rgba(14,66,36,.5), rgba(5,22,16,.7));
    border: 1px solid rgba(201,151,58,.3);
    animation: borderGlow 4s ease-in-out infinite;
  }

  /* ── Stat card ── */
  .stat-card {
    background: rgba(255,255,255,.025);
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 20px;
    padding: 32px 24px;
    text-align: center;
    transition: all .35s cubic-bezier(.16,1,.3,1);
    position: relative;
    overflow: hidden;
    animation: countUp .6s cubic-bezier(.16,1,.3,1) both;
  }
  .stat-card:hover {
    transform: translateY(-6px);
    border-color: rgba(201,151,58,.3);
    background: rgba(255,255,255,.05);
    box-shadow: 0 24px 48px rgba(0,0,0,.4);
  }
  .stat-card::before {
    content:'';
    position:absolute; inset:0;
    background:linear-gradient(135deg,transparent 60%,rgba(201,151,58,.04));
  }

  /* ── Slider controls ── */
  .slider-btn {
    width: 48px; height: 48px; border-radius: 50%;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.1);
    color: rgba(255,255,255,.5);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all .25s;
    flex-shrink: 0;
  }
  .slider-btn:hover {
    background: rgba(201,151,58,.15);
    border-color: rgba(201,151,58,.4);
    color: var(--gold-lt);
    transform: scale(1.1);
  }

  /* ── Dot indicator ── */
  .dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,255,255,.18);
    cursor: pointer; transition: all .3s;
  }
  .dot-active {
    background: var(--gold-m);
    width: 24px; border-radius: 3px;
    box-shadow: 0 0 8px rgba(228,181,88,.5);
  }

  /* ── Heart beat ── */
  .heart-beat { animation: heartBeat 2.5s ease-in-out infinite; }

  /* ── quote float ── */
  .quote-float { animation: quoteFloat 6s ease-in-out infinite; }

  /* ── Trust banner items ── */
  .trust-item {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 22px; border-radius: 100px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.07);
    color: rgba(255,255,255,.45);
    font-size: 13px; font-family:'Nunito',sans-serif; font-weight:600;
    white-space: nowrap;
    transition: all .25s;
  }
  .trust-item:hover {
    background: rgba(201,151,58,.08);
    border-color: rgba(201,151,58,.25);
    color: rgba(255,255,255,.7);
  }

  /* ── Shim top bar ── */
  .shim-top { position:relative; overflow:hidden; }
  .shim-top::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);
    animation:shimBar 3s ease-in-out infinite;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .reviews-grid { grid-template-columns: 1fr !important; }
    .stats-grid   { grid-template-columns: repeat(2,1fr) !important; }
    .hero-stats   { flex-direction: column; gap: 16px !important; }
    .cta-inner    { flex-direction: column !important; text-align: center !important; align-items: center !important; }
    .trust-scroll { flex-wrap: wrap; justify-content: center !important; }
    .review-card  { padding: 24px !important; }
  }
  @media (max-width: 480px) {
    .stats-grid { grid-template-columns: 1fr !important; }
    .slider-controls { flex-direction: column; gap: 12px !important; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
export const Reviews: React.FC = () => {
  // Try to use imported TESTIMONIALS, fallback to local
  let testimonials: typeof FALLBACK_TESTIMONIALS;
  try {
    // @ts-ignore
    const { TESTIMONIALS } = require("../data");
    testimonials =
      TESTIMONIALS && TESTIMONIALS.length
        ? TESTIMONIALS
        : FALLBACK_TESTIMONIALS;
  } catch {
    testimonials = FALLBACK_TESTIMONIALS;
  }

  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = testimonials.length;

  const goTo = (i: number) => {
    setActiveIdx((i + total) % total);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => goTo(activeIdx + 1), 5500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [activeIdx]);

  const featured = testimonials[activeIdx];
  const acc = COURSE_COLORS[featured.course] || {
    color: "#c9973a",
    dim: "rgba(201,151,58,.12)",
  };

  return (
    <>
      <style>{pageStyles}</style>
      <div
        style={{ fontFamily: "'Nunito',sans-serif", background: "var(--deep)" }}
      >
        {/* ══════════════════════════════════════ HERO BANNER */}
        <section
          style={{
            background:
              "radial-gradient(ellipse 110% 80% at 10% 0%,#0d4a2a 0%,transparent 55%), radial-gradient(ellipse 80% 100% at 90% 100%,#062418 0%,transparent 50%), #020b06",
            padding: "90px 24px 80px",
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
              right: "-3%",
              transform: "translateY(-50%)",
              fontFamily: "'Amiri',serif",
              fontSize: "clamp(140px,20vw,300px)",
              color: "rgba(255,255,255,.015)",
              fontWeight: 700,
              userSelect: "none",
              pointerEvents: "none",
              lineHeight: 1,
            }}
          >
            شهادات
          </div>

          {/* Glows */}
          <div
            className="glow-pulse"
            style={{
              position: "absolute",
              top: "-10%",
              left: "5%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(22,160,92,.09) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            className="glow-pulse"
            style={{
              animationDelay: "-2s",
              position: "absolute",
              bottom: "-15%",
              right: "25%",
              width: 380,
              height: 380,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(201,151,58,.06) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Top gold line */}
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
            {/* Eyebrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                marginBottom: 20,
                animation: "fadeUp .7s cubic-bezier(.16,1,.3,1) both",
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
              <span className="sec-label">Voices of Our Students</span>
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
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(38px,5.5vw,72px)",
                fontWeight: 300,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: 18,
                animation: "fadeUp .7s .1s cubic-bezier(.16,1,.3,1) both",
              }}
            >
              Real Stories of
              <br />
              <span className="gold-shimmer" style={{ fontWeight: 700 }}>
                Sacred Transformation
              </span>
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,.42)",
                fontSize: 17,
                lineHeight: 1.9,
                maxWidth: 560,
                margin: "0 auto 48px",
                animation: "fadeUp .7s .2s cubic-bezier(.16,1,.3,1) both",
              }}
            >
              Thousands of students across the globe have deepened their
              connection with the Quran. Here are their stories, in their own
              words.
            </p>

            {/* Aggregate rating */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(201,151,58,.2)",
                borderRadius: 100,
                padding: "14px 28px",
                animation: "fadeUp .7s .3s cubic-bezier(.16,1,.3,1) both",
              }}
            >
              <div style={{ display: "flex", gap: 3 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="var(--gold-m)"
                    color="var(--gold-m)"
                    style={{
                      animation: `starPop .4s ${i * 0.07}s cubic-bezier(.16,1,.3,1) both`,
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  color: "var(--gold-lt)",
                  fontFamily: "'Cinzel',serif",
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                4.9
              </span>
              <div
                style={{
                  width: 1,
                  height: 20,
                  background: "rgba(255,255,255,.12)",
                }}
              />
              <span style={{ color: "rgba(255,255,255,.4)", fontSize: 13 }}>
                Based on 3,200+ Reviews
              </span>
            </div>
          </div>
        </section>

        <StatsRibbon />
        {/* ══════════════════════════════════════ FEATURED TESTIMONIAL SPOTLIGHT */}
        <section
          style={{
            background:
              "linear-gradient(180deg,var(--forest) 0%,var(--em-dk) 100%)",
            padding: "80px 24px",
            position: "relative",
            overflow: "hidden",
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
              top: "20%",
              left: "-5%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(22,160,92,.08) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: 960,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Section label */}
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    height: 1,
                    width: 48,
                    background:
                      "linear-gradient(90deg,transparent,rgba(201,151,58,.5))",
                  }}
                />
                <span className="sec-label" style={{ fontSize: 10 }}>
                  Student Spotlight
                </span>
                <div
                  style={{
                    height: 1,
                    width: 48,
                    background:
                      "linear-gradient(90deg,rgba(201,151,58,.5),transparent)",
                  }}
                />
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(28px,4vw,48px)",
                  fontWeight: 600,
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                Hear Their{" "}
                <em
                  style={{
                    background:
                      "linear-gradient(135deg,var(--gold-lt),var(--gold))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Journey
                </em>
              </h2>
            </div>

            {/* Featured card */}
            <div
              key={animKey}
              style={{
                background: `linear-gradient(145deg,rgba(14,66,36,.5),rgba(5,22,16,.7))`,
                border: `1px solid ${acc.color}40`,
                borderRadius: 28,
                padding: "clamp(28px,5vw,56px)",
                position: "relative",
                overflow: "hidden",
                boxShadow: `0 32px 80px rgba(0,0,0,.5), 0 0 0 1px ${acc.color}20`,
                animation: "slideInCard .5s cubic-bezier(.16,1,.3,1) both",
              }}
            >
              {/* bg accent glow */}
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 250,
                  height: 250,
                  borderRadius: "50%",
                  background: `radial-gradient(circle,${acc.dim} 0%,transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              {/* floating quote mark */}
              <div
                className="quote-float"
                style={{
                  position: "absolute",
                  bottom: 20,
                  right: 32,
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 180,
                  color: acc.color,
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                "
              </div>

              {/* Top color accent bar */}
              <div
                className="shim-top"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg,transparent,${acc.color},transparent)`,
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Course tag */}
                <div style={{ marginBottom: 24 }}>
                  <span
                    style={{
                      background: acc.dim,
                      border: `1px solid ${acc.color}40`,
                      color: acc.color,
                      borderRadius: 100,
                      padding: "6px 16px",
                      fontSize: 10,
                      fontFamily: "'Cinzel',serif",
                      fontWeight: 700,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                    }}
                  >
                    {featured.course}
                  </span>
                </div>

                {/* Stars */}
                <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="var(--gold-m)"
                      color="var(--gold-m)"
                    />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "clamp(18px,2.5vw,26px)",
                    fontWeight: 600,
                    color: "rgba(255,255,255,.88)",
                    lineHeight: 1.65,
                    marginBottom: 36,
                    fontStyle: "italic",
                  }}
                >
                  "{featured.text}"
                </blockquote>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: "50%",
                      border: `2px solid ${acc.color}50`,
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={featured.avatar}
                      alt={featured.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#fff",
                        marginBottom: 4,
                      }}
                    >
                      {featured.name}
                    </div>
                    <div
                      style={{ color: "rgba(255,255,255,.38)", fontSize: 12 }}
                    >
                      {featured.location}
                    </div>
                  </div>
                  <div
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <div className="heart-beat">
                      <Heart
                        size={16}
                        fill="var(--gold-m)"
                        color="var(--gold-m)"
                      />
                    </div>
                    <span
                      style={{ color: "rgba(255,255,255,.3)", fontSize: 12 }}
                    >
                      Verified Student
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider controls */}
            <div
              className="slider-controls"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                marginTop: 32,
              }}
            >
              <button
                className="slider-btn"
                onClick={() => goTo(activeIdx - 1)}
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`dot${i === activeIdx ? " dot-active" : ""}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
              <button
                className="slider-btn"
                onClick={() => goTo(activeIdx + 1)}
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════ GRID OF REVIEWS */}
        <section
          style={{
            padding: "80px 24px",
            background:
              "linear-gradient(180deg,var(--em-dk) 0%,var(--deep) 100%)",
            position: "relative",
          }}
        >
          <div
            className="hex-bg"
            style={{ position: "absolute", inset: 0, opacity: 0.4 }}
          />
          <div
            className="glow-pulse"
            style={{
              position: "absolute",
              bottom: "10%",
              right: "-5%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(22,160,92,.06) 0%,transparent 70%)",
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
            {/* Section header */}
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    height: 1,
                    width: 48,
                    background:
                      "linear-gradient(90deg,transparent,rgba(201,151,58,.5))",
                  }}
                />
                <span className="sec-label" style={{ fontSize: 10 }}>
                  Community Reviews
                </span>
                <div
                  style={{
                    height: 1,
                    width: 48,
                    background:
                      "linear-gradient(90deg,rgba(201,151,58,.5),transparent)",
                  }}
                />
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(28px,4vw,52px)",
                  fontWeight: 600,
                  color: "#fff",
                  lineHeight: 1.2,
                  marginBottom: 16,
                }}
              >
                From{" "}
                <span className="gold-shimmer" style={{ fontWeight: 700 }}>
                  Every Corner
                </span>{" "}
                of the World
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,.38)",
                  fontSize: 15,
                  maxWidth: 480,
                  margin: "0 auto",
                }}
              >
                Our students span 50+ countries, united by a shared love of the
                Quran and a desire for growth.
              </p>
            </div>

            <div
              className="reviews-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                gap: "clamp(14px,3vw,24px)",
              }}
            >
              {testimonials.map((review: any, idx: number) => {
                const rAcc = COURSE_COLORS[review.course] || {
                  color: "#c9973a",
                  dim: "rgba(201,151,58,.12)",
                };
                const isFeatured = idx === 0;
                return (
                  <div
                    key={review.id}
                    className={`review-card${isFeatured ? " review-card-featured" : ""}`}
                    style={{ animationDelay: `${(idx % 3) * 0.1}s` }}
                  >
                    {/* Top accent */}
                    <div
                      className="shim-top"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: `linear-gradient(90deg,transparent,${rAcc.color},transparent)`,
                      }}
                    />

                    {/* Corner glow */}
                    <div
                      style={{
                        position: "absolute",
                        top: -20,
                        right: -20,
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background: `radial-gradient(circle,${rAcc.dim} 0%,transparent 70%)`,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Big floating quote */}
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 20,
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 80,
                        color: rAcc.color,
                        opacity: 0.1,
                        lineHeight: 1,
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    >
                      "
                    </div>

                    <div
                      style={{
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      {/* Course tag */}
                      <div style={{ marginBottom: 16 }}>
                        <span
                          style={{
                            background: rAcc.dim,
                            border: `1px solid ${rAcc.color}35`,
                            color: rAcc.color,
                            borderRadius: 100,
                            padding: "4px 12px",
                            fontSize: 9,
                            fontFamily: "'Cinzel',serif",
                            fontWeight: 700,
                            letterSpacing: ".15em",
                            textTransform: "uppercase",
                          }}
                        >
                          {review.course}
                        </span>
                      </div>

                      {/* Stars */}
                      <div
                        style={{ display: "flex", gap: 3, marginBottom: 16 }}
                      >
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            size={13}
                            fill="var(--gold-m)"
                            color="var(--gold-m)"
                          />
                        ))}
                      </div>

                      {/* Text */}
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 17,
                          fontStyle: "italic",
                          fontWeight: 600,
                          color: "rgba(255,255,255,.75)",
                          lineHeight: 1.7,
                          flex: 1,
                          marginBottom: 24,
                        }}
                      >
                        "{review.text}"
                      </p>

                      {/* Divider */}
                      <div
                        style={{
                          height: 1,
                          marginBottom: 20,
                          background: `linear-gradient(90deg,transparent,${rAcc.color}25,transparent)`,
                        }}
                      />

                      {/* Author */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: "50%",
                            border: `1.5px solid ${rAcc.color}45`,
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={review.avatar}
                            alt={review.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div>
                          <div
                            style={{
                              fontFamily: "'Cinzel',serif",
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#fff",
                              marginBottom: 2,
                            }}
                          >
                            {review.name}
                          </div>
                          <div
                            style={{
                              color: "rgba(255,255,255,.3)",
                              fontSize: 11,
                            }}
                          >
                            {review.location}
                          </div>
                        </div>
                        {isFeatured && (
                          <div style={{ marginLeft: "auto" }}>
                            <div
                              style={{
                                background: "rgba(201,151,58,.15)",
                                border: "1px solid rgba(201,151,58,.3)",
                                borderRadius: 100,
                                padding: "4px 10px",
                                fontFamily: "'Cinzel',serif",
                                fontSize: 8,
                                color: "var(--gold-m)",
                                fontWeight: 700,
                                letterSpacing: ".12em",
                                textTransform: "uppercase",
                              }}
                            >
                              ✦ Top Review
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════ TRUST SIGNALS BAR */}
        <section
          style={{
            background: "var(--deep)",
            padding: "40px 24px",
            borderTop: "1px solid rgba(255,255,255,.05)",
            borderBottom: "1px solid rgba(255,255,255,.05)",
          }}
        >
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div
              className="trust-scroll"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              {[
                {
                  icon: <CheckCircle size={14} color="var(--gold)" />,
                  text: "Al-Azhar Certified Scholars",
                },
                {
                  icon: <CheckCircle size={14} color="var(--em-lt)" />,
                  text: "100% Online & Flexible",
                },
                {
                  icon: <CheckCircle size={14} color="#7eb8ff" />,
                  text: "Free Trial Session",
                },
                {
                  icon: <CheckCircle size={14} color="#b58cff" />,
                  text: "1-on-1 Personalised Attention",
                },
                {
                  icon: <CheckCircle size={14} color="#ff8fa3" />,
                  text: "Ijazah Pathway Available",
                },
                {
                  icon: <CheckCircle size={14} color="var(--gold)" />,
                  text: "Trusted by 15,000+ Families",
                },
              ].map((item, i) => (
                <div key={i} className="trust-item">
                  {item.icon}
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════ BOTTOM CTA */}
        <section
          style={{ background: "var(--deep)", padding: "80px 24px 100px" }}
        >
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div
              style={{
                background:
                  "linear-gradient(135deg,rgba(14,66,36,.75),rgba(10,46,24,.85))",
                border: "1px solid rgba(201,151,58,.22)",
                borderRadius: 28,
                padding: "clamp(36px,6vw,64px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorations */}
              <div
                style={{
                  position: "absolute",
                  left: -60,
                  top: -60,
                  width: 280,
                  height: 280,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle,rgba(201,151,58,.08) 0%,transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <div
                className="glow-pulse"
                style={{
                  position: "absolute",
                  right: "15%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle,rgba(22,160,92,.07) 0%,transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 60,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  border: "1px dashed rgba(201,151,58,.2)",
                  animation: "rotateSlow 20s linear infinite",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 60,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  border: "1px solid rgba(201,151,58,.1)",
                  animation: "rotateSlow 14s linear infinite reverse",
                  pointerEvents: "none",
                }}
              />

              <div
                className="cta-inner"
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 36,
                }}
              >
                <div style={{ maxWidth: 560 }}>
                  <p className="sec-label" style={{ marginBottom: 16 }}>
                    Begin Your Sacred Journey
                  </p>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "clamp(26px,3.5vw,46px)",
                      fontWeight: 600,
                      color: "#fff",
                      lineHeight: 1.2,
                      marginBottom: 18,
                    }}
                  >
                    Join 15,000+ Students Who
                    <br />
                    <em
                      style={{
                        background:
                          "linear-gradient(135deg,var(--gold-lt),var(--gold))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Transformed Their Lives
                    </em>
                  </h2>
                  <p
                    style={{
                      color: "rgba(255,255,255,.38)",
                      fontSize: 15,
                      lineHeight: 1.8,
                    }}
                  >
                    Your story of transformation is waiting to be written. Start
                    with a free trial session — no commitment, no credit card
                    required.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    alignItems: "flex-start",
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
                      padding: "18px 44px",
                      borderRadius: 16,
                      fontFamily: "'Cinzel',serif",
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: ".1em",
                      textDecoration: "none",
                      boxShadow:
                        "0 8px 32px rgba(201,151,58,.4),inset 0 1px 0 rgba(255,255,255,.25)",
                      transition: "all .3s",
                    }}
                  >
                    ✦ Book Free Trial
                  </Link>

                  {/* Mini testimonial preview */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 16px",
                      background: "rgba(255,255,255,.04)",
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,.07)",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      {[
                        "https://i.pravatar.cc/150?img=47",
                        "https://i.pravatar.cc/150?img=12",
                        "https://i.pravatar.cc/150?img=32",
                      ].map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt=""
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            border: "2px solid var(--deep)",
                            marginLeft: i ? -8 : 0,
                            objectFit: "cover",
                          }}
                        />
                      ))}
                    </div>
                    <div>
                      <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            size={10}
                            fill="var(--gold-m)"
                            color="var(--gold-m)"
                          />
                        ))}
                      </div>
                      <div
                        style={{ color: "rgba(255,255,255,.35)", fontSize: 11 }}
                      >
                        Loved by 15,000+ students
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Reviews;
