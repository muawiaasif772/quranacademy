import React from "react";
import { Star, Users, ShieldCheck, BookOpen, Globe } from "lucide-react";

const whyUsStyles = `
  /* ── Why Us responsive grid ── */
  .whyus-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(32px, 6vw, 80px);
    align-items: center;
  }

  /* Stack on tablet/mobile */
  @media (max-width: 900px) {
    .whyus-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }

  /* ── Image height ── */
  .whyus-image {
    width: 100%;
    height: clamp(260px, 45vw, 520px);
    object-fit: cover;
    display: block;
  }

  /* ── Badge: negative left offset only on desktop ── */
  .whyus-badge {
    position: absolute;
    bottom: 28px;
    left: -24px;
    background: linear-gradient(135deg, #064e3b, #043d2f);
    border: 1px solid rgba(201,168,76,.35);
    border-radius: 18px;
    padding: clamp(12px, 2.5vw, 20px) clamp(14px, 2.5vw, 28px);
    box-shadow: 0 16px 40px rgba(0,0,0,.25);
    z-index: 2;
  }

  /* On mobile, badge goes inside (no negative offset) */
  @media (max-width: 900px) {
    .whyus-badge {
      left: 12px !important;
      bottom: 12px !important;
    }
  }

  /* ── Text side top spacing on mobile (since image is above) ── */
  @media (max-width: 900px) {
    .whyus-text-side {
      padding-top: 0;
    }
  }

  /* ── section-divider centering on mobile ── */
  @media (max-width: 900px) {
    .whyus-section-divider {
      margin-left: auto !important;
      margin-right: auto !important;
    }
    .whyus-text-side {
      text-align: center;
    }
    .whyus-feature-item {
      text-align: left;
    }
    .whyus-heading-line {
      margin-left: auto !important;
      margin-right: auto !important;
    }
    .whyus-label {
      display: block;
      text-align: center;
    }
  }
`;

const features = [
  {
    title: "1-on-1 Personalized Attention",
    desc: "Each student gets the undivided focus of their tutor, ensuring rapid progress.",
    icon: <Users size={20} />,
  },
  {
    title: "Male & Female Tutors Available",
    desc: "We prioritize your comfort with separate classes for ladies and children.",
    icon: <ShieldCheck size={20} />,
  },
  {
    title: "Certified Al-Azhar Scholars",
    desc: "Our tutors are Ijazah holders and Al-Azhar graduates with years of experience.",
    icon: <BookOpen size={20} />,
  },
  {
    title: "24/7 Global Availability",
    desc: "No matter where you are, we have a tutor available in your timezone.",
    icon: <Globe size={20} />,
  },
];

export default function WhyUsSection() {
  return (
    <>
      <style>{whyUsStyles}</style>

      <section
        style={{
          background:
            "linear-gradient(160deg, #f9f5ec 0%, #fff8ee 50%, #f0faf5 100%)",
          position: "relative",
          overflow: "hidden",
          padding: "clamp(60px, 10vw, 100px) clamp(16px, 4vw, 24px)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="whyus-grid">
            {/* ── Image side ── */}
            <div style={{ position: "relative" }}>
              {/* glow backdrop */}
              <div
                style={{
                  position: "absolute",
                  inset: -16,
                  background: "linear-gradient(135deg, #f5dfa0, #6ee7b7)",
                  opacity: 0.15,
                  borderRadius: 32,
                  filter: "blur(24px)",
                }}
              />

              {/* image frame */}
              <div
                style={{
                  position: "relative",
                  borderRadius: 28,
                  overflow: "hidden",
                  border: "2px solid rgba(201,168,76,.25)",
                  boxShadow: "0 24px 60px rgba(6,78,59,.12)",
                }}
              >
                <img
                  src="/assets/images/closeup-of-muslim-children-in-elegant-attire-reciting-the-quran-showcasing-their-devotion-and-cultural-heritage-generated-image-photo.jpg"
                  alt="Students learning Quran"
                  className="whyus-image"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(6,78,59,.35) 0%, transparent 50%)",
                  }}
                />
              </div>

              {/* overlay rating badge */}
              <div className="whyus-badge">
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill="#e2c06b" color="#e2c06b" />
                  ))}
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#fff",
                    fontSize: "clamp(16px, 2.5vw, 20px)",
                    fontWeight: 700,
                    marginTop: 6,
                  }}
                >
                  4.9 / 5 Stars
                </div>
                <div style={{ color: "#7aaa94", fontSize: 13, marginTop: 2 }}>
                  Based on 2,400+ Reviews
                </div>
              </div>
            </div>

            {/* ── Text side ── */}
            <div className="whyus-text-side">
              {/* gold section divider bar */}
              <div
                className="whyus-section-divider"
                style={{
                  height: 3,
                  background:
                    "linear-gradient(90deg, transparent, #c9a84c, transparent)",
                  width: 80,
                  borderRadius: 2,
                  marginBottom: 16,
                }}
              />

              <p
                className="whyus-label"
                style={{
                  color: "#c9a84c",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  margin: "0 0 12px",
                }}
              >
                Why Choose Us
              </p>

              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 3.5vw, 44px)",
                  fontWeight: 700,
                  color: "#0d1f1a",
                  margin: "0 0 14px",
                  lineHeight: 1.2,
                }}
              >
                Why Thousands of Families
                <br />
                <em style={{ color: "#065f46" }}>Trust Alif Laam Meem</em>
              </h2>

              <div
                className="whyus-heading-line"
                style={{
                  width: 60,
                  height: 2,
                  background: "linear-gradient(90deg, #047857, transparent)",
                  marginBottom: 36,
                }}
              />

              {/* feature list */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(16px, 3vw, 24px)",
                }}
              >
                {features.map((item, idx) => (
                  <div
                    key={idx}
                    className="whyus-feature-item"
                    style={{
                      display: "flex",
                      gap: 18,
                      alignItems: "flex-start",
                    }}
                  >
                    {/* icon box */}
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        flexShrink: 0,
                        background: "linear-gradient(135deg, #064e3b, #043d2f)",
                        border: "1px solid rgba(201,168,76,.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#e2c06b",
                        boxShadow: "0 4px 16px rgba(6,78,59,.2)",
                      }}
                    >
                      {item.icon}
                    </div>

                    {/* text */}
                    <div>
                      <h4
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "clamp(15px, 2vw, 17px)",
                          fontWeight: 700,
                          color: "#0d1f1a",
                          margin: "0 0 4px",
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        style={{
                          color: "#5a8a78",
                          margin: 0,
                          fontSize: 14,
                          lineHeight: 1.65,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
