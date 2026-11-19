import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Clock, CalendarDays } from "lucide-react";
import { BLOG_POSTS, getBlogPost, type BlogBlock, type BlogPost } from "../data/blog";
import { COURSES } from "../data";
import NotFoundPage from "./NotFound";

const wrap: React.CSSProperties = {
  maxWidth: 1120,
  margin: "0 auto",
  padding: "0 20px",
};

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[m - 1]} ${d}, ${y}`;
}

function Meta({ post }: { post: BlogPost }) {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 14, color: "var(--page-fg-muted)" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <CalendarDays size={15} aria-hidden="true" />
        <time dateTime={post.updated}>{formatDate(post.updated)}</time>
      </span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <Clock size={15} aria-hidden="true" />
        {post.readMinutes} min read
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// /blog/ — list of articles
// ─────────────────────────────────────────────────────────────────────────────
export function BlogIndex() {
  return (
    <div style={{ background: "var(--page-bg)", color: "var(--page-fg)", minHeight: "60vh" }}>
      <section style={{ ...wrap, paddingTop: 140, paddingBottom: 40, textAlign: "center" }}>
        <p style={{ color: "var(--gold)", letterSpacing: "0.2em", fontSize: 12, fontWeight: 700, textTransform: "uppercase", margin: 0 }}>
          Quran Learning Blog
        </p>
        <h1 className="h2" style={{ margin: "14px 0 12px", fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.15 }}>
          Quran Learning Guides <span className="gold-shimmer">for Parents & Students</span>
        </h1>
        <p style={{ maxWidth: 640, margin: "0 auto", color: "var(--page-fg-muted)", fontSize: 17, lineHeight: 1.7 }}>
          Practical, teacher-written guides on reading the Quran, Tajweed, Hifz and teaching children at home.
        </p>
      </section>

      <section style={{ ...wrap, paddingBottom: 90 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              style={{
                background: "var(--page-card-bg)",
                border: "1px solid var(--page-card-border)",
                borderRadius: 18,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Link to={`/blog/${post.slug}/`} aria-label={post.title}>
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  width={640}
                  height={360}
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }}
                />
              </Link>
              <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                <Meta post={post} />
                <h2 style={{ fontSize: 20, lineHeight: 1.35, margin: 0 }}>
                  <Link to={`/blog/${post.slug}/`} style={{ color: "var(--page-fg)", textDecoration: "none" }}>
                    {post.title}
                  </Link>
                </h2>
                <p style={{ margin: 0, color: "var(--page-fg-muted)", lineHeight: 1.65, fontSize: 15 }}>{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}/`}
                  style={{ marginTop: "auto", color: "var(--gold)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}
                >
                  Read the guide <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// /blog/:slug/ — single article
// ─────────────────────────────────────────────────────────────────────────────
const prose: React.CSSProperties = { fontSize: 17.5, lineHeight: 1.8, color: "var(--page-fg)", margin: "0 0 20px" };

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return <p style={prose}>{block.text}</p>;
    case "h2":
      return (
        <h2 id={block.id} style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)", lineHeight: 1.3, margin: "40px 0 14px", scrollMarginTop: 110 }}>
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 style={{ fontSize: 20, margin: "28px 0 10px" }}>{block.text}</h3>;
    case "ul":
      return (
        <ul style={{ ...prose, paddingLeft: 24 }}>
          {block.items.map((item) => (
            <li key={item} style={{ marginBottom: 10 }}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol style={{ ...prose, paddingLeft: 24 }}>
          {block.items.map((item) => (
            <li key={item} style={{ marginBottom: 10 }}>{item}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div style={{ overflowX: "auto", margin: "8px 0 28px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16 }}>
            {block.caption && (
              <caption style={{ textAlign: "left", color: "var(--page-fg-muted)", fontSize: 14, marginBottom: 8 }}>{block.caption}</caption>
            )}
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" style={{ textAlign: "left", padding: "10px 12px", borderBottom: "2px solid var(--gold)", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      lang={/[؀-ۿ]/.test(cell) ? "ar" : undefined}
                      style={{
                        padding: "10px 12px",
                        borderBottom: "1px solid var(--page-card-border)",
                        fontSize: /[؀-ۿ]/.test(cell) ? 26 : undefined,
                        fontFamily: /[؀-ۿ]/.test(cell) ? "'Amiri', serif" : undefined,
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "tip":
      return (
        <div
          style={{
            borderLeft: "4px solid var(--gold)",
            background: "var(--page-card-bg)",
            padding: "16px 20px",
            borderRadius: 10,
            margin: "6px 0 26px",
            fontSize: 17,
            lineHeight: 1.7,
          }}
        >
          {block.text}
        </div>
      );
    case "cta":
      return (
        <div
          style={{
            border: "1px solid var(--gold)",
            borderRadius: 16,
            padding: "22px 24px",
            margin: "30px 0",
            background: "var(--page-card-bg)",
          }}
        >
          <p style={{ margin: "0 0 14px", fontSize: 17, lineHeight: 1.7 }}>{block.text}</p>
          <Link
            to={block.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, var(--gold-m), var(--gold))",
              color: "var(--on-gold)",
              padding: "12px 22px",
              borderRadius: 999,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {block.label} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      );
  }
}

export function BlogArticle() {
  const { slug = "" } = useParams();
  const post = getBlogPost(slug);
  if (!post) return <NotFoundPage />;

  const course = COURSES.find((c) => c.slug === post.relatedCourse);
  const toc = post.body.filter((b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2" && Boolean(b.id));
  const more = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div style={{ background: "var(--page-bg)", color: "var(--page-fg)" }}>
      <article style={{ maxWidth: 780, margin: "0 auto", padding: "130px 20px 60px" }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 14, color: "var(--page-fg-muted)", marginBottom: 18 }}>
          <Link to="/" style={{ color: "inherit" }}>Home</Link> {" / "}
          <Link to="/blog/" style={{ color: "inherit" }}>Blog</Link>
        </nav>
        <h1 style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)", lineHeight: 1.2, margin: "0 0 16px" }}>{post.title}</h1>
        <Meta post={post} />
        <p style={{ fontSize: 14, color: "var(--page-fg-muted)", margin: "8px 0 26px" }}>By {post.author} teaching team</p>
        <img
          src={post.image}
          alt={post.imageAlt}
          width={780}
          height={440}
          decoding="async"
          fetchPriority="high"
          style={{ width: "100%", height: "auto", aspectRatio: "16 / 9", objectFit: "cover", borderRadius: 18, marginBottom: 30 }}
        />

        {toc.length > 2 && (
          <nav aria-label="In this article" style={{ background: "var(--page-card-bg)", border: "1px solid var(--page-card-border)", borderRadius: 14, padding: "18px 22px", marginBottom: 30 }}>
            <p style={{ margin: "0 0 10px", fontWeight: 700 }}>In this article</p>
            <ol style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9 }}>
              {toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} style={{ color: "var(--gold)" }}>{h.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {post.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}

        {post.faqs && post.faqs.length > 0 && (
          <section aria-labelledby="faq-heading" style={{ marginTop: 44 }}>
            <h2 id="faq-heading" style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)", margin: "0 0 16px" }}>Frequently asked questions</h2>
            {post.faqs.map((f) => (
              <div key={f.q} style={{ borderBottom: "1px solid var(--page-card-border)", padding: "14px 0" }}>
                <h3 style={{ fontSize: 18, margin: "0 0 6px" }}>{f.q}</h3>
                <p style={{ ...prose, margin: 0, fontSize: 16.5, color: "var(--page-fg-muted)" }}>{f.a}</p>
              </div>
            ))}
          </section>
        )}

        <section style={{ marginTop: 50, display: "grid", gap: 16 }}>
          {course && (
            <p style={{ margin: 0, fontSize: 16 }}>
              Related course:{" "}
              <Link to={`/course/${course.slug}/`} style={{ color: "var(--gold)", fontWeight: 600 }}>
                {course.title}
              </Link>{" "}
              · <Link to="/book-free-trial/" style={{ color: "var(--gold)", fontWeight: 600 }}>Book a free trial class</Link>
            </p>
          )}
          {more.length > 0 && (
            <div>
              <p style={{ margin: "10px 0 8px", fontWeight: 700 }}>More guides</p>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9 }}>
                {more.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/blog/${p.slug}/`} style={{ color: "var(--gold)" }}>{p.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </article>
    </div>
  );
}
