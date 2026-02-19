import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle,
  ArrowRight,
  Globe,
  Clock,
  Shield,
  Star,
  ChevronRight,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Sparkles,
} from "lucide-react";
import { submitLead } from "../services/api";

// ─────────────────────────────────────────────────────────────────────────────
// STYLES — matches FAQ palette exactly
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
  .dots-bg {
    background-image: radial-gradient(rgba(201,151,58,.12) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  @keyframes fadeUp    { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimText  { 0%{background-position:-500px 0} 100%{background-position:500px 0} }
  @keyframes glowPulse { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:.75;transform:scale(1.06)} }
  @keyframes shimBar   { 0%{left:-100%} 100%{left:200%} }
  @keyframes rotateSlow{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes ripple    { 0%{transform:scale(0.8);opacity:1} 100%{transform:scale(2.2);opacity:0} }
  @keyframes scanLine  { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
  @keyframes borderPulse { 0%,100%{border-color:rgba(201,151,58,.3)} 50%{border-color:rgba(201,151,58,.7)} }

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
  .green-text {
    background:linear-gradient(135deg,#2fcf87 0%,#1aa866 100%);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  }
  .glow-pulse { animation:glowPulse 4s ease-in-out infinite; }
  .float-anim { animation:float 6s ease-in-out infinite; }
  .float-anim-delay { animation:float 6s 2s ease-in-out infinite; }

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

  /* contact info card */
  .info-card {
    background:rgba(255,255,255,.025);
    border:1px solid rgba(255,255,255,.07);
    border-radius:22px;
    padding:28px 24px;
    transition:all .35s cubic-bezier(.16,1,.3,1);
    position:relative;overflow:hidden;
    cursor:default;
  }
  .info-card::before {
    content:'';position:absolute;top:0;left:0;right:0;height:2px;
    background:linear-gradient(90deg,transparent,rgba(201,151,58,.0),transparent);
    transition:background .4s;
  }
  .info-card:hover {
    transform:translateY(-6px) translateX(4px);
    border-color:rgba(201,151,58,.3);
    box-shadow:0 24px 60px rgba(0,0,0,.5),0 0 0 1px rgba(201,151,58,.1);
  }
  .info-card:hover::before {
    background:linear-gradient(90deg,transparent,var(--gold),transparent);
  }

  /* form input */
  .contact-input {
    width:100%;
    background:rgba(255,255,255,.035);
    border:1px solid rgba(255,255,255,.08);
    border-radius:16px;
    padding:18px 22px;
    color:#fff;
    font-family:'Nunito',sans-serif;font-size:15px;font-weight:600;
    outline:none;transition:all .3s;
    resize:none;
    box-sizing:border-box;
  }
  .contact-input::placeholder{color:rgba(255,255,255,.22);}
  .contact-input:focus{
    border-color:rgba(201,151,58,.5);
    background:rgba(255,255,255,.055);
    box-shadow:0 0 0 4px rgba(201,151,58,.08), 0 8px 32px rgba(0,0,0,.3);
  }

  /* floating label wrapper */
  .field-wrap { position:relative; }
  .field-icon {
    position:absolute;
    left:18px;top:50%;transform:translateY(-50%);
    color:rgba(255,255,255,.2);
    pointer-events:none;
    transition:color .3s;
  }
  .field-wrap:focus-within .field-icon { color:var(--gold-m); }
  .field-wrap .contact-input { padding-left:50px; }

  /* submit button */
  .submit-btn {
    width:100%;
    background:linear-gradient(135deg,var(--gold-m),var(--gold));
    color:#020b06;
    border:none;
    padding:20px 32px;
    border-radius:16px;
    font-family:'Cinzel',serif;
    font-size:14px;font-weight:700;
    letter-spacing:.12em;
    cursor:pointer;
    transition:all .35s cubic-bezier(.16,1,.3,1);
    display:flex;align-items:center;justify-content:center;gap:10px;
    box-shadow:0 8px 32px rgba(201,151,58,.35),inset 0 1px 0 rgba(255,255,255,.2);
    position:relative;overflow:hidden;
  }
  .submit-btn::after {
    content:'';position:absolute;inset:0;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);
    transform:translateX(-100%);
    transition:transform .5s;
  }
  .submit-btn:hover { transform:translateY(-3px) scale(1.01); box-shadow:0 16px 48px rgba(201,151,58,.5); }
  .submit-btn:hover::after { transform:translateX(100%); }
  .submit-btn:disabled { opacity:.6; cursor:not-allowed; transform:none; }

  /* trust badge */
  .trust-badge {
    display:inline-flex;align-items:center;gap:8px;
    padding:8px 16px;border-radius:100px;
    background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);
    color:rgba(255,255,255,.4);
    font-family:'Nunito',sans-serif;font-size:12px;font-weight:700;
  }

  /* ripple ring */
  .ripple-ring {
    position:absolute;border-radius:50%;border-style:solid;
    animation:ripple 2.5s ease-out infinite;pointer-events:none;
  }

  /* social link */
  .social-link {
    width:44px;height:44px;border-radius:12px;
    background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);
    display:flex;align-items:center;justify-content:center;
    color:rgba(255,255,255,.4);
    transition:all .3s;cursor:pointer;text-decoration:none;
  }
  .social-link:hover {
    background:rgba(201,151,58,.12);border-color:rgba(201,151,58,.35);
    color:var(--gold-lt);transform:translateY(-3px);
    box-shadow:0 8px 24px rgba(201,151,58,.2);
  }

  /* map placeholder */
  .map-container {
    background:rgba(255,255,255,.02);
    border:1px solid rgba(255,255,255,.07);
    border-radius:24px;overflow:hidden;
    position:relative;
  }

  /* stat card */
  .stat-card {
    text-align:center;padding:28px 20px;
    background:rgba(255,255,255,.025);
    border:1px solid rgba(255,255,255,.06);
    border-radius:20px;
    transition:all .35s;
  }
  .stat-card:hover {
    border-color:rgba(201,151,58,.25);
    transform:translateY(-4px);
    box-shadow:0 20px 48px rgba(0,0,0,.4);
  }

  /* process step */
  .process-step {
    display:flex;gap:20px;align-items:flex-start;
    padding:24px 28px;
    background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);
    border-radius:20px;
    transition:all .3s;
  }
  .process-step:hover {
    background:rgba(255,255,255,.04);border-color:rgba(201,151,58,.2);
    transform:translateX(6px);
  }

  /* responsive */
  @media(max-width:768px) {
    .contact-grid { grid-template-columns:1fr!important; }
    .info-grid { grid-template-columns:1fr 1fr!important; }
    .stats-grid { grid-template-columns:repeat(2,1fr)!important; }
    .form-row { flex-direction:column!important; }
  }
  @media(max-width:480px) {
    .info-grid { grid-template-columns:1fr!important; }
    .stats-grid { grid-template-columns:1fr 1fr!important; }
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
      { threshold: 0.08 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export const Contact: React.FC = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const heroReveal = useReveal();
  const statsReveal = useReveal();
  const formReveal = useReveal();
  const processReveal = useReveal();
  const officesReveal = useReveal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = {
      type: "contact" as const,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      country: formData.get("country") as string,
      message: formData.get("message") as string,
    };
    const res = await submitLead(data);
    if (res.success) setStatus("success");
    else setStatus("error");
  };

  const infoCards = [
    {
      icon: Phone,
      title: "Call / WhatsApp",
      value: "+9203006873200",
      sub: "Available 24 hours a day",
      color: "#2fcf87",
      bg: "rgba(47,207,135,.12)",
      border: "rgba(47,207,135,.25)",
    },
    {
      icon: Mail,
      title: "Email Support",
      value: "aliflaameem772@gmail.com",
      sub: "Reply within 2 hours",
      color: "#7eb8ff",
      bg: "rgba(127,178,255,.12)",
      border: "rgba(127,178,255,.25)",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      value: "Available 24/7",
      sub: "Instant response",
      color: "var(--gold-m)",
      bg: "rgba(201,151,58,.12)",
      border: "rgba(201,151,58,.3)",
    },
    {
      icon: Globe,
      title: "Global Reach",
      value: "50+ Countries",
      sub: "Worldwide students",
      color: "#b58cff",
      bg: "rgba(181,140,255,.12)",
      border: "rgba(181,140,255,.25)",
    },
  ];

  const stats = [
    { value: "15K+", label: "Students Taught", icon: Star },
    { value: "50+", label: "Countries Served", icon: Globe },
    { value: "< 2h", label: "Response Time", icon: Clock },
    { value: "100%", label: "Satisfaction Rate", icon: Shield },
  ];

  const processSteps = [
    {
      num: "01",
      title: "Send Your Message",
      desc: "Fill out the form or reach us via WhatsApp, email, or live chat — whichever you prefer.",
    },
    {
      num: "02",
      title: "Meet Your Coordinator",
      desc: "A dedicated learning coordinator will reach out to understand your goals and match you perfectly.",
    },
    {
      num: "03",
      title: "Start Your Free Trial",
      desc: "Book your complimentary 30-minute session with no commitment required.",
    },
  ];

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
        {/* ══════════════════════ HERO SECTION */}
        <section
          style={{
            background:
              "radial-gradient(ellipse 130% 80% at 20% 0%,#0d4a2a 0%,transparent 55%),radial-gradient(ellipse 80% 100% at 85% 100%,#062418 0%,transparent 50%),#020b06",
            padding: "clamp(100px,14vw,160px) 24px clamp(70px,10vw,100px)",
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
            تواصل
          </div>

          {/* Rotating dashed ring */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "-15%",
              transform: "translateY(-50%)",
              width: 500,
              height: 500,
              borderRadius: "50%",
              border: "1px dashed rgba(201,151,58,.08)",
              animation: "rotateSlow 60s linear infinite",
              pointerEvents: "none",
            }}
          />

          {/* Glow orb */}
          <div
            className="glow-pulse"
            style={{
              position: "absolute",
              top: "-8%",
              right: "15%",
              width: 450,
              height: 450,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(201,151,58,.08) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            ref={heroReveal.ref}
            style={{
              maxWidth: 960,
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
              <span className="sec-label">We'd Love to Hear From You</span>
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
                fontSize: "clamp(52px,9vw,110px)",
                fontWeight: 300,
                lineHeight: 1.0,
                marginBottom: 24,
                color: "#fff",
              }}
            >
              Get in{" "}
              <span
                className="gold-shimmer"
                style={{ fontWeight: 700, fontStyle: "italic" }}
              >
                Touch
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
              Our scholars and support team are standing by to guide your
              Quranic journey — day or night.
            </p>

            {/* Trust badges */}
            <div
              className="h4"
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: 50,
              }}
            >
              {[
                "Free Consultation",
                "No Commitment",
                "24/7 Support",
                "Certified Scholars",
              ].map((badge, i) => (
                <span key={i} className="trust-badge">
                  <span style={{ color: "var(--gold)", fontSize: 9 }}>✦</span>{" "}
                  {badge}
                </span>
              ))}
            </div>

            {/* Scroll cue */}
            <div
              className="h5 float-anim"
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                opacity: 0.35,
              }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 9,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                }}
              >
                Scroll to connect
              </span>
              <div
                style={{
                  width: 1,
                  height: 36,
                  background:
                    "linear-gradient(180deg,rgba(201,151,58,.5),transparent)",
                }}
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════ STATS STRIP */}
        <section
          ref={statsReveal.ref}
          style={{
            background: "var(--forest)",
            padding: "60px 24px",
            borderTop: "1px solid rgba(201,151,58,.1)",
            borderBottom: "1px solid rgba(201,151,58,.1)",
            opacity: statsReveal.vis ? 1 : 0,
            transform: statsReveal.vis ? "translateY(0)" : "translateY(24px)",
            transition: "opacity .7s ease, transform .7s ease",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div
              className="stats-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 16,
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="stat-card"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      margin: "0 auto 16px",
                      background: "rgba(201,151,58,.1)",
                      border: "1px solid rgba(201,151,58,.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--gold-m)",
                    }}
                  >
                    <s.icon size={20} />
                  </div>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 28,
                      fontWeight: 700,
                      color: "var(--gold-m)",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,.35)",
                      fontSize: 11,
                      letterSpacing: ".06em",
                      marginTop: 6,
                      fontFamily: "'Cinzel',serif",
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ MAIN CONTACT SECTION */}
        <section
          style={{
            padding: "clamp(60px,10vw,120px) 24px",
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
            <div
              className="contact-grid"
              ref={formReveal.ref}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(32px,5vw,72px)",
                opacity: formReveal.vis ? 1 : 0,
                transform: formReveal.vis
                  ? "translateY(0)"
                  : "translateY(32px)",
                transition: "opacity .8s ease, transform .8s ease",
              }}
            >
              {/* ── LEFT: Info + Cards */}
              <div>
                <div style={{ marginBottom: 40 }}>
                  <span
                    className="sec-label"
                    style={{ display: "block", marginBottom: 14 }}
                  >
                    Contact Information
                  </span>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "clamp(30px,4vw,52px)",
                      fontWeight: 600,
                      color: "#fff",
                      lineHeight: 1.15,
                      marginBottom: 16,
                    }}
                  >
                    Reach Out & <span className="gold-text">We'll Respond</span>
                    <br />
                    <span style={{ fontWeight: 300, fontStyle: "italic" }}>
                      Promptly
                    </span>
                  </h2>
                  <p
                    style={{
                      color: "rgba(255,255,255,.4)",
                      fontSize: 15,
                      lineHeight: 1.85,
                    }}
                  >
                    Whether you're a prospective student, a parent, or simply
                    curious — our team of dedicated scholars and coordinators is
                    here to help with any question.
                  </p>
                </div>

                {/* Info cards grid */}
                <div
                  className="info-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                    marginBottom: 36,
                  }}
                >
                  {infoCards.map((card, i) => (
                    <div
                      key={i}
                      className="info-card shb"
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 14,
                          marginBottom: 16,
                          background: card.bg,
                          border: `1px solid ${card.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: card.color,
                          boxShadow: `0 4px 20px ${card.bg}`,
                        }}
                      >
                        <card.icon size={20} />
                      </div>
                      <p
                        style={{
                          color: "rgba(255,255,255,.3)",
                          fontSize: 10,
                          fontFamily: "'Cinzel',serif",
                          letterSpacing: ".14em",
                          textTransform: "uppercase",
                          marginBottom: 4,
                        }}
                      >
                        {card.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 18,
                          fontWeight: 700,
                          color: "#fff",
                          marginBottom: 4,
                        }}
                      >
                        {card.value}
                      </p>
                      <p
                        style={{ color: "rgba(255,255,255,.25)", fontSize: 12 }}
                      >
                        {card.sub}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Social links */}
                <div>
                  <p
                    style={{
                      color: "rgba(255,255,255,.25)",
                      fontSize: 11,
                      fontFamily: "'Cinzel',serif",
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      marginBottom: 14,
                    }}
                  >
                    Follow Us
                  </p>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                      <a key={i} href="#" className="social-link">
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Decorative quote */}
                <div
                  style={{
                    marginTop: 36,
                    padding: "28px 28px 28px 32px",
                    background: "rgba(201,151,58,.04)",
                    border: "1px solid rgba(201,151,58,.12)",
                    borderLeft: "3px solid var(--gold)",
                    borderRadius: 16,
                    position: "relative",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 20,
                      fontStyle: "italic",
                      color: "rgba(255,255,255,.55)",
                      lineHeight: 1.7,
                    }}
                  >
                    "The best of you are those who learn the Quran and teach
                    it."
                  </p>
                  <p
                    style={{
                      color: "var(--gold-m)",
                      fontSize: 11,
                      fontFamily: "'Cinzel',serif",
                      letterSpacing: ".1em",
                      marginTop: 12,
                    }}
                  >
                    — Prophet Muhammad ﷺ
                  </p>
                </div>
              </div>

              {/* ── RIGHT: Form */}
              <div
                style={{
                  background: "rgba(255,255,255,.025)",
                  border: "1px solid rgba(255,255,255,.07)",
                  borderRadius: 28,
                  padding: "clamp(28px,5vw,52px)",
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

                {status === "success" ? (
                  <div style={{ textAlign: "center", padding: "60px 20px" }}>
                    {/* Ripple rings */}
                    <div
                      style={{
                        position: "relative",
                        width: 100,
                        height: 100,
                        margin: "0 auto 32px",
                      }}
                    >
                      <div
                        className="ripple-ring"
                        style={{
                          inset: 0,
                          borderWidth: 2,
                          borderColor: "rgba(47,207,135,.4)",
                        }}
                      />
                      <div
                        className="ripple-ring"
                        style={{
                          inset: 0,
                          borderWidth: 2,
                          borderColor: "rgba(47,207,135,.25)",
                          animationDelay: ".7s",
                        }}
                      />
                      <div
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg,rgba(47,207,135,.2),rgba(47,207,135,.08))",
                          border: "1px solid rgba(47,207,135,.35)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#2fcf87",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        <CheckCircle size={44} />
                      </div>
                    </div>
                    <h2
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 36,
                        fontWeight: 700,
                        color: "#fff",
                        marginBottom: 12,
                      }}
                    >
                      Message Received!
                    </h2>
                    <p
                      style={{
                        color: "rgba(255,255,255,.4)",
                        fontSize: 15,
                        lineHeight: 1.8,
                        maxWidth: 320,
                        margin: "0 auto 28px",
                      }}
                    >
                      Our team will respond within 2 hours. Jazak Allah Khayran
                      for reaching out.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      style={{
                        padding: "12px 28px",
                        borderRadius: 12,
                        cursor: "pointer",
                        background: "rgba(201,151,58,.12)",
                        border: "1px solid rgba(201,151,58,.3)",
                        color: "var(--gold-lt)",
                        fontFamily: "'Cinzel',serif",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: ".12em",
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{ marginBottom: 32 }}>
                      <span
                        className="sec-label"
                        style={{ display: "block", marginBottom: 8 }}
                      >
                        Send a Message
                      </span>
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 28,
                          fontWeight: 600,
                          color: "#fff",
                        }}
                      >
                        Let's Start a{" "}
                        <span className="gold-text">Conversation</span>
                      </h3>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                      }}
                    >
                      {/* Name + Phone row */}
                      <div
                        className="form-row"
                        style={{ display: "flex", gap: 14 }}
                      >
                        <div className="field-wrap" style={{ flex: 1 }}>
                          <svg
                            className="field-icon"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                          </svg>
                          <input
                            required
                            name="name"
                            type="text"
                            placeholder="Full Name"
                            className="contact-input"
                          />
                        </div>
                        <div className="field-wrap" style={{ flex: 1 }}>
                          <svg
                            className="field-icon"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.82 19.79 19.79 0 01.9 2.18 2 2 0 012.88 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                          </svg>
                          <input
                            name="phone"
                            type="tel"
                            placeholder="Phone (optional)"
                            className="contact-input"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="field-wrap">
                        <svg
                          className="field-icon"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <input
                          required
                          name="email"
                          type="email"
                          placeholder="Email Address"
                          className="contact-input"
                        />
                      </div>

                      {/* Country */}
                      <div className="field-wrap">
                        <svg
                          className="field-icon"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                        </svg>
                        <input
                          name="country"
                          type="text"
                          placeholder="Your Country"
                          className="contact-input"
                        />
                      </div>

                      {/* Subject */}
                      <select
                        name="subject"
                        className="contact-input"
                        style={{ appearance: "none", cursor: "pointer" }}
                      >
                        <option
                          value=""
                          disabled
                          selected
                          style={{ background: "#020b06" }}
                        >
                          Select a Subject
                        </option>
                        <option value="trial" style={{ background: "#020b06" }}>
                          Book a Free Trial
                        </option>
                        <option
                          value="pricing"
                          style={{ background: "#020b06" }}
                        >
                          Pricing & Plans
                        </option>
                        <option
                          value="tutors"
                          style={{ background: "#020b06" }}
                        >
                          Tutor Information
                        </option>
                        <option
                          value="technical"
                          style={{ background: "#020b06" }}
                        >
                          Technical Support
                        </option>
                        <option value="other" style={{ background: "#020b06" }}>
                          Other Inquiry
                        </option>
                      </select>

                      {/* Message */}
                      <textarea
                        required
                        name="message"
                        rows={5}
                        placeholder="Your Message..."
                        className="contact-input"
                        style={{ paddingLeft: 22 }}
                      />

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="submit-btn"
                      >
                        {status === "loading" ? (
                          <>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              style={{
                                animation: "rotateSlow 1s linear infinite",
                              }}
                            >
                              <path d="M21 12a9 9 0 11-6.219-8.56" />
                            </svg>
                            Sending Your Message…
                          </>
                        ) : (
                          <>
                            <Send size={16} /> Send Message{" "}
                            <ArrowRight size={14} />
                          </>
                        )}
                      </button>

                      {status === "error" && (
                        <p
                          style={{
                            color: "#ff8fa3",
                            fontSize: 13,
                            textAlign: "center",
                            marginTop: -4,
                          }}
                        >
                          Something went wrong. Please try again or reach us via
                          WhatsApp.
                        </p>
                      )}

                      {/* Privacy note */}
                      <p
                        style={{
                          color: "rgba(255,255,255,.2)",
                          fontSize: 11,
                          textAlign: "center",
                          lineHeight: 1.7,
                          marginTop: 4,
                        }}
                      >
                        <Shield
                          size={11}
                          style={{
                            display: "inline",
                            marginRight: 5,
                            verticalAlign: "middle",
                          }}
                        />
                        Your information is protected. We never share your data.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════ HOW IT WORKS (PROCESS) */}
      

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
              Your Journey to the
              <br />
              <span
                className="gold-shimmer"
                style={{ fontWeight: 700, fontStyle: "italic" }}
              >
                Noble Quran
              </span>{" "}
              Awaits
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
              Book your complimentary 30-minute trial today — meet your tutor,
              experience our platform, and take your first step.
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="/book-free-trial"
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
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(47,207,135,.1)",
                  border: "1px solid rgba(47,207,135,.3)",
                  color: "#2fcf87",
                  padding: "18px 36px",
                  borderRadius: 16,
                  fontFamily: "'Cinzel',serif",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: ".1em",
                  textDecoration: "none",
                }}
              >
                <Phone size={16} /> WhatsApp Us
              </a>
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
