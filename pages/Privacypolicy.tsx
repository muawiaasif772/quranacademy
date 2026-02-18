import React, { useState, useRef, useEffect } from "react";
import {
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  Bell,
  Globe,
  Trash2,
  Mail,
  ChevronDown,
  ArrowRight,
  FileText,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// STYLES — exact same palette as FAQ / Contact
// ─────────────────────────────────────────────────────────────────────────────
const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=Cinzel:wght@400;600;700;900&family=Nunito:wght@400;500;600;700;800&display=swap');

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
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes lineGrow  { from{width:0} to{width:100%} }

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
  .float-anim { animation:float 6s ease-in-out infinite; }

  .h1{animation:fadeUp .7s cubic-bezier(.16,1,.3,1) both}
  .h2{animation:fadeUp .7s .1s cubic-bezier(.16,1,.3,1) both}
  .h3{animation:fadeUp .7s .2s cubic-bezier(.16,1,.3,1) both}
  .h4{animation:fadeUp .7s .3s cubic-bezier(.16,1,.3,1) both}

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

  /* TOC sidebar link */
  .toc-link {
    display:flex;align-items:center;gap:10px;
    padding:10px 14px;border-radius:12px;
    color:rgba(255,255,255,.35);
    font-family:'Nunito',sans-serif;font-size:13px;font-weight:600;
    cursor:pointer;transition:all .25s;border:none;background:none;text-align:left;
    width:100%;
  }
  .toc-link:hover { color:var(--gold-lt); background:rgba(201,151,58,.06); }
  .toc-link.active {
    color:var(--gold-m);background:rgba(201,151,58,.1);
    border-left:2px solid var(--gold);
  }
  .toc-link .toc-num {
    font-family:'Cinzel',serif;font-size:9px;font-weight:700;
    color:var(--gold);opacity:.6;min-width:18px;
    transition:opacity .25s;
  }
  .toc-link.active .toc-num { opacity:1; }

  /* Policy section card */
  .policy-section {
    background:rgba(255,255,255,.025);
    border:1px solid rgba(255,255,255,.07);
    border-radius:24px;padding:clamp(28px,5vw,44px);
    position:relative;overflow:hidden;
    transition:border-color .3s, box-shadow .3s;
    scroll-margin-top:100px;
  }
  .policy-section::before {
    content:'';position:absolute;top:0;left:0;right:0;height:2px;
    background:linear-gradient(90deg,transparent,rgba(201,151,58,.0),transparent);
    transition:background .4s;
  }
  .policy-section:hover { border-color:rgba(201,151,58,.18); }
  .policy-section:hover::before { background:linear-gradient(90deg,transparent,rgba(201,151,58,.5),transparent); }

  /* section heading line */
  .section-title-line {
    display:flex;align-items:center;gap:16px;margin-bottom:24px;
  }

  /* highlight box */
  .highlight-box {
    background:rgba(201,151,58,.06);
    border:1px solid rgba(201,151,58,.15);
    border-left:3px solid var(--gold);
    border-radius:12px;padding:18px 20px;
    margin:20px 0;
  }

  /* info row */
  .info-row {
    display:flex;gap:12px;align-items:flex-start;
    padding:14px 0;border-bottom:1px solid rgba(255,255,255,.05);
  }
  .info-row:last-child { border-bottom:none; padding-bottom:0; }

  /* data type pill */
  .data-pill {
    display:inline-flex;align-items:center;gap:6px;
    padding:6px 14px;border-radius:100px;
    font-family:'Cinzel',serif;font-size:9px;font-weight:700;
    letter-spacing:.12em;text-transform:uppercase;
    background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);
    color:rgba(255,255,255,.4);margin:4px;
    transition:all .25s;
  }
  .data-pill:hover { border-color:rgba(201,151,58,.3); color:var(--gold-lt); background:rgba(201,151,58,.06); }

  /* rights card */
  .right-card {
    background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);
    border-radius:16px;padding:20px;
    transition:all .3s;
  }
  .right-card:hover {
    border-color:rgba(201,151,58,.2);
    transform:translateY(-3px);
    box-shadow:0 16px 40px rgba(0,0,0,.35);
  }

  /* sticky TOC */
  .toc-sticky {
    position:sticky;top:100px;
    max-height:calc(100vh - 140px);
    overflow-y:auto;
    scrollbar-width:thin;
    scrollbar-color:rgba(201,151,58,.2) transparent;
  }
  .toc-sticky::-webkit-scrollbar { width:3px; }
  .toc-sticky::-webkit-scrollbar-thumb { background:rgba(201,151,58,.2);border-radius:4px; }

  /* last updated badge */
  .updated-badge {
    display:inline-flex;align-items:center;gap:8px;
    padding:8px 18px;border-radius:100px;
    background:rgba(47,207,135,.08);border:1px solid rgba(47,207,135,.2);
    color:#2fcf87;font-family:'Nunito',sans-serif;font-size:12px;font-weight:700;
  }

  /* body text */
  .body-text {
    color:rgba(255,255,255,.5);
    font-family:'Nunito',sans-serif;
    font-size:15px;line-height:1.9;
  }

  /* responsive */
  @media(max-width:1024px) {
    .pp-layout { grid-template-columns:1fr!important; }
    .toc-sticky { position:static!important; max-height:none!important; }
    .toc-container { margin-bottom:32px; }
    .rights-grid { grid-template-columns:1fr 1fr!important; }
  }
  @media(max-width:640px) {
    .rights-grid { grid-template-columns:1fr!important; }
    .quick-stats { grid-template-columns:1fr 1fr!important; }
  }
`;

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
      { threshold: 0.06 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
};

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const sections = [
  {
    id: "information",
    num: "01",
    label: "Information We Collect",
    icon: Database,
  },
  { id: "usage", num: "02", label: "How We Use It", icon: Eye },
  { id: "sharing", num: "03", label: "Sharing & Disclosure", icon: Globe },
  { id: "security", num: "04", label: "Data Security", icon: Lock },
  { id: "rights", num: "05", label: "Your Rights", icon: UserCheck },
  { id: "cookies", num: "06", label: "Cookies & Tracking", icon: Bell },
  { id: "retention", num: "07", label: "Data Retention", icon: Trash2 },
  { id: "contact", num: "08", label: "Contact & Updates", icon: Mail },
];

const yourRights = [
  {
    icon: Eye,
    title: "Right to Access",
    desc: "Request a complete copy of all personal data we hold about you at any time.",
    color: "#7eb8ff",
  },
  {
    icon: RefreshCw,
    title: "Right to Rectify",
    desc: "Correct any inaccurate or incomplete personal information we have on file.",
    color: "var(--gold-m)",
  },
  {
    icon: Trash2,
    title: "Right to Erasure",
    desc: "Request deletion of your personal data subject to legal retention obligations.",
    color: "#ff8fa3",
  },
  {
    icon: Shield,
    title: "Right to Restrict",
    desc: "Limit the way we process your data in certain circumstances.",
    color: "#2fcf87",
  },
  {
    icon: FileText,
    title: "Right to Portability",
    desc: "Receive your data in a structured, machine-readable format.",
    color: "#b58cff",
  },
  {
    icon: Bell,
    title: "Right to Object",
    desc: "Object to processing based on legitimate interests or for direct marketing.",
    color: "#ffd166",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION WRAPPER
// ─────────────────────────────────────────────────────────────────────────────
const PolicySection: React.FC<{
  id: string;
  num: string;
  icon: React.ElementType;
  title: string;
  accentColor?: string;
  children: React.ReactNode;
}> = ({
  id,
  num,
  icon: Icon,
  title,
  accentColor = "var(--gold)",
  children,
}) => {
  const { ref, vis } = useReveal();
  return (
    <div
      id={id}
      ref={ref}
      className="policy-section"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: "opacity .7s ease, transform .7s ease",
        marginBottom: 20,
      }}
    >
      <div className="section-title-line">
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 16,
            flexShrink: 0,
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: accentColor,
          }}
        >
          <Icon size={22} />
        </div>
        <div>
          <p
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: 9,
              fontWeight: 700,
              color: accentColor,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              marginBottom: 4,
              opacity: 0.7,
            }}
          >
            {num}
          </p>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(20px,3vw,28px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h3>
        </div>
      </div>
      <div
        style={{
          height: 1,
          background: `linear-gradient(90deg,${accentColor}40,transparent)`,
          marginBottom: 24,
        }}
      />
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState("information");
  const heroReveal = useReveal();
  const tocReveal = useReveal();

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
            padding: "clamp(100px,14vw,160px) 24px clamp(60px,8vw,90px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="hex-bg"
            style={{ position: "absolute", inset: 0, opacity: 0.6 }}
          />
          {/* Gold top border */}
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

          {/* Arabic watermark */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "-3%",
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
            خصوصية
          </div>

          {/* Glow orb */}
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
                "radial-gradient(circle,rgba(22,160,92,.1) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Rotating ring */}
          <div
            style={{
              position: "absolute",
              bottom: "-20%",
              right: "-10%",
              width: 600,
              height: 600,
              borderRadius: "50%",
              border: "1px dashed rgba(201,151,58,.07)",
              animation: "rotateSlow 70s linear infinite",
              pointerEvents: "none",
            }}
          />

          <div
            ref={heroReveal.ref}
            style={{
              maxWidth: 800,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              opacity: heroReveal.vis ? 1 : 0,
              transform: heroReveal.vis ? "translateY(0)" : "translateY(40px)",
              transition: "opacity .8s ease, transform .8s ease",
            }}
          >
            {/* Label row */}
            <div
              className="h1"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                marginBottom: 24,
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
              <span className="sec-label">Legal & Transparency</span>
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
                fontSize: "clamp(48px,9vw,104px)",
                fontWeight: 300,
                lineHeight: 1.0,
                marginBottom: 20,
                color: "#fff",
              }}
            >
              Privacy{" "}
              <span
                className="gold-shimmer"
                style={{ fontWeight: 700, fontStyle: "italic" }}
              >
                Policy
              </span>
            </h1>

            <p
              className="h3"
              style={{
                color: "rgba(255,255,255,.42)",
                fontSize: 17,
                lineHeight: 1.85,
                maxWidth: 520,
                margin: "0 auto 36px",
              }}
            >
              We are committed to protecting your personal information and being
              transparent about how it is used.
            </p>

            {/* Last updated + stats */}
            <div
              className="h4"
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <span className="updated-badge">
                <RefreshCw size={13} />
                Last updated: January 15, 2025
              </span>
              <span
                style={{
                  padding: "8px 18px",
                  borderRadius: 100,
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.08)",
                  color: "rgba(255,255,255,.35)",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                Effective: February 1, 2025
              </span>
            </div>

            {/* Quick stats */}
            <div
              className="quick-stats"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 12,
                marginTop: 44,
              }}
            >
              {[
                { value: "8", label: "Sections" },
                { value: "GDPR", label: "Compliant" },
                { value: "256-bit", label: "Encryption" },
                { value: "0", label: "Data Sold" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: "16px 12px",
                    textAlign: "center",
                    background: "rgba(255,255,255,.025)",
                    border: "1px solid rgba(255,255,255,.06)",
                    borderRadius: 16,
                  }}
                >
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
                      fontSize: 10,
                      fontFamily: "'Cinzel',serif",
                      letterSpacing: ".08em",
                      marginTop: 5,
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ CONTENT */}
        <section
          style={{
            padding: "clamp(60px,10vw,100px) 24px",
            background:
              "linear-gradient(180deg,var(--forest) 0%,var(--deep) 100%)",
            position: "relative",
          }}
        >
          <div
            className="hex-bg"
            style={{ position: "absolute", inset: 0, opacity: 0.35 }}
          />
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              className="pp-layout"
              style={{
                display: "grid",
                gridTemplateColumns: "260px 1fr",
                gap: "clamp(24px,4vw,60px)",
                alignItems: "start",
              }}
            >
              {/* ── TOC Sidebar */}
              <div
                ref={tocReveal.ref}
                className="toc-container"
                style={{
                  opacity: tocReveal.vis ? 1 : 0,
                  transform: tocReveal.vis
                    ? "translateX(0)"
                    : "translateX(-24px)",
                  transition: "opacity .7s ease, transform .7s ease",
                }}
              >
                <div className="toc-sticky">
                  <div
                    style={{
                      background: "rgba(255,255,255,.025)",
                      border: "1px solid rgba(255,255,255,.07)",
                      borderRadius: 22,
                      padding: "24px 16px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Gold top accent */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background:
                          "linear-gradient(90deg,transparent,var(--gold),transparent)",
                      }}
                    />

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 20,
                        paddingLeft: 4,
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 10,
                          background: "rgba(201,151,58,.12)",
                          border: "1px solid rgba(201,151,58,.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--gold)",
                        }}
                      >
                        <FileText size={15} />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: 10,
                          fontWeight: 700,
                          color: "var(--gold)",
                          letterSpacing: ".16em",
                        }}
                      >
                        CONTENTS
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      {sections.map((sec) => (
                        <button
                          key={sec.id}
                          className={`toc-link${activeSection === sec.id ? " active" : ""}`}
                          onClick={() => scrollTo(sec.id)}
                        >
                          <span className="toc-num">{sec.num}</span>
                          <span style={{ fontSize: 12 }}>{sec.label}</span>
                        </button>
                      ))}
                    </div>

                    <div
                      style={{
                        marginTop: 24,
                        paddingTop: 20,
                        borderTop: "1px solid rgba(255,255,255,.06)",
                      }}
                    >
                      <p
                        style={{
                          color: "rgba(255,255,255,.22)",
                          fontSize: 11,
                          lineHeight: 1.7,
                          padding: "0 4px",
                        }}
                      >
                        Questions about this policy? We're happy to help.
                      </p>
                      <Link
                        to="/contact"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          marginTop: 12,
                          padding: "10px 16px",
                          borderRadius: 10,
                          background: "rgba(201,151,58,.1)",
                          border: "1px solid rgba(201,151,58,.25)",
                          color: "var(--gold-lt)",
                          fontFamily: "'Cinzel',serif",
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: ".12em",
                          textDecoration: "none",
                          transition: "all .3s",
                        }}
                      >
                        Contact Us <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Policy Sections */}
              <div>
                {/* ── Intro summary */}
                <div
                  className="highlight-box"
                  style={{ marginBottom: 24, borderRadius: 18 }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                    }}
                  >
                    <Shield
                      size={22}
                      style={{
                        color: "var(--gold-m)",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    />
                    <div>
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 18,
                          fontWeight: 700,
                          color: "#fff",
                          marginBottom: 8,
                        }}
                      >
                        Our Commitment to You
                      </p>
                      <p className="body-text" style={{ margin: 0 }}>
                        Noor Al-Quran Academy values your trust above all. We
                        collect only what we need, protect it rigorously, never
                        sell it, and give you full control over your data. This
                        policy explains everything clearly and honestly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 01 – Information We Collect */}
                <PolicySection
                  id="information"
                  num="01"
                  icon={Database}
                  title="Information We Collect"
                  accentColor="#7eb8ff"
                >
                  <p className="body-text" style={{ marginBottom: 20 }}>
                    We collect only the information necessary to provide you
                    with the best Quranic education experience. The categories
                    of data we may collect include:
                  </p>
                  <div style={{ marginBottom: 20 }}>
                    <p
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 10,
                        fontWeight: 700,
                        color: "rgba(255,255,255,.3)",
                        letterSpacing: ".16em",
                        textTransform: "uppercase",
                        marginBottom: 12,
                      }}
                    >
                      Personal Information
                    </p>
                    <div className="info-row">
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "var(--gold)",
                          flexShrink: 0,
                          marginTop: 7,
                        }}
                      />
                      <p className="body-text" style={{ margin: 0 }}>
                        <strong style={{ color: "rgba(255,255,255,.75)" }}>
                          Account data
                        </strong>{" "}
                        — your name, email address, phone number, and country of
                        residence when you register or book a trial.
                      </p>
                    </div>
                    <div className="info-row">
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "var(--gold)",
                          flexShrink: 0,
                          marginTop: 7,
                        }}
                      />
                      <p className="body-text" style={{ margin: 0 }}>
                        <strong style={{ color: "rgba(255,255,255,.75)" }}>
                          Learning data
                        </strong>{" "}
                        — progress records, session history, tutor notes, and
                        performance assessments tied to your learning journey.
                      </p>
                    </div>
                    <div className="info-row">
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "var(--gold)",
                          flexShrink: 0,
                          marginTop: 7,
                        }}
                      />
                      <p className="body-text" style={{ margin: 0 }}>
                        <strong style={{ color: "rgba(255,255,255,.75)" }}>
                          Payment data
                        </strong>{" "}
                        — billing address and transaction references. Card
                        details are processed exclusively by Stripe (PCI-DSS
                        Level 1); we never store card numbers.
                      </p>
                    </div>
                    <div className="info-row">
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "var(--gold)",
                          flexShrink: 0,
                          marginTop: 7,
                        }}
                      />
                      <p className="body-text" style={{ margin: 0 }}>
                        <strong style={{ color: "rgba(255,255,255,.75)" }}>
                          Technical data
                        </strong>{" "}
                        — IP address, browser type, device information, and
                        usage analytics collected automatically.
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 4,
                      marginTop: 16,
                    }}
                  >
                    {[
                      "Full Name",
                      "Email Address",
                      "Phone Number",
                      "Country",
                      "Session History",
                      "Payment Reference",
                      "IP Address",
                      "Browser Type",
                    ].map((d) => (
                      <span key={d} className="data-pill">
                        {d}
                      </span>
                    ))}
                  </div>
                </PolicySection>

                {/* 02 – How We Use It */}
                <PolicySection
                  id="usage"
                  num="02"
                  icon={Eye}
                  title="How We Use Your Information"
                  accentColor="var(--gold-m)"
                >
                  <p className="body-text" style={{ marginBottom: 20 }}>
                    Your data is used solely to deliver, improve, and
                    personalise your educational experience. We rely on the
                    following lawful bases:
                  </p>
                  {[
                    {
                      base: "Contract",
                      uses: "Scheduling classes, processing payments, matching you with a qualified tutor, and maintaining your student account.",
                    },
                    {
                      base: "Legitimate Interest",
                      uses: "Improving our platform quality, preventing fraud, and sending service-related communications.",
                    },
                    {
                      base: "Consent",
                      uses: "Sending promotional emails or newsletters — you may opt out at any time via the unsubscribe link.",
                    },
                    {
                      base: "Legal Obligation",
                      uses: "Complying with applicable financial, tax, and regulatory requirements.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="info-row">
                      <div
                        style={{
                          padding: "4px 10px",
                          borderRadius: 8,
                          flexShrink: 0,
                          background: "rgba(201,151,58,.1)",
                          border: "1px solid rgba(201,151,58,.2)",
                          color: "var(--gold-m)",
                          fontFamily: "'Cinzel',serif",
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: ".1em",
                          whiteSpace: "nowrap",
                          height: "fit-content",
                          marginTop: 2,
                        }}
                      >
                        {item.base}
                      </div>
                      <p className="body-text" style={{ margin: 0 }}>
                        {item.uses}
                      </p>
                    </div>
                  ))}
                  <div className="highlight-box" style={{ marginTop: 20 }}>
                    <p className="body-text" style={{ margin: 0 }}>
                      <strong style={{ color: "var(--gold-lt)" }}>
                        We will never
                      </strong>{" "}
                      sell, rent, or trade your personal data to third parties
                      for their own marketing purposes. Your information is
                      yours.
                    </p>
                  </div>
                </PolicySection>

                {/* 03 – Sharing */}
                <PolicySection
                  id="sharing"
                  num="03"
                  icon={Globe}
                  title="Sharing & Disclosure"
                  accentColor="#2fcf87"
                >
                  <p className="body-text" style={{ marginBottom: 20 }}>
                    We share your data only in limited, necessary circumstances
                    with trusted parties who are bound by strict confidentiality
                    obligations:
                  </p>
                  {[
                    {
                      party: "Stripe",
                      role: "Payment Processing",
                      detail:
                        "Secure card processing under PCI-DSS Level 1 certification.",
                    },
                    {
                      party: "Zoom / Video Platform",
                      role: "Class Delivery",
                      detail:
                        "Session hosting for live one-to-one and group classes.",
                    },
                    {
                      party: "Email Service Provider",
                      role: "Communications",
                      detail:
                        "Transactional emails, booking confirmations, and newsletters.",
                    },
                    {
                      party: "Analytics Provider",
                      role: "Platform Improvement",
                      detail:
                        "Anonymised usage data to understand how students use our platform.",
                    },
                    {
                      party: "Legal Authorities",
                      role: "Legal Compliance",
                      detail:
                        "Only when required by law, court order, or to protect rights and safety.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="info-row"
                      style={{ alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#2fcf87",
                          flexShrink: 0,
                        }}
                      />
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          gap: 12,
                          flexWrap: "wrap",
                          alignItems: "baseline",
                        }}
                      >
                        <strong
                          style={{
                            color: "rgba(255,255,255,.8)",
                            fontSize: 14,
                            fontFamily: "'Nunito',sans-serif",
                            minWidth: 120,
                          }}
                        >
                          {item.party}
                        </strong>
                        <span
                          style={{
                            fontFamily: "'Cinzel',serif",
                            fontSize: 9,
                            color: "#2fcf87",
                            letterSpacing: ".12em",
                            opacity: 0.8,
                          }}
                        >
                          {item.role}
                        </span>
                        <p
                          className="body-text"
                          style={{ margin: 0, fontSize: 13, flex: "1 1 200px" }}
                        >
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </PolicySection>

                {/* 04 – Security */}
                <PolicySection
                  id="security"
                  num="04"
                  icon={Lock}
                  title="Data Security"
                  accentColor="#b58cff"
                >
                  <p className="body-text" style={{ marginBottom: 24 }}>
                    We implement robust technical and organisational measures to
                    protect your personal data against unauthorised access,
                    loss, alteration, or disclosure.
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                      gap: 14,
                    }}
                  >
                    {[
                      {
                        icon: Lock,
                        title: "AES-256 Encryption",
                        desc: "All data is encrypted at rest and in transit using industry-leading standards.",
                      },
                      {
                        icon: Shield,
                        title: "SSL / TLS Protocol",
                        desc: "Secure HTTPS connections protect every interaction on our platform.",
                      },
                      {
                        icon: UserCheck,
                        title: "Access Controls",
                        desc: "Role-based access ensures only authorised staff can view your data.",
                      },
                      {
                        icon: Eye,
                        title: "Regular Audits",
                        desc: "Periodic security reviews and penetration testing keep our systems hardened.",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="right-card"
                        style={{ borderColor: "rgba(181,140,255,.12)" }}
                      >
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: 12,
                            marginBottom: 12,
                            background: "rgba(181,140,255,.1)",
                            border: "1px solid rgba(181,140,255,.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#b58cff",
                          }}
                        >
                          <item.icon size={17} />
                        </div>
                        <p
                          style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 17,
                            fontWeight: 700,
                            color: "#fff",
                            marginBottom: 6,
                          }}
                        >
                          {item.title}
                        </p>
                        <p className="body-text" style={{ fontSize: 13 }}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="highlight-box" style={{ marginTop: 24 }}>
                    <p className="body-text" style={{ margin: 0 }}>
                      In the unlikely event of a data breach that affects your
                      rights, we will notify you and the relevant supervisory
                      authority within{" "}
                      <strong style={{ color: "var(--gold-lt)" }}>
                        72 hours
                      </strong>{" "}
                      as required by GDPR.
                    </p>
                  </div>
                </PolicySection>

                {/* 05 – Your Rights */}
                <PolicySection
                  id="rights"
                  num="05"
                  icon={UserCheck}
                  title="Your Rights"
                  accentColor="var(--gold)"
                >
                  <p className="body-text" style={{ marginBottom: 24 }}>
                    Depending on your location, you may have the following
                    rights regarding your personal data. We honour all requests
                    promptly, typically within 30 days.
                  </p>
                  <div
                    className="rights-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: 14,
                    }}
                  >
                    {yourRights.map((right, i) => (
                      <div key={i} className="right-card">
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: 12,
                            marginBottom: 12,
                            background: `${right.color}18`,
                            border: `1px solid ${right.color}30`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: right.color,
                          }}
                        >
                          <right.icon size={17} />
                        </div>
                        <p
                          style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 16,
                            fontWeight: 700,
                            color: "#fff",
                            marginBottom: 6,
                          }}
                        >
                          {right.title}
                        </p>
                        <p className="body-text" style={{ fontSize: 13 }}>
                          {right.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="body-text" style={{ marginTop: 20 }}>
                    To exercise any of these rights, email us at{" "}
                    <a
                      href="mailto:privacy@nooralquran.com"
                      style={{ color: "var(--gold-m)", textDecoration: "none" }}
                    >
                      privacy@nooralquran.com
                    </a>
                    . We may need to verify your identity before processing your
                    request.
                  </p>
                </PolicySection>

                {/* 06 – Cookies */}
                <PolicySection
                  id="cookies"
                  num="06"
                  icon={Bell}
                  title="Cookies & Tracking"
                  accentColor="#ffd166"
                >
                  <p className="body-text" style={{ marginBottom: 20 }}>
                    We use cookies and similar tracking technologies to ensure
                    the platform works correctly and to understand how students
                    interact with our service.
                  </p>
                  {[
                    {
                      type: "Essential",
                      color: "#2fcf87",
                      desc: "Required for the platform to function — authentication, session management, and security tokens. Cannot be disabled.",
                    },
                    {
                      type: "Analytics",
                      color: "#7eb8ff",
                      desc: "Anonymised data that helps us understand usage patterns and improve the learning experience. Can be opted out.",
                    },
                    {
                      type: "Preference",
                      color: "#ffd166",
                      desc: "Remember your settings such as language, theme, and notification preferences across sessions.",
                    },
                    {
                      type: "Marketing",
                      color: "#ff8fa3",
                      desc: "Only used with your explicit consent to show relevant content. Opt out at any time from your account settings.",
                    },
                  ].map((c, i) => (
                    <div key={i} className="info-row">
                      <div
                        style={{
                          padding: "4px 10px",
                          borderRadius: 8,
                          flexShrink: 0,
                          height: "fit-content",
                          marginTop: 2,
                          background: `${c.color}15`,
                          border: `1px solid ${c.color}30`,
                          color: c.color,
                          fontFamily: "'Cinzel',serif",
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: ".1em",
                        }}
                      >
                        {c.type}
                      </div>
                      <p className="body-text" style={{ margin: 0 }}>
                        {c.desc}
                      </p>
                    </div>
                  ))}
                  <p className="body-text" style={{ marginTop: 20 }}>
                    You can manage cookie preferences in your browser settings
                    or through our consent manager available in the footer.
                  </p>
                </PolicySection>

                {/* 07 – Retention */}
                <PolicySection
                  id="retention"
                  num="07"
                  icon={Trash2}
                  title="Data Retention"
                  accentColor="#ff8fa3"
                >
                  <p className="body-text" style={{ marginBottom: 20 }}>
                    We retain your personal data only for as long as necessary
                    to fulfil the purposes described in this policy, or as
                    required by law.
                  </p>
                  {[
                    {
                      category: "Active Account Data",
                      period: "Duration of account + 2 years",
                      note: "Retained to support ongoing services and dispute resolution.",
                    },
                    {
                      category: "Payment & Financial Records",
                      period: "7 years",
                      note: "Required by tax and financial regulations.",
                    },
                    {
                      category: "Learning Progress & History",
                      period: "Duration of account",
                      note: "Deleted upon verified account closure request.",
                    },
                    {
                      category: "Marketing Preferences",
                      period: "Until consent withdrawn",
                      note: "Immediately honoured upon opt-out.",
                    },
                    {
                      category: "Analytics Data",
                      period: "26 months",
                      note: "Anonymised after 6 months; no individual can be identified.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="info-row"
                      style={{
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: 10,
                      }}
                    >
                      <div style={{ flex: "1 1 160px" }}>
                        <p
                          style={{
                            color: "rgba(255,255,255,.75)",
                            fontWeight: 700,
                            fontSize: 14,
                            fontFamily: "'Nunito',sans-serif",
                            marginBottom: 2,
                          }}
                        >
                          {item.category}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Cinzel',serif",
                            fontSize: 9,
                            color: "#ff8fa3",
                            letterSpacing: ".1em",
                            fontWeight: 700,
                          }}
                        >
                          {item.period}
                        </p>
                      </div>
                      <p
                        className="body-text"
                        style={{ margin: 0, flex: "2 1 200px", fontSize: 13 }}
                      >
                        {item.note}
                      </p>
                    </div>
                  ))}
                </PolicySection>

                {/* 08 – Contact & Updates */}
                <PolicySection
                  id="contact"
                  num="08"
                  icon={Mail}
                  title="Contact & Policy Updates"
                  accentColor="#2fcf87"
                >
                  <p className="body-text" style={{ marginBottom: 24 }}>
                    We may update this Privacy Policy from time to time to
                    reflect changes in law or our practices. We will notify you
                    of material changes via email or a prominent notice on our
                    website. Continued use of our services after changes
                    constitutes acceptance.
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                      gap: 14,
                      marginBottom: 24,
                    }}
                  >
                    {[
                      {
                        label: "Privacy Officer",
                        value: "privacy@nooralquran.com",
                        icon: Mail,
                        color: "#2fcf87",
                      },
                      {
                        label: "General Support",
                        value: "info@nooralquran.com",
                        icon: MessageCircle,
                        color: "var(--gold-m)",
                      },
                    ].map((c, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "20px",
                          borderRadius: 16,
                          display: "flex",
                          gap: 14,
                          alignItems: "center",
                          background: `${c.color}0a`,
                          border: `1px solid ${c.color}25`,
                        }}
                      >
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 12,
                            flexShrink: 0,
                            background: `${c.color}18`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: c.color,
                          }}
                        >
                          <c.icon size={18} />
                        </div>
                        <div>
                          <p
                            style={{
                              fontFamily: "'Cinzel',serif",
                              fontSize: 9,
                              color: "rgba(255,255,255,.3)",
                              letterSpacing: ".14em",
                              textTransform: "uppercase",
                              marginBottom: 4,
                            }}
                          >
                            {c.label}
                          </p>
                          <a
                            href={`mailto:${c.value}`}
                            style={{
                              color: c.color,
                              fontSize: 14,
                              fontWeight: 700,
                              fontFamily: "'Nunito',sans-serif",
                              textDecoration: "none",
                            }}
                          >
                            {c.value}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="body-text">
                    If you have a complaint about how we handle your data, you
                    have the right to lodge a complaint with your local data
                    protection supervisory authority.
                  </p>
                </PolicySection>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════ BOTTOM CTA */}
        <section
          style={{
            background:
              "radial-gradient(ellipse 120% 80% at 50% 50%,#0d4a2a 0%,#020b06 70%)",
            padding: "clamp(80px,12vw,120px) 24px",
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
              maxWidth: 620,
              margin: "0 auto",
            }}
          >
            <p
              className="sec-label"
              style={{ marginBottom: 20, display: "block" }}
            >
              Your Privacy Matters
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(28px,5vw,56px)",
                fontWeight: 300,
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              Questions About
              <br />
              <span
                className="gold-shimmer"
                style={{ fontWeight: 700, fontStyle: "italic" }}
              >
                Your Data?
              </span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,.4)",
                fontSize: 16,
                lineHeight: 1.85,
                maxWidth: 480,
                margin: "0 auto 40px",
              }}
            >
              Our privacy team is happy to answer any questions or help you
              exercise your data rights.
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
                to="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background:
                    "linear-gradient(135deg,var(--gold-m),var(--gold))",
                  color: "#020b06",
                  padding: "16px 40px",
                  borderRadius: 14,
                  fontFamily: "'Cinzel',serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: ".1em",
                  textDecoration: "none",
                  boxShadow:
                    "0 8px 32px rgba(201,151,58,.4),inset 0 1px 0 rgba(255,255,255,.25)",
                }}
              >
                <span>✦</span> Contact Privacy Team <ArrowRight size={15} />
              </Link>
              <Link
                to="/faq"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.12)",
                  color: "rgba(255,255,255,.7)",
                  padding: "16px 32px",
                  borderRadius: 14,
                  fontFamily: "'Cinzel',serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: ".1em",
                  textDecoration: "none",
                }}
              >
                View FAQ
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

// missing import fix
const MessageCircle = Mail;
