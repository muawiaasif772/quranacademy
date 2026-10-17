import React from "react";
import { Globe, Award, Clock, Heart } from "lucide-react";

const statsStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,600&family=Cinzel:wght@400;600;700&family=Nunito:wght@400;500;600;700&display=swap');

  @keyframes countUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes iconFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33%       { transform: translateY(-6px) rotate(3deg); }
    66%       { transform: translateY(-3px) rotate(-2deg); }
  }
  @keyframes ringRotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes ringRotateRev {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
  @keyframes glowPop {
    0%, 100% { box-shadow: 0 0 20px rgba(201,151,58,.2), inset 0 1px 0 rgba(255,255,255,.06); }
    50%       { box-shadow: 0 0 40px rgba(201,151,58,.4), inset 0 1px 0 rgba(255,255,255,.1); }
  }
  @keyframes statEntrance {
    from { opacity: 0; transform: translateY(30px) scale(.95); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes shimmerSweep {
    0%   { left: -100%; }
    100% { left: 200%; }
  }
  @keyframes borderPulse {
    0%, 100% { opacity: .15; }
    50%       { opacity: .4; }
  }
  @keyframes numberGlow {
    0%, 100% { text-shadow: 0 0 20px rgba(201,151,58,.3); }
    50%       { text-shadow: 0 0 40px rgba(201,151,58,.7), 0 0 80px rgba(201,151,58,.2); }
  }

  .stat-card {
    animation: statEntrance .7s cubic-bezier(.16,1,.3,1) both;
    transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease, border-color .35s ease;
    cursor: default;
    background: var(--page-card-bg);
    border: 1px solid var(--page-card-border);
    border-radius: 20px;
    box-shadow: 0 10px 32px var(--page-shadow);
  }
  html[data-theme="dark"] .stat-card,
  html:not([data-theme="light"]) .stat-card {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.09);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  }
  html[data-theme="light"] .stat-card {
    background: linear-gradient(180deg, #ffffff 0%, #f8faf9 100%);
    border-color: rgba(13, 46, 36, 0.12);
  }
  .stat-card:hover {
    border-color: rgba(201, 151, 58, 0.35);
    box-shadow: 0 20px 48px var(--page-shadow), 0 0 0 1px rgba(201, 151, 58, 0.12);
  }
  .stat-card:nth-child(1) { animation-delay: .05s; }
  .stat-card:nth-child(2) { animation-delay: .15s; }
  .stat-card:nth-child(3) { animation-delay: .25s; }
  .stat-card:nth-child(4) { animation-delay: .35s; }

  .stat-card:hover { transform: translateY(-6px) scale(1.02); }
  .stat-card:hover .stat-icon-wrap { animation: glowPop .8s ease-in-out infinite; }
  .stat-card:hover .stat-icon-lucide { animation: iconFloat 2s ease-in-out infinite; }
  .stat-card:hover .stat-ring-outer { animation-duration: 3s; }
  .stat-card:hover .stat-value { animation: numberGlow 1.5s ease-in-out infinite; }

  .stat-icon-lucide { animation: iconFloat 5s ease-in-out infinite; }
  .stat-ring-outer  { animation: ringRotate 14s linear infinite; }
  .stat-ring-inner  { animation: ringRotateRev 9s linear infinite; }

  .stat-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 700;
    line-height: 1;
    background: linear-gradient(135deg, #f5d98e 0%, #e4b558 40%, #c9973a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transition: all .3s;
  }

  .stat-shimmer::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    width: 40%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.06), transparent);
    animation: shimmerSweep 3.5s ease-in-out infinite;
  }

  .stat-border-pulse {
    animation: borderPulse 3s ease-in-out infinite;
  }

  /* ── Responsive stats grid ── */

  /* Default: 4 columns on large screens */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(12px, 2vw, 20px);
    padding: clamp(28px, 4vw, 44px) 0;
  }

  .stat-right-divider {
    display: none !important;
  }

  .stat-icon-wrap {
    background: radial-gradient(
      circle at 35% 35%,
      var(--stat-accent-dim, rgba(201, 151, 58, 0.15)),
      rgba(0, 0, 0, 0.25)
    ) !important;
  }
  html[data-theme="light"] .stat-icon-wrap {
    background: linear-gradient(
      145deg,
      #ffffff 0%,
      var(--stat-accent-dim, rgba(201, 151, 58, 0.12)) 100%
    ) !important;
    border-width: 2px !important;
    box-shadow: 0 8px 20px var(--page-shadow) !important;
  }

  .stat-label {
    color: var(--on-surface);
    font-weight: 700;
  }
  html[data-theme="dark"] .stat-label,
  html:not([data-theme="light"]) .stat-label {
    color: var(--on-surface-muted);
  }

  /* 2x2 on tablet */
  @media (max-width: 900px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* 1 column stacked on mobile */
  @media (max-width: 520px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    .stat-card-inner {
      padding: 36px 24px 32px !important;
    }
  }

  /* Tablet padding adjustment */
  @media (max-width: 900px) and (min-width: 521px) {
    .stat-card-inner {
      padding: 40px 20px 36px !important;
    }
  }

  .stats-hex-bg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath fill='none' stroke='%23ffffff' stroke-width='.25' opacity='.05' d='M30 3 L57 18 L57 42 L30 57 L3 42 L3 18Z'/%3E%3C/svg%3E");
  }
  html[data-theme="light"] .stats-hex-bg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath fill='none' stroke='%230d2e24' stroke-width='.35' opacity='.06' d='M30 3 L57 18 L57 42 L30 57 L3 42 L3 18Z'/%3E%3C/svg%3E");
  }
`;

const stats = [
  {
    value: "5,000+",
    label: "Global Students",
    sub: "Across 50+ countries",
    icon: Globe,
    color: "#c9973a",
    colorDim: "rgba(201,151,58,.12)",
    colorGlow: "rgba(201,151,58,.3)",
    ringColor: "rgba(201,151,58,.2)",
    iconDelay: "0s",
    showDivider: true,
  },
  {
    value: "100+",
    label: "Certified Tutors",
    sub: "Al-Azhar graduates",
    icon: Award,
    color: "#2fcf87",
    colorDim: "rgba(47,207,135,.1)",
    colorGlow: "rgba(47,207,135,.28)",
    ringColor: "rgba(47,207,135,.18)",
    iconDelay: "-1.5s",
    showDivider: true,
  },
  {
    value: "24/7",
    label: "Flexible Timing",
    sub: "Any timezone, anytime",
    icon: Clock,
    color: "#7eb8ff",
    colorDim: "rgba(126,184,255,.1)",
    colorGlow: "rgba(126,184,255,.28)",
    ringColor: "rgba(126,184,255,.18)",
    iconDelay: "-3s",
    showDivider: true,
  },
  {
    value: "100%",
    label: "Satisfaction",
    sub: "Risk-free free trial",
    icon: Heart,
    color: "#ff8fa3",
    colorDim: "rgba(255,143,163,.1)",
    colorGlow: "rgba(255,143,163,.28)",
    ringColor: "rgba(255,143,163,.18)",
    iconDelay: "-4.5s",
    showDivider: false,
  },
];

export default function StatsRibbon() {
  return (
    <>
      <style>{statsStyles}</style>

      <section
        style={{
          background: "var(--stats-ribbon-bg)",
          position: "relative",
          overflow: "hidden",
          padding: "0 clamp(12px, 3vw, 24px)",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        {/* top gold rule */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(201,151,58,.45), rgba(201,151,58,.8), rgba(201,151,58,.45), transparent)",
          }}
        />
        {/* bottom gold rule */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(201,151,58,.45), rgba(201,151,58,.8), rgba(201,151,58,.45), transparent)",
          }}
        />

        {/* subtle hex bg */}
        <div
          className="stats-hex-bg"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.5,
          }}
        />

        {/* ambient center glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 800,
            height: 200,
            background:
              "radial-gradient(ellipse, rgba(201,151,58,.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="stats-grid">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="stat-card stat-shimmer"
                  style={
                    {
                      position: "relative",
                      overflow: "hidden",
                      textAlign: "center",
                      "--stat-accent": s.color,
                      "--stat-accent-dim": s.colorDim,
                    } as React.CSSProperties
                  }
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                      opacity: 0.85,
                    }}
                  />
                  {/* inner padding wrapper — targeted by responsive CSS */}
                  <div
                    className="stat-card-inner"
                    style={{ padding: "44px clamp(16px, 3vw, 28px) 36px" }}
                  >

                    {/* inner card glow */}
                    <div
                      style={{
                        position: "absolute",
                        top: -30,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 180,
                        height: 120,
                        background: `radial-gradient(ellipse, ${s.colorDim} 0%, transparent 70%)`,
                        pointerEvents: "none",
                      }}
                    />

                    {/* ── animated icon assembly ── */}
                    <div
                      style={{
                        position: "relative",
                        width: "clamp(64px, 10vw, 84px)",
                        height: "clamp(64px, 10vw, 84px)",
                        margin: "0 auto 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* outer dashed orbit */}
                      <div
                        className="stat-ring-outer"
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "50%",
                          border: `1px dashed ${s.ringColor}`,
                        }}
                      />
                      {/* inner solid orbit */}
                      <div
                        className="stat-ring-inner"
                        style={{
                          position: "absolute",
                          inset: 10,
                          borderRadius: "50%",
                          border: `1px solid ${s.colorDim}`,
                        }}
                      />
                      {/* icon circle */}
                      <div
                        className="stat-icon-wrap"
                        style={{
                          width: "clamp(42px, 7vw, 56px)",
                          height: "clamp(42px, 7vw, 56px)",
                          borderRadius: "50%",
                          border: `2px solid ${s.color}45`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          zIndex: 2,
                          boxShadow: `0 0 20px ${s.colorGlow}`,
                        }}
                      >
                        <div
                          className="stat-icon-lucide"
                          style={{ animationDelay: s.iconDelay }}
                        >
                          <Icon size={20} color={s.color} strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>

                    {/* value */}
                    <div className="stat-value">{s.value}</div>

                    {/* mini divider */}
                    <div
                      style={{
                        width: 28,
                        height: 1,
                        margin: "12px auto 10px",
                        background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                      }}
                    />

                    {/* label */}
                    <div
                      className="stat-label"
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "clamp(10px, 1.5vw, 12px)",
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        marginBottom: 5,
                      }}
                    >
                      {s.label}
                    </div>

                    {/* sub-label */}
                    <div
                      style={{
                        color: "var(--on-surface-subtle)",
                        fontSize: "clamp(10px, 1.2vw, 11px)",
                        letterSpacing: ".04em",
                      }}
                    >
                      {s.sub}
                    </div>

                    {/* bottom glow bleed */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background: `linear-gradient(90deg, transparent, ${s.color}25, transparent)`,
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
