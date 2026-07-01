import React, { useEffect, useRef, useState } from 'react';
import nakamaLogo    from '@/assets/nakama-logo-official.jpeg';
import propertyHero  from '@/assets/property-hero.png';
import propertyAbout from '@/assets/property-about2.png';
import ctaBg         from '@/assets/cta-bg.png';
import airbnbLogo    from '@/assets/ota-airbnb.png';
import bookingLogo   from '@/assets/ota-booking.png';
import agodaLogo     from '@/assets/ota-agoda.png';
import travelokaLogo from '@/assets/ota-traveloka.png';

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

  /* Service visual scenes */
  @keyframes svcDash      { to { stroke-dashoffset: -24; } }
  @keyframes svcStarPop   { from { opacity:0; transform:scale(0) rotate(-15deg); } to { opacity:1; transform:scale(1) rotate(0deg); } }
  @keyframes svcMsgIn     { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
  @keyframes svcDotBlink  { 0%,100% { opacity:0.25; } 50% { opacity:1; } }
  @keyframes svcShine     { from { left:-80%; } to { left:200%; } }
  @keyframes svcTypeFade  { 0%,100% { opacity:0; } 15%,75% { opacity:1; } }

  /* Section header */
  .sec-header { display:grid; grid-template-columns:1fr 1fr; gap:clamp(24px,5vw,64px); align-items:start; margin-bottom:clamp(48px,7vw,80px); }
  @media (max-width:700px) { .sec-header { grid-template-columns:1fr; } }

  /* About grid */
  .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,6vw,80px); align-items:stretch; }
  @media (max-width:760px) { .about-grid { grid-template-columns:1fr; } }
  .about-img { min-height:400px; }
  @media (max-width:760px) { .about-img { min-height:260px; } }

  /* Stats grid */
  .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); }
  @media (max-width:640px) { .stats-grid { grid-template-columns:repeat(2,1fr); } }

  /* Process grid */
  .process-grid { display:grid; grid-template-columns:repeat(4,1fr); }
  @media (max-width:640px) { .process-grid { grid-template-columns:1fr 1fr; } }
  .proc-cell { background: ${C.bg}; }

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
  .marquee-track { display:flex; width:max-content; animation:marquee 32s linear infinite; }

  /* Numbers grid */
  .nums-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:rgba(255,255,255,0.05); }
  @media (max-width:640px) { .nums-grid { grid-template-columns:repeat(2,1fr); } }

  /* Feat card dark override */
  .feat-card-dark { padding:clamp(28px,4vw,44px); background:${C.siennaD}; border:1px solid rgba(255,255,255,0.06); display:flex; flex-direction:column; gap:14px; }

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

  /* ── Mobile responsive ── */
  @media (max-width: 768px) {
    /* Nav: collapse links and ghost button */
    .nav-links-center  { display: none !important; }
    .nav-desktop-only  { display: none !important; }

    /* Reduce nav height */
    nav { height: 58px !important; }

    /* Hero: tighten bottom padding */
    .hero-lower { grid-template-columns: 1fr !important; gap: 28px !important; }

    /* Services: single column, show visual inline below accordion */
    .svc-grid       { grid-template-columns: 1fr !important; }
    .svc-visual-col { display: block !important; margin-top: 8px !important; }
    .svc-visual-col > div {
      position: relative !important;
      top: auto !important;
      height: 360px !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }

    /* Pain cards: single column */
    .pain-cards { grid-template-columns: 1fr !important; }

    /* Pain rows: stack vertically */
    .pain-row { flex-direction: column !important; gap: 14px !important; }

    /* Pipeline grid: 2-col on mobile */
    .pipeline-grid { grid-template-columns: 1fr 1fr !important; }

    /* Onboarding: single column */
    .onboard-grid { grid-template-columns: 1fr !important; }

    /* Section headers: single column */
    .sec-header { grid-template-columns: 1fr !important; margin-bottom: 36px !important; }

    /* Section padding */
    .sec-pad    { padding: 56px 20px !important; }
    .sec-pad-sm { padding: 40px 20px !important; }

    /* Stats and process */
    .stats-grid   { grid-template-columns: 1fr 1fr !important; }
    .process-grid { grid-template-columns: 1fr 1fr !important; }

    /* ob pills: wrap tighter */
    .ob-pill { padding: 7px 13px !important; font-size: 8px !important; }

    /* Trust bar */
    .trust-item { padding: 5px 12px !important; font-size: 11px !important; }

    /* Footer */
    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
    .footer-brand { grid-column: 1 / -1 !important; }

    /* About grid */
    .about-grid { grid-template-columns: 1fr !important; }
    .about-img  { min-height: 300px !important; }
  }

  @media (max-width: 480px) {
    .stats-grid    { grid-template-columns: 1fr 1fr !important; }
    .process-grid  { grid-template-columns: 1fr 1fr !important; }
    .pipeline-grid { grid-template-columns: 1fr !important; }
    .footer-grid   { grid-template-columns: 1fr !important; }
    .svc-acc-title { font-size: 17px !important; }
  }
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
    title: 'Multiple OTAs. Most owners use just one.',
    desc: 'Most owners set up Airbnb and stop there. We get your property live across all the major booking platforms — Airbnb, Booking.com, Agoda, and Traveloka — fully written, photographed, and optimised for each. Every platform reaches a different kind of guest. You need to be visible on all of them.',
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
  gate: number; sienna: boolean;
}> = [
  { normY:0.30, r:3.2, dur:4200, phase:0.00, gate:940, sienna:true  },
  { normY:0.62, r:2.5, dur:5100, phase:0.18, gate:940, sienna:true  },
  { normY:0.45, r:2.0, dur:4700, phase:0.36, gate:940, sienna:true  },
  { normY:0.20, r:2.8, dur:3900, phase:0.52, gate:225, sienna:false },
  { normY:0.78, r:2.3, dur:5400, phase:0.70, gate:940, sienna:true  },
  { normY:0.55, r:3.0, dur:4400, phase:0.85, gate:940, sienna:true  },
  { normY:0.35, r:2.1, dur:4900, phase:0.12, gate:450, sienna:false },
  { normY:0.65, r:2.7, dur:3800, phase:0.40, gate:940, sienna:true  },
  { normY:0.10, r:1.8, dur:5200, phase:0.62, gate:675, sienna:false },
  { normY:0.88, r:2.2, dur:4600, phase:0.78, gate:225, sienna:false },
  { normY:0.22, r:2.4, dur:3700, phase:0.94, gate:450, sienna:false },
  { normY:0.70, r:1.9, dur:4800, phase:0.28, gate:675, sienna:false },
  { normY:0.50, r:2.6, dur:4100, phase:0.55, gate:450, sienna:false },
  { normY:0.40, r:2.0, dur:5000, phase:0.75, gate:940, sienna:true  },
  { normY:0.60, r:2.9, dur:3600, phase:0.90, gate:940, sienna:true  },
];

// Logo source map — keyed by platform label
const OTA_LOGOS: Record<string, string> = {
  'Airbnb':      airbnbLogo,
  'Booking.com': bookingLogo,
  'Agoda':       agodaLogo,
  'Traveloka':   travelokaLogo,
};

// Badge dimensions per platform (chip sized to logo's natural aspect)
const OTA_BADGE: Record<string, { bw: number; bh: number; rx: number; pad: number }> = {
  'Airbnb':      { bw: 72, bh: 26, rx: 7,  pad: 5  }, // wide chip for bélo+text
  'Booking.com': { bw: 70, bh: 24, rx: 7,  pad: 4  }, // wide chip for text logo
  'Agoda':       { bw: 58, bh: 44, rx: 10, pad: 6  }, // portrait chip for text+dots
  'Traveloka':   { bw: 46, bh: 46, rx: 12, pad: 5  }, // square chip for bird icon
};

/* ── Service Visual: animated illustration panel ── */
function ServiceVisual({ active }: { active: number }) {
  const scene = active < 0 ? 0 : Math.min(active, 2);

  const pane = (idx: number): React.CSSProperties => ({
    position: 'absolute', inset: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    opacity: scene === idx ? 1 : 0,
    transform: scene === idx ? 'translateY(0)' : 'translateY(10px)',
    transition: 'opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1)',
    pointerEvents: scene === idx ? 'auto' : 'none',
  });

  // OTA scene geometry (320×296 viewBox)
  const propX = 160, propY = 150;
  const platforms = [
    { label: 'Airbnb',      x: 160, y: 36  },
    { label: 'Booking.com', x: 283, y: 114 },
    { label: 'Agoda',       x: 264, y: 228 },
    { label: 'Traveloka',   x: 48,  y: 172 },
  ];

  return (
    <div style={{ position:'sticky', top:120, borderRadius:4, overflow:'hidden', backgroundImage:`radial-gradient(circle, rgba(42,96,68,0.16) 1.5px, transparent 1.5px)`, backgroundSize:'20px 20px', backgroundColor:'#EDF3EE', height:420 }}>

      {/* ── Scene 0: OTA platform network ── */}
      <div style={pane(0)}>
        <svg viewBox="0 0 320 296" width="320" height="296">
          <defs>
            <filter id="chipShadow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="3" floodOpacity="0.11"/>
            </filter>
          </defs>
          {/* Flowing dashed connection lines */}
          {platforms.map((p, i) => (
            <line key={i} x1={p.x} y1={p.y} x2={propX} y2={propY}
              stroke={C.siennaL} strokeWidth="1.2" strokeDasharray="5 7" opacity="0.45"
              style={{ animation: `svcDash ${1.3 + i * 0.22}s linear infinite` }}
            />
          ))}

          {/* Booking signal dots travelling to property */}
          {platforms.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4.5" fill={C.sienna}>
              <animateTransform attributeName="transform" type="translate"
                from="0,0" to={`${propX - p.x},${propY - p.y}`}
                dur={`${1.8 + i * 0.38}s`} begin={`${i * 0.46}s`} repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0;0.85;0.85;0"
                dur={`${1.8 + i * 0.38}s`} begin={`${i * 0.46}s`} repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Pulse rings at property center */}
          {[0, 1.5].map((delay, i) => (
            <circle key={i} cx={propX} cy={propY} r="14" fill="none" stroke={C.sienna} strokeWidth="1">
              <animate attributeName="r"       values="14;44" dur="3s" begin={`${delay}s`} repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.45;0" dur="3s" begin={`${delay}s`} repeatCount="indefinite"/>
            </circle>
          ))}

          {/* Property node */}
          <rect x={propX-38} y={propY-30} width="76" height="54" rx="5"
            fill="white" stroke={`rgba(42,96,68,0.22)`} strokeWidth="1.5"/>
          {/* House silhouette */}
          <polygon points={`${propX},${propY-18} ${propX+15},${propY-4} ${propX-15},${propY-4}`} fill={C.sienna} opacity="0.85"/>
          <rect x={propX-8} y={propY-4} width="16" height="14" rx="1.5" fill={C.sienna} opacity="0.85"/>

          {/* OTA platform badge chips */}
          {platforms.map((p, i) => {
            const b = OTA_BADGE[p.label];
            return (
              <g key={i} filter="url(#chipShadow)">
                <rect
                  x={p.x - b.bw / 2} y={p.y - b.bh / 2}
                  width={b.bw} height={b.bh} rx={b.rx}
                  fill="white" stroke="rgba(42,96,68,0.16)" strokeWidth="1"/>
                <image
                  href={OTA_LOGOS[p.label]}
                  x={p.x - b.bw / 2 + b.pad}
                  y={p.y - b.bh / 2 + b.pad}
                  width={b.bw - b.pad * 2}
                  height={b.bh - b.pad * 2}
                  preserveAspectRatio="xMidYMid meet"/>
              </g>
            );
          })}

          {/* Caption */}
          <text x={propX} y={280} textAnchor="middle"
            fontFamily="'Jost',sans-serif" fontSize="9" letterSpacing="2.5"
            fill={C.stone} opacity="0.8">LIVE ON 4 PLATFORMS</text>
        </svg>
      </div>

      {/* ── Scene 1: Brand Transformation ── */}
      <div style={pane(1)}>
        <div style={{ display:'flex', alignItems:'center', gap:16, padding:'0 28px', width:'100%' }}>

          {/* Before */}
          <div style={{ flex:1, background:'#1A2820', border:`1px solid rgba(255,255,255,0.07)`, borderRadius:6, overflow:'hidden', opacity:0.8 }}>
            <div style={{ height:88, background:'#2A3530', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="3" y="8" width="30" height="22" rx="2" fill="#3D4E45"/>
                <circle cx="12" cy="17" r="5" fill="#2E3D35"/>
                <polygon points="6,30 15,20 23,28 28,22 33,30" fill="#354840"/>
              </svg>
            </div>
            <div style={{ padding:'10px 13px 13px' }}>
              <div style={{ fontSize:10, fontFamily:"'Jost',sans-serif", fontWeight:500, color:'rgba(255,255,255,0.28)', marginBottom:5, letterSpacing:0.5 }}>PROPERTY 12</div>
              <div style={{ display:'flex', gap:2, marginBottom:5 }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize:11, color: s<=3 ? '#F59E0B' : '#2E3D35' }}>★</span>)}
              </div>
              <div style={{ fontSize:9, color:'rgba(255,255,255,0.2)', fontFamily:"'Jost',sans-serif" }}>1 platform only</div>
            </div>
          </div>

          {/* Arrow */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, flexShrink:0 }}>
            <svg width="34" height="22" viewBox="0 0 34 22">
              <path d="M1 11 L26 11 M20 4 L28 11 L20 18" stroke={C.siennaL} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize:7.5, fontFamily:"'Jost',sans-serif", color:C.siennaL, letterSpacing:2 }}>BRAND</span>
          </div>

          {/* After */}
          <div style={{ flex:1, background:'#0F2418', border:`1px solid rgba(61,138,98,0.4)`, borderRadius:6, overflow:'hidden', boxShadow:`0 0 40px rgba(42,96,68,0.35)` }}>
            <div style={{ height:88, background:C.sienna, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, width:'55%', height:'100%', background:'rgba(255,255,255,0.07)', transform:'skewX(-18deg)', animation:'svcShine 4s ease 0.8s infinite' }}/>
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                <polygon points="16,3 29,19 3,19" fill="white" opacity="0.75"/>
                <rect x="10" y="19" width="12" height="10" rx="1" fill="white" opacity="0.75"/>
              </svg>
            </div>
            <div style={{ padding:'10px 13px 13px' }}>
              <div style={{ fontSize:10, fontFamily:"'Sora',sans-serif", fontWeight:700, color:C.cream, marginBottom:5, letterSpacing:0.8 }}>LUNA HOUSE</div>
              <div style={{ display:'flex', gap:2, marginBottom:5 }}>
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{ fontSize:11, color:'#F59E0B', animation:`svcStarPop 0.35s cubic-bezier(.22,1,.36,1) ${0.5 + s * 0.1}s both` }}>★</span>
                ))}
              </div>
              <div style={{ fontSize:9, color:C.siennaL, fontFamily:"'Jost',sans-serif" }}>4 platforms · direct booking</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scene 2: WhatsApp Automation ── */}
      <div style={pane(2)}>
        <div style={{ width:270, background:'white', borderRadius:12, overflow:'hidden', boxShadow:`0 8px 36px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.07)` }}>

          {/* Header */}
          <div style={{ background:C.sienna, padding:'10px 14px', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <circle cx="8" cy="6" r="3.5" fill="white"/>
                <path d="M2 14.5C2 11 4.5 9 8 9C11.5 9 14 11 14 14.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize:11, color:'white', fontFamily:"'Jost',sans-serif", fontWeight:500 }}>Guest Inquiry</div>
              <div style={{ fontSize:8.5, color:'rgba(255,255,255,0.6)', fontFamily:"'Jost',sans-serif" }}>02:47 AM</div>
            </div>
          </div>

          {/* Chat body */}
          <div style={{ background:'#ECE5DD', padding:'14px 12px', display:'flex', flexDirection:'column', gap:10, minHeight:196 }}>

            {/* Guest message */}
            <div style={{ display:'flex', justifyContent:'flex-start', animation:'svcMsgIn 0.5s ease 0.3s both', opacity:0 }}>
              <div style={{ background:'white', borderRadius:'3px 12px 12px 12px', padding:'8px 11px', maxWidth:'82%', boxShadow:'0 1px 2px rgba(0,0,0,0.09)' }}>
                <div style={{ fontSize:11, color:'#2C3333', fontFamily:"'Jost',sans-serif", lineHeight:1.55 }}>Hi, can I check in early? Around 12pm?</div>
                <div style={{ fontSize:8.5, color:'#AAA', fontFamily:"'Jost',sans-serif", marginTop:3, textAlign:'right' }}>02:47</div>
              </div>
            </div>

            {/* Typing indicator — appears briefly then fades */}
            <div style={{ display:'flex', justifyContent:'flex-end', animation:'svcTypeFade 2.8s ease 1.1s both' }}>
              <div style={{ background:C.sienna, borderRadius:'12px 3px 12px 12px', padding:'10px 14px' }}>
                <div style={{ display:'flex', gap:4, alignItems:'center', height:14 }}>
                  {[0, 0.18, 0.36].map((d, i) => (
                    <div key={i} style={{ width:5, height:5, borderRadius:'50%', background:'rgba(255,255,255,0.7)', animation:`svcDotBlink 0.9s ease ${d}s infinite` }}/>
                  ))}
                </div>
              </div>
            </div>

            {/* Auto-reply */}
            <div style={{ display:'flex', justifyContent:'flex-end', animation:'svcMsgIn 0.5s ease 2.1s both', opacity:0 }}>
              <div style={{ background:C.sienna, borderRadius:'12px 3px 12px 12px', padding:'8px 11px', maxWidth:'86%', boxShadow:'0 1px 2px rgba(0,0,0,0.09)' }}>
                <div style={{ fontSize:11, color:'white', fontFamily:"'Jost',sans-serif", lineHeight:1.55 }}>Hi! Early check-in at 12pm is confirmed. WiFi: NakamaCanggu. See you soon!</div>
                <div style={{ fontSize:8.5, color:'rgba(255,255,255,0.5)', fontFamily:"'Jost',sans-serif", marginTop:3, textAlign:'right' }}>02:47 · sent in 4s</div>
              </div>
            </div>
          </div>

          {/* Badge */}
          <div style={{ padding:'7px 14px', borderTop:`1px solid rgba(0,0,0,0.06)`, display:'flex', alignItems:'center', gap:7 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:C.siennaL, flexShrink:0 }}/>
            <span style={{ fontSize:9, fontFamily:"'Jost',sans-serif", color:C.stone, letterSpacing:0.8 }}>Automated by Nakama</span>
          </div>
        </div>
      </div>

    </div>
  );
}

function NakamaLogo({ height = 40 }: { height?: number }) {
  return (
    <img
      src={nakamaLogo}
      alt="Nakama Partners"
      style={{ height, width: 'auto', display: 'block', objectFit: 'contain' }}
    />
  );
}

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
      const SPEED = 0.7; // 30% slower than before
      PARTICLES.forEach((p, i) => {
        const el = particleRefs.current[i];
        if (!el) return;
        phases.current[i] = (phases.current[i] + SPEED * dt / (p.dur / 1000)) % 1;
        const t = phases.current[i];
        const x = t * 960 - 20;

        if (p.sienna || x <= p.gate) {
          // Travelling forward along the funnel band
          const xc = Math.max(0, Math.min(x, 900));
          const uy = 40 + xc / 10;
          const ly = 240 - xc / 10;
          const y  = uy + p.normY * (ly - uy);
          const fadeIn = Math.min(1, (x + 20) / 60);
          el.setAttribute('cx', x.toFixed(1));
          el.setAttribute('cy', y.toFixed(1));
          el.setAttribute('opacity', Math.max(0, fadeIn).toFixed(3));
        } else {
          // Lost to competitors: peel off and fall straight down the gate line
          const uy = 40 + p.gate / 10;
          const ly = 240 - p.gate / 10;
          const yAtGate = uy + p.normY * (ly - uy);
          const dropDist = x - p.gate;
          const y = yAtGate + dropDist * 1.4;
          const fadeOut = Math.max(0, 1 - dropDist / 80);
          el.setAttribute('cx', p.gate.toFixed(1));
          el.setAttribute('cy', y.toFixed(1));
          el.setAttribute('opacity', fadeOut.toFixed(3));
        }
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
          <NakamaLogo height={36} />
        </div>
        <div className="nav-links-center">
          {['Services','Process','About','Stories'].map(l => <span key={l} className="nav-link">{l}</span>)}
        </div>
        <div className="nav-desktop-only" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="btn-ghost nav-chat-btn" style={{ padding: '9px 20px', fontSize: 12 }}>Chat with us</button>
          <button className="btn-primary" style={{ padding: '9px 20px', fontSize: 12 }}>Grow with Nakama</button>
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

          <div className="pain-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(12px,2vw,20px)' }}>

            {/* Card 1 — invisible on platforms */}
            <div className="reveal d1" style={{ background: C.bg, padding: 'clamp(28px,4vw,44px)', display: 'flex', flexDirection: 'column', gap: 20, border: '1px solid rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                {/* Icon 01: Ghost listing in magnifying glass — "searching but you don't appear" */}
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  {/* YOUR listing pin — hollow, dashed, ghosted */}
                  <path d="M13 2C9.1 2 6 5.1 6 9c0 5.5 7 13 7 13s7-7.5 7-13c0-3.9-3.1-7-7-7z"
                    stroke={C.stoneL} strokeWidth="1.5" strokeDasharray="2.5 2" fill="none"/>
                  <circle cx="13" cy="9" r="2.2" stroke={C.stoneL} strokeWidth="1.1" strokeDasharray="2 1.5" fill="none"/>
                  {/* Competitor pin — small, solid */}
                  <circle cx="30" cy="6" r="2.5" fill={`${C.sienna}22`} stroke={C.sienna} strokeWidth="1.2"/>
                  <line x1="30" y1="8.5" x2="30" y2="12" stroke={C.sienna} strokeWidth="1.2" strokeLinecap="round"/>
                  {/* Competitor pin 2 */}
                  <circle cx="36" cy="14" r="2" fill={`${C.sienna}22`} stroke={C.sienna} strokeWidth="1.1"/>
                  <line x1="36" y1="16" x2="36" y2="19" stroke={C.sienna} strokeWidth="1.1" strokeLinecap="round"/>
                  {/* Magnifying glass — searching but finding nothing */}
                  <circle cx="22" cy="27" r="10" stroke={C.sienna} strokeWidth="1.5"/>
                  <line x1="29.2" y1="34.2" x2="38" y2="43" stroke={C.sienna} strokeWidth="1.5" strokeLinecap="round"/>
                  {/* X inside lens = not found */}
                  <line x1="18" y1="23" x2="26" y2="31" stroke={C.stoneL} strokeWidth="1.3" strokeLinecap="round"/>
                  <line x1="26" y1="23" x2="18" y2="31" stroke={C.stoneL} strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <span style={{ fontSize: 11, color: C.stoneL, fontFamily: "'Jost',sans-serif", letterSpacing: 2 }}>01</span>
              </div>
              <div>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 700, color: C.cream, lineHeight: 1.35, marginBottom: 12 }}>
                  You're listed on Airbnb. Nobody is finding you.
                </p>
                <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.85, fontWeight: 300 }}>
                  You did the right thing. You set up a listing, took some photos, and hit publish. The problem is that Airbnb is where you started, not where most guests are looking. Traveloka, Agoda, and Booking.com each reach completely different audiences. Right now, you don't exist on any of them.
                </p>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.sienna, flexShrink: 0 }}/>
                <span style={{ fontSize: 12, color: C.sienna, fontFamily: "'Jost',sans-serif", fontWeight: 500 }}>42% of regional bookings happen on Traveloka alone</span>
              </div>
            </div>

            {/* Card 2 — no visibility, no brand */}
            <div className="reveal d2" style={{ background: C.bg, padding: 'clamp(28px,4vw,44px)', display: 'flex', flexDirection: 'column', gap: 20, border: '1px solid rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                {/* Icon 02: OTA listing → broken arrow → empty website (trust-verification gap) */}
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  {/* OTA listing card (left) — guest found you here */}
                  <rect x="1" y="10" width="13" height="18" rx="2" stroke={C.sienna} strokeWidth="1.4"/>
                  <rect x="3" y="12" width="9" height="7" rx="0.8" fill={`${C.sienna}18`}/>
                  <line x1="3" y1="22" x2="9"  y2="22" stroke={C.sienna} strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                  <line x1="3" y1="25" x2="7"  y2="25" stroke={C.sienna} strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
                  {/* Checkmark badge on OTA card */}
                  <circle cx="14" cy="11" r="4" fill={C.sienna}/>
                  <polyline points="11.8,11 13.4,12.8 16.5,9.2" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  {/* Broken connecting arrow */}
                  <line x1="16" y1="19" x2="19" y2="19" stroke={C.stone} strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="21" y1="19" x2="24" y2="19" stroke={C.stoneL} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1.5 1.5"/>
                  <polyline points="22,16.5 24.5,19 22,21.5" stroke={C.stoneL} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  {/* Browser/website frame (right) — empty, not found */}
                  <rect x="26" y="7" width="13" height="24" rx="1.5" stroke={C.stoneL} strokeWidth="1.4" strokeDasharray="2.5 2"/>
                  <line x1="26" y1="12" x2="39" y2="12" stroke={C.stoneL} strokeWidth="0.9" opacity="0.5"/>
                  <rect x="28" y="8.5" width="8" height="2" rx="0.8" fill={`${C.stoneL}30`}/>
                  {/* X = page not found */}
                  <line x1="29" y1="17" x2="36" y2="24" stroke={C.stoneL} strokeWidth="1.3" strokeLinecap="round"/>
                  <line x1="36" y1="17" x2="29" y2="24" stroke={C.stoneL} strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <span style={{ fontSize: 11, color: C.stoneL, fontFamily: "'Jost',sans-serif", letterSpacing: 2 }}>02</span>
              </div>
              <div>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 700, color: C.cream, lineHeight: 1.35, marginBottom: 12 }}>
                  Your property exists. Guests can't find it anywhere.
                </p>
                <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.85, fontWeight: 300 }}>
                  When a guest likes your OTA listing, they open a new tab and search your property name to confirm it's real. There's no website. No Instagram. No Google presence. That single moment of doubt costs you the booking. Trust doesn't come from one listing.
                </p>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.sienna, flexShrink: 0 }}/>
                <span style={{ fontSize: 12, color: C.sienna, fontFamily: "'Jost',sans-serif", fontWeight: 500 }}>Professional photos bring 28% more bookings on average</span>
              </div>
            </div>

            {/* Card 3 — no systems, no staff */}
            <div className="reveal d3" style={{ background: C.bg, padding: 'clamp(28px,4vw,44px)', display: 'flex', flexDirection: 'column', gap: 20, border: '1px solid rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                {/* Icon 03: Phone + midnight message bubbles — manual overwhelm at night */}
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  {/* Phone body */}
                  <rect x="13" y="10" width="14" height="24" rx="2.5" stroke={C.sienna} strokeWidth="1.4"/>
                  <line x1="17" y1="10" x2="23" y2="10" stroke={C.sienna} strokeWidth="2" strokeLinecap="round" opacity="0.25"/>
                  {/* Message bubble 1 — left side (incoming, old) */}
                  <rect x="1" y="8" width="11" height="8" rx="2" fill={`${C.sienna}15`} stroke={C.sienna} strokeWidth="1.2"/>
                  <path d="M4 16 L5 18 L7 16" fill={`${C.sienna}15`} stroke={C.sienna} strokeWidth="1.1" strokeLinejoin="round"/>
                  <line x1="3.5" y1="11" x2="9.5" y2="11" stroke={C.sienna} strokeWidth="0.9" strokeLinecap="round" opacity="0.55"/>
                  <line x1="3.5" y1="13.5" x2="7.5" y2="13.5" stroke={C.sienna} strokeWidth="0.9" strokeLinecap="round" opacity="0.4"/>
                  {/* Message bubble 2 — top right (recent) */}
                  <rect x="28" y="4" width="11" height="8" rx="2" fill={`${C.sienna}15`} stroke={C.sienna} strokeWidth="1.2"/>
                  <path d="M31 12 L32 14 L34 12" fill={`${C.sienna}15`} stroke={C.sienna} strokeWidth="1.1" strokeLinejoin="round"/>
                  <line x1="30" y1="7"  x2="37" y2="7"  stroke={C.sienna} strokeWidth="0.9" strokeLinecap="round" opacity="0.55"/>
                  <line x1="30" y1="9.5" x2="34" y2="9.5" stroke={C.sienna} strokeWidth="0.9" strokeLinecap="round" opacity="0.4"/>
                  {/* Message bubble 3 — right (unanswered, dashed) */}
                  <rect x="28" y="20" width="11" height="8" rx="2" fill={`${C.stoneL}15`} stroke={C.stoneL} strokeWidth="1.2" strokeDasharray="2.5 2"/>
                  <line x1="30" y1="23" x2="37" y2="23" stroke={C.stoneL} strokeWidth="0.9" strokeLinecap="round" opacity="0.4"/>
                  <line x1="30" y1="25.5" x2="34" y2="25.5" stroke={C.stoneL} strokeWidth="0.9" strokeLinecap="round" opacity="0.3"/>
                  {/* Clock (bottom-left) — midnight indicator */}
                  <circle cx="7" cy="33" r="5.5" stroke={C.stoneL} strokeWidth="1.2" fill="none"/>
                  <line x1="7" y1="33" x2="7" y2="28.5" stroke={C.stoneL} strokeWidth="1.3" strokeLinecap="round"/>
                  <line x1="7" y1="33" x2="10" y2="33" stroke={C.stoneL} strokeWidth="1.1" strokeLinecap="round"/>
                </svg>
                <span style={{ fontSize: 11, color: C.stoneL, fontFamily: "'Jost',sans-serif", letterSpacing: 2 }}>03</span>
              </div>
              <div>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 700, color: C.cream, lineHeight: 1.35, marginBottom: 12 }}>
                  You're running a hotel. With no staff and no systems.
                </p>
                <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.85, fontWeight: 300 }}>
                  A guest messages at midnight asking about check-in. Another wants to know the address. A third is asking if they can bring a pet. All of it lands on your phone, manually, every single time. There is no guide, no automation, no one handling it but you.
                </p>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.sienna, flexShrink: 0 }}/>
                <span style={{ fontSize: 12, color: C.sienna, fontFamily: "'Jost',sans-serif", fontWeight: 500 }}>48% of bookings go to whoever replies first</span>
              </div>
            </div>

            {/* Card 4 — earning a fraction */}
            <div className="reveal d4" style={{ background: C.bg, padding: 'clamp(28px,4vw,44px)', display: 'flex', flexDirection: 'column', gap: 20, border: '1px solid rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                {/* Icon 04: Calendar with flat bars + peak arrows — missed revenue */}
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  {/* Calendar frame */}
                  <rect x="1" y="6" width="38" height="32" rx="2" stroke={C.sienna} strokeWidth="1.4"/>
                  <line x1="1" y1="14" x2="39" y2="14" stroke={C.sienna} strokeWidth="0.9"/>
                  {/* Hanger rings */}
                  <line x1="11" y1="4" x2="11" y2="9" stroke={C.sienna} strokeWidth="1.6" strokeLinecap="round"/>
                  <line x1="29" y1="4" x2="29" y2="9" stroke={C.sienna} strokeWidth="1.6" strokeLinecap="round"/>
                  {/* Mon–Fri flat bars (all same height — the flat-rate problem) */}
                  <rect x="3"  y="29" width="5" height="8" rx="0.5" fill={`${C.stoneL}35`} stroke={C.stoneL} strokeWidth="0.8"/>
                  <rect x="9"  y="29" width="5" height="8" rx="0.5" fill={`${C.stoneL}35`} stroke={C.stoneL} strokeWidth="0.8"/>
                  <rect x="15" y="29" width="5" height="8" rx="0.5" fill={`${C.stoneL}35`} stroke={C.stoneL} strokeWidth="0.8"/>
                  {/* Fri — PEAK but still flat */}
                  <rect x="21" y="29" width="5" height="8" rx="0.5" fill={`${C.stoneL}35`} stroke={C.stoneL} strokeWidth="0.8" strokeDasharray="2 1.5"/>
                  {/* Sat — PEAK but still flat */}
                  <rect x="27" y="29" width="5" height="8" rx="0.5" fill={`${C.stoneL}35`} stroke={C.stoneL} strokeWidth="0.8" strokeDasharray="2 1.5"/>
                  {/* Sun — PEAK but still flat */}
                  <rect x="33" y="29" width="5" height="8" rx="0.5" fill={`${C.stoneL}35`} stroke={C.stoneL} strokeWidth="0.8" strokeDasharray="2 1.5"/>
                  {/* Upward arrows on peak days — "should be earning here" */}
                  <line x1="23.5" y1="28" x2="23.5" y2="20" stroke={C.sienna} strokeWidth="1.3" strokeLinecap="round" strokeDasharray="1.5 1.5"/>
                  <polyline points="21,22 23.5,19 26,22" stroke={C.sienna} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <line x1="29.5" y1="28" x2="29.5" y2="17" stroke={C.sienna} strokeWidth="1.3" strokeLinecap="round" strokeDasharray="1.5 1.5"/>
                  <polyline points="27,19 29.5,16 32,19" stroke={C.sienna} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                <span style={{ fontSize: 11, color: C.stoneL, fontFamily: "'Jost',sans-serif", letterSpacing: 2 }}>04</span>
              </div>
              <div>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 700, color: C.cream, lineHeight: 1.35, marginBottom: 12 }}>
                  Your property earns a fraction of what it should.
                </p>
                <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.85, fontWeight: 300 }}>
                  You set a rate when you launched and left it. But Bali's market moves constantly. On peak nights you're undercharging. On slow nights you're sitting empty. There is no dynamic strategy, no seasonal logic, no one watching the calendar. The math is quietly working against you.
                </p>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.sienna, flexShrink: 0 }}/>
                <span style={{ fontSize: 12, color: C.sienna, fontFamily: "'Jost',sans-serif", fontWeight: 500 }}>Dynamic pricing adds up to 30% more revenue without extra bookings</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SERVICES ACCORDION */}
      <section id="services" className="sec-pad" style={{ background: C.bgSoft }}>
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

          {/* 2-col: accordion left · animated visual right */}
          <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 0.85fr', gap: 'clamp(40px,6vw,80px)', alignItems: 'start' }}>

            <div className="reveal d2" style={{ minHeight: 520 }}>
              {SERVICES_ACC.map((svc, i) => (
                <div
                  key={i}
                  className="svc-acc-row"
                  onClick={() => setSvcOpen(i)}
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

                  <div style={{ overflow: 'hidden', maxHeight: svcOpen === i ? 480 : 0, transition: 'max-height 0.5s cubic-bezier(.4,0,.2,1)' }}>
                    <div style={{ padding: '4px 0 32px clamp(24px,3vw,40px)' }}>
                      <p style={{ fontSize: 15, color: C.stone, lineHeight: 2.0, fontWeight: 300, marginBottom: 24 }}>
                        {svc.desc}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: 24, height: 1, background: C.sienna, flexShrink: 0 }}/>
                        <span style={{ fontSize: 13, color: C.sienna, fontWeight: 500, lineHeight: 1.6 }}>{svc.result}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal d3 svc-visual-col">
              <ServiceVisual active={svcOpen} />
            </div>

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
          <div className="onboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 56, alignItems: 'start' }}>

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
            <div style={{ border: `1px solid rgba(0,0,0,0.10)`, background: '#0D1710', overflow: 'hidden', position: 'relative', height: 440 }}>
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

          <div className="pipeline-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
            {PIPELINE.map((s, i) => (
              <div key={i} className={`reveal d${i + 1}`} style={{
                background: s.highlight ? C.bgSoft : 'transparent',
                border: s.highlight ? `1px solid rgba(42,96,68,0.22)` : `1px solid rgba(0,0,0,0.07)`,
                padding: 'clamp(20px,3vw,28px)',
                display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span className="display" style={{ fontSize: 18, fontWeight: 700, color: s.highlight ? C.siennaL : C.sienna }}>{s.num}</span>
                  <span className="label" style={{ color: C.stoneL, fontSize: 9 }}>{s.label}</span>
                </div>
                <div className="display" style={{ fontSize: 'clamp(15px,1.8vw,18px)', fontWeight: 700, color: C.cream, lineHeight: 1.25, marginBottom: 10 }}>{s.title}</div>
                <p style={{ fontSize: 13, color: C.stone, lineHeight: 1.8, fontWeight: 300, marginBottom: 16 }}>{s.body}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 16 }}>
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

      {/* WHY NAKAMA — dark section */}
      <section className="sec-pad" style={{ background: C.cream }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 56 }}>
            <span className="label" style={{ color: C.siennaL, display: 'block', marginBottom: 16 }}>Why us</span>
            <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, lineHeight: 1.0, color: '#F2F5F3', letterSpacing: '-0.02em' }}>
              We grow with you.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 1, background: 'rgba(255,255,255,0.04)' }}>
            {[
              { num: '01', head: 'Your property, our full focus.', body: 'Every property we take on receives our complete and undivided attention. No brief handed to a junior. No property lost in a large client list. We are invested in your outcomes.' },
              { num: '02', head: 'Deep market knowledge.', body: 'We have a thorough understanding of the Bali and Southeast Asian hospitality market — the guests, the platforms, the seasonality, and the competitive landscape that shapes results.' },
              { num: '03', head: 'Partners, not vendors.', body: "We don't deliver and disappear. Nakama stays — monitoring performance, refining systems, and evolving your brand as the market changes and your property grows." },
            ].map((card, i) => (
              <div key={i} className={`reveal d${i + 1} feat-card-dark`}>
                <span className="label" style={{ color: C.siennaL, fontSize: 10 }}>{card.num}</span>
                <h3 className="display" style={{ fontSize: 'clamp(17px,2.2vw,21px)', fontWeight: 700, color: '#F2F5F3', lineHeight: 1.25, minHeight: '2.5em', display: 'flex', alignItems: 'flex-end' }}>{card.head}</h3>
                <p style={{ fontSize: 14, color: 'rgba(242,245,243,0.48)', lineHeight: 1.85, fontWeight: 300 }}>{card.body}</p>
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
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 40%, rgba(8,16,12,0.92))' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px' }}>
              <p className="label" style={{ color: '#8FD9B3', fontSize: 10, marginBottom: 6 }}>Focused on</p>
              <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: 15, color: '#FFFFFF' }}>Bali and Southeast Asia</p>
            </div>
          </div>
          <div className="reveal d1">
            <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 16 }}>About Nakama</span>
            <h2 className="display" style={{ fontSize: 'clamp(28px,3.8vw,44px)', fontWeight: 700, lineHeight: 1.1, color: C.cream, marginBottom: 28 }}>
              One vision.<br />Endless growth.
            </h2>
            <p style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: C.stone, lineHeight: 1.9, marginBottom: 24, fontWeight: 300 }}>
              Nakama was built on a single belief: that great branding is the most valuable investment a property owner can make. Not a logo. A full brand system that earns at every stage of the guest journey.
            </p>
            <p style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: C.stone, lineHeight: 1.9, marginBottom: 32, fontWeight: 300 }}>
              We focus on the Bali and Southeast Asian market because it is one of the most competitive short-stay markets in the world, and the one where strong branding makes the biggest difference.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                'Every property receives complete, personal attention',
                'Bilingual, English and Bahasa Indonesia',
                'Long-term partnership, not a one-off project',
                'Strategy, design, and technology, fully integrated',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: `1px solid rgba(0,0,0,0.08)`, fontSize: 14, color: C.stone, fontWeight: 300, lineHeight: 1.6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.sienna, flexShrink: 0, marginTop: 8 }}/>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <button className="btn-primary">Talk to us directly</button>
            </div>
          </div>
        </div>
      </section>

      {/* NUMBERS — dark contrast block */}
      <section style={{ background: C.cream }}>
        <div className="nums-grid">
          {[
            { num: '4',      unit: 'platforms',   sub: 'Airbnb, Booking.com, Agoda, Traveloka — plus your own direct booking site.' },
            { num: '3',      unit: 'week launch', sub: 'Average time from first call to a live brand, website, and listings.' },
            { num: '100%',   unit: 'bilingual',   sub: 'Every guest touchpoint in English and Bahasa Indonesia.' },
            { num: '\u221e', unit: 'partnership', sub: 'We stay and grow with you. No delivery and disappear.' },
          ].map(({ num, unit, sub }, i) => (
            <div key={unit} className={`reveal d${i + 1}`} style={{
              background: C.siennaD,
              padding: 'clamp(28px,4vw,48px) clamp(20px,3vw,36px)',
              display: 'flex', flexDirection: 'column',
              minHeight: 240,
            }}>
              <div className="display" style={{ fontSize: 'clamp(38px,4.5vw,60px)', fontWeight: 800, color: '#F2F5F3', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 8 }}>{num}</div>
              <div className="label" style={{ color: C.siennaL, fontSize: 9, marginBottom: 'auto' }}>{unit}</div>
              <p style={{ fontSize: 11, color: 'rgba(242,245,243,0.36)', lineHeight: 1.75, fontWeight: 300, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14, marginTop: 20 }}>{sub}</p>
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
          <div className="process-grid" style={{ gap: 1, background: 'rgba(0,0,0,0.08)' }}>
            {[
              { num: '01', phase: 'Discovery', title: 'We learn your property.',        desc: "A focused conversation maps your property's character, who your guests are, what makes it different, and what you want from it. This is the foundation." },
              { num: '02', phase: 'Design',    title: 'Your brand takes shape.',         desc: 'Identity, messaging, website wireframes, and automation flows — designed, reviewed, and approved before anything is built.' },
              { num: '03', phase: 'Build',     title: 'Everything goes live.',            desc: 'Website, WhatsApp system, and OTA integrations — built, connected, and tested. You approve before any guest sees it.' },
              { num: '04', phase: 'Growth',    title: 'We stay alongside you.',          desc: 'You go live. We remain — monitoring performance, refining systems, and compounding your property value over time.' },
            ].map((step, i) => (
              <div key={i} className={`reveal d${i + 1} proc-cell`} style={{
                padding: 'clamp(28px,4vw,44px) clamp(16px,3vw,28px)',
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
          <div className="sec-header" style={{ marginBottom: 'clamp(36px,5vw,56px)' }}>
            <div className="reveal">
              <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 16 }}>What we believe</span>
              <h2 className="display" style={{ fontSize: 'clamp(24px,3.2vw,38px)', fontWeight: 700, lineHeight: 1.1, color: C.cream }}>
                Our founding<br />convictions.
              </h2>
            </div>
          </div>
          <div className="reveal d1" style={{ maxWidth: 760, borderTop: `1px solid rgba(0,0,0,0.08)`, paddingTop: 44 }}>
            <p style={{ fontSize: 'clamp(14px,1.7vw,16px)', color: C.stone, lineHeight: 2.0, fontWeight: 300 }}>
              Nakama was built on a simple conviction: most property investors in Bali are sitting on more potential than they realise — not because of the property itself, but because of everything that surrounds it. A clear identity. A digital presence guests can find and trust. Systems that work whether you are available or not. These are not extras. They are the difference between a listing and a destination.
            </p>
            <p style={{ fontSize: 'clamp(14px,1.7vw,16px)', color: C.stone, lineHeight: 2.0, fontWeight: 300, marginTop: 20 }}>
              We built Nakama to close that gap — to give property owners the same quality of branding and day-to-day infrastructure that the best boutique hotels take for granted, without the large agency overhead or the complexity. And we don't walk away at launch. We consider a property started, not finished, the day it goes live. The market shifts, guests evolve, and new opportunities open up. We stay alongside to adjust, improve, and compound — because the strongest properties and the best-run brands are never done growing.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 36 }}>
              <div style={{ width: 1, height: 28, background: C.sienna }} />
              <span style={{ fontSize: 11, color: C.stone, fontFamily: "'Jost',sans-serif", letterSpacing: '0.06em' }}>Nakama Partners · Our founding philosophy</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec-pad" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <img
          src={ctaBg}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(242,245,243,0.55) 0%, rgba(232,237,233,0.65) 100%)', pointerEvents: 'none' }} />
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
      <footer style={{ background: C.bg, borderTop: `1px solid rgba(0,0,0,0.08)`, padding: 'clamp(44px,7vw,64px) clamp(22px,5vw,56px) 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="footer-grid">
            <div className="footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <NakamaLogo height={36} />
              </div>
              <p style={{ fontSize: 13, color: C.stone, lineHeight: 1.75, fontWeight: 300, maxWidth: 210 }}>Property onboarding and branding. We help investors turn their properties into earning, well-branded destinations and grow alongside them.</p>
            </div>
            {[
              { head: 'Services', links: ['Property Websites', 'WhatsApp Automation', 'OTA Integration', 'Brand Strategy'] },
              { head: 'Company', links: ['About', 'Process', 'Our Work', 'Contact'] },
              { head: 'Connect', links: ['contact@nakama.partners', 'WhatsApp us', 'LinkedIn', '@nakamapartners.id'] },
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
