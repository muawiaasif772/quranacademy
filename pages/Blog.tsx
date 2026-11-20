import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Clock, CalendarDays, BookOpen, CheckCircle2 } from "lucide-react";
import { BLOG_POSTS, getBlogPost, type BlogBlock, type BlogPost } from "../data/blog";
import { COURSES } from "../data";
import NotFoundPage from "./NotFound";

/* Same design language as the other pages (FAQ, Pricing…): hero panel with
   hex pattern + gold top border, Cinzel label row, Cormorant headings, Nunito
   body text. All colours come from theme variables so light + dark both work. */
const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,600&family=Cinzel:wght@400;600;700&family=Nunito:wght@400;500;600;700;800&display=swap');

  .blog-root { background: var(--page-bg); color: var(--page-fg); font-family: 'Nunito', sans-serif; }
  .blog-hex {
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath fill='none' stroke='%23c9973a' stroke-width='.35' opacity='.12' d='M40 4L76 24L76 56L40 76L4 56L4 24Z'/%3E%3C/svg%3E");
  }
  @keyframes blogFadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes blogShim { 0%{background-position:-500px 0} 100%{background-position:500px 0} }
  .blog-a1{animation:blogFadeUp .7s cubic-bezier(.16,1,.3,1) both}
  .blog-a2{animation:blogFadeUp .7s .1s cubic-bezier(.16,1,.3,1) both}
  .blog-a3{animation:blogFadeUp .7s .2s cubic-bezier(.16,1,.3,1) both}
  .blog-gold {
    background:linear-gradient(90deg,var(--gold) 0%,var(--gold-m) 40%,var(--gold-lt) 50%,var(--gold-m) 60%,var(--gold) 100%);
    background-size:500px 100%; animation:blogShim 5s linear infinite;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .blog-label { font-family:'Cinzel',serif; font-size:11px; font-weight:700; letter-spacing:.28em; text-transform:uppercase; color:var(--gold); }
  .blog-h { font-family:'Cormorant Garamond',serif; color:var(--page-fg); }

  .blog-card {
    background: var(--page-card-bg); border: 1px solid var(--page-card-border); border-radius: 22px;
    overflow: hidden; display:flex; flex-direction:column; transition: transform .35s, box-shadow .35s, border-color .35s;
  }
  .blog-card:hover { transform: translateY(-6px); border-color: rgba(201,151,58,.35); box-shadow: 0 24px 60px var(--page-shadow); }
  .blog-card img { transition: transform .6s; }
  .blog-card:hover img { transform: scale(1.05); }
  .blog-chip { display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:700; padding:6px 12px; border-radius:999px;
    background: rgba(201,151,58,.12); border:1px solid rgba(201,151,58,.3); color: var(--gold); }

  .blog-grid { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 28px; }
  .blog-feature { display:grid; grid-template-columns: 1.15fr 1fr; }
  @media (max-width: 1024px) { .blog-grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }
  @media (max-width: 760px)  { .blog-grid { grid-template-columns: 1fr; } .blog-feature { grid-template-columns: 1fr; } }

  .post-layout { display:grid; grid-template-columns: minmax(0,1fr) 320px; gap: 56px; align-items:start; }
  .post-aside { position: sticky; top: 110px; display:grid; gap: 20px; }
  @media (max-width: 1024px) { .post-layout { grid-template-columns: 1fr; } .post-aside { position: static; } }

  .post-body p, .post-body li { font-size: 18px; line-height: 1.85; color: var(--page-fg); }
  .post-body p { margin: 0 0 22px; }
  .post-body ul, .post-body ol { margin: 0 0 24px; padding-left: 24px; }
  .post-body li { margin-bottom: 10px; }
  .post-body li::marker { color: var(--gold); font-weight: 700; }
  .post-body h2 { font-family:'Cormorant Garamond',serif; font-weight:700; font-size: clamp(28px,3.4vw,38px); line-height:1.2; margin: 52px 0 16px; scroll-margin-top: 110px; color: var(--page-fg); }
  .post-body h3 { font-size: 21px; margin: 30px 0 10px; color: var(--page-fg); }
  .post-body table { width:100%; border-collapse: collapse; font-size: 16px; }
  .post-body th { text-align:left; padding: 12px 14px; font-family:'Cinzel',serif; font-size:12px; letter-spacing:.12em; text-transform:uppercase; color: var(--gold); border-bottom: 2px solid rgba(201,151,58,.5); white-space: nowrap; }
  .post-body td { padding: 12px 14px; border-bottom: 1px solid var(--page-card-border); color: var(--page-fg); }
  .post-body tbody tr:hover td { background: rgba(201,151,58,.06); }
  .post-body a { color: var(--gold); font-weight: 700; }
  .toc a { color: var(--page-fg-muted); text-decoration:none; font-size:15px; line-height:1.5; display:block; padding:6px 0 6px 12px; border-left:2px solid var(--page-card-border); }
  .toc a:hover { color: var(--gold); border-left-color: var(--gold); }
`;

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[m - 1]} ${d}, ${y}`;
}

function Meta({ post }: { post: BlogPost }) {
  return (
    <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: 14, color: "var(--page-fg-muted)", fontWeight: 600 }}>
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

function courseFor(post: BlogPost) {
  return COURSES.find((c) => c.slug === post.relatedCourse);
}

function Hero({ label, children, sub }: { label: string; children: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <section style={{ background: "var(--hero-panel-bg)", padding: "150px 24px 80px", position: "relative", overflow: "hidden" }}>
      <div className="blog-hex" style={{ position: "absolute", inset: 0 }} />
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",
        }}
      />
      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", textAlign: "center" }}>
        <div className="blog-a1" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 20 }}>
          <div style={{ height: 1, width: 60, background: "linear-gradient(90deg,transparent,rgba(201,151,58,.6))" }} />
          <span style={{ color: "var(--gold)", fontSize: 10 }} aria-hidden="true">✦</span>
          <span className="blog-label">{label}</span>
          <span style={{ color: "var(--gold)", fontSize: 10 }} aria-hidden="true">✦</span>
          <div style={{ height: 1, width: 60, background: "linear-gradient(90deg,rgba(201,151,58,.6),transparent)" }} />
        </div>
        {children}
        {sub}
      </div>
    </section>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  const course = courseFor(post);
  return (
    <article className="blog-card">
      <Link to={`/blog/${post.slug}/`} aria-label={post.title} style={{ display: "block", overflow: "hidden" }}>
        <img
          src={post.image}
          alt={post.imageAlt}
          width={640}
          height={360}
          loading="lazy"
          decoding="async"
          style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block" }}
        />
      </Link>
      <div style={{ padding: "24px 26px 26px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        {course && <span className="blog-chip" style={{ alignSelf: "flex-start" }}><BookOpen size={13} aria-hidden="true" /> {course.title}</span>}
        <h2 className="blog-h" style={{ fontSize: 26, lineHeight: 1.2, fontWeight: 700, margin: 0 }}>
          <Link to={`/blog/${post.slug}/`} style={{ color: "inherit", textDecoration: "none" }}>
            {post.title}
          </Link>
        </h2>
        <p style={{ margin: 0, color: "var(--page-fg-muted)", lineHeight: 1.7, fontSize: 15.5 }}>{post.excerpt}</p>
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Meta post={post} />
          <Link to={`/blog/${post.slug}/`} style={{ color: "var(--gold)", fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none", fontSize: 15 }}>
            Read <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// /blog/ — list of articles
// ─────────────────────────────────────────────────────────────────────────────
export function BlogIndex() {
  const [featured, ...rest] = BLOG_POSTS;
  return (
    <div className="blog-root">
      <style>{pageStyles}</style>
      <Hero
        label="Quran Learning Blog"
        sub={
          <p className="blog-a3" style={{ color: "var(--page-fg-muted)", fontSize: 18, lineHeight: 1.85, maxWidth: 620, margin: "0 auto" }}>
            Teacher-written guides on reading the Quran, Tajweed, Hifz, Arabic and teaching children at home.
          </p>
        }
      >
        <h1 className="blog-h blog-a2" style={{ fontSize: "clamp(38px,5.6vw,72px)", fontWeight: 300, lineHeight: 1.08, margin: "0 0 20px" }}>
          Quran Learning Guides
          <br />
          <span className="blog-gold" style={{ fontWeight: 700 }}>for Parents &amp; Students</span>
        </h1>
      </Hero>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "70px 24px 100px" }}>
        {featured && (
          <article className="blog-card blog-feature" style={{ marginBottom: 36 }}>
            <Link to={`/blog/${featured.slug}/`} aria-label={featured.title} style={{ display: "block", overflow: "hidden", minHeight: 280 }}>
              <img
                src={featured.image}
                alt={featured.imageAlt}
                width={800}
                height={500}
                decoding="async"
                fetchPriority="high"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </Link>
            <div style={{ padding: "clamp(26px,4vw,48px)", display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
              <span className="blog-label">Latest guide</span>
              <h2 className="blog-h" style={{ fontSize: "clamp(30px,3.4vw,42px)", lineHeight: 1.15, fontWeight: 700, margin: 0 }}>
                <Link to={`/blog/${featured.slug}/`} style={{ color: "inherit", textDecoration: "none" }}>{featured.title}</Link>
              </h2>
              <p style={{ margin: 0, color: "var(--page-fg-muted)", fontSize: 17, lineHeight: 1.75 }}>{featured.excerpt}</p>
              <Meta post={featured} />
              <Link
                to={`/blog/${featured.slug}/`}
                style={{
                  alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8, marginTop: 6,
                  background: "linear-gradient(135deg,var(--gold-m),var(--gold))", color: "var(--on-gold)",
                  padding: "13px 26px", borderRadius: 14, fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 13,
                  letterSpacing: ".08em", textDecoration: "none",
                }}
              >
                Read the guide <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </article>
        )}
        <div className="blog-grid">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// /blog/:slug/ — single article
// ─────────────────────────────────────────────────────────────────────────────
const isArabic = (s: string) => /[؀-ۿ]/.test(s);
const hasLatin = (s: string) => /[A-Za-z]/.test(s);
const arabicStyle: React.CSSProperties = { fontSize: 28, fontFamily: "'Amiri', serif", color: "var(--gold)", lineHeight: 1.4 };

/** Table cell text. Pure Arabic → large RTL; mixed Arabic + English → each
 *  Arabic run is isolated in <bdi> so brackets and word order stay correct. */
function Cell({ text }: { text: string }) {
  if (!isArabic(text)) return <>{text}</>;
  if (!hasLatin(text)) {
    return <span lang="ar" dir="rtl" style={arabicStyle}>{text}</span>;
  }
  const parts = text.split(/([؀-ۿ]+(?:\s+[؀-ۿ]+)*)/).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        isArabic(part) ? (
          <bdi key={i} lang="ar" dir="rtl" style={{ ...arabicStyle, fontSize: 24 }}>{part}</bdi>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2 id={block.id}>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "ul":
      return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
    case "ol":
      return <ol>{block.items.map((item) => <li key={item}>{item}</li>)}</ol>;
    case "table":
      return (
        <div style={{ overflowX: "auto", margin: "8px 0 32px", border: "1px solid var(--page-card-border)", borderRadius: 16, background: "var(--page-card-bg)" }}>
          <table>
            {block.caption && (
              <caption style={{ textAlign: "left", color: "var(--page-fg-muted)", fontSize: 14, padding: "14px 14px 4px" }}>{block.caption}</caption>
            )}
            <thead>
              <tr>{block.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>
                      <Cell text={cell} />
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
        <div style={{ borderLeft: "4px solid var(--gold)", background: "var(--page-card-bg)", border: "1px solid var(--page-card-border)", borderLeftWidth: 4, borderLeftColor: "var(--gold)", padding: "18px 22px", borderRadius: 14, margin: "4px 0 28px", fontSize: 17.5, lineHeight: 1.75, color: "var(--page-fg)" }}>
          {block.text}
        </div>
      );
    case "cta":
      return (
        <div style={{ border: "1px solid rgba(201,151,58,.45)", borderRadius: 20, padding: "26px 28px", margin: "36px 0", background: "var(--page-card-bg)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,var(--gold),transparent)" }} />
          <p style={{ margin: "0 0 16px" }}>{block.text}</p>
          <Link
            to={block.href}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg,var(--gold-m),var(--gold))", color: "var(--on-gold)",
              padding: "13px 24px", borderRadius: 14, fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 13,
              letterSpacing: ".06em", textDecoration: "none",
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

  const course = courseFor(post);
  const toc = post.body.filter((b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2" && Boolean(b.id));
  const idx = BLOG_POSTS.findIndex((p) => p.slug === post.slug);
  // Rotate through the other posts so every article gets links from the others.
  const more = [1, 2, 3].map((k) => BLOG_POSTS[(idx + k) % BLOG_POSTS.length]).filter((p) => p.slug !== post.slug);

  return (
    <div className="blog-root">
      <style>{pageStyles}</style>
      <Hero
        label="Quran Learning Blog"
        sub={
          <div className="blog-a3" style={{ display: "flex", justifyContent: "center" }}>
            <Meta post={post} />
          </div>
        }
      >
        <nav aria-label="Breadcrumb" className="blog-a1" style={{ fontSize: 14, color: "var(--page-fg-muted)", marginBottom: 16, fontWeight: 600 }}>
          <Link to="/" style={{ color: "inherit" }}>Home</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/blog/" style={{ color: "inherit" }}>Blog</Link>
        </nav>
        <h1 className="blog-h blog-a2" style={{ fontSize: "clamp(36px,5.4vw,64px)", fontWeight: 700, lineHeight: 1.1, margin: "0 auto 22px", maxWidth: 940 }}>
          {post.title}
        </h1>
      </Hero>

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "56px 24px 100px" }}>
        <div className="post-layout">
          <article>
            <img
              src={post.image}
              alt={post.imageAlt}
              width={860}
              height={484}
              decoding="async"
              fetchPriority="high"
              style={{ width: "100%", height: "auto", aspectRatio: "16 / 9", objectFit: "cover", borderRadius: 22, marginBottom: 36, border: "1px solid var(--page-card-border)" }}
            />
            <div className="post-body">
              {post.body.map((block, i) => <Block key={i} block={block} />)}

              {post.pinImage && (
                <figure style={{ margin: "40px auto", maxWidth: 340, textAlign: "center" }}>
                  <img
                    src={post.pinImage}
                    alt={`${post.title} – save this guide on Pinterest`}
                    width={1000}
                    height={1500}
                    loading="lazy"
                    decoding="async"
                    style={{ width: "100%", height: "auto", borderRadius: 16, border: "1px solid var(--page-card-border)" }}
                  />
                  <figcaption style={{ fontSize: 14, marginTop: 10, color: "var(--on-surface-muted)" }}>Save this guide to read later</figcaption>
                </figure>
              )}

              {post.faqs && post.faqs.length > 0 && (
                <section aria-labelledby="faq-heading">
                  <h2 id="faq-heading">Frequently asked questions</h2>
                  <div style={{ display: "grid", gap: 14 }}>
                    {post.faqs.map((f) => (
                      <div key={f.q} style={{ background: "var(--page-card-bg)", border: "1px solid var(--page-card-border)", borderRadius: 16, padding: "18px 22px" }}>
                        <h3 style={{ margin: "0 0 8px", fontSize: 19 }}>{f.q}</h3>
                        <p style={{ margin: 0, fontSize: 16.5, color: "var(--page-fg-muted)" }}>{f.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </article>

          <aside className="post-aside" aria-label="Article sidebar">
            {toc.length > 2 && (
              <nav aria-label="In this article" style={{ background: "var(--page-card-bg)", border: "1px solid var(--page-card-border)", borderRadius: 20, padding: "22px 22px 16px" }}>
                <p className="blog-label" style={{ margin: "0 0 12px" }}>In this article</p>
                <div className="toc">
                  {toc.map((h) => <a key={h.id} href={`#${h.id}`}>{h.text}</a>)}
                </div>
              </nav>
            )}
            <div style={{ background: "var(--hero-panel-bg)", border: "1px solid rgba(201,151,58,.35)", borderRadius: 20, padding: 24 }}>
              <p className="blog-label" style={{ margin: "0 0 10px" }}>Free trial class</p>
              <p className="blog-h" style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.2, margin: "0 0 14px" }}>
                {course ? `Learn ${course.title} with a tutor` : "Learn with a qualified tutor"}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "grid", gap: 8, fontSize: 15, color: "var(--page-fg-muted)" }}>
                {["Live 1-on-1 classes", "Male & female tutors", "No credit card needed"].map((t) => (
                  <li key={t} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <CheckCircle2 size={16} color="var(--gold)" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
              <Link
                to="/book-free-trial/"
                style={{
                  display: "flex", justifyContent: "center", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg,var(--gold-m),var(--gold))", color: "var(--on-gold)",
                  padding: "13px 18px", borderRadius: 14, fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 13, textDecoration: "none",
                }}
              >
                Book free trial <ArrowRight size={16} aria-hidden="true" />
              </Link>
              {course && (
                <Link to={`/course/${course.slug}/`} style={{ display: "block", textAlign: "center", marginTop: 12, color: "var(--gold)", fontWeight: 700, fontSize: 14 }}>
                  View the {course.title} course
                </Link>
              )}
            </div>
          </aside>
        </div>

        {more.length > 0 && (
          <section style={{ marginTop: 90 }} aria-labelledby="more-guides">
            <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
              <div>
                <p className="blog-label" style={{ margin: "0 0 8px" }}>Keep learning</p>
                <h2 id="more-guides" className="blog-h" style={{ fontSize: "clamp(32px,4vw,44px)", fontWeight: 700, margin: 0 }}>More Quran guides</h2>
              </div>
              <Link to="/blog/" style={{ color: "var(--gold)", fontWeight: 800, display: "inline-flex", gap: 6, alignItems: "center", textDecoration: "none" }}>
                All articles <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="blog-grid">
              {more.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
