import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle,
  ArrowRight,
  Clock,
  BarChart,
  Users,
  Star,
  BookOpen,
  Mic2,
  BookMarked,
  Languages,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Play,
  Award,
  Globe,
  Heart,
  Shield,
} from "lucide-react";
import { COURSES } from "../data";

// ── Course accent map ──────────────────────────────────────────────────────────
const CC: Record<
  string,
  {
    color: string;
    dim: string;
    glow: string;
    ring: string;
    icon: any;
    delay: string;
  }
> = {
  "Quran Recitation": {
    color: "#c9973a",
    dim: "rgba(201,151,58,.14)",
    glow: "rgba(201,151,58,.35)",
    ring: "rgba(201,151,58,.22)",
    icon: Mic2,
    delay: "0s",
  },
  "Quran Memorization": {
    color: "#2fcf87",
    dim: "rgba(47,207,135,.11)",
    glow: "rgba(47,207,135,.3)",
    ring: "rgba(47,207,135,.2)",
    icon: BookMarked,
    delay: "-1.5s",
  },
  "Arabic Language": {
    color: "#7eb8ff",
    dim: "rgba(126,184,255,.11)",
    glow: "rgba(126,184,255,.3)",
    ring: "rgba(126,184,255,.2)",
    icon: Languages,
    delay: "-3s",
  },
  "Tajweed Mastery": {
    color: "#b58cff",
    dim: "rgba(181,140,255,.11)",
    glow: "rgba(181,140,255,.3)",
    ring: "rgba(181,140,255,.2)",
    icon: GraduationCap,
    delay: "-4.5s",
  },
  "Kids Quran Program": {
    color: "#ff8fa3",
    dim: "rgba(255,143,163,.11)",
    glow: "rgba(255,143,163,.28)",
    ring: "rgba(255,143,163,.18)",
    icon: BookOpen,
    delay: "-2s",
  },
  "Islamic Studies": {
    color: "#ffd166",
    dim: "rgba(255,209,102,.11)",
    glow: "rgba(255,209,102,.28)",
    ring: "rgba(255,209,102,.18)",
    icon: Sparkles,
    delay: "-3.5s",
  },
};
const DEFAULT_ACC = CC["Quran Recitation"];

// ── Why-us items ──────────────────────────────────────────────────────────────
const WHY = [
  {
    icon: Award,
    color: "#c9973a",
    dim: "rgba(201,151,58,.12)",
    glow: "rgba(201,151,58,.3)",
    ring: "rgba(201,151,58,.2)",
    title: "Al-Azhar Certified",
    body: "Every tutor holds an internationally recognised Ijazah from Al-Azhar University, Cairo.",
    delay: "0s",
  },
  {
    icon: Users,
    color: "#2fcf87",
    dim: "rgba(47,207,135,.1)",
    glow: "rgba(47,207,135,.28)",
    ring: "rgba(47,207,135,.18)",
    title: "1-on-1 Sessions",
    body: "Personalised learning — just you and your tutor, no distractions, at your own pace.",
    delay: "-1.5s",
  },
  {
    icon: Globe,
    color: "#7eb8ff",
    dim: "rgba(126,184,255,.1)",
    glow: "rgba(126,184,255,.28)",
    ring: "rgba(126,184,255,.18)",
    title: "Any Timezone",
    body: "Sessions available 24 / 7 to fit your schedule, wherever in the world you are.",
    delay: "-3s",
  },
  {
    icon: Shield,
    color: "#b58cff",
    dim: "rgba(181,140,255,.1)",
    glow: "rgba(181,140,255,.28)",
    ring: "rgba(181,140,255,.18)",
    title: "Satisfaction Guarantee",
    body: "Not happy after your first paid lesson? We'll refund you in full — no questions asked.",
    delay: "-4.5s",
  },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Aisha Rahman",
    loc: "London, UK",
    text: "Transformed my recitation in just 3 months. The 1-on-1 attention is unmatched.",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
  },
  {
    name: "Omar Al-Farsi",
    loc: "Dubai, UAE",
    text: "My son memorised his first Juz in 2 months. The Hafiz tutors are extraordinary.",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
  },
  {
    name: "Fatima Malik",
    loc: "Toronto, Canada",
    text: "I finally understand what I recite in salah. Life-changing curriculum.",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
  },
];

// ── Styles ─────────────────────────────────────────────────────────────────────
const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,600&family=Cinzel:wght@400;600;700;900&family=Nunito:wght@400;500;600;700;800&display=swap');
  :root{--deep:#020b06;--forest:#051610;--em-dk:#0a2e18;--em-lt:#2fcf87;--gold:#c9973a;--gold-m:#e4b558;--gold-lt:#f5d98e;}

  .hex-bg{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='.3' opacity='.055' d='M40 4L76 24L76 56L40 76L4 56L4 24Z'/%3E%3C/svg%3E");}
  .dia-bg{background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 2L58 30L30 58L2 30Z' fill='none' stroke='%23c9973a' stroke-width='.4' opacity='.09'/%3E%3C/svg%3E");}

  @keyframes fadeUp    {from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  @keyframes shimTxt   {0%{background-position:-500px 0}100%{background-position:500px 0}}
  @keyframes glowPulse {0%,100%{opacity:.35;transform:scale(1)}50%{opacity:.75;transform:scale(1.06)}}
  @keyframes rotateSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes shimBar   {0%{left:-100%}100%{left:200%}}
  @keyframes slideIn   {from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
  @keyframes iconFloat {0%,100%{transform:translateY(0) rotate(0deg)}33%{transform:translateY(-6px) rotate(3deg)}66%{transform:translateY(-3px) rotate(-2deg)}}
  @keyframes ringR     {from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes ringRev   {from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
  @keyframes pulse2    {0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.85;transform:scale(1.04)}}
  @keyframes imgScale  {from{transform:scale(1.08)}to{transform:scale(1)}}
  @keyframes borderAnim{0%,100%{box-shadow:0 0 0 1px rgba(201,151,58,.2),0 24px 64px rgba(0,0,0,.5)}50%{box-shadow:0 0 0 1px rgba(201,151,58,.5),0 32px 80px rgba(201,151,58,.08),0 24px 64px rgba(0,0,0,.5)}}
  @keyframes starPop   {0%{transform:scale(0) rotate(-30deg);opacity:0}70%{transform:scale(1.2) rotate(5deg);opacity:1}100%{transform:scale(1) rotate(0deg);opacity:1}}

  .gold-shimmer{background:linear-gradient(90deg,var(--gold) 0%,var(--gold-lt) 35%,#fff8e0 50%,var(--gold-lt) 65%,var(--gold) 100%);background-size:500px 100%;animation:shimTxt 4s linear infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .gold-text{background:linear-gradient(135deg,var(--gold-lt) 0%,var(--gold-m) 50%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .gp{animation:glowPulse 4s ease-in-out infinite;}
  .sec-label{font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);}
  .shim-top{position:relative;overflow:hidden;}
  .shim-top::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);animation:shimBar 3s ease-in-out infinite;}

  .r-outer{animation:ringR 14s linear infinite;}
  .r-inner{animation:ringRev 9s linear infinite;}

  /* Feature card */
  .feat-card{
    background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.06);
    border-radius:20px;padding:22px 24px;position:relative;overflow:hidden;
    transition:all .35s cubic-bezier(.16,1,.3,1);
    animation:slideIn .6s cubic-bezier(.16,1,.3,1) both;
  }
  .feat-card:hover{background:rgba(255,255,255,.05);transform:translateY(-4px);border-color:rgba(201,151,58,.22);box-shadow:0 20px 48px rgba(0,0,0,.4);}

  /* Why card */
  .why-card{
    background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);
    position:relative;overflow:hidden;text-align:center;
    transition:background .35s ease,transform .4s cubic-bezier(.16,1,.3,1);
    animation:slideIn .6s cubic-bezier(.16,1,.3,1) both;
  }
  .why-card:hover{background:rgba(255,255,255,.05)!important;transform:translateY(-8px);}
  .why-card:hover .r-outer{animation-duration:4s!important;}

  /* Testimonial card */
  .tcard{
    background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);
    border-radius:24px;padding:32px;position:relative;overflow:hidden;
    transition:all .4s cubic-bezier(.16,1,.3,1);
    animation:slideIn .6s cubic-bezier(.16,1,.3,1) both;
  }
  .tcard:hover{background:rgba(255,255,255,.06);transform:translateY(-6px);border-color:rgba(201,151,58,.2);box-shadow:0 32px 64px rgba(0,0,0,.45);}

  /* CTA button */
  .cta-btn{
    display:inline-flex;align-items:center;justify-content:center;gap:10px;
    background:linear-gradient(135deg,var(--gold-m),var(--gold));
    color:#020b06;padding:18px 44px;border-radius:16px;
    font-family:'Cinzel',serif;font-weight:700;font-size:13px;letter-spacing:.1em;
    text-decoration:none;
    box-shadow:0 8px 32px rgba(201,151,58,.4),inset 0 1px 0 rgba(255,255,255,.25);
    transition:all .3s;
  }
  .cta-btn:hover{transform:scale(1.04);box-shadow:0 12px 40px rgba(201,151,58,.6),inset 0 1px 0 rgba(255,255,255,.25);}

  .outline-btn{
    display:inline-flex;align-items:center;gap:8px;
    border:1px solid rgba(201,151,58,.35);color:var(--gold-lt);
    padding:16px 32px;border-radius:14px;
    font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:.1em;
    text-decoration:none;transition:all .3s;background:rgba(201,151,58,.06);
  }
  .outline-btn:hover{background:rgba(201,151,58,.14);border-color:rgba(201,151,58,.6);}

  /* Responsive */
  @media(max-width:1024px){
    .hero-grid{grid-template-columns:1fr!important;}
    .why-grid{grid-template-columns:repeat(2,1fr)!important;}
  }
  @media(max-width:640px){
    .why-grid{grid-template-columns:1fr!important;}
    .feat-grid{grid-template-columns:1fr!important;}
    .tcard-grid{grid-template-columns:1fr!important;}
    .meta-row{flex-wrap:wrap;gap:12px!important;}
    .cta-row{flex-direction:column!important;align-items:stretch!important;}
    .cta-btn,.outline-btn{justify-content:center;}
    .sticky-sidebar{position:static!important;}
  }
`;

// ── Orbit icon (same as StatsRibbon / Reviews) ────────────────────────────────
const Orbit: React.FC<{
  c: string;
  dim: string;
  glow: string;
  ring: string;
  Icon: any;
  delay: string;
  sz?: number;
}> = ({ c, dim, glow, ring, Icon, delay, sz = 72 }) => {
  const ic = Math.round(sz * 0.68),
    pad = Math.round(sz * 0.12);
  return (
    <div
      style={{
        width: sz,
        height: sz,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        className="r-outer"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `1px dashed ${ring}`,
        }}
      />
      <div
        className="r-inner"
        style={{
          position: "absolute",
          inset: pad,
          borderRadius: "50%",
          border: `1px solid ${dim}`,
        }}
      />
      <div
        style={{
          width: ic,
          height: ic,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 35%,${dim},rgba(0,0,0,.3))`,
          border: `1.5px solid ${c}35`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
          boxShadow: `0 0 24px ${glow},inset 0 1px 0 rgba(255,255,255,.07)`,
        }}
      >
        <div
          style={{ animation: `iconFloat 5s ${delay} ease-in-out infinite` }}
        >
          <Icon size={Math.round(ic * 0.37)} color={c} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

// ── Not found page ─────────────────────────────────────────────────────────────
const NotFound = () => (
  <>
    <style>{S}</style>
    <div
      style={{
        background: "var(--deep)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Nunito',sans-serif",
        padding: 24,
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(60px,12vw,120px)",
          color: "rgba(255,255,255,.04)",
          fontWeight: 700,
          lineHeight: 1,
          marginBottom: -20,
        }}
      >
        404
      </div>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(28px,4vw,48px)",
          fontWeight: 600,
          color: "#fff",
          marginBottom: 12,
        }}
      >
        Course Not Found
      </h1>
      <p style={{ color: "rgba(255,255,255,.38)", marginBottom: 32 }}>
        That course doesn't exist or has been moved.
      </p>
      <Link to="/courses" className="cta-btn">
        ← Return to Courses
      </Link>
    </div>
  </>
);

// ── Main component ─────────────────────────────────────────────────────────────
const CourseDetail: React.FC = () => {
  const { slug } = useParams();
  const course = COURSES.find((c: any) => c.slug === slug);
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!course) return <NotFound />;

  const a = CC[course.title] || DEFAULT_ACC;
  const Icon = a.icon;

  return (
    <>
      <style>{S}</style>
      <div
        style={{
          fontFamily: "'Nunito',sans-serif",
          background: "var(--deep)",
          minHeight: "100vh",
        }}
      >
        {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background:
              "radial-gradient(ellipse 120% 80% at 15% 0%,#0d4a2a 0%,transparent 55%), radial-gradient(ellipse 80% 100% at 90% 100%,#062418 0%,transparent 50%), #020b06",
            padding: "100px 24px 80px",
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
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background:
                "linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",
            }}
          />

          {/* ambient glows */}
          <div
            className="gp"
            style={{
              position: "absolute",
              top: "-10%",
              left: "5%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(22,160,92,.08) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            className="gp"
            style={{
              animationDelay: "-2s",
              position: "absolute",
              bottom: "-15%",
              right: "20%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: `radial-gradient(circle,${a.dim} 0%,transparent 70%)`,
              pointerEvents: "none",
            }}
          />

          {/* Arabic watermark */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "-2%",
              transform: "translateY(-50%)",
              fontFamily: "'Amiri',serif",
              fontSize: "clamp(120px,18vw,280px)",
              color: "rgba(255,255,255,.015)",
              fontWeight: 700,
              userSelect: "none",
              pointerEvents: "none",
              lineHeight: 1,
            }}
          >
            تعلّم
          </div>

          <div
            className="hero-grid"
            style={{
              maxWidth: 1320,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(40px,6vw,80px)",
              alignItems: "start",
            }}
          >
            {/* ── LEFT: Text ── */}
            <div style={{ paddingTop: 20 }}>
              {/* Breadcrumb */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 28,
                  animation: "fadeUp .6s cubic-bezier(.16,1,.3,1) both",
                }}
              >
                <Link
                  to="/courses"
                  style={{
                    color: "rgba(255,255,255,.3)",
                    fontSize: 12,
                    fontFamily: "'Cinzel',serif",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "color .25s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--gold)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,.3)")
                  }
                >
                  Courses
                </Link>
                <ChevronRight size={12} color="rgba(255,255,255,.2)" />
                <span
                  style={{
                    color: "rgba(255,255,255,.45)",
                    fontSize: 12,
                    fontFamily: "'Cinzel',serif",
                    letterSpacing: ".1em",
                  }}
                >
                  {course.title}
                </span>
              </div>

              {/* Level pill */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 24,
                  animation: "fadeUp .6s .05s cubic-bezier(.16,1,.3,1) both",
                }}
              >
                <div
                  style={{
                    height: 1,
                    width: 48,
                    background: `linear-gradient(90deg,transparent,${a.color}80)`,
                  }}
                />
                <span
                  style={{
                    background: a.dim,
                    border: `1px solid ${a.color}40`,
                    color: a.color,
                    borderRadius: 100,
                    padding: "5px 16px",
                    fontSize: 9,
                    fontFamily: "'Cinzel',serif",
                    fontWeight: 700,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                  }}
                >
                  {course.level} PROGRAM
                </span>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(40px,5.5vw,72px)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.08,
                  marginBottom: 24,
                  animation: "fadeUp .6s .1s cubic-bezier(.16,1,.3,1) both",
                }}
              >
                {course.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="gold-shimmer">
                  {course.title.split(" ").slice(-1)[0]}
                </span>
              </h1>

              {/* Description */}
              <p
                style={{
                  color: "rgba(255,255,255,.5)",
                  fontSize: "clamp(15px,1.5vw,18px)",
                  lineHeight: 1.85,
                  marginBottom: 36,
                  maxWidth: 540,
                  animation: "fadeUp .6s .15s cubic-bezier(.16,1,.3,1) both",
                }}
              >
                {course.longDescription || course.description}
              </p>

              {/* Meta row */}
              <div
                className="meta-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  marginBottom: 40,
                  animation: "fadeUp .6s .2s cubic-bezier(.16,1,.3,1) both",
                }}
              >
                {[
                  { icon: Clock, label: course.duration || "Flexible" },
                  { icon: BarChart, label: course.level },
                  { icon: Users, label: "1-on-1 Sessions" },
                ].map(({ icon: MI, label }, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.07)",
                      borderRadius: 100,
                      padding: "8px 16px",
                    }}
                  >
                    <MI size={13} color={a.color} strokeWidth={1.5} />
                    <span
                      style={{
                        color: "rgba(255,255,255,.5)",
                        fontSize: 12,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stars */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 44,
                  animation: "fadeUp .6s .25s cubic-bezier(.16,1,.3,1) both",
                }}
              >
                <div style={{ display: "flex", gap: 3 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={16}
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
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  4.9
                </span>
                <div
                  style={{
                    width: 1,
                    height: 16,
                    background: "rgba(255,255,255,.12)",
                  }}
                />
                <span style={{ color: "rgba(255,255,255,.35)", fontSize: 12 }}>
                  1,200+ students enrolled
                </span>
              </div>

              {/* CTA row */}
              <div
                className="cta-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  animation: "fadeUp .6s .3s cubic-bezier(.16,1,.3,1) both",
                }}
              >
                <Link to="/book-free-trial" className="cta-btn">
                  ✦ Start Free Trial <ArrowRight size={16} />
                </Link>
                <Link to="/courses" className="outline-btn">
                  <BookOpen size={14} /> All Courses
                </Link>
              </div>
            </div>

            {/* ── RIGHT: Sticky image card ── */}
            <div
              className="sticky-sidebar"
              style={{ position: "sticky", top: 100 }}
            >
              {/* outer glow ring */}
              <div style={{ position: "relative" }}>
                <div
                  className="gp"
                  style={{
                    position: "absolute",
                    inset: -20,
                    borderRadius: 36,
                    background: `radial-gradient(ellipse,${a.dim} 0%,transparent 65%)`,
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />

                {/* rotating decorative ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: -12,
                    borderRadius: 36,
                    border: `1px dashed ${a.ring}`,
                    animation: "rotateSlow 30s linear infinite",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />

                {/* image card */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    borderRadius: 32,
                    overflow: "hidden",
                    border: `1px solid ${a.color}25`,
                    boxShadow: `0 32px 80px rgba(0,0,0,.6),0 0 0 1px ${a.color}15`,
                    animation: "borderAnim 4s ease-in-out infinite",
                  }}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    onLoad={() => setImgLoaded(true)}
                    style={{
                      width: "100%",
                      aspectRatio: "4/5",
                      objectFit: "cover",
                      display: "block",
                      animation: imgLoaded
                        ? "imgScale 1.5s ease-out both"
                        : "none",
                    }}
                  />

                  {/* gradient overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top,rgba(2,11,6,.92) 0%,rgba(2,11,6,.2) 55%,transparent 100%)",
                    }}
                  />

                  {/* top bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: `linear-gradient(90deg,transparent,${a.color},transparent)`,
                    }}
                  />

                  {/* floating orbit icon top-right */}
                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      zIndex: 3,
                    }}
                  >
                    <Orbit
                      c={a.color}
                      dim={a.dim}
                      glow={a.glow}
                      ring={a.ring}
                      Icon={Icon}
                      delay={a.delay}
                      sz={64}
                    />
                  </div>

                  {/* level badge top-left */}
                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      left: 20,
                      background: a.color,
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
                  </div>

                  {/* bottom CTA overlay */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "clamp(20px,3vw,32px)",
                      zIndex: 2,
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(2,11,6,.8)",
                        backdropFilter: "blur(20px)",
                        border: `1px solid ${a.color}25`,
                        borderRadius: 20,
                        padding: "clamp(16px,2vw,24px)",
                      }}
                    >
                      {/* duration + level mini row */}
                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          marginBottom: 16,
                          flexWrap: "wrap",
                        }}
                      >
                        {[
                          { icon: Clock, t: course.duration || "Flexible" },
                          { icon: Star, t: "4.9 Rating" },
                          { icon: Users, t: "1-on-1" },
                        ].map(({ icon: MI, t }, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              background: "rgba(255,255,255,.06)",
                              borderRadius: 100,
                              padding: "5px 12px",
                            }}
                          >
                            <MI size={11} color={a.color} strokeWidth={1.5} />
                            <span
                              style={{
                                color: "rgba(255,255,255,.6)",
                                fontSize: 10,
                                fontWeight: 700,
                              }}
                            >
                              {t}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Link
                        to="/book-free-trial"
                        className="cta-btn"
                        style={{
                          width: "100%",
                          padding: "15px 0",
                          borderRadius: 12,
                          fontSize: 12,
                        }}
                      >
                        ✦ Book Free Trial <ArrowRight size={15} />
                      </Link>
                      <p
                        style={{
                          textAlign: "center",
                          color: "rgba(255,255,255,.25)",
                          fontSize: 11,
                          marginTop: 10,
                        }}
                      >
                        No credit card · No commitment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ WHAT YOU'LL MASTER ════════════════════════════════════════════════ */}
        <section
          style={{
            background: "linear-gradient(180deg,#020b06 0%,var(--forest) 100%)",
            padding: "80px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="dia-bg"
            style={{ position: "absolute", inset: 0, opacity: 0.9 }}
          />
          <div
            className="gp"
            style={{
              position: "absolute",
              top: "30%",
              right: "-5%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: `radial-gradient(circle,${a.dim} 0%,transparent 70%)`,
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
            {/* header */}
            <div style={{ textAlign: "center", marginBottom: 56 }}>
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
                  Curriculum
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
                  marginBottom: 14,
                }}
              >
                What You'll{" "}
                <span className="gold-shimmer" style={{ fontWeight: 700 }}>
                  Master
                </span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,.38)",
                  fontSize: 15,
                  maxWidth: 460,
                  margin: "0 auto",
                }}
              >
                Every topic is taught to a professional standard under the
                guidance of certified scholars.
              </p>
            </div>

            {/* feature cards grid */}
            <div
              className="feat-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                gap: "clamp(12px,2.5vw,20px)",
              }}
            >
              {(course.features || []).map((f: string, i: number) => (
                <div
                  key={i}
                  className="feat-card"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {/* shimmer */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      overflow: "hidden",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        width: "40%",
                        background:
                          "linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent)",
                        animation: `shimBar ${3 + i * 0.4}s ease-in-out infinite`,
                      }}
                    />
                  </div>
                  {/* top bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: `linear-gradient(90deg,transparent,${a.color},transparent)`,
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: a.dim,
                        border: `1px solid ${a.color}35`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: `0 0 12px ${a.glow}`,
                      }}
                    >
                      <CheckCircle size={16} color={a.color} strokeWidth={2} />
                    </div>
                    <span
                      style={{
                        color: "rgba(255,255,255,.78)",
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: 1.45,
                      }}
                    >
                      {f}
                    </span>
                  </div>
                  {/* bottom accent */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: `linear-gradient(90deg,transparent,${a.color}18,transparent)`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY CHOOSE US ══════════════════════════════════════════════════════ */}
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
            className="gp"
            style={{
              position: "absolute",
              top: "20%",
              left: "-5%",
              width: 450,
              height: 450,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(22,160,92,.07) 0%,transparent 70%)",
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
                  Why Choose Us
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
                  marginBottom: 14,
                }}
              >
                Taught by{" "}
                <span className="gold-shimmer" style={{ fontWeight: 700 }}>
                  True Scholars
                </span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,.38)",
                  fontSize: 15,
                  maxWidth: 480,
                  margin: "0 auto",
                }}
              >
                Our platform combines centuries-old scholarship with modern
                personalised teaching.
              </p>
            </div>

            {/* Why cards — same stat-card orbit style */}
            <div
              className="why-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 0,
                borderRadius: 28,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.06)",
              }}
            >
              {WHY.map((w, i) => {
                const WIcon = w.icon;
                return (
                  <div
                    key={i}
                    className="why-card"
                    style={{
                      borderRight:
                        i < 3 ? "1px solid rgba(255,255,255,.05)" : "none",
                      padding: "clamp(28px,3vw,44px) clamp(18px,2vw,28px)",
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    {/* shimmer */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        overflow: "hidden",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          bottom: 0,
                          width: "40%",
                          background:
                            "linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent)",
                          animation: `shimBar ${3.5 + i * 0.4}s ease-in-out infinite`,
                        }}
                      />
                    </div>
                    {/* top bar */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: `linear-gradient(90deg,transparent,${w.color},transparent)`,
                      }}
                    />
                    {i < 3 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "15%",
                          bottom: "15%",
                          right: 0,
                          width: 1,
                          background: `linear-gradient(180deg,transparent,${w.color}50,transparent)`,
                          opacity: 0.4,
                        }}
                      />
                    )}
                    <div
                      style={{
                        position: "absolute",
                        top: -30,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 160,
                        height: 100,
                        background: `radial-gradient(ellipse,${w.dim} 0%,transparent 70%)`,
                        pointerEvents: "none",
                      }}
                    />

                    <div
                      style={{
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginBottom: 20 }}>
                        <Orbit
                          c={w.color}
                          dim={w.dim}
                          glow={w.glow}
                          ring={w.ring}
                          Icon={WIcon}
                          delay={w.delay}
                          sz={72}
                        />
                      </div>
                      <div
                        style={{
                          width: 28,
                          height: 1,
                          marginBottom: 16,
                          background: `linear-gradient(90deg,transparent,${w.color},transparent)`,
                        }}
                      />
                      <div
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: "clamp(11px,1.4vw,13px)",
                          fontWeight: 700,
                          color: "#fff",
                          letterSpacing: ".06em",
                          marginBottom: 10,
                          textAlign: "center",
                        }}
                      >
                        {w.title}
                      </div>
                      <p
                        style={{
                          color: "rgba(255,255,255,.38)",
                          fontSize: "clamp(12px,1.1vw,13px)",
                          lineHeight: 1.7,
                          textAlign: "center",
                        }}
                      >
                        {w.body}
                      </p>
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background: `linear-gradient(90deg,transparent,${w.color}20,transparent)`,
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ STUDENT TESTIMONIALS ══════════════════════════════════════════════ */}
        <section
          style={{
            background: "linear-gradient(180deg,var(--em-dk) 0%,#020b06 100%)",
            padding: "80px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="hex-bg"
            style={{ position: "absolute", inset: 0, opacity: 0.4 }}
          />
          <div
            className="gp"
            style={{
              position: "absolute",
              bottom: "5%",
              right: "-5%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(22,160,92,.05) 0%,transparent 70%)",
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
            <div style={{ textAlign: "center", marginBottom: 56 }}>
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
                  Student Stories
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
                }}
              >
                Hear From Our{" "}
                <span className="gold-shimmer" style={{ fontWeight: 700 }}>
                  Students
                </span>
              </h2>
            </div>

            <div
              className="tcard-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "clamp(14px,2.5vw,22px)",
              }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="tcard"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {/* shimmer */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      overflow: "hidden",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        width: "40%",
                        background:
                          "linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent)",
                        animation: `shimBar ${3 + i * 0.5}s ease-in-out infinite`,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: `linear-gradient(90deg,transparent,${a.color},transparent)`,
                    }}
                  />
                  {/* floating quote */}
                  <div
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 18,
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 80,
                      color: a.color,
                      opacity: 0.08,
                      lineHeight: 1,
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    "
                  </div>

                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={13}
                          fill="var(--gold-m)"
                          color="var(--gold-m)"
                        />
                      ))}
                    </div>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: "clamp(15px,1.4vw,17px)",
                        fontStyle: "italic",
                        fontWeight: 600,
                        color: "rgba(255,255,255,.75)",
                        lineHeight: 1.75,
                        marginBottom: 24,
                      }}
                    >
                      "{t.text}"
                    </p>
                    <div
                      style={{
                        height: 1,
                        marginBottom: 20,
                        background: `linear-gradient(90deg,transparent,${a.color}25,transparent)`,
                      }}
                    />
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <img
                        src={t.avatar}
                        alt={t.name}
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          border: `1.5px solid ${a.color}50`,
                          objectFit: "cover",
                          boxShadow: `0 0 12px ${a.glow}`,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontFamily: "'Cinzel',serif",
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#fff",
                            marginBottom: 2,
                          }}
                        >
                          {t.name}
                        </div>
                        <div
                          style={{
                            color: "rgba(255,255,255,.3)",
                            fontSize: 10,
                          }}
                        >
                          {t.loc}
                        </div>
                      </div>
                      <div
                        style={{
                          marginLeft: "auto",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Heart
                          size={12}
                          fill="var(--gold-m)"
                          color="var(--gold-m)"
                        />
                        <span
                          style={{
                            color: "rgba(255,255,255,.25)",
                            fontSize: 10,
                          }}
                        >
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BOTTOM CTA ═══════════════════════════════════════════════════════ */}
        <section style={{ background: "#020b06", padding: "80px 24px 100px" }}>
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
                className="gp"
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
                    Ready to Begin?
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
                    Start Your Journey in
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
                      {course.title}
                    </em>
                  </h2>
                  <p
                    style={{
                      color: "rgba(255,255,255,.38)",
                      fontSize: 15,
                      lineHeight: 1.8,
                    }}
                  >
                    Your first session is completely free. No commitment, no
                    credit card — just pure learning with a certified scholar.
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
                    className="cta-btn"
                    style={{ fontSize: 13, padding: "18px 44px" }}
                  >
                    ✦ Book Free Trial <ArrowRight size={16} />
                  </Link>
                  <div style={{ display: "flex", gap: 16 }}>
                    {[
                      { icon: CheckCircle, t: "No credit card" },
                      { icon: CheckCircle, t: "No commitment" },
                    ].map(({ icon: MI, t }, i) => (
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
                        <MI size={12} color="var(--gold)" strokeWidth={2} />
                        {t}
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

export default CourseDetail;
