import React, { useEffect, useRef } from 'react';

/*
  NAKAMA — Bold modern landing page
  Inspired by: large-headline brand-forward style
  Rules: NO emojis · NO pill buttons · NO floating dashboard cards · NO gradient text fills
  Personalized: two real people, direct tone, memorable
  Fonts: Sora (display headlines) + Jost (body/UI)
  Accent: sienna #9B5D3F
*/

const C = {
  bg:     '#120D09',
  bgMid:  '#1C1410',
  bgSoft: '#231A14',
  linen:  '#F0EBE3',
  paper:  '#FAF7F2',
  sienna: '#9B5D3F',
  siennaL:'#C47A55',
  stone:  '#8B7D72',
  stoneL: '#B8ADA6',
  rule:   '#C4A882',
  cream:  '#F5EDD8',
  white:  '#FFFFFF',
};

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Hero entrance ──────────────────────────────────────── */
  @keyframes hFadeUp {
    from { opacity: 0; transform: translateY(44px); }
    to   { opacity: 1; transform: none; }
  }
  @keyframes hFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes hFadeRight {
    from { opacity: 0; transform: translateX(-28px); }
    to   { opacity: 1; transform: none; }
  }
  .h-nav  { animation: hFadeIn   0.7s ease 0.1s  both; }
  .h-pre  { animation: hFadeRight 0.8s ease 0.3s  both; }
  .h-l0   { animation: hFadeUp   1.0s cubic-bezier(.22,1,.36,1) 0.4s  both; }
  .h-l1   { animation: hFadeUp   1.0s cubic-bezier(.22,1,.36,1) 0.56s both; }
  .h-l2   { animation: hFadeUp   1.0s cubic-bezier(.22,1,.36,1) 0.72s both; }
  .h-sub  { animation: hFadeIn   1.0s ease 1.0s both; }
  .h-cta  { animation: hFadeIn   1.0s ease 1.2s both; }

  /* ── Scroll reveals ─────────────────────────────────────── */
  .reveal {
    opacity: 0; transform: translateY(24px);
    transition: opacity 1s cubic-bezier(.22,1,.36,1), transform 1s cubic-bezier(.22,1,.36,1);
  }
  .reveal.on { opacity: 1; transform: none; }
  .d1 { transition-delay: 0.10s !important; }
  .d2 { transition-delay: 0.22s !important; }
  .d3 { transition-delay: 0.34s !important; }
  .d4 { transition-delay: 0.46s !important; }
  .rule-r {
    opacity: 0; transform: scaleX(0); transform-origin: left;
    transition: opacity 0.8s ease, transform 1.2s cubic-bezier(.22,1,.36,1);
  }
  .rule-r.on { opacity: 1; transform: scaleX(1); }

  /* ── Typography ─────────────────────────────────────────── */
  .display { font-family: 'Sora', sans-serif; }
  .label {
    font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 400;
    letter-spacing: 0.20em; text-transform: uppercase;
  }

  /* ── Navigation ─────────────────────────────────────────── */
  .nav-link {
    font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 400;
    color: ${C.stoneL}; text-decoration: none; cursor: pointer;
    transition: color 0.25s ease; letter-spacing: 0.02em;
  }
  .nav-link:hover { color: ${C.cream}; }

  .nav-links-center { display: flex; gap: 40px; align-items: center; }
  @media (max-width: 720px) { .nav-links-center { display: none; } }
  .nav-chat-btn { display: inline-flex !important; }
  @media (max-width: 560px) { .nav-chat-btn { display: none !important; } }

  /* ── Buttons ─────────────────────────────────────────────── */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: ${C.sienna}; color: ${C.cream};
    font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 500;
    letter-spacing: 0.08em; padding: 12px 26px;
    border: none; cursor: pointer; position: relative; overflow: hidden;
    transition: background 0.3s ease;
  }
  .btn-primary:hover { background: ${C.siennaL}; }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: ${C.stoneL};
    font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 400;
    letter-spacing: 0.04em; padding: 12px 26px;
    border: 1px solid rgba(255,255,255,0.15); cursor: pointer;
    transition: border-color 0.25s ease, color 0.25s ease;
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.4); color: ${C.cream}; }

  .btn-ghost-dark {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: ${C.stone};
    font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 400;
    letter-spacing: 0.04em; padding: 12px 26px;
    border: 1px solid ${C.rule}50; cursor: pointer;
    transition: border-color 0.25s ease, color 0.25s ease;
  }
  .btn-ghost-dark:hover { border-color: ${C.sienna}; color: ${C.sienna}; }

  .btn-outline-cream {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: ${C.cream};
    font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 400;
    letter-spacing: 0.04em; padding: 12px 26px;
    border: 1px solid rgba(245,237,216,0.35); cursor: pointer;
    transition: border-color 0.25s ease, background 0.25s ease;
  }
  .btn-outline-cream:hover { border-color: ${C.cream}; background: rgba(245,237,216,0.06); }

  /* ── Section padding ─────────────────────────────────────── */
  .sec-pad     { padding: clamp(72px,10vw,120px) clamp(22px,5vw,64px); }
  .sec-pad-sm  { padding: clamp(48px,7vw,80px) clamp(22px,5vw,64px); }
  .sec-pad-xs  { padding: clamp(32px,5vw,56px) clamp(22px,5vw,64px); }

  /* ── Service rows ────────────────────────────────────────── */
  .svc-row {
    display: grid; grid-template-columns: 48px 1fr 100px;
    align-items: start; padding: 28px 0; gap: 28px;
    border-top: 1px solid rgba(255,255,255,0.07); cursor: default;
  }
  .svc-row:last-child { border-bottom: 1px solid rgba(255,255,255,0.07); }
  .svc-title {
    font-family: 'Sora', sans-serif; font-size: clamp(18px,2.4vw,24px);
    font-weight: 600; color: ${C.cream}; line-height: 1.2;
    transition: color 0.3s ease;
  }
  .svc-row:hover .svc-title { color: ${C.siennaL}; }
  .svc-body {
    max-height: 0; overflow: hidden; opacity: 0;
    transition: max-height 0.5s cubic-bezier(.22,1,.36,1), opacity 0.35s ease;
  }
  .svc-row:hover .svc-body { max-height: 160px; opacity: 1; }
  @media (max-width: 600px) {
    .svc-row { grid-template-columns: 1fr; gap: 8px; }
    .svc-num-col, .svc-cta { display: none; }
  }

  /* ── Two-col section header ──────────────────────────────── */
  .sec-header { display: grid; grid-template-columns: 1fr 1.6fr; gap: 64px; margin-bottom: 64px; align-items: end; }
  @media (max-width: 700px) { .sec-header { grid-template-columns: 1fr; gap: 20px; margin-bottom: 40px; } }

  /* ── About grid ──────────────────────────────────────────── */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
  @media (max-width: 860px) { .about-grid { grid-template-columns: 1fr; gap: 44px; } .about-img { height: 280px !important; } }

  /* ── Stats grid ──────────────────────────────────────────── */
  .stats-grid { display: grid; grid-template-columns: repeat(4,1fr); }
  @media (max-width: 700px) {
    .stats-grid { grid-template-columns: repeat(2,1fr); }
    .stat-cell:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.06) !important; }
    .stat-cell:nth-child(even) { border-right: none !important; }
    .stat-cell { border-bottom: 1px solid rgba(255,255,255,0.06) !important; }
  }

  /* ── Process grid ────────────────────────────────────────── */
  .process-grid { display: grid; grid-template-columns: repeat(4,1fr); border-top: 1px solid rgba(245,237,216,0.10); }
  @media (max-width: 860px) {
    .process-grid { grid-template-columns: repeat(2,1fr); }
    .proc-cell:nth-child(odd) { padding-left: 0 !important; }
    .proc-cell:nth-child(even) { border-right: none !important; }
    .proc-cell:nth-child(3), .proc-cell:nth-child(4) { border-top: 1px solid rgba(245,237,216,0.10); }
  }
  @media (max-width: 480px) {
    .process-grid { grid-template-columns: 1fr; }
    .proc-cell { border-right: none !important; padding-left: 0 !important; padding-right: 0 !important; border-top: 1px solid rgba(245,237,216,0.10) !important; }
    .proc-cell:first-child { border-top: none !important; }
  }

  /* ── Footer grid ─────────────────────────────────────────── */
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  @media (max-width: 700px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; } .footer-brand { grid-column: 1 / -1; } }
  @media (max-width: 420px) { .footer-grid { grid-template-columns: 1fr; } .footer-brand { grid-column: auto; } }

  /* ── Hero sub + CTA row ──────────────────────────────────── */
  .hero-lower { display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: end; margin-top: 52px; }
  @media (max-width: 680px) { .hero-lower { grid-template-columns: 1fr; gap: 28px; } }
  .cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
  @media (max-width: 480px) { .cta-row button { flex: 1 1 140px; justify-content: center; } }

  /* ── Testimonials ────────────────────────────────────────── */
  .testi { padding: 40px 0; border-top: 1px solid rgba(255,255,255,0.07); transition: padding-left 0.4s cubic-bezier(.22,1,.36,1); }
  .testi:hover { padding-left: 18px; }
  .testi:last-child { border-bottom: 1px solid rgba(255,255,255,0.07); }
  @media (max-width: 600px) { .testi:hover { padding-left: 0; } }

  /* ── Marquee ─────────────────────────────────────────────── */
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .mtrack { display: flex; width: max-content; animation: marquee 40s linear infinite; }

  /* ── Atmospheric glow ────────────────────────────────────── */
  @keyframes atm { 0%,100% { opacity:0.8; } 50% { opacity:1; } }

  /* ── Footer links ────────────────────────────────────────── */
  .foot-link { font-family: 'Jost', sans-serif; font-size: 13px; color: ${C.stone}; cursor: pointer; font-weight: 300; transition: color 0.2s ease; display: block; margin-bottom: 10px; }
  .foot-link:hover { color: ${C.stoneL}; }

  /* ── Feature card (dark, flat) ───────────────────────────── */
  .feat-card {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
    padding: clamp(24px,3.5vw,36px); display: flex; flex-direction: column; gap: 14px;
    transition: border-color 0.3s ease, background 0.3s ease;
  }
  .feat-card:hover { border-color: ${C.sienna}55; background: rgba(155,93,63,0.06); }

  /* ── Trust bar ───────────────────────────────────────────── */
  .trust-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.06); margin-top: 56px; padding-top: 44px; justify-content: center; }
  .trust-item { font-family: 'Jost', sans-serif; font-size: 12px; color: rgba(139,125,114,0.7); font-weight: 300; padding: 6px 24px; letter-spacing: 0.04em; }

  /* ── Scroll hint ─────────────────────────────────────────── */
  @media (max-width: 600px) { .scroll-hint { display: none !important; } }
`;

export function LandingPage() {
  const obsRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    obsRef.current = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('on'); obsRef.current?.unobserve(e.target); }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -32px 0px' },
    );
    document.querySelectorAll('.reveal, .rule-r').forEach(el => obsRef.current?.observe(el));
    return () => obsRef.current?.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'Jost', sans-serif", background: C.bg, color: C.cream, overflowX: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Jost:wght@200;300;400;500&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── NAV ───────────────────────────────────────────────── */}
      <nav className="h-nav" style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px,5vw,56px)', height: 68,
        background: `${C.bg}E8`, backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke={C.sienna} strokeWidth="1.5"/>
            <circle cx="9" cy="14" r="3.5" fill={C.sienna}/>
            <circle cx="19" cy="14" r="3.5" fill={C.siennaL} opacity="0.7"/>
          </svg>
          <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: C.cream, letterSpacing: '0.02em' }}>nakama</span>
        </div>

        {/* Center links */}
        <div className="nav-links-center">
          {['Services', 'Process', 'About', 'Stories'].map(l => (
            <span key={l} className="nav-link">{l}</span>
          ))}
        </div>

        {/* Right CTAs */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="btn-ghost nav-chat-btn" style={{ padding: '9px 20px', fontSize: 12 }}>Chat with us</button>
          <button className="btn-primary nav-grow-btn" style={{ padding: '9px 20px', fontSize: 12 }}>Grow with us <span className="arrow">→</span></button>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '0 clamp(22px,5vw,64px) clamp(60px,9vw,96px)',
        position: 'relative', background: C.bg, overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 60% 70% at 80% 50%, rgba(155,93,63,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 10% 80%, rgba(100,52,28,0.22) 0%, transparent 55%)
          `,
          animation: 'atm 9s ease-in-out infinite',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100 }}>
          <p className="h-pre label" style={{ color: C.sienna, marginBottom: 'clamp(20px,3vw,36px)' }}>
            Property Branding Studio · Bali & Southeast Asia
          </p>

          {/* Main headline — large, weight-driven */}
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 0 }}>
            <div style={{ overflow: 'hidden', marginBottom: '0.06em' }}>
              <span className="h-l0" style={{ display: 'block', fontSize: 'clamp(40px,10vw,136px)', color: C.cream }}>Your property's</span>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: '0.06em' }}>
              <span className="h-l1" style={{ display: 'block', fontSize: 'clamp(40px,10vw,136px)', color: C.siennaL }}>best friend</span>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <span className="h-l2" style={{ display: 'block', fontSize: 'clamp(40px,10vw,136px)', color: C.cream }}>is here.</span>
            </div>
          </h1>

          {/* Sub + CTA */}
          <div className="hero-lower">
            <div className="h-sub">
              <p style={{ fontSize: 'clamp(14px,1.8vw,17px)', color: C.stone, lineHeight: 1.85, fontWeight: 300, maxWidth: 500 }}>
                We're not just an agency. <strong style={{ color: C.cream, fontWeight: 500 }}>Nakama means companions.</strong> We grow alongside your property — building the brand, digital systems, and guest experience that make guests return.
              </p>
            </div>
            <div className="h-cta">
              <div className="cta-row">
                <button className="btn-primary">Grow with Nakama</button>
                <button className="btn-ghost">See our work ↓</button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint" style={{
          position: 'absolute', bottom: 36, right: 56,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: 0.35,
        }}>
          <span className="label" style={{ color: C.stoneL, fontSize: 9, writingMode: 'vertical-rl' }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: `linear-gradient(${C.stoneL}, transparent)` }} />
        </div>
      </section>

      {/* ── INTRO STRIP ───────────────────────────────────────── */}
      <section className="sec-pad-xs" style={{ background: C.bgSoft, borderTop: `1px solid rgba(255,255,255,0.05)` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
          <p className="reveal display" style={{ fontSize: 'clamp(18px,2.8vw,32px)', fontWeight: 400, lineHeight: 1.6, color: `${C.cream}90` }}>
            We are two companions who hold a <span style={{ color: C.cream, fontWeight: 600 }}>personal stake</span> in every property we work with — not an account manager, not a junior team.{' '}
            <span style={{ color: C.siennaL }}>You get us. Always.</span>
          </p>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────── */}
      <div style={{ overflow: 'hidden', borderTop: `1px solid rgba(255,255,255,0.05)`, borderBottom: `1px solid rgba(255,255,255,0.05)`, padding: '14px 0', background: C.bg }}>
        <div className="mtrack">
          {Array(2).fill(null).map((_, ri) => (
            <React.Fragment key={ri}>
              {['Property Website Design', '—', 'WhatsApp Automation', '—', 'OTA Integration', '—', 'Brand Identity', '—', 'Guest Experience', '—', 'Revenue Growth', '—'].map((item, i) => (
                <span key={`${ri}-${i}`} style={{
                  padding: '0 24px', whiteSpace: 'nowrap',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: item === '—' ? 14 : 11,
                  letterSpacing: item !== '—' ? '0.18em' : 0,
                  textTransform: item !== '—' ? 'uppercase' as const : 'none' as const,
                  color: item === '—' ? C.sienna : C.stone, fontWeight: 300,
                }}>{item}</span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section id="services" className="sec-pad" style={{ background: C.bg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-header">
            <div className="reveal">
              <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 16 }}>What we do</span>
              <h2 className="display" style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 700, lineHeight: 1.1, color: C.cream }}>
                Three tools.<br />One outcome.
              </h2>
            </div>
            <div className="reveal d1" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <p style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: C.stone, lineHeight: 1.9, fontWeight: 300 }}>
                Each service compounds the others. A great website brings guests in. Automation converts them instantly. Smart distribution keeps calendars full. Together, they make your property self-sustaining.
              </p>
            </div>
          </div>

          {[
            { num: '01', title: 'Property Website Design', desc: "A bespoke website built around your property's character — not a template. Converts browsers to bookers. Reduces OTA dependency.", detail: 'Custom brand design · Direct booking engine · SEO · Performance optimisation' },
            { num: '02', title: 'WhatsApp Automation', desc: "An intelligent guest system that responds to enquiries instantly, qualifies leads, and guides bookings — in your voice, around the clock.", detail: 'Automated flows · Bilingual responses · Booking pipeline · CRM integration' },
            { num: '03', title: 'OTA Channel Integration', desc: 'Your property connected across Airbnb, Booking.com, Agoda, and VRBO — no double bookings, maximum occupancy, one inbox.', detail: 'Multi-channel sync · Dynamic pricing · Centralised inbox · Revenue reporting' },
          ].map((s, i) => (
            <div key={i} className={`reveal d${i + 1} svc-row`}>
              <span className="svc-num-col display" style={{ fontSize: 22, fontWeight: 400, color: `${C.stoneL}50`, lineHeight: 1, paddingTop: 4 }}>{s.num}</span>
              <div>
                <div className="svc-title">{s.title}</div>
                <div className="svc-body">
                  <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.85, marginTop: 12, fontWeight: 300 }}>{s.desc}</p>
                  <p style={{ fontSize: 11, color: `${C.stoneL}80`, letterSpacing: '0.08em', marginTop: 10, fontFamily: "'Jost', sans-serif" }}>{s.detail}</p>
                </div>
              </div>
              <div className="svc-cta" style={{ paddingTop: 4 }}>
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: C.sienna, cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: `1px solid ${C.sienna}50` }}>Learn more →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY NAKAMA (3 flat feature cards) ─────────────────── */}
      <section className="sec-pad" style={{ background: C.bgSoft }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 16 }}>Why us</span>
            <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, lineHeight: 1.1, color: C.cream }}>
              Built different.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 2 }}>
            {[
              { num: '01', head: 'Two people. Full attention.', body: 'When you work with Nakama, you speak directly to the people doing the work. No briefs passed through layers. No surprises.' },
              { num: '02', head: 'We live the Bali market.', body: 'We understand the guests, the platforms, the culture, and the nuance — because we are based here, working in it every day.' },
              { num: '03', head: 'Partners, not vendors.', body: "We don't take projects and disappear. We stay — monitoring, refining, and growing your property's performance long-term." },
            ].map((card, i) => (
              <div key={i} className={`reveal d${i + 1} feat-card`}>
                <span className="label" style={{ color: C.sienna, fontSize: 10 }}>{card.num}</span>
                <h3 className="display" style={{ fontSize: 'clamp(18px,2.2vw,22px)', fontWeight: 700, color: C.cream, lineHeight: 1.25 }}>{card.head}</h3>
                <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.85, fontWeight: 300 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section id="about" className="sec-pad" style={{ background: C.bg }}>
        <div className="about-grid" style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Visual panel */}
          <div className="reveal about-img" style={{ position: 'relative', height: 480, overflow: 'hidden', background: C.bgSoft, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(145deg, rgba(155,93,63,0.35) 0%, transparent 55%)` }} />
            {/* Candi Bentar — Balinese split gate illustration */}
            <svg style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }} width="320" height="360" viewBox="0 0 320 360" fill="none">
              <path d="M52 352 L52 228 L40 216 L40 156 L52 142 L65 120 L78 94 L90 64 L97 34 L103 8 L109 34 L116 64 L129 94 L142 120 L154 142 L167 156 L167 216 L154 228 L154 352Z" stroke="rgba(245,237,216,0.22)" strokeWidth="1.2" fill="none"/>
              <path d="M64 352 L64 242 L58 230 L58 168 L64 156 L76 132 L88 104 L97 72 L103 44 L109 72 L118 104 L130 132 L142 156 L148 168 L148 230 L142 242 L142 352" stroke="rgba(245,237,216,0.08)" strokeWidth="0.8" fill="none"/>
              <line x1="40" y1="216" x2="167" y2="216" stroke="rgba(245,237,216,0.14)" strokeWidth="0.8"/>
              <path d="M268 352 L268 228 L280 216 L280 156 L268 142 L255 120 L242 94 L230 64 L223 34 L217 8 L211 34 L204 64 L191 94 L178 120 L166 142 L153 156 L153 216 L166 228 L166 352Z" stroke="rgba(245,237,216,0.22)" strokeWidth="1.2" fill="none"/>
              <path d="M256 352 L256 242 L262 230 L262 168 L256 156 L244 132 L232 104 L223 72 L217 44 L211 72 L202 104 L190 132 L178 156 L172 168 L172 230 L178 242 L178 352" stroke="rgba(245,237,216,0.08)" strokeWidth="0.8" fill="none"/>
              <line x1="153" y1="216" x2="280" y2="216" stroke="rgba(245,237,216,0.14)" strokeWidth="0.8"/>
              <line x1="16" y1="352" x2="304" y2="352" stroke="rgba(245,237,216,0.18)" strokeWidth="0.9"/>
              <circle cx="160" cy="10" r="4.5" stroke="rgba(245,237,216,0.25)" strokeWidth="0.8" fill="none"/>
              <text x="160" y="372" textAnchor="middle" fill="rgba(245,237,216,0.18)" fontSize="7.5" fontFamily="Jost, sans-serif" letterSpacing="4">CANDI BENTAR · BALI</text>
            </svg>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 32px', background: 'linear-gradient(transparent, rgba(18,13,9,0.9))' }}>
              <p className="label" style={{ color: C.sienna, fontSize: 9, marginBottom: 6 }}>Based in</p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, color: C.cream }}>Bali & Southeast Asia</p>
            </div>
          </div>

          {/* Text */}
          <div className="reveal d1">
            <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 16 }}>About Nakama</span>
            <h2 className="display" style={{ fontSize: 'clamp(28px,3.8vw,46px)', fontWeight: 700, lineHeight: 1.1, color: C.cream, marginBottom: 24 }}>
              Two companions.<br />One philosophy.
            </h2>
            <p style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: C.stone, lineHeight: 1.9, marginBottom: 16, fontWeight: 300 }}>
              We handle every property personally — strategy, brand, design, and technology. When you work with Nakama, you get our direct attention. Every conversation is with the people actually building your brand.
            </p>
            <p style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: C.stone, lineHeight: 1.9, marginBottom: 36, fontWeight: 300 }}>
              Based in Southeast Asia, we understand the Bali market because we live in it — the guests, the culture, the platforms, and the nuance that separates a good listing from a destination people return to.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {['Direct access — always us, never an intermediary', 'Bilingual — English and Bahasa Indonesia', 'Long-term partners, not project-based vendors', 'Strategy, design, and technology — all in-house'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: `1px solid rgba(255,255,255,0.06)`, fontSize: 14, color: C.stone, fontWeight: 300, lineHeight: 1.6 }}>
                  <span style={{ color: C.sienna, flexShrink: 0 }}>—</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 36 }}>
              <button className="btn-primary">Talk to us directly →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="sec-pad-sm" style={{ background: C.bgSoft, borderTop: `1px solid rgba(255,255,255,0.05)`, borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
        <div className="stats-grid" style={{ maxWidth: 1100, margin: '0 auto' }}>
          {[['3×', 'More direct bookings', 'vs. OTA-only listings'], ['40%', 'Higher nightly rates', 'for branded properties'], ['85%', 'Enquiries handled', 'via automation'], ['100%', 'Bespoke', 'no templates, ever']].map(([num, label, sub], i) => (
            <div key={String(num)} className={`reveal d${i + 1} stat-cell`} style={{ textAlign: 'center', padding: 'clamp(20px,4vw,40px) 16px', borderRight: i < 3 ? `1px solid rgba(255,255,255,0.06)` : 'none' }}>
              <div className="display" style={{ fontSize: 'clamp(38px,6vw,58px)', fontWeight: 800, color: C.siennaL, lineHeight: 1 }}>{num}</div>
              <div className="label" style={{ color: C.stoneL, marginTop: 14, fontSize: 10 }}>{label}</div>
              <div style={{ fontSize: 12, color: `${C.stone}70`, marginTop: 6, fontWeight: 300 }}>{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────── */}
      <section id="process" className="sec-pad" style={{ background: C.bg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-header">
            <div className="reveal">
              <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 16 }}>How it works</span>
              <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, lineHeight: 1.1, color: C.cream }}>
                A clear path.<br />No surprises.
              </h2>
            </div>
            <div className="reveal d1" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <p style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: C.stone, lineHeight: 1.9, fontWeight: 300 }}>Four phases. Clear deliverables. Your sign-off before we proceed at each stage. You're always informed, never overwhelmed.</p>
            </div>
          </div>
          <div className="process-grid">
            {[
              { num: '01', phase: 'Discovery', title: 'Site & Market Analysis', desc: "We understand your property's character, competitive position, and revenue benchmarks before anything else." },
              { num: '02', phase: 'Design', title: 'Brand & Blueprint', desc: 'Identity, messaging, wireframes, automation flows — developed together and approved before we build.' },
              { num: '03', phase: 'Build', title: 'Construction', desc: 'Website, WhatsApp system, channel integrations — built, connected, and tested thoroughly before launch.' },
              { num: '04', phase: 'Launch', title: 'Growth', desc: 'You go live. We stay — monitoring performance, refining systems, growing alongside you long-term.' },
            ].map((step, i) => (
              <div key={i} className={`reveal d${i + 1} proc-cell`} style={{
                padding: 'clamp(28px,4vw,44px) 0',
                paddingLeft: i > 0 ? 'clamp(14px,3vw,28px)' : 0,
                paddingRight: i < 3 ? 'clamp(14px,3vw,28px)' : 0,
                borderRight: i < 3 ? `1px solid rgba(245,237,216,0.08)` : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                  <span className="display" style={{ fontSize: 26, fontWeight: 700, color: C.sienna, lineHeight: 1 }}>{step.num}</span>
                  <span className="label" style={{ color: C.stone, fontSize: 9 }}>{step.phase}</span>
                </div>
                <div className="display" style={{ fontSize: 'clamp(16px,2vw,19px)', fontWeight: 600, color: C.cream, lineHeight: 1.3, marginBottom: 12 }}>{step.title}</div>
                <p style={{ fontSize: 13, color: C.stone, lineHeight: 1.85, fontWeight: 300 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section id="stories" className="sec-pad" style={{ background: C.bgSoft }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-header">
            <div className="reveal">
              <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 16 }}>Client voices</span>
              <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, lineHeight: 1.1, color: C.cream }}>
                What our<br />clients say.
              </h2>
            </div>
          </div>
          {[
            { quote: "Within three months of working with Nakama, our direct bookings tripled. They understand that a property isn't just a listing — it's an experience that deserves its own story.", name: 'Rina H.', role: 'Villa Owner · Seminyak, Bali' },
            { quote: 'The WhatsApp system they built handles 80% of our guest enquiries automatically. Our team now spends its energy hosting, not answering the same questions on repeat.', name: 'Ahmad Z.', role: 'Property Group · Kuala Lumpur' },
            { quote: 'Professional, deeply attentive, and genuinely invested. They feel less like a vendor and more like a partner who holds a real stake in what we are building together.', name: 'Sita P.', role: 'Boutique Retreat · Ubud, Bali' },
          ].map((t, i) => (
            <div key={i} className={`reveal d${i % 3} testi`}>
              <p className="display" style={{ fontSize: 'clamp(16px,2.2vw,24px)', fontWeight: 400, color: `${C.cream}90`, lineHeight: 1.7, marginBottom: 24, maxWidth: 820 }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 1, height: 28, background: C.sienna }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.cream, fontFamily: "'Sora', sans-serif" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: C.stone, marginTop: 2, fontWeight: 300 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="sec-pad" style={{ background: C.bg, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 55% 70% at 50% 100%, rgba(155,93,63,0.2) 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span className="reveal d1 label" style={{ color: C.sienna, display: 'block', marginBottom: 24, fontSize: 10 }}>Ready to grow</span>
          <h2 className="reveal d2 display" style={{ fontSize: 'clamp(40px,7vw,84px)', fontWeight: 800, lineHeight: 1.0, color: C.cream, marginBottom: 24, letterSpacing: '-0.03em' }}>
            Let's grow<br /><span style={{ color: C.siennaL }}>together.</span>
          </h2>
          <p className="reveal d3" style={{ fontSize: 'clamp(13px,1.6vw,16px)', color: C.stone, lineHeight: 1.9, marginBottom: 44, fontWeight: 300 }}>
            Your property has a story worth telling. We will help you find it, build around it, and make it earn — as true partners from the very first conversation.
          </p>
          <div className="reveal d4" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary">Grow with Nakama →</button>
            <button className="btn-outline-cream">View our work</button>
          </div>
          <div className="reveal d4 trust-bar">
            {['Response within 24h', 'No lock-in contracts', 'Bilingual team', 'Bali-based'].map((item, i, arr) => (
              <span key={item} className="trust-item" style={{ borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{ background: C.bgSoft, borderTop: `1px solid rgba(255,255,255,0.06)`, padding: 'clamp(44px,7vw,64px) clamp(22px,5vw,56px) 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="footer-grid">
            <div className="footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke={C.sienna} strokeWidth="1.5"/>
                  <circle cx="9" cy="14" r="3.5" fill={C.sienna}/>
                  <circle cx="19" cy="14" r="3.5" fill={C.siennaL} opacity="0.7"/>
                </svg>
                <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 700, color: C.cream }}>nakama</span>
              </div>
              <p style={{ fontSize: 13, color: C.stone, lineHeight: 1.75, fontWeight: 300, maxWidth: 210 }}>Property branding studio, Bali & Southeast Asia. Growing alongside our clients since 2024.</p>
            </div>
            {[
              { head: 'Services', links: ['Property Websites', 'WhatsApp Automation', 'OTA Integration', 'Brand Strategy'] },
              { head: 'Company', links: ['About', 'Process', 'Our Work', 'Contact'] },
              { head: 'Connect', links: ['hello@nakama.studio', 'WhatsApp us', 'LinkedIn', 'Instagram'] },
            ].map(col => (
              <div key={col.head}>
                <div className="label" style={{ color: C.sienna, marginBottom: 16, fontSize: 9 }}>{col.head}</div>
                {col.links.map(l => <span key={l} className="foot-link">{l}</span>)}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <p style={{ fontSize: 13, color: `${C.stone}70`, fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>© {new Date().getFullYear()} Nakama Studio · Crafted with intention.</p>
            <p className="label" style={{ fontSize: 10, color: `${C.stone}50` }}>Privacy · Terms</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
