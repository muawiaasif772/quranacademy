import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  BookOpen,
  CreditCard,
  UserCheck,
  ShieldAlert,
  AlertTriangle,
  Scale,
  RefreshCw,
  Mail,
  ArrowRight,
  CheckCircle,
  XCircle,
  Scroll,
  Gavel,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

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
  .gold-text { background:linear-gradient(135deg,var(--gold-lt),var(--gold-m),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
  .glow-pulse { animation:glowPulse 4s ease-in-out infinite; }
  .h1{animation:fadeUp .6s cubic-bezier(.16,1,.3,1) both}
  .h2{animation:fadeUp .6s .1s cubic-bezier(.16,1,.3,1) both}
  .h3{animation:fadeUp .6s .2s cubic-bezier(.16,1,.3,1) both}
  .h4{animation:fadeUp .6s .3s cubic-bezier(.16,1,.3,1) both}
  .sec-label { font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--gold); }
  .shb{position:relative;overflow:hidden;}
  .shb::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent);animation:shimBar 3.5s ease-in-out infinite;}

  .toc-link{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;color:rgba(255,255,255,.32);font-family:'Nunito',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all .22s;border:none;background:none;text-align:left;width:100%;}
  .toc-link:hover{color:var(--gold-lt);background:rgba(201,151,58,.06);}
  .toc-link.active{color:var(--gold-m);background:rgba(201,151,58,.1);border-left:2px solid var(--gold);}
  .toc-num{font-family:'Cinzel',serif;font-size:9px;font-weight:700;color:var(--gold);opacity:.55;min-width:16px;transition:opacity .22s;}
  .toc-link.active .toc-num{opacity:1;}
  .toc-sticky{position:sticky;top:96px;max-height:calc(100vh - 130px);overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(201,151,58,.2) transparent;}
  .toc-sticky::-webkit-scrollbar{width:3px;}
  .toc-sticky::-webkit-scrollbar-thumb{background:rgba(201,151,58,.2);border-radius:4px;}

  .ps{background:rgba(255,255,255,.022);border:1px solid rgba(255,255,255,.07);border-radius:22px;padding:clamp(22px,3.5vw,36px);position:relative;overflow:hidden;transition:border-color .3s;scroll-margin-top:96px;margin-bottom:16px;}
  .ps::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(201,151,58,0),transparent);transition:background .4s;}
  .ps:hover{border-color:rgba(201,151,58,.18);}
  .ps:hover::before{background:linear-gradient(90deg,transparent,rgba(201,151,58,.45),transparent);}

  .hi{background:rgba(201,151,58,.06);border:1px solid rgba(201,151,58,.15);border-left:3px solid var(--gold);border-radius:12px;padding:14px 16px;margin:14px 0;}
  .wb{background:rgba(255,143,163,.05);border:1px solid rgba(255,143,163,.15);border-left:3px solid #ff8fa3;border-radius:12px;padding:14px 16px;margin:14px 0;}
  .gb{background:rgba(47,207,135,.05);border:1px solid rgba(47,207,135,.15);border-left:3px solid #2fcf87;border-radius:12px;padding:14px 16px;margin:14px 0;}

  .ci{display:flex;gap:10px;align-items:flex-start;padding:5px 0;}
  .ir{display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05);}
  .ir:last-child{border-bottom:none;padding-bottom:0;}
  .mc{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:16px;transition:all .28s;}
  .mc:hover{border-color:rgba(201,151,58,.18);transform:translateY(-3px);box-shadow:0 14px 36px rgba(0,0,0,.3);}

  .updated-badge{display:inline-flex;align-items:center;gap:8px;padding:7px 16px;border-radius:100px;background:rgba(47,207,135,.08);border:1px solid rgba(47,207,135,.2);color:#2fcf87;font-family:'Nunito',sans-serif;font-size:12px;font-weight:700;}
  .bt{color:rgba(255,255,255,.48);font-family:'Nunito',sans-serif;font-size:14px;line-height:1.85;}
  .sub-label{font-family:'Cinzel',serif;font-size:9px;font-weight:700;color:rgba(255,255,255,.25);letter-spacing:.14em;text-transform:uppercase;margin:14px 0 7px;}

  @media(max-width:1024px){.pp-layout{grid-template-columns:1fr!important;}.toc-sticky{position:static!important;max-height:none!important;}.toc-wrap{margin-bottom:28px;}}
  @media(max-width:600px){.two-col{grid-template-columns:1fr!important;}.qs{grid-template-columns:1fr 1fr!important;}}
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
  { id: "acceptance", num: "01", label: "Acceptance", icon: CheckCircle },
  { id: "services", num: "02", label: "Our Services", icon: BookOpen },
  { id: "accounts", num: "03", label: "Your Account", icon: UserCheck },
  { id: "payments", num: "04", label: "Payments & Refunds", icon: CreditCard },
  { id: "conduct", num: "05", label: "Conduct", icon: Scale },
  { id: "ip", num: "06", label: "Intellectual Property", icon: Scroll },
  { id: "liability", num: "07", label: "Liability", icon: ShieldAlert },
  { id: "contact", num: "08", label: "Contact & Updates", icon: Mail },
];

// Section wrapper
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

// Helpers
const Check = ({ ok = true }) =>
  ok ? (
    <CheckCircle
      size={15}
      style={{ color: "#2fcf87", flexShrink: 0, marginTop: 3 }}
    />
  ) : (
    <XCircle
      size={15}
      style={{ color: "#ff8fa3", flexShrink: 0, marginTop: 3 }}
    />
  );

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

// ── MAIN ──
export const TermsOfService: React.FC = () => {
  const [active, setActive] = useState("acceptance");
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
              right: "-2%",
              transform: "translateY(-50%)",
              fontFamily: "serif",
              fontSize: "clamp(100px,16vw,230px)",
              color: "rgba(255,255,255,.016)",
              fontWeight: 700,
              userSelect: "none",
              pointerEvents: "none",
              lineHeight: 1,
            }}
          >
            شروط
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
              bottom: "-25%",
              right: "-12%",
              width: 600,
              height: 600,
              borderRadius: "50%",
              border: "1px dashed rgba(201,151,58,.07)",
              animation: "rotateSlow 80s linear infinite",
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
            {/* label row */}
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
              <span className="sec-label">Legal Agreement</span>
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
                fontSize: "clamp(44px,9vw,98px)",
                fontWeight: 300,
                lineHeight: 1.0,
                marginBottom: 18,
                color: "#fff",
              }}
            >
              Terms of{" "}
              <span
                className="gold-shimmer"
                style={{ fontWeight: 700, fontStyle: "italic" }}
              >
                Service
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
              The key rules for using Noor Al-Quran Academy — written clearly,
              without the legalese.
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

            {/* 4 quick pills */}
            <div
              className="qs"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 10,
              }}
            >
              {[
                { v: "Free", l: "30-Min Trial" },
                { v: "30-Day", l: "Money Back" },
                { v: "Cancel", l: "Anytime" },
                { v: "Plain", l: "Language" },
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
                        <Scroll size={13} />
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
                {/* Intro note */}
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
                    <Gavel
                      size={18}
                      style={{
                        color: "var(--gold-m)",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    />
                    <p className="bt" style={{ margin: 0 }}>
                      By using our platform you agree to these terms. We've kept
                      them short — only the points that actually matter to you
                      as a student.
                    </p>
                  </div>
                </div>

                {/* 01 */}
                <Sec
                  id="acceptance"
                  num="01"
                  icon={CheckCircle}
                  title="Acceptance of Terms"
                  accent="#2fcf87"
                >
                  <p className="bt" style={{ marginBottom: 10 }}>
                    Using our platform means you confirm:
                  </p>
                  {[
                    "You're 18+ or have parental consent if you're a minor.",
                    "You accept our Privacy Policy (incorporated here by reference).",
                    "You have authority to agree for yourself or your family.",
                  ].map((t, i) => (
                    <div key={i} className="ci">
                      <Check ok={true} />
                      <p className="bt" style={{ margin: 0 }}>
                        {t}
                      </p>
                    </div>
                  ))}
                  <div className="wb" style={{ marginTop: 10 }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                      }}
                    >
                      <AlertTriangle
                        size={15}
                        style={{
                          color: "#ff8fa3",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      />
                      <p className="bt" style={{ margin: 0 }}>
                        If you disagree, please don't use the platform.
                        Continued use after updates means you accept the
                        changes.
                      </p>
                    </div>
                  </div>
                </Sec>

                {/* 02 */}
                <Sec
                  id="services"
                  num="02"
                  icon={BookOpen}
                  title="Our Services"
                  accent="#7eb8ff"
                >
                  <p className="bt" style={{ marginBottom: 12 }}>
                    We offer certified online Islamic education:
                  </p>
                  <div
                    className="two-col"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 8,
                      marginBottom: 12,
                    }}
                  >
                    {[
                      "Quran Recitation",
                      "Tajweed",
                      "Hifz (Memorisation)",
                      "Arabic Language",
                      "Islamic Studies",
                      "Noorani Qaida",
                    ].map((s, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: 9,
                          alignItems: "center",
                          padding: "9px 12px",
                          background: "rgba(127,178,255,.05)",
                          border: "1px solid rgba(127,178,255,.1)",
                          borderRadius: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: "#7eb8ff",
                            flexShrink: 0,
                          }}
                        />
                        <p
                          style={{
                            margin: 0,
                            color: "rgba(255,255,255,.65)",
                            fontFamily: "'Nunito',sans-serif",
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          {s}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="bt">
                    We may modify services with reasonable notice to active
                    subscribers.
                  </p>
                </Sec>

                {/* 03 */}
                <Sec
                  id="accounts"
                  num="03"
                  icon={UserCheck}
                  title="Your Account"
                  accent="var(--gold-m)"
                >
                  {[
                    {
                      ok: true,
                      t: "Use accurate information when registering.",
                    },
                    { ok: true, t: "Keep your password confidential." },
                    {
                      ok: true,
                      t: "Notify us immediately of any unauthorised access.",
                    },
                    {
                      ok: false,
                      t: "Share your account or create duplicate accounts.",
                    },
                    {
                      ok: false,
                      t: "Impersonate others or use bots to sign up.",
                    },
                  ].map((x, i) => (
                    <div key={i} className="ci">
                      <Check ok={x.ok} />
                      <p className="bt" style={{ margin: 0 }}>
                        {x.t}
                      </p>
                    </div>
                  ))}
                  <div className="hi" style={{ marginTop: 10 }}>
                    <p className="bt" style={{ margin: 0 }}>
                      You're responsible for all activity on your account.
                    </p>
                  </div>
                </Sec>

                {/* 04 */}
                <Sec
                  id="payments"
                  num="04"
                  icon={CreditCard}
                  title="Payments & Refunds"
                  accent="#ff8fa3"
                >
                  {[
                    {
                      label: "Free Trial",
                      detail:
                        "One free 30-min session per household — no card needed.",
                      color: "#2fcf87",
                    },
                    {
                      label: "Billing",
                      detail:
                        "Monthly or annual billing via Stripe (secure). Charged on signup date.",
                      color: "#ff8fa3",
                    },
                    {
                      label: "Money Back",
                      detail:
                        "Full refund within first 30 days — no questions asked.",
                      color: "#2fcf87",
                    },
                    {
                      label: "Cancellation",
                      detail:
                        "Cancel anytime from your dashboard. Access continues until period ends.",
                      color: "var(--gold-m)",
                    },
                    {
                      label: "Reschedule",
                      detail:
                        "Reschedule up to 2 hours before a session to avoid credit loss.",
                      color: "#7eb8ff",
                    },
                    {
                      label: "Price Changes",
                      detail:
                        "We give 30 days' written notice before any price increase.",
                      color: "#ffd166",
                    },
                  ].map((x, i) => (
                    <div key={i} className="ir">
                      <Tag label={x.label} color={x.color} />
                      <p className="bt" style={{ margin: 0 }}>
                        {x.detail}
                      </p>
                    </div>
                  ))}
                  <div className="gb" style={{ marginTop: 10 }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                      }}
                    >
                      <CheckCircle
                        size={15}
                        style={{
                          color: "#2fcf87",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      />
                      <p className="bt" style={{ margin: 0 }}>
                        <strong style={{ color: "#2fcf87" }}>
                          30-Day Money-Back Guarantee
                        </strong>{" "}
                        — Not satisfied in your first month? We'll refund you in
                        full.
                      </p>
                    </div>
                  </div>
                </Sec>

                {/* 05 */}
                <Sec
                  id="conduct"
                  num="05"
                  icon={Scale}
                  title="Conduct"
                  accent="#b58cff"
                >
                  <p className="sub-label">Allowed ✓</p>
                  {[
                    "Use the platform for personal, lawful learning.",
                    "Share constructive feedback about tutors or sessions.",
                  ].map((t, i) => (
                    <div key={i} className="ci">
                      <Check ok={true} />
                      <p className="bt" style={{ margin: 0 }}>
                        {t}
                      </p>
                    </div>
                  ))}
                  <p className="sub-label">Not Allowed ✗</p>
                  {[
                    "Harass, threaten, or disrespect tutors or students.",
                    "Record or share session content without consent.",
                    "Use the platform for anything other than personal education.",
                    "Attempt to hack, scrape, or interfere with the platform.",
                  ].map((t, i) => (
                    <div key={i} className="ci">
                      <Check ok={false} />
                      <p className="bt" style={{ margin: 0 }}>
                        {t}
                      </p>
                    </div>
                  ))}
                </Sec>

                {/* 06 */}
                <Sec
                  id="ip"
                  num="06"
                  icon={Scroll}
                  title="Intellectual Property"
                  accent="#ffd166"
                >
                  <div
                    className="two-col"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    {[
                      {
                        title: "Our Content",
                        items: [
                          "Curriculum & lessons",
                          "Platform design & branding",
                          "Video & audio recordings",
                        ],
                      },
                      {
                        title: "Your Content",
                        items: [
                          "You keep ownership of what you submit",
                          "We use it only to deliver the service",
                          "We never sell it — delete on request",
                        ],
                      },
                    ].map((col, i) => (
                      <div key={i} className="mc">
                        <p
                          style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 16,
                            fontWeight: 700,
                            color: "#fff",
                            marginBottom: 10,
                          }}
                        >
                          {col.title}
                        </p>
                        {col.items.map((t, j) => (
                          <div
                            key={j}
                            className="ci"
                            style={{ paddingBottom: 2 }}
                          >
                            <div
                              style={{
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                background: "#ffd166",
                                flexShrink: 0,
                                marginTop: 7,
                              }}
                            />
                            <p
                              className="bt"
                              style={{ margin: 0, fontSize: 13 }}
                            >
                              {t}
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <p className="bt">
                    Personal use only. No redistribution without written
                    permission.
                  </p>
                </Sec>

                {/* 07 */}
                <Sec
                  id="liability"
                  num="07"
                  icon={ShieldAlert}
                  title="Liability"
                  accent="#ff8fa3"
                >
                  <div className="wb" style={{ margin: "0 0 14px" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                      }}
                    >
                      <AlertTriangle
                        size={15}
                        style={{
                          color: "#ff8fa3",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      />
                      <p className="bt" style={{ margin: 0 }}>
                        Platform is provided{" "}
                        <strong style={{ color: "rgba(255,255,255,.7)" }}>
                          "as is"
                        </strong>
                        . We cannot guarantee specific learning results or 100%
                        uptime.
                      </p>
                    </div>
                  </div>
                  {[
                    {
                      label: "Outcomes",
                      detail:
                        "Results depend on student effort. We strive for quality but don't guarantee specific progress.",
                      color: "#ff8fa3",
                    },
                    {
                      label: "Uptime",
                      detail:
                        "We aim for 99.9% availability. Planned maintenance is announced in advance.",
                      color: "#7eb8ff",
                    },
                    {
                      label: "Our Limit",
                      detail:
                        "Max liability is capped at what you paid us in the last 3 months.",
                      color: "var(--gold-m)",
                    },
                    {
                      label: "3rd Parties",
                      detail:
                        "Not responsible for Stripe, Zoom, or your internet connection.",
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
                </Sec>

                {/* 08 */}
                <Sec
                  id="contact"
                  num="08"
                  icon={Mail}
                  title="Contact & Updates"
                  accent="#7eb8ff"
                >
                  <p className="bt" style={{ marginBottom: 14 }}>
                    Questions about these terms? Reach us any time:
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
                        label: "Legal",
                        value: "legal@nooralquran.com",
                        icon: Gavel,
                        color: "#7eb8ff",
                      },
                      {
                        label: "Support",
                        value: "support@nooralquran.com",
                        icon: Mail,
                        color: "var(--gold-m)",
                      },
                      {
                        label: "WhatsApp",
                        value: "+1 (234) 567-890",
                        icon: Phone,
                        color: "#2fcf87",
                      },
                    ].map((c, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "14px",
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
                            width: 32,
                            height: 32,
                            borderRadius: 9,
                            flexShrink: 0,
                            background: `${c.color}16`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: c.color,
                          }}
                        >
                          <c.icon size={14} />
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
                          <p
                            style={{
                              color: c.color,
                              fontSize: 13,
                              fontWeight: 700,
                              fontFamily: "'Nunito',sans-serif",
                            }}
                          >
                            {c.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="hi" style={{ margin: 0 }}>
                    <p className="bt" style={{ margin: 0 }}>
                      Material changes will be communicated at least{" "}
                      <strong style={{ color: "var(--gold-lt)" }}>
                        14 days
                      </strong>{" "}
                      in advance by email or site notice.
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
              Ready to Begin?
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
              Start Your Free
              <br />
              <span
                className="gold-shimmer"
                style={{ fontWeight: 700, fontStyle: "italic" }}
              >
                Trial Session
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
              No credit card. No commitment. Just 30 minutes with a certified
              tutor.
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
                to="/book-free-trial"
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
                <span>✦</span> Book Free Trial <ArrowRight size={14} />
              </Link>
              <Link
                to="/privacy-policy"
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
                Privacy Policy
              </Link>
              <Link
                to="/contact"
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
                Contact Us
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
