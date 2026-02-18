import React, { useState, useRef, useEffect } from "react";
import { submitLead } from "../services/api";
import {
  CheckCircle2,
  Loader2,
  Clock,
  User,
  Mail,
  Phone,
  Globe,
  ArrowRight,
  Star,
  Shield,
  Award,
  Video,
  Zap,
  CheckCircle,
  UserCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// STYLES  (Responsive + Lucide icon animations)
// ─────────────────────────────────────────────────────────────────────────────
const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,600&family=Cinzel:wght@400;600;700;900&family=Nunito:wght@400;500;600;700;800&display=swap');

  :root {
    --deep:    #020b06;
    --forest:  #051610;
    --em-lt:   #2fcf87;
    --gold:    #c9973a;
    --gold-m:  #e4b558;
    --gold-lt: #f5d98e;
  }

  * { box-sizing:border-box; }
  html, body { max-width:100%; overflow-x:hidden; }
  img, svg, video, iframe { max-width:100%; }

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
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes pulse2    { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.6);opacity:0} }
  @keyframes checkPop  { 0%{transform:scale(0) rotate(-20deg)} 70%{transform:scale(1.15) rotate(4deg)} 100%{transform:scale(1) rotate(0deg)} }
  @keyframes spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes wiggle    { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(6deg)} 75%{transform:rotate(-6deg)} }

  /* Lucide icon animations */
  .icon-spin { animation:spin 7s linear infinite; transform-origin:center; }
  .icon-wiggle { animation:wiggle 3.5s ease-in-out infinite; transform-origin:center; }
  .icon-float { animation:float 5s ease-in-out infinite; transform-origin:center; }
  .icon-soft { transition: transform .25s ease, opacity .25s ease; }
  .hover-icon:hover .icon-soft { transform: translateY(-2px) scale(1.06); opacity: .95; }

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
  .h5{animation:fadeUp .7s .45s cubic-bezier(.16,1,.3,1) both}

  .sec-label {
    font-family:'Cinzel',serif;font-size:11px;font-weight:700;
    letter-spacing:.28em;text-transform:uppercase;color:var(--gold);
  }

  .shb{position:relative;overflow:hidden;}
  .shb::after{
    content:'';position:absolute;inset:0;pointer-events:none;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent);
    animation:shimBar 3.5s ease-in-out infinite;
  }

  /* ── form fields ── */
  .f-input {
    width:100%;background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.09);border-radius:14px;
    padding:14px 18px 14px 46px;
    color:#fff;font-family:'Nunito',sans-serif;font-size:14px;font-weight:600;
    outline:none;transition:all .3s;box-sizing:border-box;
  }
  .f-input::placeholder{color:rgba(255,255,255,.25);}
  .f-input:focus{
    border-color:rgba(201,151,58,.5);background:rgba(255,255,255,.06);
    box-shadow:0 0 0 4px rgba(201,151,58,.08);
  }
  .f-input-bare {
    width:100%;background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.09);border-radius:14px;
    padding:14px 18px;
    color:#fff;font-family:'Nunito',sans-serif;font-size:14px;font-weight:600;
    outline:none;transition:all .3s;box-sizing:border-box;
  }
  .f-input-bare::placeholder{color:rgba(255,255,255,.25);}
  .f-input-bare:focus{
    border-color:rgba(201,151,58,.5);background:rgba(255,255,255,.06);
    box-shadow:0 0 0 4px rgba(201,151,58,.08);
  }
  .f-select {
    width:100%;background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.09);border-radius:14px;
    padding:14px 18px;
    color:#fff;font-family:'Nunito',sans-serif;font-size:14px;font-weight:600;
    outline:none;transition:all .3s;cursor:pointer;
    -webkit-appearance:none;appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat:no-repeat;background-position:right 16px center;
    background-size:16px;padding-right:44px;
    box-sizing:border-box;
  }
  .f-select:focus{border-color:rgba(201,151,58,.5);background-color:rgba(255,255,255,.06);box-shadow:0 0 0 4px rgba(201,151,58,.08);}
  .f-select option{background:#0a2e18;color:#fff;}

  /* day checkbox pill */
  .day-pill input[type=checkbox]{display:none;}
  .day-pill label {
    display:inline-flex;align-items:center;justify-content:center;
    padding:10px 16px;border-radius:100px;cursor:pointer;
    font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:.14em;
    border:1px solid rgba(255,255,255,.1);
    color:rgba(255,255,255,.45);background:rgba(255,255,255,.03);
    transition:all .25s;white-space:nowrap;user-select:none;
  }
  .day-pill input[type=checkbox]:checked + label {
    background:linear-gradient(135deg,rgba(201,151,58,.22),rgba(201,151,58,.1));
    border-color:rgba(201,151,58,.55);color:var(--gold-lt);
    box-shadow:0 4px 14px rgba(201,151,58,.15);
  }
  .day-pill label:hover{border-color:rgba(201,151,58,.3);color:var(--gold-lt);}

  /* teacher pref pill */
  .pref-pill input[type=radio]{display:none;}
  .pref-pill label {
    display:inline-flex;align-items:center;gap:7px;
    padding:11px 22px;border-radius:100px;cursor:pointer;
    font-family:'Cinzel',serif;font-size:9px;font-weight:700;letter-spacing:.14em;
    border:1px solid rgba(255,255,255,.1);
    color:rgba(255,255,255,.45);background:rgba(255,255,255,.03);
    transition:all .25s;user-select:none;
  }
  .pref-pill input[type=radio]:checked + label {
    background:linear-gradient(135deg,rgba(201,151,58,.22),rgba(201,151,58,.1));
    border-color:rgba(201,151,58,.55);color:var(--gold-lt);
    box-shadow:0 4px 14px rgba(201,151,58,.15);
  }
  .pref-pill label:hover{border-color:rgba(201,151,58,.3);color:var(--gold-lt);}

  /* form section label */
  .f-section-label {
    font-family:'Cinzel',serif;font-size:9px;font-weight:700;
    letter-spacing:.22em;text-transform:uppercase;
    color:rgba(255,255,255,.3);margin-bottom:14px;display:block;
  }
.steps-desktop { display: grid; }
  .steps-mobile  { display: none; }

  /* Switch at your preferred breakpoint */
  @media (max-width: 900px){
    .steps-desktop { display: none !important; }
    .steps-mobile  { display: grid !important; }
  }

  /* Optional: reduce hover lift on touch devices */
  @media (hover: none){
    .step-card:hover{ transform:none !important; box-shadow:none !important; }
  }
  /* submit button */
  .submit-btn {
    width:100%;padding:18px;border-radius:16px;border:none;cursor:pointer;
    background:linear-gradient(135deg,var(--gold-m),var(--gold));
    color:#020b06;font-family:'Cinzel',serif;font-weight:700;font-size:13px;
    letter-spacing:.12em;text-transform:uppercase;
    box-shadow:0 8px 32px rgba(201,151,58,.4),inset 0 1px 0 rgba(255,255,255,.25);
    transition:transform .25s, box-shadow .25s;
    display:flex;align-items:center;justify-content:center;gap:10px;
  }
  .submit-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 12px 40px rgba(201,151,58,.5);}
  .submit-btn:disabled{opacity:.6;cursor:not-allowed;}

  /* why card */
  .why-card {
    background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);
    border-radius:20px;padding:28px 24px;
    transition:transform .35s ease,box-shadow .35s ease, border-color .35s ease;
    position:relative;overflow:hidden;
  }
  .why-card:hover{transform:translateY(-6px);box-shadow:0 24px 48px rgba(0,0,0,.4);}

  /* success icon pop */
  .success-icon { animation:checkPop .5s cubic-bezier(.16,1,.3,1) both; }

  /* online pulse */
  .online-pulse::after {
    content:'';position:absolute;inset:0;border-radius:50%;
    background:var(--em-lt);
    animation:pulse2 2s ease-out infinite;
  }

  /* Responsive helpers */
  .container { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  .wrap { padding-left: 24px; padding-right: 24px; }

  @media (max-width: 1100px){
    .form-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
  }
  @media (max-width: 980px){
    .testi-grid { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 720px){
    .testi-grid { grid-template-columns: 1fr !important; }
    .hero-pills { gap: 10px !important; margin-bottom: 34px !important; }
    .hero-stats { gap: 22px !important; }
  }
  @media (max-width: 640px){
    .hero-sec { padding: 92px 16px 74px !important; }
    .sec-pad { padding: 64px 16px 76px !important; }
    .form-pad { padding: 64px 16px 96px !important; }
    .form-inner { padding: 24px 18px 26px !important; }
    .form-head { padding: 18px 18px !important; }
    .field-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
  }
  @media (max-width: 420px){
    .hero-stats { gap: 16px !important; }
    .pill { padding: 8px 12px !important; }
  }

  /* Reduce hover lift on touch devices */
  @media (hover: none){
    .why-card:hover{ transform:none !important; }
    .submit-btn:hover:not(:disabled){ transform:none !important; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const whyTrial = [
  {
    icon: Award,
    color: "#c9973a",
    title: "Al-Azhar Certified Tutors",
    desc: "Every tutor holds an Ijazah from Al-Azhar — the world's most prestigious Islamic institution.",
    anim: "icon-wiggle",
  },
  {
    icon: Video,
    color: "#2fcf87",
    title: "HD 1-on-1 Live Sessions",
    desc: "Crystal-clear video with a digital whiteboard, screen sharing, and real-time Tajweed feedback.",
    anim: "icon-float",
  },
  {
    icon: Clock,
    color: "#7eb8ff",
    title: "Completely Free, No Card",
    desc: "30 minutes, completely free. No credit card, no contract, no obligation to continue.",
    anim: "icon-spin",
  },
  {
    icon: Globe,
    color: "#ff8fa3",
    title: "Learn in Your Language",
    desc: "Arabic, English, Urdu, French and 15+ more. Your tutor speaks your language.",
    anim: "icon-float",
  },
  {
    icon: Shield,
    color: "#b58cff",
    title: "30-Day Money-Back Guarantee",
    desc: "If you subscribe and aren't satisfied within 30 days, we refund every penny — no questions.",
    anim: "icon-spin",
  },
  {
    icon: UserCheck,
    color: "#ffd166",
    title: "Personalised Tutor Matching",
    desc: "We match you based on age, level, gender preference, and language for the best fit.",
    anim: "icon-wiggle",
  },
];

const steps = [
  {
    number: "01",
    title: "Fill the Form",
    desc: "Takes under 2 minutes. Tell us your goals, schedule, and preferences.",
    accent: "#c9973a",
  },
  {
    number: "02",
    title: "We Match Your Tutor",
    desc: "Our team handpicks the best certified scholar for you within 24 hours.",
    accent: "#2fcf87",
  },
  {
    number: "03",
    title: "Confirm Your Slot",
    desc: "You'll receive a confirmation with your tutor's profile and session link.",
    accent: "#7eb8ff",
  },
  {
    number: "04",
    title: "Attend Free Trial",
    desc: "30 minutes of live 1-on-1 learning — with zero obligation to continue.",
    accent: "#ff8fa3",
  },
];

const testimonials = [
  {
    name: "Aisha M.",
    loc: "United Kingdom",
    stars: 5,
    text: "I was nervous at first, but the free trial made it so easy. My tutor was warm, patient, and incredibly knowledgeable.",
  },
  {
    name: "Omar K.",
    loc: "Canada",
    stars: 5,
    text: "Booked in 2 minutes, got matched the same day, and had my trial the next morning. Absolutely seamless.",
  },
  {
    name: "Sara H.",
    loc: "Australia",
    stars: 5,
    text: "My 7-year-old loved it instantly. The tutor kept her engaged the whole 30 minutes. We signed up immediately after.",
  },
];

const courses = [
  "Noorani Qaida",
  "Quran Recitation",
  "Quran Tajweed",
  "Quran Memorization (Hifz)",
  "Arabic Language",
  "Islamic Studies",
];
const ageGroups = [
  "Under 7",
  "7–12 years",
  "13–17 years",
  "18–25 years",
  "26+ years",
];
const timeSlots = [
  "Early Morning (5–8 AM)",
  "Morning (8–12 PM)",
  "Afternoon (12–4 PM)",
  "Evening (4–8 PM)",
  "Night (8–11 PM)",
  "Flexible / Any Time",
];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
// FIELD WRAPPER  (icon + input)
// ─────────────────────────────────────────────────────────────────────────────
const Field = ({
  icon: Icon,
  color = "rgba(255,255,255,.25)",
  children,
}: {
  icon: React.ElementType;
  color?: string;
  children: React.ReactNode;
}) => (
  <div style={{ position: "relative" }}>
    <Icon
      size={16}
      className="icon-soft"
      style={{
        position: "absolute",
        left: 15,
        top: "50%",
        transform: "translateY(-50%)",
        color,
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.9,
      }}
    />
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SUCCESS STATE
// ─────────────────────────────────────────────────────────────────────────────
const SuccessScreen = () => (
  <div
    style={{
      fontFamily: "'Nunito',sans-serif",
      background: "var(--deep)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
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
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background:
          "radial-gradient(circle,rgba(47,207,135,.08) 0%,transparent 70%)",
        pointerEvents: "none",
      }}
    />

    <div
      style={{
        textAlign: "center",
        position: "relative",
        zIndex: 1,
        maxWidth: 520,
      }}
    >
      <div
        className="success-icon"
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          margin: "0 auto 32px",
          background:
            "linear-gradient(135deg,rgba(47,207,135,.2),rgba(47,207,135,.08))",
          border: "2px solid rgba(47,207,135,.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 60px rgba(47,207,135,.2)",
        }}
      >
        <CheckCircle2 size={48} color="#2fcf87" strokeWidth={1.5} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          marginBottom: 16,
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
        <span className="sec-label">Request Confirmed</span>
        <div
          style={{
            height: 1,
            width: 40,
            background:
              "linear-gradient(90deg,rgba(201,151,58,.6),transparent)",
          }}
        />
      </div>

      <h1
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(36px,5vw,56px)",
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1.1,
          marginBottom: 20,
        }}
      >
        Your Trial is <br />
        <span className="gold-text">Booked!</span>
      </h1>

      <p
        style={{
          color: "rgba(255,255,255,.45)",
          fontSize: 16,
          lineHeight: 1.85,
          marginBottom: 36,
        }}
      >
        We've received your request and will match you with a certified tutor
        within <strong style={{ color: "var(--gold-m)" }}>24 hours</strong>.
        Check your email for confirmation details.
      </p>

      <div
        style={{
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(255,255,255,.07)",
          borderRadius: 20,
          padding: "24px 28px",
          marginBottom: 36,
          textAlign: "left",
        }}
      >
        {[
          { step: "1", text: "Check your email for a confirmation message" },
          { step: "2", text: "Our team will contact you to confirm your slot" },
          { step: "3", text: "Receive your tutor profile and video link" },
          { step: "4", text: "Attend your free 30-minute trial session" },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              marginBottom: i < 3 ? 14 : 0,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                flexShrink: 0,
                background: "rgba(201,151,58,.15)",
                border: "1px solid rgba(201,151,58,.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Cinzel',serif",
                fontSize: 9,
                fontWeight: 700,
                color: "var(--gold)",
              }}
            >
              {s.step}
            </div>
            <p
              style={{
                color: "rgba(255,255,255,.55)",
                fontSize: 14,
                lineHeight: 1.5,
                paddingTop: 2,
              }}
            >
              {s.text}
            </p>
          </div>
        ))}
      </div>

      <Link
        to="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: "linear-gradient(135deg,var(--gold-m),var(--gold))",
          color: "#020b06",
          padding: "16px 40px",
          borderRadius: 14,
          fontFamily: "'Cinzel',serif",
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: ".1em",
          textDecoration: "none",
          boxShadow: "0 6px 24px rgba(201,151,58,.4)",
        }}
      >
        Return to Home <ArrowRight size={14} />
      </Link>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
const BookTrial: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const whyReveal = useReveal();
  const stepsReveal = useReveal();
  const testiReveal = useReveal();
  const formReveal = useReveal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);

    const data = {
      type: "trial" as const,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      country: formData.get("country") as string,
      ageGroup: formData.get("ageGroup") as string,
      courseInterest: formData.get("courseInterest") as string,
      preferredDays: formData.getAll("days") as string[],
      preferredTime: formData.get("time") as string,
      teacherPreference: formData.get("teacherPreference") as
        | "Male"
        | "Female"
        | "Any",
      message: formData.get("notes") as string,
    };

    const result = await submitLead(data);
    setLoading(false);
    if (result.success) setSubmitted(true);
    else setError(result.message);
  };

  if (submitted)
    return (
      <>
        <style>{pageStyles}</style>
        <SuccessScreen />
      </>
    );

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
        {/* ══════════════════════════════ HERO */}
        <section
          className="hero-sec"
          style={{
            background:
              "radial-gradient(ellipse 130% 80% at 20% 0%,#0d4a2a 0%,transparent 55%),radial-gradient(ellipse 80% 100% at 85% 100%,#062418 0%,transparent 50%),#020b06",
            padding: "110px 24px 90px",
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
              fontSize: "clamp(130px,16vw,260px)",
              color: "rgba(255,255,255,.016)",
              fontWeight: 700,
              userSelect: "none",
              pointerEvents: "none",
              lineHeight: 1,
            }}
          >
            تجربة
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
                gap: 14,
                marginBottom: 20,
                flexWrap: "wrap",
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
              <span className="sec-label">Free Trial Session</span>
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
              Book Your
              <br />
              <span className="gold-shimmer" style={{ fontWeight: 700 }}>
                Free Trial
              </span>
            </h1>

            <p
              className="h3"
              style={{
                color: "rgba(255,255,255,.45)",
                fontSize: 18,
                lineHeight: 1.85,
                maxWidth: 560,
                margin: "0 auto 36px",
              }}
            >
              30 minutes of live, 1-on-1 Quranic learning with a certified
              Al-Azhar scholar — completely free, no credit card, no commitment.
            </p>

            {/* trust pills (with Lucide animations) */}
            <div
              className="h4 hero-pills"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 44,
              }}
            >
              {[
                {
                  icon: Shield,
                  label: "No Credit Card",
                  color: "#2fcf87",
                  anim: "icon-wiggle",
                },
                {
                  icon: Clock,
                  label: "30 Min Session",
                  color: "#c9973a",
                  anim: "icon-spin",
                },
                {
                  icon: Award,
                  label: "Certified Tutors",
                  color: "#7eb8ff",
                  anim: "icon-float",
                },
                {
                  icon: Zap,
                  label: "Matched in 24h",
                  color: "#ff8fa3",
                  anim: "icon-wiggle",
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="hover-icon pill"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "9px 16px",
                    borderRadius: 100,
                    background: `${p.color}12`,
                    border: `1px solid ${p.color}30`,
                    color: p.color,
                  }}
                >
                  <p.icon size={13} className={`${p.anim} icon-soft`} />
                  <span
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: ".14em",
                    }}
                  >
                    {p.label}
                  </span>
                </div>
              ))}
            </div>

            {/* stats */}
            <div
              className="h5 hero-stats"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 40,
                flexWrap: "wrap",
              }}
            >
              {[
                { value: "15K+", label: "Students Taught" },
                { value: "4.9★", label: "Average Rating" },
                { value: "50+", label: "Countries Served" },
                { value: "24/7", label: "Availability" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
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
                      fontSize: 11,
                      letterSpacing: ".08em",
                      marginTop: 4,
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════ WHY CHOOSE US */}
        <section
          className="sec-pad"
          style={{
            background:
              "linear-gradient(180deg,var(--forest) 0%,var(--deep) 100%)",
            padding: "80px 24px 100px",
            position: "relative",
          }}
        >
          <div
            className="hex-bg"
            style={{ position: "absolute", inset: 0, opacity: 0.4 }}
          />
          <div
            ref={whyReveal.ref}
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              opacity: whyReveal.vis ? 1 : 0,
              transform: whyReveal.vis ? "translateY(0)" : "translateY(32px)",
              transition: "opacity .7s ease, transform .7s ease",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 14,
                  marginBottom: 16,
                  flexWrap: "wrap",
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
                <span className="sec-label">Why Choose Us</span>
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
                  fontSize: "clamp(28px,4vw,52px)",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                What You Get with Your{" "}
                <span className="gold-text">Free Trial</span>
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "clamp(16px, 4vw, 24px)",
              }}
            >
              {whyTrial.map((w, i) => (
                <div
                  key={i}
                  className="why-card shb hover-icon"
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.boxShadow =
                      `0 24px 56px rgba(0,0,0,.4),0 0 0 1px ${w.color}28`)
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
                      background: `linear-gradient(90deg,transparent,${w.color},transparent)`,
                    }}
                  />
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      background: `${w.color}18`,
                      border: `1px solid ${w.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 18,
                      color: w.color,
                      boxShadow: `0 0 20px ${w.color}18`,
                    }}
                  >
                    <w.icon size={22} className={`${w.anim} icon-soft`} />
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
                    {w.title}
                  </h4>
                  <p
                    style={{
                      color: "rgba(255,255,255,.4)",
                      fontSize: 13,
                      lineHeight: 1.75,
                    }}
                  >
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════ HOW IT WORKS — 4 steps */}
        <section
          className="sec-pad"
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
            ref={stepsReveal.ref}
            style={{
              maxWidth: 900,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              opacity: stepsReveal.vis ? 1 : 0,
              transform: stepsReveal.vis ? "translateY(0)" : "translateY(32px)",
              transition: "opacity .7s ease, transform .7s ease",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p
                className="sec-label"
                style={{ marginBottom: 14, display: "block" }}
              >
                Simple Process
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(26px,3.5vw,48px)",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                 Form to <span className="gold-text">First Class</span> in 4
                Steps
              </h2>
            </div>

   
<>
  {/* ───────── DESKTOP / LARGE DEVICES (timeline) ───────── */}
  <div
    className="steps-desktop"
    style={{
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: "clamp(10px, 3vw, 16px)",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 22,
        left: "12.5%",
        right: "12.5%",
        height: 2,
        background: "linear-gradient(90deg,var(--gold)40,var(--gold)40)",
        zIndex: 0,
      }}
    />

    {steps.map((s, i) => (
      <div
        key={i}
        style={{
          textAlign: "center",
          padding: "0 10px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            margin: "0 auto 20px",
            background: `linear-gradient(135deg,${s.accent}cc,${s.accent}88)`,
            border: `2px solid ${s.accent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Cinzel',serif",
            fontSize: 13,
            fontWeight: 700,
            color: "#020b06",
            boxShadow: `0 4px 20px ${s.accent}40`,
          }}
        >
          {s.number}
        </div>
        <h4
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 17,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 8,
          }}
        >
          {s.title}
        </h4>
        <p
          style={{
            color: "rgba(255,255,255,.38)",
            fontSize: 12,
            lineHeight: 1.7,
          }}
        >
          {s.desc}
        </p>
      </div>
    ))}
  </div>

  {/* ───────── MOBILE / SMALL DEVICES (cards) ───────── */}
  <div
    className="steps-mobile"
    style={{
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "clamp(12px, 3vw, 18px)",
    }}
  >
    {steps.map((s, i) => (
      <div
        key={i}
        className="step-card shb"
        style={{
          border: `1px solid ${s.accent}22`,
          background: "rgba(255,255,255,.025)",
          borderRadius: 22,
          padding: "22px 18px",
          position: "relative",
          overflow: "hidden",
          transition:
            "transform .35s ease, box-shadow .35s ease, border-color .35s ease",
          animation: "fadeUp .7s cubic-bezier(.16,1,.3,1) both",
          animationDelay: `${i * 0.06}s`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
          (e.currentTarget as HTMLElement).style.boxShadow = `0 26px 54px rgba(0,0,0,.45), 0 0 0 1px ${s.accent}30`;
          (e.currentTarget as HTMLElement).style.borderColor = `${s.accent}55`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "";
          (e.currentTarget as HTMLElement).style.boxShadow = "";
          (e.currentTarget as HTMLElement).style.borderColor = `${s.accent}22`;
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg,transparent,${s.accent},transparent)`,
            opacity: 0.85,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: -80,
            right: -70,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: `radial-gradient(circle,${s.accent}22 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 16,
              background: `${s.accent}18`,
              border: `1px solid ${s.accent}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 18px ${s.accent}18`,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: `linear-gradient(135deg,${s.accent}cc,${s.accent}88)`,
                border: `2px solid ${s.accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Cinzel',serif",
                fontSize: 11,
                fontWeight: 800,
                color: "#020b06",
                boxShadow: `0 4px 18px ${s.accent}40`,
              }}
            >
              {s.number}
            </div>
          </div>

          <div
            style={{
              padding: "7px 12px",
              borderRadius: 999,
              background: `${s.accent}12`,
              border: `1px solid ${s.accent}26`,
              color: s.accent,
              fontFamily: "'Cinzel',serif",
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Step {i + 1}
          </div>
        </div>

        <h4
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 18,
            fontWeight: 800,
            color: "#fff",
            marginBottom: 10,
            lineHeight: 1.2,
          }}
        >
          {s.title}
        </h4>

        <p
          style={{
            color: "rgba(255,255,255,.42)",
            fontSize: 13,
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {s.desc}
        </p>

        <div
          style={{
            marginTop: 18,
            height: 1,
            background: `linear-gradient(90deg,transparent,${s.accent}55,transparent)`,
            opacity: 0.55,
          }}
        />
      </div>
    ))}
  </div>
</>

          </div>
        </section>

        {/* ══════════════════════════════ TESTIMONIALS */}
        <section
          className="sec-pad"
          style={{
            background:
              "linear-gradient(180deg,var(--deep) 0%,var(--forest) 100%)",
            padding: "72px 24px",
            position: "relative",
          }}
        >
          <div
            ref={testiReveal.ref}
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              opacity: testiReveal.vis ? 1 : 0,
              transform: testiReveal.vis ? "translateY(0)" : "translateY(32px)",
              transition: "opacity .7s ease, transform .7s ease",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <p
                className="sec-label"
                style={{ marginBottom: 14, display: "block" }}
              >
                Real Experiences
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(24px,3.2vw,44px)",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                What Students Say About Their{" "}
                <span className="gold-text">Free Trial</span>
              </h2>
            </div>

            <div
              className="testi-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 20,
              }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="why-card shb"
                  style={{
                    background: "rgba(255,255,255,.025)",
                    border: "1px solid rgba(255,255,255,.06)",
                  }}
                >
                  <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
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
                      fontStyle: "italic",
                      fontSize: 16,
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
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: "var(--gold)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 16,
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
                        {t.loc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════ FORM */}
        <section
          className="form-pad"
          style={{
            background: "var(--forest)",
            padding: "80px 24px 120px",
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
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(201,151,58,.05) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            ref={formReveal.ref}
            className="form-grid"
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1.6fr",
              gap: 56,
              alignItems: "start",
              opacity: formReveal.vis ? 1 : 0,
              transform: formReveal.vis ? "translateY(0)" : "translateY(32px)",
              transition: "opacity .7s ease, transform .7s ease",
            }}
          >
            {/* LEFT SIDEBAR */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    height: 1,
                    width: 32,
                    background:
                      "linear-gradient(90deg,transparent,rgba(201,151,58,.6))",
                  }}
                />
                <span className="sec-label">Registration</span>
              </div>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(28px,3.5vw,48px)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.1,
                  marginBottom: 20,
                }}
              >
                Book Your
                <br />
                <span className="gold-text">Free Trial</span>
              </h2>

              <p
                style={{
                  color: "rgba(255,255,255,.4)",
                  fontSize: 15,
                  lineHeight: 1.8,
                  marginBottom: 32,
                }}
              >
                Fill in the form and we'll match you with the perfect certified
                scholar within 24 hours.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginBottom: 36,
                }}
              >
                {[
                  "No credit card required",
                  "Free 30-minute live session",
                  "Certified Al-Azhar tutor",
                  "Matched to your preferences",
                  "No obligation to continue",
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: "rgba(201,151,58,.15)",
                        border: "1px solid rgba(201,151,58,.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CheckCircle size={12} color="var(--gold)" />
                    </div>
                    <span
                      style={{
                        color: "rgba(255,255,255,.6)",
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 18px",
                  background: "rgba(47,207,135,.08)",
                  border: "1px solid rgba(47,207,135,.2)",
                  borderRadius: 14,
                }}
              >
                <div style={{ position: "relative", width: 10, height: 10 }}>
                  <div
                    className="online-pulse"
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#2fcf87",
                      position: "relative",
                    }}
                  />
                </div>
                <span
                  style={{
                    color: "#2fcf87",
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "'Cinzel',serif",
                    letterSpacing: ".1em",
                  }}
                >
                  TUTORS AVAILABLE NOW
                </span>
              </div>
            </div>

            {/* FORM CARD */}
            <div
              className="shb"
              style={{
                background: "rgba(255,255,255,.025)",
                border: "1px solid rgba(201,151,58,.2)",
                borderRadius: 28,
                overflow: "hidden",
                boxShadow: "0 32px 80px rgba(0,0,0,.5)",
              }}
            >
              <div
                className="form-head"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(201,151,58,.18),rgba(201,151,58,.06))",
                  borderBottom: "1px solid rgba(201,151,58,.2)",
                  padding: "24px 32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <p className="sec-label" style={{ marginBottom: 4 }}>
                    Step 1 of 1
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    Trial Registration Form
                  </h3>
                </div>

                <div
                  className="hover-icon"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(47,207,135,.12)",
                    border: "1px solid rgba(47,207,135,.25)",
                    borderRadius: 100,
                    padding: "6px 14px",
                  }}
                >
                  <Sparkles
                    size={14}
                    className="icon-wiggle icon-soft"
                    color="#2fcf87"
                  />
                  <span
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: 8,
                      fontWeight: 700,
                      color: "#2fcf87",
                      letterSpacing: ".14em",
                    }}
                  >
                    FREE
                  </span>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="form-inner"
                style={{ padding: "32px 32px 36px" }}
              >
                <span className="f-section-label">Personal Information</span>

                <div
                  className="field-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                    marginBottom: 14,
                  }}
                >
                  <Field icon={User}>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Full Name"
                      className="f-input"
                    />
                  </Field>
                  <Field icon={Mail}>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      className="f-input"
                    />
                  </Field>
                  <Field icon={Phone}>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="WhatsApp Number"
                      className="f-input"
                    />
                  </Field>
                  <Field icon={Globe}>
                    <input
                      required
                      name="country"
                      type="text"
                      placeholder="Country"
                      className="f-input"
                    />
                  </Field>
                </div>

                <div
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(90deg,transparent,rgba(201,151,58,.2),transparent)",
                    margin: "24px 0",
                  }}
                />

                <span className="f-section-label">
                  Course & Student Details
                </span>

                <div
                  className="field-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                    marginBottom: 24,
                  }}
                >
                  <div>
                    <select required name="courseInterest" className="f-select">
                      <option value="">Select Course</option>
                      {courses.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select required name="ageGroup" className="f-select">
                      <option value="">Age Group</option>
                      {ageGroups.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(90deg,transparent,rgba(201,151,58,.2),transparent)",
                    margin: "0 0 24px",
                  }}
                />

                <span className="f-section-label">Preferred Schedule</span>

                <div style={{ marginBottom: 20 }}>
                  <p
                    style={{
                      color: "rgba(255,255,255,.35)",
                      fontSize: 12,
                      marginBottom: 12,
                    }}
                  >
                    Select preferred day(s)
                  </p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {days.map((d) => (
                      <div key={d} className="day-pill">
                        <input
                          type="checkbox"
                          name="days"
                          value={d}
                          id={`day-${d}`}
                        />
                        <label htmlFor={`day-${d}`}>{d}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <select name="time" className="f-select">
                    <option value="">Preferred Time Slot</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(90deg,transparent,rgba(201,151,58,.2),transparent)",
                    margin: "0 0 24px",
                  }}
                />

                <span className="f-section-label">Teacher Preference</span>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 24,
                    flexWrap: "wrap",
                  }}
                >
                  {["Male", "Female", "Any"].map((p, i) => (
                    <div key={p} className="pref-pill">
                      <input
                        type="radio"
                        name="teacherPreference"
                        value={p}
                        id={`pref-${p}`}
                        defaultChecked={i === 2}
                      />
                      <label htmlFor={`pref-${p}`}>
                        <User size={11} className="icon-soft" />
                        {p} Teacher
                      </label>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(90deg,transparent,rgba(201,151,58,.2),transparent)",
                    margin: "0 0 24px",
                  }}
                />

                <span className="f-section-label">
                  Additional Notes (Optional)
                </span>

                <div style={{ marginBottom: 28 }}>
                  <textarea
                    name="notes"
                    placeholder="Tell us anything else — current level, specific goals, accessibility needs..."
                    rows={3}
                    className="f-input-bare"
                    style={{ resize: "vertical", minHeight: 90 }}
                  />
                </div>

                {error && (
                  <div
                    style={{
                      background: "rgba(255,100,100,.1)",
                      border: "1px solid rgba(255,100,100,.25)",
                      borderRadius: 12,
                      padding: "12px 16px",
                      marginBottom: 20,
                      color: "#ff8f8f",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        style={{ animation: "spin 1s linear infinite" }}
                      />{" "}
                      Processing...
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: 14 }}>✦</span> Submit Trial
                      Request <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p
                  style={{
                    textAlign: "center",
                    color: "rgba(255,255,255,.2)",
                    fontSize: 11,
                    marginTop: 16,
                    lineHeight: 1.6,
                  }}
                >
                  By submitting, you agree to our Terms of Service. We'll never
                  share your details with third parties.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════ BOTTOM CTA */}
        <section
          style={{
            background:
              "radial-gradient(ellipse 120% 80% at 50% 50%,#0d4a2a 0%,#020b06 70%)",
            padding: "80px 24px",
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
              width: 500,
              height: 500,
              borderRadius: "50%",
              border: "1px dashed rgba(201,151,58,.1)",
              animation: "rotateSlow 50s linear infinite",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              width: 140,
              height: 1,
              margin: "0 auto 40px",
              background:
                "linear-gradient(90deg,transparent,var(--gold),transparent)",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                color: "rgba(255,255,255,.3)",
                fontSize: 14,
                marginBottom: 12,
              }}
            >
              Have questions first?
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
                to="/pricing"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.1)",
                  color: "rgba(255,255,255,.6)",
                  padding: "13px 28px",
                  borderRadius: 14,
                  fontFamily: "'Cinzel',serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: ".1em",
                  textDecoration: "none",
                }}
              >
                View Pricing
              </Link>

              <Link
                to="/faq"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.1)",
                  color: "rgba(255,255,255,.6)",
                  padding: "13px 28px",
                  borderRadius: 14,
                  fontFamily: "'Cinzel',serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: ".1em",
                  textDecoration: "none",
                }}
              >
                Browse FAQ
              </Link>

              <Link
                to="/contact"
                className="hover-icon"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background:
                    "linear-gradient(135deg,var(--gold-m),var(--gold))",
                  color: "#020b06",
                  padding: "13px 28px",
                  borderRadius: 14,
                  fontFamily: "'Cinzel',serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: ".1em",
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(201,151,58,.35)",
                }}
              >
                Contact Us <ArrowRight size={12} className="icon-soft" />
              </Link>
            </div>
          </div>

          <div
            style={{
              width: 140,
              height: 1,
              margin: "40px auto 0",
              background:
                "linear-gradient(90deg,transparent,var(--gold),transparent)",
            }}
          />
        </section>
      </div>
    </>
  );
};

export default BookTrial;
