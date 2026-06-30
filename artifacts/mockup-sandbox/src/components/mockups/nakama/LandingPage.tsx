import React, { useEffect, useRef, useState } from 'react';
import nakamaLogo    from '@/assets/nakama-logo-new.png';
import propertyHero  from '@/assets/property-hero.png';
import propertyAbout from '@/assets/property-about2.png';

/*
  NAKAMA PARTNERS — Light theme landing page
  Rules: NO emojis · NO "villa" word · NO em dashes
  Philosophy: branding → value creation → revenue growth
  Fonts: Sora (headlines) + Jost (body)
  Theme: White / F2F5F3 / E8EDE9 backgrounds, #0D1A14 text, #2A6044 green accent
*/

const C = {
  bg:      '#FFFFFF',
  bgMid:   '#F2F5F3',
  bgSoft:  '#E8EDE9',
  sienna:  '#2A6044',
  siennaL: '#3D8A62',
  siennaD: '#1E4533',
  stone:   '#5B7A6E',
  stoneL:  '#90AFA4',
  cream:   '#0D1A14',
};

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  /* Entrance animations */
  @keyframes hFadeUp    { from { opacity:0; transform:translateY(44px); } to { opacity:1; transform:none; } }
  @keyframes hFadeIn    { from { opacity:0; } to { opacity:1; } }
  @keyframes hFadeRight { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:none; } }
  .h-nav  { animation: hFadeIn    0.7s ease 0.1s  both; }
  .h-pre  { animation: hFadeRight 0.8s ease 0.3s  both; }
  .h-l0   { animation: hFadeUp   1.0s cubic-bezier(.22,1,.36,1) 0.4s  both; }
  .h-l1   { animation: hFadeUp   1.0s cubic-bezier(.22,1,.36,1) 0.56s both; }
  .h-l2   { animation: hFadeUp   1.0s cubic-bezier(.22,1,.36,1) 0.72s both; }
  .h-sub  { animation: hFadeIn   1.0s ease 1.0s both; }
  .h-cta  { animation: hFadeIn   1.0s ease 1.2s both; }

  /* Scroll reveals */
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

  /* Pipeline diagram */
  @keyframes pCard    { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
  @keyframes pBorder  { from { transform:scaleY(0); } to { transform:scaleY(1); } }
  @keyframes pContent { from { opacity:0; transform:translateX(6px); } to { opacity:1; transform:none; } }
  @keyframes pLine    { from { transform:scaleY(0); } to { transform:scaleY(1); } }
  @keyframes pGlow    { 0% { opacity:0; box-shadow:none; } 100% { opacity:1; box-shadow:0 0 28px rgba(61,138,98,0.25); } }

  .funnel-wrap .pipe-card    { opacity:0; }
  .funnel-wrap .pipe-border  { transform:scaleY(0); transform-origin:top; }
  .funnel-wrap .pipe-content { opacity:0; }
  .funnel-wrap .pipe-fill    { transform:scaleY(0); transform-origin:top; }
  .funnel-wrap .pipe-glow    { opacity:0; }

  .funnel-wrap.on .pn1 .pipe-card    { animation: pCard    0.45s cubic-bezier(.22,1,.36,1) 0.0s  both; }
  .funnel-wrap.on .pn1 .pipe-border  { animation: pBorder  0.35s ease                     0.2s  both; }
  .funnel-wrap.on .pn1 .pipe-content { animation: pContent 0.4s  ease                     0.4s  both; }
  .funnel-wrap.on .pc1 .pipe-fill    { animation: pLine    0.35s ease                     0.7s  both; }
  .funnel-wrap.on .pn2 .pipe-card    { animation: pCard    0.45s cubic-bezier(.22,1,.36,1) 0.8s  both; }
  .funnel-wrap.on .pn2 .pipe-border  { animation: pBorder  0.35s ease                     1.0s  both; }
  .funnel-wrap.on .pn2 .pipe-content { animation: pContent 0.4s  ease                     1.2s  both; }
  .funnel-wrap.on .pc2 .pipe-fill    { animation: pLine    0.35s ease                     1.5s  both; }
  .funnel-wrap.on .pn3 .pipe-card    { animation: pCard    0.45s cubic-bezier(.22,1,.36,1) 1.6s  both; }
  .funnel-wrap.on .pn3 .pipe-border  { animation: pBorder  0.35s ease                     1.8s  both; }
  .funnel-wrap.on .pn3 .pipe-content { animation: pContent 0.4s  ease                     2.0s  both; }
  .funnel-wrap.on .pc3 .pipe-fill    { animation: pLine    0.35s ease                     2.3s  both; }
  .funnel-wrap.on .pn4 .pipe-card    { animation: pCard    0.45s cubic-bezier(.22,1,.36,1) 2.4s  both; }
  .funnel-wrap.on .pn4 .pipe-border  { animation: pBorder  0.35s ease                     2.6s  both; }
  .funnel-wrap.on .pn4 .pipe-content { animation: pContent 0.4s  ease                     2.8s  both; }
  .funnel-wrap.on .pn4 .pipe-glow    { animation: pGlow    0.8s  ease                     3.1s  both; }

  /* Typography */
  .display { font-family:'Sora',sans-serif; }
  .label   { font-family:'Jost',sans-serif; font-size:10px; letter-spacing:2.5px; text-transform:uppercase; }

  /* Navigation */
  .nav-links-center { display:flex; gap:32px; position:absolute; left:50%; transform:translateX(-50%); }
  .nav-link { font-family:'Jost',sans-serif; font-size:12px; letter-spacing:0.08em; color:${C.stone}; cursor:pointer; transition:color 0.2s ease; }
  .nav-link:hover { color:${C.cream}; }

  /* Buttons */
  .btn-primary {
    background:${C.sienna}; color:#F8FAF9;
    border:none; cursor:pointer;
    padding:12px 28px;
    font-family:'Jost',sans-serif; font-size:12px; letter-spacing:0.08em;
    transition:background 0.2s ease, transform 0.15s ease;
    display:inline-block;
  }
  .btn-primary:hover { background:${C.siennaD}; transform:translateY(-1px); }
  .btn-ghost {
    background:transparent; color:${C.stone};
    border:1px solid rgba(0,0,0,0.15); cursor:pointer;
    padding:12px 28px;
    font-family:'Jost',sans-serif; font-size:12px; letter-spacing:0.08em;
    transition:border-color 0.2s ease, color 0.2s ease;
    display:inline-block;
  }
  .btn-ghost:hover { border-color:rgba(0,0,0,0.32); color:${C.cream}; }
  .btn-outline-cream {
    background:transparent; color:${C.cream};
    border:1px solid rgba(13,26,20,0.22); cursor:pointer;
    padding:12px 28px;
    font-family:'Jost',sans-serif; font-size:12px; letter-spacing:0.08em;
    transition:border-color 0.2s ease;
    display:inline-block;
  }
  .btn-outline-cream:hover { border-color:rgba(13,26,20,0.50); }
  .nav-chat-btn { background:transparent !important; border:1px solid rgba(0,0,0,0.15) !important; }

  /* Section padding */
  .sec-pad    { padding: clamp(64px,10vw,120px) clamp(22px,5vw,64px); }
  .sec-pad-sm { padding: clamp(40px,6vw,72px)  clamp(22px,5vw,64px); }

  /* Accordion services */
  .svc-acc-row { border-bottom:1px solid rgba(0,0,0,0.08); cursor:pointer; }
  .svc-acc-header { display:flex; align-items:center; gap:20px; padding:28px 0; user-select:none; }
  .svc-acc-header:hover .svc-acc-title { color:${C.cream}; }
  .svc-acc-num { font-family:'Jost',sans-serif; font-size:12px; color:${C.stoneL}; letter-spacing:2px; min-width:28px; }
  .svc-acc-title { font-family:'Sora',sans-serif; font-size:clamp(18px,2.2vw,24px); font-weight:700; color:${C.stone}; transition:color 0.22s ease; flex:1; }
  .svc-acc-title.active { color:${C.cream}; }

  /* Section header */
  .sec-header { display:grid; grid-template-columns:1fr 1fr; gap:clamp(24px,5vw,64px); align-items:start; margin-bottom:clamp(48px,7vw,80px); }
  @media (max-width:700px) { .sec-header { grid-template-columns:1fr; } }

  /* About grid */
  .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,6vw,80px); align-items:start; }
  @media (max-width:760px) { .about-grid { grid-template-columns:1fr; } }
  .about-img { aspect-ratio:4/5; }
  @media (max-width:760px) { .about-img { aspect-ratio:16/9; } }

  /* Stats grid */
  .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); }
  @media (max-width:640px) { .stats-grid { grid-template-columns:repeat(2,1fr); } }

  /* Process grid */
  .process-grid { display:grid; grid-template-columns:repeat(4,1fr); }
  @media (max-width:640px) { .process-grid { grid-template-columns:1fr 1fr; } }
  .proc-cell { border-left:1px solid rgba(0,0,0,0.09); }
  .proc-cell:first-child { border-left:none; }

  /* Footer grid */
  .footer-grid { display:grid; grid-template-columns:1.8fr 1fr 1fr 1fr; gap:clamp(24px,4vw,48px); padding-bottom:48px; margin-bottom:32px; border-bottom:1px solid rgba(0,0,0,0.08); }
  @media (max-width:700px) { .footer-grid { grid-template-columns:1fr 1fr; } .footer-brand { grid-column:1/-1; } }

  /* Hero lower row */
  .hero-lower { display:grid; grid-template-columns:1fr 1fr; gap:clamp(24px,5vw,64px); margin-top:clamp(32px,5vw,52px); }
  .cta-row { display:flex; gap:12px; flex-wrap:wrap; }
  @media (max-width:700px) { .hero-lower { grid-template-columns:1fr; } }

  /* Feat cards */
  .feat-card { padding:clamp(24px,3.5vw,36px); background:${C.bg}; border:1px solid rgba(0,0,0,0.08); display:flex; flex-direction:column; gap:14px; }

  /* Testimonials */
  .testi { padding:clamp(28px,5vw,48px) 0; border-bottom:1px solid rgba(0,0,0,0.08); }
  .testi:last-child { border-bottom:none; }

  /* Marquee */
  @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  .marquee-track { display:flex; width:max-content; animation:marquee 22s linear infinite; }

  /* Atm glow */
  @keyframes atm { 0%,100% { opacity:1; } 50% { opacity:0.75; } }

  /* Pain section — editorial */
  .pain-row { display:flex; gap:clamp(24px,4vw,56px); padding:clamp(28px,4vw,44px) 0; border-bottom:1px solid rgba(0,0,0,0.08); align-items:flex-start; }
  .pain-row:first-child { border-top:1px solid rgba(0,0,0,0.08); }

  /* Onboarding interactive */
  @keyframes obUp  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  @keyframes obIn  { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:translateX(0); } }
  @keyframes obInR { from { opacity:0; transform:translateX(10px);  } to { opacity:1; transform:translateX(0); } }
  .ob-pill {
    padding:8px 20px;
    font-family:'Jost',sans-serif; font-size:9px; letter-spacing:2px;
    border:1px solid; cursor:pointer;
    transition:all 0.22s ease;
    background:transparent;
    appearance:none; -webkit-appearance:none; outline:none;
  }
  .ob-pill:hover { opacity:0.8; }
  .ob-dot { border:none; cursor:pointer; transition:all 0.3s ease; outline:none; appearance:none; -webkit-appearance:none; }

  /* Trust bar */
  .trust-bar { display:flex; flex-wrap:wrap; gap:0; border-top:1px solid rgba(0,0,0,0.08); margin-top:56px; padding-top:44px; justify-content:center; }
  .trust-item { font-family:'Jost',sans-serif; font-size:12px; color:${C.stoneL}; font-weight:300; padding:6px 24px; letter-spacing:0.04em; }

  /* Footer links */
  .foot-link { font-family:'Jost',sans-serif; font-size:13px; color:${C.stone}; cursor:pointer; font-weight:300; transition:color 0.2s ease; display:block; margin-bottom:10px; }
  .foot-link:hover { color:${C.cream}; }

  @media (max-width: 600px) { .scroll-hint { display: none !important; } }
`;

const PIPELINE: Array<{
  num: string; label: string; title: string; body: string;
  tags: string[]; highlight?: boolean;
}> = [
  {
    num: '01', label: 'Brand',
    title: 'Build your identity',
    body: 'Your property name, visual language, tone of voice, and story. The foundation that makes everything downstream recognisable.',
    tags: ['Property Name', 'Visual Language', 'Brand Story'],
  },
  {
    num: '02', label: 'Awareness',
    title: 'Reach the right guests',
    body: 'A website and digital presence built to be found — on search, on OTAs, and through direct channels.',
    tags: ['Website', 'OTA Presence', 'Search Visibility'],
  },
  {
    num: '03', label: 'Pitch',
    title: 'Convert the interest',
    body: 'WhatsApp automation, fast response, and frictionless booking flows that turn curiosity into commitment.',
    tags: ['WhatsApp Bot', 'Instant Response', 'Direct Booking'],
  },
  {
    num: '04', label: 'Revenue',
    title: 'Grow the value',
    body: 'More direct bookings, fewer platform fees, and a brand guests seek out and return to. Revenue that compounds.',
    tags: ['Direct Bookings', 'Lower Fees', 'Returning Guests'],
    highlight: true,
  },
];

/* Onboarding stages */
const ONBOARD = [
  {
    label: 'First Call',
    title: "You never have to figure this out alone.",
    desc: "You've built or bought something real. The hard part is done. What comes next is where most owners get stuck. One conversation with us, and you won't have to.",
  },
  {
    label: 'Your Brand',
    title: 'It clicks into place.',
    desc: "A name, a palette, a voice — built around your property's real character. Most clients say this is the moment it stops feeling like an investment and starts feeling like a destination.",
  },
  {
    label: 'Goes Live',
    title: 'From nothing to running.',
    desc: "Website live. OTAs active. WhatsApp responding while you sleep. We build it, connect it, test it. You approve the result. That's it.",
  },
  {
    label: 'Automated',
    title: 'Works while you sleep.',
    desc: "Guests get answered in seconds. Calendars never double-book. Check-in details go out automatically. Your property runs like a professional operation, without you being on call.",
  },
  {
    label: 'First Booking',
    title: 'There it is.',
    desc: "The first booking confirmation lands in your inbox. Revenue starts moving. We're watching the same numbers you are — and already working on getting the next one.",
  },
];

/* Services */
const SERVICES_ACC = [
  {
    num: '01',
    title: 'Four platforms. Most owners use one.',
    desc: 'Most owners set up Airbnb and stop there. We get your property live on all four — Airbnb, Booking.com, Agoda, and Traveloka — fully written, photographed, and optimized for each. Every platform reaches a different kind of guest. You need to be on all of them.',
    result: 'Your property is visible and bookable everywhere guests are looking.',
  },
  {
    num: '02',
    title: 'Your listing is judged in two seconds.',
    desc: "There are over 84,000 listings in Bali. Guests scroll fast. Phone photography, no brand, and a generic description means you lose to the property that looks the part. We build your brand identity, your website, and the visual presence that earns trust before a guest has even clicked.",
    result: 'Your property has an identity that earns the booking.',
  },
  {
    num: '03',
    title: "It should run itself. Right now, it runs you.",
    desc: "Most owners don't realise how much time goes into the daily back-and-forth. Messages at midnight. Calendars getting out of sync. Check-in details that need sending. We build the systems that handle all of it automatically, so your property runs professionally without you being available around the clock.",
    result: "Your property runs professionally whether you're in Bali or anywhere in the world.",
  },
];

/* Pain points */
const PAIN_POINTS = [
  {
    num: '01',
    headline: "Your property isn't on the platforms where guests actually book.",
    detail: "Most owners set up Airbnb and stop. But 42% of bookings in the region happen on Traveloka, Agoda, and Booking.com — reaching guests who will never find you.",
  },
  {
    num: '02',
    headline: "You look exactly like 84,000 other listings.",
    detail: "Guests decide in two seconds. Phone photography, no brand, and a generic description means they scroll past you to the property that looks the part.",
  },
  {
    num: '03',
    headline: "A guest messaged at midnight. You replied at 9am. They booked someone else.",
    detail: "Guests send the same inquiry to five properties at once. The first to reply professionally wins. Slow responses don't just frustrate — they lose the booking entirely.",
  },
  {
    num: '04',
    headline: "You set one price and left it there.",
    detail: "The market shifts every week. High season, local events, competitor gaps. Dynamic pricing adds 20 to 30 percent revenue without a single extra booking.",
  },
];

const PARTICLES: Array<{
  normY: number; r: number; dur: number; phase: number;
  dropAt: number; sienna: boolean;
}> = [
  { normY:0.30, r:3.2, dur:4200, phase:0.00, dropAt:940, sienna:true  },
  { normY:0.62, r:2.5, dur:5100, phase:0.18, dropAt:940, sienna:true  },
  { normY:0.45, r:2.0, dur:4700, phase:0.36, dropAt:940, sienna:true  },
  { normY:0.20, r:2.8, dur:3900, phase:0.52, dropAt:940, sienna:false },
  { normY:0.78, r:2.3, dur:5400, phase:0.70, dropAt:940, sienna:true  },
  { normY:0.55, r:3.0, dur:4400, phase:0.85, dropAt:940, sienna:true  },
  { normY:0.35, r:2.1, dur:4900, phase:0.12, dropAt:940, sienna:false },
  { normY:0.65, r:2.7, dur:3800, phase:0.40, dropAt:940, sienna:true  },
  { normY:0.10, r:1.8, dur:5200, phase:0.62, dropAt:600, sienna:false },
  { normY:0.88, r:2.2, dur:4600, phase:0.78, dropAt:450, sienna:false },
  { normY:0.22, r:2.4, dur:3700, phase:0.94, dropAt:520, sienna:false },
  { normY:0.70, r:1.9, dur:4800, phase:0.28, dropAt:380, sienna:false },
  { normY:0.50, r:2.6, dur:4100, phase:0.55, dropAt:680, sienna:false },
  { normY:0.40, r:2.0, dur:5000, phase:0.75, dropAt:940, sienna:true  },
  { normY:0.60, r:2.9, dur:3600, phase:0.90, dropAt:940, sienna:true  },
];

export function LandingPage() {
  const [onstage, setOnstage] = useState(0);
  const [svcOpen, setSvcOpen] = useState(0);

  const particleRefs = useRef<(SVGCircleElement | null)[]>(Array(PARTICLES.length).fill(null));
  const obsRef       = useRef<IntersectionObserver | null>(null);
  const phases       = useRef<number[]>(PARTICLES.map(p => p.phase));

  // Scroll reveal
  useEffect(() => {
    const cb: IntersectionObserverCallback = (entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
    };
    obsRef.current = new IntersectionObserver(cb, { threshold: 0.12 });
    document.querySelectorAll('.reveal, .rule-r, .funnel-wrap').forEach(el => {
      obsRef.current!.observe(el);
    });
    return () => obsRef.current?.disconnect();
  }, []);

  // Auto-advance onboarding
  useEffect(() => {
    const id = setInterval(() => setOnstage(s => (s + 1) % ONBOARD.length), 4500);
    return () => clearInterval(id);
  }, []);

  // Looping particle animation
  useEffect(() => {
    let prev: number | null = null;
    let raf: number;
    const tick = (now: number) => {
      const dt = prev === null ? 0 : Math.min((now - prev) / 1000, 0.05);
      prev = now;
      PARTICLES.forEach((p, i) => {
        const el = particleRefs.current[i];
        if (!el) return;
        phases.current[i] = (phases.current[i] + dt / (p.dur / 1000)) % 1;
        const t = phases.current[i];
        const x = t * 960 - 20;
        const xc = Math.max(0, Math.min(x, 900));
        let normY = p.normY;
        if (p.dropAt < 940) {
          const driftStart = p.dropAt - 120;
          if (xc > driftStart) {
            const drift = Math.min(1, (xc - driftStart) / 120);
            const edgeDir = p.normY < 0.5 ? -1 : 1;
            normY = p.normY + edgeDir * drift * 0.20;
          }
        }
        const uy = 40 + xc / 10;
        const ly = 240 - xc / 10;
        const y  = uy + normY * (ly - uy);
        const fadeIn  = Math.min(1, (x + 20) / 60);
        const fadeOut = p.dropAt < 940 && x > p.dropAt - 90
          ? Math.max(0, (p.dropAt - x) / 90)
          : 1;
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

      {/* NAV */}
      <nav className="h-nav" style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px,5vw,56px)', height: 72,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={nakamaLogo}
            alt="Nakama Partners"
            style={{ height: 52, width: 'auto', display: 'block' }}
          />
        </div>
        <div className="nav-links-center">
          {['Services','Process','About','Stories'].map(l => <span key={l} className="nav-link">{l}</span>)}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="btn-ghost nav-chat-btn" style={{ padding: '9px 20px', fontSize: 12 }}>Chat with us</button>
          <button className="btn-primary" style={{ padding: '9px 20px', fontSize: 12 }}>Grow with us</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '0 clamp(22px,5vw,64px) clamp(60px,9vw,96px)',
        position: 'relative', background: C.bg, overflow: 'hidden',
      }}>
        {/* Subtle background texture */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <img
            src={propertyHero}
            alt=""
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 40%',
              opacity: 0.14,
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              linear-gradient(to right, ${C.bg} 38%, rgba(255,255,255,0.6) 65%, transparent 100%),
              linear-gradient(to top, ${C.bg} 8%, transparent 55%)
            `,
          }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100 }}>
          <p className="h-pre label" style={{ color: C.sienna, marginBottom: 'clamp(20px,3vw,36px)' }}>
            Property Onboarding and Branding · Bali and Southeast Asia
          </p>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em' }}>
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
          <div className="hero-lower">
            <div className="h-sub">
              <p style={{ fontSize: 'clamp(14px,1.8vw,17px)', color: C.stone, lineHeight: 1.85, fontWeight: 300, maxWidth: 500 }}>
                <strong style={{ color: C.cream, fontWeight: 500 }}>Nakama means companions.</strong> You've invested in a property. Now let's make it earn. Brand, digital presence, and guest systems built to grow alongside you.
              </p>
            </div>
            <div className="h-cta">
              <div className="cta-row">
                <button className="btn-primary">Grow with Nakama</button>
                <button className="btn-ghost">See our work</button>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-hint" style={{ position: 'absolute', bottom: 36, right: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: 0.25 }}>
          <span className="label" style={{ color: C.stone, fontSize: 9, writingMode: 'vertical-rl' }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: `linear-gradient(${C.stone}, transparent)` }} />
        </div>
      </section>

      {/* PROBLEM — editorial, no interaction */}
      <section id="pain" className="sec-pad" style={{ background: C.bgMid }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <div className="reveal" style={{ marginBottom: 'clamp(40px,6vw,64px)' }}>
            <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 16 }}>The reality</span>
            <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, color: C.cream, lineHeight: 1.1, maxWidth: 680 }}>
              Bali gets 6 million visitors a year.<br />Most will never find your property.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(12px,2vw,20px)' }}>

            {/* Card 1 — invisible on most platforms */}
            <div className="reveal d1" style={{ background: C.bg, padding: 'clamp(28px,4vw,44px)', display: 'flex', flexDirection: 'column', gap: 20, border: '1px solid rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <rect x="1"  y="1"  width="15" height="15" rx="2" stroke={C.sienna}  strokeWidth="1.5"/>
                  <rect x="20" y="1"  width="15" height="15" rx="2" stroke={C.sienna}  strokeWidth="1.5"/>
                  <rect x="1"  y="20" width="15" height="15" rx="2" stroke={C.sienna}  strokeWidth="1.5"/>
                  <rect x="20" y="20" width="15" height="15" rx="2" stroke={C.stoneL} strokeWidth="1.5" strokeDasharray="3 2"/>
                  <line x1="27.5" y1="24" x2="27.5" y2="31" stroke={C.stoneL} strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="24" y1="27.5" x2="31" y2="27.5" stroke={C.stoneL} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span style={{ fontSize: 11, color: C.stoneL, fontFamily: "'Jost',sans-serif", letterSpacing: 2 }}>01</span>
              </div>
              <div>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(16px,1.8vw,21px)', fontWeight: 700, color: C.cream, lineHeight: 1.35, marginBottom: 12 }}>
                  You're only on one platform. Guests on three others will never find you.
                </p>
                <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.85, fontWeight: 300 }}>
                  Airbnb is the start, not the finish. Traveloka, Agoda, and Booking.com each reach guests who will never open Airbnb. Most owners never set them up.
                </p>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.sienna, flexShrink: 0 }}/>
                <span style={{ fontSize: 12, color: C.sienna, fontFamily: "'Jost',sans-serif", fontWeight: 500 }}>42% of regional bookings happen on Traveloka alone</span>
              </div>
            </div>

            {/* Card 2 — looks like everyone else */}
            <div className="reveal d2" style={{ background: C.bg, padding: 'clamp(28px,4vw,44px)', display: 'flex', flexDirection: 'column', gap: 20, border: '1px solid rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <rect x="1" y="6" width="34" height="24" rx="2" stroke={C.sienna} strokeWidth="1.5"/>
                  <circle cx="18" cy="18" r="5.5" stroke={C.sienna} strokeWidth="1.5"/>
                  <circle cx="29" cy="10" r="1.5" fill={C.sienna}/>
                  <line x1="8" y1="28" x2="28" y2="28" stroke={C.stoneL} strokeWidth="1" strokeLinecap="round" strokeDasharray="3 2"/>
                </svg>
                <span style={{ fontSize: 11, color: C.stoneL, fontFamily: "'Jost',sans-serif", letterSpacing: 2 }}>02</span>
              </div>
              <div>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(16px,1.8vw,21px)', fontWeight: 700, color: C.cream, lineHeight: 1.35, marginBottom: 12 }}>
                  Phone photos and a blank description. Guests scroll past in two seconds.
                </p>
                <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.85, fontWeight: 300 }}>
                  In a market of 84,000 listings, guests decide on a first impression. Without a real brand, professional photography, and a story, there's nothing to make them stop.
                </p>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.sienna, flexShrink: 0 }}/>
                <span style={{ fontSize: 12, color: C.sienna, fontFamily: "'Jost',sans-serif", fontWeight: 500 }}>Professional photos bring 28% more bookings on average</span>
              </div>
            </div>

            {/* Card 3 — slow reply */}
            <div className="reveal d3" style={{ background: C.bg, padding: 'clamp(28px,4vw,44px)', display: 'flex', flexDirection: 'column', gap: 20, border: '1px solid rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M32 4H4a2 2 0 00-2 2v18a2 2 0 002 2h20l8 6V6a2 2 0 00-2-2z" stroke={C.sienna} strokeWidth="1.5" strokeLinejoin="round"/>
                  <circle cx="23" cy="4" r="7" fill={C.bgMid} stroke={C.sienna} strokeWidth="1.5"/>
                  <line x1="23" y1="1.5" x2="23" y2="4" stroke={C.sienna} strokeWidth="1.4" strokeLinecap="round"/>
                  <line x1="23" y1="4" x2="25.5" y2="6" stroke={C.sienna} strokeWidth="1.4" strokeLinecap="round"/>
                  <line x1="10" y1="14" x2="20" y2="14" stroke={C.stoneL} strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="10" y1="19" x2="16" y2="19" stroke={C.stoneL} strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span style={{ fontSize: 11, color: C.stoneL, fontFamily: "'Jost',sans-serif", letterSpacing: 2 }}>03</span>
              </div>
              <div>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(16px,1.8vw,21px)', fontWeight: 700, color: C.cream, lineHeight: 1.35, marginBottom: 12 }}>
                  A guest messaged at midnight. You replied at 9am. They already booked.
                </p>
                <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.85, fontWeight: 300 }}>
                  Guests send the same inquiry to multiple properties at once. The one that replies first — professionally, instantly — gets the booking. Slow replies don't just frustrate. They lose the reservation entirely.
                </p>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.sienna, flexShrink: 0 }}/>
                <span style={{ fontSize: 12, color: C.sienna, fontFamily: "'Jost',sans-serif", fontWeight: 500 }}>48% of bookings go to whoever replies first</span>
              </div>
            </div>

            {/* Card 4 — flat pricing */}
            <div className="reveal d4" style={{ background: C.bg, padding: 'clamp(28px,4vw,44px)', display: 'flex', flexDirection: 'column', gap: 20, border: '1px solid rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <polyline points="3,28 10,20 16,24 24,12 33,8" stroke={C.sienna} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="3" y1="33" x2="33" y2="33" stroke={C.stoneL} strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="3" y1="8"  x2="3"  y2="33" stroke={C.stoneL} strokeWidth="1.2" strokeLinecap="round"/>
                  <circle cx="10" cy="20" r="2.5" fill={C.bg} stroke={C.sienna} strokeWidth="1.4"/>
                  <circle cx="24" cy="12" r="2.5" fill={C.bg} stroke={C.sienna} strokeWidth="1.4"/>
                  <line x1="3" y1="20" x2="33" y2="20" stroke={C.stoneL} strokeWidth="0.8" strokeLinecap="round" strokeDasharray="3 2.5"/>
                </svg>
                <span style={{ fontSize: 11, color: C.stoneL, fontFamily: "'Jost',sans-serif", letterSpacing: 2 }}>04</span>
              </div>
              <div>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(16px,1.8vw,21px)', fontWeight: 700, color: C.cream, lineHeight: 1.35, marginBottom: 12 }}>
                  You set one price and left it. The market moved every week without you.
                </p>
                <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.85, fontWeight: 300 }}>
                  Bali's rates shift with seasons, local events, and what competitors do. A static price leaves money on peak nights and loses guests on slow ones. Dynamic pricing adjusts so you don't have to.
                </p>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.sienna, flexShrink: 0 }}/>
                <span style={{ fontSize: 12, color: C.sienna, fontFamily: "'Jost',sans-serif", fontWeight: 500 }}>Dynamic pricing adds up to 30% revenue without extra bookings</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SERVICES ACCORDION */}
      <section id="services" className="sec-pad" style={{ background: C.bg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <div className="sec-header">
            <div className="reveal">
              <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 16 }}>What we do together</span>
              <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 700, lineHeight: 1.1, color: C.cream }}>
                Three things.<br />Done as one.
              </h2>
            </div>
            <div className="reveal d1" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <p style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: C.stone, lineHeight: 1.9, fontWeight: 300 }}>
                Most owners solve these one at a time, with vendors who don't talk to each other. We handle all three as one connected system.
              </p>
            </div>
          </div>

          <div className="reveal d2">
            {SERVICES_ACC.map((svc, i) => (
              <div
                key={i}
                className="svc-acc-row"
                onClick={() => setSvcOpen(svcOpen === i ? -1 : i)}
              >
                <div className="svc-acc-header">
                  <span className="svc-acc-num">{svc.num}</span>
                  <div style={{ flex: 1 }}>
                    <div className={`svc-acc-title${svcOpen === i ? ' active' : ''}`}>{svc.title}</div>
                  </div>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16"
                    style={{ transition: 'transform 0.3s ease', transform: svcOpen === i ? 'rotate(180deg)' : 'none', flexShrink: 0 }}
                  >
                    <polyline points="4,6 8,10 12,6" stroke={svcOpen === i ? C.sienna : C.stoneL} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <div style={{ overflow: 'hidden', maxHeight: svcOpen === i ? 400 : 0, transition: 'max-height 0.5s cubic-bezier(.4,0,.2,1)' }}>
                  <div style={{ padding: '4px 0 36px clamp(28px,3.5vw,48px)', maxWidth: 640 }}>
                    <p style={{ fontSize: 16, color: C.stone, lineHeight: 2.0, fontWeight: 300, marginBottom: 28 }}>
                      {svc.desc}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 28, height: 1, background: C.sienna, flexShrink: 0 }}/>
                      <span style={{ fontSize: 13, color: C.sienna, fontWeight: 500, lineHeight: 1.6 }}>{svc.result}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONBOARDING INTERACTIVE */}
      <section className="sec-pad" style={{ background: C.bgMid, borderTop: `1px solid rgba(0,0,0,0.06)` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
            <span className="label" style={{ color: C.sienna }}>The process</span>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,38px)', fontWeight: 800, color: C.cream, lineHeight: 1.15, margin: 0 }}>
              The journey every owner faces.<br />We walk it with you.
            </h2>
          </div>

          {/* Stage selector */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 44, flexWrap: 'wrap' }}>
            {ONBOARD.map((s, i) => (
              <button
                key={i}
                className="ob-pill"
                onClick={() => setOnstage(i)}
                style={{
                  color:       onstage === i ? '#F8FAF9'              : C.stone,
                  borderColor: onstage === i ? C.sienna               : 'rgba(0,0,0,0.12)',
                  background:  onstage === i ? C.sienna               : 'transparent',
                }}
              >
                {String(i + 1).padStart(2, '0')}&nbsp;&nbsp;{s.label.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Main grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 56, alignItems: 'start' }}>

            {/* Left: text */}
            <div key={`txt-${onstage}`} style={{ animation: 'obUp 0.4s ease both' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
                {ONBOARD.map((_, i) => (
                  <button
                    key={i}
                    className="ob-dot"
                    onClick={() => setOnstage(i)}
                    style={{
                      width: onstage === i ? 22 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: onstage === i ? C.sienna : 'rgba(0,0,0,0.15)',
                    }}
                  />
                ))}
              </div>
              <h3 className="display" style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 700, color: C.cream, lineHeight: 1.25, marginBottom: 16 }}>
                {ONBOARD[onstage].title}
              </h3>
              <p style={{ fontSize: 15, color: C.stone, lineHeight: 1.9, fontWeight: 300 }}>
                {ONBOARD[onstage].desc}
              </p>
            </div>

            {/* Right: visual card — kept dark as a "device" mockup */}
            <div style={{ border: `1px solid rgba(0,0,0,0.10)`, background: '#0D1710', overflow: 'hidden', position: 'relative' }}>
              {/* Progress bar */}
              <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', position: 'relative', flexShrink: 0 }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0, height: '100%',
                  width: `${((onstage + 1) / 5) * 100}%`,
                  background: C.sienna,
                  transition: 'width 0.65s cubic-bezier(.4,0,.2,1)',
                }}/>
              </div>

              {/* Visual panels */}
              <div key={`vis-${onstage}`} style={{ padding: '32px 36px' }}>

                {/* Stage 0: First call */}
                {onstage === 0 && (
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: 2.5, color: 'rgba(155,176,164,0.6)', fontFamily: "'Jost',sans-serif", marginBottom: 24 }}>PROPERTY INTAKE</div>
                    {[
                      ['Property name',  'Sekar Property'],
                      ['Category',       'Property, 4 bedrooms'],
                      ['Location',       'Ubud, Bali'],
                      ['Target guest',   'International leisure'],
                      ['Revenue goal',   'Direct bookings and OTA'],
                    ].map(([label, val], i) => (
                      <div key={i} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '13px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        animation: `obUp 0.32s ease ${i * 0.11}s both`,
                      }}>
                        <span style={{ fontSize: 10, color: C.stone, fontFamily: "'Jost',sans-serif" }}>{label}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontSize: 12, color: '#F2F5F3', fontWeight: 400 }}>{val}</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" style={{ animation: `obUp 0.25s ease ${i * 0.11 + 0.18}s both`, opacity: 0 }}>
                            <circle cx="8" cy="8" r="7" stroke={C.sienna} strokeWidth="0.9" fill="none"/>
                            <polyline points="5,8 7.2,10.2 11.5,5.8" stroke={C.siennaL} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Stage 1: Brand */}
                {onstage === 1 && (
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: 2.5, color: 'rgba(155,176,164,0.6)', fontFamily: "'Jost',sans-serif", marginBottom: 24 }}>BRAND IDENTITY</div>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
                      {[C.sienna, C.siennaL, '#F2F5F3', C.stone, '#121E15'].map((col, i) => (
                        <div key={i} style={{
                          flex: 1, height: 40, background: col,
                          border: '1px solid rgba(255,255,255,0.07)',
                          animation: `obUp 0.3s ease ${i * 0.08}s both`,
                        }}>
                          <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', padding: '4px 6px', fontFamily: "'Jost',sans-serif", letterSpacing: 0.5 }}>{col}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, marginBottom: 22, animation: 'obUp 0.4s ease 0.42s both' }}>
                      <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 32, letterSpacing: 7, color: '#F2F5F3', marginBottom: 6 }}>SEKAR</div>
                      <div style={{ fontSize: 9, letterSpacing: 5, color: C.stone, fontFamily: "'Jost',sans-serif" }}>UBUD&nbsp;&nbsp;·&nbsp;&nbsp;BALI</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, animation: 'obUp 0.4s ease 0.62s both' }}>
                      {[['SORA 800', true], ['JOST 300', false]].map(([t, active]) => (
                        <div key={String(t)} style={{
                          padding: '6px 14px',
                          border: `1px solid ${active ? C.sienna : 'rgba(255,255,255,0.10)'}`,
                          fontSize: 9, letterSpacing: 1.5,
                          color: active ? C.siennaL : C.stone,
                          fontFamily: "'Jost',sans-serif",
                        }}>{String(t)}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stage 2: Website */}
                {onstage === 2 && (
                  <div style={{ animation: 'obUp 0.35s ease both' }}>
                    <div style={{ fontSize: 9, letterSpacing: 2.5, color: 'rgba(155,176,164,0.6)', fontFamily: "'Jost',sans-serif", marginBottom: 18 }}>WEBSITE BUILD</div>
                    <div style={{ border: '1px solid rgba(255,255,255,0.10)', overflow: 'hidden' }}>
                      <div style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                        {[0,1,2].map(i => (
                          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.14)' }}/>
                        ))}
                        <div style={{ flex: 1, marginLeft: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 2, padding: '3px 10px', fontSize: 8, color: 'rgba(107,122,110,0.6)', fontFamily: "'Jost',sans-serif" }}>
                          sekar-bali.com
                        </div>
                      </div>
                      <div style={{ padding: '22px 20px', background: '#080E0B' }}>
                        <div style={{ fontSize: 8, color: 'rgba(107,122,110,0.55)', letterSpacing: 2.5, marginBottom: 8, fontFamily: "'Jost',sans-serif", animation: 'obUp 0.3s ease 0.1s both' }}>SEKAR · UBUD</div>
                        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 800, color: '#F2F5F3', lineHeight: 1.15, marginBottom: 14, animation: 'obUp 0.3s ease 0.2s both' }}>
                          Where calm<br />meets craft.
                        </div>
                        <div style={{ animation: 'obUp 0.3s ease 0.32s both' }}>
                          <div style={{ display: 'inline-block', background: C.sienna, color: '#F2F5F3', padding: '8px 18px', fontSize: 9, letterSpacing: 2, fontFamily: "'Jost',sans-serif" }}>
                            BOOK YOUR STAY
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 20, marginTop: 18, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 14, animation: 'obUp 0.3s ease 0.44s both' }}>
                          {[['4', 'Bedrooms'], ['2', 'Pools'], ['12', 'Reviews']].map(([n, l]) => (
                            <div key={l}>
                              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 700, color: C.siennaL }}>{n}</div>
                              <div style={{ fontSize: 7, color: 'rgba(107,122,110,0.6)', letterSpacing: 1.5, fontFamily: "'Jost',sans-serif" }}>{l.toUpperCase()}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage 3: Automation */}
                {onstage === 3 && (
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: 2.5, color: 'rgba(155,176,164,0.6)', fontFamily: "'Jost',sans-serif", marginBottom: 18 }}>WHATSAPP AUTOMATION</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ alignSelf: 'flex-end', maxWidth: '78%', background: `rgba(42,96,68,0.18)`, border: `1px solid rgba(42,96,68,0.28)`, padding: '9px 13px', animation: 'obInR 0.3s ease 0.05s both' }}>
                        <div style={{ fontSize: 11, color: '#F2F5F3', lineHeight: 1.5 }}>Hi, is the property available 14 to 18 Dec?</div>
                        <div style={{ fontSize: 7, color: 'rgba(107,122,110,0.55)', marginTop: 4, textAlign: 'right', fontFamily: "'Jost',sans-serif" }}>09:14</div>
                      </div>
                      <div style={{ alignSelf: 'flex-start', maxWidth: '82%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', padding: '9px 13px', animation: 'obIn 0.3s ease 0.55s both' }}>
                        <div style={{ fontSize: 8, color: C.sienna, marginBottom: 5, letterSpacing: 1.5, fontFamily: "'Jost',sans-serif" }}>NAKAMA BOT</div>
                        <div style={{ fontSize: 11, color: '#F2F5F3', lineHeight: 1.5 }}>Yes, those dates are open. Rate is $280/night. Shall I send the booking link?</div>
                        <div style={{ fontSize: 7, color: 'rgba(107,122,110,0.55)', marginTop: 4, fontFamily: "'Jost',sans-serif" }}>09:14</div>
                      </div>
                      <div style={{ alignSelf: 'flex-end', maxWidth: '40%', background: `rgba(42,96,68,0.18)`, border: `1px solid rgba(42,96,68,0.28)`, padding: '9px 13px', animation: 'obInR 0.3s ease 1.05s both' }}>
                        <div style={{ fontSize: 11, color: '#F2F5F3' }}>Yes please</div>
                        <div style={{ fontSize: 7, color: 'rgba(107,122,110,0.55)', marginTop: 4, textAlign: 'right', fontFamily: "'Jost',sans-serif" }}>09:15</div>
                      </div>
                      <div style={{ alignSelf: 'flex-start', maxWidth: '88%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', padding: '9px 13px', animation: 'obIn 0.3s ease 1.45s both' }}>
                        <div style={{ fontSize: 8, color: C.sienna, marginBottom: 5, letterSpacing: 1.5, fontFamily: "'Jost',sans-serif" }}>NAKAMA BOT</div>
                        <div style={{ fontSize: 11, color: '#F2F5F3', lineHeight: 1.5, marginBottom: 8 }}>Booking link sent. Your deposit holds the dates.</div>
                        <div style={{ display: 'inline-block', padding: '5px 12px', border: `1px solid ${C.sienna}`, fontSize: 9, color: C.siennaL, letterSpacing: 1.5, fontFamily: "'Jost',sans-serif" }}>SECURE YOUR STAY</div>
                        <div style={{ fontSize: 7, color: 'rgba(107,122,110,0.55)', marginTop: 5, fontFamily: "'Jost',sans-serif" }}>09:15</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage 4: Live */}
                {onstage === 4 && (
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: 2.5, color: 'rgba(155,176,164,0.6)', fontFamily: "'Jost',sans-serif", marginBottom: 24 }}>DISTRIBUTION AND REVENUE</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                      {['Airbnb', 'Booking.com', 'Agoda', 'Traveloka', 'Direct'].map((p, i) => (
                        <div key={p} style={{
                          padding: '7px 16px',
                          border: `1px solid ${p === 'Direct' ? C.sienna : 'rgba(255,255,255,0.10)'}`,
                          fontSize: 10,
                          color: p === 'Direct' ? C.siennaL : C.stone,
                          fontFamily: "'Jost',sans-serif",
                          animation: `obUp 0.3s ease ${i * 0.09}s both`,
                        }}>{p}</div>
                      ))}
                    </div>
                    <div style={{ border: `1px solid rgba(42,96,68,0.35)`, background: 'rgba(42,96,68,0.07)', padding: '16px 20px', marginBottom: 20, animation: 'obUp 0.4s ease 0.48s both' }}>
                      <div style={{ fontSize: 9, color: C.sienna, letterSpacing: 2, marginBottom: 8, fontFamily: "'Jost',sans-serif" }}>BOOKING CONFIRMED</div>
                      <div style={{ fontSize: 14, color: '#F2F5F3', fontWeight: 500, marginBottom: 3 }}>14 to 18 December · 4 nights</div>
                      <div style={{ fontSize: 12, color: C.stone }}>2 guests · $1,120 total</div>
                    </div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', animation: 'obUp 0.4s ease 0.68s both' }}>
                      {Array.from({ length: 14 }, (_, i) => {
                        const booked = [13, 14, 15, 16, 17].includes(i + 1);
                        return (
                          <div key={i} style={{
                            width: 28, height: 28,
                            border: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 8, fontFamily: "'Jost',sans-serif",
                            color:      booked ? C.siennaL : 'rgba(107,122,110,0.5)',
                            background: booked ? 'rgba(42,96,68,0.16)' : 'transparent',
                          }}>{i + 1}</div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FUNNEL */}
      <section className="sec-pad" style={{ background: C.bg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

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

          <div style={{
            background: C.bgSoft,
            border: `1px solid rgba(0,0,0,0.07)`,
            padding: 'clamp(16px,2.5vw,28px)',
            marginBottom: 4,
            overflow: 'hidden',
          }}>
            <svg viewBox="0 0 900 280" width="100%" overflow="hidden" style={{ display: 'block', height: 'auto' }}>
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
              {[225, 450, 675].map(x => (
                <line key={x} x1={x} y1={22} x2={x} y2={270}
                  stroke="rgba(0,0,0,0.06)" strokeWidth={1} />
              ))}
              <line x1={0} y1={40}  x2={900} y2={130} stroke={`${C.sienna}55`} strokeWidth={1} />
              <line x1={0} y1={240} x2={900} y2={150} stroke={`${C.sienna}55`} strokeWidth={1} />
              <ellipse cx={765} cy={139} rx={88} ry={26} fill={`${C.sienna}12`} />
              {PARTICLES.map((p, i) => (
                <circle
                  key={i}
                  ref={(el) => { particleRefs.current[i] = el; }}
                  cx={-20} cy={140} r={p.r}
                  fill={p.sienna ? C.siennaL : `${C.stoneL}88`}
                  opacity={0}
                />
              ))}
            </svg>
          </div>

          <div className="reveal d1" style={{ display: 'flex', gap: 20, justifyContent: 'flex-end', marginBottom: 'clamp(36px,5vw,52px)' }}>
            {[
              { col: C.siennaL, label: 'Converted guests' },
              { col: `${C.stoneL}88`, label: 'Lost to competitors' },
            ].map(({ col, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: col }} />
                <span style={{ fontSize: 11, color: C.stone, fontFamily: "'Jost',sans-serif" }}>{label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
            {PIPELINE.map((s, i) => (
              <div key={i} className={`reveal d${i + 1}`} style={{
                background: s.highlight ? C.bgSoft : 'transparent',
                border: s.highlight ? `1px solid rgba(42,96,68,0.22)` : `1px solid rgba(0,0,0,0.07)`,
                padding: 'clamp(20px,3vw,28px)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span className="display" style={{ fontSize: 18, fontWeight: 700, color: s.highlight ? C.siennaL : C.sienna }}>{s.num}</span>
                  <span className="label" style={{ color: C.stoneL, fontSize: 9 }}>{s.label}</span>
                </div>
                <div className="display" style={{ fontSize: 'clamp(15px,1.8vw,18px)', fontWeight: 700, color: C.cream, lineHeight: 1.25, marginBottom: 10 }}>{s.title}</div>
                <p style={{ fontSize: 13, color: C.stone, lineHeight: 1.8, fontWeight: 300, marginBottom: 16 }}>{s.body}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {s.tags.map(t => (
                    <span key={t} style={{
                      fontSize: 9, letterSpacing: 1.2, color: C.stone, fontFamily: "'Jost',sans-serif",
                      padding: '4px 10px', border: '1px solid rgba(0,0,0,0.10)',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NAKAMA */}
      <section className="sec-pad" style={{ background: C.bgSoft }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 16 }}>Why us</span>
            <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, lineHeight: 1.1, color: C.cream }}>
              We grow with you.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 2 }}>
            {[
              { num: '01', head: 'Your property, our full focus.', body: 'Every property we take on receives our complete and undivided attention. No brief handed to a junior. No property lost in a large client list. We are invested in your outcomes.' },
              { num: '02', head: 'Deep market knowledge.', body: 'We have a thorough understanding of the Bali and Southeast Asian hospitality market — the guests, the platforms, the seasonality, and the competitive landscape that shapes results.' },
              { num: '03', head: 'Partners, not vendors.', body: "We don't deliver and disappear. Nakama stays — monitoring performance, refining systems, and evolving your brand as the market changes and your property grows." },
            ].map((card, i) => (
              <div key={i} className={`reveal d${i + 1} feat-card`}>
                <span className="label" style={{ color: C.sienna, fontSize: 10 }}>{card.num}</span>
                <h3 className="display" style={{ fontSize: 'clamp(17px,2.2vw,21px)', fontWeight: 700, color: C.cream, lineHeight: 1.25 }}>{card.head}</h3>
                <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.85, fontWeight: 300 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="sec-pad" style={{ background: C.bg }}>
        <div className="about-grid" style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal about-img" style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' }}>
            <img
              src={propertyAbout}
              alt="A Bali property at dusk"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 55%, rgba(8,16,12,0.85))' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px' }}>
              <p className="label" style={{ color: C.siennaL, fontSize: 9, marginBottom: 6 }}>Focused on</p>
              <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: 14, color: '#F2F5F3' }}>Bali and Southeast Asia</p>
            </div>
          </div>
          <div className="reveal d1">
            <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 16 }}>About Nakama</span>
            <h2 className="display" style={{ fontSize: 'clamp(28px,3.8vw,44px)', fontWeight: 700, lineHeight: 1.1, color: C.cream, marginBottom: 24 }}>
              One vision.<br />Endless growth.
            </h2>
            <p style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: C.stone, lineHeight: 1.9, marginBottom: 16, fontWeight: 300 }}>
              Nakama was built on a single belief: that great branding is the most valuable investment a property owner can make. Not a logo. A full brand system that earns at every stage of the guest journey.
            </p>
            <p style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: C.stone, lineHeight: 1.9, marginBottom: 36, fontWeight: 300 }}>
              We focus on the Bali and Southeast Asian market because it is one of the most competitive short-stay markets in the world, and the one where strong branding makes the biggest difference.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                'Every property receives complete, personal attention',
                'Bilingual, English and Bahasa Indonesia',
                'Long-term partnership, not a one-off project',
                'Strategy, design, and technology, fully integrated',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: `1px solid rgba(0,0,0,0.08)`, fontSize: 14, color: C.stone, fontWeight: 300, lineHeight: 1.6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.sienna, flexShrink: 0, marginTop: 8 }}/>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 36 }}>
              <button className="btn-primary">Talk to us directly</button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="sec-pad-sm" style={{ background: C.bgSoft, borderTop: `1px solid rgba(0,0,0,0.07)`, borderBottom: `1px solid rgba(0,0,0,0.07)` }}>
        <div className="stats-grid" style={{ maxWidth: 1100, margin: '0 auto' }}>
          {[
            ['Bespoke',    'Every property designed from the ground up', 'No templates. No shortcuts.'],
            ['Integrated', 'Brand, website, and automation as one system', 'Not three separate vendors'],
            ['Bilingual',  'English and Bahasa Indonesia', 'Across every guest touchpoint'],
            ['Long-term',  'We stay and grow with your property', 'Not a one-off project'],
          ].map(([head, label, sub], i) => (
            <div key={head} className={`reveal d${i + 1}`} style={{ textAlign: 'center', padding: 'clamp(20px,4vw,40px) 16px', borderBottom: `1px solid rgba(0,0,0,0.08)`, borderRight: i < 3 ? `1px solid rgba(0,0,0,0.08)` : 'none' }}>
              <div className="display" style={{ fontSize: 'clamp(17px,2.2vw,22px)', fontWeight: 700, color: C.siennaL, lineHeight: 1.2 }}>{head}</div>
              <div className="label" style={{ color: C.stone, marginTop: 14, fontSize: 10 }}>{label}</div>
              <div style={{ fontSize: 12, color: C.stoneL, marginTop: 6, fontWeight: 300 }}>{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
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
              <p style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: C.stone, lineHeight: 1.9, fontWeight: 300 }}>Four phases. Clear deliverables. Your sign-off before we proceed. You are always informed and always in control.</p>
            </div>
          </div>
          <div className="process-grid">
            {[
              { num: '01', phase: 'Discovery', title: 'We learn your property.',        desc: "A focused conversation maps your property's character, who your guests are, what makes it different, and what you want from it. This is the foundation." },
              { num: '02', phase: 'Design',    title: 'Your brand takes shape.',         desc: 'Identity, messaging, website wireframes, and automation flows — designed, reviewed, and approved before anything is built.' },
              { num: '03', phase: 'Build',     title: 'Everything goes live.',            desc: 'Website, WhatsApp system, and OTA integrations — built, connected, and tested. You approve before any guest sees it.' },
              { num: '04', phase: 'Growth',    title: 'We stay alongside you.',          desc: 'You go live. We remain — monitoring performance, refining systems, and compounding your property value over time.' },
            ].map((step, i) => (
              <div key={i} className={`reveal d${i + 1} proc-cell`} style={{
                padding: 'clamp(28px,4vw,44px) 0',
                paddingLeft:  i > 0 ? 'clamp(14px,3vw,28px)' : 0,
                paddingRight: i < 3 ? 'clamp(14px,3vw,28px)' : 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                  <span className="display" style={{ fontSize: 26, fontWeight: 700, color: C.sienna, lineHeight: 1 }}>{step.num}</span>
                  <span className="label" style={{ color: C.stoneL, fontSize: 9 }}>{step.phase}</span>
                </div>
                <div className="display" style={{ fontSize: 'clamp(16px,2vw,19px)', fontWeight: 600, color: C.cream, lineHeight: 1.3, marginBottom: 12 }}>{step.title}</div>
                <p style={{ fontSize: 13, color: C.stone, lineHeight: 1.85, fontWeight: 300 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONVICTIONS */}
      <section id="stories" className="sec-pad" style={{ background: C.bgMid }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-header">
            <div className="reveal">
              <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 16 }}>What we believe</span>
              <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, lineHeight: 1.1, color: C.cream }}>
                Our founding<br />convictions.
              </h2>
            </div>
          </div>
          {[
            {
              quote: "A property without a clear identity is just another listing. With one — a real name, a story, a visual language — it becomes a destination. Guests seek it out. They return. They recommend it.",
              attr:  'On brand building',
            },
            {
              quote: "Technology should work as hard as you do. When your WhatsApp responds within seconds and your calendar never double-books, your energy goes where it should: into the property itself.",
              attr:  'On automation',
            },
            {
              quote: "We don't consider a project finished when it launches. We consider it started. Your property grows, the market shifts, guests evolve — and we stay alongside to adjust and improve.",
              attr:  'On partnership',
            },
          ].map((t, i) => (
            <div key={i} className={`reveal d${i % 3} testi`}>
              <p className="display" style={{ fontSize: 'clamp(16px,2.2vw,22px)', fontWeight: 400, color: C.cream, opacity: 0.82, lineHeight: 1.75, marginBottom: 24, maxWidth: 820 }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 1, height: 28, background: C.sienna }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 400, color: C.stone, fontFamily: "'Jost',sans-serif", letterSpacing: '0.06em' }}>Nakama · {t.attr}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="sec-pad" style={{ background: C.bg, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 55% 70% at 50% 100%, rgba(42,96,68,0.10) 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span className="reveal d1 label" style={{ color: C.sienna, display: 'block', marginBottom: 24, fontSize: 10 }}>Begin the journey</span>
          <h2 className="reveal d2 display" style={{ fontSize: 'clamp(40px,7vw,84px)', fontWeight: 800, lineHeight: 1.0, color: C.cream, marginBottom: 24, letterSpacing: '-0.03em' }}>
            Let's onboard<br /><span style={{ color: C.siennaL }}>your property.</span>
          </h2>
          <p className="reveal d3" style={{ fontSize: 'clamp(13px,1.6vw,16px)', color: C.stone, lineHeight: 1.9, marginBottom: 44, fontWeight: 300 }}>
            You have the property. We have the brand, the systems, and the market knowledge. Together, we turn it into a destination that earns and grows. That is what Nakama means.
          </p>
          <div className="reveal d4" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary">Start onboarding</button>
            <button className="btn-outline-cream">See how it works</button>
          </div>
          <div className="reveal d4 trust-bar">
            {['Response within 24h', 'No lock-in contracts', 'Bilingual support', 'Bali market specialists'].map((item, i, arr) => (
              <span key={item} className="trust-item" style={{ borderRight: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.bgSoft, borderTop: `1px solid rgba(0,0,0,0.08)`, padding: 'clamp(44px,7vw,64px) clamp(22px,5vw,56px) 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="footer-grid">
            <div className="footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <img
                  src={nakamaLogo}
                  alt="Nakama"
                  style={{ height: 40, width: 'auto', display: 'block' }}
                />
              </div>
              <p style={{ fontSize: 13, color: C.stone, lineHeight: 1.75, fontWeight: 300, maxWidth: 210 }}>Property onboarding and branding. We help investors turn their properties into earning, well-branded destinations and grow alongside them.</p>
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
            <p style={{ fontSize: 13, color: C.stoneL, fontWeight: 300 }}>© {new Date().getFullYear()} Nakama Partners · Crafted with intention.</p>
            <p className="label" style={{ fontSize: 10, color: C.stoneL }}>Privacy · Terms</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
