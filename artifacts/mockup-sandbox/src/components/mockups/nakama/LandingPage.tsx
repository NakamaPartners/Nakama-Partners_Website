import React, { useEffect, useRef } from 'react';

/*
  NAKAMA — Aman-inspired editorial landing page
  Rules: no emojis · no pills · no gradient fills · no tech UI
  Playfulness = motion only (CSS keyframes, scroll reveals, hover)
  Fonts: Cormorant Garamond (display) + DM Sans (body/UI)
  Accent: warm sienna #9B5D3F only
*/

const C = {
  linen:   '#F0EBE3',
  paper:   '#FAF7F2',
  dark:    '#1C1410',
  deeper:  '#120D09',
  sienna:  '#9B5D3F',
  stone:   '#8B7D72',
  stoneL:  '#B8ADA6',
  rule:    '#C4A882',
  cream:   '#F5EDD8',
};

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Hero entrance (pure CSS, no JS state) ─────────────── */
  @keyframes hFadeUp {
    from { opacity: 0; transform: translateY(38px); }
    to   { opacity: 1; transform: none; }
  }
  @keyframes hFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .h-eye  { animation: hFadeIn  0.9s ease 0.15s both; }
  .h-l0   { animation: hFadeUp  1.2s cubic-bezier(.22,1,.36,1) 0.3s  both; }
  .h-l1   { animation: hFadeUp  1.2s cubic-bezier(.22,1,.36,1) 0.48s both; }
  .h-l2   { animation: hFadeUp  1.2s cubic-bezier(.22,1,.36,1) 0.66s both; }
  .h-foot { animation: hFadeIn  1s   ease 1.05s both; }
  .h-scrl { animation: hFadeIn  1s   ease 1.45s both; }
  .h-nav  { animation: hFadeIn  0.9s ease 0.5s  both; }

  /* ── Scroll reveals ─────────────────────────────────────── */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition:
      opacity  1.1s cubic-bezier(.22,1,.36,1),
      transform 1.1s cubic-bezier(.22,1,.36,1);
  }
  .reveal.on { opacity: 1; transform: none; }
  .d1 { transition-delay: 0.10s !important; }
  .d2 { transition-delay: 0.22s !important; }
  .d3 { transition-delay: 0.34s !important; }
  .d4 { transition-delay: 0.46s !important; }

  /* Line reveals */
  .rule-r {
    opacity: 0; transform: scaleX(0); transform-origin: left;
    transition: opacity 0.8s ease, transform 1.2s cubic-bezier(.22,1,.36,1);
  }
  .rule-r.on { opacity: 1; transform: scaleX(1); }

  /* ── Typography ─────────────────────────────────────────── */
  .serif { font-family: 'Cormorant Garamond', serif; }
  .sans  { font-family: 'DM Sans', sans-serif; }
  .label {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase;
  }

  /* ── Navigation ─────────────────────────────────────────── */
  .nav-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 400;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: ${C.stone}; text-decoration: none;
    position: relative; cursor: pointer;
    transition: color 0.3s ease;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 1px; background: ${C.dark};
    transition: width 0.35s cubic-bezier(.22,1,.36,1);
  }
  .nav-link:hover { color: ${C.dark}; }
  .nav-link:hover::after { width: 100%; }
  .nav-link.lt { color: ${C.stoneL}; }
  .nav-link.lt::after { background: white; }
  .nav-link.lt:hover { color: white; }

  /* ── Buttons ─────────────────────────────────────────────── */
  .btn-dark {
    display: inline-flex; align-items: center; gap: 10px;
    background: ${C.dark}; color: ${C.cream};
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase;
    padding: 13px 28px; border: none; cursor: pointer;
    position: relative; overflow: hidden;
    transition: color 0.3s ease;
  }
  .btn-dark::before {
    content: ''; position: absolute; inset: 0;
    background: ${C.sienna}; transform: translateX(-101%);
    transition: transform 0.4s cubic-bezier(.22,1,.36,1);
  }
  .btn-dark:hover::before { transform: translateX(0); }
  .btn-dark > * { position: relative; z-index: 1; }

  .btn-cream {
    display: inline-flex; align-items: center; gap: 10px;
    background: ${C.cream}; color: ${C.dark};
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase;
    padding: 13px 28px; border: none; cursor: pointer;
    position: relative; overflow: hidden;
  }
  .btn-cream::before {
    content: ''; position: absolute; inset: 0;
    background: white; transform: translateX(-101%);
    transition: transform 0.4s cubic-bezier(.22,1,.36,1);
  }
  .btn-cream:hover::before { transform: translateX(0); }
  .btn-cream > * { position: relative; z-index: 1; }

  .btn-ghost-light {
    display: inline-flex; align-items: center; gap: 10px;
    background: transparent; color: ${C.stoneL};
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 400;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 13px 28px; border: 1px solid rgba(245,237,216,0.22); cursor: pointer;
    transition: border-color 0.3s ease, color 0.3s ease;
  }
  .btn-ghost-light:hover { border-color: rgba(245,237,216,0.55); color: ${C.cream}; }

  /* ── Service rows ────────────────────────────────────────── */
  .svc-row {
    display: grid; grid-template-columns: 72px 1fr auto;
    align-items: start; padding: 36px 0; gap: 36px;
    border-top: 1px solid ${C.rule}40; cursor: default;
  }
  .svc-row:last-child { border-bottom: 1px solid ${C.rule}40; }
  .svc-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 400; color: ${C.dark};
    line-height: 1.2; transition: color 0.3s ease;
  }
  .svc-row:hover .svc-title { color: ${C.sienna}; }
  .svc-body {
    max-height: 0; overflow: hidden; opacity: 0;
    transition: max-height 0.55s cubic-bezier(.22,1,.36,1), opacity 0.4s ease;
  }
  .svc-row:hover .svc-body { max-height: 160px; opacity: 1; }
  .text-link {
    font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: ${C.sienna}; cursor: pointer;
    border-bottom: 1px solid ${C.sienna}50;
    transition: border-color 0.3s ease; padding-bottom: 1px;
  }
  .text-link:hover { border-bottom-color: ${C.sienna}; }

  /* ── Testimonials ────────────────────────────────────────── */
  .testi {
    padding: 48px 0; border-top: 1px solid ${C.rule}40;
    transition: padding-left 0.4s cubic-bezier(.22,1,.36,1);
  }
  .testi:hover { padding-left: 24px; }
  .testi:last-child { border-bottom: 1px solid ${C.rule}40; }

  /* ── Pull quote ──────────────────────────────────────────── */
  .pull-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(26px, 3.6vw, 50px);
    font-weight: 300; font-style: italic; line-height: 1.55;
  }

  /* ── Marquee ─────────────────────────────────────────────── */
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .mtrack { display: flex; width: max-content; animation: marquee 42s linear infinite; }

  /* ── Atmospheric bg ──────────────────────────────────────── */
  @keyframes atm { 0%,100% { opacity:0.85; } 50% { opacity:1; } }

  /* ── Footer link hover ───────────────────────────────────── */
  .foot-link {
    font-size: 13px; color: ${C.stone}; cursor: pointer; font-weight: 300;
    transition: color 0.2s ease; display: block; margin-bottom: 12px;
  }
  .foot-link:hover { color: ${C.stoneL}; }
`;

export function LandingPage() {
  const obsRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    obsRef.current = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('on'); obsRef.current?.unobserve(e.target); }
      }),
      { threshold: 0.07, rootMargin: '0px 0px -36px 0px' },
    );
    document.querySelectorAll('.reveal, .rule-r').forEach(el => obsRef.current?.observe(el));
    return () => obsRef.current?.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: C.linen, color: C.dark, overflowX: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── NAV ───────────────────────────────────────────────── */}
      <nav className="h-nav" style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', padding: '0 52px', height: 72,
        background: `${C.deeper}CC`, backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(196,168,130,0.12)',
      }}>
        <div style={{ display: 'flex', gap: 36 }}>
          {['Services', 'Process', 'About'].map(l => <span key={l} className="nav-link lt">{l}</span>)}
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase', color: C.cream }}>
          NAKAMA
        </div>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center', justifyContent: 'flex-end' }}>
          <span className="nav-link lt">Stories</span>
          <button className="btn-cream"><span>Begin here</span></button>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '0 52px 88px',
        position: 'relative', background: C.deeper, overflow: 'hidden',
      }}>
        {/* Atmospheric gradient orbs */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 55% 65% at 15% 85%, rgba(155,93,63,0.55) 0%, transparent 60%),
            radial-gradient(ellipse 45% 55% at 78% 18%, rgba(100,52,28,0.45) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 90% 85%, rgba(80,38,18,0.3) 0%, transparent 65%)
          `,
          animation: 'atm 8s ease-in-out infinite',
        }} />
        {/* Batik texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 2L38 20 20 38 2 20Z' stroke='%23C4A882' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
        }} />
        {/* Decorative kanji — far right, very faint */}
        <div style={{
          position: 'absolute', top: '50%', right: '-2%', transform: 'translateY(-50%)',
          fontFamily: "'Cormorant Garamond', serif", fontSize: 480, fontWeight: 300,
          color: C.cream, opacity: 0.025, userSelect: 'none', pointerEvents: 'none', lineHeight: 1,
        }}>仲</div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100 }}>
          <p className="h-eye label" style={{ color: C.stoneL, marginBottom: 44 }}>
            Property Branding Studio · Southeast Asia
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: 0 }}>
            {[
              { text: 'Your property,',     style: { color: `${C.cream}70`, fontSize: 'clamp(50px,7.5vw,100px)' as const }, cls: 'h-l0' },
              { text: 'deserves a story',   style: { color: C.cream, fontSize: 'clamp(50px,7.5vw,100px)' as const, fontStyle: 'italic' as const }, cls: 'h-l1' },
              { text: 'worth telling.',     style: { color: `${C.cream}70`, fontSize: 'clamp(50px,7.5vw,100px)' as const }, cls: 'h-l2' },
            ].map((line, i) => (
              <div key={i} style={{ overflow: 'hidden', marginBottom: i < 2 ? 2 : 0 }}>
                <span className={line.cls} style={{ display: 'block', ...line.style }}>{line.text}</span>
              </div>
            ))}
          </h1>

          <div className="h-foot" style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginTop: 64, paddingTop: 36, borderTop: `1px solid ${C.cream}15`,
          }}>
            <p style={{ fontSize: 15, color: C.stone, lineHeight: 1.85, maxWidth: 420, fontWeight: 300 }}>
              We are Nakama — companions who build the brand, digital systems, and guest experience that transform a property into a destination guests seek out, and return to.
            </p>
            <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
              <button className="btn-cream"><span>Grow with us</span><span>↓</span></button>
              <button className="btn-ghost-light">See our work</button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="h-scrl" style={{
          position: 'absolute', bottom: 36, right: 52,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: 0.45,
        }}>
          <span className="label" style={{ color: C.stoneL, fontSize: 9, writingMode: 'vertical-rl' }}>Scroll</span>
          <div style={{ width: 1, height: 44, background: `linear-gradient(${C.stoneL}, transparent)` }} />
        </div>
      </section>

      {/* ── PHILOSOPHY ────────────────────────────────────────── */}
      <section style={{ padding: '120px 52px', background: C.linen }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <hr className="rule-r" style={{ height: 1, background: C.rule, border: 'none', marginBottom: 64 }} />
          <p className="reveal serif" style={{ fontSize: 'clamp(22px,3.2vw,42px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.65, color: C.dark }}>
            仲間 (Nakama) — companions who face the journey together. We are not an agency with account managers and junior teams. We are two people who hold a personal stake in every property we work with.
          </p>
          <hr className="rule-r d2" style={{ height: 1, background: C.rule, border: 'none', marginTop: 64, transformOrigin: 'right' }} />
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────── */}
      <div style={{ overflow: 'hidden', borderTop: `1px solid ${C.rule}28`, borderBottom: `1px solid ${C.rule}28`, padding: '17px 0', background: C.paper }}>
        <div className="mtrack">
          {Array(2).fill(null).map((_, ri) => (
            <React.Fragment key={ri}>
              {['Property Website Design', '·', 'WhatsApp Automation', '·', 'OTA Integration', '·', 'Brand Identity', '·', 'Guest Experience', '·', 'Revenue Growth', '·'].map((item, i) => (
                <span key={`${ri}-${i}`} style={{
                  padding: '0 32px', whiteSpace: 'nowrap',
                  fontFamily: item === '·' ? 'Georgia, serif' : "'DM Sans', sans-serif",
                  fontSize: item === '·' ? 18 : 12, letterSpacing: item !== '·' ? '0.14em' : 0,
                  textTransform: item !== '·' ? 'uppercase' as const : 'none' as const,
                  color: item === '·' ? C.sienna : C.stone, fontWeight: 300,
                }}>{item}</span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section id="services" style={{ padding: '120px 52px', background: C.paper }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 72, marginBottom: 72 }}>
            <div className="reveal">
              <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 20 }}>What we offer</span>
              <h2 className="serif" style={{ fontSize: 'clamp(34px,3.8vw,50px)', fontWeight: 300, lineHeight: 1.15, color: C.dark }}>
                Three disciplines.<br />One partnership.
              </h2>
            </div>
            <div className="reveal d1" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <p style={{ fontSize: 15, color: C.stone, lineHeight: 1.9, fontWeight: 300, maxWidth: 480 }}>
                Each service is designed to compound the others. A beautiful website captures the guest. Automation keeps them engaged. Distribution ensures you're visible everywhere that matters.
              </p>
            </div>
          </div>

          {[
            { num: '01', title: 'Property Website Design', desc: "A bespoke website built around your property's character — not a template. Designed to convert browsers to bookers and reduce OTA commission dependency.", detail: 'Custom brand design · Direct booking engine · SEO architecture · Performance optimisation' },
            { num: '02', title: 'WhatsApp Automation', desc: "An intelligent guest system that responds to enquiries instantly, qualifies leads, and guides bookings — in your brand's voice, around the clock.", detail: 'Automated flows · Bilingual responses · Booking pipeline · CRM integration' },
            { num: '03', title: 'OTA Channel Integration', desc: 'Your property connected and synchronised across Airbnb, Booking.com, Agoda, and VRBO — no double bookings, maximum calendar occupancy.', detail: 'Multi-channel sync · Dynamic pricing · Centralised inbox · Revenue reporting' },
          ].map((s, i) => (
            <div key={i} className={`reveal d${i + 1} svc-row`}>
              <span className="serif" style={{ fontSize: 32, fontWeight: 300, color: `${C.stoneL}70`, lineHeight: 1, marginTop: 4 }}>{s.num}</span>
              <div>
                <div className="svc-title">{s.title}</div>
                <div className="svc-body">
                  <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.85, marginTop: 14, fontWeight: 300 }}>{s.desc}</p>
                  <p style={{ fontSize: 11, color: C.stoneL, letterSpacing: '0.09em', marginTop: 10 }}>{s.detail}</p>
                </div>
              </div>
              <span className="text-link" style={{ marginTop: 8, whiteSpace: 'nowrap', flexShrink: 0 }}>Explore →</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── DARK PULL QUOTE ───────────────────────────────────── */}
      <section style={{ background: C.dark, padding: '136px 52px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 60% 80% at 50% 110%, rgba(155,93,63,0.25) 0%, transparent 65%)`,
        }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 2L38 20 20 38 2 20Z' stroke='%23C4A882' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <hr className="rule-r" style={{ height: 1, background: C.rule, border: 'none', opacity: 0.4, marginBottom: 56 }} />
          <blockquote className="reveal d1 pull-quote" style={{ color: C.cream }}>
            "A property is just a building until it holds a story worth sharing — and a brand that makes the right guests feel it was built for them."
          </blockquote>
          <p className="reveal d2 label" style={{ color: C.stoneL, marginTop: 36, fontSize: 10 }}>Nakama Studio · 仲間</p>
          <hr className="rule-r d3" style={{ height: 1, background: C.rule, border: 'none', opacity: 0.4, marginTop: 56, transformOrigin: 'right' }} />
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section id="about" style={{ padding: '120px 52px', background: C.linen }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' }}>

          {/* Atmospheric panel */}
          <div className="reveal" style={{ position: 'relative', height: 520, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(155deg, ${C.sienna} 0%, #5C2E1A 48%, ${C.dark} 100%)` }} />
            <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 2L38 20 20 38 2 20Z' stroke='%23C4A882' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }} />
            <svg style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }} width="320" height="360" viewBox="0 0 320 360" fill="none">
              {/* Candi Bentar — left gate */}
              <path d="M52 352 L52 228 L40 216 L40 156 L52 142 L65 120 L78 94 L90 64 L97 34 L103 8 L109 34 L116 64 L129 94 L142 120 L154 142 L167 156 L167 216 L154 228 L154 352Z" stroke="rgba(245,237,216,0.28)" strokeWidth="1.2" fill="none"/>
              <path d="M64 352 L64 242 L58 230 L58 168 L64 156 L76 132 L88 104 L97 72 L103 44 L109 72 L118 104 L130 132 L142 156 L148 168 L148 230 L142 242 L142 352" stroke="rgba(245,237,216,0.10)" strokeWidth="0.7" fill="none"/>
              <line x1="40" y1="216" x2="167" y2="216" stroke="rgba(245,237,216,0.18)" strokeWidth="0.8"/>
              <line x1="40" y1="188" x2="167" y2="188" stroke="rgba(245,237,216,0.10)" strokeWidth="0.6"/>
              {/* Right gate */}
              <path d="M268 352 L268 228 L280 216 L280 156 L268 142 L255 120 L242 94 L230 64 L223 34 L217 8 L211 34 L204 64 L191 94 L178 120 L166 142 L153 156 L153 216 L166 228 L166 352Z" stroke="rgba(245,237,216,0.28)" strokeWidth="1.2" fill="none"/>
              <path d="M256 352 L256 242 L262 230 L262 168 L256 156 L244 132 L232 104 L223 72 L217 44 L211 72 L202 104 L190 132 L178 156 L172 168 L172 230 L178 242 L178 352" stroke="rgba(245,237,216,0.10)" strokeWidth="0.7" fill="none"/>
              <line x1="153" y1="216" x2="280" y2="216" stroke="rgba(245,237,216,0.18)" strokeWidth="0.8"/>
              {/* Ground + centre */}
              <line x1="16" y1="352" x2="304" y2="352" stroke="rgba(245,237,216,0.22)" strokeWidth="0.9"/>
              <line x1="160" y1="8" x2="160" y2="352" stroke="rgba(245,237,216,0.05)" strokeWidth="1" strokeDasharray="5 8"/>
              <circle cx="160" cy="10" r="4.5" stroke="rgba(245,237,216,0.3)" strokeWidth="0.8" fill="none"/>
              <circle cx="160" cy="10" r="1.8" fill="rgba(245,237,216,0.2)"/>
              <text x="160" y="372" textAnchor="middle" fill="rgba(245,237,216,0.22)" fontSize="7.5" fontFamily="DM Sans, sans-serif" letterSpacing="4">CANDI BENTAR · BALI</text>
            </svg>
          </div>

          {/* Text */}
          <div className="reveal d1">
            <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 20 }}>About Nakama</span>
            <h2 className="serif" style={{ fontSize: 'clamp(34px,3.8vw,50px)', fontWeight: 300, lineHeight: 1.15, color: C.dark, marginBottom: 30 }}>
              Two companions.<br /><em>One philosophy.</em>
            </h2>
            <p style={{ fontSize: 15, color: C.stone, lineHeight: 1.9, marginBottom: 18, fontWeight: 300 }}>
              We are not an agency with account managers and junior teams. We are two people who handle every property personally — strategy, brand, design, and technology — all of it. When you work with Nakama, you have our direct attention, always.
            </p>
            <p style={{ fontSize: 15, color: C.stone, lineHeight: 1.9, marginBottom: 38, fontWeight: 300 }}>
              We work across Southeast Asia and understand this market because we live in it — the guests, the culture, the platforms, the nuance.
            </p>
            <div>
              {['Direct access — always us, never an intermediary', 'Bilingual — English and Bahasa Indonesia', 'Long-term partners, not project-based vendors', 'Strategy, design, and technology — all in-house'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '13px 0', borderBottom: `1px solid ${C.rule}28`, fontSize: 14, color: C.stone, fontWeight: 300, lineHeight: 1.6 }}>
                  <span style={{ color: C.sienna, flexShrink: 0 }}>—</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────────────────── */}
      <section style={{ background: C.dark, padding: '72px 52px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {[['3×', 'More direct bookings', 'vs. unbranded listings'], ['40%', 'Higher daily rates', 'for branded properties'], ['85%', 'Enquiries handled', 'via automation'], ['100%', 'Bespoke', 'no templates, ever']].map(([num, label, sub], i) => (
            <div key={String(num)} className={`reveal d${i + 1}`} style={{ textAlign: 'center', padding: '28px 16px', borderRight: i < 3 ? `1px solid ${C.cream}0E` : 'none' }}>
              <div className="serif" style={{ fontSize: 54, fontWeight: 300, color: C.cream, lineHeight: 1 }}>{num}</div>
              <div className="label" style={{ color: C.stoneL, marginTop: 12, fontSize: 10 }}>{label}</div>
              <div style={{ fontSize: 12, color: `${C.stone}80`, marginTop: 6, fontWeight: 300 }}>{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────── */}
      <section id="process" style={{ padding: '120px 52px', background: C.paper }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 72, marginBottom: 80 }}>
            <div className="reveal">
              <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 20 }}>Methodology</span>
              <h2 className="serif" style={{ fontSize: 'clamp(34px,3.8vw,50px)', fontWeight: 300, lineHeight: 1.15, color: C.dark }}>
                A clear path.<br /><em>No surprises.</em>
              </h2>
            </div>
            <div className="reveal d1" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <p style={{ fontSize: 15, color: C.stone, lineHeight: 1.9, fontWeight: 300 }}>Four phases, each with clear deliverables and your sign-off before we proceed. You're always informed, always in control — without being overwhelmed by detail.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: `1px solid ${C.rule}40` }}>
            {[
              { num: '01', phase: 'Discovery', title: 'Site & Market Analysis', desc: "We understand your property's character, competitive position, and revenue benchmarks before anything else." },
              { num: '02', phase: 'Design', title: 'Brand & Blueprint', desc: 'Identity, messaging, wireframes, automation flows — developed together, reviewed and approved before we build.' },
              { num: '03', phase: 'Build', title: 'Construction', desc: 'Website, WhatsApp system, channel integrations — built, integrated, and tested thoroughly before launch.' },
              { num: '04', phase: 'Launch', title: 'Growth', desc: 'You go live. We remain — monitoring performance, refining systems, growing the asset alongside you long-term.' },
            ].map((step, i) => (
              <div key={i} className={`reveal d${i + 1}`} style={{
                padding: '48px 0', paddingLeft: i > 0 ? 32 : 0, paddingRight: i < 3 ? 32 : 0,
                borderRight: i < 3 ? `1px solid ${C.rule}30` : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                  <span className="serif" style={{ fontSize: 34, fontWeight: 300, color: `${C.stoneL}55`, lineHeight: 1 }}>{step.num}</span>
                  <span className="label" style={{ color: C.sienna, fontSize: 9 }}>{step.phase}</span>
                </div>
                <div className="serif" style={{ fontSize: 22, fontWeight: 400, color: C.dark, lineHeight: 1.3, marginBottom: 14 }}>{step.title}</div>
                <p style={{ fontSize: 13, color: C.stone, lineHeight: 1.85, fontWeight: 300 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section id="stories" style={{ padding: '120px 52px', background: C.linen }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 72, marginBottom: 80 }}>
            <div className="reveal">
              <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 20 }}>Client voices</span>
              <h2 className="serif" style={{ fontSize: 'clamp(34px,3.8vw,50px)', fontWeight: 300, lineHeight: 1.15, color: C.dark }}>
                What our<br /><em>nakama say.</em>
              </h2>
            </div>
          </div>
          {[
            { quote: "Within three months of working with Nakama, our direct bookings tripled. They understand that a property isn't just a listing — it's an experience that deserves its own story.", name: 'Rina H.', role: 'Villa Owner · Seminyak, Bali' },
            { quote: 'The WhatsApp system they built handles 80% of our guest enquiries automatically. Our team now spends its energy hosting, not answering the same questions on repeat.', name: 'Ahmad Z.', role: 'Property Group · Kuala Lumpur' },
            { quote: 'Professional, deeply attentive, and genuinely invested. They feel less like a vendor and more like a partner who holds a real stake in what we are building together.', name: 'Sita P.', role: 'Boutique Retreat · Ubud, Bali' },
          ].map((t, i) => (
            <div key={i} className={`reveal d${i % 3} testi`}>
              <p className="serif" style={{ fontSize: 'clamp(19px,2.4vw,28px)', fontWeight: 300, fontStyle: 'italic', color: C.dark, lineHeight: 1.65, marginBottom: 28, maxWidth: 820 }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{ width: 1, height: 32, background: C.sienna }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: C.dark, letterSpacing: '0.04em' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: C.stone, marginTop: 2, fontWeight: 300 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section style={{ background: C.dark, padding: '152px 52px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 75% at 50% 100%, rgba(155,93,63,0.28) 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 2L38 20 20 38 2 20Z' stroke='%23C4A882' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <hr className="rule-r" style={{ height: 1, background: C.rule, border: 'none', opacity: 0.4, marginBottom: 56 }} />
          <span className="reveal d1 label" style={{ color: C.stoneL, display: 'block', marginBottom: 28, fontSize: 10 }}>Begin the journey</span>
          <h2 className="reveal d2 serif" style={{ fontSize: 'clamp(46px,6.5vw,84px)', fontWeight: 300, lineHeight: 1.08, color: C.cream, marginBottom: 32 }}>
            Let's grow<br /><em>together.</em>
          </h2>
          <p className="reveal d3" style={{ fontSize: 15, color: C.stone, lineHeight: 1.9, marginBottom: 52, fontWeight: 300 }}>
            Your property has a story worth telling. We will help you find it, build around it, and make it earn — as true partners from the very first conversation.
          </p>
          <div className="reveal d4" style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
            <button className="btn-cream"><span>Grow with Nakama</span><span>→</span></button>
            <button className="btn-ghost-light">View our work</button>
          </div>
          <div className="reveal d4" style={{ display: 'flex', gap: 0, justifyContent: 'center', marginTop: 64, paddingTop: 52, borderTop: `1px solid ${C.cream}0F`, flexWrap: 'wrap' }}>
            {['Response within 24h', 'No lock-in contracts', 'Bilingual team', 'SE Asia–based'].map((item, i) => (
              <span key={item} style={{ fontSize: 12, color: `${C.stoneL}80`, fontWeight: 300, letterSpacing: '0.04em', padding: '0 28px', borderRight: i < 3 ? `1px solid ${C.cream}10` : 'none' }}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{ background: C.deeper, borderTop: `1px solid ${C.cream}07`, padding: '64px 52px 36px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 52, paddingBottom: 48, borderBottom: `1px solid ${C.cream}07` }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase', color: C.cream, marginBottom: 16 }}>NAKAMA</div>
              <p style={{ fontSize: 13, color: C.stone, lineHeight: 1.75, fontWeight: 300, maxWidth: 220 }}>Property branding studio, Southeast Asia. Growing alongside our clients since 2024.</p>
            </div>
            {[
              { head: 'Services', links: ['Property Websites', 'WhatsApp Automation', 'OTA Integration', 'Brand Strategy'] },
              { head: 'Company', links: ['About', 'Process', 'Our Work', 'Contact'] },
              { head: 'Connect', links: ['hello@nakama.studio', 'WhatsApp', 'LinkedIn', 'Instagram'] },
            ].map(col => (
              <div key={col.head}>
                <div className="label" style={{ color: C.sienna, marginBottom: 20, fontSize: 9 }}>{col.head}</div>
                {col.links.map(l => <span key={l} className="foot-link">{l}</span>)}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p className="serif" style={{ fontSize: 13, color: `${C.stone}80`, fontStyle: 'italic' }}>© {new Date().getFullYear()} Nakama Studio · 仲間 · Crafted with intention.</p>
            <p className="label" style={{ fontSize: 10, color: `${C.stone}55` }}>Privacy · Terms</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
