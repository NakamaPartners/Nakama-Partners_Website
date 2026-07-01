import React, { useEffect, useRef, useState } from 'react';
import nakamaLogo    from '@/assets/nakama-logo-official.jpeg';
import propertyHero  from '@/assets/property-hero.png';
import propertyAbout from '@/assets/property-about2.png';
import nakamaPool     from '@/assets/nakama-pool.png';
import nakamaBedroom  from '@/assets/nakama-bedroom.png';
import nakamaLiving   from '@/assets/nakama-living.png';
import nakamaSunset   from '@/assets/nakama-sunset.png';
import nakamaTwilight from '@/assets/nakama-twilight.png';
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
  .nav-links-center { display:flex; gap:32px; white-space:nowrap; align-items:center; }
  @keyframes previewGlow {
    0%,100% { box-shadow: 0 0 0 0 rgba(42,96,68,0); }
    50%      { box-shadow: 0 0 0 4px rgba(42,96,68,0.18); }
  }
  @keyframes previewArrow {
    0%,100% { transform: translateX(0); }
    50%      { transform: translateX(3px); }
  }
  .nav-preview-btn {
    color:${C.sienna} !important;
    border:1px solid ${C.sienna};
    padding:5px 14px;
    font-size:11px !important;
    letter-spacing:0.12em !important;
    transition:background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease !important;
    animation: previewGlow 2.4s ease-in-out infinite;
    display:inline-flex; align-items:center; gap:5px;
  }
  .nav-links-center .nav-preview-btn:hover {
    background:${C.sienna}; color:#fff !important;
    animation:none; box-shadow: 0 4px 18px rgba(42,96,68,0.28) !important;
  }
  .nav-preview-btn .arrow { display:inline-block; animation: previewArrow 1.2s ease-in-out infinite; }
  .nav-preview-btn:hover .arrow { animation:none; }
  .nav-link { font-family:'Jost',sans-serif; font-size:12px; letter-spacing:0.08em; color:${C.stone}; cursor:pointer; transition:color 0.2s ease; }
  .nav-link:hover { color:${C.sienna} !important; }

  /* Buttons */
  .btn-primary {
    background:${C.sienna}; color:#F8FAF9;
    border:none; cursor:pointer;
    padding:12px 28px;
    font-family:'Jost',sans-serif; font-size:12px; letter-spacing:0.08em;
    transition:background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
    display:inline-block;
    box-shadow: 0 4px 20px rgba(42,96,68,0.22);
  }
  .btn-primary:hover { background:${C.siennaD}; transform:translateY(-1px); box-shadow: 0 8px 32px rgba(42,96,68,0.32); }
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

  /* Mobile nav burger + panel */
  .nav-burger { display:none; flex-direction:column; justify-content:center; gap:5px; width:40px; height:40px; padding:8px; background:transparent; border:none; cursor:pointer; }
  .nav-burger-line { display:block; width:22px; height:2px; background:${C.cream}; transition:transform 0.28s ease, opacity 0.2s ease; }
  .nav-burger-line.x1 { transform:translateY(7px) rotate(45deg); }
  .nav-burger-line.x2 { opacity:0; }
  .nav-burger-line.x3 { transform:translateY(-7px) rotate(-45deg); }
  .nav-mobile-panel {
    display:none; position:fixed; top:58px; left:0; right:0; z-index:99;
    background:rgba(255,255,255,0.98); backdrop-filter:blur(20px);
    border-bottom:0 solid rgba(0,0,0,0.07);
    flex-direction:column; padding:0 20px;
    max-height:0; overflow:hidden; opacity:0;
    transition:max-height 0.35s ease, opacity 0.28s ease, padding 0.35s ease, border-width 0.35s ease;
  }
  .nav-mobile-panel.open { max-height:80vh; opacity:1; padding:8px 20px 24px; border-bottom-width:1px; }
  .nav-mobile-link { font-family:'Jost',sans-serif; font-size:15px; letter-spacing:0.04em; color:${C.cream}; cursor:pointer; padding:15px 4px; border-bottom:1px solid rgba(0,0,0,0.06); }
  .nav-mobile-link:active { color:${C.sienna}; }
  .nav-mobile-cta { display:flex; flex-direction:column; gap:10px; margin-top:18px; }

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
  .svc-acc-row { transition: background 0.15s ease; }
  .pain-cards > div { transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease; }
  .pain-cards > div:hover { transform: translateY(-4px); box-shadow: 0 16px 56px rgba(0,0,0,0.09); border-color: rgba(42,96,68,0.18) !important; }

  /* Service visual scenes */
  @keyframes svcDash      { to { stroke-dashoffset: -24; } }
  @keyframes svcStarPop   { from { opacity:0; transform:scale(0) rotate(-15deg); } to { opacity:1; transform:scale(1) rotate(0deg); } }
  @keyframes svcMsgIn     { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
  @keyframes svcDotBlink  { 0%,100% { opacity:0.25; } 50% { opacity:1; } }
  @keyframes svcShine     { from { left:-80%; } to { left:200%; } }
  @keyframes svcTypeFade  { 0%,100% { opacity:0; } 15%,75% { opacity:1; } }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* Work showcase modal */
  @keyframes wkOverlay { from { opacity:0; } to { opacity:1; } }
  @keyframes wkIn      { from { opacity:0; transform:translateY(34px); } to { opacity:1; transform:none; } }
  @keyframes wkScale   { from { opacity:0; transform:scale(0.96) translateY(22px); } to { opacity:1; transform:none; } }
  @keyframes wkBar     { from { transform:scaleX(0); } to { transform:scaleX(1); } }
  @keyframes wkFloat   { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-7px); } }
  @keyframes wkPulse   { 0%,100% { box-shadow:0 0 0 0 rgba(61,138,98,0.35); } 50% { box-shadow:0 0 0 7px rgba(61,138,98,0); } }
  .wk-overlay { animation: wkOverlay 0.35s ease both; }
  .wk-body    { animation: wkIn 0.55s cubic-bezier(.22,1,.36,1) 0.08s both; }
  .wk-close   { transition: transform 0.25s ease, border-color 0.2s ease, color 0.2s ease; }
  .wk-close:hover { transform: rotate(90deg); border-color: rgba(0,0,0,0.42) !important; color:${C.cream} !important; }
  .wk-deliverable { opacity:0; transform:translateY(30px); transition: opacity 0.9s cubic-bezier(.22,1,.36,1), transform 0.9s cubic-bezier(.22,1,.36,1); }
  .wk-deliverable.on { opacity:1; transform:none; }
  .wk-grid { display:grid; grid-template-columns:0.85fr 1.15fr; gap:clamp(28px,5vw,64px); align-items:center; }
  .wk-grid.flip { grid-template-columns:1.15fr 0.85fr; }
  @media (max-width:820px) {
    .wk-grid, .wk-grid.flip { grid-template-columns:1fr; gap:28px; }
    .wk-grid.flip .wk-visual { order:2; }
    .wk-grid.flip .wk-copy { order:1; }
  }

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

  /* Contact form */
  .form-field {
    width:100%; padding:14px 16px; box-sizing:border-box;
    border:1px solid rgba(0,0,0,0.16); background:${C.bg};
    font-family:'Jost',sans-serif; font-size:14px; color:${C.cream};
    outline:none; transition:border-color 0.25s ease, box-shadow 0.25s ease;
    appearance:none; -webkit-appearance:none; border-radius:0;
  }
  .form-field::placeholder { color:${C.stoneL}; font-weight:300; }
  .form-field:focus { border-color:${C.sienna}; box-shadow:0 0 0 3px rgba(42,96,68,0.08); }
  .form-field.err { border-color:#c0392b; }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  @media (max-width:640px) { .form-row { grid-template-columns:1fr; } }
  select.form-field { background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4 L6 8 L10 4' stroke='%235A7A68' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 16px center; padding-right:40px; cursor:pointer; }
  .char-count { font-family:'Jost',sans-serif; font-size:11px; color:${C.stoneL}; text-align:right; margin-top:5px; transition:color 0.2s ease; }
  .char-count.warn { color:#c0392b; }

  @media (max-width: 600px) { .scroll-hint { display: none !important; } }

  /* ── Mobile responsive ── */
  @media (max-width: 768px) {
    /* Nav: collapse links and ghost button, show burger + mobile panel */
    .nav-links-center  { display: none !important; }
    .nav-desktop-only  { display: none !important; }
    .nav-burger        { display: flex !important; }
    .nav-mobile-panel  { display: flex !important; }

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
    .onboard-left  { height: 300px !important; }
    .onboard-right { height: 360px !important; }

    /* Section headers: single column */
    .sec-header { grid-template-columns: 1fr !important; margin-bottom: 36px !important; }

    /* Section padding */
    .sec-pad    { padding: 56px 20px !important; }
    .sec-pad-sm { padding: 40px 20px !important; }

    /* Stats and process */
    .stats-grid   { grid-template-columns: 1fr 1fr !important; }
    .process-grid { grid-template-columns: 1fr 1fr !important; }

    /* Contact */
    .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }

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
    tags: ['Property assessment', 'Revenue projection', 'Platform audit', 'Roadmap walkthrough'],
  },
  {
    label: 'Your Brand',
    title: 'It clicks into place.',
    desc: "A name, a palette, a voice — built around your property's real character. Most clients say this is the moment it stops feeling like an investment and starts feeling like a destination.",
    tags: ['Name & concept', 'Color palette', 'Typography', 'Brand voice', 'Guest persona'],
  },
  {
    label: 'Goes Live',
    title: 'From nothing to running.',
    desc: "Website live. OTAs active. WhatsApp responding while you sleep. We build it, connect it, test it. You approve the result. That's it.",
    tags: ['Direct website', 'Airbnb', 'Booking.com', 'Agoda', 'Traveloka', 'WhatsApp setup'],
  },
  {
    label: 'Automated',
    title: 'Works while you sleep.',
    desc: "Guests get answered in seconds. Calendars never double-book. Check-in details go out automatically. Your property runs like a professional operation, without you being on call.",
    tags: ['Instant guest replies', 'Calendar sync', 'Check-in flow', 'Review requests', 'No-show handling'],
  },
  {
    label: 'First Booking',
    title: 'There it is.',
    desc: "The first booking confirmation lands in your inbox. Revenue starts moving. We're watching the same numbers you are — and already working on getting the next one.",
    tags: ['Revenue dashboard', 'Occupancy review', 'Rate optimisation', 'Ongoing support'],
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
    <div style={{ position:'sticky', top:120, borderRadius:4, overflow:'hidden', backgroundColor:'#F7FAF8', backgroundImage:[`radial-gradient(ellipse 70% 55% at 12% 88%, rgba(42,96,68,0.22) 0%, transparent 60%)`,`radial-gradient(ellipse 55% 45% at 90% 10%, rgba(61,138,98,0.14) 0%, transparent 58%)`,`radial-gradient(ellipse 48% 38% at 58% 52%, rgba(144,175,164,0.13) 0%, transparent 55%)`,`radial-gradient(ellipse 90% 28% at 50% 100%, rgba(30,69,51,0.12) 0%, transparent 65%)`].join(','), height:420 }}>

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
        <div style={{ display:'flex', alignItems:'stretch', gap:10, padding:'20px 18px', width:'100%', boxSizing:'border-box' }}>

          {/* Before — listing card, landscape ratio */}
          <div style={{ flex:1, background:'#F3F3EF', border:`1px solid rgba(0,0,0,0.09)`, borderRadius:8, overflow:'hidden', display:'flex', flexDirection:'column' }}>
            <div style={{ height:68, background:'#E2E2DC', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, position:'relative' }}>
              <svg width="26" height="20" viewBox="0 0 36 28" fill="none" opacity="0.28">
                <rect x="0" y="0" width="36" height="28" rx="2" fill="#999"/>
                <circle cx="10" cy="11" r="5" fill="#777"/>
                <polygon points="0,28 11,16 20,22 27,16 36,28" fill="#888"/>
              </svg>
              <div style={{ position:'absolute', top:6, left:8, background:'rgba(0,0,0,0.18)', borderRadius:3, padding:'2px 6px' }}>
                <span style={{ fontSize:7, color:'rgba(255,255,255,0.7)', fontFamily:"'Jost',sans-serif", letterSpacing:1 }}>BEFORE</span>
              </div>
            </div>
            <div style={{ padding:'9px 11px 11px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
                <div style={{ fontSize:10, fontFamily:"'Jost',sans-serif", fontWeight:600, color:'rgba(0,0,0,0.38)', letterSpacing:0.4 }}>Property 12</div>
                <div style={{ display:'flex', gap:1 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize:9.5, color: s<=3 ? '#F59E0B' : '#D8D8D8' }}>★</span>)}
                </div>
              </div>
              <div style={{ fontSize:8.5, color:'rgba(0,0,0,0.24)', fontFamily:"'Jost',sans-serif", lineHeight:1.55 }}>1 platform · no website</div>
            </div>
          </div>

          {/* Arrow */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, flexShrink:0 }}>
            <svg width="20" height="14" viewBox="0 0 20 14">
              <path d="M0 7 L13 7 M8 1 L14 7 L8 13" stroke={C.sienna} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize:6.5, fontFamily:"'Jost',sans-serif", color:C.sienna, letterSpacing:1.8 }}>BRAND</span>
          </div>

          {/* After — branded listing card */}
          <div style={{ flex:1, background:'#0D201A', border:`1px solid rgba(61,138,98,0.4)`, borderRadius:8, overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:`0 6px 24px rgba(42,96,68,0.24)` }}>
            <div style={{ height:110, position:'relative', overflow:'hidden', flexShrink:0 }}>
              <img src={nakamaTwilight} alt="Luna House at twilight" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 55%' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(transparent 40%, rgba(13,32,26,0.72))' }}/>
              <div style={{ position:'absolute', top:6, left:8, background:'rgba(13,32,26,0.55)', borderRadius:3, padding:'2px 6px', backdropFilter:'blur(4px)' }}>
                <span style={{ fontSize:7, color:'rgba(255,255,255,0.85)', fontFamily:"'Jost',sans-serif", letterSpacing:1 }}>AFTER</span>
              </div>
            </div>
            <div style={{ padding:'9px 11px 11px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
                <div style={{ fontSize:10.5, fontFamily:"'Sora',sans-serif", fontWeight:700, color:'#F2F5F3', letterSpacing:0.5 }}>Luna House</div>
                <div style={{ display:'flex', gap:1 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize:9.5, color:'#F59E0B', animation:`svcStarPop 0.3s cubic-bezier(.22,1,.36,1) ${0.4+s*0.09}s both` }}>★</span>)}
                </div>
              </div>
              <div style={{ fontSize:8.5, color:'rgba(61,138,98,0.65)', fontFamily:"'Jost',sans-serif", lineHeight:1.55 }}>4 platforms · website · brand</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scene 2: WhatsApp Automation ── */}
      <div style={pane(2)}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10, padding:'0 20px', width:'100%', boxSizing:'border-box' }}>

          {/* Clean chat card — no phone chrome, just the conversation */}
          <div style={{ width:'100%', maxWidth:296, borderRadius:12, overflow:'hidden', boxShadow:`0 8px 32px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.07)` }}>

            {/* WhatsApp header */}
            <div style={{ background:C.sienna, padding:'10px 14px', display:'flex', alignItems:'center', gap:9 }}>
              <div style={{ width:28, height:28, borderRadius:'50%', background:'rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg width="13" height="13" viewBox="0 0 16 16">
                  <circle cx="8" cy="6" r="3.5" fill="white"/>
                  <path d="M2 14.5C2 11 4.5 9 8 9C11.5 9 14 11 14 14.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:11, color:'white', fontFamily:"'Jost',sans-serif", fontWeight:600 }}>Guest Inquiry</div>
                <div style={{ fontSize:8, color:'rgba(255,255,255,0.52)', fontFamily:"'Jost',sans-serif" }}>online · 02:47 AM</div>
              </div>
              <div style={{ display:'flex', gap:4 }}>
                {[0,1,2].map(i => <div key={i} style={{ width:3, height:3, borderRadius:'50%', background:'rgba(255,255,255,0.35)' }}/>)}
              </div>
            </div>

            {/* Chat body — tight, natural bubble spacing */}
            <div style={{ background:'#ECE5DD', padding:'10px 10px 8px', display:'flex', flexDirection:'column', gap:5 }}>
              <div style={{ display:'flex', justifyContent:'flex-start', animation:'svcMsgIn 0.5s ease 0.3s both', opacity:0 }}>
                <div style={{ background:'white', borderRadius:'3px 10px 10px 10px', padding:'7px 10px', maxWidth:'80%', boxShadow:'0 1px 2px rgba(0,0,0,0.07)' }}>
                  <div style={{ fontSize:11, color:'#2C3333', fontFamily:"'Jost',sans-serif", lineHeight:1.45 }}>Hi, can I check in early? Around 12pm?</div>
                  <div style={{ fontSize:8, color:'#C0C0C0', fontFamily:"'Jost',sans-serif", marginTop:3, textAlign:'right' }}>02:47</div>
                </div>
              </div>

              <div style={{ display:'flex', justifyContent:'flex-end', animation:'svcTypeFade 2.8s ease 1.1s both' }}>
                <div style={{ background:C.sienna, borderRadius:'10px 3px 10px 10px', padding:'7px 11px' }}>
                  <div style={{ display:'flex', gap:3, alignItems:'center', height:10 }}>
                    {[0, 0.18, 0.36].map((d, i) => (
                      <div key={i} style={{ width:4, height:4, borderRadius:'50%', background:'rgba(255,255,255,0.65)', animation:`svcDotBlink 0.9s ease ${d}s infinite` }}/>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display:'flex', justifyContent:'flex-end', animation:'svcMsgIn 0.5s ease 2.1s both', opacity:0 }}>
                <div style={{ background:C.sienna, borderRadius:'10px 3px 10px 10px', padding:'7px 10px', maxWidth:'84%', boxShadow:'0 1px 2px rgba(0,0,0,0.09)' }}>
                  <div style={{ fontSize:11, color:'white', fontFamily:"'Jost',sans-serif", lineHeight:1.45 }}>Hi! Early check-in at 12pm is confirmed. WiFi: NakamaCanggu. See you soon!</div>
                  <div style={{ fontSize:8, color:'rgba(255,255,255,0.48)', fontFamily:"'Jost',sans-serif", marginTop:3, textAlign:'right' }}>02:47 · sent in 4s</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ background:'white', borderTop:'1px solid rgba(0,0,0,0.05)', padding:'6px 12px', display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:5, height:5, borderRadius:'50%', background:C.siennaL, flexShrink:0 }}/>
              <span style={{ fontSize:8.5, fontFamily:"'Jost',sans-serif", color:C.stone, letterSpacing:0.4 }}>Automated by Nakama</span>
              <span style={{ marginLeft:'auto', fontSize:8, color:C.stoneL, fontFamily:"'Jost',sans-serif" }}>avg 4s</span>
            </div>
          </div>

          {/* Stat chip */}
          <div style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(42,96,68,0.08)', border:`1px solid rgba(42,96,68,0.16)`, borderRadius:20, padding:'4px 12px' }}>
            <div style={{ width:4, height:4, borderRadius:'50%', background:C.siennaL }}/>
            <span style={{ fontSize:8.5, fontFamily:"'Jost',sans-serif", color:C.stone, letterSpacing:0.4 }}>Average response: 4 seconds</span>
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

/* ─────────────────────────────────────────────────────────
   WORK SHOWCASE — full-screen modal of deliverables
   ───────────────────────────────────────────────────────── */
function WorkShowcase({ onClose }: { onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [hbPage, setHbPage] = useState(0);
  const [emailStep, setEmailStep] = useState(0);
  const [waKey, setWaKey] = useState(0);

  // Lock body scroll, Escape to close, focus management + focus trap
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const prevFocused = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'Tab') {
        const root = rootRef.current;
        if (!root) return;
        const focusables = Array.from(
          root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
        ).filter(el => el.offsetParent !== null);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      prevFocused?.focus?.();
    };
  }, [onClose]);

  // Reveal deliverables on scroll
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll('.wk-deliverable'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
    }, { root, threshold: 0.18 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Cycling sequences
  useEffect(() => { const t = setInterval(() => setHbPage(p => (p + 1) % 4), 2800); return () => clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setEmailStep(s => (s + 1) % 3), 3000); return () => clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setWaKey(k => k + 1), 8000); return () => clearInterval(t); }, []);

  const HANDBOOK = [
    { tag: 'Welcome',    title: 'Welcome to Luna House',   lines: ['Your home for the stay', 'Everything in one place', 'No printed folders to lose'] },
    { tag: 'Access',     title: 'WiFi and check-in',       lines: ['Network: LunaHouse_Guest', 'Door code: 4471', 'Check-in from 2:00 PM'] },
    { tag: 'The home',   title: 'House guide',             lines: ['Air-con and lighting', 'Kitchen and appliances', 'Pool and outdoor area'] },
    { tag: 'Around',     title: 'Local recommendations',   lines: ['Cafes within walking distance', 'Best beaches nearby', 'Trusted drivers and tours'] },
  ];

  const EMAILS = [
    { when: 'Instantly on booking',    subject: 'Your booking at Luna House is confirmed', preview: 'Hi Sarah, your stay from 12 to 16 August is confirmed. Here is everything you need before you arrive.' },
    { when: '2 days before arrival',   subject: 'Getting ready for your stay',             preview: 'Directions, the door code, and check-in details, sent automatically so arrival is effortless.' },
    { when: 'Morning after check-out', subject: 'Thank you for staying with us',           preview: 'We hope you loved Luna House. A quick review helps future guests find us. We would love to host you again.' },
  ];

  const Label = ({ n, text }: { n: string; text: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      <span className="display" style={{ fontSize: 15, fontWeight: 700, color: C.siennaL }}>{n}</span>
      <span className="label" style={{ color: C.stoneL, fontSize: 9 }}>{text}</span>
    </div>
  );

  return (
    <div ref={rootRef} className="wk-overlay" role="dialog" aria-modal="true" aria-labelledby="wk-title" style={{
      position: 'fixed', inset: 0, zIndex: 300, background: C.bg,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        flexShrink: 0, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px,5vw,56px)', borderBottom: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <NakamaLogo height={30} />
          <span style={{ width: 1, height: 22, background: 'rgba(0,0,0,0.12)' }} />
          <span className="label" style={{ color: C.stone, fontSize: 10 }}>Our work</span>
        </div>
        <button
          ref={closeBtnRef}
          className="wk-close"
          onClick={onClose}
          aria-label="Close showcase"
          style={{
            width: 40, height: 40, border: '1px solid rgba(0,0,0,0.16)', background: 'transparent',
            color: C.stone, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 2 L14 14 M14 2 L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
      </div>

      {/* Scroll body */}
      <div ref={scrollRef} className="wk-body" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(48px,7vw,88px) clamp(22px,5vw,56px) clamp(64px,9vw,120px)' }}>

          {/* Intro */}
          <div style={{ maxWidth: 640, marginBottom: 'clamp(56px,8vw,96px)' }}>
            <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 18 }}>What you actually get</span>
            <h2 id="wk-title" className="display" style={{ fontSize: 'clamp(30px,5vw,56px)', fontWeight: 800, lineHeight: 1.05, color: C.cream, letterSpacing: '-0.02em', marginBottom: 22 }}>
              Not slides.<br />The real thing.
            </h2>
            <p style={{ fontSize: 'clamp(14px,1.8vw,16px)', color: C.stone, lineHeight: 1.9, fontWeight: 300 }}>
              Every property leaves with a complete presence. A website guests trust, a digital handbook they rely on, and guest systems that answer instantly, day or night. Here is what that looks like.
            </p>
          </div>

          {/* ── 1. WEBSITE ── */}
          <div className="wk-deliverable" style={{ marginBottom: 'clamp(72px,10vw,120px)' }}>
            <div className="wk-grid">
              <div className="wk-copy">
                <Label n="01" text="Custom website" />
                <h3 className="display" style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 700, color: C.cream, lineHeight: 1.15, marginBottom: 16 }}>A booking site that earns trust</h3>
                <p style={{ fontSize: 15, color: C.stone, lineHeight: 1.9, fontWeight: 300, marginBottom: 20 }}>
                  Your own branded website, built to convert. Direct bookings with no platform fees, on every screen size, loading fast and looking the part.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {['Direct booking, zero commission', 'Fully responsive on mobile', 'Search-optimised and fast'].map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <svg width="13" height="13" viewBox="0 0 14 14"><path d="M2 7.5 L5.5 11 L12 3" stroke={C.siennaL} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span style={{ fontSize: 13, color: C.stone, fontWeight: 300 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual: browser + phone */}
              <div className="wk-visual" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 18, flexWrap: 'wrap' }}>
                {/* Browser */}
                <div style={{ flex: '1 1 340px', maxWidth: 460, border: '1px solid rgba(0,0,0,0.12)', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.12)', background: '#fff' }}>
                  <div style={{ background: '#EEF2F0', padding: '8px 11px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                    <div style={{ display: 'flex', gap: 5 }}>{[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,0.14)' }} />)}</div>
                    <div style={{ flex: 1, background: '#fff', padding: '4px 10px', fontSize: 9.5, color: C.stone, textAlign: 'center', border: '1px solid rgba(0,0,0,0.07)', fontFamily: "'Jost',sans-serif" }}>lunahouse.com</div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 15px' }}>
                      <span className="display" style={{ fontWeight: 700, fontSize: 12, color: C.cream, letterSpacing: 1 }}>LUNA HOUSE</span>
                      <div style={{ display: 'flex', gap: 12, fontSize: 8.5, color: C.stone, fontFamily: "'Jost',sans-serif" }}><span>Rooms</span><span>Gallery</span><span>Contact</span></div>
                    </div>
                    <div style={{ height: 176, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 16 }}>
                      <img src={nakamaSunset} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,26,20,0.72) 8%, rgba(13,26,20,0.12) 60%)' }} />
                      <div style={{ position: 'relative' }}>
                        <div className="display" style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 8, letterSpacing: '-0.01em' }}>Your stay in Canggu</div>
                        <div style={{ display: 'inline-block', background: C.sienna, color: '#fff', fontSize: 9, fontFamily: "'Jost',sans-serif", letterSpacing: 1, padding: '7px 16px' }}>BOOK DIRECT</div>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7, padding: 14 }}>
                      {[nakamaBedroom, nakamaLiving, nakamaPool].map((img, i) => (
                        <div key={i}>
                          <div style={{ height: 46, backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                          <div style={{ height: 5, width: '70%', background: 'rgba(0,0,0,0.10)', marginTop: 6 }} />
                          <div style={{ height: 4, width: '45%', background: 'rgba(0,0,0,0.06)', marginTop: 4 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ flexShrink: 0, width: 132, border: '5px solid #14261C', borderRadius: 20, overflow: 'hidden', boxShadow: '0 18px 44px rgba(0,0,0,0.18)', background: '#fff', animation: 'wkFloat 5s ease-in-out infinite' }}>
                  <div style={{ height: 96, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 9 }}>
                    <img src={nakamaPool} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,26,20,0.75), transparent 65%)' }} />
                    <div className="display" style={{ position: 'relative', fontSize: 11, fontWeight: 800, color: '#fff', lineHeight: 1.05 }}>Luna House</div>
                  </div>
                  <div style={{ padding: 9 }}>
                    <div style={{ height: 5, width: '80%', background: 'rgba(0,0,0,0.10)', marginBottom: 5 }} />
                    <div style={{ height: 4, width: '55%', background: 'rgba(0,0,0,0.07)', marginBottom: 10 }} />
                    <div style={{ background: C.sienna, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 7, color: '#fff', fontFamily: "'Jost',sans-serif", letterSpacing: 1 }}>BOOK DIRECT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. DIGITAL HANDBOOK ── */}
          <div className="wk-deliverable" style={{ marginBottom: 'clamp(72px,10vw,120px)' }}>
            <div className="wk-grid flip">
              {/* Visual: tablet with cycling pages */}
              <div className="wk-visual" style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 'min(340px,100%)', border: '1px solid rgba(0,0,0,0.12)', background: C.siennaD, boxShadow: '0 24px 60px rgba(0,0,0,0.16)', overflow: 'hidden' }}>
                  <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="display" style={{ fontSize: 12, fontWeight: 700, color: '#F2F5F3', letterSpacing: 1 }}>GUEST HANDBOOK</span>
                    <span style={{ fontSize: 9, color: C.stoneL, fontFamily: "'Jost',sans-serif" }}>Luna House</span>
                  </div>
                  {/* Cover photo strip */}
                  <div style={{ position: 'relative', height: 110, overflow: 'hidden' }}>
                    <img src={nakamaSunset} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(30,69,51,0.18), rgba(30,69,51,0.52))' }} />
                    <div style={{ position: 'absolute', bottom: 12, left: 18 }}>
                      <div style={{ fontSize: 8, fontFamily: "'Jost',sans-serif", color: 'rgba(255,255,255,0.72)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Welcome to</div>
                      <div className="display" style={{ fontSize: 17, fontWeight: 800, color: '#fff', lineHeight: 1 }}>Luna House</div>
                    </div>
                  </div>
                  <div style={{ position: 'relative', height: 220 }}>
                    {HANDBOOK.map((pg, i) => (
                      <div key={i} style={{
                        position: 'absolute', inset: 0, padding: '22px 22px',
                        opacity: hbPage === i ? 1 : 0, transform: hbPage === i ? 'translateY(0)' : 'translateY(10px)',
                        transition: 'opacity 0.6s ease, transform 0.6s ease', pointerEvents: 'none',
                      }}>
                        <span className="label" style={{ color: C.siennaL, fontSize: 8.5 }}>{`0${i + 1} · ${pg.tag}`}</span>
                        <h4 className="display" style={{ fontSize: 20, fontWeight: 700, color: '#F2F5F3', lineHeight: 1.2, margin: '12px 0 20px' }}>{pg.title}</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                          {pg.lines.map(l => (
                            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                              <span style={{ width: 6, height: 6, background: C.siennaL, flexShrink: 0 }} />
                              <span style={{ fontSize: 12.5, color: 'rgba(242,245,243,0.72)', fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>{l}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 6, padding: '0 22px 18px' }}>
                    {HANDBOOK.map((_, i) => (
                      <span key={i} style={{ width: hbPage === i ? 18 : 6, height: 4, background: hbPage === i ? C.siennaL : 'rgba(255,255,255,0.18)', transition: 'all 0.4s ease' }} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="wk-copy">
                <Label n="02" text="Digital handbook" />
                <h3 className="display" style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 700, color: C.cream, lineHeight: 1.15, marginBottom: 16 }}>Everything a guest needs, in their pocket</h3>
                <p style={{ fontSize: 15, color: C.stone, lineHeight: 1.9, fontWeight: 300, marginBottom: 20 }}>
                  A branded digital guide guests open on their phone. WiFi, check-in, house instructions, and local recommendations, all in one place. Fewer questions for you, a smoother stay for them.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {['Access, WiFi and house rules', 'Curated local guide', 'Update it any time, instantly'].map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <svg width="13" height="13" viewBox="0 0 14 14"><path d="M2 7.5 L5.5 11 L12 3" stroke={C.siennaL} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span style={{ fontSize: 13, color: C.stone, fontWeight: 300 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. WHATSAPP BOT ── */}
          <div className="wk-deliverable" style={{ marginBottom: 'clamp(72px,10vw,120px)' }}>
            <div className="wk-grid">
              <div className="wk-copy">
                <Label n="03" text="WhatsApp automation" />
                <h3 className="display" style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 700, color: C.cream, lineHeight: 1.15, marginBottom: 16 }}>Guests answered in seconds, around the clock</h3>
                <p style={{ fontSize: 15, color: C.stone, lineHeight: 1.9, fontWeight: 300, marginBottom: 20 }}>
                  An automated WhatsApp assistant that handles inquiries, confirms details, and shares check-in information instantly. No missed messages at midnight, no guest left waiting.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {['Replies day and night', 'Bilingual, English and Bahasa', 'Escalates to you when needed'].map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <svg width="13" height="13" viewBox="0 0 14 14"><path d="M2 7.5 L5.5 11 L12 3" stroke={C.siennaL} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span style={{ fontSize: 13, color: C.stone, fontWeight: 300 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual: chat conversation (loops via waKey remount) */}
              <div className="wk-visual" style={{ display: 'flex', justifyContent: 'center' }}>
                <div key={waKey} style={{ width: 'min(320px,100%)', overflow: 'hidden', boxShadow: '0 20px 52px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06)' }}>
                  <div style={{ background: C.sienna, padding: '11px 15px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 16 16"><circle cx="8" cy="6" r="3.5" fill="white" /><path d="M2 14.5C2 11 4.5 9 8 9C11.5 9 14 11 14 14.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11.5, color: 'white', fontFamily: "'Jost',sans-serif", fontWeight: 600 }}>Guest Inquiry</div>
                      <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.55)', fontFamily: "'Jost',sans-serif" }}>online</div>
                    </div>
                  </div>
                  <div style={{ background: '#ECE5DD', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 5, minHeight: 250 }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'svcMsgIn 0.45s ease 0.3s both', opacity: 0 }}>
                      <div style={{ background: 'white', borderRadius: '3px 10px 10px 10px', padding: '7px 10px', maxWidth: '82%', boxShadow: '0 1px 2px rgba(0,0,0,0.07)' }}>
                        <div style={{ fontSize: 11, color: '#2C3333', fontFamily: "'Jost',sans-serif", lineHeight: 1.45 }}>Hi! Is the property available 12 to 16 Aug?</div>
                        <div style={{ fontSize: 8, color: '#C0C0C0', fontFamily: "'Jost',sans-serif", marginTop: 3, textAlign: 'right' }}>02:11</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', animation: 'svcMsgIn 0.45s ease 1.1s both', opacity: 0 }}>
                      <div style={{ background: C.sienna, borderRadius: '10px 3px 10px 10px', padding: '7px 10px', maxWidth: '86%', boxShadow: '0 1px 2px rgba(0,0,0,0.09)' }}>
                        <div style={{ fontSize: 11, color: 'white', fontFamily: "'Jost',sans-serif", lineHeight: 1.45 }}>Yes, those dates are open. Direct rate is 15% below the platforms. Shall I hold it for you?</div>
                        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)', fontFamily: "'Jost',sans-serif", marginTop: 3, textAlign: 'right' }}>02:11 · sent in 3s</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'svcMsgIn 0.45s ease 2.1s both', opacity: 0 }}>
                      <div style={{ background: 'white', borderRadius: '3px 10px 10px 10px', padding: '7px 10px', maxWidth: '82%', boxShadow: '0 1px 2px rgba(0,0,0,0.07)' }}>
                        <div style={{ fontSize: 11, color: '#2C3333', fontFamily: "'Jost',sans-serif", lineHeight: 1.45 }}>Yes please. And what time is check-in?</div>
                        <div style={{ fontSize: 8, color: '#C0C0C0', fontFamily: "'Jost',sans-serif", marginTop: 3, textAlign: 'right' }}>02:12</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', animation: 'svcMsgIn 0.45s ease 3.1s both', opacity: 0 }}>
                      <div style={{ background: C.sienna, borderRadius: '10px 3px 10px 10px', padding: '7px 10px', maxWidth: '86%', boxShadow: '0 1px 2px rgba(0,0,0,0.09)' }}>
                        <div style={{ fontSize: 11, color: 'white', fontFamily: "'Jost',sans-serif", lineHeight: 1.45 }}>Held. Check-in is from 2 PM, full details will arrive by email. See you in August!</div>
                        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)', fontFamily: "'Jost',sans-serif", marginTop: 3, textAlign: 'right' }}>02:12 · sent in 2s</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: 'white', borderTop: '1px solid rgba(0,0,0,0.05)', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.siennaL }} />
                    <span style={{ fontSize: 8.5, fontFamily: "'Jost',sans-serif", color: C.stone, letterSpacing: 0.4 }}>Automated by Nakama</span>
                    <span style={{ marginLeft: 'auto', fontSize: 8, color: C.stoneL, fontFamily: "'Jost',sans-serif" }}>avg 4s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 4. AUTOMATED EMAIL ── */}
          <div className="wk-deliverable">
            <div className="wk-grid flip">
              {/* Visual: automated email sequence */}
              <div className="wk-visual" style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 'min(400px,100%)', border: '1px solid rgba(0,0,0,0.12)', background: '#fff', boxShadow: '0 24px 60px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
                  <div style={{ background: C.bgMid, padding: '11px 16px', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="15" height="15" viewBox="0 0 16 16"><rect x="1" y="3" width="14" height="10" rx="1.5" stroke={C.sienna} strokeWidth="1.3" fill="none" /><path d="M1.5 4 L8 8.5 L14.5 4" stroke={C.sienna} strokeWidth="1.3" fill="none" strokeLinecap="round" /></svg>
                    <span style={{ fontSize: 11, fontFamily: "'Jost',sans-serif", color: C.cream, fontWeight: 500 }}>Automated guest emails</span>
                    <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.siennaL, animation: 'wkPulse 2s ease infinite' }} />
                      <span style={{ fontSize: 8.5, fontFamily: "'Jost',sans-serif", color: C.stone, letterSpacing: 0.5 }}>Live</span>
                    </span>
                  </div>
                  {/* Timeline */}
                  <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    {EMAILS.map((em, i) => (
                      <div key={i} style={{
                        flex: 1, padding: '9px 8px', textAlign: 'center', cursor: 'default',
                        background: emailStep === i ? 'rgba(42,96,68,0.07)' : 'transparent',
                        borderBottom: emailStep === i ? `2px solid ${C.sienna}` : '2px solid transparent',
                        transition: 'all 0.4s ease',
                      }}>
                        <div style={{ fontSize: 8, fontFamily: "'Jost',sans-serif", color: emailStep === i ? C.sienna : C.stoneL, letterSpacing: 0.4, lineHeight: 1.4 }}>{em.when}</div>
                      </div>
                    ))}
                  </div>
                  {/* Active email */}
                  <div style={{ position: 'relative', minHeight: 190 }}>
                    {EMAILS.map((em, i) => (
                      <div key={i} style={{
                        position: emailStep === i ? 'relative' : 'absolute', inset: emailStep === i ? undefined : 0,
                        padding: '16px 18px', opacity: emailStep === i ? 1 : 0,
                        transition: 'opacity 0.5s ease', pointerEvents: 'none',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                          <div style={{ width: 30, height: 30, borderRadius: '50%', background: C.sienna, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span className="display" style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>L</span>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 11, fontFamily: "'Jost',sans-serif", color: C.cream, fontWeight: 500 }}>Luna House</div>
                            <div style={{ fontSize: 9, fontFamily: "'Jost',sans-serif", color: C.stoneL }}>to Sarah · via Nakama</div>
                          </div>
                          <span style={{ fontSize: 8, fontFamily: "'Jost',sans-serif", color: C.siennaL, border: `1px solid rgba(61,138,98,0.4)`, padding: '3px 8px', letterSpacing: 0.5 }}>SENT</span>
                        </div>
                        <div className="display" style={{ fontSize: 15, fontWeight: 700, color: C.cream, lineHeight: 1.3, marginBottom: 10 }}>{em.subject}</div>
                        <p style={{ fontSize: 12, color: C.stone, lineHeight: 1.75, fontWeight: 300, marginBottom: 16 }}>{em.preview}</p>
                        <div style={{ height: 3, background: 'rgba(42,96,68,0.12)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: C.sienna, transformOrigin: 'left', animation: 'wkBar 3s linear both' }} />
                        </div>
                        <div style={{ fontSize: 8.5, fontFamily: "'Jost',sans-serif", color: C.stoneL, marginTop: 8, letterSpacing: 0.4 }}>Sent automatically, no action needed</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="wk-copy">
                <Label n="04" text="Automated email" />
                <h3 className="display" style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 700, color: C.cream, lineHeight: 1.15, marginBottom: 16 }}>The right message, at the right moment</h3>
                <p style={{ fontSize: 15, color: C.stone, lineHeight: 1.9, fontWeight: 300, marginBottom: 20 }}>
                  A complete email sequence that runs on its own. Confirmation the moment a guest books, arrival details before they land, and a review request after they leave. Branded, timed, and automatic.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {['Triggered by each booking', 'Consistent, on-brand every time', 'More reviews, less admin'].map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <svg width="13" height="13" viewBox="0 0 14 14"><path d="M2 7.5 L5.5 11 L12 3" stroke={C.siennaL} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span style={{ fontSize: 13, color: C.stone, fontWeight: 300 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Closing CTA */}
          <div style={{ marginTop: 'clamp(72px,10vw,120px)', padding: 'clamp(40px,6vw,64px)', background: C.siennaD, textAlign: 'center' }}>
            <h3 className="display" style={{ fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 800, color: '#F2F5F3', lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.01em' }}>This could be your property.</h3>
            <p style={{ fontSize: 15, color: 'rgba(242,245,243,0.6)', lineHeight: 1.8, fontWeight: 300, maxWidth: 460, margin: '0 auto 28px' }}>
              Every deliverable here is built for a single property in about three weeks. Let us show you what yours could become.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/6285110808158" target="_blank" rel="noreferrer" style={{ background: '#F2F5F3', color: C.siennaD, padding: '13px 30px', fontFamily: "'Jost',sans-serif", fontSize: 12, letterSpacing: '0.08em', textDecoration: 'none' }}>Start your property</a>
              <button onClick={onClose} className="btn-outline-cream" style={{ color: '#F2F5F3', borderColor: 'rgba(255,255,255,0.3)' }}>Back to site</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const NAV_H = 72;
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - NAV_H;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function LandingPage() {
  const [onstage, setOnstage] = useState(0);
  const [svcOpen, setSvcOpen] = useState(0);
  const [showWork, setShowWork] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [form, setForm] = useState({ name: '', phone: '', email: '', needs: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const MSG_MAX = 400;

  const setField = (field: string, value: string) =>
    setForm(f => ({ ...f, [field]: value }));
  const touch = (field: string) =>
    setTouched(t => ({ ...t, [field]: true }));

  const errors = {
    name:  !form.name.trim()             ? 'Required' : '',
    email: !form.email.includes('@')     ? 'Valid email required' : '',
    needs: !form.needs                   ? 'Required' : '',
  };
  const isValid = !errors.name && !errors.email && !errors.needs;

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, needs: true });
    if (!isValid) return;
    setFormStatus('sending');
    const lines = [
      `Name: ${form.name}`,
      form.phone ? `Phone: ${form.phone}` : '',
      `Email: ${form.email}`,
      `Looking for: ${form.needs}`,
      form.message ? `Message: ${form.message}` : '',
    ].filter(Boolean);
    const text = encodeURIComponent(
      `New inquiry from the Nakama Partners website\n\n${lines.join('\n')}`,
    );
    const opened = window.open(
      `https://wa.me/6285110808158?text=${text}`,
      '_blank',
      'noopener,noreferrer',
    );
    if (!opened) {
      setFormStatus('error');
      return;
    }
    setFormStatus('success');
    setForm({ name: '', phone: '', email: '', needs: '', message: '' });
    setTouched({});
  };

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
        display: 'flex', alignItems: 'center',
        padding: '0 clamp(20px,5vw,56px)', height: 72,
        background: '#ffffff',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <NakamaLogo height={36} />
        </div>
        <div className="nav-links-center">
          {([['Services','services'],['Process','process'],['About','about'],['Stories','stories']] as [string,string][]).map(([l,id]) => (
            <span key={l} className="nav-link" style={{ cursor:'pointer' }} onClick={() => scrollToSection(id)}>{l}</span>
          ))}
          <span
            className="nav-link nav-preview-btn"
            style={{ cursor:'pointer' }}
            onClick={() => setShowWork(true)}
          >Preview <span className="arrow">→</span></span>
        </div>
        <div className="nav-desktop-only" style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
          <button className="btn-primary" onClick={() => scrollToSection('contact')} style={{ padding: '9px 20px', fontSize: 12, cursor: 'pointer' }}>Grow with Nakama</button>
          <a href="https://wa.me/6285110808158" target="_blank" rel="noreferrer" className="btn-ghost nav-chat-btn" style={{ padding: '9px 20px', fontSize: 12, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>Chat with us</a>
        </div>
        <button
          className="nav-burger"
          aria-label={mobileMenu ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenu}
          onClick={() => setMobileMenu(v => !v)}
        >
          <span className={`nav-burger-line${mobileMenu ? ' x1' : ''}`} />
          <span className={`nav-burger-line${mobileMenu ? ' x2' : ''}`} />
          <span className={`nav-burger-line${mobileMenu ? ' x3' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div className={`nav-mobile-panel${mobileMenu ? ' open' : ''}`}>
        {([['Services','services'],['Process','process'],['About','about'],['Stories','stories']] as [string,string][]).map(([l,id]) => (
          <span key={l} className="nav-mobile-link" onClick={() => { scrollToSection(id); setMobileMenu(false); }}>{l}</span>
        ))}
        <span className="nav-mobile-link" onClick={() => { setShowWork(true); setMobileMenu(false); }}>Preview</span>
        <div className="nav-mobile-cta">
          <button className="btn-primary" style={{ width: '100%', textAlign: 'center' }} onClick={() => { scrollToSection('contact'); setMobileMenu(false); }}>Grow with Nakama</button>
          <a href="https://wa.me/6285110808158" target="_blank" rel="noreferrer" className="btn-ghost nav-chat-btn" style={{ width: '100%', textAlign: 'center', textDecoration: 'none', display: 'inline-block', boxSizing: 'border-box' }} onClick={() => setMobileMenu(false)}>Chat with us</a>
        </div>
      </div>

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
              opacity: 0.19,
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              linear-gradient(to right, ${C.bg} 28%, rgba(255,255,255,0.28) 50%, transparent 86%),
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
                <button className="btn-primary" onClick={() => scrollToSection('contact')}>Grow with Nakama</button>
                <a href="https://wa.me/6285110808158" target="_blank" rel="noreferrer" className="btn-ghost" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Chat with us</a>
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

            <div className="svc-acc-col reveal d2">
              {/* Tab selector rows — these never change height regardless of active state */}
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
                    {/* Active indicator bar — replaces expanding chevron */}
                    <div style={{ width: 22, height: 2, borderRadius: 2, flexShrink: 0, background: svcOpen === i ? C.sienna : 'rgba(0,0,0,0.10)', transition: 'background 0.3s ease' }}/>
                  </div>
                </div>
              ))}

              {/* Description panel — position:absolute overlay means zero layout impact when switching */}
              <div style={{ position: 'relative', height: 210, marginTop: 16 }}>
                {SERVICES_ACC.map((svc, i) => (
                  <div key={i} style={{
                    position: 'absolute', inset: 0,
                    padding: '4px 0 0 clamp(24px,3vw,40px)',
                    opacity: svcOpen === i ? 1 : 0,
                    transform: svcOpen === i ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'opacity 0.45s ease, transform 0.45s ease',
                    pointerEvents: svcOpen === i ? 'auto' : 'none',
                  }}>
                    <p style={{ fontSize: 15, color: C.stone, lineHeight: 2.0, fontWeight: 300, marginBottom: 24 }}>
                      {svc.desc}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 24, height: 1, background: C.sienna, flexShrink: 0 }}/>
                      <span style={{ fontSize: 13, color: C.sienna, fontWeight: 500, lineHeight: 1.6 }}>{svc.result}</span>
                    </div>
                  </div>
                ))}
              </div>
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

            {/* Left: text — fixed height on all devices, content cross-fades in absolute overlay */}
            <div className="onboard-left" style={{ height: 440, overflow: 'hidden', position: 'relative' }}>
              {/* Dot nav always visible at top */}
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
              {/* Panels — position:absolute so layout never shifts */}
              <div style={{ position: 'relative', flex: 1 }}>
                {ONBOARD.map((stage, i) => (
                  <div key={i} style={{
                    position: 'absolute', inset: 0,
                    opacity: onstage === i ? 1 : 0,
                    transform: onstage === i ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'opacity 0.42s ease, transform 0.42s ease',
                    pointerEvents: onstage === i ? 'auto' : 'none',
                  }}>
                    <h3 className="display" style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 700, color: C.cream, lineHeight: 1.25, marginBottom: 16 }}>
                      {stage.title}
                    </h3>
                    <p style={{ fontSize: 15, color: C.stone, lineHeight: 1.9, fontWeight: 300, marginBottom: 24 }}>
                      {stage.desc}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                      {stage.tags.map((tag, ti) => (
                        <span key={tag} style={{
                          padding: '5px 11px',
                          border: '1px solid rgba(0,0,0,0.13)',
                          fontSize: 9,
                          letterSpacing: 1.4,
                          color: C.stoneL,
                          fontFamily: "'Jost',sans-serif",
                          animation: `obUp 0.3s ease ${ti * 0.07}s both`,
                        }}>{tag.toUpperCase()}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: visual card — kept dark as a "device" mockup */}
            <div className="onboard-right" style={{ border: `1px solid rgba(0,0,0,0.10)`, background: '#0D1710', overflow: 'hidden', position: 'relative', height: 440 }}>
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
                <div className="display" style={{ fontSize: 'clamp(15px,1.8vw,18px)', fontWeight: 700, color: C.cream, lineHeight: 1.25, marginBottom: 10, minHeight: '2.5em' }}>{s.title}</div>
                <p className="svc-tag-body" style={{ fontSize: 13, color: C.stone, lineHeight: 1.8, fontWeight: 300, marginBottom: 16, minHeight: '7.2em' }}>{s.body}</p>
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
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              minHeight: 240,
            }}>
              {/* Fixed-height block keeps the divider aligned across all cells */}
              <div style={{ height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <div className="display" style={{ fontSize: 'clamp(38px,4.5vw,60px)', fontWeight: 800, color: '#F2F5F3', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 10 }}>{num}</div>
                <div className="label" style={{ color: '#7FB89A', fontSize: 9 }}>{unit}</div>
              </div>
              <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.12)', marginBottom: 16 }} />
              <p style={{ fontSize: 11.5, color: 'rgba(242,245,243,0.7)', lineHeight: 1.75, fontWeight: 300 }}>{sub}</p>
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
            <button className="btn-primary" onClick={() => scrollToSection('contact')}>Grow with Nakama</button>
            <a href="https://wa.me/6285110808158" target="_blank" rel="noreferrer" className="btn-outline-cream" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Chat with us</a>
          </div>
          <div className="reveal d4 trust-bar">
            {['Response within 24h', 'No lock-in contracts', 'Bilingual support', 'Bali market specialists'].map((item, i, arr) => (
              <span key={item} className="trust-item" style={{ borderRight: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="sec-pad" style={{ background: C.bgMid, borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'clamp(280px,38%,400px) 1fr', gap: 'clamp(40px,7vw,96px)', alignItems: 'start' }}>

            {/* Left: headline */}
            <div className="reveal d1">
              <span className="label" style={{ color: C.sienna, display: 'block', marginBottom: 20 }}>Get in touch</span>
              <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, lineHeight: 1.07, color: C.cream, letterSpacing: '-0.02em', marginBottom: 22 }}>
                Tell us about<br />your property.
              </h2>
              <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.9, fontWeight: 300, marginBottom: 28 }}>
                Leave your details and we will come back to you within 24 hours. No commitment needed for a first conversation.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: 'M2 2 L7 7 L12 2', label: 'contact@nakama.partners' },
                  { icon: 'M1 3.5 Q6 0 8 3.5 Q10 7 14.5 4.5', label: 'WhatsApp: +62 851 1080 8158' },
                ].map(({ icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ width: 7, height: 7, background: C.siennaL, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: C.stone, fontWeight: 300 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="reveal d2">
              {formStatus === 'success' ? (
                <div style={{ padding: 'clamp(36px,5vw,56px)', background: C.siennaD, textAlign: 'center' }}>
                  <svg width="44" height="44" viewBox="0 0 44 44" style={{ margin: '0 auto 20px', display: 'block' }}>
                    <circle cx="22" cy="22" r="20" stroke={C.siennaL} strokeWidth="1.5" fill="none" />
                    <path d="M12 22 L19 29 L32 15" stroke="#F2F5F3" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h3 className="display" style={{ fontSize: 22, fontWeight: 700, color: '#F2F5F3', marginBottom: 10 }}>Message received.</h3>
                  <p style={{ fontSize: 14, color: 'rgba(242,245,243,0.65)', fontWeight: 300, lineHeight: 1.75, maxWidth: 320, margin: '0 auto 24px' }}>
                    We will be in touch within 24 hours. In the meantime, feel free to reach us on WhatsApp.
                  </p>
                  <button className="btn-outline-cream" style={{ color: '#F2F5F3', borderColor: 'rgba(255,255,255,0.28)', fontSize: 12 }} onClick={() => setFormStatus('idle')}>Send another</button>
                </div>
              ) : (
                <form onSubmit={handleInquiry} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="form-row">
                    <div>
                      <label className="label" style={{ display: 'block', fontSize: 9, color: C.stone, marginBottom: 7 }}>Name *</label>
                      <input
                        className={`form-field${touched.name && errors.name ? ' err' : ''}`}
                        type="text" placeholder="Your name"
                        value={form.name}
                        onChange={e => setField('name', e.target.value)}
                        onBlur={() => touch('name')}
                      />
                      {touched.name && errors.name && <p style={{ fontSize: 11, color: '#c0392b', marginTop: 5, fontFamily: "'Jost',sans-serif" }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label className="label" style={{ display: 'block', fontSize: 9, color: C.stone, marginBottom: 7 }}>Phone</label>
                      <input
                        className="form-field"
                        type="tel" placeholder="+62 8xx xxxx xxxx"
                        value={form.phone}
                        onChange={e => setField('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label" style={{ display: 'block', fontSize: 9, color: C.stone, marginBottom: 7 }}>Email *</label>
                    <input
                      className={`form-field${touched.email && errors.email ? ' err' : ''}`}
                      type="email" placeholder="you@example.com"
                      value={form.email}
                      onChange={e => setField('email', e.target.value)}
                      onBlur={() => touch('email')}
                    />
                    {touched.email && errors.email && <p style={{ fontSize: 11, color: '#c0392b', marginTop: 5, fontFamily: "'Jost',sans-serif" }}>{errors.email}</p>}
                  </div>

                  <div>
                    <label className="label" style={{ display: 'block', fontSize: 9, color: C.stone, marginBottom: 7 }}>What do you need? *</label>
                    <select
                      className={`form-field${touched.needs && errors.needs ? ' err' : ''}`}
                      value={form.needs}
                      onChange={e => { setField('needs', e.target.value); touch('needs'); }}
                      onBlur={() => touch('needs')}
                    >
                      <option value="">Select one</option>
                      <option value="Website for my property">Website for my property</option>
                      <option value="Digital guest handbook">Digital guest handbook</option>
                      <option value="Full suite — website, handbook, WhatsApp and email">Full suite — website, handbook, WhatsApp and email</option>
                      <option value="Brand strategy and positioning">Brand strategy and positioning</option>
                      <option value="Not sure yet, let's talk">Not sure yet, let's talk</option>
                    </select>
                    {touched.needs && errors.needs && <p style={{ fontSize: 11, color: '#c0392b', marginTop: 5, fontFamily: "'Jost',sans-serif" }}>{errors.needs}</p>}
                  </div>

                  <div>
                    <label className="label" style={{ display: 'block', fontSize: 9, color: C.stone, marginBottom: 7 }}>Anything else you want to share?</label>
                    <textarea
                      className="form-field"
                      rows={4} placeholder="Tell us about your property, your current situation, or anything useful..."
                      value={form.message}
                      onChange={e => setField('message', e.target.value.slice(0, MSG_MAX))}
                      style={{ resize: 'none' }}
                    />
                    <p className={`char-count${form.message.length > MSG_MAX * 0.9 ? ' warn' : ''}`}>
                      {form.message.length} / {MSG_MAX}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 4 }}>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={formStatus === 'sending'}
                      style={{ opacity: formStatus === 'sending' ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: 10, cursor: formStatus === 'sending' ? 'default' : 'pointer' }}
                    >
                      {formStatus === 'sending' ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 14 14" style={{ animation: 'spin 1s linear infinite' }}><circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" /><path d="M7 1.5 A5.5 5.5 0 0 1 12.5 7" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
                          Sending...
                        </>
                      ) : 'Send inquiry'}
                    </button>
                    {formStatus === 'error' && (
                      <p style={{ fontSize: 12, color: '#c0392b', fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>
                        Something went wrong. Try WhatsApp instead.
                      </p>
                    )}
                  </div>
                  <p style={{ fontSize: 11, color: C.stoneL, fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>We respond within 24 hours. No spam, no commitment.</p>
                </form>
              )}
            </div>
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

      {showWork && <WorkShowcase onClose={() => setShowWork(false)} />}
    </div>
  );
}

export default LandingPage;
