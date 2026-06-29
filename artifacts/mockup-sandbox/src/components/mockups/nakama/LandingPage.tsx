import React, { useEffect, useRef } from 'react';

/*
  NAKAMA — Bold modern landing page
  Rules: NO emojis · NO pill buttons · NO floating cards · NO "two people" / "Bali-based"
  Philosophy: branding → value creation → revenue growth
  Animated funnel: Brand → Platform → Automate → Convert → Revenue
  Fonts: Sora (headlines) + Jost (body)
*/

const C = {
  bg:      '#120D09',
  bgMid:   '#1C1410',
  bgSoft:  '#231A14',
  linen:   '#F0EBE3',
  sienna:  '#9B5D3F',
  siennaL: '#C47A55',
  siennaD: '#7A4730',
  stone:   '#8B7D72',
  stoneL:  '#B8ADA6',
  rule:    '#C4A882',
  cream:   '#F5EDD8',
};

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Entrance animations ────────────────────────────────── */
  @keyframes hFadeUp   { from { opacity:0; transform:translateY(44px); } to { opacity:1; transform:none; } }
  @keyframes hFadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes hFadeRight{ from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:none; } }
  .h-nav  { animation: hFadeIn    0.7s ease 0.1s  both; }
  .h-pre  { animation: hFadeRight 0.8s ease 0.3s  both; }
  .h-l0   { animation: hFadeUp   1.0s cubic-bezier(.22,1,.36,1) 0.4s  both; }
  .h-l1   { animation: hFadeUp   1.0s cubic-bezier(.22,1,.36,1) 0.56s both; }
  .h-l2   { animation: hFadeUp   1.0s cubic-bezier(.22,1,.36,1) 0.72s both; }
  .h-sub  { animation: hFadeIn   1.0s ease 1.0s both; }
  .h-cta  { animation: hFadeIn   1.0s ease 1.2s both; }

  /* ── Scroll reveals ─────────────────────────────────────── */
  .reveal {
    opacity:0; transform:translateY(24px);
    transition: opacity 1s cubic-bezier(.22,1,.36,1), transform 1s cubic-bezier(.22,1,.36,1);
  }
  .reveal.on { opacity:1; transform:none; }
  .d1 { transition-delay:0.10s !important; }
  .d2 { transition-delay:0.22s !important; }
  .d3 { transition-delay:0.34s !important; }
  .d4 { transition-delay:0.46s !important; }
  .rule-r {
    opacity:0; transform:scaleX(0); transform-origin:left;
    transition: opacity 0.8s ease, transform 1.2s cubic-bezier(.22,1,.36,1);
  }
  .rule-r.on { opacity:1; transform:scaleX(1); }

  /* ── Pipeline diagram — Quantiva-style sequential build ──── */
  @keyframes pCard    { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
  @keyframes pBorder  { from { transform:scaleY(0); } to { transform:scaleY(1); } }
  @keyframes pContent { from { opacity:0; transform:translateX(6px); } to { opacity:1; transform:none; } }
  @keyframes pLine    { from { transform:scaleY(0); } to { transform:scaleY(1); } }
  @keyframes pGlow    { 0% { opacity:0; box-shadow:none; } 100% { opacity:1; box-shadow:0 0 28px rgba(196,122,85,0.3); } }
  @keyframes dotPop   { from { transform:scale(0); opacity:0; } to { transform:scale(1); opacity:1; } }
  @keyframes labelIn  { from { opacity:0; transform:translateY(3px); } to { opacity:1; transform:none; } }

  /* SVG funnel transitions are driven by React inline styles — no CSS class rules needed here */

  /* Initial hidden state */
  .funnel-wrap .pipe-card    { opacity:0; }
  .funnel-wrap .pipe-border  { transform:scaleY(0); transform-origin:top; }
  .funnel-wrap .pipe-content { opacity:0; }
  .funnel-wrap .pipe-fill    { transform:scaleY(0); transform-origin:top; }
  .funnel-wrap .pipe-glow    { opacity:0; }

  /* Stage 1: card → border → content → connector */
  .funnel-wrap.on .pn1 .pipe-card    { animation: pCard    0.45s cubic-bezier(.22,1,.36,1) 0.0s  both; }
  .funnel-wrap.on .pn1 .pipe-border  { animation: pBorder  0.35s ease                     0.2s  both; }
  .funnel-wrap.on .pn1 .pipe-content { animation: pContent 0.4s  ease                     0.4s  both; }
  .funnel-wrap.on .pc1 .pipe-fill    { animation: pLine    0.35s ease                     0.7s  both; }
  /* Stage 2 */
  .funnel-wrap.on .pn2 .pipe-card    { animation: pCard    0.45s cubic-bezier(.22,1,.36,1) 0.85s both; }
  .funnel-wrap.on .pn2 .pipe-border  { animation: pBorder  0.35s ease                     1.05s both; }
  .funnel-wrap.on .pn2 .pipe-content { animation: pContent 0.4s  ease                     1.25s both; }
  .funnel-wrap.on .pc2 .pipe-fill    { animation: pLine    0.35s ease                     1.55s both; }
  /* Stage 3 */
  .funnel-wrap.on .pn3 .pipe-card    { animation: pCard    0.45s cubic-bezier(.22,1,.36,1) 1.7s  both; }
  .funnel-wrap.on .pn3 .pipe-border  { animation: pBorder  0.35s ease                     1.9s  both; }
  .funnel-wrap.on .pn3 .pipe-content { animation: pContent 0.4s  ease                     2.1s  both; }
  .funnel-wrap.on .pc3 .pipe-fill    { animation: pLine    0.35s ease                     2.4s  both; }
  /* Stage 4 — Revenue: card + border + content + glow */
  .funnel-wrap.on .pn4 .pipe-card    { animation: pCard    0.45s cubic-bezier(.22,1,.36,1) 2.55s both; }
  .funnel-wrap.on .pn4 .pipe-border  { animation: pBorder  0.35s ease                     2.75s both; }
  .funnel-wrap.on .pn4 .pipe-content { animation: pContent 0.4s  ease                     2.95s both; }
  .funnel-wrap.on .pipe-glow         { animation: pGlow    1.0s  ease                     2.75s both; }

  /* Pipeline layout */
  .pipe-grid {
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: clamp(40px,6vw,80px);
    align-items: start;
  }
  @media (max-width: 860px) { .pipe-grid { grid-template-columns: 1fr; } }

  /* ── Typography ─────────────────────────────────────────── */
  .display { font-family: 'Sora', sans-serif; }
  .label {
    font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 400;
    letter-spacing: 0.20em; text-transform: uppercase;
  }

  /* ── Navigation ─────────────────────────────────────────── */
  .nav-link {
    font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 400;
    color: ${C.stoneL}; cursor: pointer;
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
    border: none; cursor: pointer; transition: background 0.3s ease;
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
  .sec-pad    { padding: clamp(72px,10vw,120px) clamp(22px,5vw,64px); }
  .sec-pad-sm { padding: clamp(48px,7vw,80px) clamp(22px,5vw,64px); }

  /* ── Service rows ────────────────────────────────────────── */
  .svc-row {
    display: grid; grid-template-columns: 48px 1fr 100px;
    align-items: start; padding: 28px 0; gap: 28px;
    border-top: 1px solid rgba(255,255,255,0.07); cursor: default;
  }
  .svc-row:last-child { border-bottom: 1px solid rgba(255,255,255,0.07); }
  .svc-title {
    font-family: 'Sora', sans-serif; font-size: clamp(18px,2.4vw,24px);
    font-weight: 600; color: ${C.cream}; line-height: 1.2; transition: color 0.3s ease;
  }
  .svc-row:hover .svc-title { color: ${C.siennaL}; }
  .svc-body {
    max-height: 0; overflow: hidden; opacity: 0;
    transition: max-height 0.5s cubic-bezier(.22,1,.36,1), opacity 0.35s ease;
  }
  .svc-row:hover .svc-body { max-height: 180px; opacity: 1; }
  @media (max-width: 600px) {
    .svc-row { grid-template-columns: 1fr; gap: 8px; }
    .svc-num-col, .svc-cta { display: none; }
  }

  /* ── Section header ──────────────────────────────────────── */
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
  .process-grid { display: grid; grid-template-columns: repeat(4,1fr); border-top: 1px solid rgba(245,237,216,0.08); }
  @media (max-width: 860px) {
    .process-grid { grid-template-columns: repeat(2,1fr); }
    .proc-cell:nth-child(odd) { padding-left: 0 !important; }
    .proc-cell:nth-child(even) { border-right: none !important; }
    .proc-cell:nth-child(3), .proc-cell:nth-child(4) { border-top: 1px solid rgba(245,237,216,0.08); }
  }
  @media (max-width: 480px) {
    .process-grid { grid-template-columns: 1fr; }
    .proc-cell { border-right: none !important; padding-left: 0 !important; padding-right: 0 !important; border-top: 1px solid rgba(245,237,216,0.08) !important; }
    .proc-cell:first-child { border-top: none !important; }
  }

  /* ── Footer grid ─────────────────────────────────────────── */
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  @media (max-width: 700px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; } .footer-brand { grid-column: 1 / -1; } }
  @media (max-width: 420px) { .footer-grid { grid-template-columns: 1fr; } .footer-brand { grid-column: auto; } }

  /* ── Hero lower row ──────────────────────────────────────── */
  .hero-lower { display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: end; margin-top: 52px; }
  @media (max-width: 680px) { .hero-lower { grid-template-columns: 1fr; gap: 28px; } }
  .cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
  @media (max-width: 480px) { .cta-row button { flex: 1 1 130px; justify-content: center; } }

  /* ── Feat cards ──────────────────────────────────────────── */
  .feat-card {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
    padding: clamp(24px,3.5vw,36px); display: flex; flex-direction: column; gap: 14px;
    transition: border-color 0.3s ease, background 0.3s ease;
  }
  .feat-card:hover { border-color: ${C.sienna}55; background: rgba(155,93,63,0.06); }

  /* ── Testimonials ────────────────────────────────────────── */
  .testi { padding: 40px 0; border-top: 1px solid rgba(255,255,255,0.07); transition: padding-left 0.4s cubic-bezier(.22,1,.36,1); }
  .testi:hover { padding-left: 18px; }
  .testi:last-child { border-bottom: 1px solid rgba(255,255,255,0.07); }
  @media (max-width: 600px) { .testi:hover { padding-left: 0; } }

  /* ── Marquee ─────────────────────────────────────────────── */
  @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  .mtrack { display: flex; width: max-content; animation: marquee 40s linear infinite; }

  /* ── Atm glow ────────────────────────────────────────────── */
  @keyframes atm { 0%,100% { opacity:0.8; } 50% { opacity:1; } }

  /* ── Trust bar ───────────────────────────────────────────── */
  .trust-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.06); margin-top: 56px; padding-top: 44px; justify-content: center; }
  .trust-item { font-family:'Jost',sans-serif; font-size:12px; color:rgba(139,125,114,0.7); font-weight:300; padding:6px 24px; letter-spacing:0.04em; }

  /* ── Footer links ────────────────────────────────────────── */
  .foot-link { font-family:'Jost',sans-serif; font-size:13px; color:${C.stone}; cursor:pointer; font-weight:300; transition:color 0.2s ease; display:block; margin-bottom:10px; }
  .foot-link:hover { color:${C.stoneL}; }

  @media (max-width: 600px) { .scroll-hint { display: none !important; } }
`;

const PIPELINE: Array<{
  num: string; label: string; title: string; body: string;
  tags: string[]; highlight?: boolean;
}> = [
  {
    num: '01', label: 'Brand',
    title: 'Build your identity',
    body: 'Your property name, visual language, tone of voice, and story. The foundation that makes everything downstream recognisable and memorable.',
    tags: ['Property Name', 'Visual Language', 'Brand Story'],
  },
  {
    num: '02', label: 'Awareness',
    title: 'Reach the right guests',
    body: 'A website and digital presence built to be found — on search, on OTAs, and through direct channels. Visible where your guests are looking.',
    tags: ['Website', 'OTA Presence', 'Search Visibility'],
  },
  {
    num: '03', label: 'Pitch',
    title: 'Convert the interest',
    body: 'WhatsApp automation, fast response, and frictionless booking flows that turn curiosity into commitment — without a slow back-and-forth.',
    tags: ['WhatsApp Bot', 'Instant Response', 'Direct Booking'],
  },
  {
    num: '04', label: 'Revenue',
    title: 'Grow the value',
    body: 'More direct bookings, fewer platform fees, and a brand guests seek out and return to. Revenue that compounds as your reputation does.',
    tags: ['Direct Bookings', 'Lower Fees', 'Returning Guests'],
    highlight: true,
  },
];

/* ── Moving particle system ──────────────────────────────────
   Funnel boundaries (SVG coords):
     upper: y = 40 + 0.1·x    (x=0 → y=40,  x=900 → y=130)
     lower: y = 240 − 0.1·x   (x=0 → y=240, x=900 → y=150)
   normY: 0 = top boundary, 1 = bottom boundary, 0.5 = centre
   Particles travel x: −20 → 940 per cycle, then loop.
   surviveTo: x where the particle fades out (940 = reaches Revenue) */
interface Particle { normY:number; surviveTo:number; dur:number; phase:number; r:number; sienna:boolean }
const PARTICLES: Particle[] = [
  // ── Survivors (sienna, all reach Revenue) ──
  { normY:0.46, surviveTo:940, dur:3800, phase:0.00, r:4.0, sienna:true },
  { normY:0.54, surviveTo:940, dur:4200, phase:0.25, r:3.5, sienna:true },
  { normY:0.50, surviveTo:940, dur:3500, phase:0.50, r:4.5, sienna:true },
  { normY:0.42, surviveTo:940, dur:4500, phase:0.75, r:3.5, sienna:true },
  { normY:0.58, surviveTo:940, dur:4000, phase:0.13, r:3.0, sienna:true },
  { normY:0.48, surviveTo:940, dur:3700, phase:0.38, r:4.0, sienna:true },
  { normY:0.52, surviveTo:940, dur:4300, phase:0.63, r:3.5, sienna:true },
  { normY:0.50, surviveTo:940, dur:3900, phase:0.88, r:3.0, sienna:true },
  // ── Pitch drop-offs (fade out ~x=580) ──
  { normY:0.15, surviveTo:610, dur:4000, phase:0.10, r:2.5, sienna:true  },
  { normY:0.85, surviveTo:590, dur:3800, phase:0.35, r:2.5, sienna:true  },
  { normY:0.20, surviveTo:630, dur:4200, phase:0.60, r:2.5, sienna:false },
  { normY:0.80, surviveTo:570, dur:3600, phase:0.85, r:2.5, sienna:false },
  { normY:0.25, surviveTo:600, dur:4100, phase:0.20, r:2.5, sienna:false },
  { normY:0.75, surviveTo:620, dur:3900, phase:0.70, r:2.5, sienna:false },
  { normY:0.18, surviveTo:580, dur:4300, phase:0.45, r:2.5, sienna:false },
  // ── Awareness drop-offs (fade out ~x=380) ──
  { normY:0.05, surviveTo:400, dur:3500, phase:0.05, r:2.0, sienna:false },
  { normY:0.95, surviveTo:370, dur:3700, phase:0.30, r:2.0, sienna:false },
  { normY:0.08, surviveTo:420, dur:3300, phase:0.55, r:2.0, sienna:false },
  { normY:0.92, surviveTo:350, dur:3900, phase:0.80, r:2.0, sienna:false },
  { normY:0.10, surviveTo:410, dur:4000, phase:0.15, r:2.0, sienna:false },
  { normY:0.90, surviveTo:390, dur:3600, phase:0.65, r:2.0, sienna:false },
  { normY:0.12, surviveTo:360, dur:3400, phase:0.40, r:2.0, sienna:false },
  { normY:0.88, surviveTo:400, dur:4200, phase:0.90, r:2.0, sienna:false },
  { normY:0.07, surviveTo:380, dur:3800, phase:0.25, r:2.0, sienna:false },
];

export function LandingPage() {
  const obsRef        = useRef<IntersectionObserver | null>(null);
  const particleRefs  = useRef<(SVGCircleElement | null)[]>([]);
  const phases        = useRef<number[]>(PARTICLES.map(p => p.phase));

  // .reveal / .rule-r scroll trigger (unchanged)
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

  // Looping particle animation — RAF drives each ball left→right through the funnel
  useEffect(() => {
    let prev: number | null = null;
    let raf: number;
    const tick = (now: number) => {
      const dt = prev === null ? 0 : Math.min((now - prev) / 1000, 0.05); // cap dt to 50ms
      prev = now;
      PARTICLES.forEach((p, i) => {
        const el = particleRefs.current[i];
        if (!el) return;
        phases.current[i] = (phases.current[i] + dt / (p.dur / 1000)) % 1;
        const t = phases.current[i];
        // x: −20 → 940 (slightly beyond viewBox so fading happens off-screen)
        const x = t * 960 - 20;
        // y: follows funnel boundary, clamped to valid SVG range
        const xc = Math.max(0, Math.min(x, 900));
        const uy = 40 + xc / 10;
        const ly = 240 - xc / 10;
        const y  = uy + p.normY * (ly - uy);
        // opacity: fade in over first 60px, stay full, fade out 80px before surviveTo
        const fadeIn  = Math.min(1, (x + 20) / 60);
        const fadeOut = x > p.surviveTo - 80 ? Math.max(0, (p.surviveTo - x) / 80) : 1;
        const opacity = Math.max(0, Math.min(fadeIn, fadeOut));
        el.setAttribute('cx', x.toFixed(1));
        el.setAttribute('cy', y.toFixed(1));
        el.setAttribute('opacity', opacity.toFixed(3));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke={C.sienna} strokeWidth="1.5"/>
            <circle cx="9"  cy="14" r="3.5" fill={C.sienna}/>
            <circle cx="19" cy="14" r="3.5" fill={C.siennaL} opacity="0.7"/>
          </svg>
          <span style={{ fontFamily:"'Sora',sans-serif", fontSize:16, fontWeight:700, color:C.cream, letterSpacing:'0.02em' }}>nakama</span>
        </div>
        <div className="nav-links-center">
          {['Services','Process','About','Stories'].map(l => <span key={l} className="nav-link">{l}</span>)}
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <button className="btn-ghost nav-chat-btn" style={{ padding:'9px 20px', fontSize:12 }}>Chat with us</button>
          <button className="btn-primary" style={{ padding:'9px 20px', fontSize:12 }}>Grow with us →</button>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '0 clamp(22px,5vw,64px) clamp(60px,9vw,96px)',
        position: 'relative', background: C.bg, overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 60% 70% at 80% 50%, rgba(155,93,63,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 10% 80%, rgba(100,52,28,0.22) 0%, transparent 55%)
          `,
          animation: 'atm 9s ease-in-out infinite',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100 }}>
          <p className="h-pre label" style={{ color: C.sienna, marginBottom: 'clamp(20px,3vw,36px)' }}>
            Property Onboarding & Branding · Bali & Southeast Asia
          </p>
          <h1 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, lineHeight:0.95, letterSpacing:'-0.03em' }}>
            <div style={{ overflow:'hidden', marginBottom:'0.06em' }}>
              <span className="h-l0" style={{ display:'block', fontSize:'clamp(40px,10vw,136px)', color:C.cream }}>Your property's</span>
            </div>
            <div style={{ overflow:'hidden', marginBottom:'0.06em' }}>
              <span className="h-l1" style={{ display:'block', fontSize:'clamp(40px,10vw,136px)', color:C.siennaL }}>best friend</span>
            </div>
            <div style={{ overflow:'hidden' }}>
              <span className="h-l2" style={{ display:'block', fontSize:'clamp(40px,10vw,136px)', color:C.cream }}>is here.</span>
            </div>
          </h1>
          <div className="hero-lower">
            <div className="h-sub">
              <p style={{ fontSize:'clamp(14px,1.8vw,17px)', color:C.stone, lineHeight:1.85, fontWeight:300, maxWidth:500 }}>
                <strong style={{ color:C.cream, fontWeight:500 }}>Nakama means companions.</strong> You've invested in a property — now let's make it earn. We onboard from day one: brand, digital presence, and guest systems built to grow alongside you.
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
        <div className="scroll-hint" style={{ position:'absolute', bottom:36, right:56, display:'flex', flexDirection:'column', alignItems:'center', gap:10, opacity:0.35 }}>
          <span className="label" style={{ color:C.stoneL, fontSize:9, writingMode:'vertical-rl' }}>Scroll</span>
          <div style={{ width:1, height:40, background:`linear-gradient(${C.stoneL}, transparent)` }} />
        </div>
      </section>

      {/* ── PHILOSOPHY ────────────────────────────────────────── */}
      <section className="sec-pad-sm" style={{ background:C.bgSoft, borderTop:`1px solid rgba(255,255,255,0.05)` }}>
        <div style={{ maxWidth:960, margin:'0 auto' }}>
          <p className="reveal display" style={{ fontSize:'clamp(18px,2.8vw,32px)', fontWeight:400, lineHeight:1.65, color:`${C.cream}90`, textAlign:'center', marginBottom:'clamp(40px,5vw,64px)' }}>
            Most foreign property investors face the same moment: the property is ready, the keys are in hand —{' '}
            <span style={{ color:C.cream, fontWeight:600 }}>and there's no plan for what comes next.</span>{' '}
            No brand. No website. No system. <span style={{ color:C.siennaL }}>That's exactly where we begin.</span>
          </p>
          {/* Three investor scenarios */}
          <div className="reveal d1" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:2 }}>
            {[
              { tag:'First-time investor', line:'You own the property. You need it to earn — and you\'re not sure where to start.' },
              { tag:'No marketing strategy', line:'You have a property but no brand, no website, and enquiries going unanswered.' },
              { tag:'Ready to grow', line:'You want more direct bookings, fewer OTA fees, and a property that works for you.' },
            ].map((s, i) => (
              <div key={i} style={{ padding:'clamp(20px,3vw,28px)', background:'rgba(255,255,255,0.03)', borderTop:`2px solid ${C.sienna}40` }}>
                <div className="label" style={{ color:C.sienna, fontSize:9, marginBottom:10 }}>{s.tag}</div>
                <p style={{ fontSize:14, color:C.stone, lineHeight:1.8, fontWeight:300 }}>{s.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUNNEL (Quantiva scatter funnel) ───────────────────── */}
      <section className="sec-pad" style={{ background: C.bg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <div className="sec-header" style={{ marginBottom: 'clamp(36px,5vw,52px)' }}>
            <div className="reveal">
              <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 16 }}>Property onboarding</span>
              <h2 className="display" style={{ fontSize: 'clamp(28px,3.8vw,48px)', fontWeight: 700, lineHeight: 1.1, color: C.cream }}>
                From acquisition to<br />earning destination.
              </h2>
            </div>
            <div className="reveal d1" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <p style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: C.stone, lineHeight: 1.9, fontWeight: 300 }}>
                Every investor faces the same gap: a great property with no brand, no digital presence, no booking system. We close that gap end-to-end — brand, website, automation — as one connected journey.
              </p>
            </div>
          </div>

          {/* SVG particle funnel — balls move left→right, looping via RAF */}
          <div
            style={{
              background: C.bgSoft,
              border: `1px solid rgba(255,255,255,0.06)`,
              padding: 'clamp(16px,2.5vw,28px) clamp(16px,2.5vw,28px) clamp(12px,2vw,20px)',
              marginBottom: 4,
              overflow: 'hidden',
            }}
          >
            <svg viewBox="0 0 900 280" width="100%" overflow="hidden" style={{ display: 'block', height: 'auto' }}>

              {/* Stage labels — static */}
              {['Brand', 'Awareness', 'Pitch', 'Revenue'].map((lbl, i) => (
                <text key={lbl}
                  x={i * 225 + 112} y={15}
                  textAnchor="middle"
                  fontFamily="'Jost',sans-serif" fontSize={9} letterSpacing={1.8}
                  fill={i === 3 ? C.siennaL : C.sienna}
                >
                  {lbl.toUpperCase()}
                </text>
              ))}

              {/* Vertical dividers — static */}
              {[225, 450, 675].map(x => (
                <line key={x} x1={x} y1={22} x2={x} y2={270}
                  stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
              ))}

              {/* Funnel boundary lines — static */}
              <line x1={0} y1={40}  x2={900} y2={130} stroke={`${C.sienna}55`} strokeWidth={1} />
              <line x1={0} y1={240} x2={900} y2={150} stroke={`${C.sienna}55`} strokeWidth={1} />

              {/* Revenue glow — static */}
              <ellipse cx={765} cy={139} rx={88} ry={26} fill={`${C.sienna}14`} />

              {/* Moving particles — positions updated every frame via RAF */}
              {PARTICLES.map((p, i) => (
                <circle
                  key={i}
                  ref={(el) => { particleRefs.current[i] = el; }}
                  cx={-20} cy={140} r={p.r}
                  fill={p.sienna ? C.siennaL : `${C.stone}88`}
                  opacity={0}
                />
              ))}

            </svg>
          </div>

          {/* Legend */}
          <div className="reveal d1" style={{ display: 'flex', gap: 20, justifyContent: 'flex-end', marginBottom: 'clamp(36px,5vw,52px)' }}>
            {[
              { color: C.siennaL,         label: 'Leads within the system' },
              { color: `${C.stone}35`,    label: 'Lost without the right systems' },
            ].map(({ color, label }) => (
              <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, color: C.stone, fontWeight: 300 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0, display: 'inline-block' }} />
                {label}
              </span>
            ))}
          </div>

          {/* 4-column stage descriptions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
            {PIPELINE.map((stage, i) => (
              <div
                key={i}
                className={`reveal d${i}`}
                style={{
                  padding: 'clamp(20px,2.5vw,28px)',
                  background: stage.highlight ? `rgba(155,93,63,0.07)` : 'rgba(255,255,255,0.025)',
                  borderTop: `2px solid ${stage.highlight ? C.sienna : 'rgba(255,255,255,0.07)'}`,
                }}
              >
                <span className="label" style={{ color: stage.highlight ? C.siennaL : C.sienna, fontSize: 9, display: 'block', marginBottom: 10 }}>
                  {stage.num} · {stage.label}
                </span>
                <h3 className="display" style={{
                  fontSize: 'clamp(15px,1.8vw,18px)', fontWeight: 700, lineHeight: 1.3,
                  color: stage.highlight ? C.siennaL : C.cream, marginBottom: 10,
                }}>{stage.title}</h3>
                <p style={{ fontSize: 12, color: C.stone, lineHeight: 1.85, fontWeight: 300, marginBottom: 12 }}>{stage.body}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {stage.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: 10, color: `${C.stone}70`, fontWeight: 300,
                      padding: '2px 8px', fontFamily: "'Jost', sans-serif",
                      border: `1px solid rgba(255,255,255,0.07)`,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────── */}
      <div style={{ overflow:'hidden', borderTop:`1px solid rgba(255,255,255,0.05)`, borderBottom:`1px solid rgba(255,255,255,0.05)`, padding:'14px 0', background:C.bgSoft }}>
        <div className="mtrack">
          {Array(2).fill(null).map((_, ri) => (
            <React.Fragment key={ri}>
              {['Property Website Design','—','WhatsApp Automation','—','OTA Integration','—','Brand Identity','—','Guest Experience','—','Revenue Growth','—'].map((item, i) => (
                <span key={`${ri}-${i}`} style={{
                  padding:'0 24px', whiteSpace:'nowrap',
                  fontFamily:"'Jost',sans-serif", fontSize: item==='—'?14:11,
                  letterSpacing: item!=='—'?'0.18em':0,
                  textTransform: item!=='—'?'uppercase' as const:'none' as const,
                  color: item==='—'?C.sienna:C.stone, fontWeight:300,
                }}>{item}</span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section id="services" className="sec-pad" style={{ background:C.bg }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div className="sec-header">
            <div className="reveal">
              <span className="label" style={{ color:C.sienna, display:'block', marginBottom:16 }}>The onboarding suite</span>
              <h2 className="display" style={{ fontSize:'clamp(28px,4vw,50px)', fontWeight:700, lineHeight:1.1, color:C.cream }}>
                Everything your<br />property needs to earn.
              </h2>
            </div>
            <div className="reveal d1" style={{ display:'flex', alignItems:'flex-end' }}>
              <p style={{ fontSize:'clamp(13px,1.6vw,15px)', color:C.stone, lineHeight:1.9, fontWeight:300 }}>
                Three services, built to work as one. Your brand gives guests a reason to choose you. Your website gives them a direct path to book. Your automation ensures no lead goes cold — day or night, while you focus on anything else.
              </p>
            </div>
          </div>
          {[
            { num:'01', title:'Property Website Design', desc:"A bespoke website built around your property's identity — not a template. Built to drive direct bookings and reduce OTA fee dependency.", detail:'Custom brand design · Direct booking engine · SEO architecture · Performance optimisation' },
            { num:'02', title:'WhatsApp Automation', desc:"An intelligent guest system that responds to enquiries instantly, qualifies leads, and converts interest into confirmed bookings — in your brand's voice, around the clock.", detail:'Automated flows · Bilingual responses · Booking pipeline · CRM integration' },
            { num:'03', title:'OTA Channel Integration', desc:'Your property distributed and synchronised across Airbnb, Booking.com, Agoda, and VRBO — no double bookings, maximum occupancy, and one central inbox.', detail:'Multi-channel sync · Dynamic pricing · Centralised inbox · Revenue reporting' },
          ].map((s, i) => (
            <div key={i} className={`reveal d${i+1} svc-row`}>
              <span className="svc-num-col display" style={{ fontSize:22, fontWeight:400, color:`${C.stoneL}50`, lineHeight:1, paddingTop:4 }}>{s.num}</span>
              <div>
                <div className="svc-title">{s.title}</div>
                <div className="svc-body">
                  <p style={{ fontSize:14, color:C.stone, lineHeight:1.85, marginTop:12, fontWeight:300 }}>{s.desc}</p>
                  <p style={{ fontSize:11, color:`${C.stoneL}80`, letterSpacing:'0.08em', marginTop:10 }}>{s.detail}</p>
                </div>
              </div>
              <div className="svc-cta" style={{ paddingTop:4 }}>
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:C.sienna, cursor:'pointer', letterSpacing:'0.1em', textTransform:'uppercase', borderBottom:`1px solid ${C.sienna}50` }}>Learn more →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY NAKAMA ────────────────────────────────────────── */}
      <section className="sec-pad" style={{ background:C.bgSoft }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div className="reveal" style={{ marginBottom:48 }}>
            <span className="label" style={{ color:C.sienna, display:'block', marginBottom:16 }}>Why us</span>
            <h2 className="display" style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:700, lineHeight:1.1, color:C.cream }}>
              Built different.
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:2 }}>
            {[
              { num:'01', head:'Your property, our full focus.', body:'Every property we take on receives our complete and undivided attention. No brief handed to a junior. No property lost in a large client list. We are invested in your outcomes.' },
              { num:'02', head:'Deep market knowledge.', body:'We have a thorough understanding of the Bali and Southeast Asian hospitality market — the guests, the platforms, the seasonality, and the competitive landscape that shapes results.' },
              { num:'03', head:'Partners, not vendors.', body:"We don't deliver and disappear. Nakama stays — monitoring performance, refining systems, and evolving your brand as the market changes and your property grows." },
            ].map((card, i) => (
              <div key={i} className={`reveal d${i+1} feat-card`}>
                <span className="label" style={{ color:C.sienna, fontSize:10 }}>{card.num}</span>
                <h3 className="display" style={{ fontSize:'clamp(17px,2.2vw,21px)', fontWeight:700, color:C.cream, lineHeight:1.25 }}>{card.head}</h3>
                <p style={{ fontSize:14, color:C.stone, lineHeight:1.85, fontWeight:300 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section id="about" className="sec-pad" style={{ background:C.bg }}>
        <div className="about-grid" style={{ maxWidth:1100, margin:'0 auto' }}>
          <div className="reveal about-img" style={{ position:'relative', height:480, overflow:'hidden', background:C.bgSoft, border:'1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ position:'absolute', inset:0, background:`linear-gradient(145deg, rgba(155,93,63,0.35) 0%, transparent 55%)` }} />
            <svg style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', maxWidth:'100%' }} width="280" height="320" viewBox="0 0 320 360" fill="none">
              <path d="M52 352 L52 228 L40 216 L40 156 L52 142 L65 120 L78 94 L90 64 L97 34 L103 8 L109 34 L116 64 L129 94 L142 120 L154 142 L167 156 L167 216 L154 228 L154 352Z" stroke="rgba(245,237,216,0.22)" strokeWidth="1.2" fill="none"/>
              <path d="M64 352 L64 242 L58 230 L58 168 L64 156 L76 132 L88 104 L97 72 L103 44 L109 72 L118 104 L130 132 L142 156 L148 168 L148 230 L142 242 L142 352" stroke="rgba(245,237,216,0.08)" strokeWidth="0.8" fill="none"/>
              <line x1="40" y1="216" x2="167" y2="216" stroke="rgba(245,237,216,0.14)" strokeWidth="0.8"/>
              <path d="M268 352 L268 228 L280 216 L280 156 L268 142 L255 120 L242 94 L230 64 L223 34 L217 8 L211 34 L204 64 L191 94 L178 120 L166 142 L153 156 L153 216 L166 228 L166 352Z" stroke="rgba(245,237,216,0.22)" strokeWidth="1.2" fill="none"/>
              <path d="M256 352 L256 242 L262 230 L262 168 L256 156 L244 132 L232 104 L223 72 L217 44 L211 72 L202 104 L190 132 L178 156 L172 168 L172 230 L178 242 L178 352" stroke="rgba(245,237,216,0.08)" strokeWidth="0.8" fill="none"/>
              <line x1="153" y1="216" x2="280" y2="216" stroke="rgba(245,237,216,0.14)" strokeWidth="0.8"/>
              <line x1="16" y1="352" x2="304" y2="352" stroke="rgba(245,237,216,0.18)" strokeWidth="0.9"/>
              <circle cx="160" cy="10" r="4.5" stroke="rgba(245,237,216,0.25)" strokeWidth="0.8" fill="none"/>
              <text x="160" y="372" textAnchor="middle" fill="rgba(245,237,216,0.18)" fontSize="7.5" fontFamily="Jost,sans-serif" letterSpacing="4">CANDI BENTAR · BALI</text>
            </svg>
            <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'24px 28px', background:'linear-gradient(transparent, rgba(18,13,9,0.9))' }}>
              <p className="label" style={{ color:C.sienna, fontSize:9, marginBottom:6 }}>Focused on</p>
              <p style={{ fontFamily:"'Sora',sans-serif", fontWeight:600, fontSize:14, color:C.cream }}>Bali & Southeast Asia</p>
            </div>
          </div>
          <div className="reveal d1">
            <span className="label" style={{ color:C.sienna, display:'block', marginBottom:16 }}>About Nakama</span>
            <h2 className="display" style={{ fontSize:'clamp(28px,3.8vw,44px)', fontWeight:700, lineHeight:1.1, color:C.cream, marginBottom:24 }}>
              One vision.<br />Endless growth.
            </h2>
            <p style={{ fontSize:'clamp(13px,1.6vw,15px)', color:C.stone, lineHeight:1.9, marginBottom:16, fontWeight:300 }}>
              Nakama was built on a single belief: that great branding is the most valuable investment a property owner can make. Not a logo — a full brand system that earns at every stage of the guest journey.
            </p>
            <p style={{ fontSize:'clamp(13px,1.6vw,15px)', color:C.stone, lineHeight:1.9, marginBottom:36, fontWeight:300 }}>
              We focus on the Bali and Southeast Asian market because it is one of the most competitive short-stay markets in the world — and the one where strong branding makes the biggest difference to a property's performance.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
              {['Every property receives complete, personal attention','Bilingual — English and Bahasa Indonesia','Long-term partnership, not a one-off project','Strategy, design, and technology — fully integrated'].map((item, i) => (
                <div key={i} style={{ display:'flex', gap:16, padding:'12px 0', borderBottom:`1px solid rgba(255,255,255,0.06)`, fontSize:14, color:C.stone, fontWeight:300, lineHeight:1.6 }}>
                  <span style={{ color:C.sienna, flexShrink:0 }}>—</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:36 }}>
              <button className="btn-primary">Talk to us directly →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="sec-pad-sm" style={{ background:C.bgSoft, borderTop:`1px solid rgba(255,255,255,0.05)`, borderBottom:`1px solid rgba(255,255,255,0.05)` }}>
        <div className="stats-grid" style={{ maxWidth:1100, margin:'0 auto' }}>
          {[
            ['Bespoke','Every property designed from the ground up','No templates. No shortcuts.'],
            ['Integrated','Brand, website, and automation as one system','Not three separate vendors'],
            ['Bilingual','English and Bahasa Indonesia','Across every guest touchpoint'],
            ['Long-term','We stay and grow with your property','Not a one-off project'],
          ].map(([head, label, sub], i) => (
            <div key={head} className={`reveal d${i+1} stat-cell`} style={{ textAlign:'center', padding:'clamp(20px,4vw,40px) 16px', borderRight: i<3?`1px solid rgba(255,255,255,0.06)`:'none' }}>
              <div className="display" style={{ fontSize:'clamp(17px,2.2vw,22px)', fontWeight:700, color:C.siennaL, lineHeight:1.2 }}>{head}</div>
              <div className="label" style={{ color:C.stoneL, marginTop:14, fontSize:10 }}>{label}</div>
              <div style={{ fontSize:12, color:`${C.stone}70`, marginTop:6, fontWeight:300 }}>{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────── */}
      <section id="process" className="sec-pad" style={{ background:C.bg }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div className="sec-header">
            <div className="reveal">
              <span className="label" style={{ color:C.sienna, display:'block', marginBottom:16 }}>How it works</span>
              <h2 className="display" style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:700, lineHeight:1.1, color:C.cream }}>
                A clear path.<br />No surprises.
              </h2>
            </div>
            <div className="reveal d1" style={{ display:'flex', alignItems:'flex-end' }}>
              <p style={{ fontSize:'clamp(13px,1.6vw,15px)', color:C.stone, lineHeight:1.9, fontWeight:300 }}>Four phases. Clear deliverables. Your sign-off before we proceed. You are always informed and always in control — without being overwhelmed by detail.</p>
            </div>
          </div>
          <div className="process-grid">
            {[
              { num:'01', phase:'Discovery', title:'Property & Market Analysis', desc:"We map your property's character, competitive landscape, and revenue benchmarks — the foundation everything else is built on." },
              { num:'02', phase:'Design', title:'Brand & Blueprint', desc:'Identity, messaging, wireframes, and automation flows — designed together, reviewed and approved before a single line of code is written.' },
              { num:'03', phase:'Build', title:'Construction', desc:'Website, WhatsApp system, and OTA integrations — built, connected, and tested thoroughly before any guest sees them.' },
              { num:'04', phase:'Launch', title:'Growth', desc:'You go live. We remain — monitoring performance, refining systems, and compounding your property value over time.' },
            ].map((step, i) => (
              <div key={i} className={`reveal d${i+1} proc-cell`} style={{
                padding:'clamp(28px,4vw,44px) 0',
                paddingLeft: i>0?'clamp(14px,3vw,28px)':0,
                paddingRight: i<3?'clamp(14px,3vw,28px)':0,
                borderRight: i<3?`1px solid rgba(245,237,216,0.07)`:'none',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
                  <span className="display" style={{ fontSize:26, fontWeight:700, color:C.sienna, lineHeight:1 }}>{step.num}</span>
                  <span className="label" style={{ color:C.stone, fontSize:9 }}>{step.phase}</span>
                </div>
                <div className="display" style={{ fontSize:'clamp(16px,2vw,19px)', fontWeight:600, color:C.cream, lineHeight:1.3, marginBottom:12 }}>{step.title}</div>
                <p style={{ fontSize:13, color:C.stone, lineHeight:1.85, fontWeight:300 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section id="stories" className="sec-pad" style={{ background:C.bgSoft }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div className="sec-header">
            <div className="reveal">
              <span className="label" style={{ color:C.sienna, display:'block', marginBottom:16 }}>What we believe</span>
              <h2 className="display" style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:700, lineHeight:1.1, color:C.cream }}>
                Our founding<br />convictions.
              </h2>
            </div>
          </div>
          {[
            {
              quote: "A property without a clear identity is just another listing. With one — a real name, a story, a visual language — it becomes a destination. Guests seek it out. They return. They recommend it.",
              attr: 'On brand building',
            },
            {
              quote: "Technology should work as hard as you do. When your WhatsApp responds within seconds and your calendar never double-books, your energy goes where it should: into hosting.",
              attr: 'On automation',
            },
            {
              quote: "We don't consider a project finished when it launches. We consider it started. Your property grows, the market shifts, guests evolve — and we stay alongside to adjust and improve.",
              attr: 'On partnership',
            },
          ].map((t, i) => (
            <div key={i} className={`reveal d${i % 3} testi`}>
              <p className="display" style={{ fontSize:'clamp(16px,2.2vw,22px)', fontWeight:400, color:`${C.cream}85`, lineHeight:1.75, marginBottom:24, maxWidth:820 }}>"{t.quote}"</p>
              <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                <div style={{ width:1, height:28, background:C.sienna }} />
                <div>
                  <div style={{ fontSize:12, fontWeight:400, color:C.stone, fontFamily:"'Jost',sans-serif", letterSpacing:'0.06em' }}>— Nakama · {t.attr}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="sec-pad" style={{ background:C.bg, textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 55% 70% at 50% 100%, rgba(155,93,63,0.2) 0%, transparent 65%)`, pointerEvents:'none' }} />
        <div style={{ maxWidth:680, margin:'0 auto', position:'relative', zIndex:1 }}>
          <span className="reveal d1 label" style={{ color:C.sienna, display:'block', marginBottom:24, fontSize:10 }}>Begin the journey</span>
          <h2 className="reveal d2 display" style={{ fontSize:'clamp(40px,7vw,84px)', fontWeight:800, lineHeight:1.0, color:C.cream, marginBottom:24, letterSpacing:'-0.03em' }}>
            Let's onboard<br /><span style={{ color:C.siennaL }}>your property.</span>
          </h2>
          <p className="reveal d3" style={{ fontSize:'clamp(13px,1.6vw,16px)', color:C.stone, lineHeight:1.9, marginBottom:44, fontWeight:300 }}>
            You have the property. We have the brand, the systems, and the market knowledge. Together, we turn it into a destination that earns — and grows. That is what Nakama means.
          </p>
          <div className="reveal d4" style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn-primary">Start onboarding →</button>
            <button className="btn-outline-cream">See how it works</button>
          </div>
          <div className="reveal d4 trust-bar">
            {['Response within 24h','No lock-in contracts','Bilingual support','Bali market specialists'].map((item, i, arr) => (
              <span key={item} className="trust-item" style={{ borderRight: i<arr.length-1?'1px solid rgba(255,255,255,0.06)':'none' }}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{ background:C.bgSoft, borderTop:`1px solid rgba(255,255,255,0.06)`, padding:'clamp(44px,7vw,64px) clamp(22px,5vw,56px) 32px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div className="footer-grid">
            <div className="footer-brand">
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke={C.sienna} strokeWidth="1.5"/>
                  <circle cx="9"  cy="14" r="3.5" fill={C.sienna}/>
                  <circle cx="19" cy="14" r="3.5" fill={C.siennaL} opacity="0.7"/>
                </svg>
                <span style={{ fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:700, color:C.cream }}>nakama</span>
              </div>
              <p style={{ fontSize:13, color:C.stone, lineHeight:1.75, fontWeight:300, maxWidth:210 }}>Property onboarding & branding. We help investors turn their properties into earning, well-branded destinations — and grow alongside them.</p>
            </div>
            {[
              { head:'Services', links:['Property Websites','WhatsApp Automation','OTA Integration','Brand Strategy'] },
              { head:'Company', links:['About','Process','Our Work','Contact'] },
              { head:'Connect', links:['hello@nakama.studio','WhatsApp us','LinkedIn','Instagram'] },
            ].map(col => (
              <div key={col.head}>
                <div className="label" style={{ color:C.sienna, marginBottom:16, fontSize:9 }}>{col.head}</div>
                {col.links.map(l => <span key={l} className="foot-link">{l}</span>)}
              </div>
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
            <p style={{ fontSize:13, color:`${C.stone}70`, fontWeight:300 }}>© {new Date().getFullYear()} Nakama Studio · Crafted with intention.</p>
            <p className="label" style={{ fontSize:10, color:`${C.stone}50` }}>Privacy · Terms</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
