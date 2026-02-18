import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { TUTORS } from "../data";
import {
  Search,
  Star,
  Users,
  Award,
  BookOpen,
  Globe,
  Clock,
  ArrowRight,
  CheckCircle,
  Play,
  Mic2,
  BookMarked,
  Languages,
  Heart,
  Shield,
  Sparkles,
  ChevronRight,
  GraduationCap,
  MessageCircle,
  Video,
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
  }

  .hex-bg {
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='.3' opacity='.055' d='M40 4L76 24L76 56L40 76L4 56L4 24Z'/%3E%3C/svg%3E");
  }
  .diamond-bg {
    background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 2L58 30L30 58L2 30Z' fill='none' stroke='%23c9973a' stroke-width='.4' opacity='.08'/%3E%3C/svg%3E");
  }

  /* animations */
  @keyframes fadeUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimText { 0%{background-position:-500px 0} 100%{background-position:500px 0} }
  @keyframes glowPulse{ 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:.75;transform:scale(1.06)} }
  @keyframes rotateCW { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes rotateCCW{ from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes dotOrbit { from{transform:rotate(0deg) translateX(38px) rotate(0deg)} to{transform:rotate(360deg) translateX(38px) rotate(-360deg)} }
  @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes popIn    { 0%{transform:scale(.85) translateY(10px);opacity:0} 100%{transform:scale(1) translateY(0);opacity:1} }
  @keyframes shimBar  { 0%{left:-100%} 100%{left:200%} }
  @keyframes cardIn   { from{opacity:0;transform:translateY(28px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes borderSpin{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes pulse2   { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.5);opacity:0} }

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

  .sec-label{font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--gold)}

  /* filter pill */
  .f-pill {
    display:inline-flex;align-items:center;gap:7px;
    padding:8px 18px;border-radius:100px;
    font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.16em;
    text-transform:uppercase;cursor:pointer;
    border:1px solid rgba(255,255,255,.07);
    color:rgba(255,255,255,.42);background:rgba(255,255,255,.03);
    transition:all .25s;white-space:nowrap;
  }
  .f-pill:hover{color:var(--gold-lt);border-color:rgba(201,151,58,.25);background:rgba(201,151,58,.05);}
  .f-pill-active{
    background:linear-gradient(135deg,rgba(201,151,58,.2),rgba(201,151,58,.08))!important;
    border-color:rgba(201,151,58,.5)!important;color:var(--gold-lt)!important;
    box-shadow:0 4px 16px rgba(201,151,58,.15)!important;
  }

  /* search */
  .srch{
    background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);
    border-radius:14px;padding:11px 16px 11px 44px;
    color:#fff;font-family:'Nunito',sans-serif;font-size:14px;
    outline:none;width:260px;transition:all .3s;
  }
  .srch::placeholder{color:rgba(255,255,255,.22);}
  .srch:focus{border-color:rgba(201,151,58,.4);background:rgba(255,255,255,.06);width:300px;}

  /* tutor card */
  .t-card{
    animation:cardIn .6s cubic-bezier(.16,1,.3,1) both;
    transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s ease;
    will-change:transform;
    position:relative;
    cursor:pointer;
  }
  .t-card:hover{
    transform:translateY(-14px) scale(1.02);
    box-shadow:0 50px 100px rgba(0,0,0,.5),0 0 0 1px rgba(201,151,58,.28)!important;
  }
  .t-card:hover .t-img{transform:scale(1.07);}
  .t-img{transition:transform .7s ease;}
  .t-card:hover .t-overlay{opacity:1!important;}
  .t-card:hover .t-cta{
    background:linear-gradient(135deg,var(--gold-m),var(--gold))!important;
    color:var(--deep)!important;border-color:transparent!important;
  }

  /* avatar halo spin */
  .avatar-halo{position:relative;display:inline-block;}
  .avatar-halo::before{
    content:'';position:absolute;inset:-4px;border-radius:50%;
    background:conic-gradient(var(--gold) 0deg,var(--em-lt) 120deg,var(--gold-m) 240deg,var(--gold) 360deg);
    animation:borderSpin 6s linear infinite;z-index:-1;
  }

  /* online pulse dot */
  .online-dot::after{
    content:'';position:absolute;inset:0;border-radius:50%;
    background:var(--em-lt);
    animation:pulse2 2s ease-out infinite;
  }

  /* featured card shimmer */
  .shim-bar{position:relative;overflow:hidden;}
  .shim-bar::after{
    content:'';position:absolute;inset:0;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);
    animation:shimBar 3s ease-in-out infinite;
  }

  /* badge pill */
  .badge{
    display:inline-flex;align-items:center;gap:5px;
    padding:3px 10px;border-radius:100px;
    font-family:'Cinzel',serif;font-size:8px;font-weight:700;letter-spacing:.14em;
    text-transform:uppercase;
  }

  /* trust stat row */
  .trust-item{display:flex;flex-direction:column;align-items:center;gap:4px;}

  @keyframes rotateSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

  /* view toggle */
  .v-btn{
    width:38px;height:38px;border-radius:10px;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    border:1px solid rgba(255,255,255,.08);
    background:rgba(255,255,255,.03);color:rgba(255,255,255,.35);
    transition:all .25s;
  }
  .v-btn-active{background:rgba(201,151,58,.12)!important;border-color:rgba(201,151,58,.3)!important;color:var(--gold-lt)!important;}
  .v-btn:hover{color:var(--gold-lt);border-color:rgba(201,151,58,.2);}

  /* list view */
  .t-list-card{
    animation:cardIn .5s cubic-bezier(.16,1,.3,1) both;
    transition:transform .35s ease,box-shadow .35s ease;
  }
  .t-list-card:hover{
    transform:translateX(6px);
    box-shadow:0 16px 48px rgba(0,0,0,.35),0 0 0 1px rgba(201,151,58,.2)!important;
  }
  .t-list-card:hover .t-list-cta{background:linear-gradient(135deg,var(--gold-m),var(--gold))!important;color:var(--deep)!important;border-color:transparent!important;}
`;

// ── Fallback tutor data ───────────────────────────────────────────────────────
const TUTOR_FB = [
  {
    id: 1,
    name: "Sheikh Ahmed Al-Rashid",
    gender: "Male",
    specialties: ["Tajweed", "Quran Recitation"],
    badges: ["Al-Azhar Graduate", "Ijazah Holder"],
    rating: 4.9,
    reviewCount: 312,
    experienceYears: 12,
    students: 340,
    photoUrl: "https://picsum.photos/seed/t101/300/300",
    bio: "Certified Ijazah holder with 12 years of online teaching experience. Specializes in perfecting Tajweed for all levels.",
    languages: ["Arabic", "English"],
    availability: "Flexible",
    verified: true,
    color: "#c9973a",
  },
  {
    id: 2,
    name: "Ustadha Fatima Hassan",
    gender: "Female",
    specialties: ["Quran Memorization", "Hifz"],
    badges: ["Hafiza", "Kids Specialist"],
    rating: 4.8,
    reviewCount: 198,
    experienceYears: 8,
    students: 210,
    photoUrl: "https://picsum.photos/seed/t202/300/300",
    bio: "Dedicated Hafiza with a passion for helping students memorize the Quran using proven revision techniques.",
    languages: ["Arabic", "English", "Urdu"],
    availability: "Mornings",
    verified: true,
    color: "#2fcf87",
  },
  {
    id: 3,
    name: "Sheikh Omar Abdullah",
    gender: "Male",
    specialties: ["Arabic Language", "Grammar"],
    badges: ["Al-Azhar Graduate", "Native Speaker"],
    rating: 5.0,
    reviewCount: 427,
    experienceYears: 15,
    students: 480,
    photoUrl: "https://picsum.photos/seed/t303/300/300",
    bio: "Native Arabic speaker and Al-Azhar scholar bringing Classical Arabic to life for students worldwide.",
    languages: ["Arabic", "English", "French"],
    availability: "Evenings",
    verified: true,
    color: "#7eb8ff",
  },
  {
    id: 4,
    name: "Ustadha Maryam Yusuf",
    gender: "Female",
    specialties: ["Kids Quran", "Noorani Qaida"],
    badges: ["Kids Specialist", "Tajweed Cert"],
    rating: 4.9,
    reviewCount: 156,
    experienceYears: 6,
    students: 175,
    photoUrl: "https://picsum.photos/seed/t404/300/300",
    bio: "Experienced in teaching young children Quran with fun and interactive methods that build a lifelong love for learning.",
    languages: ["Arabic", "English"],
    availability: "All day",
    verified: true,
    color: "#ff8fa3",
  },
  {
    id: 5,
    name: "Sheikh Bilal Karimi",
    gender: "Male",
    specialties: ["Tajweed", "Islamic Studies"],
    badges: ["Ijazah Holder", "Hifz Master"],
    rating: 4.7,
    reviewCount: 89,
    experienceYears: 9,
    students: 130,
    photoUrl: "https://picsum.photos/seed/t505/300/300",
    bio: "Combines rigorous Tajweed training with Islamic studies, offering a holistic approach to Quranic education.",
    languages: ["Arabic", "English", "Pashto"],
    availability: "Flexible",
    verified: false,
    color: "#b58cff",
  },
  {
    id: 6,
    name: "Ustadha Zainab Malik",
    gender: "Female",
    specialties: ["Hifz", "Quran Recitation"],
    badges: ["Hafiza", "Kids Specialist"],
    rating: 4.8,
    reviewCount: 203,
    experienceYears: 7,
    students: 220,
    photoUrl: "https://picsum.photos/seed/t606/300/300",
    bio: "Passionate about helping female students and children memorize the Quran in a comfortable, supportive environment.",
    languages: ["Arabic", "English", "Urdu"],
    availability: "Afternoons",
    verified: true,
    color: "#ffd166",
  },
  {
    id: 7,
    name: "Sheikh Hassan Nouri",
    gender: "Male",
    specialties: ["Arabic Language", "Tajweed"],
    badges: ["Al-Azhar Graduate", "Native Speaker"],
    rating: 4.9,
    reviewCount: 267,
    experienceYears: 11,
    students: 310,
    photoUrl: "https://picsum.photos/seed/t707/300/300",
    bio: "Al-Azhar graduate specialising in both Arabic linguistics and Tajweed, helping students bridge the two disciplines.",
    languages: ["Arabic", "English"],
    availability: "Flexible",
    verified: true,
    color: "#2fcf87",
  },
  {
    id: 8,
    name: "Ustadha Aisha Rahman",
    gender: "Female",
    specialties: ["Quran Memorization", "Arabic"],
    badges: ["Hafiza", "Al-Azhar Graduate"],
    rating: 5.0,
    reviewCount: 341,
    experienceYears: 10,
    students: 390,
    photoUrl: "https://picsum.photos/seed/t808/300/300",
    bio: "A rare combination of Hifz mastery and Arabic language expertise, guiding students to understand the Quran deeply.",
    languages: ["Arabic", "English", "French"],
    availability: "Mornings",
    verified: true,
    color: "#c9973a",
  },
];

const FILTERS = [
  "All",
  "Male",
  "Female",
  "Kids Expert",
  "Tajweed",
  "Hifz",
  "Arabic",
];

const ACCENT_COLORS = [
  "#c9973a",
  "#2fcf87",
  "#7eb8ff",
  "#ff8fa3",
  "#b58cff",
  "#ffd166",
  "#2fcf87",
  "#c9973a",
];

// ─────────────────────────────────────────────────────────────────────────────
const Tutors: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const allTutors = (TUTORS && TUTORS.length ? TUTORS : TUTOR_FB) as any[];

  const filtered = useMemo(() => {
    return allTutors.filter((t: any) => {
      const matchFilter = (() => {
        if (activeFilter === "All") return true;
        if (activeFilter === "Male" || activeFilter === "Female")
          return t.gender === activeFilter;
        if (activeFilter === "Kids Expert")
          return (t.badges || []).some((b: string) =>
            b.toLowerCase().includes("kids"),
          );
        return (t.specialties || []).some((s: string) =>
          s.toLowerCase().includes(activeFilter.toLowerCase()),
        );
      })();
      const matchSearch =
        !searchQuery ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.specialties || []).some((s: string) =>
          s.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchFilter && matchSearch;
    });
  }, [activeFilter, searchQuery, allTutors]);

  const featured = allTutors.find((t: any) => t.rating >= 5.0) || allTutors[0];

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
        {/* ══════════════════════════ HERO */}
        <section
          style={{
            background:
              "radial-gradient(ellipse 130% 80% at 20% 0%,#0d4a2a 0%,transparent 55%),radial-gradient(ellipse 80% 100% at 85% 100%,#062418 0%,transparent 50%),radial-gradient(100% 100% at 50% 50%,#020b06 0%,#030f07 100%)",
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
              top: "50%",
              right: "-3%",
              transform: "translateY(-50%)",
              fontFamily: "'Amiri',serif",
              fontSize: "clamp(160px,22vw,340px)",
              color: "rgba(255,255,255,.018)",
              fontWeight: 700,
              userSelect: "none",
              pointerEvents: "none",
              lineHeight: 1,
            }}
          >
            شيخ
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
              maxWidth: 1320,
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
              <span className="sec-label">World-Class Scholars</span>
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
              Learn From
              <br />
              <span className="gold-shimmer" style={{ fontWeight: 700 }}>
                Expert Tutors
              </span>
            </h1>
            <p
              className="h3"
              style={{
                color: "rgba(255,255,255,.45)",
                fontSize: 18,
                lineHeight: 1.85,
                maxWidth: 560,
                margin: "0 auto 44px",
              }}
            >
              Every tutor is hand-selected, certified, and passionate about
              guiding you on your Quranic journey.
            </p>
            {/* stat pills */}
            <div
              className="h4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 36,
                flexWrap: "wrap",
              }}
            >
              {[
                { icon: <Award size={15} />, v: "100+", l: "Certified Tutors" },
                {
                  icon: <GraduationCap size={15} />,
                  v: "Al-Azhar",
                  l: "Graduates",
                },
                {
                  icon: <Users size={15} />,
                  v: "5,000+",
                  l: "Students Taught",
                },
                {
                  icon: (
                    <Star
                      size={15}
                      fill="var(--gold-m)"
                      color="var(--gold-m)"
                    />
                  ),
                  v: "4.9",
                  l: "Avg Rating",
                },
              ].map((s, i) => (
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
                    <span style={{ color: "var(--gold)", opacity: 0.7 }}>
                      {s.icon}
                    </span>
                    {s.v}
                  </div>
                  <span
                    style={{
                      color: "rgba(255,255,255,.3)",
                      fontSize: 11,
                      letterSpacing: ".08em",
                    }}
                  >
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════ FEATURED TUTOR SPOTLIGHT */}
        <section
          style={{
            background: "linear-gradient(180deg,#020b06 0%,var(--forest) 100%)",
            padding: "72px 24px",
          }}
        >
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 40,
              }}
            >
              <span className="sec-label">Tutor Spotlight</span>
              <div
                style={{
                  height: 1,
                  flex: 1,
                  background:
                    "linear-gradient(90deg,rgba(201,151,58,.3),transparent)",
                }}
              />
              <span style={{ color: "var(--gold)", fontSize: 10 }}>✦</span>
            </div>

            <div
              className="shim-bar"
              style={{
                background:
                  "linear-gradient(135deg,rgba(14,66,36,.65),rgba(10,46,24,.8))",
                border: "1px solid rgba(201,151,58,.2)",
                borderRadius: 28,
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "1fr 1.6fr",
                boxShadow: "0 32px 80px rgba(0,0,0,.4)",
                position: "relative",
              }}
            >
              {/* left — image */}
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  minHeight: 340,
                }}
              >
                <img
                  src={featured.photoUrl}
                  alt={featured.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "grayscale(20%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to right,rgba(2,11,6,.1),rgba(2,11,6,.7))",
                  }}
                />
                {/* rotating ring overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: 40,
                    transform: "translateY(-50%)",
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: "1px dashed rgba(201,151,58,.3)",
                    animation: "rotateSlow 15s linear infinite",
                    pointerEvents: "none",
                  }}
                />
                {/* verified badge */}
                {featured.verified && (
                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      left: 20,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(2,11,6,.75)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(47,207,135,.3)",
                      borderRadius: 100,
                      padding: "5px 14px",
                    }}
                  >
                    <CheckCircle size={12} color="#2fcf87" />
                    <span
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#2fcf87",
                        letterSpacing: ".16em",
                      }}
                    >
                      VERIFIED SCHOLAR
                    </span>
                  </div>
                )}
              </div>

              {/* right — info */}
              <div
                style={{
                  padding: "48px 48px 48px 40px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* inner glow */}
                <div
                  style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle,rgba(201,151,58,.07) 0%,transparent 70%)",
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 24,
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div>
                    <p className="sec-label" style={{ marginBottom: 8 }}>
                      ⭐ Top Rated Tutor
                    </p>
                    <h2
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: "clamp(26px,3vw,40px)",
                        fontWeight: 700,
                        color: "#fff",
                        lineHeight: 1.1,
                      }}
                    >
                      {featured.name}
                    </h2>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      background: "rgba(201,151,58,.1)",
                      border: "1px solid rgba(201,151,58,.25)",
                      borderRadius: 16,
                      padding: "12px 20px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 32,
                        fontWeight: 700,
                        color: "var(--gold-m)",
                        lineHeight: 1,
                      }}
                    >
                      {featured.rating}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "center",
                        marginTop: 4,
                      }}
                    >
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
                      style={{
                        color: "rgba(255,255,255,.3)",
                        fontSize: 10,
                        marginTop: 4,
                      }}
                    >
                      {featured.reviewCount || 427} reviews
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    color: "rgba(255,255,255,.5)",
                    fontSize: 15,
                    lineHeight: 1.8,
                    marginBottom: 28,
                    maxWidth: 440,
                  }}
                >
                  {featured.bio}
                </p>

                {/* badges */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 28,
                  }}
                >
                  {(
                    featured.badges || ["Al-Azhar Graduate", "Ijazah Holder"]
                  ).map((b: string, i: number) => (
                    <span
                      key={i}
                      className="badge"
                      style={{
                        background: "rgba(201,151,58,.12)",
                        border: "1px solid rgba(201,151,58,.25)",
                        color: "var(--gold-lt)",
                      }}
                    >
                      <Award size={8} />
                      {b}
                    </span>
                  ))}
                  {(featured.specialties || []).map((s: string, i: number) => (
                    <span
                      key={i}
                      className="badge"
                      style={{
                        background: "rgba(47,207,135,.1)",
                        border: "1px solid rgba(47,207,135,.2)",
                        color: "#2fcf87",
                      }}
                    >
                      <BookOpen size={8} />
                      {s}
                    </span>
                  ))}
                </div>

                {/* stats row */}
                <div style={{ display: "flex", gap: 32, marginBottom: 32 }}>
                  {[
                    { v: `${featured.experienceYears}yr`, l: "Experience" },
                    { v: `${featured.students || 480}+`, l: "Students" },
                    {
                      v: (featured.languages || ["Arabic", "English"]).join(
                        " · ",
                      ),
                      l: "Languages",
                    },
                  ].map((s, i) => (
                    <div key={i}>
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 20,
                          fontWeight: 700,
                          color: "var(--gold-m)",
                          lineHeight: 1,
                        }}
                      >
                        {s.v}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,.3)",
                          fontSize: 11,
                          marginTop: 3,
                          letterSpacing: ".06em",
                        }}
                      >
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Link
                    to="/book-free-trial"
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
                      boxShadow: "0 6px 24px rgba(201,151,58,.4)",
                    }}
                  >
                    ✦ Book Session
                  </Link>
                  <button
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.1)",
                      color: "rgba(255,255,255,.6)",
                      padding: "13px 22px",
                      borderRadius: 14,
                      fontFamily: "'Cinzel',serif",
                      fontWeight: 600,
                      fontSize: 11,
                      letterSpacing: ".1em",
                      cursor: "pointer",
                    }}
                  >
                    <Play size={14} /> View Intro
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════ FILTER + SEARCH BAR */}
        <div
          style={{
            background: "rgba(2,11,6,.97)",
            borderTop: "1px solid rgba(255,255,255,.05)",
            borderBottom: "1px solid rgba(255,255,255,.05)",
            padding: "18px 24px",
            position: "sticky",
            top: 76,
            zIndex: 40,
            backdropFilter: "blur(24px)",
          }}
        >
          <div
            style={{
              maxWidth: 1320,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
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
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`f-pill${activeFilter === f ? " f-pill-active" : ""}`}
                  style={{ border: "none", cursor: "pointer" }}
                >
                  {f === "All" && <span style={{ fontSize: 8 }}>✦</span>}
                  {f}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* search */}
              <div style={{ position: "relative" }}>
                <Search
                  size={15}
                  style={{
                    position: "absolute",
                    left: 13,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(255,255,255,.25)",
                  }}
                />
                <input
                  className="srch"
                  type="text"
                  placeholder="Search tutors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* view toggle */}
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  className={`v-btn${viewMode === "grid" ? " v-btn-active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Grid view"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                  >
                    <rect x="0" y="0" width="6" height="6" rx="1" />
                    <rect x="8" y="0" width="6" height="6" rx="1" />
                    <rect x="0" y="8" width="6" height="6" rx="1" />
                    <rect x="8" y="8" width="6" height="6" rx="1" />
                  </svg>
                </button>
                <button
                  className={`v-btn${viewMode === "list" ? " v-btn-active" : ""}`}
                  onClick={() => setViewMode("list")}
                  title="List view"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                  >
                    <rect x="0" y="0" width="14" height="3" rx="1" />
                    <rect x="0" y="5.5" width="14" height="3" rx="1" />
                    <rect x="0" y="11" width="14" height="3" rx="1" />
                  </svg>
                </button>
              </div>

              {/* count badge */}
              <div
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: ".15em",
                  color: "rgba(255,255,255,.28)",
                  whiteSpace: "nowrap",
                }}
              >
                {filtered.length} Tutor{filtered.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════ TUTORS GRID / LIST */}
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
            {filtered.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 24px",
                  color: "rgba(255,255,255,.3)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 48,
                    marginBottom: 8,
                  }}
                >
                  🔍
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 26,
                    marginBottom: 10,
                  }}
                >
                  No tutors found
                </p>
                <p style={{ fontSize: 14 }}>Try adjusting your filters</p>
              </div>
            ) : viewMode === "grid" ? (
              /* ── GRID VIEW ── */
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "clamp(16px, 4vw, 24px)",
                }}
              >
                {filtered.map((tutor: any, idx: number) => {
                  const ac = ACCENT_COLORS[idx % ACCENT_COLORS.length];
                  return (
                    <div
                      key={tutor.id}
                      className="t-card"
                      style={{
                        borderRadius: 22,
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,.06)",
                        background: "rgba(255,255,255,.025)",
                        backdropFilter: "blur(16px)",
                        display: "flex",
                        flexDirection: "column",
                        animationDelay: `${(idx % 4) * 0.08}s`,
                        boxShadow: "0 8px 32px rgba(0,0,0,.3)",
                      }}
                      onMouseEnter={() => setHoveredId(tutor.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* image */}
                      <div
                        style={{
                          position: "relative",
                          height: 220,
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={tutor.photoUrl}
                          alt={tutor.name}
                          className="t-img"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                            filter: "grayscale(15%)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(to top,rgba(2,11,6,.92) 0%,rgba(2,11,6,.15) 60%,transparent 100%)",
                          }}
                        />

                        {/* accent top bar */}
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 3,
                            background: `linear-gradient(90deg,transparent,${ac},transparent)`,
                          }}
                        />

                        {/* gender badge */}
                        <span
                          style={{
                            position: "absolute",
                            top: 14,
                            left: 14,
                            background: `${ac}22`,
                            border: `1px solid ${ac}40`,
                            color: ac,
                            fontFamily: "'Cinzel',serif",
                            fontSize: 8,
                            fontWeight: 700,
                            letterSpacing: ".18em",
                            padding: "4px 10px",
                            borderRadius: 100,
                            textTransform: "uppercase",
                          }}
                        >
                          {tutor.gender}
                        </span>

                        {/* verified */}
                        {tutor.verified && (
                          <div
                            style={{
                              position: "absolute",
                              top: 14,
                              right: 14,
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              background: "rgba(47,207,135,.2)",
                              border: "1px solid rgba(47,207,135,.35)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CheckCircle size={13} color="#2fcf87" />
                          </div>
                        )}

                        {/* hover overlay */}
                        <div
                          className="t-overlay"
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(2,11,6,.75)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 12,
                            opacity: 0,
                            transition: "opacity .3s",
                          }}
                        >
                          <Link
                            to="/book-free-trial"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 6,
                              background:
                                "linear-gradient(135deg,var(--gold-m),var(--gold))",
                              color: "#020b06",
                              padding: "10px 18px",
                              borderRadius: 12,
                              fontFamily: "'Cinzel',serif",
                              fontWeight: 700,
                              fontSize: 10,
                              letterSpacing: ".12em",
                              textDecoration: "none",
                            }}
                          >
                            Book Now
                          </Link>
                          <button
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              background: "rgba(255,255,255,.1)",
                              border: "1px solid rgba(255,255,255,.15)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              color: "rgba(255,255,255,.7)",
                            }}
                          >
                            <Play size={14} />
                          </button>
                        </div>
                      </div>

                      {/* body */}
                      <div
                        style={{
                          padding: "22px 22px 26px",
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: -20,
                            right: -10,
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            background: `radial-gradient(circle,${ac}18 0%,transparent 70%)`,
                            pointerEvents: "none",
                          }}
                        />

                        <h3
                          style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 18,
                            fontWeight: 700,
                            color: "#fff",
                            marginBottom: 4,
                            lineHeight: 1.2,
                          }}
                        >
                          {tutor.name}
                        </h3>

                        <p
                          style={{
                            color: ac,
                            fontSize: 11,
                            fontFamily: "'Cinzel',serif",
                            fontWeight: 700,
                            letterSpacing: ".1em",
                            marginBottom: 12,
                          }}
                        >
                          {(tutor.specialties || ["Quran"])[0]} Specialist
                        </p>

                        {/* mini stats */}
                        <div
                          style={{ display: "flex", gap: 16, marginBottom: 14 }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <div style={{ display: "flex", gap: 1 }}>
                              {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                  key={i}
                                  size={9}
                                  fill="var(--gold-m)"
                                  color="var(--gold-m)"
                                />
                              ))}
                            </div>
                            <span
                              style={{
                                color: "#fff",
                                fontSize: 11,
                                fontWeight: 700,
                              }}
                            >
                              {tutor.rating}
                            </span>
                          </div>
                          <div
                            style={{
                              color: "rgba(255,255,255,.3)",
                              fontSize: 11,
                            }}
                          >
                            {tutor.experienceYears}yr exp
                          </div>
                        </div>

                        {/* specialties */}
                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            flexWrap: "wrap",
                            marginBottom: 18,
                          }}
                        >
                          {(tutor.specialties || [])
                            .slice(0, 2)
                            .map((s: string, si: number) => (
                              <span
                                key={si}
                                className="badge"
                                style={{
                                  background: `${ac}15`,
                                  border: `1px solid ${ac}30`,
                                  color: ac,
                                }}
                              >
                                {s}
                              </span>
                            ))}
                        </div>

                        {/* online indicator + availability */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 18,
                            color: "rgba(255,255,255,.3)",
                            fontSize: 12,
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <div
                              className="online-dot"
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: "var(--em-lt)",
                                position: "relative",
                              }}
                            />
                          </div>
                          {tutor.availability || "Flexible schedule"}
                        </div>

                        {/* divider */}
                        <div
                          style={{
                            height: 1,
                            background: `linear-gradient(90deg,transparent,${ac}30,transparent)`,
                            marginBottom: 16,
                          }}
                        />

                        <Link
                          to="/book-free-trial"
                          className="t-cta"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 7,
                            border: `1px solid ${ac}40`,
                            color: "var(--gold-lt)",
                            padding: "11px 0",
                            borderRadius: 12,
                            fontWeight: 700,
                            fontSize: 11,
                            textDecoration: "none",
                            fontFamily: "'Cinzel',serif",
                            letterSpacing: ".08em",
                            background: `${ac}08`,
                            transition: "all .3s cubic-bezier(.16,1,.3,1)",
                          }}
                        >
                          Book a Session <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* ── LIST VIEW ── */
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {filtered.map((tutor: any, idx: number) => {
                  const ac = ACCENT_COLORS[idx % ACCENT_COLORS.length];
                  return (
                    <div
                      key={tutor.id}
                      className="t-list-card"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "80px 1fr auto",
                        gap: 28,
                        alignItems: "center",
                        padding: "24px 28px",
                        borderRadius: 20,
                        border: "1px solid rgba(255,255,255,.06)",
                        background: "rgba(255,255,255,.025)",
                        backdropFilter: "blur(16px)",
                        animationDelay: `${idx * 0.05}s`,
                        boxShadow: "0 4px 24px rgba(0,0,0,.25)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* left accent bar */}
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 3,
                          background: `linear-gradient(180deg,transparent,${ac},transparent)`,
                        }}
                      />

                      {/* avatar */}
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: `2.5px solid ${ac}50`,
                          }}
                        >
                          <img
                            src={tutor.photoUrl}
                            alt={tutor.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        {tutor.verified && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: 2,
                              right: 2,
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              background: "var(--em-lt)",
                              border: "2px solid var(--deep)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CheckCircle size={10} color="#020b06" />
                          </div>
                        )}
                      </div>

                      {/* main info */}
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: 4,
                          }}
                        >
                          <h3
                            style={{
                              fontFamily: "'Cormorant Garamond',serif",
                              fontSize: 20,
                              fontWeight: 700,
                              color: "#fff",
                            }}
                          >
                            {tutor.name}
                          </h3>
                          {tutor.gender && (
                            <span
                              className="badge"
                              style={{
                                background: `${ac}18`,
                                border: `1px solid ${ac}30`,
                                color: ac,
                              }}
                            >
                              {tutor.gender}
                            </span>
                          )}
                        </div>
                        <p
                          style={{
                            color: ac,
                            fontSize: 11,
                            fontFamily: "'Cinzel',serif",
                            fontWeight: 700,
                            letterSpacing: ".1em",
                            marginBottom: 8,
                          }}
                        >
                          {(tutor.specialties || []).join(" · ")}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 20,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                            }}
                          >
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                size={10}
                                fill="var(--gold-m)"
                                color="var(--gold-m)"
                              />
                            ))}
                            <span
                              style={{
                                color: "#fff",
                                fontSize: 12,
                                fontWeight: 700,
                                marginLeft: 4,
                              }}
                            >
                              {tutor.rating}
                            </span>
                            <span
                              style={{
                                color: "rgba(255,255,255,.3)",
                                fontSize: 11,
                                marginLeft: 3,
                              }}
                            >
                              ({tutor.reviewCount || 200} reviews)
                            </span>
                          </div>
                          <span
                            style={{
                              color: "rgba(255,255,255,.25)",
                              fontSize: 12,
                            }}
                          >
                            {tutor.experienceYears}yr experience
                          </span>
                          <span
                            style={{
                              color: "rgba(255,255,255,.25)",
                              fontSize: 12,
                            }}
                          >
                            {tutor.students || 200}+ students
                          </span>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                              color: "rgba(255,255,255,.3)",
                              fontSize: 12,
                            }}
                          >
                            <div
                              style={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background: "var(--em-lt)",
                              }}
                            />
                            {tutor.availability || "Flexible"}
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <Link
                        to="/book-free-trial"
                        className="t-list-cta"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          border: `1px solid ${ac}40`,
                          color: "var(--gold-lt)",
                          padding: "12px 22px",
                          borderRadius: 12,
                          fontWeight: 700,
                          fontSize: 11,
                          textDecoration: "none",
                          fontFamily: "'Cinzel',serif",
                          letterSpacing: ".08em",
                          background: `${ac}08`,
                          transition: "all .3s",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Book Session <ArrowRight size={13} />
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════ WHY OUR TUTORS */}
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
              <p className="sec-label" style={{ marginBottom: 16 }}>
                Our Guarantee
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(30px,4vw,52px)",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                Why Our Tutors Are <span className="gold-text">Different</span>
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "clamp(16px, 4vw, 24px)",
              }}
            >
              {[
                {
                  icon: <Award size={22} />,
                  title: "Al-Azhar Certified",
                  desc: "Every tutor holds credentials from Al-Azhar University or equivalent — the gold standard in Islamic scholarship.",
                  color: "#c9973a",
                },
                {
                  icon: <Shield size={22} />,
                  title: "Background Verified",
                  desc: "All tutors undergo thorough vetting, credential verification, and trial teaching assessments before joining.",
                  color: "#2fcf87",
                },
                {
                  icon: <Heart size={22} />,
                  title: "Student-First Approach",
                  desc: "Tutors are trained in personalised pedagogy, ensuring every student gets the attention they deserve.",
                  color: "#ff8fa3",
                },
                {
                  icon: <Globe size={22} />,
                  title: "Multilingual Support",
                  desc: "Our tutors collectively speak 20+ languages, helping students learn comfortably in their native tongue.",
                  color: "#7eb8ff",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: "center",
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.06)",
                    borderRadius: 22,
                    padding: "40px 28px",
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform .35s ease,box-shadow .35s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-8px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 32px 64px rgba(0,0,0,.4),0 0 0 1px ${f.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
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
                    {f.icon}
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

        {/* ══════════════════════════ BOTTOM CTA */}
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
              Find Your Perfect Match
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(32px,5vw,64px)",
                fontWeight: 300,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >
              Can't Find the Right Tutor?
              <br />
              <span
                className="gold-shimmer"
                style={{ fontWeight: 700, fontStyle: "italic" }}
              >
                Let Us Match You
              </span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,.4)",
                fontSize: 17,
                lineHeight: 1.85,
                marginBottom: 44,
                maxWidth: 500,
                margin: "0 auto 44px",
              }}
            >
              Book a free evaluation and our academic team will personally
              recommend the ideal tutor for your goals.
            </p>
            <Link
              to="/book-free-trial"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "linear-gradient(135deg,var(--gold-m),var(--gold))",
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
              <span style={{ fontSize: 16 }}>✦</span> Book Free Evaluation{" "}
              <ArrowRight size={16} />
            </Link>
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

export default Tutors;
