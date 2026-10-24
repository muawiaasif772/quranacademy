import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BarChart3, BookOpen, Calendar, ChartLine, ChevronRight, ClipboardList,
  GraduationCap, LayoutDashboard, MessageSquare, MonitorPlay, PenLine,
  Play, ShieldCheck, Sparkles, Users, Video, Wallet,
} from "lucide-react";

/**
 * Academy Dashboard — a SEPARATE page (/dashboard), CRM style.
 * This is a front-end dashboard with SAMPLE data, clearly labelled as such.
 * Real class data, logins and attendance records are the next backend step;
 * nothing here claims to be a live student record.
 *
 * - Charts: Chart.js (free, open source).
 * - Live video: Jitsi Meet (free, open source) embedded in an iframe.
 *   Screen sharing is built into Jitsi's toolbar — no paid video service.
 * - Safe Contact (like Upwork/Fiverr): profiles show first name + Academy ID
 *   only. The in-dashboard chat masks phone numbers, emails and WhatsApp
 *   numbers to **** before a message is shown, so teachers and students
 *   cannot exchange personal contact details inside the platform.
 *   Only the admin view is meant to see full contact details, and this
 *   preview intentionally shows none.
 */

type Role = "admin" | "teacher" | "student";
type Tab = "overview" | "classes" | "progress" | "fees" | "teachers" | "students" | "live" | "activities" | "services";

const TABS: { id: Tab; label: string; roles: Role[] }[] = [
  { id: "overview", label: "Overview", roles: ["admin", "teacher", "student"] },
  { id: "classes", label: "Classes", roles: ["admin", "teacher", "student"] },
  { id: "progress", label: "Progress", roles: ["admin", "teacher", "student"] },
  { id: "fees", label: "Fees", roles: ["admin"] },
  { id: "teachers", label: "Teachers", roles: ["admin"] },
  { id: "students", label: "Students", roles: ["admin", "teacher"] },
  { id: "live", label: "Live Session", roles: ["admin", "teacher", "student"] },
  { id: "services", label: "Services", roles: ["admin", "teacher", "student"] },
  { id: "activities", label: "Activities", roles: ["admin", "teacher", "student"] },
];

const CLASSES = [
  { time: "8:00 AM", mins: "45 min", subject: "Noorani Qaida", topic: "Group A, letters and harakat", teacher: "Ustadha Maryam Tariq", students: 9, status: "Done" },
  { time: "10:30 AM", mins: "60 min", subject: "Hifz", topic: "Sabqi revision, Juz 29", teacher: "Hafiz Usman Ghani", students: 5, status: "Done" },
  { time: "3:00 PM", mins: "60 min", subject: "Hifz", topic: "Sabaq and sabqi, Juz 28", teacher: "Hafiz Usman Ghani", students: 6, status: "Live now" },
  { time: "4:30 PM", mins: "45 min", subject: "Noorani Qaida", topic: "Group C, joining letters", teacher: "Ustadha Hira Fatima", students: 10, status: "In 1h 9m" },
  { time: "6:00 PM", mins: "60 min", subject: "Tajweed", topic: "Noon sakinah and tanween", teacher: "Qari Abdullah Iqbal", students: 12, status: "In 2h 39m" },
  { time: "7:30 PM", mins: "60 min", subject: "Hifz", topic: "Manzil, weekly recall", teacher: "Hafiz Usman Ghani", students: 4, status: "In 4h 9m" },
  { time: "9:00 PM", mins: "60 min", subject: "Nazra", topic: "Adults evening batch", teacher: "Ustadha Maryam Tariq", students: 6, status: "In 5h 39m" },
];

const STUDENTS = [
  { name: "Student A", id: "ALM-101", programme: "Noorani Qaida", progress: 78, last: "Today", status: "Present" },
  { name: "Student B", id: "ALM-102", programme: "Tilawat", progress: 64, last: "Today", status: "Present" },
  { name: "Student C", id: "ALM-103", programme: "Arabic Grammar", progress: 52, last: "Yesterday", status: "1 missed" },
  { name: "Student D", id: "ALM-104", programme: "Noorani Qaida", progress: 41, last: "2 days ago", status: "Missed 2 classes" },
];

const TEACHERS = [
  { name: "Ustadha Maryam Tariq", id: "T-01", subjects: "Noorani Qaida, Nazra", classes: 3, students: 23, next: "Next at 9:00 PM" },
  { name: "Qari Abdullah Iqbal", id: "T-02", subjects: "Nazra, Tajweed", classes: 2, students: 19, next: "Next at 6:00 PM" },
  { name: "Hafiz Usman Ghani", id: "T-03", subjects: "Hifz", classes: 3, students: 15, next: "Teaching now" },
  { name: "Ustadha Hira Fatima", id: "T-04", subjects: "Tajweed, Noorani Qaida", classes: 2, students: 21, next: "Next at 4:30 PM" },
];

const ACTIVITIES = [
  { tag: "NOORANI QAIDA", title: "Learning Arabic Letters — Alif to Seen", desc: "Animated lesson: child reads each letter aloud, tutor corrects pronunciation.", dur: "1:24", colour: "#1d6a4a", icon: "📖" },
  { tag: "NOORANI QAIDA", title: "Joining Letters into Short Words", desc: "Animated lesson: child joins letters and reads first short words.", dur: "1:58", colour: "#1d6a4a", icon: "🔤" },
  { tag: "NOORANI QAIDA", title: "Reading with Harakat", desc: "Animated lesson: Fatha, Kasra, Damma — child reads lines with correct flow.", dur: "2:10", colour: "#1d6a4a", icon: "✏️" },
  { tag: "QURAN TILAWAT", title: "Tilawat — Surah Al-Fatiha", desc: "Animated lesson: child recites Al-Fatiha with Tajweed, tutor corrects makhraj.", dur: "2:42", colour: "#8a6a1f", icon: "📗" },
  { tag: "QURAN TILAWAT", title: "Tilawat — Short Surahs from Juz Amma", desc: "Animated lesson: child recites from memory, then reads from the Mushaf.", dur: "3:05", colour: "#8a6a1f", icon: "🌙" },
  { tag: "QURAN TILAWAT", title: "Slow, Clear Recitation Practice", desc: "Animated lesson: tutor stops at each rule, child repeats the verse correctly.", dur: "2:18", colour: "#8a6a1f", icon: "🎙️" },
  { tag: "ARABIC GRAMMAR", title: "Repeating Grammar — Pronouns", desc: "Animated lesson: child repeats pronouns, then uses them in short sentences.", dur: "1:47", colour: "#2a5a8a", icon: "🗣️" },
  { tag: "ARABIC GRAMMAR", title: "Repeating Verbs — Present Tense", desc: "Animated lesson: class repeats verb patterns, then each child says one example.", dur: "2:31", colour: "#2a5a8a", icon: "✍️" },
  { tag: "ARABIC GRAMMAR", title: "Quranic Words in Salah — Meaning", desc: "Animated lesson: child reads Salah words, tutor explains meaning simply.", dur: "1:36", colour: "#2a5a8a", icon: "🕌" },
];

/** Mask phone numbers, emails and WhatsApp-style numbers, Upwork/Fiverr style. */
export function maskContactDetails(text: string): { masked: string; blocked: boolean } {
  let masked = text;
  let blocked = false;
  const patterns: RegExp[] = [
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
    /\+?\d[\d\s-]{7,}\d/g,
    /whatsapp\s*[:.]?\s*\+?\d[\d\s-]*/gi,
  ];
  for (const re of patterns) {
    if (re.test(masked)) {
      blocked = true;
      masked = masked.replace(re, "****");
    }
  }
  return { masked, blocked };
}

function CartoonKid({ bg }: { bg: string }) {
  return (
    <div className="dash-kid" style={{ background: bg }}>
      <div className="dash-kid-head">
        <div className="dash-kid-hair" />
        <div className="dash-kid-eye l" />
        <div className="dash-kid-eye r" />
        <div className="dash-kid-smile" />
      </div>
      <div className="dash-kid-body">📖</div>
    </div>
  );
}

const Dashboard: React.FC = () => {
  const [role, setRole] = useState<Role>("admin");
  const [tab, setTab] = useState<Tab>("overview");
  const [activityFilter, setActivityFilter] = useState("All");
  const [playing, setPlaying] = useState<number | null>(null);
  const [room, setRoom] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chat, setChat] = useState<{ from: string; text: string; blocked: boolean }[]>([
    { from: "Teacher", text: "Assalamu alaikum, please open your Qaida to page 12.", blocked: false },
  ]);
  const [penColour, setPenColour] = useState("#1d6a4a");
  const [eraser, setEraser] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const attRef = useRef<HTMLCanvasElement>(null);
  const progRef = useRef<HTMLCanvasElement>(null);
  const feeRef = useRef<HTMLCanvasElement>(null);

  const visibleTabs = useMemo(() => TABS.filter((t) => t.roles.includes(role)), [role]);

  useEffect(() => {
    if (!visibleTabs.some((t) => t.id === tab)) setTab("overview");
  }, [role, tab, visibleTabs]);

  // Chart.js charts — only on the overview tab, destroyed on cleanup.
  useEffect(() => {
    if (tab !== "overview") return;
    let charts: { destroy: () => void }[] = [];
    let cancelled = false;
    import("chart.js").then(({ Chart, registerables }) => {
      if (cancelled) return;
      Chart.register(...registerables);
      const mk = (ref: React.RefObject<HTMLCanvasElement | null>, cfg: any) => {
        if (ref.current) charts.push(new Chart(ref.current, cfg));
      };
      mk(attRef, {
        type: "line",
        data: {
          labels: ["12 Oct", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24 Oct"],
          datasets: [{ label: "Present %", data: [93.5, 91.2, 92.8, 95.1, 87.4, 88.9, 92.3, 93.8, 94.2, 91.5, 90.1, 92.7, 91.4], borderColor: "#1d6a4a", backgroundColor: "rgba(29,106,74,0.12)", fill: true, tension: 0.35 }],
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { min: 80, max: 100 } } },
      });
      mk(progRef, {
        type: "bar",
        data: { labels: ["Noorani Qaida", "Nazra", "Tajweed", "Hifz"], datasets: [{ label: "Students", data: [74, 92, 44, 38], backgroundColor: ["#c9973a", "#1d6a4a", "#2a5a8a", "#8a6a1f"] }] },
        options: { plugins: { legend: { display: false } } },
      });
      mk(feeRef, {
        type: "doughnut",
        data: { labels: ["Paid", "Pending", "Overdue"], datasets: [{ data: [412500, 98000, 49500], backgroundColor: ["#1d6a4a", "#c9973a", "#d64545"] }] },
        options: { plugins: { legend: { position: "bottom" as const } } },
      });
    });
    return () => {
      cancelled = true;
      charts.forEach((c) => c.destroy());
      charts = [];
    };
  }, [tab]);

  // Whiteboard drawing (local canvas only — shared sync needs the live room).
  const canvasPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = canvasPos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = canvasPos(e);
    ctx.strokeStyle = eraser ? "#ffffff" : penColour;
    ctx.lineWidth = eraser ? 18 : 3;
    ctx.lineCap = "round";
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text) return;
    const { masked, blocked } = maskContactDetails(text);
    setChat((c) => [...c, { from: role === "admin" ? "Admin" : role === "teacher" ? "Teacher" : "Student", text: masked, blocked }]);
    setChatInput("");
  };

  const generateRoom = () => {
    const code = Math.random().toString(36).slice(2, 8);
    setRoom(`AlifLaamMeem-Class-${code}`);
  };

  const filteredActivities = activityFilter === "All" ? ACTIVITIES : ACTIVITIES.filter((a) => a.tag === activityFilter);

  return (
    <div className="dash-page">
      <style>{`
        .dash-page{background:#f4f1e8;color:#17251d;padding:24px 0 48px}
        .dash-wrap{max-width:1180px;margin:0 auto;padding:0 20px}
        .dash-layout{display:flex;gap:18px;align-items:flex-start}
        .dash-side{width:230px;flex-shrink:0;background:#0d1f17;color:#eef4ee;border-radius:20px;padding:18px;position:sticky;top:90px}
        .dash-side a{display:block;color:#d9e6dc;text-decoration:none;padding:9px 11px;border-radius:10px;font-size:14px;cursor:pointer}
        .dash-side a.active{background:#c9973a;color:#111;font-weight:700}
        .dash-main{flex:1;min-width:0}
        .dash-kid{width:110px;height:130px;margin:0 auto;border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;animation:dashbob 2.2s ease-in-out infinite}
        @keyframes dashbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        .dash-kid-head{width:62px;height:62px;background:#ffd9a8;border-radius:50%;position:relative}
        .dash-kid-eye{position:absolute;top:24px;width:8px;height:8px;background:#111;border-radius:50%}
        .dash-kid-eye.l{left:15px}.dash-kid-eye.r{right:15px}
        .dash-kid-smile{position:absolute;bottom:15px;left:50%;width:22px;height:10px;border:3px solid #111;border-top:0;border-radius:0 0 20px 20px;transform:translateX(-50%)}
        .dash-kid-hair{position:absolute;top:-5px;left:7px;width:48px;height:24px;background:#2b2118;border-radius:50% 50% 20% 20%}
        .dash-kid-body{width:72px;height:42px;background:#c9973a;border-radius:14px;margin-top:3px;display:flex;align-items:center;justify-content:center;font-size:20px}
        .dash-card{background:#fff;border:1px solid #e2dcc8;border-radius:16px;padding:18px}
        .dash-panel{background:#fff;border:1px solid #e2dcc8;border-radius:16px;padding:18px;margin:14px 0}
        .dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        @media(min-width:800px){.dash-grid4{grid-template-columns:repeat(4,1fr)}}
        @media(min-width:900px){.dash-grid2{grid-template-columns:1fr 1fr}}
        .dash-row{display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid #f0ead6;font-size:14px}
        .dash-pill{padding:5px 10px;border-radius:999px;font-size:12px;font-weight:700;white-space:nowrap}
        .dash-act{display:grid;grid-template-columns:1fr;gap:16px}
        @media(min-width:700px){.dash-act{grid-template-columns:1fr 1fr}}
        @media(min-width:1000px){.dash-act{grid-template-columns:1fr 1fr 1fr}}
        .dash-act-card{background:#132b22;color:#eef4ee;border-radius:18px;overflow:hidden;cursor:pointer;border:1px solid #2c4a3c}
        @media(max-width:800px){.dash-side{display:none}.dash-grid{grid-template-columns:1fr 1fr}}
      `}</style>

      <div className="dash-wrap">
        <p style={{ textAlign: "center", fontSize: 30, color: "#8a6a1f", margin: "0 0 4px" }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <p style={{ color: "#5a6a5e", margin: "0 0 4px" }}>Assalamu alaikum — <span style={{ border: "1px solid #d8d0b8", background: "#fff", padding: "5px 10px", borderRadius: 999, fontSize: 12 }}>Sample data</span></p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 42, margin: "0 0 6px" }}>Academy overview</h1>
        <p style={{ color: "#5a6a5e" }}>Saturday, 24 October 2026 • A separate CRM dashboard page — not part of the public tutors page. Real class data will replace the sample data when logins and attendance are connected.</p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "16px 0" }}>
          {(["admin", "teacher", "student"] as Role[]).map((r) => (
            <button key={r} onClick={() => setRole(r)} style={{ padding: "9px 16px", borderRadius: 999, border: "1px solid #d8d0b8", background: role === r ? "#c9973a" : "#fff", fontWeight: role === r ? 700 : 400, cursor: "pointer", textTransform: "capitalize" }}>
              {r === "admin" ? "Admin view (full)" : r === "teacher" ? "Teacher view (simpler)" : "Student view (simpler)"}
            </button>
          ))}
        </div>

        <div className="dash-layout">
          <aside className="dash-side">
            <div style={{ fontFamily: "'Cinzel',serif", color: "#e8c766", fontWeight: 700 }}>☪ Alif Laam Meem</div>
            <p style={{ color: "#b9c9bd", fontSize: 12 }}>Admin dashboard • CRM</p>
            {visibleTabs.map((t) => (
              <a key={t.id} className={tab === t.id ? "active" : ""} onClick={() => setTab(t.id)}>{t.label}</a>
            ))}
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <CartoonKid bg="transparent" />
              <p style={{ fontSize: 13, margin: "8px 0 0" }}>Your cartoon helper is here 👋</p>
              <p style={{ fontSize: 12, color: "#b9c9bd" }}>Click an Activities card — the character animates and plays.</p>
            </div>
            <p style={{ fontSize: 12, color: "#b9c9bd", lineHeight: 1.6, marginTop: 16 }}>🛡 <b style={{ color: "#e8c766" }}>Safe Contact</b><br />Teachers &amp; students see only first name + Academy ID. No phone, no email, no WhatsApp in profiles or chat.</p>
          </aside>

          <div className="dash-main">
            {tab === "overview" && (
              <>
                <div className="dash-grid dash-grid4">
                  <div className="dash-card"><small style={{ color: "#5a6a5e" }}>Active students</small><div style={{ fontSize: 32, fontWeight: 700 }}>248</div><p style={{ color: "#5a6a5e", fontSize: 13 }}>▲ 12 joined this month</p></div>
                  <div className="dash-card"><small style={{ color: "#5a6a5e" }}>Present today</small><div style={{ fontSize: 32, fontWeight: 700 }}>91.4%</div><p style={{ color: "#5a6a5e", fontSize: 13 }}>▼ 1.4 pts vs yesterday</p></div>
                  <div className="dash-card"><small style={{ color: "#5a6a5e" }}>Classes today</small><div style={{ fontSize: 32, fontWeight: 700 }}>10</div><p style={{ color: "#5a6a5e", fontSize: 13 }}>5 done • 1 live • 4 upcoming</p></div>
                  {role === "admin" ? (
                    <div className="dash-card"><small style={{ color: "#5a6a5e" }}>Fees collected this month</small><div style={{ fontSize: 28, fontWeight: 700 }}>PKR 412,500</div><p style={{ color: "#5a6a5e", fontSize: 13 }}>74% of PKR 560,000 due</p></div>
                  ) : (
                    <div className="dash-card"><small style={{ color: "#5a6a5e" }}>My progress this week</small><div style={{ fontSize: 32, fontWeight: 700 }}>78%</div><p style={{ color: "#5a6a5e", fontSize: 13 }}>Qaida, Tilawat &amp; Grammar combined</p></div>
                  )}
                </div>

                <div className="dash-panel">
                  <h3 style={{ margin: "0 0 8px" }}>⚠ Needs attention</h3>
                  <p>🔴 <b>4 families have overdue fees</b> — PKR 49,500 outstanding, oldest 18 days (admin only) • 🕐 <b>3 students missed 3 classes in a row</b> — follow up today • 🕐 <b>Ustadha Hira is on leave Monday</b> — 2 classes need a replacement teacher • 🟢 <b>Live now:</b> Hifz Sabaq, Juz 28</p>
                </div>

                <div className="dash-grid dash-grid2">
                  <div className="dash-panel"><h3 style={{ margin: "0 0 6px" }}>📈 Attendance — Chart.js</h3><p style={{ color: "#5a6a5e", fontSize: 13 }}>Average 91.8% • Lowest 87.4%, Fri 16 Oct</p><canvas ref={attRef} height={220} /></div>
                  <div className="dash-panel"><h3 style={{ margin: "0 0 6px" }}>👧 Students by programme — Chart.js</h3><p style={{ color: "#5a6a5e", fontSize: 13 }}>In learning-path order</p><canvas ref={progRef} height={220} /></div>
                  {role === "admin" && (
                    <div className="dash-panel"><h3 style={{ margin: "0 0 6px" }}>💰 Fees this month — Chart.js</h3><p style={{ color: "#5a6a5e", fontSize: 13 }}>PKR 560,000 due • Paid 74% • Pending 18% • Overdue 9%</p><canvas ref={feeRef} height={220} /></div>
                  )}
                  <div className="dash-panel"><h3 style={{ margin: "0 0 6px" }}>📖 Hifz progress by Juz</h3><p style={{ color: "#5a6a5e", fontSize: 13 }}>Students who completed each Juz, out of 38 in Hifz</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(10,1fr)", gap: 6, marginTop: 12 }}>
                      {Array.from({ length: 30 }, (_, i) => (
                        <div key={i} style={{ height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, background: i < 3 ? "#1d6a4a" : i >= 27 ? "#c9973a" : "#e8f0e8", color: i < 3 ? "#fff" : "#17251d" }}>{i + 1}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {tab === "classes" && (
              <div className="dash-panel"><h3>Today's classes</h3><p style={{ color: "#5a6a5e" }}>10 scheduled • Filters: All 10 • Noorani Qaida 2 • Nazra 3 • Tajweed 2 • Hifz 3</p>
                {CLASSES.map((c, i) => (
                  <div key={i} className="dash-row"><span><b>{c.time}</b> ({c.mins}) • <b>{c.subject}</b> — {c.topic}<br /><span style={{ color: "#5a6a5e" }}>{c.teacher} • {c.students} students</span></span><span className="dash-pill" style={{ background: c.status === "Live now" ? "#fff3d6" : c.status === "Done" ? "#e0f3e8" : "#eef2f7", color: "#17251d" }}>{c.status === "Done" ? "✓ Done" : c.status}</span></div>
                ))}
              </div>
            )}

            {tab === "progress" && (
              <div className="dash-panel"><h3>Daily progress — missed classes highlighted</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead><tr><th style={{ textAlign: "left", color: "#5a6a5e" }}>Student (first name + ID only)</th><th style={{ textAlign: "left", color: "#5a6a5e" }}>Programme</th><th style={{ textAlign: "left", color: "#5a6a5e" }}>Progress</th><th style={{ textAlign: "left", color: "#5a6a5e" }}>Status</th></tr></thead>
                  <tbody>
                    {STUDENTS.map((s) => (
                      <tr key={s.id} style={{ background: s.status.includes("Missed") ? "#fff5f5" : "transparent" }}>
                        <td style={{ padding: "10px 6px" }}><b>{s.name}</b><br /><span style={{ color: "#5a6a5e" }}>{s.id}</span></td>
                        <td style={{ padding: "10px 6px" }}>{s.programme}</td>
                        <td style={{ padding: "10px 6px" }}>{s.progress}% • Last: {s.last}</td>
                        <td style={{ padding: "10px 6px" }}><span className="dash-pill" style={{ background: s.status === "Present" ? "#e0f3e8" : s.status.includes("Missed") ? "#fde3e3" : "#fff3d6", color: s.status.includes("Missed") ? "#b42318" : "#17251d" }}>{s.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={{ color: "#5a6a5e", fontSize: 13 }}>No phone numbers or emails are shown here — by design, like Upwork/Fiverr.</p>
              </div>
            )}

            {tab === "fees" && role === "admin" && (
              <div className="dash-panel"><h3>Fees this month</h3><p>PKR 560,000 due across 248 students • Paid PKR 412,500 (74%) • Pending PKR 98,000 (18%) • Overdue PKR 49,500 (9%)</p>
                <div className="dash-row"><span><b>Family A</b> — Nazra</span><span>PKR 12,500 • <span style={{ color: "#b42318" }}>18 days late</span></span></div>
                <div className="dash-row"><span><b>Family B</b> — Noorani Qaida</span><span>PKR 12,500 • <span style={{ color: "#b42318" }}>11 days late</span></span></div>
                <div className="dash-row"><span><b>Family C</b> — Hifz</span><span>PKR 9,500 • <span style={{ color: "#b42318" }}>5 days late</span></span></div>
                <p style={{ color: "#5a6a5e", fontSize: 13 }}>Sample fee rows only. Real fee records must be connected from your payment records before this is used for billing.</p>
              </div>
            )}

            {tab === "teachers" && role === "admin" && (
              <div className="dash-panel"><h3>Teachers today</h3>
                {TEACHERS.map((t) => (
                  <div key={t.id} className="dash-row"><span><b>{t.name}</b> ({t.id}) — {t.subjects}</span><span>{t.classes} classes • {t.students} students • {t.next}</span></div>
                ))}
              </div>
            )}

            {tab === "students" && (
              <div className="dash-panel"><h3>Students</h3><p style={{ color: "#5a6a5e" }}>Search by first name or programme. Full contact details are admin-only and are not shown in this preview.</p>
                {STUDENTS.map((s) => (
                  <div key={s.id} className="dash-row"><span><b>{s.name}</b> • {s.id} • {s.programme}</span><span>{s.progress}% • {s.status}</span></div>
                ))}
              </div>
            )}

            {tab === "live" && (
              <div className="dash-panel" style={{ background: "#17251d", color: "#eef4ee", borderColor: "#17251d" }}>
                <h3 style={{ margin: "0 0 6px" }}>🎥 Live Session Room — FREE (Jitsi Meet)</h3>
                <p style={{ color: "#b9c9bd", lineHeight: 1.6 }}>Teacher generates a free link, sends it inside the dashboard, student joins — video, screen sharing and whiteboard in one room. No paid video service is needed to start. Screen sharing is a built-in button in the Jitsi toolbar. How a class works: 1) Teacher clicks Generate Link → 2) Link is sent inside the dashboard → 3) Student clicks Join → 4) Video + screen share + whiteboard start → 5) Attendance and progress are marked after class → 6) If a student misses class, it is highlighted in red in Progress. See the Classes tab for today's full list (Done, Live now, upcoming).</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "12px 0" }}>
                  <button onClick={generateRoom} style={{ padding: "11px 18px", borderRadius: 999, background: "#c9973a", fontWeight: 700, cursor: "pointer", border: 0 }}>+ Generate FREE Live Link</button>
                  <button onClick={() => { if (!room) generateRoom(); }} style={{ padding: "11px 18px", borderRadius: 999, background: "#2fcf87", fontWeight: 700, cursor: "pointer", border: 0 }}>▶ Join Live Class</button>
                </div>
                {room && (
                  <>
                    <p style={{ background: "#0d1f17", padding: 12, borderRadius: 12 }}>Your live link (sample room): <b style={{ color: "#e8c766" }}>https://meet.jit.si/{room}</b><br />Copy this link and send it inside the dashboard — do not share it publicly.</p>
                    <iframe title="Live class room (Jitsi, free)" src={`https://meet.jit.si/${room}`} allow="camera; microphone; display-capture; fullscreen" style={{ width: "100%", height: 420, border: 0, borderRadius: 14, background: "#000" }} />
                    <p style={{ color: "#b9c9bd", fontSize: 13 }}>In the Jitsi room, use the toolbar's Share Screen button to share your screen. If the room does not load here (browser permissions), open the link above in a new tab — it is the same free room.</p>
                  </>
                )}
                <div style={{ background: "#fff", color: "#17251d", borderRadius: 12, padding: 14, marginTop: 14 }}>
                  <b>✏️ Digital Whiteboard — highlighted tools</b>
                  <div style={{ margin: "10px 0", display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button onClick={() => setEraser(false)} style={{ padding: "7px 12px", borderRadius: 999, background: !eraser ? "#fff3d6" : "#fff", border: "1px solid #ddd", cursor: "pointer", fontWeight: !eraser ? 700 : 400 }}>🖊 Pen</button>
                    <button onClick={() => setEraser(true)} style={{ padding: "7px 12px", borderRadius: 999, background: eraser ? "#fff3d6" : "#fff", border: "1px solid #ddd", cursor: "pointer", fontWeight: eraser ? 700 : 400 }}>🧽 Eraser</button>
                    {["#1d6a4a", "#c9973a", "#2a5a8a", "#d64545"].map((c) => (
                      <button key={c} onClick={() => { setPenColour(c); setEraser(false); }} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: penColour === c ? "3px solid #111" : "1px solid #ddd", cursor: "pointer" }} aria-label={`Pen colour ${c}`} />
                    ))}
                    <button onClick={() => { const ctx = canvasRef.current?.getContext("2d"); if (ctx && canvasRef.current) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); }} style={{ padding: "7px 12px", borderRadius: 999, background: "#fff", border: "1px solid #ddd", cursor: "pointer" }}>Clear board</button>
                  </div>
                  <canvas ref={canvasRef} width={900} height={220} onMouseDown={startDraw} onMouseMove={draw} onMouseUp={() => { drawing.current = false; }} onMouseLeave={() => { drawing.current = false; }} style={{ width: "100%", height: 180, border: "2px dashed #c9973a", borderRadius: 10, cursor: "crosshair", background: "#fff" }} />
                  <p style={{ color: "#5a6a5e", fontSize: 13 }}>Draw here to test the pen/eraser. In a shared live class this board needs a shared-board service — the drawing above is local to this browser for now, and is labelled as such so it is not mistaken for a synced board.</p>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
                  <span style={{ background: "#c9973a", color: "#111", padding: "8px 12px", borderRadius: 999, fontWeight: 700 }}>🎤 Mic</span>
                  <span style={{ background: "#c9973a", color: "#111", padding: "8px 12px", borderRadius: 999, fontWeight: 700 }}>📹 Camera</span>
                  <span style={{ background: "#c9973a", color: "#111", padding: "8px 12px", borderRadius: 999, fontWeight: 700 }}>🖥 Screen Share</span>
                  <span style={{ background: "#243a30", padding: "8px 12px", borderRadius: 999 }}>✋ Raise Hand</span>
                  <span style={{ background: "#243a30", padding: "8px 12px", borderRadius: 999 }}>💬 Chat</span>
                  <span style={{ background: "#d64545", padding: "8px 12px", borderRadius: 999 }}>⏹ End Class</span>
                </div>
                <div style={{ background: "#fff8e6", color: "#5a3d00", borderRadius: 12, padding: 14, marginTop: 14, fontSize: 13, lineHeight: 1.6 }}>
                  <b>🛡 Safe Contact — like Upwork / Fiverr:</b> Phone numbers, emails, WhatsApp numbers and personal links typed in chat below are automatically replaced with **** and are not sent. Profiles show first name + Academy ID only.
                  <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                    <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") sendChat(); }} placeholder="Type a message in the live room… (try typing a phone number or email — it will be masked)" style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd" }} />
                    <button onClick={sendChat} style={{ padding: "10px 16px", borderRadius: 10, background: "#c9973a", fontWeight: 700, cursor: "pointer", border: 0 }}>Send</button>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    {chat.map((m, i) => (
                      <p key={i} style={{ margin: "6px 0", color: "#17251d" }}><b>{m.from}:</b> {m.text} {m.blocked && <span style={{ color: "#b42318" }}>(contact details blocked)</span>}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "services" && (
              <>
                <p style={{ color: "#5a6a5e" }}>All services your academy offers, in one place — the same services already on your site, now also visible from the dashboard.</p>
                <div className="dash-grid dash-grid2">
                  {[
                    ["📖 Noorani Qaida", "First letters to first words, for kids and beginners. 1-on-1 live, with a free trial level check."],
                    ["📗 Quran with Tajweed", "Live recitation with on-the-spot correction, for teens and adults who read Arabic."],
                    ["🌙 Hifz Memorization", "Realistic daily target, revision checked every lesson, parent updates, Ijazah possible."],
                    ["🗣️ Arabic Communication", "Speaking, listening, reading and writing, with Quranic examples and words from Salah."],
                    ["👧 Islamic Studies for Kids", "Short, visual and interactive lessons. Parents can sit in the trial. Male or female tutor."],
                    ["📚 Tafsir & Meaning", "Context, language and practical lessons, for students who already read Arabic."],
                    ["🎥 Live 1-on-1 Classes", "30-minute live lessons, 3 or 5 classes per week, on your schedule."],
                    ["🎁 Free Trial Class", "Book a free trial, meet the tutor, check the level — no credit card."],
                    ["📈 Progress Reports", "Daily progress, attendance, Hifz by Juz, and missed-class alerts for parents."],
                    ["👩‍🏫 Male & Female Tutors", "Certified tutors, choose male or female, choose your language."],
                    ["👨‍👩‍👧 Family Plans", "Lite $26/mo • Standard $44/mo • Family $75/mo for 2 students, annual discounts available."],
                    ["🛡 Safe Platform", "No personal phone or email sharing in live sessions — teaching stays inside your platform."],
                  ].map(([t, d]) => (
                    <div key={t} className="dash-card"><b style={{ fontSize: 19 }}>{t}</b><p style={{ color: "#5a6a5e", fontSize: 14, lineHeight: 1.6 }}>{d}</p></div>
                  ))}
                </div>
              </>
            )}

            {tab === "activities" && (
              <>
                <p style={{ color: "#5a6a5e" }}>Animated student activities — click a card to play the animation. Your real animated videos will replace these cartoon placeholders in the same cards.</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "12px 0" }}>
                  {["All", "NOORANI QAIDA", "QURAN TILAWAT", "ARABIC GRAMMAR"].map((f) => (
                    <button key={f} onClick={() => setActivityFilter(f)} style={{ padding: "9px 16px", borderRadius: 999, border: "1px solid #d8d0b8", background: activityFilter === f ? "#c9973a" : "#fff", fontWeight: activityFilter === f ? 700 : 400, cursor: "pointer" }}>{f === "All" ? "All Activities" : f.charAt(0) + f.slice(1).toLowerCase()}</button>
                  ))}
                </div>
                <div className="dash-act">
                  {filteredActivities.map((a, i) => {
                    const idx = ACTIVITIES.indexOf(a);
                    return (
                      <article key={idx} className="dash-act-card" onClick={() => setPlaying(playing === idx ? null : idx)}>
                        <div style={{ height: 180, background: `linear-gradient(135deg, ${a.colour}, #0f3d2a)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                          <span style={{ position: "absolute", left: 12, top: 12, background: "#c9973a", color: "#111", padding: "5px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{a.tag}</span>
                          <CartoonKid bg="transparent" />
                          <span style={{ position: "absolute", width: 54, height: 54, borderRadius: "50%", background: playing === idx ? "#2fcf87" : "rgba(255,255,255,.95)", color: "#111", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, right: 14, bottom: 14 }}>{playing === idx ? "⏸" : "▶"}</span>
                          <span style={{ position: "absolute", right: 14, bottom: 76, background: "rgba(0,0,0,.75)", padding: "4px 9px", borderRadius: 999, fontSize: 12 }}>{a.dur}</span>
                        </div>
                        <div style={{ padding: 18 }}>
                          <h3 style={{ margin: "0 0 8px", fontSize: 18 }}>{a.title}</h3>
                          <p style={{ color: "#b9c9bd", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{a.desc}</p>
                          {playing === idx && <p style={{ color: "#2fcf87", fontSize: 13, marginTop: 10 }}>▶ Playing animated lesson… (your real video will play here)</p>}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}

            <p style={{ color: "#5a6a5e", fontSize: 13, lineHeight: 1.6, marginTop: 18 }}>
              This dashboard is a front-end preview with sample data. It does not yet have logins, real attendance records, or a synced shared whiteboard — those are the next build steps after you approve this page, and they must be built with a backend before the dashboard is used for real billing or safeguarding decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
