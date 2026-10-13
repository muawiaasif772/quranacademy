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
  ArrowRight,
  FileText,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL } from "../seo/seo.config";

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=Cinzel:wght@400;600;700;900&family=Nunito:wght@400;500;600;700;800&display=swap');
  :root { --deep:#020b06; --forest:#051610; --gold:#c9973a; --gold-m:#e4b558; --gold-lt:#f5d98e; }
  .hex-bg { background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='.3' opacity='.055' d='M40 4L76 24L76 56L40 76L4 56L4 24Z'/%3E%3C/svg%3E"); }

  @keyframes fadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimText  { 0%{background-position:-500px 0} 100%{background-position:500px 0} }
  @keyframes glowPulse { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:.7;transform:scale(1.06)} }
  @keyframes shimBar   { 0%{left:-100%} 100%{left:200%} }
  @keyframes rotateSlow{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  .gold-shimmer { background:linear-gradient(90deg,var(--gold) 0%,var(--gold-lt) 35%,#fff8e0 50%,var(--gold-lt) 65%,var(--gold) 100%);background-size:500px 100%;animation:shimText 4s linear infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
  .gold-text    { background:linear-gradient(135deg,var(--gold-lt),var(--gold-m),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
  .glow-pulse   { animation:glowPulse 4s ease-in-out infinite; }
  .h1{animation:fadeUp .6s cubic-bezier(.16,1,.3,1) both}
  .h2{animation:fadeUp .6s .1s cubic-bezier(.16,1,.3,1) both}
  .h3{animation:fadeUp .6s .2s cubic-bezier(.16,1,.3,1) both}
  .h4{animation:fadeUp .6s .3s cubic-bezier(.16,1,.3,1) both}
  .sec-label { font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--gold); }
  .shb{position:relative;overflow:hidden;}
  .shb::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent);animation:shimBar 3.5s ease-in-out infinite;}

  /* TOC */
  .toc-link{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;color:rgba(255,255,255,.32);font-family:'Nunito',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all .22s;border:none;background:none;text-align:left;width:100%;}
  .toc-link:hover{color:var(--gold-lt);background:rgba(201,151,58,.06);}
  .toc-link.active{color:var(--gold-m);background:rgba(201,151,58,.1);border-left:2px solid var(--gold);}
  .toc-num{font-family:'Cinzel',serif;font-size:9px;font-weight:700;color:var(--gold);opacity:.55;min-width:16px;transition:opacity .22s;}
  .toc-link.active .toc-num{opacity:1;}
  .toc-sticky{position:sticky;top:96px;max-height:calc(100vh - 130px);overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(201,151,58,.2) transparent;}
  .toc-sticky::-webkit-scrollbar{width:3px;}
  .toc-sticky::-webkit-scrollbar-thumb{background:rgba(201,151,58,.2);border-radius:4px;}

  /* Section card */
  .ps{background:rgba(255,255,255,.022);border:1px solid rgba(255,255,255,.07);border-radius:22px;padding:clamp(22px,3.5vw,36px);position:relative;overflow:hidden;transition:border-color .3s;scroll-margin-top:96px;margin-bottom:16px;}
  .ps::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(201,151,58,0),transparent);transition:background .4s;}
  .ps:hover{border-color:rgba(201,151,58,.18);}
  .ps:hover::before{background:linear-gradient(90deg,transparent,rgba(201,151,58,.45),transparent);}

  /* Boxes */
  .hi{background:rgba(201,151,58,.06);border:1px solid rgba(201,151,58,.15);border-left:3px solid var(--gold);border-radius:12px;padding:14px 16px;margin:14px 0;}

  /* Rows & items */
  .ir{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05);}
  .ir:last-child{border-bottom:none;padding-bottom:0;}
  .ci{display:flex;gap:10px;align-items:flex-start;padding:5px 0;}

  /* Mini card */
  .mc{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:16px;transition:all .28s;}
  .mc:hover{border-color:rgba(201,151,58,.18);transform:translateY(-3px);box-shadow:0 14px 36px rgba(0,0,0,.3);}

  /* Data pill */
  .dp{display:inline-flex;align-items:center;padding:5px 12px;border-radius:100px;font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);color:rgba(255,255,255,.38);margin:3px;transition:all .22s;}
  .dp:hover{border-color:rgba(201,151,58,.3);color:var(--gold-lt);background:rgba(201,151,58,.06);}

  .updated-badge{display:inline-flex;align-items:center;gap:8px;padding:7px 16px;border-radius:100px;background:rgba(47,207,135,.08);border:1px solid rgba(47,207,135,.2);color:#2fcf87;font-family:'Nunito',sans-serif;font-size:12px;font-weight:700;}
  .bt{color:rgba(255,255,255,.48);font-family:'Nunito',sans-serif;font-size:14px;line-height:1.85;}
  .sub-label{font-family:'Cinzel',serif;font-size:9px;font-weight:700;color:rgba(255,255,255,.25);letter-spacing:.14em;text-transform:uppercase;margin:0 0 8px;}

  @media(max-width:1024px){.pp-layout{grid-template-columns:1fr!important;}.toc-sticky{position:static!important;max-height:none!important;}.toc-wrap{margin-bottom:28px;}.rg{grid-template-columns:1fr 1fr!important;}}
  @media(max-width:600px){.rg{grid-template-columns:1fr!important;}.qs{grid-template-columns:1fr 1fr!important;}.two-col{grid-template-columns:1fr!important;}}
`;

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

const sections = [
  { id: "information", num: "01", label: "What We Collect", icon: Database },
  { id: "usage", num: "02", label: "How We Use It", icon: Eye },
  { id: "sharing", num: "03", label: "Who We Share With", icon: Globe },
  { id: "security", num: "04", label: "Data Security", icon: Lock },
  { id: "rights", num: "05", label: "Your Rights", icon: UserCheck },
  { id: "cookies", num: "06", label: "Cookies", icon: Bell },
  { id: "retention", num: "07", label: "Data Retention", icon: Trash2 },
  { id: "contact", num: "08", label: "Contact & Updates", icon: Mail },
];

const Sec: React.FC<{
  id: string;
  num: string;
  icon: React.ElementType;
  title: string;
  accent?: string;
  children: React.ReactNode;
}> = ({ id, num, icon: Icon, title, accent = "var(--gold)", children }) => {
  const { ref, vis } = useReveal();
  return (
    <div
      id={id}
      ref={ref}
      className="ps"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: "opacity .65s ease,transform .65s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            flexShrink: 0,
            background: `${accent}18`,
            border: `1px solid ${accent}28`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: accent,
          }}
        >
          <Icon size={20} />
        </div>
        <div>
          <p
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: 9,
              fontWeight: 700,
              color: accent,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              opacity: 0.65,
              marginBottom: 3,
            }}
          >
            {num}
          </p>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(18px,2.6vw,25px)",
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
          background: `linear-gradient(90deg,${accent}38,transparent)`,
          marginBottom: 18,
        }}
      />
      {children}
    </div>
  );
};

const Tag = ({ label, color }: { label: string; color: string }) => (
  <span
    style={{
      padding: "3px 9px",
      borderRadius: 7,
      flexShrink: 0,
      background: `${color}12`,
      border: `1px solid ${color}28`,
      color,
      fontFamily: "'Cinzel',serif",
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: ".1em",
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </span>
);

const Dot = ({ color = "var(--gold)" }: { color?: string }) => (
  <div
    style={{
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: color,
      flexShrink: 0,
      marginTop: 7,
    }}
  />
);

export const PrivacyPolicy: React.FC = () => {
  const [active, setActive] = useState("information");
  const heroR = useReveal();
  const tocR = useReveal();

  const go = (id: string) => {
    setActive(id);
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
        {/* ══ HERO ══ */}
        <section
          style={{
            background:
              "radial-gradient(ellipse 130% 80% at 20% 0%,#0d4a2a 0%,transparent 55%),radial-gradient(ellipse 80% 100% at 85% 100%,#062418 0%,transparent 50%),#020b06",
            padding: "clamp(100px,14vw,155px) 24px clamp(56px,8vw,80px)",
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
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "-3%",
              transform: "translateY(-50%)",
              fontFamily: "serif",
              fontSize: "clamp(110px,17vw,250px)",
              color: "rgba(255,255,255,.016)",
              fontWeight: 700,
              userSelect: "none",
              pointerEvents: "none",
              lineHeight: 1,
            }}
          >
            خصوصية
          </div>
          <div
            className="glow-pulse"
            style={{
              position: "absolute",
              top: "-10%",
              left: "5%",
              width: 480,
              height: 480,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(22,160,92,.1) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-20%",
              right: "-10%",
              width: 580,
              height: 580,
              borderRadius: "50%",
              border: "1px dashed rgba(201,151,58,.07)",
              animation: "rotateSlow 70s linear infinite",
              pointerEvents: "none",
            }}
          />

          <div
            ref={heroR.ref}
            style={{
              maxWidth: 780,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              opacity: heroR.vis ? 1 : 0,
              transform: heroR.vis ? "translateY(0)" : "translateY(36px)",
              transition: "opacity .8s ease,transform .8s ease",
            }}
          >
            <div
              className="h1"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                marginBottom: 22,
              }}
            >
              <div
                style={{
                  height: 1,
                  width: 56,
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
                  width: 56,
                  background:
                    "linear-gradient(90deg,rgba(201,151,58,.6),transparent)",
                }}
              />
            </div>

            <h1
              className="h2"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(46px,9vw,100px)",
                fontWeight: 300,
                lineHeight: 1.0,
                marginBottom: 18,
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
                color: "rgba(255,255,255,.4)",
                fontSize: 16,
                lineHeight: 1.8,
                maxWidth: 460,
                margin: "0 auto 30px",
              }}
            >
              We collect only what we need, protect it rigorously, and never
              sell it. Here's exactly what that means.
            </p>

            <div
              className="h4"
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: 38,
              }}
            >
              <span className="updated-badge">
                <RefreshCw size={12} /> Updated: Jan 15, 2025
              </span>
              <span
                style={{
                  padding: "7px 16px",
                  borderRadius: 100,
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.08)",
                  color: "rgba(255,255,255,.32)",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                Effective: Feb 1, 2025
              </span>
            </div>

            {/* Quick stats */}
            <div
              className="qs"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 10,
              }}
            >
              {[
                { v: "GDPR", l: "Compliant" },
                { v: "256-bit", l: "Encryption" },
                { v: "0", l: "Data Sold" },
                { v: "72h", l: "Breach Notice" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: "14px 10px",
                    textAlign: "center",
                    background: "rgba(255,255,255,.025)",
                    border: "1px solid rgba(255,255,255,.06)",
                    borderRadius: 14,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "var(--gold-m)",
                      lineHeight: 1,
                    }}
                  >
                    {s.v}
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,.28)",
                      fontSize: 10,
                      fontFamily: "'Cinzel',serif",
                      letterSpacing: ".07em",
                      marginTop: 4,
                    }}
                  >
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CONTENT ══ */}
        <section
          style={{
            padding: "clamp(52px,9vw,88px) 24px",
            background:
              "linear-gradient(180deg,var(--forest) 0%,var(--deep) 100%)",
            position: "relative",
          }}
        >
          <div
            className="hex-bg"
            style={{ position: "absolute", inset: 0, opacity: 0.32 }}
          />
          <div
            style={{
              maxWidth: 1160,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              className="pp-layout"
              style={{
                display: "grid",
                gridTemplateColumns: "240px 1fr",
                gap: "clamp(20px,4vw,52px)",
                alignItems: "start",
              }}
            >
              {/* TOC */}
              <div
                ref={tocR.ref}
                className="toc-wrap"
                style={{
                  opacity: tocR.vis ? 1 : 0,
                  transform: tocR.vis ? "translateX(0)" : "translateX(-20px)",
                  transition: "opacity .65s ease,transform .65s ease",
                }}
              >
                <div className="toc-sticky">
                  <div
                    style={{
                      background: "rgba(255,255,255,.025)",
                      border: "1px solid rgba(255,255,255,.07)",
                      borderRadius: 20,
                      padding: "20px 14px",
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
                        height: 2,
                        background:
                          "linear-gradient(90deg,transparent,var(--gold),transparent)",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 9,
                        marginBottom: 18,
                        paddingLeft: 4,
                      }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 9,
                          background: "rgba(201,151,58,.12)",
                          border: "1px solid rgba(201,151,58,.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--gold)",
                        }}
                      >
                        <FileText size={13} />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: 9,
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
                      {sections.map((s) => (
                        <button
                          key={s.id}
                          className={`toc-link${active === s.id ? " active" : ""}`}
                          onClick={() => go(s.id)}
                        >
                          <span className="toc-num">{s.num}</span>
                          <span style={{ fontSize: 11 }}>{s.label}</span>
                        </button>
                      ))}
                    </div>
                    <div
                      style={{
                        marginTop: 20,
                        paddingTop: 18,
                        borderTop: "1px solid rgba(255,255,255,.06)",
                      }}
                    >
                      <Link
                        to="/contact"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 7,
                          padding: "9px 14px",
                          borderRadius: 9,
                          background: "rgba(201,151,58,.1)",
                          border: "1px solid rgba(201,151,58,.22)",
                          color: "var(--gold-lt)",
                          fontFamily: "'Cinzel',serif",
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: ".12em",
                          textDecoration: "none",
                        }}
                      >
                        Questions? <ArrowRight size={10} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sections */}
              <div>
                {/* Commitment intro */}
                <div
                  className="hi"
                  style={{ marginBottom: 18, borderRadius: 14 }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    <Shield
                      size={18}
                      style={{
                        color: "var(--gold-m)",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    />
                    <p className="bt" style={{ margin: 0 }}>
                      We collect only what we need, protect it with
                      industry-leading security,{" "}
                      <strong style={{ color: "var(--gold-lt)" }}>
                        never sell it
                      </strong>
                      , and give you full control. This page explains everything
                      plainly.
                    </p>
                  </div>
                </div>

                {/* 01 – What We Collect */}
                <Sec
                  id="information"
                  num="01"
                  icon={Database}
                  title="What We Collect"
                  accent="#7eb8ff"
                >
                  {[
                    {
                      label: "Account",
                      detail:
                        "Name, email, phone, country — collected when you register or book a trial.",
                      color: "#7eb8ff",
                    },
                    {
                      label: "Learning",
                      detail:
                        "Session history, tutor notes, and progress records.",
                      color: "var(--gold-m)",
                    },
                    {
                      label: "Payment",
                      detail:
                        "Billing reference only. Card numbers go directly to Stripe — we never see them.",
                      color: "#2fcf87",
                    },
                    {
                      label: "Technical",
                      detail:
                        "IP address, browser type, and anonymised usage analytics.",
                      color: "#b58cff",
                    },
                  ].map((x, i) => (
                    <div key={i} className="ir">
                      <Tag label={x.label} color={x.color} />
                      <p className="bt" style={{ margin: 0 }}>
                        {x.detail}
                      </p>
                    </div>
                  ))}
                  <div
                    style={{ display: "flex", flexWrap: "wrap", marginTop: 14 }}
                  >
                    {[
                      "Full Name",
                      "Email",
                      "Phone",
                      "Country",
                      "Session History",
                      "Payment Ref",
                      "IP Address",
                      "Browser Type",
                    ].map((d) => (
                      <span key={d} className="dp">
                        {d}
                      </span>
                    ))}
                  </div>
                </Sec>

                {/* 02 – How We Use It */}
                <Sec
                  id="usage"
                  num="02"
                  icon={Eye}
                  title="How We Use It"
                  accent="var(--gold-m)"
                >
                  {[
                    {
                      label: "Contract",
                      detail:
                        "Scheduling classes, processing payments, and running your student account.",
                      color: "var(--gold-m)",
                    },
                    {
                      label: "Improvement",
                      detail:
                        "Improving platform quality and preventing fraud.",
                      color: "#7eb8ff",
                    },
                    {
                      label: "Consent",
                      detail:
                        "Marketing emails only — opt out anytime via the unsubscribe link.",
                      color: "#2fcf87",
                    },
                    {
                      label: "Legal",
                      detail:
                        "Complying with financial and regulatory requirements.",
                      color: "#ff8fa3",
                    },
                  ].map((x, i) => (
                    <div key={i} className="ir">
                      <Tag label={x.label} color={x.color} />
                      <p className="bt" style={{ margin: 0 }}>
                        {x.detail}
                      </p>
                    </div>
                  ))}
                  <div className="hi" style={{ marginTop: 12 }}>
                    <p className="bt" style={{ margin: 0 }}>
                      <strong style={{ color: "var(--gold-lt)" }}>
                        We will never
                      </strong>{" "}
                      sell, rent, or trade your data to third parties for
                      marketing. Full stop.
                    </p>
                  </div>
                </Sec>

                {/* 03 – Sharing */}
                <Sec
                  id="sharing"
                  num="03"
                  icon={Globe}
                  title="Who We Share With"
                  accent="#2fcf87"
                >
                  <p className="bt" style={{ marginBottom: 12 }}>
                    We only share data with these trusted partners, each bound
                    by strict confidentiality:
                  </p>
                  {[
                    {
                      party: "Stripe",
                      role: "Payments",
                      detail: "PCI-DSS Level 1 certified card processing.",
                    },
                    {
                      party: "Video Platform",
                      role: "Classes",
                      detail: "Session hosting for live one-to-one lessons.",
                    },
                    {
                      party: "Email Provider",
                      role: "Comms",
                      detail: "Booking confirmations and transactional emails.",
                    },
                    {
                      party: "Analytics",
                      role: "Improvement",
                      detail:
                        "Anonymised usage data only — no personal identifiers.",
                    },
                    {
                      party: "Legal Authorities",
                      role: "Compliance",
                      detail: "Only when required by law or court order.",
                    },
                  ].map((x, i) => (
                    <div
                      key={i}
                      className="ir"
                      style={{ alignItems: "center" }}
                    >
                      <Dot color="#2fcf87" />
                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          flexWrap: "wrap",
                          alignItems: "baseline",
                          flex: 1,
                        }}
                      >
                        <strong
                          style={{
                            color: "rgba(255,255,255,.75)",
                            fontSize: 13,
                            fontFamily: "'Nunito',sans-serif",
                            minWidth: 110,
                          }}
                        >
                          {x.party}
                        </strong>
                        <span
                          style={{
                            fontFamily: "'Cinzel',serif",
                            fontSize: 9,
                            color: "#2fcf87",
                            letterSpacing: ".1em",
                            opacity: 0.8,
                          }}
                        >
                          {x.role}
                        </span>
                        <p
                          className="bt"
                          style={{ margin: 0, fontSize: 13, flex: "1 1 160px" }}
                        >
                          {x.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </Sec>

                {/* 04 – Security */}
                <Sec
                  id="security"
                  num="04"
                  icon={Lock}
                  title="Data Security"
                  accent="#b58cff"
                >
                  <div
                    className="two-col"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                      marginBottom: 14,
                    }}
                  >
                    {[
                      {
                        icon: Lock,
                        title: "AES-256 Encryption",
                        desc: "All data encrypted at rest and in transit.",
                      },
                      {
                        icon: Shield,
                        title: "SSL / TLS",
                        desc: "Secure HTTPS on every page and API call.",
                      },
                      {
                        icon: UserCheck,
                        title: "Access Controls",
                        desc: "Only authorised staff can access your data.",
                      },
                      {
                        icon: Eye,
                        title: "Regular Audits",
                        desc: "Periodic security reviews and penetration testing.",
                      },
                    ].map((x, i) => (
                      <div
                        key={i}
                        className="mc"
                        style={{ borderColor: "rgba(181,140,255,.1)" }}
                      >
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 10,
                            marginBottom: 10,
                            background: "rgba(181,140,255,.1)",
                            border: "1px solid rgba(181,140,255,.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#b58cff",
                          }}
                        >
                          <x.icon size={15} />
                        </div>
                        <p
                          style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#fff",
                            marginBottom: 4,
                          }}
                        >
                          {x.title}
                        </p>
                        <p className="bt" style={{ fontSize: 12 }}>
                          {x.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="hi">
                    <p className="bt" style={{ margin: 0 }}>
                      In the event of a data breach affecting you, we'll notify
                      you and the relevant authority within{" "}
                      <strong style={{ color: "var(--gold-lt)" }}>
                        72 hours
                      </strong>{" "}
                      (GDPR requirement).
                    </p>
                  </div>
                </Sec>

                {/* 05 – Your Rights */}
                <Sec
                  id="rights"
                  num="05"
                  icon={UserCheck}
                  title="Your Rights"
                  accent="var(--gold)"
                >
                  <p className="bt" style={{ marginBottom: 14 }}>
                    You can exercise these rights at any time — we respond
                    within 30 days:
                  </p>
                  <div
                    className="rg"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: 10,
                      marginBottom: 14,
                    }}
                  >
                    {[
                      {
                        icon: Eye,
                        title: "Access",
                        desc: "Get a copy of all data we hold on you.",
                        color: "#7eb8ff",
                      },
                      {
                        icon: RefreshCw,
                        title: "Rectify",
                        desc: "Correct any inaccurate information.",
                        color: "var(--gold-m)",
                      },
                      {
                        icon: Trash2,
                        title: "Erasure",
                        desc: "Request deletion of your personal data.",
                        color: "#ff8fa3",
                      },
                      {
                        icon: Shield,
                        title: "Restrict",
                        desc: "Limit how we process your data.",
                        color: "#2fcf87",
                      },
                      {
                        icon: FileText,
                        title: "Portability",
                        desc: "Receive your data in a machine-readable format.",
                        color: "#b58cff",
                      },
                      {
                        icon: Bell,
                        title: "Object",
                        desc: "Opt out of direct marketing or profiling.",
                        color: "#ffd166",
                      },
                    ].map((r, i) => (
                      <div key={i} className="mc">
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 10,
                            marginBottom: 10,
                            background: `${r.color}18`,
                            border: `1px solid ${r.color}28`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: r.color,
                          }}
                        >
                          <r.icon size={14} />
                        </div>
                        <p
                          style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#fff",
                            marginBottom: 4,
                          }}
                        >
                          {r.title}
                        </p>
                        <p className="bt" style={{ fontSize: 12 }}>
                          {r.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="bt">
                    Email{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      style={{ color: "var(--gold-m)", textDecoration: "none" }}
                    >
                      {CONTACT_EMAIL}
                    </a>{" "}
                    to exercise any right. We may verify your identity first.
                  </p>
                </Sec>

                {/* 06 – Cookies */}
                <Sec
                  id="cookies"
                  num="06"
                  icon={Bell}
                  title="Cookies"
                  accent="#ffd166"
                >
                  {[
                    {
                      type: "Essential",
                      color: "#2fcf87",
                      desc: "Required for login & security. Cannot be disabled.",
                    },
                    {
                      type: "Analytics",
                      color: "#7eb8ff",
                      desc: "Anonymised usage data to improve the platform. Opt-out available.",
                    },
                    {
                      type: "Preference",
                      color: "#ffd166",
                      desc: "Saves your language and theme settings.",
                    },
                    {
                      type: "Marketing",
                      color: "#ff8fa3",
                      desc: "Only with your explicit consent. Opt out anytime.",
                    },
                  ].map((c, i) => (
                    <div key={i} className="ir">
                      <Tag label={c.type} color={c.color} />
                      <p className="bt" style={{ margin: 0 }}>
                        {c.desc}
                      </p>
                    </div>
                  ))}
                  <p className="bt" style={{ marginTop: 12 }}>
                    Manage preferences via your browser settings or our footer
                    consent manager.
                  </p>
                </Sec>

                {/* 07 – Retention */}
                <Sec
                  id="retention"
                  num="07"
                  icon={Trash2}
                  title="Data Retention"
                  accent="#ff8fa3"
                >
                  {[
                    {
                      category: "Account & Learning Data",
                      period: "Account lifetime + 2 yrs",
                      color: "#ff8fa3",
                    },
                    {
                      category: "Payment & Financial Records",
                      period: "7 years (legal requirement)",
                      color: "var(--gold-m)",
                    },
                    {
                      category: "Marketing Preferences",
                      period: "Until you opt out",
                      color: "#2fcf87",
                    },
                    {
                      category: "Analytics Data",
                      period: "26 months (anonymised at 6m)",
                      color: "#7eb8ff",
                    },
                  ].map((x, i) => (
                    <div
                      key={i}
                      className="ir"
                      style={{ alignItems: "center" }}
                    >
                      <div style={{ flex: "1 1 160px" }}>
                        <p
                          style={{
                            color: "rgba(255,255,255,.72)",
                            fontWeight: 700,
                            fontSize: 13,
                            fontFamily: "'Nunito',sans-serif",
                            marginBottom: 2,
                          }}
                        >
                          {x.category}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Cinzel',serif",
                            fontSize: 9,
                            color: x.color,
                            letterSpacing: ".08em",
                            fontWeight: 700,
                          }}
                        >
                          {x.period}
                        </p>
                      </div>
                    </div>
                  ))}
                  <p className="bt" style={{ marginTop: 12 }}>
                    Request deletion of your account data at any time by
                    emailing us.
                  </p>
                </Sec>

                {/* 08 – Contact */}
                <Sec
                  id="contact"
                  num="08"
                  icon={Mail}
                  title="Contact & Updates"
                  accent="#2fcf87"
                >
                  <p className="bt" style={{ marginBottom: 14 }}>
                    Got a privacy question or want to exercise a right? Reach us
                    here:
                  </p>
                  <div
                    className="two-col"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                      marginBottom: 14,
                    }}
                  >
                    {[
                      {
                        label: "Privacy Officer",
                        value: CONTACT_EMAIL,
                        icon: Shield,
                        color: "#2fcf87",
                      },
                      {
                        label: "General Support",
                        value: CONTACT_EMAIL,
                        icon: Mail,
                        color: "var(--gold-m)",
                      },
                    ].map((c, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "16px",
                          borderRadius: 12,
                          display: "flex",
                          gap: 10,
                          alignItems: "center",
                          background: `${c.color}08`,
                          border: `1px solid ${c.color}1e`,
                        }}
                      >
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 9,
                            flexShrink: 0,
                            background: `${c.color}16`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: c.color,
                          }}
                        >
                          <c.icon size={15} />
                        </div>
                        <div>
                          <p
                            style={{
                              fontFamily: "'Cinzel',serif",
                              fontSize: 9,
                              color: "rgba(255,255,255,.28)",
                              letterSpacing: ".12em",
                              textTransform: "uppercase",
                              marginBottom: 2,
                            }}
                          >
                            {c.label}
                          </p>
                          <a
                            href={`mailto:${c.value}`}
                            style={{
                              color: c.color,
                              fontSize: 13,
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
                  <div className="hi" style={{ margin: 0 }}>
                    <p className="bt" style={{ margin: 0 }}>
                      Material policy changes will be emailed to you at least{" "}
                      <strong style={{ color: "var(--gold-lt)" }}>
                        14 days
                      </strong>{" "}
                      before they take effect. You can also lodge a complaint
                      with your local data protection authority.
                    </p>
                  </div>
                </Sec>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section
          style={{
            background:
              "radial-gradient(ellipse 120% 80% at 50% 50%,#0d4a2a 0%,#020b06 70%)",
            padding: "clamp(72px,11vw,110px) 24px",
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
              margin: "0 auto 44px",
              background:
                "linear-gradient(90deg,transparent,var(--gold),transparent)",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            <p
              className="sec-label"
              style={{ marginBottom: 16, display: "block" }}
            >
              Your Privacy Matters
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(28px,5vw,52px)",
                fontWeight: 300,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: 16,
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
                color: "rgba(255,255,255,.38)",
                fontSize: 15,
                lineHeight: 1.8,
                maxWidth: 400,
                margin: "0 auto 34px",
              }}
            >
              Our privacy team is happy to help you understand or exercise your
              data rights.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  background:
                    "linear-gradient(135deg,var(--gold-m),var(--gold))",
                  color: "#020b06",
                  padding: "15px 36px",
                  borderRadius: 13,
                  fontFamily: "'Cinzel',serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: ".1em",
                  textDecoration: "none",
                  boxShadow:
                    "0 8px 28px rgba(201,151,58,.38),inset 0 1px 0 rgba(255,255,255,.22)",
                }}
              >
                <span>✦</span> Contact Privacy Team <ArrowRight size={14} />
              </Link>
              <Link
                to="/faq"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.1)",
                  color: "rgba(255,255,255,.65)",
                  padding: "15px 24px",
                  borderRadius: 13,
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
              width: 160,
              height: 1,
              margin: "44px auto 0",
              background:
                "linear-gradient(90deg,transparent,var(--gold),transparent)",
            }}
          />
        </section>
      </div>
    </>
  );
};
