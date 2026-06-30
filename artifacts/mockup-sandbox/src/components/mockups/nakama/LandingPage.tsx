import React, { useEffect, useRef, useState } from 'react';
import nakamaLogo from '@/assets/nakama-logo.png';

/*
  NAKAMA — Bold modern landing page
  Rules: NO emojis · NO pill buttons · NO floating cards · NO "two people" / "Bali-based"
  Philosophy: branding → value creation → revenue growth
  Animated funnel: Brand → Platform → Automate → Convert → Revenue
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
  @keyframes pGlow    { 0% { opacity:0; box-shadow:none; } 100% { opacity:1; box-shadow:0 0 28px rgba(61,138,98,0.3); } }
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
    border: 1px solid rgba(242,245,243,0.35); cursor: pointer;
    transition: border-color 0.25s ease, background 0.25s ease;
  }
  .btn-outline-cream:hover { border-color: ${C.cream}; background: rgba(242,245,243,0.06); }

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
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: stretch; }
  @media (max-width: 860px) { .about-grid { grid-template-columns: 1fr; gap: 44px; } .about-img { min-height: 320px !important; height: 320px !important; } }

  /* ── Stats grid ──────────────────────────────────────────── */
  .stats-grid { display: grid; grid-template-columns: repeat(4,1fr); }
  @media (max-width: 700px) {
    .stats-grid { grid-template-columns: repeat(2,1fr); }
    .stat-cell:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.06) !important; }
    .stat-cell:nth-child(even) { border-right: none !important; }
    .stat-cell { border-bottom: 1px solid rgba(255,255,255,0.06) !important; }
  }

  /* ── Process grid ────────────────────────────────────────── */
  .process-grid { display: grid; grid-template-columns: repeat(4,1fr); border-top: 1px solid rgba(242,245,243,0.08); }
  @media (max-width: 860px) {
    .process-grid { grid-template-columns: repeat(2,1fr); }
    .proc-cell:nth-child(odd) { padding-left: 0 !important; }
    .proc-cell:nth-child(even) { border-right: none !important; }
    .proc-cell:nth-child(3), .proc-cell:nth-child(4) { border-top: 1px solid rgba(242,245,243,0.08); }
  }
  @media (max-width: 480px) {
    .process-grid { grid-template-columns: 1fr; }
    .proc-cell { border-right: none !important; padding-left: 0 !important; padding-right: 0 !important; border-top: 1px solid rgba(242,245,243,0.08) !important; }
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
  .feat-card:hover { border-color: ${C.sienna}55; background: rgba(42,96,68,0.06); }

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

  /* ── Pain grid ───────────────────────────────────────────── */
  .pain-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
  @media (max-width: 700px) { .pain-grid { grid-template-columns: 1fr; } }
  .pain-card {
    border: 1px solid rgba(255,255,255,0.08); padding: 28px 28px 0;
    cursor: pointer; transition: border-color 0.25s ease, background 0.25s ease;
    background: rgba(255,255,255,0.02);
  }
  .pain-card:hover { border-color: rgba(42,96,68,0.5); }
  .pain-card.open  { border-color: ${C.sienna}; background: rgba(42,96,68,0.05); }
  .pain-expand {
    max-height: 0; overflow: hidden;
    transition: max-height 0.55s cubic-bezier(.22,1,.36,1);
  }
  .pain-card.open .pain-expand { max-height: 360px; }

  /* ── Onboarding interactive ───────────────────────────────── */
  @keyframes obUp  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  @keyframes obIn  { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:translateX(0); } }
  @keyframes obInR { from { opacity:0; transform:translateX(10px);  } to { opacity:1; transform:translateX(0); } }
  .ob-pill { padding:7px 18px; font-family:'Jost',sans-serif; font-size:9px; letter-spacing:2px; border:1px solid; cursor:pointer; transition:all 0.22s ease; background:transparent; }
  .ob-pill:hover { opacity:0.85; }
  .ob-dot  { border:none; cursor:pointer; transition:all 0.3s ease; }

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

/* ── Onboarding stages data ──────────────────────────────────  */
const ONBOARD = [
  {
    label: 'Discovery',
    title: 'We start by listening.',
    desc: 'A focused intake session maps your property — type, location, target guest, revenue goals. No forms. Just a sharp conversation that gives us everything we need.',
  },
  {
    label: 'Brand Build',
    title: 'Your identity is crafted.',
    desc: 'Property name, colour palette, typography, and tone of voice — built from scratch around your property\'s personality and market position. No templates.',
  },
  {
    label: 'Website',
    title: 'Your digital home goes live.',
    desc: 'A custom property website — fast, mobile-first, with direct booking integration. Guests arrive on a page that feels like the property itself.',
  },
  {
    label: 'Automation',
    title: 'WhatsApp handles inquiries 24/7.',
    desc: 'An intelligent bot answers availability questions, sends rate cards, and routes serious guests to you — so no lead goes cold overnight.',
  },
  {
    label: 'Revenue',
    title: 'OTAs sync. Bookings begin.',
    desc: 'Your property is distributed across the right platforms, calendar synced, and pricing strategy set. Revenue starts moving from day one.',
  },
];

/* ── Pain point cards data ───────────────────────────────────  */
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
    body:  'Most new owners list on Airbnb and call it done. Three other platforms bring completely different audiences — and your competitors are already there.',
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
    body:  'In a market of 84,000+ Bali listings, guests decide in 2.5 seconds whether to click or scroll past. Most properties look identical — and lose.',
    stat:  '57%',
    statLabel: "of villa owners still don't use professional photography",
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
    body:  'Setting one rate and leaving it is the most common — and most costly — mistake new property owners make. The market moves daily. Your pricing should too.',
    stat:  '40%',
    statLabel: 'average revenue uplift with dynamic pricing vs flat rates',
    bullets: [
      'Bali discount rates jumped from 15% to 19% in a single year — flat prices lose on both ends',
      'Undercharging on peak dates is as damaging as sitting empty on slow ones',
      'A 10-20% occupancy shortfall translates to tens of thousands in lost annual revenue',
      'OTA algorithms reward frequently updated and competitive pricing with better placement',
    ],
    solve: 'dynamic pricing that adjusts automatically to real market demand',
  },
];

/* ── Realistic conversion-funnel particle system ─────────────
   Funnel boundaries (SVG coords):
     upper: y = 40 + 0.1·x    (x=0 → y=40,  x=900 → y=130)
     lower: y = 240 − 0.1·x   (x=0 → y=240, x=900 → y=150)
   normY: 0 = top boundary, 1 = bottom, 0.5 = centre

   dropAt: x where particle fades out and exits funnel.
     940 = survives all the way to Revenue (converted client)

   Real property marketing conversion rates:
     ~100 see your brand
     ~30 become genuinely aware (click/visit)
     ~10 browse seriously (listing, pricing)
     ~3-5 actually book / become a client

   Visually: left side dense, thins dramatically, tiny Revenue cluster. */
interface Particle { normY:number; dropAt:number; dur:number; phase:number; r:number; sienna:boolean }
const PARTICLES: Particle[] = [
  // ── Revenue converters — only 5 reach the end (sienna, larger, centre track) ──
  { normY:0.44, dropAt:940, dur:10500, phase:0.00, r:4.0, sienna:true  },
  { normY:0.50, dropAt:940, dur:12000, phase:0.22, r:4.5, sienna:true  },
  { normY:0.56, dropAt:940, dur: 9500, phase:0.44, r:3.5, sienna:true  },
  { normY:0.40, dropAt:940, dur:11500, phase:0.66, r:4.0, sienna:true  },
  { normY:0.60, dropAt:940, dur:10000, phase:0.88, r:3.5, sienna:true  },

  // ── Pitch browsers — browse/inquire but don't commit (7 particles, mid-track) ──
  { normY:0.22, dropAt:510, dur: 9000, phase:0.08, r:2.5, sienna:false },
  { normY:0.78, dropAt:530, dur:10500, phase:0.31, r:2.5, sienna:false },
  { normY:0.28, dropAt:590, dur: 8500, phase:0.54, r:2.5, sienna:false },
  { normY:0.72, dropAt:570, dur:11500, phase:0.77, r:2.5, sienna:false },
  { normY:0.33, dropAt:625, dur: 9500, phase:0.18, r:2.5, sienna:false },
  { normY:0.67, dropAt:550, dur:10000, phase:0.42, r:2.5, sienna:false },
  { normY:0.36, dropAt:490, dur:11000, phase:0.68, r:2.5, sienna:false },

  // ── Awareness only — see brand, don't engage (16 particles, edge tracks) ──
  { normY:0.05, dropAt:210, dur: 9500, phase:0.03, r:2.0, sienna:false },
  { normY:0.95, dropAt:230, dur:11000, phase:0.28, r:2.0, sienna:false },
  { normY:0.08, dropAt:185, dur: 8500, phase:0.52, r:2.0, sienna:false },
  { normY:0.92, dropAt:250, dur:12000, phase:0.76, r:2.0, sienna:false },
  { normY:0.12, dropAt:310, dur:10000, phase:0.12, r:2.0, sienna:false },
  { normY:0.88, dropAt:290, dur:11500, phase:0.37, r:2.0, sienna:false },
  { normY:0.17, dropAt:360, dur: 8000, phase:0.62, r:2.0, sienna:false },
  { normY:0.83, dropAt:330, dur: 9500, phase:0.87, r:2.0, sienna:false },
  { normY:0.21, dropAt:390, dur:10500, phase:0.22, r:2.0, sienna:false },
  { normY:0.79, dropAt:370, dur:12500, phase:0.47, r:2.0, sienna:false },
  { normY:0.26, dropAt:420, dur: 8500, phase:0.70, r:2.0, sienna:false },
  { normY:0.74, dropAt:400, dur:10000, phase:0.95, r:2.0, sienna:false },
  { normY:0.31, dropAt:440, dur:11000, phase:0.35, r:2.0, sienna:false },
  { normY:0.69, dropAt:410, dur: 9000, phase:0.58, r:2.0, sienna:false },
  { normY:0.15, dropAt:270, dur:11500, phase:0.82, r:2.0, sienna:false },
  { normY:0.85, dropAt:340, dur:10000, phase:0.06, r:2.0, sienna:false },
];

export function LandingPage() {
  const [onstage,  setOnstage]  = useState(0);
  const [painOpen, setPainOpen] = useState<number | null>(null);
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

  // Onboarding stage auto-advance
  useEffect(() => {
    const id = setInterval(() => setOnstage(s => (s + 1) % 5), 4500);
    return () => clearInterval(id);
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
        // Clamp x for boundary geometry (SVG viewBox is 0-900)
        const xc = Math.max(0, Math.min(x, 900));
        // Drop-off particles drift slightly toward the nearest edge as they approach exit
        let normY = p.normY;
        if (p.dropAt < 940) {
          const driftStart = p.dropAt - 120;
          if (xc > driftStart) {
            const drift = Math.min(1, (xc - driftStart) / 120);
            const edgeDir = p.normY < 0.5 ? -1 : 1; // toward nearer boundary
            normY = p.normY + edgeDir * drift * 0.20;
          }
        }
        const uy = 40 + xc / 10;
        const ly = 240 - xc / 10;
        const y  = uy + normY * (ly - uy);
        // opacity: fade in over first 60px, fade out 90px before dropAt
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

      {/* ── NAV ───────────────────────────────────────────────── */}
      <nav className="h-nav" style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px,5vw,56px)', height: 68,
        background: `${C.bg}E8`, backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src={nakamaLogo}
            alt="Nakama Corporations"
            style={{ height:40, width:'auto', filter:'brightness(0) invert(1)', display:'block' }}
          />
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
            radial-gradient(ellipse 60% 70% at 80% 50%, rgba(42,96,68,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 10% 80%, rgba(20,70,40,0.22) 0%, transparent 55%)
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
              { color: C.siennaL,      label: 'Booked — converted to revenue' },
              { color: `${C.stone}88`, label: 'Dropped off at awareness or browsing stage' },
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
                  background: stage.highlight ? `rgba(42,96,68,0.07)` : 'rgba(255,255,255,0.025)',
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

      {/* ── PAIN ──────────────────────────────────────────────── */}
      <section id="pain" className="sec-pad" style={{ background: C.bgMid }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <div className="reveal" style={{ marginBottom: 20 }}>
            <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 14 }}>The problem</span>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3.8vw,44px)', fontWeight: 800, color: C.cream, lineHeight: 1.12, marginBottom: 20, maxWidth: 680 }}>
              Bali has more visitors than ever.<br/>So why is your property still empty?
            </h2>
            <p style={{ fontSize: 15, color: C.stone, lineHeight: 1.85, fontWeight: 300, maxWidth: 660 }}>
              Bali welcomed 6.33 million international visitors in 2024 — yet booking values fell 21.6% as supply grew 18% year-on-year. The demand is there. The problem is how most property owners show up to compete for it.
            </p>
          </div>

          {/* Instruction hint */}
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '36px 0', padding: '12px 18px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', width: 'fit-content' }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="6.5" stroke={C.stone} strokeWidth="1"/>
              <line x1="7.5" y1="5" x2="7.5" y2="8.5" stroke={C.stone} strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="7.5" cy="10.5" r="0.8" fill={C.stone}/>
            </svg>
            <span style={{ fontSize: 13, color: C.stone, fontWeight: 300 }}>
              <strong style={{ color: C.stoneL, fontWeight: 500 }}>Click any card</strong> to see what's really going wrong — and how we fix it.
            </span>
          </div>

          {/* Cards */}
          <div className="pain-grid">
            {PAIN_CARDS.map((card, i) => (
              <div
                key={i}
                className={`pain-card reveal d${i + 1}${painOpen === i ? ' open' : ''}`}
                onClick={() => setPainOpen(painOpen === i ? null : i)}
              >
                {/* Card top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{ fontSize: 9, letterSpacing: 2.5, color: `${C.stone}80`, fontFamily: "'Jost',sans-serif" }}>
                    PROBLEM {String(i + 1).padStart(2, '0')}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 14 14" style={{ transition: 'transform 0.3s ease', transform: painOpen === i ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>
                    <line x1="7" y1="2" x2="7" y2="12" stroke={C.stone} strokeWidth="1.2" strokeLinecap="round"/>
                    <line x1="2" y1="7" x2="12" y2="7" stroke={C.stone} strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>

                {/* Icon */}
                <div style={{ marginBottom: 16 }}>{card.icon}</div>

                {/* Title */}
                <h3 className="display" style={{ fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 700, color: C.cream, lineHeight: 1.25, marginBottom: 12 }}>
                  {card.title}
                </h3>

                {/* Body */}
                <p style={{ fontSize: 13, color: C.stone, lineHeight: 1.8, fontWeight: 300, marginBottom: 20 }}>
                  {card.body}
                </p>

                {/* Stat callout */}
                <div style={{ background: C.bgSoft, border: `1px solid rgba(42,96,68,0.3)`, padding: '14px 18px', marginBottom: 20 }}>
                  <div className="display" style={{ fontSize: 30, fontWeight: 800, color: C.siennaL, marginBottom: 4 }}>{card.stat}</div>
                  <div style={{ fontSize: 11, color: C.stone, fontWeight: 300, lineHeight: 1.5 }}>{card.statLabel}</div>
                </div>

                {/* Expandable detail */}
                <div className="pain-expand">
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
            ))}
          </div>

        </div>
      </section>

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

      {/* ── ONBOARDING INTERACTIVE ────────────────────────────── */}
      <section className="sec-pad" style={{ background:C.bgMid, borderTop:`1px solid rgba(255,255,255,0.05)` }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>

          {/* Header row */}
          <div className="reveal" style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:48 }}>
            <span className="label" style={{ color:C.sienna }}>The process</span>
            <h2 className="display" style={{ fontSize:'clamp(26px,3.2vw,38px)', fontWeight:800, color:C.cream, lineHeight:1.15, margin:0 }}>
              From bare property<br/>to active revenue.
            </h2>
          </div>

          {/* Stage pills */}
          <div style={{ display:'flex', gap:4, marginBottom:44, flexWrap:'wrap' }}>
            {ONBOARD.map((s, i) => (
              <button key={i} className="ob-pill"
                onClick={() => setOnstage(i)}
                style={{
                  color:     onstage === i ? C.cream  : C.stone,
                  borderColor: onstage === i ? C.sienna : 'rgba(255,255,255,0.10)',
                  background:  onstage === i ? C.sienna : 'transparent',
                }}
              >
                {String(i + 1).padStart(2, '0')}&nbsp;&nbsp;{s.label.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Main grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.15fr', gap:56, alignItems:'start' }}>

            {/* Left: text */}
            <div key={`txt-${onstage}`} style={{ animation:'obUp 0.4s ease both' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:22 }}>
                <div style={{ width:32, height:1, background:C.sienna }}/>
                <span style={{ fontSize:9, letterSpacing:2.5, color:C.sienna, fontFamily:"'Jost',sans-serif" }}>
                  STEP {onstage + 1} OF 5
                </span>
              </div>
              <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(22px,2.5vw,30px)', fontWeight:800, color:C.cream, lineHeight:1.2, marginBottom:18 }}>
                {ONBOARD[onstage].title}
              </h3>
              <p style={{ fontSize:14, color:C.stone, lineHeight:1.95, fontWeight:300, marginBottom:40 }}>
                {ONBOARD[onstage].desc}
              </p>
              {/* Progress dots */}
              <div style={{ display:'flex', gap:7, alignItems:'center' }}>
                {ONBOARD.map((_, i) => (
                  <button key={i} className="ob-dot"
                    onClick={() => setOnstage(i)}
                    style={{
                      width:  i === onstage ? 28 : 7,
                      height: 7,
                      background: i === onstage ? C.sienna : 'rgba(139,125,114,0.30)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: visual card */}
            <div style={{ border:`1px solid rgba(255,255,255,0.07)`, background:C.bgSoft, overflow:'hidden', position:'relative' }}>
              {/* Progress bar */}
              <div style={{ height:2, background:'rgba(255,255,255,0.05)', position:'relative', flexShrink:0 }}>
                <div style={{
                  position:'absolute', left:0, top:0, height:'100%',
                  width:`${((onstage + 1) / 5) * 100}%`,
                  background: C.sienna,
                  transition:'width 0.65s cubic-bezier(.4,0,.2,1)',
                }}/>
              </div>

              {/* Visual panels — keyed to restart animations on stage change */}
              <div key={`vis-${onstage}`} style={{ padding:'32px 36px' }}>

                {/* ── Stage 0: Discovery ─────────────── */}
                {onstage === 0 && (
                  <div>
                    <div style={{ fontSize:9, letterSpacing:2.5, color:`${C.stone}80`, fontFamily:"'Jost',sans-serif", marginBottom:24 }}>PROPERTY INTAKE</div>
                    {[
                      ['Property name',  'Villa Sekar'],
                      ['Category',       'Villa — 4 bedrooms'],
                      ['Location',       'Ubud, Bali'],
                      ['Target guest',   'International leisure'],
                      ['Revenue goal',   'Direct bookings + OTA'],
                    ].map(([label, val], i) => (
                      <div key={i} style={{
                        display:'flex', justifyContent:'space-between', alignItems:'center',
                        padding:'13px 0',
                        borderBottom:'1px solid rgba(255,255,255,0.05)',
                        animation:`obUp 0.32s ease ${i * 0.11}s both`,
                      }}>
                        <span style={{ fontSize:10, color:C.stone, fontFamily:"'Jost',sans-serif" }}>{label}</span>
                        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                          <span style={{ fontSize:12, color:C.cream, fontWeight:400 }}>{val}</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" style={{ animation:`obUp 0.25s ease ${i * 0.11 + 0.18}s both`, opacity:0 }}>
                            <circle cx="8" cy="8" r="7" stroke={C.sienna} strokeWidth="0.9" fill="none"/>
                            <polyline points="5,8 7.2,10.2 11.5,5.8" stroke={C.siennaL} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Stage 1: Brand ─────────────────── */}
                {onstage === 1 && (
                  <div>
                    <div style={{ fontSize:9, letterSpacing:2.5, color:`${C.stone}80`, fontFamily:"'Jost',sans-serif", marginBottom:24 }}>BRAND IDENTITY</div>
                    {/* Palette */}
                    <div style={{ display:'flex', gap:6, marginBottom:32 }}>
                      {[C.sienna, C.siennaL, C.cream, C.stone, C.bgSoft].map((col, i) => (
                        <div key={i} style={{
                          flex:1, height:40, background:col,
                          border:'1px solid rgba(255,255,255,0.07)',
                          animation:`obUp 0.3s ease ${i * 0.08}s both`,
                        }}>
                          <div style={{ fontSize:7, color:'rgba(255,255,255,0.35)', padding:'4px 6px', fontFamily:"'Jost',sans-serif", letterSpacing:0.5 }}>{col}</div>
                        </div>
                      ))}
                    </div>
                    {/* Wordmark */}
                    <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:24, marginBottom:22, animation:'obUp 0.4s ease 0.42s both' }}>
                      <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:32, letterSpacing:7, color:C.cream, marginBottom:6 }}>SEKAR</div>
                      <div style={{ fontSize:9, letterSpacing:5, color:C.stone, fontFamily:"'Jost',sans-serif" }}>UBUD&nbsp;&nbsp;·&nbsp;&nbsp;BALI</div>
                    </div>
                    {/* Type tags */}
                    <div style={{ display:'flex', gap:8, animation:'obUp 0.4s ease 0.62s both' }}>
                      {[['SORA 800', true], ['JOST 300', false]].map(([t, active]) => (
                        <div key={String(t)} style={{
                          padding:'6px 14px',
                          border:`1px solid ${active ? C.sienna : 'rgba(255,255,255,0.10)'}`,
                          fontSize:9, letterSpacing:1.5,
                          color: active ? C.siennaL : C.stone,
                          fontFamily:"'Jost',sans-serif",
                        }}>{String(t)}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Stage 2: Website ───────────────── */}
                {onstage === 2 && (
                  <div style={{ animation:'obUp 0.35s ease both' }}>
                    <div style={{ fontSize:9, letterSpacing:2.5, color:`${C.stone}80`, fontFamily:"'Jost',sans-serif", marginBottom:18 }}>WEBSITE BUILD</div>
                    <div style={{ border:'1px solid rgba(255,255,255,0.10)', overflow:'hidden' }}>
                      {/* Browser chrome */}
                      <div style={{ background:'rgba(255,255,255,0.04)', padding:'8px 14px', display:'flex', alignItems:'center', gap:6, borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
                        {['rgba(255,255,255,0.14)','rgba(255,255,255,0.14)','rgba(255,255,255,0.14)'].map((bg, i) => (
                          <div key={i} style={{ width:8, height:8, borderRadius:'50%', background:bg }}/>
                        ))}
                        <div style={{ flex:1, marginLeft:10, background:'rgba(255,255,255,0.06)', borderRadius:2, padding:'3px 10px', fontSize:8, color:`${C.stone}60`, fontFamily:"'Jost',sans-serif" }}>
                          villasekar.com
                        </div>
                      </div>
                      {/* Mini site */}
                      <div style={{ padding:'22px 20px', background:'#080E0B' }}>
                        <div style={{ fontSize:8, color:`${C.stone}55`, letterSpacing:2.5, marginBottom:8, fontFamily:"'Jost',sans-serif", animation:'obUp 0.3s ease 0.1s both' }}>VILLA SEKAR · UBUD</div>
                        <div style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:800, color:C.cream, lineHeight:1.15, marginBottom:14, animation:'obUp 0.3s ease 0.2s both' }}>
                          Where calm<br/>meets craft.
                        </div>
                        <div style={{ animation:'obUp 0.3s ease 0.32s both' }}>
                          <div style={{ display:'inline-block', background:C.sienna, color:C.cream, padding:'8px 18px', fontSize:9, letterSpacing:2, fontFamily:"'Jost',sans-serif" }}>
                            BOOK YOUR STAY
                          </div>
                        </div>
                        <div style={{ display:'flex', gap:20, marginTop:18, borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:14, animation:'obUp 0.3s ease 0.44s both' }}>
                          {[['4','Bedrooms'],['2','Pools'],['12','Reviews']].map(([n, l]) => (
                            <div key={l}>
                              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:16, fontWeight:700, color:C.siennaL }}>{n}</div>
                              <div style={{ fontSize:7, color:`${C.stone}60`, letterSpacing:1.5, fontFamily:"'Jost',sans-serif" }}>{l.toUpperCase()}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Stage 3: Automation ────────────── */}
                {onstage === 3 && (
                  <div>
                    <div style={{ fontSize:9, letterSpacing:2.5, color:`${C.stone}80`, fontFamily:"'Jost',sans-serif", marginBottom:18 }}>WHATSAPP AUTOMATION</div>
                    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                      {/* Guest */}
                      <div style={{ alignSelf:'flex-end', maxWidth:'78%', background:`rgba(42,96,68,0.18)`, border:`1px solid rgba(42,96,68,0.28)`, padding:'9px 13px', animation:'obInR 0.3s ease 0.05s both' }}>
                        <div style={{ fontSize:11, color:C.cream, lineHeight:1.5 }}>Hi, is Villa Sekar available 14–18 Dec?</div>
                        <div style={{ fontSize:7, color:`${C.stone}55`, marginTop:4, textAlign:'right', fontFamily:"'Jost',sans-serif" }}>09:14</div>
                      </div>
                      {/* Bot */}
                      <div style={{ alignSelf:'flex-start', maxWidth:'82%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)', padding:'9px 13px', animation:'obIn 0.3s ease 0.55s both' }}>
                        <div style={{ fontSize:8, color:C.sienna, marginBottom:5, letterSpacing:1.5, fontFamily:"'Jost',sans-serif" }}>NAKAMA BOT</div>
                        <div style={{ fontSize:11, color:C.cream, lineHeight:1.5 }}>Yes, those dates are open. Rate is $280/night. Shall I send the booking link?</div>
                        <div style={{ fontSize:7, color:`${C.stone}55`, marginTop:4, fontFamily:"'Jost',sans-serif" }}>09:14</div>
                      </div>
                      {/* Guest */}
                      <div style={{ alignSelf:'flex-end', maxWidth:'40%', background:`rgba(42,96,68,0.18)`, border:`1px solid rgba(42,96,68,0.28)`, padding:'9px 13px', animation:'obInR 0.3s ease 1.05s both' }}>
                        <div style={{ fontSize:11, color:C.cream }}>Yes please</div>
                        <div style={{ fontSize:7, color:`${C.stone}55`, marginTop:4, textAlign:'right', fontFamily:"'Jost',sans-serif" }}>09:15</div>
                      </div>
                      {/* Bot final */}
                      <div style={{ alignSelf:'flex-start', maxWidth:'88%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)', padding:'9px 13px', animation:'obIn 0.3s ease 1.45s both' }}>
                        <div style={{ fontSize:8, color:C.sienna, marginBottom:5, letterSpacing:1.5, fontFamily:"'Jost',sans-serif" }}>NAKAMA BOT</div>
                        <div style={{ fontSize:11, color:C.cream, lineHeight:1.5, marginBottom:8 }}>Booking link sent. Your deposit holds the dates.</div>
                        <div style={{ display:'inline-block', padding:'5px 12px', border:`1px solid ${C.sienna}`, fontSize:9, color:C.siennaL, letterSpacing:1.5, fontFamily:"'Jost',sans-serif" }}>SECURE YOUR STAY</div>
                        <div style={{ fontSize:7, color:`${C.stone}55`, marginTop:5, fontFamily:"'Jost',sans-serif" }}>09:15</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Stage 4: Live ──────────────────── */}
                {onstage === 4 && (
                  <div>
                    <div style={{ fontSize:9, letterSpacing:2.5, color:`${C.stone}80`, fontFamily:"'Jost',sans-serif", marginBottom:24 }}>DISTRIBUTION & REVENUE</div>
                    {/* Platform badges */}
                    <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:28 }}>
                      {['Airbnb','Booking.com','Agoda','Vrbo','Direct'].map((p, i) => (
                        <div key={p} style={{
                          padding:'7px 16px',
                          border:`1px solid ${p === 'Direct' ? C.sienna : 'rgba(255,255,255,0.10)'}`,
                          fontSize:10,
                          color: p === 'Direct' ? C.siennaL : C.stone,
                          fontFamily:"'Jost',sans-serif",
                          animation:`obUp 0.3s ease ${i * 0.09}s both`,
                        }}>{p}</div>
                      ))}
                    </div>
                    {/* Booking confirmed */}
                    <div style={{ border:`1px solid rgba(42,96,68,0.35)`, background:'rgba(42,96,68,0.07)', padding:'16px 20px', marginBottom:20, animation:'obUp 0.4s ease 0.48s both' }}>
                      <div style={{ fontSize:9, color:C.sienna, letterSpacing:2, marginBottom:8, fontFamily:"'Jost',sans-serif" }}>BOOKING CONFIRMED</div>
                      <div style={{ fontSize:14, color:C.cream, fontWeight:500, marginBottom:3 }}>14–18 December · 4 nights</div>
                      <div style={{ fontSize:12, color:C.stone }}>2 guests · $1,120 total</div>
                    </div>
                    {/* Mini calendar */}
                    <div style={{ display:'flex', gap:4, flexWrap:'wrap', animation:'obUp 0.4s ease 0.68s both' }}>
                      {Array.from({ length: 14 }, (_, i) => {
                        const booked = [13,14,15,16,17].includes(i + 1);
                        return (
                          <div key={i} style={{
                            width:28, height:28,
                            border:'1px solid rgba(255,255,255,0.06)',
                            display:'flex', alignItems:'center', justifyContent:'center',
                            fontSize:8, fontFamily:"'Jost',sans-serif",
                            color:    booked ? C.siennaL : `${C.stone}50`,
                            background: booked ? 'rgba(42,96,68,0.16)' : 'transparent',
                          }}>{i + 1}</div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>{/* end visual panel */}
            </div>{/* end visual card */}

          </div>{/* end main grid */}
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section id="about" className="sec-pad" style={{ background:C.bg }}>
        <div className="about-grid" style={{ maxWidth:1100, margin:'0 auto' }}>
          <div className="reveal about-img" style={{ position:'relative', overflow:'hidden', background:`linear-gradient(180deg,${C.bg} 0%,${C.bgSoft} 100%)`, border:'1px solid rgba(255,255,255,0.06)', minHeight:480 }}>

            {/* Warm accent wash */}
            <div style={{ position:'absolute', inset:0, background:`linear-gradient(145deg,rgba(42,96,68,0.22) 0%,transparent 55%)`, zIndex:1 }} />

            {/* Sky + clouds atmosphere */}
            <svg style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', zIndex:2 }} viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
              {/* Stars */}
              <circle cx="200" cy="36" r="1.3" fill="rgba(242,245,243,0.40)"/>
              <circle cx="285" cy="52" r="0.9" fill="rgba(242,245,243,0.28)"/>
              <circle cx="128" cy="44" r="1.0" fill="rgba(242,245,243,0.32)"/>
              <circle cx="360" cy="76" r="0.8" fill="rgba(242,245,243,0.22)"/>
              <circle cx="68"  cy="58" r="0.7" fill="rgba(242,245,243,0.20)"/>
              <circle cx="315" cy="38" r="0.6" fill="rgba(242,245,243,0.18)"/>
              {/* Cloud cluster — upper left */}
              <ellipse cx="88"  cy="88"  rx="62" ry="26" fill="rgba(242,245,243,0.025)" stroke="rgba(242,245,243,0.11)" strokeWidth="0.7"/>
              <ellipse cx="140" cy="70"  rx="50" ry="21" fill="rgba(242,245,243,0.025)" stroke="rgba(242,245,243,0.11)" strokeWidth="0.7"/>
              <ellipse cx="178" cy="88"  rx="40" ry="19" fill="rgba(242,245,243,0.025)" stroke="rgba(242,245,243,0.11)" strokeWidth="0.7"/>
              {/* Cloud cluster — upper right */}
              <ellipse cx="308" cy="114" rx="54" ry="23" fill="rgba(242,245,243,0.018)" stroke="rgba(242,245,243,0.07)" strokeWidth="0.7"/>
              <ellipse cx="354" cy="98"  rx="42" ry="18" fill="rgba(242,245,243,0.018)" stroke="rgba(242,245,243,0.07)" strokeWidth="0.7"/>
              <ellipse cx="386" cy="114" rx="30" ry="14" fill="rgba(242,245,243,0.018)" stroke="rgba(242,245,243,0.07)" strokeWidth="0.7"/>
              {/* Cloud cluster — mid, wispy */}
              <ellipse cx="52"  cy="220" rx="46" ry="19" fill="rgba(242,245,243,0.015)" stroke="rgba(242,245,243,0.055)" strokeWidth="0.6"/>
              <ellipse cx="92"  cy="208" rx="36" ry="15" fill="rgba(242,245,243,0.015)" stroke="rgba(242,245,243,0.055)" strokeWidth="0.6"/>
              <ellipse cx="340" cy="210" rx="40" ry="17" fill="rgba(242,245,243,0.015)" stroke="rgba(242,245,243,0.055)" strokeWidth="0.6"/>
              <ellipse cx="375" cy="198" rx="30" ry="13" fill="rgba(242,245,243,0.015)" stroke="rgba(242,245,243,0.055)" strokeWidth="0.6"/>
              {/* Cloud cluster — lower, very faint */}
              <ellipse cx="110" cy="330" rx="38" ry="15" fill="rgba(242,245,243,0.010)" stroke="rgba(242,245,243,0.04)" strokeWidth="0.6"/>
              <ellipse cx="300" cy="350" rx="44" ry="17" fill="rgba(242,245,243,0.010)" stroke="rgba(242,245,243,0.04)" strokeWidth="0.6"/>
            </svg>

            {/* Building — taller, bottom-anchored */}
            <svg style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', zIndex:3 }} width="300" height="88%" viewBox="0 0 320 360" preserveAspectRatio="xMidYMax meet" fill="none">
              <path d="M52 352 L52 228 L40 216 L40 156 L52 142 L65 120 L78 94 L90 64 L97 34 L103 8 L109 34 L116 64 L129 94 L142 120 L154 142 L167 156 L167 216 L154 228 L154 352Z" stroke="rgba(242,245,243,0.26)" strokeWidth="1.2"/>
              <path d="M64 352 L64 242 L58 230 L58 168 L64 156 L76 132 L88 104 L97 72 L103 44 L109 72 L118 104 L130 132 L142 156 L148 168 L148 230 L142 242 L142 352" stroke="rgba(242,245,243,0.10)" strokeWidth="0.8"/>
              <line x1="40" y1="216" x2="167" y2="216" stroke="rgba(242,245,243,0.16)" strokeWidth="0.8"/>
              <path d="M268 352 L268 228 L280 216 L280 156 L268 142 L255 120 L242 94 L230 64 L223 34 L217 8 L211 34 L204 64 L191 94 L178 120 L166 142 L153 156 L153 216 L166 228 L166 352Z" stroke="rgba(242,245,243,0.26)" strokeWidth="1.2"/>
              <path d="M256 352 L256 242 L262 230 L262 168 L256 156 L244 132 L232 104 L223 72 L217 44 L211 72 L202 104 L190 132 L178 156 L172 168 L172 230 L178 242 L178 352" stroke="rgba(242,245,243,0.10)" strokeWidth="0.8"/>
              <line x1="153" y1="216" x2="280" y2="216" stroke="rgba(242,245,243,0.16)" strokeWidth="0.8"/>
              <line x1="16" y1="352" x2="304" y2="352" stroke="rgba(242,245,243,0.20)" strokeWidth="0.9"/>
              <circle cx="160" cy="10" r="4.5" stroke="rgba(242,245,243,0.30)" strokeWidth="0.8"/>
              <text x="160" y="372" textAnchor="middle" fill="rgba(242,245,243,0.18)" fontSize="7.5" fontFamily="Jost,sans-serif" letterSpacing="4">CANDI BENTAR · BALI</text>
            </svg>

            {/* Ground fade + label */}
            <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'24px 28px', background:'linear-gradient(transparent,rgba(18,13,9,0.94))', zIndex:4 }}>
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
                borderRight: i<3?`1px solid rgba(242,245,243,0.07)`:'none',
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
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 55% 70% at 50% 100%, rgba(42,96,68,0.2) 0%, transparent 65%)`, pointerEvents:'none' }} />
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
