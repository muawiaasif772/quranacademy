import React from "react";
import {
  ClipboardList,
  Compass,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const sectionStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,600&family=Cinzel:wght@400;600;700&family=Nunito:wght@400;500;600;700&display=swap');

  @keyframes orbitSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes orbitSpinReverse {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
  @keyframes iconPulse {
    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(201,151,58,.4)); }
    50%       { transform: scale(1.12); filter: drop-shadow(0 0 18px rgba(201,151,58,.8)); }
  }
  @keyframes dotOrbit {
    from { transform: rotate(0deg) translateX(44px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(44px) rotate(-360deg); }
  }
  @keyframes shimmerLine {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }
  @keyframes glowBreathe {
    0%, 100% { opacity: .35; transform: scale(1); }
    50%       { opacity: .7;  transform: scale(1.05); }
  }
  @keyframes connectorFlow {
    0%   { stroke-dashoffset: 120; opacity: .3; }
    50%  { opacity: 1; }
    100% { stroke-dashoffset: 0; opacity: .3; }
  }
  @keyframes cardEntrance {
    from { opacity: 0; transform: translateY(40px) scale(.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes numberGlow {
    0%, 100% { opacity: .06; }
    50%       { opacity: .13; }
  }
  @keyframes vertConnectorFlow {
    0%   { stroke-dashoffset: 80; opacity: .3; }
    50%  { opacity: 1; }
    100% { stroke-dashoffset: 0; opacity: .3; }
  }

  .hiw-card {
    animation: cardEntrance .8s cubic-bezier(.16,1,.3,1) both;
  }
  .hiw-card:nth-child(1) { animation-delay: .1s; }
  .hiw-card:nth-child(2) { animation-delay: .25s; }
  .hiw-card:nth-child(3) { animation-delay: .4s; }

  .hiw-card:hover .icon-ring-outer { animation-duration: 4s; }
  .hiw-card:hover .icon-pulse       { animation: iconPulse .9s ease-in-out infinite; }

  .icon-ring-outer { animation: orbitSpin 12s linear infinite; }
  .icon-ring-inner { animation: orbitSpinReverse 8s linear infinite; }
  .icon-pulse      { animation: iconPulse 3s ease-in-out infinite; }
  .orbit-dot       { animation: dotOrbit 6s linear infinite; }
  .orbit-dot-2     { animation: dotOrbit 9s linear infinite reverse; animation-delay: -3s; }
  .step-number-bg  { animation: numberGlow 4s ease-in-out infinite; }
  .glow-circle     { animation: glowBreathe 4s ease-in-out infinite; }
  .glow-circle-2   { animation: glowBreathe 5s 1s ease-in-out infinite; }

  .hiw-card {
    cursor: default;
    transition: transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s ease;
  }
  .hiw-card:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow:
      0 40px 80px rgba(3,13,8,.55),
      0 0 0 1px rgba(201,151,58,.35),
      0 0 60px rgba(201,151,58,.07);
  }

  .shimmer-bar::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.35) 50%, transparent 100%);
    animation: shimmerLine 2.5s ease-in-out infinite;
  }

  /* ── Responsive grid ── */

  /* Desktop: 3 columns */
  .hiw-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    position: relative;
  }

  /* Tablet: 1 column, compact */
  @media (max-width: 900px) {
    .hiw-grid {
      grid-template-columns: 1fr;
      gap: 20px;
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }
    /* Hide horizontal SVG arrows on tablet/mobile */
    .hiw-connector-h { display: none !important; }
    /* Show vertical connectors instead */
    .hiw-connector-v { display: flex !important; }
  }

  /* Mobile: tighter padding */
  @media (max-width: 520px) {
    .hiw-card-inner {
      padding: 36px 24px 32px !important;
    }
    .hiw-section-pad {
      padding: 72px 16px 88px !important;
    }
    .hiw-header-mb {
      margin-bottom: 52px !important;
    }
    .hiw-cta-row {
      flex-direction: column !important;
      align-items: center !important;
      gap: 16px !important;
    }
    .hiw-cta-line { display: none !important; }
    .hiw-cta-btn {
      width: 100% !important;
      justify-content: center !important;
    }
  }

  /* Tablet padding */
  @media (max-width: 900px) and (min-width: 521px) {
    .hiw-card-inner {
      padding: 44px 32px 36px !important;
    }
    .hiw-section-pad {
      padding: 88px 20px 100px !important;
    }
    .hiw-header-mb {
      margin-bottom: 60px !important;
    }
  }

  /* 2-col option on mid tablet */
  @media (min-width: 640px) and (max-width: 900px) {
    .hiw-grid {
      grid-template-columns: repeat(2, 1fr);
      max-width: 100%;
    }
    /* Make the 3rd card span full width centered */
    .hiw-card:nth-child(3) {
      grid-column: 1 / -1;
      max-width: 560px;
      margin: 0 auto;
      width: 100%;
    }
  }
`;

const steps = [
  {
    num: "01",
    icon: ClipboardList,
    color: "#c9973a",
    colorLight: "rgba(201,151,58,.12)",
    colorGlow: "rgba(201,151,58,.35)",
    title: "Book a Trial",
    desc: "Fill out a short form and choose a time that suits your schedule. Your first evaluation session is completely free.",
    tag: "Get Started",
    ringColor1: "rgba(201,151,58,.25)",
    ringColor2: "rgba(201,151,58,.1)",
    dotColor: "#c9973a",
  },
  {
    num: "02",
    icon: Compass,
    color: "#2fcf87",
    colorLight: "rgba(47,207,135,.1)",
    colorGlow: "rgba(47,207,135,.3)",
    title: "Get Evaluated",
    desc: "Meet your dedicated tutor, share your goals, and receive a fully personalized learning roadmap crafted just for you.",
    tag: "Meet Tutor",
    ringColor1: "rgba(47,207,135,.2)",
    ringColor2: "rgba(47,207,135,.08)",
    dotColor: "#2fcf87",
  },
  {
    num: "03",
    icon: GraduationCap,
    color: "#b58cff",
    colorLight: "rgba(181,140,255,.1)",
    colorGlow: "rgba(181,140,255,.3)",
    title: "Begin Learning",
    desc: "Enroll in your tailored monthly plan and start your transformative journey toward Quranic excellence.",
    tag: "Start Journey",
    ringColor1: "rgba(181,140,255,.2)",
    ringColor2: "rgba(181,140,255,.08)",
    dotColor: "#b58cff",
  },
];

export default function HowItWorksSection() {
  return (
    <>
      <style>{sectionStyles}</style>

      <section
        className="hiw-section-pad"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 0%, #0a2d1a 0%, #030d08 60%), #030d08",
          padding: "120px 24px 140px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        {/* hex tile bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath fill='none' stroke='%23ffffff' stroke-width='0.3' opacity='0.07' d='M40 4 L76 24 L76 56 L40 76 L4 56 L4 24Z'/%3E%3C/svg%3E")`,
            pointerEvents: "none",
          }}
        />

        {/* ambient glows */}
        <div
          className="glow-circle"
          style={{
            position: "absolute",
            top: "10%",
            left: "15%",
            width: "clamp(200px, 35vw, 500px)",
            height: "clamp(200px, 35vw, 500px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,151,58,.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="glow-circle-2"
          style={{
            position: "absolute",
            bottom: "5%",
            right: "10%",
            width: "clamp(150px, 28vw, 400px)",
            height: "clamp(150px, 28vw, 400px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(47,207,135,.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* top gold rule */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(201,151,58,.5), transparent)",
          }}
        />

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* ── Section Header ── */}
          <div
            className="hiw-header-mb"
            style={{ textAlign: "center", marginBottom: 88 }}
          >
            <div
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
                  width: "clamp(32px, 5vw, 64px)",
                  background:
                    "linear-gradient(90deg, transparent, rgba(201,151,58,.6))",
                }}
              />
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "rgba(201,151,58,.4)", fontSize: 8 }}>
                  ✦
                </span>
                <span style={{ color: "#c9973a", fontSize: 12 }}>✦</span>
                <span style={{ color: "rgba(201,151,58,.4)", fontSize: 8 }}>
                  ✦
                </span>
              </div>
              <div
                style={{
                  height: 1,
                  width: "clamp(32px, 5vw, 64px)",
                  background:
                    "linear-gradient(90deg, rgba(201,151,58,.6), transparent)",
                }}
              />
            </div>

            <p
              style={{
                fontFamily: "'Cinzel', serif",
                color: "#c9973a",
                fontSize: "clamp(9px, 1.5vw, 11px)",
                fontWeight: 700,
                letterSpacing: ".28em",
                textTransform: "uppercase",
                margin: "0 0 18px",
              }}
            >
              Simple Process
            </p>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(28px, 4.5vw, 58px)",
                fontWeight: 300,
                color: "#fff",
                margin: 0,
                lineHeight: 1.12,
                letterSpacing: "-.01em",
              }}
            >
              Start Your Journey in{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #f5d98e 0%, #c9973a 60%, #e4b558 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                3 Simple Steps
              </em>
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,.38)",
                marginTop: 18,
                fontSize: "clamp(13px, 2vw, 16px)",
                maxWidth: 480,
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: 1.8,
              }}
            >
              Experience our teaching methodology with a completely zero-risk
              free trial evaluation class.
            </p>
          </div>

          {/* ── Cards Grid ── */}
          <div className="hiw-grid">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={idx}>
                  <div
                    className="hiw-card"
                    style={{
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(255,255,255,.07)",
                      borderRadius: 28,
                      position: "relative",
                      overflow: "hidden",
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    {/* inner padding wrapper */}
                    <div
                      className="hiw-card-inner"
                      style={{ padding: "52px 36px 44px", textAlign: "center" }}
                    >
                      {/* top accent bar with shimmer */}
                      <div
                        className="shimmer-bar"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 3,
                          background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
                          overflow: "hidden",
                        }}
                      />

                      {/* background step number */}
                      <div
                        className="step-number-bg"
                        style={{
                          position: "absolute",
                          top: -10,
                          left: 14,
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "clamp(72px, 10vw, 120px)",
                          fontWeight: 700,
                          lineHeight: 1,
                          color: step.color,
                          userSelect: "none",
                          pointerEvents: "none",
                        }}
                      >
                        {step.num}
                      </div>

                      {/* inner corner glow */}
                      <div
                        style={{
                          position: "absolute",
                          top: -40,
                          right: -40,
                          width: 160,
                          height: 160,
                          borderRadius: "50%",
                          background: `radial-gradient(circle, ${step.colorLight} 0%, transparent 70%)`,
                          pointerEvents: "none",
                        }}
                      />

                      {/* animated icon assembly */}
                      <div
                        style={{
                          position: "relative",
                          width: "clamp(80px, 12vw, 110px)",
                          height: "clamp(80px, 12vw, 110px)",
                          margin: "0 auto 32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          className="icon-ring-outer"
                          style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "50%",
                            border: `1px dashed ${step.ringColor1}`,
                          }}
                        />
                        <div
                          className="icon-ring-inner"
                          style={{
                            position: "absolute",
                            inset: 12,
                            borderRadius: "50%",
                            border: `1px solid ${step.ringColor2}`,
                          }}
                        />
                        {/* orbiting dot 1 */}
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: 0,
                            height: 0,
                          }}
                        >
                          <div
                            className="orbit-dot"
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: step.dotColor,
                              boxShadow: `0 0 10px ${step.dotColor}`,
                              marginLeft: -3.5,
                              marginTop: -3.5,
                            }}
                          />
                        </div>
                        {/* orbiting dot 2 */}
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: 0,
                            height: 0,
                          }}
                        >
                          <div
                            className="orbit-dot-2"
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              background: step.dotColor,
                              opacity: 0.5,
                              marginLeft: -2,
                              marginTop: -2,
                            }}
                          />
                        </div>
                        {/* icon container */}
                        <div
                          className="icon-pulse"
                          style={{
                            width: "clamp(52px, 8vw, 68px)",
                            height: "clamp(52px, 8vw, 68px)",
                            borderRadius: "50%",
                            background: `radial-gradient(circle at 35% 35%, ${step.colorLight}, rgba(0,0,0,.3))`,
                            border: `1.5px solid ${step.color}40`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            zIndex: 2,
                            boxShadow: `0 0 30px ${step.colorGlow}, inset 0 1px 0 rgba(255,255,255,.08)`,
                          }}
                        >
                          <Icon
                            size={24}
                            color={step.color}
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>

                      {/* step tag */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "4px 14px",
                          borderRadius: 100,
                          background: `${step.color}18`,
                          border: `1px solid ${step.color}35`,
                          marginBottom: 14,
                        }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: step.color,
                            display: "block",
                            boxShadow: `0 0 6px ${step.color}`,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: ".2em",
                            color: step.color,
                            textTransform: "uppercase",
                          }}
                        >
                          {step.tag}
                        </span>
                      </div>

                      {/* title */}
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "clamp(20px, 3vw, 24px)",
                          fontWeight: 700,
                          color: "#fff",
                          margin: "0 0 12px",
                          lineHeight: 1.2,
                        }}
                      >
                        {step.title}
                      </h3>

                      {/* divider */}
                      <div
                        style={{
                          width: 36,
                          height: 1,
                          background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
                          margin: "0 auto 16px",
                        }}
                      />

                      {/* desc */}
                      <p
                        style={{
                          color: "rgba(255,255,255,.42)",
                          lineHeight: 1.8,
                          margin: 0,
                          fontSize: "clamp(13px, 1.8vw, 14.5px)",
                        }}
                      >
                        {step.desc}
                      </p>

                      {/* bottom gradient fade */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 60,
                          background: `linear-gradient(to top, ${step.color}06, transparent)`,
                          borderRadius: "0 0 28px 28px",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Vertical connector between cards (shown on tablet/mobile only) */}
                  {idx < 2 && (
                    <div
                      className="hiw-connector-v"
                      style={{
                        display: "none",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 48,
                        margin: "-8px 0",
                        position: "relative",
                        zIndex: 5,
                      }}
                    >
                      <svg
                        width="40"
                        height="48"
                        viewBox="0 0 40 48"
                        fill="none"
                      >
                        <path
                          d="M20 4 Q20 24 20 44"
                          stroke="url(#vcg)"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                          style={{
                            strokeDashoffset: 80,
                            animation: "vertConnectorFlow 2s linear infinite",
                          }}
                        />
                        <polygon
                          points="20,44 14,36 26,36"
                          fill="rgba(201,151,58,.45)"
                        />
                        <defs>
                          <linearGradient id="vcg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(201,151,58,0)" />
                            <stop
                              offset="50%"
                              stopColor="rgba(201,151,58,.5)"
                            />
                            <stop
                              offset="100%"
                              stopColor="rgba(201,151,58,0)"
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              );
            })}

            {/* Horizontal SVG connector arrows (desktop only) */}
            {[0, 1].map((i) => (
              <div
                key={i}
                className="hiw-connector-h"
                style={{
                  position: "absolute",
                  top: 86,
                  right: "auto",
                  left: `calc(${(i + 1) * 33.33}% - 36px)`,
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              >
                <svg width="72" height="40" viewBox="0 0 72 40" fill="none">
                  <path
                    d="M4 20 Q36 4 68 20"
                    stroke="url(#cg)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    style={{
                      strokeDashoffset: 120,
                      animation: "connectorFlow 2.5s linear infinite",
                    }}
                  />
                  <polygon
                    points="68,20 60,14 60,26"
                    fill="rgba(201,151,58,.45)"
                  />
                  <defs>
                    <linearGradient id="cg" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(201,151,58,0)" />
                      <stop offset="50%" stopColor="rgba(201,151,58,.5)" />
                      <stop offset="100%" stopColor="rgba(201,151,58,0)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            ))}
          </div>

          {/* ── Bottom CTA row ── */}
          <div
            className="hiw-cta-row"
            style={{
              marginTop: "clamp(40px, 6vw, 72px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
            }}
          >
            <div
              className="hiw-cta-line"
              style={{
                height: 1,
                width: 80,
                background:
                  "linear-gradient(90deg, transparent, rgba(201,151,58,.4))",
              }}
            />
            <Link
              to="/book-free-trial"
              className="hiw-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background:
                  "linear-gradient(135deg, #e4b558 0%, #c9973a 50%, #a36c18 100%)",
                color: "#030d08",
                padding: "clamp(13px, 2vw, 16px) clamp(24px, 4vw, 40px)",
                borderRadius: 14,
                fontFamily: "'Cinzel', serif",
                fontWeight: 700,
                fontSize: "clamp(11px, 1.8vw, 13px)",
                letterSpacing: ".08em",
                textDecoration: "none",
                boxShadow:
                  "0 8px 32px rgba(201,151,58,.4), inset 0 1px 0 rgba(255,255,255,.25)",
                transition: "all .3s",
              }}
            >
              ✦ Book Your Free Trial
              <ArrowRight size={16} />
            </Link>
            <div
              className="hiw-cta-line"
              style={{
                height: 1,
                width: 80,
                background:
                  "linear-gradient(90deg, rgba(201,151,58,.4), transparent)",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
