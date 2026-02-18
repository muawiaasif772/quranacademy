import React, { useState } from "react";
import { Link } from "react-router-dom";
import { COURSES } from "../data";
import {
  Clock,
  BarChart,
  ArrowRight,
  CheckCircle,
  Users,
  Star,
  BookOpen,
  Mic2,
  BookMarked,
  Languages,
  Sparkles,
  Globe,
  GraduationCap,
  Filter,
  Search,
} from "lucide-react";

// ── Styles ────────────────────────────────────────────────────────────────────
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

  /* hex bg */
  .hex-bg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='.3' opacity='.055' d='M40 4L76 24L76 56L40 76L4 56L4 24Z'/%3E%3C/svg%3E");
  }
  .diamond-bg {
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 2L58 30L30 58L2 30Z' fill='none' stroke='%23c9973a' stroke-width='.4' opacity='.09'/%3E%3C/svg%3E");
  }

  /* animations */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(32px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes shimmerText {
    0%   { background-position:-500px 0; }
    100% { background-position: 500px 0; }
  }
  @keyframes glowPulse {
    0%,100% { opacity:.4; transform:scale(1); }
    50%      { opacity:.8; transform:scale(1.05); }
  }
  @keyframes orbitSpin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes borderRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes iconFloat {
    0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)}
  }
  @keyframes shimBar {
    0%{left:-100%} 100%{left:200%}
  }
  @keyframes cardIn {
    from{opacity:0;transform:translateY(28px) scale(.97)}
    to{opacity:1;transform:translateY(0) scale(1)}
  }

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

  /* hero fade animations */
  .h1{animation:fadeUp .7s cubic-bezier(.16,1,.3,1) both}
  .h2{animation:fadeUp .7s .1s cubic-bezier(.16,1,.3,1) both}
  .h3{animation:fadeUp .7s .2s cubic-bezier(.16,1,.3,1) both}
  .h4{animation:fadeUp .7s .3s cubic-bezier(.16,1,.3,1) both}

  /* card */
  .course-card {
    animation:cardIn .6s cubic-bezier(.16,1,.3,1) both;
    transition:transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s ease;
    will-change:transform;
  }
  .course-card:hover {
    transform:translateY(-12px) scale(1.015);
    box-shadow:0 48px 96px rgba(0,0,0,.45), 0 0 0 1px rgba(201,151,58,.3) !important;
  }
  .course-card:hover .c-img { transform:scale(1.07); }
  .c-img { transition:transform .7s ease; }
  .course-card:hover .c-btn {
    background:linear-gradient(135deg,var(--gold-m),var(--gold)) !important;
    color:var(--deep) !important;
    border-color:transparent !important;
  }

  /* filter pill */
  .filter-pill {
    display:inline-flex; align-items:center; gap:8px;
    padding:9px 20px; border-radius:100px;
    font-family:'Cinzel',serif; font-size:10px; font-weight:700; letter-spacing:.18em;
    text-transform:uppercase; cursor:pointer;
    border:1px solid rgba(255,255,255,.08);
    color:rgba(255,255,255,.45);
    background:rgba(255,255,255,.03);
    transition:all .25s; white-space:nowrap;
  }
  .filter-pill:hover { color:var(--gold-lt); border-color:rgba(201,151,58,.25); background:rgba(201,151,58,.05); }
  .filter-pill-active {
    background:linear-gradient(135deg,rgba(201,151,58,.2),rgba(201,151,58,.08)) !important;
    border-color:rgba(201,151,58,.5) !important;
    color:var(--gold-lt) !important;
    box-shadow:0 4px 16px rgba(201,151,58,.15) !important;
  }

  /* search bar */
  .search-bar {
    background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08);
    border-radius:14px; padding:12px 18px 12px 46px;
    color:#fff; font-family:'Nunito',sans-serif; font-size:14px;
    outline:none; width:280px; transition:all .3s;
  }
  .search-bar::placeholder { color:rgba(255,255,255,.25); }
  .search-bar:focus { border-color:rgba(201,151,58,.4); background:rgba(255,255,255,.06); width:320px; }

  /* sec-label */
  .sec-label { font-family:'Cinzel',serif; font-size:11px; font-weight:700; letter-spacing:.28em; text-transform:uppercase; color:var(--gold); }

  /* feature check row */
  .feat-row { display:flex; align-items:center; gap:10px; font-size:13px; color:rgba(255,255,255,.48); }

  /* shimmer bar on card top */
  .shim-top { position:relative; overflow:hidden; }
  .shim-top::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);
    animation:shimBar 3s ease-in-out infinite;
  }

  /* orbit icon */
  .orb-ring { animation:orbitSpin 10s linear infinite; }
  .icon-f   { animation:iconFloat 3s ease-in-out infinite; }

  /* CTA band */
  .cta-band {
    background:linear-gradient(135deg,rgba(14,66,36,.75),rgba(10,46,24,.85));
    border:1px solid rgba(201,151,58,.22);
    border-radius:28px; padding:60px 64px;
    position:relative; overflow:hidden;
  }

  @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
`;

// ── Course accent colors ──────────────────────────────────────────────────────
const ACCENT = [
  {
    color: "#c9973a",
    dim: "rgba(201,151,58,.12)",
    glow: "rgba(201,151,58,.3)",
    icon: Mic2,
  },
  {
    color: "#2fcf87",
    dim: "rgba(47,207,135,.1)",
    glow: "rgba(47,207,135,.28)",
    icon: BookMarked,
  },
  {
    color: "#7eb8ff",
    dim: "rgba(126,184,255,.1)",
    glow: "rgba(126,184,255,.28)",
    icon: Languages,
  },
  {
    color: "#ff8fa3",
    dim: "rgba(255,143,163,.1)",
    glow: "rgba(255,143,163,.25)",
    icon: BookOpen,
  },
  {
    color: "#b58cff",
    dim: "rgba(181,140,255,.1)",
    glow: "rgba(181,140,255,.28)",
    icon: GraduationCap,
  },
  {
    color: "#ffd166",
    dim: "rgba(255,209,102,.1)",
    glow: "rgba(255,209,102,.28)",
    icon: Sparkles,
  },
];

// ── Fallback courses ──────────────────────────────────────────────────────────
const FALLBACK = [
  {
    id: 1,
    title: "Quran Recitation",
    description:
      "Master the rules of Tajweed and recite the Holy Quran with beauty, precision and deep spiritual connection.",
    level: "Beginner",
    duration: "3 months",
    slug: "quran-recitation",
    image:
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=700",
    features: [
      "Proper Makharij al-Huroof",
      "Tajweed rules from scratch",
      "1-on-1 sessions",
      "Progress tracking",
      "Certificate on completion",
    ],
  },
  {
    id: 2,
    title: "Quran Memorization",
    description:
      "Embark on the sacred journey of Hifz with proven memorization techniques under the guidance of certified Huffaz.",
    level: "Intermediate",
    duration: "12 months",
    slug: "memorization",
    image:
      "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&q=80&w=700",
    features: [
      "Structured Hifz plan",
      "Daily revision system",
      "Certified Hafiz tutors",
      "Murajaah sessions",
      "Ijazah pathway",
    ],
  },
  {
    id: 3,
    title: "Arabic Language",
    description:
      "Unlock the profound beauty of Classical and Modern Standard Arabic to understand the divine words of Allah directly.",
    level: "All Levels",
    duration: "6 months",
    slug: "arabic",
    image:
      "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&q=80&w=700",
    features: [
      "Classical Arabic grammar",
      "Quran comprehension focus",
      "Reading & writing skills",
      "Native speaker tutors",
      "Flexible pacing",
    ],
  },
  {
    id: 4,
    title: "Tajweed Mastery",
    description:
      "A deep-dive advanced programme covering all Tajweed rules in depth with scholarly precision and chain of narration.",
    level: "Advanced",
    duration: "4 months",
    slug: "tajweed",
    image:
      "https://images.unsplash.com/photo-1591461528409-906b3ec61226?auto=format&fit=crop&q=80&w=700",
    features: [
      "All rules of Tajweed",
      "Makhaarij in depth",
      "Sifaat al-Huroof",
      "Practice with feedback",
      "Scholar-level certification",
    ],
  },
  {
    id: 5,
    title: "Islamic Studies",
    description:
      "Comprehensive Islamic education covering Aqeedah, Fiqh, Seerah and Hadith sciences for all ages and backgrounds.",
    level: "Beginner",
    duration: "Ongoing",
    slug: "islamic-studies",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=700",
    features: [
      "Aqeedah & beliefs",
      "Fiqh of worship",
      "Seerah studies",
      "Hadith sciences",
      "Child-friendly track",
    ],
  },
  {
    id: 6,
    title: "Kids Quran Program",
    description:
      "Fun and engaging Quran learning designed especially for children aged 4–12 with qualified and patient tutors.",
    level: "Beginner",
    duration: "Ongoing",
    slug: "kids-quran",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=700",
    features: [
      "Ages 4–12 curriculum",
      "Gamified learning",
      "Female tutors available",
      "Parent progress reports",
      "Noorani Qaida start",
    ],
  },
];

const FILTERS = ["All", "Beginner", "Intermediate", "Advanced", "All Levels"];

// ─────────────────────────────────────────────────────────────────────────────
const Courses: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const courses = COURSES && COURSES.length ? COURSES : FALLBACK;

  const filtered = courses.filter((c: any) => {
    const matchLevel = activeFilter === "All" || c.level === activeFilter;
    const matchSearch =
      !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLevel && matchSearch;
  });

  return (
    <>
      <style>{pageStyles}</style>
      <div
        style={{
          fontFamily: "'Nunito',sans-serif",
          background: "var(--deep)",
          minHeight: "100vh",
        }}
      >
        {/* ══════════════════════════════════════ HERO HEADER */}
        <section
          style={{
            background:
              "radial-gradient(ellipse 120% 80% at 20% 0%,#0d4a2a 0%,transparent 55%), radial-gradient(ellipse 80% 100% at 85% 100%,#062418 0%,transparent 50%), radial-gradient(100% 100% at 50% 50%,#020b06 0%,#030f07 100%)",
            padding: "100px 24px 80px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="hex-bg"
            style={{ position: "absolute", inset: 0, opacity: 0.65 }}
          />

          {/* arabic watermark */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "-5%",
              transform: "translateY(-50%)",
              fontFamily: "'Amiri',serif",
              fontSize: "clamp(180px,25vw,360px)",
              color: "rgba(255,255,255,.018)",
              fontWeight: 700,
              userSelect: "none",
              pointerEvents: "none",
              lineHeight: 1,
            }}
          >
            علم
          </div>

          {/* ambient glows */}
          <div
            className="glow-pulse"
            style={{
              position: "absolute",
              top: "-10%",
              left: "10%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(22,160,92,.1) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            className="glow-pulse"
            style={{
              animationDelay: "-2s",
              position: "absolute",
              bottom: "-10%",
              right: "20%",
              width: 350,
              height: 350,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(201,151,58,.07) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* top gold line */}
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
            {/* eyebrow */}
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
              <span className="sec-label">Sacred Knowledge</span>
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
                fontSize: "clamp(42px,6vw,80px)",
                fontWeight: 300,
                color: "#fff",
                lineHeight: 1.08,
                marginBottom: 20,
              }}
            >
              Our Online
              <br />
              <span className="gold-shimmer" style={{ fontWeight: 700 }}>
                Courses & Programs
              </span>
            </h1>

            <p
              className="h3"
              style={{
                color: "rgba(255,255,255,.45)",
                fontSize: 18,
                lineHeight: 1.85,
                maxWidth: 580,
                margin: "0 auto 44px",
              }}
            >
              From foundational Arabic to advanced Hifz, every programme is led
              by certified Al-Azhar scholars with personalised 1-on-1 attention.
            </p>

            {/* quick stats */}
            <div
              className="h4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 40,
                flexWrap: "wrap",
              }}
            >
              {[
                {
                  icon: <BookOpen size={16} />,
                  text: `${courses.length} Courses`,
                },
                { icon: <Users size={16} />, text: "100+ Tutors" },
                { icon: <Globe size={16} />, text: "50+ Countries" },
                {
                  icon: (
                    <Star
                      size={16}
                      fill="var(--gold-m)"
                      color="var(--gold-m)"
                    />
                  ),
                  text: "4.9 Rating",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "rgba(255,255,255,.4)",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: "var(--gold)", opacity: 0.7 }}>
                    {s.icon}
                  </span>
                  {s.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════ FILTER BAR */}
        <section
          style={{
            background: "linear-gradient(180deg,#020b06 0%,var(--forest) 100%)",
            borderBottom: "1px solid rgba(255,255,255,.05)",
            padding: "20px 24px",
            position: "sticky",
            top: 76,
            zIndex: 40,
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            style={{
              maxWidth: 1320,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            {/* filters */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <Filter
                size={14}
                color="rgba(255,255,255,.25)"
                style={{ flexShrink: 0 }}
              />
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`filter-pill${activeFilter === f ? " filter-pill-active" : ""}`}
                  style={{ border: "none", cursor: "pointer" }}
                >
                  {f === "All" && <span style={{ fontSize: 9 }}>✦</span>}
                  {f}
                </button>
              ))}
            </div>

            {/* search */}
            <div style={{ position: "relative" }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(255,255,255,.25)",
                }}
              />
              <input
                className="search-bar"
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════ COURSES GRID */}
        <section
          style={{
            padding: "80px 24px 120px",
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
            className="glow-pulse"
            style={{
              position: "absolute",
              top: "30%",
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
            {/* results count */}
            <div
              style={{
                marginBottom: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <p
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".2em",
                  color: "rgba(255,255,255,.28)",
                  textTransform: "uppercase",
                }}
              >
                Showing {filtered.length}{" "}
                {filtered.length === 1 ? "Course" : "Courses"}
              </p>
              <div
                style={{
                  height: 1,
                  flex: 1,
                  maxWidth: 200,
                  background:
                    "linear-gradient(90deg,rgba(201,151,58,.2),transparent)",
                }}
              />
            </div>

            {filtered.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 24px",
                  color: "rgba(255,255,255,.3)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 48,
                    marginBottom: 16,
                  }}
                >
                  🔍
                </div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 24,
                    marginBottom: 8,
                  }}
                >
                  No courses found
                </p>
                <p style={{ fontSize: 14 }}>
                  Try adjusting your search or filter
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "clamp(16px, 4vw, 28px)",
                }}
              >
                {filtered.map((course: any, idx: number) => {
                  const acc = ACCENT[idx % ACCENT.length];
                  const Icon = acc.icon;
                  return (
                    <div
                      key={course.id}
                      className="course-card"
                      style={{
                        borderRadius: 24,
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,.06)",
                        background: "rgba(255,255,255,.025)",
                        backdropFilter: "blur(16px)",
                        display: "flex",
                        flexDirection: "column",
                        animationDelay: `${(idx % 3) * 0.1}s`,
                        boxShadow: "0 8px 32px rgba(0,0,0,.3)",
                      }}
                    >
                      {/* ── Image ── */}
                      <div
                        style={{
                          position: "relative",
                          height: 230,
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={course.image}
                          alt={course.title}
                          className="c-img"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                        {/* overlay */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(to top,rgba(2,11,6,.9) 0%,rgba(2,11,6,.2) 60%,transparent 100%)",
                          }}
                        />

                        {/* colored top accent bar */}
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

                        {/* level pill */}
                        <span
                          style={{
                            position: "absolute",
                            top: 18,
                            left: 18,
                            background: acc.color,
                            color: "#020b06",
                            fontSize: 9,
                            fontWeight: 800,
                            letterSpacing: ".16em",
                            textTransform: "uppercase",
                            padding: "5px 13px",
                            borderRadius: 100,
                            fontFamily: "'Cinzel',serif",
                          }}
                        >
                          {course.level}
                        </span>

                        {/* icon badge */}
                        <div
                          style={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: `${acc.dim}`,
                            border: `1px solid ${acc.color}50`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          <div className="icon-f">
                            <Icon
                              size={17}
                              color={acc.color}
                              strokeWidth={1.5}
                            />
                          </div>
                        </div>

                        {/* duration badge */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: 16,
                            left: 16,
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            background: "rgba(2,11,6,.75)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255,255,255,.08)",
                            borderRadius: 100,
                            padding: "5px 12px",
                            color: "rgba(255,255,255,.6)",
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          <Clock size={11} color={acc.color} />
                          {course.duration}
                        </div>
                      </div>

                      {/* ── Body ── */}
                      <div
                        style={{
                          padding: "28px 28px 32px",
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                          position: "relative",
                        }}
                      >
                        {/* inner corner glow */}
                        <div
                          style={{
                            position: "absolute",
                            top: -30,
                            right: -20,
                            width: 120,
                            height: 120,
                            borderRadius: "50%",
                            background: `radial-gradient(circle,${acc.dim} 0%,transparent 70%)`,
                            pointerEvents: "none",
                          }}
                        />

                        <h3
                          style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 22,
                            fontWeight: 700,
                            color: "#fff",
                            marginBottom: 10,
                            lineHeight: 1.2,
                          }}
                        >
                          {course.title}
                        </h3>

                        <p
                          style={{
                            color: "rgba(255,255,255,.38)",
                            lineHeight: 1.75,
                            fontSize: 13.5,
                            marginBottom: 22,
                            flex: 1,
                          }}
                        >
                          {course.description}
                        </p>

                        {/* features */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 7,
                            marginBottom: 24,
                          }}
                        >
                          {(course.features || [])
                            .slice(0, 3)
                            .map((feat: string, fi: number) => (
                              <div key={fi} className="feat-row">
                                <CheckCircle
                                  size={13}
                                  color={acc.color}
                                  strokeWidth={2}
                                  style={{ flexShrink: 0 }}
                                />
                                {feat}
                              </div>
                            ))}
                        </div>

                        {/* divider */}
                        <div
                          style={{
                            height: 1,
                            background: `linear-gradient(90deg,transparent,${acc.color}30,transparent)`,
                            marginBottom: 22,
                          }}
                        />

                        {/* meta row */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 20,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              color: "rgba(255,255,255,.3)",
                              fontSize: 12,
                            }}
                          >
                            <Users size={12} color={acc.color} />
                            <span>1-on-1 Sessions</span>
                          </div>
                          <div style={{ display: "flex", gap: 2 }}>
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                size={11}
                                fill="var(--gold-m)"
                                color="var(--gold-m)"
                              />
                            ))}
                            <span
                              style={{
                                color: "rgba(255,255,255,.5)",
                                fontSize: 11,
                                marginLeft: 5,
                                fontWeight: 700,
                              }}
                            >
                              4.9
                            </span>
                          </div>
                        </div>

                        {/* CTA */}
                        <Link
                          to={`/course/${course.slug}`}
                          className="c-btn"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            border: `1px solid ${acc.color}40`,
                            color: "var(--gold-lt)",
                            padding: "13px 0",
                            borderRadius: 14,
                            fontWeight: 700,
                            fontSize: 12,
                            textDecoration: "none",
                            fontFamily: "'Cinzel',serif",
                            letterSpacing: ".08em",
                            background: `${acc.color}08`,
                            transition: "all .3s cubic-bezier(.16,1,.3,1)",
                          }}
                        >
                          View Curriculum <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════ BOTTOM CTA */}
        <section style={{ background: "var(--deep)", padding: "0 24px 100px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div className="cta-band">
              {/* glow inside */}
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

              {/* rotating ring decoration */}
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
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  border: "1px solid rgba(201,151,58,.1)",
                  animation: "rotateSlow 14s linear infinite reverse",
                  pointerEvents: "none",
                }}
              />

              <div
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
                <div style={{ maxWidth: 540 }}>
                  <p className="sec-label" style={{ marginBottom: 16 }}>
                    Not Sure Where to Start?
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
                    Book a Free Trial &amp; Let Us
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
                      Find Your Perfect Course
                    </em>
                  </h2>
                  <p
                    style={{
                      color: "rgba(255,255,255,.38)",
                      fontSize: 15,
                      lineHeight: 1.8,
                    }}
                  >
                    Our scholars will evaluate your current level and recommend
                    the ideal learning path — completely free, no commitment.
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
                    ✦ Book Free Trial <ArrowRight size={16} />
                  </Link>
                  <div style={{ display: "flex", gap: 20 }}>
                    {[
                      {
                        icon: <CheckCircle size={12} />,
                        text: "No credit card",
                      },
                      {
                        icon: <CheckCircle size={12} />,
                        text: "No commitment",
                      },
                    ].map((b, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          color: "rgba(255,255,255,.3)",
                          fontSize: 12,
                        }}
                      >
                        <span style={{ color: "var(--gold)", opacity: 0.7 }}>
                          {b.icon}
                        </span>
                        {b.text}
                      </div>
                    ))}
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

export default Courses;
