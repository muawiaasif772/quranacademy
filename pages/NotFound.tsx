import React from "react";
import { Link } from "react-router-dom";

/** Global 404 for unknown routes (noindex via RouteSeo / resolveSeo). */
const NotFoundPage: React.FC = () => (
  <div
    style={{
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 24px",
      textAlign: "center",
      fontFamily: "'Outfit', sans-serif",
      background: "var(--page-bg)",
      color: "var(--page-fg)",
    }}
  >
    <p style={{ fontSize: 14, letterSpacing: "0.2em", color: "var(--page-fg-subtle)", margin: "0 0 8px" }}>
      404
    </p>
    <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", margin: "0 0 12px", color: "var(--page-fg)" }}>
      Page not found
    </h1>
    <p style={{ maxWidth: 420, color: "var(--page-fg-muted)", lineHeight: 1.6, margin: "0 0 28px" }}>
      The page you requested does not exist. Browse our online Quran courses or book a free trial
      to get started.
    </p>
    <nav style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
      <Link to="/" style={{ color: "#047857", fontWeight: 600 }}>Home</Link>
      <Link to="/courses" style={{ color: "#047857", fontWeight: 600 }}>Courses</Link>
      <Link to="/book-free-trial" style={{ color: "#047857", fontWeight: 600 }}>Free trial</Link>
      <Link to="/contact" style={{ color: "#047857", fontWeight: 600 }}>Contact</Link>
    </nav>
  </div>
);

export default NotFoundPage;
