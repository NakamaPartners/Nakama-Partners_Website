import React, { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────
   NAKAMA  — Warm, professional, playful agency landing page
   Vibe: bold modern agency × Southeast Asian warmth × friendship studio
   Fonts: Syne (display) + Plus Jakarta Sans (body)
   Palette: deep warm black · terracotta · amber · coral · cream
───────────────────────────────────────────────────────────────────── */

const C = {
  bg:       '#0F0905',
  bgCard:   '#1C1108',
  bgLight:  '#FAF5EE',
  bgMid:    '#F3EAD8',
  terra:    '#C95240',
  amber:    '#D4884A',
  coral:    '#E07860',
  gold:     '#F0A84C',
  cream:    '#F5EDD8',
  warmText: '#FDF8F4',
  stone:    '#9B8474',
  stoneL:   '#C4B4A8',
  espresso: '#120A04',
};

/* Gradient text helper */
const GradText: React.FC<{ children: React.ReactNode; from?: string; to?: string }> = ({
  children, from = C.terra, to = C.gold,
}) => (
  <span style={{
    background: `linear-gradient(135deg, ${from}, ${to})`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }}>{children}</span>
);

/* Pill badge */
const Pill: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: light ? 'rgba(201,82,64,0.10)' : 'rgba(255,255,255,0.07)',
    border: `1px solid ${light ? 'rgba(201,82,64,0.25)' : 'rgba(255,255,255,0.12)'}`,
    borderRadius: 999, padding: '7px 16px',
    fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
    color: light ? C.terra : C.stoneL, fontFamily: "'Plus Jakarta Sans', sans-serif",
  }}>{children}</span>
);

/* Service card */
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tag: string;
  accent: string;
  dark?: boolean;
}
const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, desc, tag, accent, dark }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: dark ? (hov ? '#231408' : C.bgCard) : (hov ? '#FFFFFF' : '#F9F4EC'),
        border: `1px solid ${hov ? accent + '60' : dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        borderRadius: 20, padding: '36px 32px',
        transition: 'all 0.3s ease', cursor: 'default',
        boxShadow: hov ? `0 20px 60px ${accent}20` : 'none',
      }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: hov ? accent + '22' : dark ? 'rgba(255,255,255,0.06)' : 'rgba(201,82,64,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20, transition: 'background 0.3s ease',
      }}>{icon}</div>
      <div style={{ fontSize: 10, letterSpacing: '0.18em', fontWeight: 700, color: accent, marginBottom: 8, textTransform: 'uppercase' }}>{tag}</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: dark ? C.warmText : C.espresso, marginBottom: 12, lineHeight: 1.25 }}>{title}</div>
      <p style={{ fontSize: 14, color: dark ? C.stone : '#6B5C52', lineHeight: 1.75, fontWeight: 400 }}>{desc}</p>
    </div>
  );
};

/* Process step */
const Step: React.FC<{ num: string; title: string; desc: string; accent: string }> = ({ num, title, desc, accent }) => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
    <div style={{ width: 48, height: 48, borderRadius: 12, background: accent + '18', border: `1.5px solid ${accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: accent }}>{num}</span>
    </div>
    <div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 19, fontWeight: 700, color: C.espresso, marginBottom: 6 }}>{title}</div>
      <p style={{ fontSize: 14, color: '#7A6558', lineHeight: 1.75 }}>{desc}</p>
    </div>
  </div>
);

export function LandingPage() {
  const [activeSvc, setActiveSvc] = useState(0);
  const obsRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    obsRef.current = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }),
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' },
    );
    document.querySelectorAll('.fade').forEach(el => obsRef.current?.observe(el));
    return () => obsRef.current?.disconnect();
  }, []);

  const services = [
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="8" width="20" height="14" rx="3" stroke={C.terra} strokeWidth="1.8"/><path d="M7 8V5a5 5 0 0 1 10 0v3" stroke={C.terra} strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="15" r="2" fill={C.terra} opacity="0.7"/></svg>,
      title: 'Property Website', desc: 'Bespoke websites built around your property\'s soul — converting browsers to guests and reducing OTA dependency.', tag: '01 · Design', accent: C.terra,
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke={C.amber} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      title: 'WhatsApp Automation', desc: 'A smart guest system that responds instantly, qualifies bookings, and never sleeps — in your brand\'s voice.', tag: '02 · Automation', accent: C.amber,
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={C.gold} strokeWidth="1.8"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" stroke={C.gold} strokeWidth="1.8"/></svg>,
      title: 'OTA Integration', desc: 'One inventory synced across Airbnb, Booking.com, Agoda, and VRBO — no double-bookings, max occupancy.', tag: '03 · Distribution', accent: C.gold,
    },
  ];

  const testimonials = [
    { quote: 'Within 3 months our direct bookings tripled. Nakama doesn\'t just build websites — they become part of your team.', name: 'Rina H.', loc: 'Villa Owner · Seminyak', initials: 'RH' },
    { quote: 'They handled 80% of our guest enquiries automatically. Our staff now actually has time to host properly.', name: 'Ahmad Z.', loc: 'Property Group · KL', initials: 'AZ' },
    { quote: 'The word nakama really fits. I felt like they were genuinely invested in my success, not just the invoice.', name: 'Sita P.', loc: 'Boutique Retreat · Ubud', initials: 'SP' },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: C.bg, color: C.warmText, overflowX: 'hidden' }}>
      {/* Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .fade { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1); }
        .fade.vis { opacity: 1; transform: none; }
        .d1 { transition-delay: 0.08s !important; }
        .d2 { transition-delay: 0.16s !important; }
        .d3 { transition-delay: 0.24s !important; }
        .d4 { transition-delay: 0.32s !important; }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, ${C.terra}, ${C.amber});
          color: white; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 700; letter-spacing: 0.04em;
          padding: 14px 32px; border-radius: 100px; border: none;
          cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 24px rgba(201,82,64,0.35);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(201,82,64,0.45); }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.06); color: ${C.stoneL};
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600;
          padding: 14px 28px; border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.10); cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.10); color: ${C.warmText}; border-color: rgba(255,255,255,0.2); }

        .btn-terra-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: ${C.terra};
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 700;
          letter-spacing: 0.04em; padding: 12px 28px; border-radius: 100px;
          border: 2px solid ${C.terra}50; cursor: pointer; transition: all 0.2s ease;
        }
        .btn-terra-outline:hover { background: ${C.terra}12; border-color: ${C.terra}; }

        .nav-a { color: ${C.stone}; font-size: 14px; font-weight: 500; text-decoration: none; transition: color 0.2s ease; cursor: pointer; }
        .nav-a:hover { color: ${C.warmText}; }

        .svc-tab {
          padding: 16px 20px; border-radius: 12px; cursor: pointer;
          transition: all 0.2s ease; display: flex; align-items: center; gap: 12px;
        }
        .svc-tab:hover { background: rgba(255,255,255,0.05); }
        .svc-tab.on { background: rgba(201,82,64,0.10); }

        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee { display: flex; width: max-content; animation: scroll 28s linear infinite; }

        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .float-card { animation: float 4s ease-in-out infinite; }
        .float-card:nth-child(2) { animation-delay: 1.3s; }
        .float-card:nth-child(3) { animation-delay: 2.6s; }

        @keyframes orb-pulse { 0%,100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.05); } }
      `}} />

      {/* ── NAV ───────────────────────────────────────────────────── */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, background: C.bg + 'E8', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="11" cy="16" r="8" stroke={C.terra} strokeWidth="2" fill="none"/>
              <circle cx="21" cy="16" r="8" stroke={C.amber} strokeWidth="2" fill="none"/>
              <path d="M16 10 Q18 16 16 22" stroke="url(#lg1)" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <defs>
                <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor={C.terra}/><stop offset="1" stopColor={C.amber}/>
                </linearGradient>
              </defs>
            </svg>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: '0.02em', color: C.warmText }}>nakama</span>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            {['Services', 'Process', 'About', 'Stories'].map(l => (
              <span key={l} className="nav-a">{l}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button className="btn-ghost" style={{ padding: '10px 20px', fontSize: 13 }}>Chat with us 💬</button>
            <button className="btn-primary" style={{ padding: '10px 24px', fontSize: 13 }}>Grow with us →</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Gradient orbs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: 700, height: 600, top: '-5%', left: '-8%', background: `radial-gradient(ellipse, ${C.terra}50 0%, transparent 65%)`, animation: 'orb-pulse 6s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: 600, height: 500, top: '10%', right: '-5%', background: `radial-gradient(ellipse, ${C.amber}40 0%, transparent 65%)`, animation: 'orb-pulse 8s ease-in-out infinite 2s' }} />
          <div style={{ position: 'absolute', width: 400, height: 400, bottom: '5%', left: '30%', background: `radial-gradient(ellipse, ${C.coral}30 0%, transparent 65%)`, animation: 'orb-pulse 7s ease-in-out infinite 4s' }} />
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          {/* Left */}
          <div>
            <div className="fade" style={{ marginBottom: 28 }}>
              <Pill>🌿 Property Branding Studio · Southeast Asia</Pill>
            </div>
            <h1 className="fade d1" style={{ fontFamily: "'Syne', sans-serif", fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 24 }}>
              Your property's<br />
              <GradText from={C.terra} to={C.gold}>best friend</GradText><br />
              is here.
            </h1>
            <p className="fade d2" style={{ fontSize: 17, color: C.stone, lineHeight: 1.8, maxWidth: 460, marginBottom: 36, fontWeight: 400 }}>
              We're not just an agency. <strong style={{ color: C.stoneL }}>Nakama (仲間) means companions.</strong> We grow alongside your property — building the brand, digital systems, and guest experience that make guests return.
            </p>
            <div className="fade d3" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary">🤝 Grow with Nakama</button>
              <button className="btn-ghost">See our work ↓</button>
            </div>

            {/* Micro stats */}
            <div className="fade d4" style={{ display: 'flex', gap: 32, marginTop: 48, paddingTop: 36, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {[['3×', 'More direct bookings'], ['40%', 'Higher room rates'], ['24/7', 'Guest automation']].map(([n, l]) => (
                <div key={n}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, background: `linear-gradient(135deg, ${C.terra}, ${C.gold})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{n}</div>
                  <div style={{ fontSize: 12, color: C.stone, marginTop: 4, fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating cards */}
          <div className="fade d1" style={{ position: 'relative', height: 480 }}>
            {/* Main card */}
            <div className="float-card" style={{ position: 'absolute', top: 40, left: 20, right: 20, background: C.bgCard, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '28px 28px', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ADE80' }} />
                <span style={{ fontSize: 12, color: C.stoneL, fontWeight: 500 }}>Live · Property Dashboard</span>
              </div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: C.warmText, marginBottom: 4 }}>🏡 The Sari Villa</div>
              <div style={{ fontSize: 13, color: C.stone, marginBottom: 20 }}>Seminyak, Bali · 4 rooms</div>
              {/* Mini chart */}
              <svg width="100%" height="70" viewBox="0 0 340 70" fill="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor={C.terra} stopOpacity="0.5"/>
                    <stop offset="1" stopColor={C.terra} stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0 55 Q40 50 60 42 Q80 34 110 28 Q140 22 170 18 Q200 14 230 10 Q260 6 290 8 Q320 10 340 5" stroke={C.terra} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <path d="M0 55 Q40 50 60 42 Q80 34 110 28 Q140 22 170 18 Q200 14 230 10 Q260 6 290 8 Q320 10 340 5 L340 70 L0 70Z" fill="url(#chartGrad)"/>
              </svg>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                {[['Direct Bookings', '+127%', C.terra], ['Occupancy', '94%', C.amber], ['ADR', 'IDR 3.2M', C.gold]].map(([l, v, col]) => (
                  <div key={String(l)}>
                    <div style={{ fontSize: 11, color: C.stone, marginBottom: 2 }}>{l}</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: String(col) }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating mini card 1 */}
            <div className="float-card" style={{ position: 'absolute', bottom: 60, right: -10, background: 'linear-gradient(135deg, #C95240, #D4884A)', borderRadius: 16, padding: '18px 22px', width: 190, boxShadow: '0 16px 40px rgba(201,82,64,0.4)' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>✨</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 4 }}>New booking!</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>Via direct website<br />3 nights · 2 guests</div>
            </div>

            {/* Floating mini card 2 */}
            <div className="float-card" style={{ position: 'absolute', bottom: 130, left: -10, background: C.bgCard, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '16px 20px', boxShadow: '0 12px 36px rgba(0,0,0,0.4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 18 }}>💬</div>
                <div>
                  <div style={{ fontSize: 12, color: C.warmText, fontWeight: 600 }}>WhatsApp Bot</div>
                  <div style={{ fontSize: 11, color: C.stone }}>Replied in 2 seconds ⚡</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────────── */}
      <div style={{ padding: '18px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', overflow: 'hidden' }}>
        <div className="marquee">
          {Array(2).fill(null).map((_, ri) => (
            <React.Fragment key={ri}>
              {['🌴 Property Website', '★', '💬 WhatsApp Automation', '★', '🌐 OTA Integration', '★', '📈 Direct Bookings', '★', '🤝 Growing Together', '★', '✨ Brand Identity', '★'].map((item, i) => (
                <span key={`${ri}-${i}`} style={{ padding: '0 28px', whiteSpace: 'nowrap', fontSize: 14, color: item === '★' ? C.terra + '80' : C.stone, fontWeight: 500, letterSpacing: '0.03em' }}>{item}</span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── ABOUT ─────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: '120px 40px', background: C.bgLight }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' }}>
          {/* Text */}
          <div className="fade">
            <Pill light>🤝 Who we are</Pill>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1.1, color: C.espresso, margin: '20px 0 24px', letterSpacing: '-0.02em' }}>
              Two people.<br />One mission.<br /><GradText from={C.terra} to={C.amber}>All in for you.</GradText>
            </h2>
            <p style={{ fontSize: 16, color: '#6B5C52', lineHeight: 1.85, marginBottom: 20 }}>
              In Japanese, <strong style={{ color: C.espresso }}>仲間 (nakama)</strong> means companions — people who face the journey together. That's exactly who we are to every property we work with.
            </p>
            <p style={{ fontSize: 16, color: '#6B5C52', lineHeight: 1.85, marginBottom: 32 }}>
              We're a two-person studio based in Southeast Asia. No account managers between you and us. No junior teams working on your brand. When you work with Nakama, you get <strong style={{ color: C.espresso }}>both of us — directly</strong>, always.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['🎯', 'Your strategy, brand, and tech — all in one relationship'],
                ['🗣️', 'Bilingual communication (English & Bahasa)'],
                ['📍', 'Based in SEA — we understand the market and the culture'],
                ['🌱', 'Long-term partners, not project-based vendors'],
              ].map(([emoji, text]) => (
                <div key={String(text)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: '#5A4C44', lineHeight: 1.7 }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{emoji}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual — "companion" cards */}
          <div className="fade d1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Profile card A */}
            <div style={{ gridColumn: '1 / -1', background: 'white', borderRadius: 20, padding: '28px 28px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: `linear-gradient(135deg, ${C.terra}, ${C.amber})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🧑‍💻</div>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.espresso, fontSize: 17 }}>Design & Strategy</div>
                  <div style={{ fontSize: 13, color: C.stone }}>Brand · UX · Guest Journey</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#7A6558', lineHeight: 1.7 }}>Translating your property's personality into an experience that guests feel before they even arrive.</p>
            </div>
            <div style={{ background: 'white', borderRadius: 20, padding: '24px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>⚙️</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.espresso, fontSize: 16, marginBottom: 6 }}>Tech & Automation</div>
              <p style={{ fontSize: 13, color: '#7A6558', lineHeight: 1.6 }}>Building the systems that run while you sleep.</p>
            </div>
            <div style={{ background: `linear-gradient(135deg, ${C.terra}12, ${C.amber}12)`, borderRadius: 20, padding: '24px', border: `1px solid ${C.terra}20` }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🌏</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.espresso, fontSize: 16, marginBottom: 6 }}>SEA Market</div>
              <p style={{ fontSize: 13, color: '#7A6558', lineHeight: 1.6 }}>We know this region because we live in it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────── */}
      <section id="services" style={{ padding: '120px 40px', background: C.bg, position: 'relative', overflow: 'hidden' }}>
        {/* Background orb */}
        <div style={{ position: 'absolute', width: 800, height: 600, top: '20%', right: '-15%', background: `radial-gradient(ellipse, ${C.amber}20 0%, transparent 65%)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="fade" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'flex-end', marginBottom: 60 }}>
            <div>
              <Pill>✨ What we do</Pill>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginTop: 20, color: C.warmText }}>
                Three services.<br /><GradText from={C.coral} to={C.gold}>One partnership.</GradText>
              </h2>
            </div>
            <p style={{ fontSize: 15, color: C.stone, lineHeight: 1.8, maxWidth: 360, textAlign: 'right', justifySelf: 'end' }}>Each service is designed to work together — because a great website means nothing without the systems to capture and convert.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {services.map((s, i) => (
              <div key={i} className={`fade d${i + 1}`}>
                <ServiceCard {...s} dark />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(135deg, ${C.terra}22, ${C.amber}18)`, padding: '60px 40px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            ['🏡', '25+', 'Properties branded'],
            ['📈', '3×', 'Average booking growth'],
            ['🤖', '85%', 'Enquiries automated'],
            ['🌏', '4', 'Countries across SEA'],
          ].map(([emoji, num, label], i) => (
            <div key={String(num)} className={`fade d${i + 1}`} style={{ textAlign: 'center', padding: '20px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{emoji}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 44, fontWeight: 800, background: `linear-gradient(135deg, ${C.terra}, ${C.gold})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 13, color: C.stone, marginTop: 8, fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────── */}
      <section id="process" style={{ padding: '120px 40px', background: C.bgLight }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100 }}>
          <div className="fade">
            <Pill light>📋 How we work</Pill>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1.1, color: C.espresso, margin: '20px 0 24px', letterSpacing: '-0.02em' }}>
              A clear path,<br /><GradText from={C.terra} to={C.amber}>no surprises.</GradText>
            </h2>
            <p style={{ fontSize: 16, color: '#6B5C52', lineHeight: 1.85 }}>
              We've built a four-phase process that keeps you in the loop without overwhelming you. You'll always know what's happening, what's next, and what we need from you.
            </p>
            <div style={{ marginTop: 32, padding: '24px 28px', background: 'white', borderRadius: 16, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 14, color: C.stone, marginBottom: 8 }}>Typical timeline</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: C.espresso }}>4–6 weeks</div>
              <div style={{ fontSize: 13, color: C.stone, marginTop: 4 }}>From onboarding to full launch 🚀</div>
            </div>
          </div>

          <div className="fade d1" style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <Step num="01" title="Discovery & Audit" accent={C.terra}
              desc="We deep-dive into your property, market, and current guest touchpoints — understanding what makes you unique before touching a single pixel." />
            <Step num="02" title="Brand & Blueprint" accent={C.amber}
              desc="Your brand identity, website wireframes, and automation flows come to life. You review and shape everything before we build." />
            <Step num="03" title="Build & Integrate" accent={C.coral}
              desc="Website, WhatsApp bot, OTA channels — we build it all and test thoroughly. You stay informed at every checkpoint." />
            <Step num="04" title="Launch & Grow" accent={C.gold}
              desc="You're live. We stick around — monitoring, refining, and growing with you as a real long-term partner." />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <section id="stories" style={{ padding: '120px 40px', background: C.bg, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 600, height: 500, bottom: '-10%', left: '-10%', background: `radial-gradient(ellipse, ${C.terra}22 0%, transparent 65%)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="fade" style={{ textAlign: 'center', marginBottom: 64 }}>
            <Pill>💬 Stories from the field</Pill>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginTop: 20, color: C.warmText }}>
              Hear it from our<br /><GradText from={C.terra} to={C.gold}>nakama.</GradText>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {testimonials.map((t, i) => (
              <div key={i} className={`fade d${i + 1}`} style={{
                background: i === 1 ? `linear-gradient(135deg, ${C.terra}28, ${C.amber}20)` : C.bgCard,
                border: `1px solid ${i === 1 ? C.terra + '40' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 20, padding: '36px 32px',
              }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 20 }}>
                  {[...Array(5)].map((_, si) => <span key={si} style={{ fontSize: 14, color: C.gold }}>★</span>)}
                </div>
                <p style={{ fontSize: 15, color: C.stoneL, lineHeight: 1.8, marginBottom: 28, fontStyle: 'italic' }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${C.terra}, ${C.amber})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white' }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.warmText }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: C.stone }}>{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section style={{ padding: '140px 40px', background: C.bgLight }}>
        <div className="fade" style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <Pill light>🌱 Ready to grow?</Pill>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: C.espresso, margin: '24px 0 20px' }}>
            Let's build<br />something<br /><GradText from={C.terra} to={C.amber}>great together.</GradText>
          </h2>
          <p style={{ fontSize: 17, color: '#7A6558', lineHeight: 1.8, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
            Your property deserves a brand that feels as good as the experience itself. Tell us about your property — the rest is on us.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>🤝 Start the conversation</button>
            <button className="btn-terra-outline" style={{ fontSize: 14, padding: '14px 28px' }}>See our work →</button>
          </div>

          {/* Reassurance badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 40 }}>
            {['✅ Response within 24h', '🤝 No lock-in contracts', '🌏 Bilingual team', '💯 Always us, never a middleman'].map(b => (
              <span key={b} style={{ fontSize: 13, color: '#7A6558', background: 'rgba(201,82,64,0.08)', borderRadius: 100, padding: '8px 16px', border: '1px solid rgba(201,82,64,0.15)', fontWeight: 500 }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer style={{ background: C.espresso, borderTop: '1px solid rgba(255,255,255,0.05)', padding: '64px 40px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                  <circle cx="11" cy="16" r="8" stroke={C.terra} strokeWidth="2" fill="none"/>
                  <circle cx="21" cy="16" r="8" stroke={C.amber} strokeWidth="2" fill="none"/>
                </svg>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: C.warmText }}>nakama</span>
              </div>
              <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.7, maxWidth: 260, fontWeight: 400 }}>Property branding studio based in Southeast Asia. Growing alongside our clients since 2024.</p>
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                {['🟢 WA', '📸 IG', '💼 LI'].map(s => (
                  <span key={s} style={{ fontSize: 12, color: C.stone, background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '7px 12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.06)' }}>{s}</span>
                ))}
              </div>
            </div>
            {[
              { head: 'Services', links: ['Property Websites', 'WhatsApp Bots', 'OTA Integration'] },
              { head: 'Company', links: ['About', 'Process', 'Work', 'Contact'] },
              { head: 'Connect', links: ['hello@nakama.studio', 'WhatsApp Us', 'Instagram'] },
            ].map(col => (
              <div key={col.head}>
                <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.terra, marginBottom: 18, fontWeight: 700 }}>{col.head}</div>
                {col.links.map(l => (
                  <div key={l} style={{ fontSize: 13, color: C.stone, marginBottom: 12, cursor: 'pointer', fontWeight: 400 }}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 13, color: `${C.stone}90` }}>© {new Date().getFullYear()} Nakama Studio · 仲間 · Growing together.</p>
            <p style={{ fontSize: 12, color: `${C.stone}60`, letterSpacing: '0.06em' }}>PRIVACY · TERMS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
