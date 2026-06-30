import React, { useEffect, useRef, useState } from 'react';
import nakamaLogo from '@/assets/nakama-logo.png';
import propertyHero   from '@/assets/property-hero.png';
import propertyAbout2 from '@/assets/property-about2.png';

/*
  NAKAMA — Bold modern landing page
  Rules: NO emojis · NO pill buttons · NO floating cards · NO "villa" word · NO em dashes
  Philosophy: branding → value creation → revenue growth
  Fonts: Sora (headlines) + Jost (body)
*/

const C = {
  bg:      '#08100C',
  bgMid:   '#0D1710',
  bgSoft:  '#121E15',
  linen:   '#E6EEE9',
  sienna:  '#2A6044',
  siennaL: '#3D8A62',
  siennaD: '#1E4533',
  stone:   '#6B7B73',
  stoneL:  '#9BB0A4',
  rule:    '#4A9B6F',
  cream:   '#F2F5F3',
};

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  /* Entrance animations */
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
  @keyframes pGlow    { 0% { opacity:0; box-shadow:none; } 100% { opacity:1; box-shadow:0 0 28px rgba(61,138,98,0.3); } }
  @keyframes dotPop   { from { transform:scale(0); opacity:0; } to { transform:scale(1); opacity:1; } }
  @keyframes labelIn  { from { opacity:0; transform:translateY(3px); } to { opacity:1; transform:none; } }

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
    background:${C.sienna}; color:${C.cream};
    border:none; cursor:pointer;
    padding:12px 28px;
    font-family:'Jost',sans-serif; font-size:12px; letter-spacing:0.08em;
    transition:background 0.2s ease, transform 0.15s ease;
    display:inline-block;
  }
  .btn-primary:hover { background:${C.siennaL}; transform:translateY(-1px); }
  .btn-ghost {
    background:transparent; color:${C.stoneL};
    border:1px solid rgba(255,255,255,0.14); cursor:pointer;
    padding:12px 28px;
    font-family:'Jost',sans-serif; font-size:12px; letter-spacing:0.08em;
    transition:border-color 0.2s ease, color 0.2s ease;
    display:inline-block;
  }
  .btn-ghost:hover { border-color:rgba(255,255,255,0.30); color:${C.cream}; }
  .btn-outline-cream {
    background:transparent; color:${C.cream};
    border:1px solid rgba(242,245,243,0.30); cursor:pointer;
    padding:12px 28px;
    font-family:'Jost',sans-serif; font-size:12px; letter-spacing:0.08em;
    transition:border-color 0.2s ease;
    display:inline-block;
  }
  .btn-outline-cream:hover { border-color:rgba(242,245,243,0.60); }
  .nav-chat-btn { background:transparent !important; border:1px solid rgba(255,255,255,0.14) !important; }

  /* Section padding */
  .sec-pad    { padding: clamp(64px,10vw,120px) clamp(22px,5vw,64px); }
  .sec-pad-sm { padding: clamp(40px,6vw,72px)  clamp(22px,5vw,64px); }

  /* Service rows (old, kept for reference) */
  .svc-row { display:grid; grid-template-columns:60px 1fr auto; gap:24px; align-items:start; padding:28px 0; border-bottom:1px solid rgba(255,255,255,0.06); }
  .svc-title { font-family:'Sora',sans-serif; font-size:clamp(16px,2vw,20px); font-weight:700; color:${C.cream}; }

  /* Accordion services */
  .svc-acc-row {
    border-bottom:1px solid rgba(255,255,255,0.08);
    cursor:pointer;
  }
  .svc-acc-header {
    display:flex; align-items:center; gap:20px; padding:24px 0;
    user-select:none;
  }
  .svc-acc-header:hover .svc-acc-title { color:${C.cream}; }
  .svc-acc-num { font-family:'Jost',sans-serif; font-size:12px; color:${C.stone}; letter-spacing:2px; min-width:28px; }
  .svc-acc-title { font-family:'Sora',sans-serif; font-size:clamp(16px,2vw,20px); font-weight:700; color:${C.stoneL}; transition:color 0.22s ease; flex:1; }
  .svc-acc-title.active { color:${C.cream}; }
  .svc-acc-sub { font-family:'Jost',sans-serif; font-size:12px; color:${C.stone}; font-weight:300; }
  .svc-acc-body { overflow:hidden; max-height:0; transition:max-height 0.45s cubic-bezier(.4,0,.2,1); }
  .svc-acc-body.open { max-height:1000px; }
  .svc-feat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:2px; margin-top:24px; }
  .svc-feat-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; margin-top:24px; }
  .svc-feat-card {
    background:${C.bgSoft}; border:1px solid rgba(255,255,255,0.05);
    padding:16px 18px;
  }
  .svc-feat-head { font-family:'Sora',sans-serif; font-size:13px; font-weight:700; color:${C.cream}; margin-bottom:6px; line-height:1.35; }
  .svc-feat-body { font-size:12px; color:${C.stone}; line-height:1.7; font-weight:300; }
  .svc-result-bar {
    margin-top:2px; padding:16px 20px;
    background:rgba(42,96,68,0.14); border:1px solid rgba(42,96,68,0.3);
    display:flex; align-items:center; gap:12;
  }
  @media (max-width:860px) { .svc-feat-grid { grid-template-columns:repeat(2,1fr); } .svc-feat-grid-3 { grid-template-columns:repeat(2,1fr); } }

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
  .stat-cell { border-bottom:1px solid rgba(255,255,255,0.06); }

  /* Process grid */
  .process-grid { display:grid; grid-template-columns:repeat(4,1fr); }
  @media (max-width:640px) { .process-grid { grid-template-columns:1fr 1fr; } }
  .proc-cell { border-left:1px solid rgba(242,245,243,0.07); }
  .proc-cell:first-child { border-left:none; }

  /* Footer grid */
  .footer-grid { display:grid; grid-template-columns:1.8fr 1fr 1fr 1fr; gap:clamp(24px,4vw,48px); padding-bottom:48px; margin-bottom:32px; border-bottom:1px solid rgba(255,255,255,0.06); }
  @media (max-width:700px) { .footer-grid { grid-template-columns:1fr 1fr; } .footer-brand { grid-column:1/-1; } }

  /* Hero lower row */
  .hero-lower { display:grid; grid-template-columns:1fr 1fr; gap:clamp(24px,5vw,64px); margin-top:clamp(32px,5vw,52px); }
  .cta-row { display:flex; gap:12px; flex-wrap:wrap; }
  @media (max-width:700px) { .hero-lower { grid-template-columns:1fr; } }

  /* Feat cards */
  .feat-card { padding:clamp(24px,3.5vw,36px); background:${C.bg}; border:1px solid rgba(255,255,255,0.06); display:flex; flex-direction:column; gap:14px; }

  /* Testimonials */
  .testi { padding:clamp(28px,5vw,48px) 0; border-bottom:1px solid rgba(255,255,255,0.06); }
  .testi:last-child { border-bottom:none; }

  /* Marquee */
  @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  .marquee-track { display:flex; width:max-content; animation:marquee 22s linear infinite; }

  /* Atm glow */
  @keyframes atm { 0%,100% { opacity:1; } 50% { opacity:0.75; } }

  /* Pain grid */
  .pain-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:2px; margin-top:0; }
  @media (max-width:900px) { .pain-grid { grid-template-columns:repeat(2,1fr); } }
  @media (max-width:520px) { .pain-grid { grid-template-columns:1fr; } }
  .pain-card {
    background:${C.bgSoft}; border:1px solid rgba(255,255,255,0.05);
    padding:28px 24px; cursor:pointer;
    transition:border-color 0.22s ease, background 0.22s ease;
  }
  .pain-card:hover { border-color:rgba(42,96,68,0.35); }
  .pain-card.open  { background:${C.bgMid}; border-color:rgba(42,96,68,0.35); }
  .pain-expand { overflow:hidden; max-height:0; transition:max-height 0.45s cubic-bezier(.4,0,.2,1); }
  .pain-card.open .pain-expand { max-height:600px; }

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
  .ob-pill:hover { opacity:0.85; }
  .ob-dot  { border:none; cursor:pointer; transition:all 0.3s ease; outline:none; appearance:none; -webkit-appearance:none; }

  /* Trust bar */
  .trust-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.06); margin-top: 56px; padding-top: 44px; justify-content: center; }
  .trust-item { font-family:'Jost',sans-serif; font-size:12px; color:rgba(139,125,114,0.7); font-weight:300; padding:6px 24px; letter-spacing:0.04em; }

  /* Footer links */
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
    body: 'WhatsApp automation, fast response, and frictionless booking flows that turn curiosity into commitment, without a slow back-and-forth.',
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

/* Onboarding stages */
const ONBOARD = [
  {
    label: 'First Call',
    title: "You never have to figure this out alone.",
    desc: "You've built or bought something real. The hard part is done. What comes next is where most owners get stuck — the brand, the platforms, the systems. One conversation with us, and you won't have to.",
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

/* Pain point cards */
const PAIN_CARDS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="1"  y="1"  width="8" height="8" stroke={C.stone}  strokeWidth="1.2"/>
        <rect x="13" y="1"  width="8" height="8" stroke={C.stone}  strokeWidth="1.2"/>
        <rect x="1"  y="13" width="8" height="8" stroke={C.stone}  strokeWidth="1.2"/>
        <rect x="13" y="13" width="8" height="8" stroke={C.sienna} strokeWidth="1.2"/>
      </svg>
    ),
    title: 'Invisible on the platforms that matter',
    body:  'Most new owners list on Airbnb and call it done. Three other platforms bring completely different audiences, and your competitors are already there.',
    stat:  '42%',
    statLabel: 'of Indonesian bookings happen on Traveloka alone',
    bullets: [
      'Booking.com and Agoda each target nationalities Airbnb barely reaches',
      'Traveloka dominates the Indonesian domestic market your neighbours have locked in',
      'Syncing availability across platforms requires the right tech stack from day one',
      'Being absent from even one platform means losing qualified guests every single day',
    ],
    solve: 'full OTA setup and live calendar sync across all four platforms',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="1" y="4" width="20" height="14" rx="1" stroke={C.stone} strokeWidth="1.2"/>
        <circle cx="11" cy="11" r="3.5" stroke={C.stone} strokeWidth="1.2"/>
        <circle cx="17" cy="7"  r="1"   fill={C.stone}/>
      </svg>
    ),
    title: "Your property looks like everyone else's",
    body:  'In a market of 84,000+ Bali listings, guests decide in 2.5 seconds whether to click or scroll past. Most properties look identical and lose.',
    stat:  '57%',
    statLabel: 'of property owners still rely on phone photography',
    bullets: [
      'Professional photos bring 28% more bookings and 26% higher nightly rates on average',
      'No distinct brand means no repeat guests and no word-of-mouth referrals',
      'Generic descriptions rank lower in OTA algorithms that reward differentiation',
      'A strong visual identity is the only real moat in an oversupplied market',
    ],
    solve: 'a full brand identity and a professional property shoot',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M19 3H3a2 2 0 00-2 2v10a2 2 0 002 2h12l4 4V5a2 2 0 00-2-2z" stroke={C.stone} strokeWidth="1.2" strokeLinejoin="round"/>
        <line x1="6" y1="8"  x2="16" y2="8"  stroke={C.stone} strokeWidth="1" strokeLinecap="round"/>
        <line x1="6" y1="12" x2="12" y2="12" stroke={C.stone} strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Slow replies are costing you bookings',
    body:  "Guests ask across WhatsApp, Airbnb, email, and Instagram at the same time. Slow replies don't just frustrate — they hand the booking to someone else.",
    stat:  '48%',
    statLabel: 'of bookings go to whoever replies first, regardless of price',
    bullets: [
      'Guests move to the next listing within 8 minutes of receiving no reply',
      'Properties below 4.5 stars get buried in OTA search rankings permanently',
      'No pre-arrival guide means confused guests and preventable bad reviews',
      'Manual communication breaks down past two or three bookings at once',
    ],
    solve: 'automated guest flow from first inquiry through to checkout',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <polyline points="2,16 8,10 12,13 20,5" stroke={C.stone} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="16,5 20,5 20,9"         stroke={C.stone} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Flat pricing is quietly killing your revenue',
    body:  'Setting one rate and leaving it is the most common and most costly mistake new property owners make. The market moves daily. Your pricing should too.',
    stat:  '40%',
    statLabel: 'average revenue uplift with dynamic pricing vs flat rates',
    bullets: [
      'Bali discount rates jumped from 15% to 19% in a single year. Flat prices lose on both ends.',
      'Undercharging on peak dates is as damaging as sitting empty on slow ones',
      'A 10-20% occupancy shortfall translates to tens of thousands in lost annual revenue',
      'OTA algorithms reward frequently updated and competitive pricing with better placement',
    ],
    solve: 'dynamic pricing that adjusts automatically to real market demand',
  },
];

/* Services accordion data */
const SERVICES_ACC = [
  {
    num: '01',
    title: 'Get found everywhere guests book',
    desc:  'Most owners list on one platform and stop there. We set your property up on all four — Airbnb, Booking.com, Agoda, and Traveloka — written, photographed, and optimized for each one. Every platform reaches a different kind of guest. You need to be on all of them.',
    result: 'Your property is visible and bookable across every platform guests use.',
  },
  {
    num: '02',
    title: 'Look like a property worth booking',
    desc:  "There are over 84,000 listings in Bali alone. Guests make a decision in seconds. We build your brand, your direct booking website, and your visual presence — everything that makes a stranger trust your property before they've ever been there.",
    result: 'Your property has an identity that earns the booking.',
  },
  {
    num: '03',
    title: "Run itself while you're not there",
    desc:  "Most owners don't realise how much time gets spent on the daily back-and-forth. Guest questions at midnight. Calendars getting out of sync. Check-in details that need to go out. We build the systems that handle all of it, automatically, so you don't have to be available 24 hours a day to run a professional property.",
    result: "Your property runs professionally whether you're in Bali or anywhere else in the world.",
  },
];

/* Realistic conversion-funnel particle system
   Funnel boundaries (SVG coords):
     top boundary:    y = 40 + x/10
     bottom boundary: y = 240 − x/10
   Each particle moves left→right, starting at x=−20, exiting at dropAt.
   normY ∈ [0,1] maps to y within the funnel at each x.
*/
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
  const [painOpen,  setPainOpen]  = useState<number | null>(null);
  const [onstage,   setOnstage]   = useState(0);
  const [svcOpen,   setSvcOpen]   = useState(0);

  const particleRefs = useRef<(SVGCircleElement | null)[]>(Array(PARTICLES.length).fill(null));
  const obsRef       = useRef<IntersectionObserver | null>(null);
  const phases       = useRef<number[]>(PARTICLES.map(p => p.phase));

  // Scroll reveal
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

  // Onboarding stage auto-advance
  useEffect(() => {
    const id = setInterval(() => setOnstage(s => (s + 1) % 5), 4500);
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
        background: `${C.bg}E8`, backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src={nakamaLogo}
            alt="Nakama Corporations"
            style={{ height: 60, width: 'auto', filter: 'brightness(0) invert(1)', display: 'block' }}
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
        {/* Background image — property photo */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
        }}>
          <img
            src={propertyHero}
            alt=""
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 40%',
              opacity: 0.18,
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              linear-gradient(to right, ${C.bg} 40%, transparent 100%),
              linear-gradient(to top, ${C.bg} 10%, transparent 60%),
              radial-gradient(ellipse 60% 70% at 80% 50%, rgba(42,96,68,0.12) 0%, transparent 60%)
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
                <strong style={{ color: C.cream, fontWeight: 500 }}>Nakama means companions.</strong> You've invested in a property. Now let's make it earn. We onboard from day one: brand, digital presence, and guest systems built to grow alongside you.
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
        <div className="scroll-hint" style={{ position: 'absolute', bottom: 36, right: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: 0.35 }}>
          <span className="label" style={{ color: C.stoneL, fontSize: 9, writingMode: 'vertical-rl' }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: `linear-gradient(${C.stoneL}, transparent)` }} />
        </div>
      </section>

      {/* PAIN */}
      <section id="pain" className="sec-pad" style={{ background: C.bgMid }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <div className="reveal" style={{ marginBottom: 20 }}>
            <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 14 }}>The problem</span>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3.8vw,44px)', fontWeight: 800, color: C.cream, lineHeight: 1.12, marginBottom: 20, maxWidth: 680 }}>
              Bali has more visitors than ever.<br />So why is your property still empty?
            </h2>
            <p style={{ fontSize: 15, color: C.stone, lineHeight: 1.85, fontWeight: 300, maxWidth: 580 }}>
              6.33 million visitors. Booking values down 21.6%. The demand is there. The problem is how most owners show up to compete for it.
            </p>
          </div>

          <div className="reveal" style={{ marginBottom: 36, marginTop: 4 }}>
            <span style={{ fontSize: 13, color: `${C.stone}99`, fontWeight: 300 }}>
              Select a card to expand.
            </span>
          </div>

          <div className="pain-grid">
            {PAIN_CARDS.map((card, i) => (
              <div key={i} className={`reveal d${i + 1}`}>
              <div
                className={`pain-card${painOpen === i ? ' open' : ''}`}
                onClick={() => setPainOpen(painOpen === i ? null : i)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{ fontSize: 9, letterSpacing: 2.5, color: `${C.stone}80`, fontFamily: "'Jost',sans-serif" }}>
                    PROBLEM {String(i + 1).padStart(2, '0')}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 14 14" style={{ transition: 'transform 0.3s ease', transform: painOpen === i ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>
                    <line x1="7" y1="2" x2="7" y2="12" stroke={C.stone} strokeWidth="1.2" strokeLinecap="round"/>
                    <line x1="2" y1="7" x2="12" y2="7" stroke={C.stone} strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>

                <div style={{ marginBottom: 16 }}>{card.icon}</div>

                <h3 className="display" style={{ fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 700, color: C.cream, lineHeight: 1.25, marginBottom: 12 }}>
                  {card.title}
                </h3>

                <p style={{ fontSize: 13, color: C.stone, lineHeight: 1.8, fontWeight: 300, marginBottom: 20 }}>
                  {card.body}
                </p>

                <div style={{ background: C.bgSoft, border: `1px solid rgba(42,96,68,0.3)`, padding: '14px 18px', marginBottom: 20 }}>
                  <div className="display" style={{ fontSize: 30, fontWeight: 800, color: C.siennaL, marginBottom: 4 }}>{card.stat}</div>
                  <div style={{ fontSize: 11, color: C.stone, fontWeight: 300, lineHeight: 1.5 }}>{card.statLabel}</div>
                </div>

                <div style={{ overflow: 'hidden', maxHeight: painOpen === i ? 700 : 0, transition: 'max-height 0.45s cubic-bezier(.4,0,.2,1)' }}>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20, paddingBottom: 28 }}>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
                      {card.bullets.map((b, bi) => (
                        <li key={bi} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                          <div style={{ width: 4, height: 4, background: C.sienna, flexShrink: 0, marginTop: 7 }}/>
                          <span style={{ fontSize: 13, color: C.stoneL, lineHeight: 1.75, fontWeight: 300 }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ width: 22, height: 1, background: C.sienna, flexShrink: 0 }}/>
                      <span style={{ fontSize: 11, color: C.siennaL, letterSpacing: 1, fontFamily: "'Jost',sans-serif", fontWeight: 400 }}>
                        We solve this with {card.solve}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            ))}
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
                Most owners solve these one at a time, with vendors who don't talk to each other. We handle all three as one system.
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
                    <polyline points="4,6 8,10 12,6" stroke={svcOpen === i ? C.siennaL : C.stone} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <div style={{ overflow: 'hidden', maxHeight: svcOpen === i ? 600 : 0, transition: 'max-height 0.5s cubic-bezier(.4,0,.2,1)' }}>
                  <div style={{ padding: '28px 0 36px', borderTop: '1px solid rgba(255,255,255,0.06)', maxWidth: 680 }}>
                    <p style={{ fontSize: 16, color: C.stone, lineHeight: 2, fontWeight: 300, marginBottom: 28 }}>
                      {svc.desc}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 28, height: 1, background: C.sienna, flexShrink: 0 }}/>
                      <span style={{ fontSize: 13, color: C.siennaL, fontWeight: 400, letterSpacing: 0.3, lineHeight: 1.6 }}>{svc.result}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONBOARDING INTERACTIVE */}
      <section className="sec-pad" style={{ background: C.bgMid, borderTop: `1px solid rgba(255,255,255,0.05)` }}>
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
                  color:       onstage === i ? C.cream   : C.stone,
                  borderColor: onstage === i ? C.sienna  : 'rgba(255,255,255,0.10)',
                  background:  onstage === i ? C.sienna  : 'transparent',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                <div style={{ width: 32, height: 1, background: C.sienna }}/>
                <span style={{ fontSize: 9, letterSpacing: 2.5, color: C.sienna, fontFamily: "'Jost',sans-serif" }}>
                  STEP {onstage + 1} OF 5
                </span>
              </div>
              <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 800, color: C.cream, lineHeight: 1.2, marginBottom: 18 }}>
                {ONBOARD[onstage].title}
              </h3>
              <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.95, fontWeight: 300, marginBottom: 40 }}>
                {ONBOARD[onstage].desc}
              </p>
              {/* Progress dots */}
              <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                {ONBOARD.map((_, i) => (
                  <button
                    key={i}
                    className="ob-dot"
                    onClick={() => setOnstage(i)}
                    style={{
                      width:      i === onstage ? 28 : 7,
                      height:     7,
                      background: i === onstage ? C.sienna : 'rgba(139,125,114,0.30)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: visual card */}
            <div style={{ border: `1px solid rgba(255,255,255,0.07)`, background: C.bgSoft, overflow: 'hidden', position: 'relative' }}>
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

                {/* Stage 0: Discovery */}
                {onstage === 0 && (
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: 2.5, color: `${C.stone}80`, fontFamily: "'Jost',sans-serif", marginBottom: 24 }}>PROPERTY INTAKE</div>
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
                          <span style={{ fontSize: 12, color: C.cream, fontWeight: 400 }}>{val}</span>
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
                    <div style={{ fontSize: 9, letterSpacing: 2.5, color: `${C.stone}80`, fontFamily: "'Jost',sans-serif", marginBottom: 24 }}>BRAND IDENTITY</div>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
                      {[C.sienna, C.siennaL, C.cream, C.stone, C.bgSoft].map((col, i) => (
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
                      <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 32, letterSpacing: 7, color: C.cream, marginBottom: 6 }}>SEKAR</div>
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
                    <div style={{ fontSize: 9, letterSpacing: 2.5, color: `${C.stone}80`, fontFamily: "'Jost',sans-serif", marginBottom: 18 }}>WEBSITE BUILD</div>
                    <div style={{ border: '1px solid rgba(255,255,255,0.10)', overflow: 'hidden' }}>
                      <div style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                        {['rgba(255,255,255,0.14)', 'rgba(255,255,255,0.14)', 'rgba(255,255,255,0.14)'].map((bg, i) => (
                          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: bg }}/>
                        ))}
                        <div style={{ flex: 1, marginLeft: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 2, padding: '3px 10px', fontSize: 8, color: `${C.stone}60`, fontFamily: "'Jost',sans-serif" }}>
                          sekar-bali.com
                        </div>
                      </div>
                      <div style={{ padding: '22px 20px', background: '#080E0B' }}>
                        <div style={{ fontSize: 8, color: `${C.stone}55`, letterSpacing: 2.5, marginBottom: 8, fontFamily: "'Jost',sans-serif", animation: 'obUp 0.3s ease 0.1s both' }}>SEKAR · UBUD</div>
                        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 800, color: C.cream, lineHeight: 1.15, marginBottom: 14, animation: 'obUp 0.3s ease 0.2s both' }}>
                          Where calm<br />meets craft.
                        </div>
                        <div style={{ animation: 'obUp 0.3s ease 0.32s both' }}>
                          <div style={{ display: 'inline-block', background: C.sienna, color: C.cream, padding: '8px 18px', fontSize: 9, letterSpacing: 2, fontFamily: "'Jost',sans-serif" }}>
                            BOOK YOUR STAY
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 20, marginTop: 18, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 14, animation: 'obUp 0.3s ease 0.44s both' }}>
                          {[['4', 'Bedrooms'], ['2', 'Pools'], ['12', 'Reviews']].map(([n, l]) => (
                            <div key={l}>
                              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 700, color: C.siennaL }}>{n}</div>
                              <div style={{ fontSize: 7, color: `${C.stone}60`, letterSpacing: 1.5, fontFamily: "'Jost',sans-serif" }}>{l.toUpperCase()}</div>
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
                    <div style={{ fontSize: 9, letterSpacing: 2.5, color: `${C.stone}80`, fontFamily: "'Jost',sans-serif", marginBottom: 18 }}>WHATSAPP AUTOMATION</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ alignSelf: 'flex-end', maxWidth: '78%', background: `rgba(42,96,68,0.18)`, border: `1px solid rgba(42,96,68,0.28)`, padding: '9px 13px', animation: 'obInR 0.3s ease 0.05s both' }}>
                        <div style={{ fontSize: 11, color: C.cream, lineHeight: 1.5 }}>Hi, is the property available 14 to 18 Dec?</div>
                        <div style={{ fontSize: 7, color: `${C.stone}55`, marginTop: 4, textAlign: 'right', fontFamily: "'Jost',sans-serif" }}>09:14</div>
                      </div>
                      <div style={{ alignSelf: 'flex-start', maxWidth: '82%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', padding: '9px 13px', animation: 'obIn 0.3s ease 0.55s both' }}>
                        <div style={{ fontSize: 8, color: C.sienna, marginBottom: 5, letterSpacing: 1.5, fontFamily: "'Jost',sans-serif" }}>NAKAMA BOT</div>
                        <div style={{ fontSize: 11, color: C.cream, lineHeight: 1.5 }}>Yes, those dates are open. Rate is $280/night. Shall I send the booking link?</div>
                        <div style={{ fontSize: 7, color: `${C.stone}55`, marginTop: 4, fontFamily: "'Jost',sans-serif" }}>09:14</div>
                      </div>
                      <div style={{ alignSelf: 'flex-end', maxWidth: '40%', background: `rgba(42,96,68,0.18)`, border: `1px solid rgba(42,96,68,0.28)`, padding: '9px 13px', animation: 'obInR 0.3s ease 1.05s both' }}>
                        <div style={{ fontSize: 11, color: C.cream }}>Yes please</div>
                        <div style={{ fontSize: 7, color: `${C.stone}55`, marginTop: 4, textAlign: 'right', fontFamily: "'Jost',sans-serif" }}>09:15</div>
                      </div>
                      <div style={{ alignSelf: 'flex-start', maxWidth: '88%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', padding: '9px 13px', animation: 'obIn 0.3s ease 1.45s both' }}>
                        <div style={{ fontSize: 8, color: C.sienna, marginBottom: 5, letterSpacing: 1.5, fontFamily: "'Jost',sans-serif" }}>NAKAMA BOT</div>
                        <div style={{ fontSize: 11, color: C.cream, lineHeight: 1.5, marginBottom: 8 }}>Booking link sent. Your deposit holds the dates.</div>
                        <div style={{ display: 'inline-block', padding: '5px 12px', border: `1px solid ${C.sienna}`, fontSize: 9, color: C.siennaL, letterSpacing: 1.5, fontFamily: "'Jost',sans-serif" }}>SECURE YOUR STAY</div>
                        <div style={{ fontSize: 7, color: `${C.stone}55`, marginTop: 5, fontFamily: "'Jost',sans-serif" }}>09:15</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage 4: Live */}
                {onstage === 4 && (
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: 2.5, color: `${C.stone}80`, fontFamily: "'Jost',sans-serif", marginBottom: 24 }}>DISTRIBUTION AND REVENUE</div>
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
                      <div style={{ fontSize: 14, color: C.cream, fontWeight: 500, marginBottom: 3 }}>14 to 18 December · 4 nights</div>
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
                            color:      booked ? C.siennaL : `${C.stone}50`,
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
                Every investor faces the same gap: a great property with no brand, no digital presence, no booking system. We close that gap end-to-end, brand, website, automation, as one connected journey.
              </p>
            </div>
          </div>

          <div style={{
            background: C.bgSoft,
            border: `1px solid rgba(255,255,255,0.06)`,
            padding: 'clamp(16px,2.5vw,28px) clamp(16px,2.5vw,28px) clamp(12px,2vw,20px)',
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
                  stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
              ))}
              <line x1={0} y1={40}  x2={900} y2={130} stroke={`${C.sienna}55`} strokeWidth={1} />
              <line x1={0} y1={240} x2={900} y2={150} stroke={`${C.sienna}55`} strokeWidth={1} />
              <ellipse cx={765} cy={139} rx={88} ry={26} fill={`${C.sienna}14`} />
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

          <div className="reveal d1" style={{ display: 'flex', gap: 20, justifyContent: 'flex-end', marginBottom: 'clamp(36px,5vw,52px)' }}>
            {[
              { col: C.siennaL, label: 'Converted guests' },
              { col: `${C.stone}88`, label: 'Lost to competitors' },
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
                border: s.highlight ? `1px solid rgba(42,96,68,0.3)` : `1px solid rgba(255,255,255,0.05)`,
                padding: 'clamp(20px,3vw,28px)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span className="display" style={{ fontSize: 18, fontWeight: 700, color: s.highlight ? C.siennaL : C.sienna }}>{s.num}</span>
                  <span className="label" style={{ color: C.stone, fontSize: 9 }}>{s.label}</span>
                </div>
                <div className="display" style={{ fontSize: 'clamp(15px,1.8vw,18px)', fontWeight: 700, color: C.cream, lineHeight: 1.25, marginBottom: 10 }}>{s.title}</div>
                <p style={{ fontSize: 13, color: C.stone, lineHeight: 1.8, fontWeight: 300, marginBottom: 16 }}>{s.body}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {s.tags.map(t => (
                    <span key={t} style={{
                      fontSize: 9, letterSpacing: 1.2, color: C.stone, fontFamily: "'Jost',sans-serif",
                      padding: '4px 10px', border: '1px solid rgba(255,255,255,0.08)',
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
              { num: '02', head: 'Deep market knowledge.', body: 'We have a thorough understanding of the Bali and Southeast Asian hospitality market, the guests, the platforms, the seasonality, and the competitive landscape that shapes results.' },
              { num: '03', head: 'Partners, not vendors.', body: "We don't deliver and disappear. Nakama stays, monitoring performance, refining systems, and evolving your brand as the market changes and your property grows." },
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
          <div className="reveal about-img" style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
            <img
              src={propertyAbout2}
              alt="A Bali property at dusk"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(8,16,12,0.92))' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px' }}>
              <p className="label" style={{ color: C.sienna, fontSize: 9, marginBottom: 6 }}>Focused on</p>
              <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: 14, color: C.cream }}>Bali and Southeast Asia</p>
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
              We focus on the Bali and Southeast Asian market because it is one of the most competitive short-stay markets in the world, and the one where strong branding makes the biggest difference to a property's performance.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                'Every property receives complete, personal attention',
                'Bilingual, English and Bahasa Indonesia',
                'Long-term partnership, not a one-off project',
                'Strategy, design, and technology, fully integrated',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: `1px solid rgba(255,255,255,0.06)`, fontSize: 14, color: C.stone, fontWeight: 300, lineHeight: 1.6 }}>
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
      <section className="sec-pad-sm" style={{ background: C.bgSoft, borderTop: `1px solid rgba(255,255,255,0.05)`, borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
        <div className="stats-grid" style={{ maxWidth: 1100, margin: '0 auto' }}>
          {[
            ['Bespoke',    'Every property designed from the ground up', 'No templates. No shortcuts.'],
            ['Integrated', 'Brand, website, and automation as one system', 'Not three separate vendors'],
            ['Bilingual',  'English and Bahasa Indonesia', 'Across every guest touchpoint'],
            ['Long-term',  'We stay and grow with your property', 'Not a one-off project'],
          ].map(([head, label, sub], i) => (
            <div key={head} className={`reveal d${i + 1} stat-cell`} style={{ textAlign: 'center', padding: 'clamp(20px,4vw,40px) 16px', borderRight: i < 3 ? `1px solid rgba(255,255,255,0.06)` : 'none' }}>
              <div className="display" style={{ fontSize: 'clamp(17px,2.2vw,22px)', fontWeight: 700, color: C.siennaL, lineHeight: 1.2 }}>{head}</div>
              <div className="label" style={{ color: C.stoneL, marginTop: 14, fontSize: 10 }}>{label}</div>
              <div style={{ fontSize: 12, color: `${C.stone}70`, marginTop: 6, fontWeight: 300 }}>{sub}</div>
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
              <p style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: C.stone, lineHeight: 1.9, fontWeight: 300 }}>Four phases. Clear deliverables. Your sign-off before we proceed. You are always informed and always in control, without being overwhelmed by detail.</p>
            </div>
          </div>
          <div className="process-grid">
            {[
              { num: '01', phase: 'Discovery', title: 'Property and Market Analysis', desc: "We map your property's character, competitive landscape, and revenue benchmarks. The foundation everything else is built on." },
              { num: '02', phase: 'Design',    title: 'Brand and Blueprint',          desc: 'Identity, messaging, wireframes, and automation flows, designed together, reviewed and approved before a single line of code is written.' },
              { num: '03', phase: 'Build',     title: 'Construction',                 desc: 'Website, WhatsApp system, and OTA integrations, built, connected, and tested thoroughly before any guest sees them.' },
              { num: '04', phase: 'Launch',    title: 'Growth',                       desc: 'You go live. We remain, monitoring performance, refining systems, and compounding your property value over time.' },
            ].map((step, i) => (
              <div key={i} className={`reveal d${i + 1} proc-cell`} style={{
                padding: 'clamp(28px,4vw,44px) 0',
                paddingLeft:  i > 0 ? 'clamp(14px,3vw,28px)' : 0,
                paddingRight: i < 3 ? 'clamp(14px,3vw,28px)' : 0,
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

      {/* TESTIMONIALS / CONVICTIONS */}
      <section id="stories" className="sec-pad" style={{ background: C.bgSoft }}>
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
              quote: "A property without a clear identity is just another listing. With one, a real name, a story, a visual language, it becomes a destination. Guests seek it out. They return. They recommend it.",
              attr:  'On brand building',
            },
            {
              quote: "Technology should work as hard as you do. When your WhatsApp responds within seconds and your calendar never double-books, your energy goes where it should: into hosting.",
              attr:  'On automation',
            },
            {
              quote: "We don't consider a project finished when it launches. We consider it started. Your property grows, the market shifts, guests evolve, and we stay alongside to adjust and improve.",
              attr:  'On partnership',
            },
          ].map((t, i) => (
            <div key={i} className={`reveal d${i % 3} testi`}>
              <p className="display" style={{ fontSize: 'clamp(16px,2.2vw,22px)', fontWeight: 400, color: `${C.cream}85`, lineHeight: 1.75, marginBottom: 24, maxWidth: 820 }}>"{t.quote}"</p>
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
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 55% 70% at 50% 100%, rgba(42,96,68,0.2) 0%, transparent 65%)`, pointerEvents: 'none' }} />
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
              <span key={item} className="trust-item" style={{ borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.bgSoft, borderTop: `1px solid rgba(255,255,255,0.06)`, padding: 'clamp(44px,7vw,64px) clamp(22px,5vw,56px) 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="footer-grid">
            <div className="footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <img
                  src={nakamaLogo}
                  alt="Nakama"
                  style={{ height: 36, width: 'auto', filter: 'brightness(0) invert(1)', display: 'block' }}
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
            <p style={{ fontSize: 13, color: `${C.stone}70`, fontWeight: 300 }}>© {new Date().getFullYear()} Nakama Corporations · Crafted with intention.</p>
            <p className="label" style={{ fontSize: 10, color: `${C.stone}50` }}>Privacy · Terms</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
