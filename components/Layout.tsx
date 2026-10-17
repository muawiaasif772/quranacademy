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
import { BRAND_LOGO_ALT, BRAND_LOGO_PATH } from "../seo/brand-assets";
import { CONTACT_EMAIL } from "../seo/seo.config";
import { ThemeToggle } from "./ThemeToggle";

const layoutStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,600&family=Cinzel:wght@400;600;700;900&family=Nunito:wght@400;500;600;700;800&display=swap');

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
  .nav-scrolled .nav-inner { height: 72px !important; }

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
    color: var(--nav-link-fg);
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
  .brand-logo-shell {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    line-height: 0;
    flex-shrink: 0;
  }
  .brand-logo {
    height: clamp(48px, 6.2vw, 62px);
    width: auto;
    max-width: min(360px, 78vw);
    min-width: 200px;
    object-fit: contain;
    object-position: left center;
    display: block;
    filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.55));
  }
  .nav-scrolled .brand-logo {
    height: clamp(44px, 5.5vw, 54px);
    min-width: 180px;
  }
  @media (max-width: 720px) {
    .brand-logo {
      height: clamp(44px, 12vw, 52px);
      min-width: 160px;
      max-width: min(280px, 62vw);
    }
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
    color: var(--on-surface-muted); text-decoration: none;
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
    color: var(--on-surface-muted); text-decoration: none;
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

  .foot-bar-link:hover {
    color: var(--gold-lt);
  }

  /* ── social icon ── */
  .social-btn {
    width: 40px; height: 40px; border-radius: 12px;
    border: 1px solid rgba(201,151,58,.2);
    background: rgba(201,151,58,.05);
    display: flex; align-items: center; justify-content: center;
    color: var(--on-surface-muted);
    text-decoration: none;
    transition: all .3s;
  }
  .social-btn:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--on-gold);
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
    color: var(--on-gold); padding: 10px 24px; border-radius: 12px;
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
    flex: 1; background: var(--page-input-bg); border: 1px solid var(--page-input-border);
    border-radius: 12px 0 0 12px; padding: 12px 18px; color: var(--on-surface);
    font-family: 'Nunito', sans-serif; font-size: 13px; outline: none;
    transition: border-color .25s;
  }
  .news-input::placeholder { color: var(--on-surface-subtle); }
  .news-input:focus { border-color: rgba(201,151,58,.55); }
  .news-btn {
    background: linear-gradient(135deg, var(--gold-mid), var(--gold));
    color: var(--on-gold); border: none; padding: 12px 20px;
    border-radius: 0 12px 12px 0; cursor: pointer;
    font-family: 'Cinzel', serif; font-weight: 700; font-size: 11px; letter-spacing: .1em;
    transition: all .25s;
  }
  .news-btn:hover { filter: brightness(1.1); }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
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
        aria-label="Primary"
        className={`nav-root${scrolled ? " nav-scrolled" : ""}`}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg)",
          backdropFilter: "blur(24px) saturate(180%)",
          borderBottom: "1px solid var(--nav-border)",
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
              height: 84,
              transition: "height .4s",
            }}
          >
            {/* ── Logo ── */}
            <Link
              to="/"
              aria-label="Alif Laam Meem Academy home"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <span className="brand-logo-shell">
                <img
                  src={BRAND_LOGO_PATH}
                  alt={BRAND_LOGO_ALT}
                  className="brand-logo"
                  width={360}
                  height={62}
                  fetchPriority="high"
                  decoding="async"
                />
              </span>
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
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <ThemeToggle />
              <Link to="/book-free-trial" className="nav-cta desktop-cta">
                ✦ Free Trial
              </Link>

              {/* mobile burger */}
              <button
                type="button"
                onClick={() => setIsOpen((o) => !o)}
                aria-expanded={isOpen}
                aria-controls="mobile-nav-panel"
                aria-label={isOpen ? "Close menu" : "Open menu"}
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
                {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {isOpen && (
          <div
            id="mobile-nav-panel"
            className="mobile-menu"
            style={{
              borderTop: "1px solid rgba(201,151,58,.1)",
              background: "var(--mobile-menu-bg)",
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
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 10,
                  letterSpacing: ".2em",
                  color: "var(--on-surface-muted)",
                  textTransform: "uppercase",
                }}
              >
                Appearance
              </span>
              <ThemeToggle />
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
              {(
                [
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Twitter, label: "Twitter" },
                ] as const
              ).map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="social-btn"
                  aria-label={label}
                  style={{ width: 36, height: 36, borderRadius: 10 }}
                >
                  <Icon size={16} aria-hidden="true" />
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
                  color: "var(--on-surface-faint)",
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
        background: "var(--footer-bg)",
        color: "var(--footer-fg-muted)",
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
            background: "var(--footer-banner-bg)",
            border: "1px solid var(--footer-banner-border)",
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
                color: "var(--on-surface)",
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
            <span
              className="brand-logo-shell"
              style={{ marginBottom: 24, alignSelf: "flex-start" }}
            >
              <img
                src={BRAND_LOGO_PATH}
                alt={BRAND_LOGO_ALT}
                className="brand-logo"
                style={{ maxWidth: 320, minWidth: 220 }}
                width={320}
                height={58}
                loading="lazy"
              />
            </span>

            <p
              style={{
                fontSize: 13,
                lineHeight: 1.85,
                color: "var(--on-surface-faint)",
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
                      color: "var(--on-surface-subtle)",
                      letterSpacing: ".08em",
                      marginTop: 2,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
              <div
                style={{
                  width: 1,
                  background: "var(--surface-chip-border)",
                }}
              />
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
                    color: "var(--on-surface)",
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
              {(
                [
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Twitter, label: "Twitter" },
                ] as const
              ).map(({ Icon, label }) => (
                <a key={label} href="#" className="social-btn" aria-label={label}>
                  <Icon size={16} aria-hidden="true" />
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
                  val: CONTACT_EMAIL,
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
                    background: "var(--surface-chip-bg)",
                    border: "1px solid var(--surface-chip-border)",
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
                        color: "var(--on-surface-subtle)",
                        textTransform: "uppercase",
                        marginBottom: 2,
                      }}
                    >
                      {c.label}
                    </div>
                    <div
                      style={{
                        color: "var(--on-surface)",
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
                  color: "var(--on-surface-subtle)",
                  marginBottom: 12,
                  lineHeight: 1.6,
                }}
              >
                Get updates on new courses and free Islamic resources.
              </p>
              <div style={{ display: "flex" }}>
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email for newsletter
                </label>
                <input
                  id="footer-newsletter-email"
                  className="news-input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                />
                <button type="button" className="news-btn" aria-label="Subscribe to newsletter">
                  ✦
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── bottom bar ── */}
        <div
          style={{
            borderTop: "1px solid var(--sticky-bar-border)",
            padding: "28px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p
            className="foot-bar-copy"
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: ".18em",
              color: "var(--footer-fg-muted)",
              textTransform: "uppercase",
              margin: 0,
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
                className="foot-bar-link"
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: ".16em",
                  color: "var(--footer-fg-muted)",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "color .25s",
                }}
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
          color: "var(--on-surface)",
          textDecoration: "none",
          boxShadow: "0 8px 32px rgba(37,211,102,.4)",
          transition: "transform .25s, box-shadow .25s",
        }}
      >
        <MessageCircle size={26} aria-hidden="true" />
        {/* tooltip */}
        <div
          aria-hidden="true"
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
            color: "var(--on-surface)",
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
      <main id="main-content" aria-label="Main content" style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
