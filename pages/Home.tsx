import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Star,
  Users,
  Globe,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  Play,
  Moon,
} from "lucide-react";
import { COURSES, TUTORS, FAQS } from "../data";
import HowItWorksSection from "@/components/process";
import StatsRibbon from "@/components/stateRibon";
import WhyUsSection from "@/components/Whyussection";

// ── Inline styles & keyframes injected once ──────────────────────────────────
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Amiri:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --emerald-900: #022c22;
    --emerald-800: #064e3b;
    --emerald-700: #065f46;
    --emerald-600: #047857;
    --emerald-400: #34d399;
    --emerald-300: #6ee7b7;
    --gold-500:    #c9a84c;
    --gold-400:    #e2c06b;
    --gold-300:    #f5dfa0;
    --cream:       #fdf8f0;
    --ink:         #0d1f1a;
  }

  * { box-sizing: border-box; }

  /* ---- geometric SVG pattern bg ---- */
  .geo-bg {
    background-color: var(--emerald-900);
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath fill='none' stroke='%23ffffff08' stroke-width='1' d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3Cpath fill='none' stroke='%23ffffff05' stroke-width='0.5' d='M40 10 L70 40 L40 70 L10 40 Z'/%3E%3Ccircle cx='40' cy='40' r='4' fill='%23ffffff04'/%3E%3C/svg%3E");
  }

  .star-bg {
    background-image: radial-gradient(circle, #ffffff18 1px, transparent 1px);
    background-size: 30px 30px;
  }

  /* shimmer gold line */
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  .gold-shimmer {
    background: linear-gradient(90deg, var(--gold-500) 0%, var(--gold-300) 40%, var(--gold-500) 100%);
    background-size: 400px 100%;
    animation: shimmer 3s infinite linear;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @keyframes floatUp {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-12px); }
  }
  .float { animation: floatUp 6s ease-in-out infinite; }

  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: .6; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  .pulse-ring::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    border: 2px solid var(--gold-400);
    animation: pulse-ring 2.5s ease-out infinite;
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .anim-1 { animation: fadeSlideUp .7s ease forwards; }
  .anim-2 { animation: fadeSlideUp .7s .15s ease both; }
  .anim-3 { animation: fadeSlideUp .7s .3s ease both; }
  .anim-4 { animation: fadeSlideUp .7s .45s ease both; }

  /* card hover lift */
  .card-lift { transition: transform .3s ease, box-shadow .3s ease; }
  .card-lift:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,.18); }

  /* gold border glow */
  .gold-glow { box-shadow: 0 0 0 1px var(--gold-500), 0 0 20px rgba(201,168,76,.25); }

  /* gradient text utility */
  .grad-text {
    background: linear-gradient(135deg, var(--gold-300) 0%, var(--gold-500) 60%, #a07830 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-divider {
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--gold-500), transparent);
    width: 80px;
    margin: 0 auto 20px;
    border-radius: 2px;
  }

  /* hero mesh gradient */
  .hero-mesh {
    background:
      radial-gradient(ellipse 80% 60% at 10% 20%, #0a4f3a 0%, transparent 60%),
      radial-gradient(ellipse 60% 80% at 90% 80%, #0a3828 0%, transparent 60%),
      radial-gradient(ellipse 100% 100% at 50% 50%, #011a12 0%, #022c22 100%);
  }

  /* ornament */
  .ornament::before,
  .ornament::after {
    content: '✦';
    color: var(--gold-500);
    font-size: 12px;
    margin: 0 8px;
    opacity: .7;
  }

  .glass-card {
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.1);
    backdrop-filter: blur(12px);
  }

  .green-glass {
    background: rgba(6,78,59,.5);
    border: 1px solid rgba(110,231,183,.15);
    backdrop-filter: blur(8px);
  }

  /* step number */
  .step-num {
    font-family: 'Playfair Display', serif;
    font-size: 5rem;
    font-weight: 900;
    line-height: 1;
    background: linear-gradient(180deg, var(--gold-500) 0%, transparent 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: .25;
  }

  /* tutor ring */
  .tutor-ring {
    background: linear-gradient(135deg, var(--gold-500), var(--emerald-600), var(--gold-400));
    padding: 3px;
    border-radius: 9999px;
  }
  .tutor-ring-inner {
    border-radius: 9999px;
    overflow: hidden;
    background: var(--emerald-900);
  }

  .stat-item + .stat-item {
    border-left: 1px solid rgba(201,168,76,.2);
  }

  /* ═══════════════════════════════════════════════════════
     RESPONSIVE GRID SYSTEM
  ═══════════════════════════════════════════════════════ */

  /* Hero Grid */
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(32px, 6vw, 64px);
    align-items: center;
  }
  @media (min-width: 900px) {
    .hero-grid { grid-template-columns: 1fr 1fr; }
  }

  /* Courses Grid — 1 col mobile → 2 col tablet → 3 col desktop */
  .courses-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }
  @media (min-width: 640px) {
    .courses-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1024px) {
    .courses-grid { grid-template-columns: repeat(3, 1fr); }
  }

  /* Why Us Grid — 1 col mobile → 2 col desktop */
  .whyus-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(32px, 6vw, 80px);
    align-items: center;
  }
  @media (min-width: 900px) {
    .whyus-grid { grid-template-columns: 1fr 1fr; }
  }

  /* Tutors Grid — 1 col mobile → 2 col tablet → 3 col desktop */
  .tutors-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(16px, 3vw, 36px);
  }
  @media (min-width: 640px) {
    .tutors-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1024px) {
    .tutors-grid { grid-template-columns: repeat(3, 1fr); }
  }

  /* Hero image — hide float pill on very small screens */
  @media (max-width: 480px) {
    .hero-stat-pill { display: none !important; }
    .hero-image-wrap { margin-top: 0 !important; }
  }

  /* Why Us image badge — reposition on mobile */
  @media (max-width: 899px) {
    .whyus-badge { left: 8px !important; bottom: 12px !important; }
    .whyus-image { height: 320px !important; }
  }

  /* CTA flex row → column on mobile */
  .cta-row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    align-items: center;
  }
  @media (max-width: 480px) {
    .cta-row { flex-direction: column; align-items: stretch; }
    .cta-row a { text-align: center; }
  }

  /* Social proof row */
  .social-proof-row {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  /* Responsive padding utility */
  .section-pad {
    padding: clamp(60px, 10vw, 100px) clamp(16px, 4vw, 24px);
  }

  /* Courses header flex */
  .courses-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 52px;
    gap: 16px;
    flex-wrap: wrap;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────

const Home: React.FC = () => {
  return (
    <>
      <style>{globalStyle}</style>
      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--ink)" }}>
        {/* ═══════════════════════════════════════════════════════ HERO */}
        <section
          className="hero-mesh geo-bg"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Large decorative Arabic calligraphy overlay */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              fontFamily: "'Amiri', serif",
              fontSize: "clamp(120px, 20vw, 420px)",
              color: "rgba(255,255,255,0.02)",
              fontWeight: 700,
              userSelect: "none",
              whiteSpace: "nowrap",
              letterSpacing: "-0.02em",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            نور
          </div>

          {/* Gold accent top bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background:
                "linear-gradient(90deg, transparent, var(--gold-500), var(--gold-300), var(--gold-500), transparent)",
            }}
          />

          {/* Floating circles */}
          <div
            className="float"
            style={{
              position: "absolute",
              top: "15%",
              right: "8%",
              width: "clamp(150px, 25vw, 300px)",
              height: "clamp(150px, 25vw, 300px)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(52,211,153,.08) 0%, transparent 70%)",
              zIndex: 0,
            }}
          />
          <div
            className="float"
            style={{
              animationDelay: "-3s",
              position: "absolute",
              bottom: "10%",
              left: "5%",
              width: "clamp(100px, 15vw, 200px)",
              height: "clamp(100px, 15vw, 200px)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(201,168,76,.07) 0%, transparent 70%)",
              zIndex: 0,
            }}
          />

          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding:
                "clamp(80px, 12vw, 120px) clamp(16px, 4vw, 24px) clamp(60px, 10vw, 100px)",
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div className="hero-grid">
              {/* LEFT */}
              <div
                className="anim-1"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(20px, 3vw, 28px)",
                }}
              >
                {/* Badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    alignSelf: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--gold-400)",
                      boxShadow: "0 0 10px var(--gold-400)",
                    }}
                  />
                  <span
                    style={{
                      color: "var(--gold-300)",
                      fontSize: "clamp(11px, 1.5vw, 13px)",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Noor Al-Quran Academy
                  </span>
                </div>

                {/* Headline */}
                <div>
                  <h1
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(32px, 5.5vw, 68px)",
                      fontWeight: 900,
                      color: "#fff",
                      lineHeight: 1.1,
                      margin: 0,
                    }}
                  >
                    Master the Holy Quran
                    <br />
                    <span className="gold-shimmer">&amp; Arabic Online</span>
                  </h1>
                  <div
                    style={{
                      marginTop: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        height: 1,
                        flex: 1,
                        maxWidth: 60,
                        background:
                          "linear-gradient(90deg, transparent, var(--gold-500))",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Amiri', serif",
                        color: "var(--gold-400)",
                        fontSize: 18,
                      }}
                    >
                      ✦ ✦ ✦
                    </span>
                    <div
                      style={{
                        height: 1,
                        flex: 1,
                        maxWidth: 60,
                        background:
                          "linear-gradient(90deg, var(--gold-500), transparent)",
                      }}
                    />
                  </div>
                </div>

                <p
                  style={{
                    color: "#a7c4b5",
                    fontSize: "clamp(15px, 2vw, 18px)",
                    lineHeight: 1.75,
                    margin: 0,
                    maxWidth: 500,
                  }}
                >
                  1-on-1 personalized online classes for kids &amp; adults.
                  Learn from certified{" "}
                  <strong style={{ color: "var(--emerald-300)" }}>
                    Al-Azhar graduates
                  </strong>{" "}
                  and native Arabic speakers — wherever you are.
                </p>

                {/* CTAs */}
                <div className="cta-row">
                  <Link
                    to="/book-free-trial"
                    style={{
                      display: "inline-block",
                      background:
                        "linear-gradient(135deg, var(--gold-400) 0%, var(--gold-500) 50%, #a07830 100%)",
                      color: "var(--ink)",
                      padding: "clamp(12px,2vw,16px) clamp(24px,4vw,36px)",
                      borderRadius: 14,
                      fontWeight: 700,
                      fontSize: "clamp(14px, 1.8vw, 16px)",
                      textDecoration: "none",
                      boxShadow: "0 8px 32px rgba(201,168,76,.4)",
                      transition: "all .25s",
                      letterSpacing: "0.02em",
                    }}
                  >
                    ✦ Book Free Trial
                  </Link>
                  <Link
                    to="/courses"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      border: "1.5px solid rgba(201,168,76,.4)",
                      color: "var(--gold-300)",
                      padding: "clamp(12px,2vw,16px) clamp(20px,3vw,32px)",
                      borderRadius: 14,
                      fontWeight: 600,
                      fontSize: "clamp(14px, 1.8vw, 16px)",
                      textDecoration: "none",
                      background: "rgba(201,168,76,.06)",
                      transition: "all .25s",
                    }}
                  >
                    View Courses <ArrowRight size={18} />
                  </Link>
                </div>

                {/* Social proof */}
                <div className="social-proof-row">
                  <div style={{ display: "flex" }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <img
                        key={i}
                        src={`https://picsum.photos/seed/user${i}/100/100`}
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          border: "2px solid var(--emerald-800)",
                          marginLeft: i === 1 ? 0 : -10,
                          objectFit: "cover",
                        }}
                        alt="Student"
                      />
                    ))}
                  </div>
                  <div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={13}
                          fill="var(--gold-400)"
                          color="var(--gold-400)"
                        />
                      ))}
                      <span
                        style={{
                          color: "#fff",
                          fontWeight: 700,
                          marginLeft: 6,
                          fontSize: 14,
                        }}
                      >
                        4.9/5
                      </span>
                    </div>
                    <p style={{ color: "#7aaa94", margin: 0, fontSize: 13 }}>
                      Trusted by 5,000+ students worldwide
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT — image card */}
              <div
                className="anim-2 float hero-image-wrap"
                style={{ position: "relative" }}
              >
                {/* Glow backdrop */}
                <div
                  style={{
                    position: "absolute",
                    inset: -24,
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(52,211,153,.12) 0%, transparent 70%)",
                    borderRadius: 32,
                    filter: "blur(20px)",
                  }}
                />

                {/* Main image */}
                <div
                  style={{
                    position: "relative",
                    borderRadius: 28,
                    overflow: "hidden",
                    boxShadow: "0 32px 80px rgba(0,0,0,.6)",
                    border: "1px solid rgba(201,168,76,.3)",
                  }}
                >
                  <img
                    src="/assets\images\images.png"
                    alt="Student learning Quran"
                    style={{
                      width: "100%",
                      height: "clamp(260px, 50vw, 480px)",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(2,44,34,.8) 0%, transparent 50%)",
                    }}
                  />

                  {/* Floating badge */}
                  <div
                    className="glass-card"
                    style={{
                      position: "absolute",
                      bottom: "clamp(12px,3vw,28px)",
                      left: "clamp(12px,3vw,24px)",
                      right: "clamp(12px,3vw,24px)",
                      padding: "clamp(12px,2vw,16px) clamp(14px,2vw,20px)",
                      borderRadius: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(8px,2vw,14px)",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background:
                          "linear-gradient(135deg, var(--gold-400), var(--gold-500))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Play size={18} fill="var(--ink)" color="var(--ink)" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "clamp(12px,1.5vw,14px)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Join a Free Trial Class
                      </div>
                      <div style={{ color: "#7aaa94", fontSize: 12 }}>
                        No credit card required
                      </div>
                    </div>
                    <div
                      style={{
                        background: "var(--gold-500)",
                        color: "var(--ink)",
                        borderRadius: 8,
                        padding: "6px 12px",
                        fontSize: 12,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      FREE
                    </div>
                  </div>
                </div>

                {/* Floating stat pill */}
                <div
                  className="green-glass hero-stat-pill"
                  style={{
                    position: "absolute",
                    top: -16,
                    right: -20,
                    padding: "12px 20px",
                    borderRadius: 14,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "var(--gold-400)",
                      fontWeight: 900,
                      fontSize: 28,
                      lineHeight: 1,
                    }}
                  >
                    100+
                  </div>
                  <div style={{ color: "#a7c4b5", fontSize: 12, marginTop: 2 }}>
                    Certified Tutors
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ STATS RIBBON */}
        <StatsRibbon />

        {/* ═══════════════════════════════════════════════════════ HOW IT WORKS */}
        <HowItWorksSection />

        {/* ═══════════════════════════════════════════════════════ COURSES */}
        <section
          style={{
            background: "var(--emerald-900)",
            position: "relative",
            overflow: "hidden",
          }}
          className="section-pad"
        >
          <div
            className="geo-bg"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div className="courses-header">
              <div>
                <p
                  className="ornament"
                  style={{
                    color: "var(--gold-400)",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    margin: "0 0 10px",
                  }}
                >
                  Our Programs
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(24px, 4vw, 48px)",
                    fontWeight: 700,
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  Explore Our <span className="grad-text">Courses</span>
                </h2>
              </div>
              <Link
                to="/courses"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--gold-300)",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: 15,
                }}
              >
                View All Courses <ArrowRight size={18} />
              </Link>
            </div>

            {/* ← COURSES GRID: 1 col mobile, 2 col tablet, 3 col desktop */}
            <div className="courses-grid">
              {(
                COURSES || [
                  {
                    id: 1,
                    title: "Quran Recitation",
                    description:
                      "Learn proper Tajweed rules and beautiful Quranic recitation from scratch.",
                    level: "Beginner",
                    slug: "quran-recitation",
                    image:
                      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=600",
                  },
                  {
                    id: 2,
                    title: "Quran Memorization",
                    description:
                      "Memorize the Holy Quran with proven techniques under expert Huffaz guidance.",
                    level: "Intermediate",
                    slug: "memorization",
                    image:
                      "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&q=80&w=600",
                  },
                  {
                    id: 3,
                    title: "Arabic Language",
                    description:
                      "Master Modern Standard Arabic or Classical Arabic for deeper understanding.",
                    level: "All Levels",
                    slug: "arabic",
                    image:
                      "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&q=80&w=600",
                  },
                ]
              )
                .slice(0, 3)
                .map((course: any) => (
                  <div
                    key={course.id}
                    className="card-lift"
                    style={{
                      borderRadius: 22,
                      overflow: "hidden",
                      border: "1px solid rgba(201,168,76,.2)",
                      background: "rgba(255,255,255,.04)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        height: "clamp(180px, 35vw, 220px)",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform .5s",
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(2,44,34,.7) 0%, transparent 60%)",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: 16,
                          left: 16,
                          background: "var(--gold-500)",
                          color: "var(--ink)",
                          fontSize: 11,
                          fontWeight: 800,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          padding: "5px 12px",
                          borderRadius: 20,
                        }}
                      >
                        {course.level}
                      </span>
                    </div>
                    <div
                      style={{
                        padding:
                          "clamp(20px, 4vw, 28px) clamp(20px, 4vw, 28px) clamp(24px, 4vw, 32px)",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "clamp(18px, 2.5vw, 21px)",
                          fontWeight: 700,
                          color: "#fff",
                          margin: "0 0 10px",
                        }}
                      >
                        {course.title}
                      </h3>
                      <p
                        style={{
                          color: "#7aaa94",
                          margin: "0 0 24px",
                          lineHeight: 1.65,
                          fontSize: 14,
                        }}
                      >
                        {course.description}
                      </p>
                      <Link
                        to={`/course/${course.slug}`}
                        style={{
                          display: "block",
                          textAlign: "center",
                          border: "1.5px solid var(--gold-500)",
                          color: "var(--gold-300)",
                          padding: "12px 0",
                          borderRadius: 12,
                          fontWeight: 600,
                          fontSize: 14,
                          textDecoration: "none",
                          background: "rgba(201,168,76,.07)",
                          transition: "all .25s",
                          letterSpacing: "0.03em",
                        }}
                      >
                        Explore Course →
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ WHY US */}
      <WhyUsSection />

        {/* ═══════════════════════════════════════════════════════ TUTORS */}
        <section
          style={{
            background: "var(--emerald-900)",
            position: "relative",
            overflow: "hidden",
          }}
          className="section-pad"
        >
          <div
            className="geo-bg"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.4,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "clamp(32px, 6vw, 60px)",
              }}
            >
              <div className="section-divider" />
              <p
                className="ornament"
                style={{
                  color: "var(--gold-400)",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  margin: "0 0 12px",
                }}
              >
                Expert Instructors
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 4vw, 48px)",
                  fontWeight: 700,
                  color: "#fff",
                  margin: 0,
                }}
              >
                Meet Our World-Class <span className="grad-text">Tutors</span>
              </h2>
            </div>

            {/* ← TUTORS GRID: 1 col mobile, 2 col tablet, 3 col desktop */}
            <div className="tutors-grid">
              {(
                TUTORS || [
                  {
                    id: 1,
                    name: "Sheikh Ahmed Al-Rashid",
                    specialties: ["Tajweed"],
                    rating: 4.9,
                    experienceYears: 12,
                    photoUrl:
                      "/assets/images/WhatsApp Image 2026-02-18 at 3.50.41 AM (1).jpeg",
                  },
                  {
                    id: 2,
                    name: "Ustadha Fatima Hassan",
                    specialties: ["Quran Memorization"],
                    rating: 4.8,
                    experienceYears: 8,
                    photoUrl: "https://picsum.photos/seed/tutor2/300/300",
                  },
                  {
                    id: 3,
                    name: "Sheikh Omar Abdullah",
                    specialties: ["Arabic Language"],
                    rating: 5.0,
                    experienceYears: 15,
                    photoUrl: "https://picsum.photos/seed/tutor3/300/300",
                  },
                ]
              )
                .slice(0, 3)
                .map((tutor: any) => (
                  <div
                    key={tutor.id}
                    className="card-lift"
                    style={{
                      textAlign: "center",
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(201,168,76,.18)",
                      borderRadius: 24,
                      padding:
                        "clamp(28px, 5vw, 44px) clamp(20px, 4vw, 28px) clamp(24px, 4vw, 36px)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        marginBottom: 20,
                      }}
                    >
                      <div
                        className="tutor-ring pulse-ring"
                        style={{ position: "relative" }}
                      >
                        <div
                          className="tutor-ring-inner"
                          style={{
                            width: "clamp(90px, 15vw, 120px)",
                            height: "clamp(90px, 15vw, 120px)",
                          }}
                        >
                          <img
                            src={tutor.photoUrl}
                            alt={tutor.name}
                            style={{
                              width: "clamp(90px, 15vw, 120px)",
                              height: "clamp(90px, 15vw, 120px)",
                              objectFit: "cover",
                              filter: "grayscale(30%)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(16px, 2.5vw, 19px)",
                        fontWeight: 700,
                        color: "#fff",
                        margin: "0 0 6px",
                      }}
                    >
                      {tutor.name}
                    </h3>
                    <p
                      style={{
                        color: "var(--gold-400)",
                        fontWeight: 600,
                        fontSize: 14,
                        margin: "0 0 14px",
                      }}
                    >
                      {tutor.specialties[0]} Specialist
                    </p>
                    <div
                      style={{
                        width: 40,
                        height: 1,
                        background: "var(--gold-500)",
                        opacity: 0.4,
                        margin: "0 auto 14px",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 8,
                        color: "#7aaa94",
                        fontSize: 13,
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Star
                          size={13}
                          fill="var(--gold-400)"
                          color="var(--gold-400)"
                        />
                        <strong style={{ color: "#fff" }}>
                          {tutor.rating}
                        </strong>
                      </span>
                      <span style={{ opacity: 0.4 }}>|</span>
                      <span>{tutor.experienceYears} yrs experience</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ FINAL CTA */}
        <section
          style={{
            background:
              "linear-gradient(135deg, #011a12 0%, var(--emerald-800) 40%, #043d2f 70%, #011a12 100%)",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
          className="section-pad"
        >
          {/* Big Arabic text bg */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Amiri', serif",
                fontSize: "clamp(100px, 18vw, 320px)",
                color: "rgba(255,255,255,.025)",
                fontWeight: 700,
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              بسم الله
            </span>
          </div>

          {/* top gold rule */}
          <div
            style={{
              width: 160,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, var(--gold-500), transparent)",
              margin: "0 auto 48px",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 720,
              margin: "0 auto",
            }}
          >
            <p
              style={{
                color: "var(--gold-400)",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                margin: "0 0 20px",
              }}
            >
              Begin Today
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 5vw, 64px)",
                fontWeight: 900,
                color: "#fff",
                margin: "0 0 20px",
                lineHeight: 1.1,
              }}
            >
              Start Your <span className="gold-shimmer">Spiritual Journey</span>{" "}
              Today
            </h2>
            <p
              style={{
                color: "#7aaa94",
                fontSize: "clamp(15px, 2vw, 18px)",
                margin: "0 0 44px",
                lineHeight: 1.7,
              }}
            >
              No payment details required for your first evaluation session.
              Experience the difference yourself.
            </p>
            <Link
              to="/book-free-trial"
              style={{
                display: "inline-block",
                background:
                  "linear-gradient(135deg, var(--gold-400) 0%, var(--gold-500) 50%, #a07830 100%)",
                color: "var(--ink)",
                padding: "clamp(14px,2.5vw,20px) clamp(32px,5vw,52px)",
                borderRadius: 18,
                fontWeight: 800,
                fontSize: "clamp(15px, 2vw, 18px)",
                textDecoration: "none",
                boxShadow: "0 12px 40px rgba(201,168,76,.45)",
                letterSpacing: "0.02em",
                transition: "all .25s",
              }}
            >
              ✦ Book My Free Trial Now
            </Link>
            <p style={{ color: "#4a7a68", fontSize: 13, marginTop: 20 }}>
              Join 5,000+ students from 50+ countries ✦ No commitment required
            </p>
          </div>

          {/* bottom gold rule */}
          <div
            style={{
              width: 160,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, var(--gold-500), transparent)",
              margin: "48px auto 0",
            }}
          />
        </section>
      </div>
    </>
  );
};

export default Home;
