import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  ArrowRight,
  Star,
  Globe,
  Award,
  BookOpen,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const layoutStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,600&family=Cinzel:wght@400;600;700;900&family=Nunito:wght@400;500;600;700;800&display=swap');

  :root {
    --deep:     #020b06;
    --forest:   #051610;
    --em-dk:    #0a2e18;
    --em-md:    #0e4224;
    --em-vv:    #16a05c;
    --em-lt:    #2fcf87;
    --gold:     #c9973a;
    --gold-mid: #e4b558;
    --gold-lt:  #f5d98e;
    --cream:    #fdfaf3;
    --ivory:    #f8f3e8;
  }

  /* ── navbar scroll shrink ── */
  .nav-root {
    transition: all .4s cubic-bezier(.16,1,.3,1);
    font-family: 'Nunito', sans-serif;
  }
  .nav-scrolled {
    box-shadow: 0 4px 40px rgba(0,0,0,.45) !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .nav-scrolled .nav-inner { height: 64px !important; }

  /* ── nav link underline slide ── */
  .nav-link {
    position: relative;
    transition: color .25s;
    font-family: 'Cinzel', serif;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: .2em;
    text-transform: uppercase;
    text-decoration: none;
    color: rgba(255,255,255,.55);
    padding-bottom: 4px;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 50%; right: 50%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    transition: left .3s, right .3s;
  }
  .nav-link:hover,
  .nav-link-active {
    color: var(--gold-lt) !important;
  }
  .nav-link:hover::after,
  .nav-link-active::after {
    left: 0; right: 0;
  }
  .nav-link-active { color: var(--gold-lt) !important; }

  /* ── logo shimmer ── */
  @keyframes shimmerText {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  .logo-shimmer {
    background: linear-gradient(90deg, #fff 0%, var(--gold-lt) 35%, #fff 60%, var(--gold-lt) 80%, #fff 100%);
    background-size: 400px 100%;
    animation: shimmerText 5s linear infinite;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  /* ── mobile menu slide ── */
  @keyframes menuSlideDown {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .mobile-menu { animation: menuSlideDown .35s cubic-bezier(.16,1,.3,1) both; }

  /* ── mobile link hover ── */
  .mob-link {
    display: flex; align-items: center; gap: 12px;
    font-family: 'Cinzel', serif; font-size: 13px; font-weight: 700;
    letter-spacing: .15em; text-transform: uppercase;
    color: rgba(255,255,255,.7); text-decoration: none;
    padding: 14px 20px; border-radius: 14px;
    border: 1px solid transparent;
    transition: all .25s;
  }
  .mob-link:hover, .mob-link-active {
    color: var(--gold-lt);
    background: rgba(201,151,58,.06);
    border-color: rgba(201,151,58,.15);
  }

  /* ── footer link hover ── */
  .foot-link {
    display: flex; align-items: center; gap: 8px;
    color: rgba(255,255,255,.4); text-decoration: none;
    font-size: 13px; font-weight: 600;
    transition: all .25s;
    padding: 3px 0;
  }
  .foot-link::before {
    content: '✦';
    font-size: 7px;
    color: var(--gold);
    opacity: 0;
    transform: translateX(-6px);
    transition: all .25s;
  }
  .foot-link:hover { color: var(--gold-lt); padding-left: 4px; }
  .foot-link:hover::before { opacity: 1; transform: translateX(0); }

  /* ── social icon ── */
  .social-btn {
    width: 40px; height: 40px; border-radius: 12px;
    border: 1px solid rgba(201,151,58,.2);
    background: rgba(201,151,58,.05);
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,.4);
    text-decoration: none;
    transition: all .3s;
  }
  .social-btn:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--deep);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(201,151,58,.35);
  }

  /* ── whatsapp pulse ── */
  @keyframes waPulse {
    0%   { transform: scale(1); box-shadow: 0 0 0 0 rgba(37,211,102,.5); }
    70%  { transform: scale(1.05); box-shadow: 0 0 0 14px rgba(37,211,102,0); }
    100% { transform: scale(1); }
  }
  .wa-btn { animation: waPulse 2.5s ease-in-out infinite; }
  .wa-btn:hover { animation: none !important; transform: scale(1.1) !important; }

  /* footer hex bg */
  .foot-hex {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='.25' opacity='.04' d='M40 4 L76 24 L76 56 L40 76 L4 56 L4 24Z'/%3E%3C/svg%3E");
  }

  @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  /* nav CTA shimmer */
  .nav-cta {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, var(--gold-mid) 0%, var(--gold) 50%, #a36c18 100%);
    color: var(--deep); padding: 10px 24px; border-radius: 12px;
    font-family: 'Cinzel', serif; font-weight: 700; font-size: 10px; letter-spacing: .12em;
    text-decoration: none; text-transform: uppercase;
    box-shadow: 0 4px 20px rgba(201,151,58,.35), inset 0 1px 0 rgba(255,255,255,.25);
    transition: all .3s; position: relative; overflow: hidden;
  }
  .nav-cta::before {
    content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent);
    transition: left .45s;
  }
  .nav-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(201,151,58,.5); }
  .nav-cta:hover::before { left: 100%; }

  /* footer newsletter input */
  .news-input {
    flex: 1; background: rgba(255,255,255,.04); border: 1px solid rgba(201,151,58,.2);
    border-radius: 12px 0 0 12px; padding: 12px 18px; color: #fff;
    font-family: 'Nunito', sans-serif; font-size: 13px; outline: none;
    transition: border-color .25s;
  }
  .news-input::placeholder { color: rgba(255,255,255,.25); }
  .news-input:focus { border-color: rgba(201,151,58,.55); }
  .news-btn {
    background: linear-gradient(135deg, var(--gold-mid), var(--gold));
    color: var(--deep); border: none; padding: 12px 20px;
    border-radius: 0 12px 12px 0; cursor: pointer;
    font-family: 'Cinzel', serif; font-weight: 700; font-size: 11px; letter-spacing: .1em;
    transition: all .25s;
  }
  .news-btn:hover { filter: brightness(1.1); }
`;

// ─────────────────────────────────────────────────────────────────────────────

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "Tutors", path: "/tutors" },
  { name: "How It Works", path: "/how-it-works" },
  { name: "Pricing", path: "/pricing" },
  { name: "FAQ", path: "/faq" },
];

// ── NAVBAR ────────────────────────────────────────────────────────────────────
export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <style>{layoutStyles}</style>
      <nav
        className={`nav-root${scrolled ? " nav-scrolled" : ""}`}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled
            ? "rgba(2,11,6,.96)"
            : "linear-gradient(180deg,rgba(2,11,6,.98) 0%,rgba(2,11,6,.92) 100%)",
          backdropFilter: "blur(24px) saturate(180%)",
          borderBottom: "1px solid rgba(201,151,58,.12)",
        }}
      >
        {/* top gold micro-line */}
        <div
          style={{
            height: 2,
            background:
              "linear-gradient(90deg,transparent,rgba(201,151,58,.7),rgba(245,217,142,.9),rgba(201,151,58,.7),transparent)",
          }}
        />

        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 24px" }}>
          <div
            className="nav-inner"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 76,
              transition: "height .4s",
            }}
          >
            {/* ── Logo ── */}
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              {/* emblem */}
              <div style={{ position: "relative", width: 44, height: 44 }}>
                {/* rotating ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: -3,
                    borderRadius: "50%",
                    border: "1px dashed rgba(201,151,58,.35)",
                    animation: "rotateSlow 12s linear infinite",
                  }}
                />
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: "linear-gradient(135deg,#0e4224,#0a2e18)",
                    border: "1px solid rgba(201,151,58,.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      "0 4px 20px rgba(201,151,58,.2),inset 0 1px 0 rgba(255,255,255,.07)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: 13,
                      fontWeight: 900,
                      color: "var(--gold-mid)",
                      letterSpacing: "-.02em",
                    }}
                  >
                    ALM
                  </span>
                </div>
              </div>
              {/* wordmark */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: 1,
                }}
              >
                <span
                  className="logo-shimmer"
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 15,
                    fontWeight: 900,
                    letterSpacing: ".12em",
                  }}
                >
                  Alif LaAm Meem
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 11,
                    color: "rgba(255,255,255,.3)",
                    letterSpacing: ".18em",
                    marginTop: 2,
                    fontStyle: "italic",
                  }}
                >
                  Academy
                </span>
              </div>
            </Link>

            {/* ── Desktop Links ── */}
            <div
              style={{ display: "flex", alignItems: "center", gap: 36 }}
              className="hidden-mobile"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link${location.pathname === link.path ? " nav-link-active" : ""}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* ── CTA + Hamburger ── */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Link
                to="/book-free-trial"
                className="nav-cta"
                style={{ display: "none" }}
              >
                ✦ Free Trial
              </Link>
              <Link
                to="/book-free-trial"
                className="nav-cta desktop-cta"
                style={{}}
              >
                ✦ Free Trial
              </Link>

              {/* mobile burger */}
              <button
                onClick={() => setIsOpen((o) => !o)}
                style={{
                  display: "none",
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: "rgba(201,151,58,.08)",
                  border: "1px solid rgba(201,151,58,.2)",
                  cursor: "pointer",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--gold-lt)",
                  transition: "all .25s",
                }}
                id="mobile-burger"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {isOpen && (
          <div
            className="mobile-menu"
            style={{
              borderTop: "1px solid rgba(201,151,58,.1)",
              background: "rgba(2,11,6,.98)",
              backdropFilter: "blur(24px)",
              padding: "20px 20px 28px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`mob-link${location.pathname === link.path ? " mob-link-active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--gold)",
                      flexShrink: 0,
                      opacity: location.pathname === link.path ? 1 : 0.3,
                    }}
                  />
                  {link.name}
                </Link>
              ))}
            </div>
            <div
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg,transparent,rgba(201,151,58,.2),transparent)",
                margin: "16px 0",
              }}
            />
            <Link
              to="/book-free-trial"
              onClick={() => setIsOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                background:
                  "linear-gradient(135deg,var(--gold-mid),var(--gold))",
                color: "var(--deep)",
                padding: "16px 24px",
                borderRadius: 16,
                fontFamily: "'Cinzel',serif",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: ".1em",
                textDecoration: "none",
                boxShadow: "0 8px 28px rgba(201,151,58,.4)",
              }}
            >
              ✦ Book My Free Trial <ArrowRight size={16} />
            </Link>

            {/* mobile social + contact mini row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginTop: 20,
              }}
            >
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="social-btn"
                  style={{ width: 36, height: 36, borderRadius: 10 }}
                >
                  <Icon size={16} />
                </a>
              ))}
              <div
                style={{
                  height: 24,
                  width: 1,
                  background: "rgba(255,255,255,.08)",
                }}
              />
              <span
                style={{
                  color: "rgba(255,255,255,.35)",
                  fontSize: 12,
                  fontFamily: "'Nunito',sans-serif",
                }}
              >
                +923006873200
              </span>
            </div>
          </div>
        )}
      </nav>

      {/* Inject responsive CSS that can't go in style attr */}
      <style>{`
        @media (min-width: 768px) {
          #mobile-burger { display: none !important; }
          .hidden-mobile { display: flex !important; }
          .desktop-cta { display: inline-flex !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .desktop-cta { display: none !important; }
          #mobile-burger { display: flex !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .nav-inner { height: auto !important; }
          .footer-grid { gap: 24px !important; margin-bottom: 40px !important; }
        }
      `}</style>
    </>
  );
};

// ── FOOTER ───────────────────────────────────────────────────────────────────
export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg,#020b06 0%,#030f07 100%)",
        color: "rgba(255,255,255,.55)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Nunito',sans-serif",
      }}
    >
      {/* hex tile */}
      <div className="foot-hex" style={{ position: "absolute", inset: 0 }} />

      {/* top ambient glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          width: 400,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(22,160,92,.06) 0%,transparent 70%)",
          pointerEvents: "none",
          filter: "blur(20px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: "15%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(201,151,58,.04) 0%,transparent 70%)",
          pointerEvents: "none",
          filter: "blur(20px)",
        }}
      />

      {/* top gold separator */}
      <div
        style={{
          height: 2,
          background:
            "linear-gradient(90deg,transparent,rgba(201,151,58,.5),rgba(245,217,142,.8),rgba(201,151,58,.5),transparent)",
        }}
      />

      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "80px 24px 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── top cta band ── */}
        <div
          style={{
            background:
              "linear-gradient(135deg,rgba(14,66,36,.7),rgba(10,46,24,.8))",
            border: "1px solid rgba(201,151,58,.2)",
            borderRadius: "clamp(16px, 3vw, 24px)",
            padding: "clamp(24px, 5vw, 52px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "clamp(16px, 4vw, 28px)",
            marginBottom: "clamp(40px, 10vw, 80px)",
            backdropFilter: "blur(12px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* glow inside banner */}
          <div
            style={{
              position: "absolute",
              left: -40,
              top: -40,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(201,151,58,.08) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div>
            <p
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".25em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Start Your Journey
            </p>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(22px,3vw,34px)",
                fontWeight: 600,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              Ready to Begin Your{" "}
              <em
                style={{
                  background:
                    "linear-gradient(135deg,var(--gold-lt),var(--gold))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Quranic Journey?
              </em>
            </h3>
          </div>
          <Link
            to="/book-free-trial"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "clamp(6px, 2vw, 10px)",
              background: "linear-gradient(135deg,var(--gold-mid),var(--gold))",
              color: "var(--deep)",
              padding: "clamp(12px, 3vw, 16px) clamp(20px, 4vw, 36px)",
              borderRadius: 14,
              fontFamily: "'Cinzel',serif",
              fontWeight: 700,
              fontSize: "clamp(11px, 2.5vw, 12px)",
              letterSpacing: ".1em",
              textDecoration: "none",
              boxShadow: "0 8px 28px rgba(201,151,58,.4)",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            ✦ Free Trial <ArrowRight size={16} />
          </Link>
        </div>

        {/* ── main grid ── */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "clamp(32px, 5vw, 56px)",
            marginBottom: "clamp(48px, 8vw, 72px)",
          }}
        >
          {/* col 1 — brand */}
          <div style={{ gridColumn: "span 1", minWidth: 0 }}>
            {/* logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: "linear-gradient(135deg,#0e4224,#0a2e18)",
                  border: "1px solid rgba(201,151,58,.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(201,151,58,.15)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 13,
                    fontWeight: 900,
                    color: "var(--gold-mid)",
                  }}
                >
                  NQ
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 13,
                    fontWeight: 900,
                    color: "#fff",
                    letterSpacing: ".1em",
                  }}
                >
                  ALIF LAAM MEEM
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 11,
                    color: "rgba(255,255,255,.3)",
                    fontStyle: "italic",
                    letterSpacing: ".15em",
                  }}
                >
                  Academy
                </div>
              </div>
            </div>

            <p
              style={{
                fontSize: 13,
                lineHeight: 1.85,
                color: "rgba(255,255,255,.38)",
                marginBottom: 28,
              }}
            >
              Leading the global community in authentic, accessible Quranic
              education since 2015. 1-on-1 focus that transforms lives.
            </p>

            {/* stats mini row */}
            <div style={{ display: "flex", gap: 20, marginBottom: 28 }}>
              {[
                { num: "5K+", label: "Students" },
                { num: "50+", label: "Countries" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "var(--gold-mid)",
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,.3)",
                      letterSpacing: ".08em",
                      marginTop: 2,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
              <div style={{ width: 1, background: "rgba(255,255,255,.06)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={10}
                    fill="var(--gold-mid)"
                    color="var(--gold-mid)"
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
                  4.9
                </span>
              </div>
            </div>

            {/* socials */}
            <div style={{ display: "flex", gap: 10 }}>
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="social-btn">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* col 2 — learning path */}
          <div>
            <h4
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".22em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: 28,
              }}
            >
              Learning Path
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {[
                { label: "Course Catalog", path: "/courses" },
                { label: "Our Scholars", path: "/tutors" },
                { label: "The Process", path: "/how-it-works" },
                { label: "Tuition Fees", path: "/pricing" },
                { label: "Free Trial", path: "/book-free-trial" },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="foot-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* col 3 — support */}
          <div>
            <h4
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".22em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: 28,
              }}
            >
              Student Support
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {[
                { label: "Testimonials", path: "/reviews" },
                { label: "Help Center", path: "/faq" },
                { label: "Contact Us", path: "/contact" },
                { label: "Register Now", path: "/book-free-trial" },
                { label: "Privacy Policy", path: "/privacy-policy" },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="foot-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* col 4 — contact + newsletter */}
          <div>
            <h4
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".22em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: 28,
              }}
            >
              Get In Touch
            </h4>

            {/* contact cards */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                marginBottom: 32,
              }}
            >
              {[
                {
                  icon: <Phone size={15} />,
                  label: "Call Us",
                  val: "+9203006873200",
                  color: "#c9973a",
                },
                {
                  icon: <Mail size={15} />,
                  label: "Email",
                  val: "info@aliflaameem.com",
                  color: "#2fcf87",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "12px 16px",
                    borderRadius: 14,
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.06)",
                    transition: "border-color .25s",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: `${c.color}18`,
                      border: `1px solid ${c.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: c.color,
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: ".18em",
                        color: "rgba(255,255,255,.3)",
                        textTransform: "uppercase",
                        marginBottom: 2,
                      }}
                    >
                      {c.label}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,.8)",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {c.val}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* newsletter */}
            <div>
              <p
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: ".2em",
                  color: "var(--gold)",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Newsletter
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,.3)",
                  marginBottom: 12,
                  lineHeight: 1.6,
                }}
              >
                Get updates on new courses and free Islamic resources.
              </p>
              <div style={{ display: "flex" }}>
                <input
                  className="news-input"
                  type="email"
                  placeholder="your@email.com"
                />
                <button className="news-btn">✦</button>
              </div>
            </div>
          </div>
        </div>

        {/* ── bottom bar ── */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,.05)",
            padding: "28px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: ".18em",
              color: "#ffffffff",
              textTransform: "uppercase",
            }}
          >
            © {new Date().getFullYear()} Alif Laam Meem Islamic Insitute
          </p>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Service", href: "/terms-of-service" },
            ].map((l, i) => (
              <a
                key={i}
                href={l.href}
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: ".16em",
                  color: "#ffffffff",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "color .25s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--gold)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#ffffffff")
                }
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── WhatsApp FAB ── */}
      <a
        href="https://wa.me/03006873200"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-btn"
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed",
          bottom: "clamp(16px, 5vw, 32px)",
          right: "clamp(16px, 5vw, 32px)",
          zIndex: 40,
          width: "clamp(50px, 10vw, 60px)",
          height: "clamp(50px, 10vw, 60px)",
          minWidth: 50,
          minHeight: 50,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#25d366,#128c7e)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textDecoration: "none",
          boxShadow: "0 8px 32px rgba(37,211,102,.4)",
          transition: "transform .25s, box-shadow .25s",
        }}
      >
        <MessageCircle size={26} />
        {/* tooltip */}
        <div
          style={{
            position: "absolute",
            right: 70,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(2,11,6,.95)",
            border: "1px solid rgba(201,151,58,.2)",
            borderRadius: 10,
            padding: "8px 14px",
            whiteSpace: "nowrap",
            fontFamily: "'Nunito',sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: "#fff",
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity .25s",
          }}
          id="wa-tooltip"
        >
          Chat on WhatsApp
        </div>
      </a>

      {/* tooltip hover via style tag */}
      <style>{`
        .wa-btn:hover #wa-tooltip { opacity: 1 !important; }
        @media (max-width: 1024px) {
          footer .grid-4 { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 640px) {
          footer .grid-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};

// ── LAYOUT ────────────────────────────────────────────────────────────────────
export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
};
