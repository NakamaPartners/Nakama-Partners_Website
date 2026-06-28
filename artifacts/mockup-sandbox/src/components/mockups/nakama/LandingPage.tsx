import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageSquare, Globe, PenTool, Users, CheckCircle, Star, ChevronRight } from 'lucide-react';

export function LandingPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sk-in');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.sk').forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const services = [
    {
      num: '01',
      title: 'Property Website',
      sub: 'Direct booking. Zero commission.',
      desc: 'We design and build bespoke websites that convert visitors into paying guests — bypassing OTA commissions entirely. Each site is crafted around your property\'s character, not a generic template.',
      points: ['Custom design & copywriting', 'Direct booking engine', 'SEO optimised from day one', 'Mobile-first, fast loading'],
    },
    {
      num: '02',
      title: 'WhatsApp Automation',
      sub: '24/7 responses in your voice.',
      desc: 'An intelligent assistant that answers guest enquiries instantly, qualifies leads, and confirms bookings — even while you sleep. Feels human, works around the clock.',
      points: ['Instant enquiry responses', 'Lead qualification flows', 'Booking confirmation links', 'Bilingual support ready'],
    },
    {
      num: '03',
      title: 'OTA Integration',
      sub: 'One calendar, every platform.',
      desc: 'We sync your property across Airbnb, Booking.com, Agoda, and VRBO — eliminating double bookings and maximising your occupancy with real-time channel management.',
      points: ['Real-time calendar sync', 'Dynamic pricing rules', 'Centralised inbox', 'Analytics dashboard'],
    },
  ];

  const testimonials = [
    {
      name: 'Rina Hartono',
      role: 'Villa Owner · Bali',
      quote: 'Within 3 months of working with Nakama, our direct bookings tripled. The website they built tells our story in a way no listing page ever could.',
      stars: 5,
    },
    {
      name: 'Ahmad Zulkifli',
      role: 'Property Manager · KL',
      quote: 'The WhatsApp bot they set up handles 80% of our enquiries automatically. We spend our time hosting guests, not answering the same questions.',
      stars: 5,
    },
    {
      name: 'Sita Pramana',
      role: 'Boutique Hotel · Yogyakarta',
      quote: 'Professional, caring, and genuinely invested in our success. They feel like an extension of our team, not an outside agency.',
      stars: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .sk {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sk.sk-in { opacity: 1; transform: none; }
        .sk-d1 { transition-delay: 0.1s; }
        .sk-d2 { transition-delay: 0.18s; }
        .sk-d3 { transition-delay: 0.26s; }

        .f-sketch { font-family: 'Caveat', cursive; }
        .f-body   { font-family: 'Outfit', sans-serif; }

        /* Hand-drawn border — wobble border-radius trick */
        .hd-border {
          border: 1.8px solid #1a1a1a;
          border-radius: 255px 8px 230px 8px / 8px 230px 8px 255px;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .hd-border:hover {
          box-shadow: 3px 4px 0 #d0d0d0;
          transform: translateY(-2px);
        }

        /* Subtle sketch card */
        .sk-card {
          border: 1px solid #e8e8e8;
          border-radius: 4px 12px 4px 12px / 12px 4px 12px 4px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
          background: white;
        }
        .sk-card:hover {
          border-color: #1a1a1a;
          box-shadow: 4px 6px 0 #f0f0f0;
          transform: translateY(-3px);
        }

        /* Trust badge */
        .trust-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #e0e0e0;
          border-radius: 100px;
          padding: 4px 12px;
          font-size: 12px;
          color: #666;
          background: #fafafa;
        }

        /* Primary button */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #1a1a1a;
          color: white;
          font-family: 'Caveat', cursive;
          font-size: 22px;
          font-weight: 600;
          padding: 14px 36px;
          border: 2px solid #1a1a1a;
          border-radius: 255px 8px 230px 8px / 8px 230px 8px 255px;
          cursor: pointer;
          transition: all 0.22s ease;
        }
        .btn-primary:hover {
          background: transparent;
          color: #1a1a1a;
          box-shadow: 4px 6px 0 #e0e0e0;
          transform: translateY(-2px);
        }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #1a1a1a;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 12px 0;
          border: none;
          cursor: pointer;
          border-bottom: 1.5px solid #1a1a1a;
          transition: gap 0.2s ease;
          letter-spacing: 0.01em;
        }
        .btn-ghost:hover { gap: 14px; }

        /* Service tab */
        .svc-tab {
          padding: 20px 24px;
          border-left: 2px solid transparent;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .svc-tab.active {
          border-left-color: #1a1a1a;
          background: #fafafa;
        }

        /* Soft section separator */
        .sep {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e5e5e5 20%, #e5e5e5 80%, transparent);
        }

        /* Stat counter */
        .stat-num {
          font-family: 'Caveat', cursive;
          font-size: 52px;
          font-weight: 700;
          line-height: 1;
          color: #1a1a1a;
        }

        /* Inline sketch dashes for headings */
        .underline-sketch {
          position: relative;
          display: inline-block;
        }
        .underline-sketch::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 3px;
          background: url("data:image/svg+xml,%3Csvg width='200' height='6' viewBox='0 0 200 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 4 Q50 1 100 4 T200 4' stroke='%231a1a1a' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") repeat-x center;
          background-size: 100% 100%;
        }

        /* Checklist */
        .check-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid #f5f5f5;
          font-size: 15px;
          color: #444;
        }
        .check-item:last-child { border-bottom: none; }

        /* Tag label */
        .tag {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #999;
          font-family: 'Outfit', sans-serif;
        }

        /* Marquee strip */
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-inner {
          display: flex;
          gap: 0;
          animation: marquee 22s linear infinite;
          width: max-content;
        }

        /* Arch grid subtle */
        .arch-grid-subtle {
          background-image:
            linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Process step */
        .process-step {
          display: flex;
          gap: 24px;
          align-items: flex-start;
          padding: 32px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .process-step:last-child { border-bottom: none; }

        /* Star rating */
        .stars { color: #1a1a1a; letter-spacing: 2px; font-size: 14px; }
      `}} />

      {/* ─── NAV ─────────────────────────────────────────────────── */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 32px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <rect x="2" y="8" width="22" height="16" rx="1" stroke="#1a1a1a" strokeWidth="1.6" fill="none"/>
              <path d="M2 13 L13 3 L24 13" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <rect x="10" y="17" width="6" height="7" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
            </svg>
            <span className="f-sketch" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.02em' }}>Nakama.</span>
          </div>
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            {['Services', 'Process', 'About', 'Work'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 14, color: '#555', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1a1a1a')}
                onMouseLeave={e => (e.currentTarget.style.color = '#555')}>{l}</a>
            ))}
            <button className="btn-primary" style={{ fontSize: 18, padding: '10px 28px' }}>
              Grow with Nakama
            </button>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: 68 }}>

        {/* ─── HERO ──────────────────────────────────────────────── */}
        <section className="arch-grid-subtle" style={{ minHeight: '88vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 32px 60px', position: 'relative', overflow: 'hidden' }}>

          {/* Corner markers */}
          {[['top:24px;left:24px', 'M2 18 L2 2 L18 2'], ['top:24px;right:24px', 'M22 18 L22 2 L6 2'], ['bottom:24px;left:24px', 'M2 6 L2 22 L18 22'], ['bottom:24px;right:24px', 'M22 6 L22 22 L6 22']].map(([pos, d], i) => (
            <svg key={i} width="24" height="24" viewBox="0 0 24 24" style={{ position: 'absolute', ...Object.fromEntries(pos.split(';').map(p => p.split(':'))), opacity: 0.2 }} fill="none">
              <path d={d as string} stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
          ))}

          <div style={{ maxWidth: 1160, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div className="sk">
              <div className="trust-pill" style={{ marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                Property Branding Studio · Est. 2024
              </div>
              <h1 className="f-sketch" style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.01em' }}>
                Your property,<br />
                <span className="underline-sketch">unforgettable.</span>
              </h1>
              <p className="f-body" style={{ fontSize: 18, color: '#555', lineHeight: 1.7, marginBottom: 36, maxWidth: 440 }}>
                We build the brand, website, and digital systems that turn your property into a sought-after destination — and keep guests coming back.
              </p>
              <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                <button className="btn-primary">
                  <Users size={18} />
                  Grow with Nakama
                </button>
                <button className="btn-ghost">
                  See how it works <ArrowRight size={15} />
                </button>
              </div>
              <div style={{ marginTop: 40, display: 'flex', gap: 32 }}>
                {[['3×', 'More bookings'], ['40%', 'Higher ADR'], ['24/7', 'Guest support']].map(([n, l]) => (
                  <div key={l}>
                    <div className="f-sketch" style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural property illustration */}
            <div className="sk sk-d1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg width="420" height="420" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Ground */}
                <line x1="30" y1="370" x2="390" y2="370" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>

                {/* Main building body */}
                <rect x="110" y="120" width="200" height="250" stroke="#1a1a1a" strokeWidth="2" fill="white"/>
                {/* Roof */}
                <path d="M95 120 L210 40 L325 120" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="white"/>
                {/* Chimney */}
                <rect x="240" y="52" width="20" height="38" stroke="#1a1a1a" strokeWidth="1.5" fill="white"/>

                {/* Windows — row 1 */}
                <rect x="126" y="148" width="36" height="44" rx="2" stroke="#1a1a1a" strokeWidth="1.4" fill="none"/>
                <line x1="144" y1="148" x2="144" y2="192" stroke="#1a1a1a" strokeWidth="0.9"/>
                <line x1="126" y1="170" x2="162" y2="170" stroke="#1a1a1a" strokeWidth="0.9"/>
                <rect x="192" y="148" width="36" height="44" rx="2" stroke="#1a1a1a" strokeWidth="1.4" fill="none"/>
                <line x1="210" y1="148" x2="210" y2="192" stroke="#1a1a1a" strokeWidth="0.9"/>
                <line x1="192" y1="170" x2="228" y2="170" stroke="#1a1a1a" strokeWidth="0.9"/>
                <rect x="258" y="148" width="36" height="44" rx="2" stroke="#1a1a1a" strokeWidth="1.4" fill="none"/>
                <line x1="276" y1="148" x2="276" y2="192" stroke="#1a1a1a" strokeWidth="0.9"/>
                <line x1="258" y1="170" x2="294" y2="170" stroke="#1a1a1a" strokeWidth="0.9"/>

                {/* Windows — row 2 */}
                <rect x="126" y="218" width="36" height="44" rx="2" stroke="#1a1a1a" strokeWidth="1.4" fill="none"/>
                <line x1="144" y1="218" x2="144" y2="262" stroke="#1a1a1a" strokeWidth="0.9"/>
                <line x1="126" y1="240" x2="162" y2="240" stroke="#1a1a1a" strokeWidth="0.9"/>
                <rect x="258" y="218" width="36" height="44" rx="2" stroke="#1a1a1a" strokeWidth="1.4" fill="none"/>
                <line x1="276" y1="218" x2="276" y2="262" stroke="#1a1a1a" strokeWidth="0.9"/>
                <line x1="258" y1="240" x2="294" y2="240" stroke="#1a1a1a" strokeWidth="0.9"/>

                {/* Door */}
                <rect x="176" y="290" width="68" height="80" rx="2" stroke="#1a1a1a" strokeWidth="1.6" fill="none"/>
                <path d="M176 290 Q210 268 244 290" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
                <circle cx="239" cy="330" r="3" fill="#1a1a1a"/>

                {/* Steps */}
                <rect x="166" y="362" width="88" height="8" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
                <rect x="174" y="356" width="72" height="8" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>

                {/* Dimension lines */}
                <line x1="330" y1="120" x2="348" y2="120" stroke="#888" strokeWidth="0.8" strokeDasharray="3 2"/>
                <line x1="330" y1="370" x2="348" y2="370" stroke="#888" strokeWidth="0.8" strokeDasharray="3 2"/>
                <line x1="344" y1="120" x2="344" y2="370" stroke="#888" strokeWidth="0.8"/>
                <line x1="340" y1="120" x2="348" y2="120" stroke="#888" strokeWidth="1"/>
                <line x1="340" y1="370" x2="348" y2="370" stroke="#888" strokeWidth="1"/>
                <text x="356" y="250" fill="#999" fontSize="11" fontFamily="Outfit, sans-serif">H</text>

                <line x1="110" y1="385" x2="110" y2="400" stroke="#888" strokeWidth="0.8" strokeDasharray="3 2"/>
                <line x1="310" y1="385" x2="310" y2="400" stroke="#888" strokeWidth="0.8" strokeDasharray="3 2"/>
                <line x1="110" y1="396" x2="310" y2="396" stroke="#888" strokeWidth="0.8"/>
                <line x1="110" y1="392" x2="110" y2="400" stroke="#888" strokeWidth="1"/>
                <line x1="310" y1="392" x2="310" y2="400" stroke="#888" strokeWidth="1"/>
                <text x="204" y="414" fill="#999" fontSize="11" fontFamily="Outfit, sans-serif" textAnchor="middle">W</text>

                {/* Annotation label */}
                <text x="210" y="24" fill="#aaa" fontSize="10" fontFamily="Outfit, sans-serif" textAnchor="middle" letterSpacing="2">ELEVATION — FRONT VIEW</text>

                {/* Small stars floating */}
                <text x="68" y="180" fill="#1a1a1a" fontSize="13" fontFamily="Caveat, cursive" opacity="0.5">★★★★★</text>
                <text x="56" y="198" fill="#888" fontSize="9" fontFamily="Outfit, sans-serif" opacity="0.5">Fully Booked</text>

                {/* Sketch hatching on roof — light */}
                <line x1="155" y1="110" x2="210" y2="55" stroke="#ddd" strokeWidth="0.7"/>
                <line x1="175" y1="115" x2="240" y2="50" stroke="#ddd" strokeWidth="0.7"/>
                <line x1="200" y1="118" x2="268" y2="52" stroke="#ddd" strokeWidth="0.7"/>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── MARQUEE TRUST STRIP ──────────────────────────────── */}
        <div style={{ background: '#1a1a1a', color: 'white', padding: '14px 0', overflow: 'hidden' }}>
          <div className="marquee-inner">
            {Array(2).fill(null).map((_, ri) => (
              <React.Fragment key={ri}>
                {['Property Website Design', '✦', 'WhatsApp Bot Automation', '✦', 'OTA Integration', '✦', 'Brand Identity', '✦', 'Guest Experience Strategy', '✦', 'Revenue Optimisation', '✦'].map((item, i) => (
                  <span key={`${ri}-${i}`} className="f-sketch" style={{ fontSize: 18, whiteSpace: 'nowrap', padding: '0 28px', opacity: item === '✦' ? 0.4 : 1 }}>{item}</span>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ─── STATS / TRUST BAR ───────────────────────────────── */}
        <section style={{ padding: '72px 32px', background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 40, textAlign: 'center' }}>
            {[
              { num: '3×', label: 'More bookings', sub: 'vs generic listings' },
              { num: '40%', label: 'Higher nightly rate', sub: 'for branded properties' },
              { num: '85%', label: 'Enquiries automated', sub: 'via WhatsApp bot' },
              { num: '100%', label: 'Hands-on partnership', sub: 'not a template factory' },
            ].map((s, i) => (
              <div key={i} className="sk" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="stat-num">{s.num}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginTop: 8 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: '#aaa', marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ABOUT ───────────────────────────────────────────── */}
        <section id="about" style={{ padding: '100px 32px' }}>
          <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' }}>

            {/* Left: illustrated portrait of 2 founders */}
            <div className="sk" style={{ position: 'relative' }}>
              <svg width="440" height="380" viewBox="0 0 440 380" fill="none">
                {/* Background grid suggestion */}
                <rect x="20" y="20" width="400" height="340" stroke="#f0f0f0" strokeWidth="1" rx="4"/>

                {/* Desk surface */}
                <rect x="40" y="280" width="360" height="20" stroke="#e0e0e0" strokeWidth="1" fill="#fafafa"/>
                {/* Laptop suggestion */}
                <rect x="100" y="220" width="100" height="68" rx="3" stroke="#1a1a1a" strokeWidth="1.6" fill="white"/>
                <rect x="104" y="224" width="92" height="56" rx="1" stroke="#e0e0e0" strokeWidth="0.8" fill="#fafafa"/>
                <rect x="82" y="288" width="136" height="6" rx="2" stroke="#1a1a1a" strokeWidth="1.2" fill="white"/>
                {/* Screen content lines */}
                <line x1="112" y1="236" x2="188" y2="236" stroke="#ddd" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="112" y1="246" x2="170" y2="246" stroke="#eee" strokeWidth="1" strokeLinecap="round"/>
                <line x1="112" y1="254" x2="180" y2="254" stroke="#eee" strokeWidth="1" strokeLinecap="round"/>
                <rect x="112" y="262" width="28" height="10" rx="2" stroke="#1a1a1a" strokeWidth="1" fill="none"/>

                {/* Figure 1 — left, seated */}
                <ellipse cx="140" cy="175" rx="24" ry="24" stroke="#1a1a1a" strokeWidth="2" fill="white"/>
                {/* Hair lines */}
                <path d="M116 162 Q120 148, 140 146 Q160 148 164 162" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
                {/* Body */}
                <path d="M140 199 L140 230" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round"/>
                {/* Arms on desk */}
                <path d="M115 215 L140 210 L165 218" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                {/* Legs */}
                <path d="M140 230 L125 280" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
                <path d="M140 230 L155 280" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>

                {/* Figure 2 — right, standing, pointing */}
                <ellipse cx="290" cy="130" rx="24" ry="24" stroke="#666" strokeWidth="2" fill="white"/>
                <path d="M266 118 Q270 104, 290 102 Q310 104 314 118" stroke="#666" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M290 154 L290 240" stroke="#666" strokeWidth="2.2" strokeLinecap="round"/>
                {/* Arm pointing at screen */}
                <path d="M290 185 L240 220" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
                <path d="M237 218 L235 226 L244 224" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                {/* Other arm */}
                <path d="M290 185 L320 175" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
                {/* Legs */}
                <path d="M290 240 L275 280" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
                <path d="M290 240 L305 280" stroke="#666" strokeWidth="2" strokeLinecap="round"/>

                {/* Dashed line connecting the two */}
                <path d="M164 185 Q215 160 266 148" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="4 4" fill="none" strokeLinecap="round"/>

                {/* Labels */}
                <text x="140" y="142" textAnchor="middle" fill="#aaa" fontSize="10" fontFamily="Outfit, sans-serif">You</text>
                <text x="290" y="97" textAnchor="middle" fill="#aaa" fontSize="10" fontFamily="Outfit, sans-serif">Nakama</text>

                {/* Speech bubble */}
                <rect x="300" y="54" width="110" height="36" rx="6" stroke="#1a1a1a" strokeWidth="1.3" fill="white"/>
                <path d="M308 90 L302 100 L316 90" stroke="#1a1a1a" strokeWidth="1.3" fill="white" strokeLinejoin="round"/>
                <text x="355" y="76" textAnchor="middle" fill="#1a1a1a" fontSize="10" fontFamily="Caveat, cursive" fontWeight="600">Let's grow this.</text>

                {/* Floor plan inset — bottom right */}
                <rect x="330" y="210" width="80" height="60" stroke="#ddd" strokeWidth="1" fill="white"/>
                <rect x="330" y="210" width="40" height="30" stroke="#eee" strokeWidth="0.8" fill="none"/>
                <rect x="370" y="210" width="40" height="30" stroke="#eee" strokeWidth="0.8" fill="none"/>
                <rect x="345" y="240" width="30" height="30" stroke="#eee" strokeWidth="0.8" fill="none"/>
                <text x="370" y="278" textAnchor="middle" fill="#ccc" fontSize="8" fontFamily="Outfit, sans-serif">Floor Plan</text>
              </svg>
            </div>

            <div className="sk sk-d1">
              <div className="tag" style={{ marginBottom: 14 }}>About Nakama</div>
              <h2 className="f-sketch" style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
                Two companions.<br/>One mission.
              </h2>
              <p style={{ fontSize: 16, color: '#555', lineHeight: 1.8, marginBottom: 16 }}>
                <strong className="f-sketch" style={{ fontSize: 20, color: '#1a1a1a' }}>仲間 (Nakama)</strong> means people who grow together. We're not an agency with a roster of account managers — we're two people who genuinely care about your property's success.
              </p>
              <p style={{ fontSize: 16, color: '#555', lineHeight: 1.8, marginBottom: 32 }}>
                When you work with us, you get direct access to the people doing the work. No hand-offs, no junior teams. We sit on the same side of the table and build something that lasts.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Dedicated point of contact from day one', 'Strategy, design, and tech — all in-house', 'Long-term partnerships, not one-off projects'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle size={16} style={{ color: '#1a1a1a', flexShrink: 0 }} />
                    <span style={{ fontSize: 15, color: '#444' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="sep" />

        {/* ─── SERVICES ─────────────────────────────────────────── */}
        <section id="services" style={{ padding: '100px 32px' }}>
          <div style={{ maxWidth: 1160, margin: '0 auto' }}>
            <div className="sk" style={{ marginBottom: 60 }}>
              <div className="tag" style={{ marginBottom: 14 }}>What we do</div>
              <h2 className="f-sketch" style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.1 }}>
                Our services.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 0, border: '1px solid #e8e8e8', borderRadius: 8 }} className="sk sk-d1">
              {/* Tab list */}
              <div style={{ borderRight: '1px solid #e8e8e8' }}>
                {services.map((s, i) => (
                  <div
                    key={i}
                    className={`svc-tab${activeService === i ? ' active' : ''}`}
                    onClick={() => setActiveService(i)}
                  >
                    <div className="tag" style={{ marginBottom: 4 }}>{s.num}</div>
                    <div className="f-sketch" style={{ fontSize: 22, fontWeight: 600, color: '#1a1a1a' }}>{s.title}</div>
                    <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Tab content */}
              <div style={{ padding: '40px 48px' }}>
                <h3 className="f-sketch" style={{ fontSize: 38, fontWeight: 700, marginBottom: 16, color: '#1a1a1a' }}>
                  {services[activeService].title}
                </h3>
                <p style={{ fontSize: 16, color: '#555', lineHeight: 1.8, marginBottom: 32 }}>
                  {services[activeService].desc}
                </p>
                <div>
                  {services[activeService].points.map((pt) => (
                    <div key={pt} className="check-item">
                      <CheckCircle size={16} style={{ color: '#1a1a1a', flexShrink: 0, marginTop: 2 }} />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
                <button className="btn-ghost" style={{ marginTop: 36 }}>
                  Learn more <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="sep" />

        {/* ─── PROCESS ──────────────────────────────────────────── */}
        <section id="process" style={{ padding: '100px 32px', background: '#fafafa' }}>
          <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100 }}>
            <div className="sk">
              <div className="tag" style={{ marginBottom: 14 }}>How it works</div>
              <h2 className="f-sketch" style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
                The drafting process.
              </h2>
              <p style={{ fontSize: 16, color: '#666', lineHeight: 1.8 }}>
                We follow a clear, repeatable process — so you always know what's happening and what's next. No surprises, no ghosting.
              </p>
            </div>

            <div className="sk sk-d1">
              {[
                { num: '01', title: 'Site Assessment', desc: 'We learn your property — its character, guests, market position, and revenue goals.' },
                { num: '02', title: 'Brand Blueprint', desc: 'We sketch the identity, messaging, website wireframes, and automation flows together.' },
                { num: '03', title: 'Build & Connect', desc: 'We construct and connect everything — tested, polished, and ready to launch.' },
                { num: '04', title: 'Grow Together', desc: 'Post-launch, we stay close — monitoring results and refining what we\'ve built.' },
              ].map((step, i) => (
                <div key={i} className="process-step">
                  <div className="f-sketch" style={{ fontSize: 36, fontWeight: 700, color: '#e0e0e0', width: 52, flexShrink: 0, lineHeight: 1 }}>{step.num}</div>
                  <div>
                    <div className="f-sketch" style={{ fontSize: 24, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 }}>{step.title}</div>
                    <div style={{ fontSize: 15, color: '#666', lineHeight: 1.7 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="sep" />

        {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
        <section style={{ padding: '100px 32px' }}>
          <div style={{ maxWidth: 1160, margin: '0 auto' }}>
            <div className="sk" style={{ textAlign: 'center', marginBottom: 60 }}>
              <div className="tag" style={{ marginBottom: 14 }}>Client stories</div>
              <h2 className="f-sketch" style={{ fontSize: 52, fontWeight: 700 }}>What our partners say.</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
              {testimonials.map((t, i) => (
                <div key={i} className={`sk-card sk sk-d${i + 1}`} style={{ padding: 32 }}>
                  <div className="stars" style={{ marginBottom: 16 }}>{'★'.repeat(t.stars)}</div>
                  <p style={{ fontSize: 15, color: '#444', lineHeight: 1.75, marginBottom: 24, fontStyle: 'italic' }}>
                    "{t.quote}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="20" r="19" stroke="#e0e0e0" strokeWidth="1"/>
                      <circle cx="20" cy="16" r="7" stroke="#1a1a1a" strokeWidth="1.4" fill="none"/>
                      <path d="M6 36 Q20 28 34 36" stroke="#1a1a1a" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                    </svg>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: '#aaa' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="sep" />

        {/* ─── CTA ─────────────────────────────────────────────── */}
        <section style={{ padding: '120px 32px', position: 'relative', overflow: 'hidden' }}>
          {/* Arch grid subtle background */}
          <div className="arch-grid-subtle" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

          {/* Corner markers */}
          {[['top:32px;left:32px', 'M2 18 L2 2 L18 2'], ['top:32px;right:32px', 'M22 18 L22 2 L6 2'], ['bottom:32px;left:32px', 'M2 6 L2 22 L18 22'], ['bottom:32px;right:32px', 'M22 6 L22 22 L6 22']].map(([pos, d], i) => (
            <svg key={i} width="24" height="24" viewBox="0 0 24 24" style={{ position: 'absolute', ...Object.fromEntries(pos.split(';').map(p => p.split(':'))), opacity: 0.15 }} fill="none">
              <path d={d as string} stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
          ))}

          <div className="sk" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div className="tag" style={{ marginBottom: 20 }}>Ready to start?</div>
            <h2 className="f-sketch" style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, marginBottom: 20 }}>
              Let's grow together.
            </h2>
            <p style={{ fontSize: 18, color: '#666', lineHeight: 1.7, marginBottom: 44 }}>
              Your property has a story worth telling. We'll help you find it, brand it, and make it earn — as true partners, not just service providers.
            </p>

            <button className="btn-primary" style={{ fontSize: 22, padding: '16px 44px', margin: '0 auto' }}>
              <Users size={20} />
              Grow with Nakama
            </button>

            <p style={{ fontSize: 13, color: '#bbb', marginTop: 20 }}>
              No sales pitch. Just a conversation between companions.
            </p>

            {/* Reassurance badges */}
            <div style={{ marginTop: 48, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Response within 24h', 'No lock-in contracts', 'Bilingual team', 'Based in Southeast Asia'].map(badge => (
                <div key={badge} className="trust-pill">
                  <CheckCircle size={11} style={{ color: '#22c55e' }} />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ──────────────────────────────────────────────── */}
      <footer style={{ background: '#1a1a1a', color: 'white', padding: '56px 32px 32px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>
            <div>
              <div className="f-sketch" style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Nakama.</div>
              <p style={{ fontSize: 13, color: '#888', lineHeight: 1.7 }}>
                Property branding studio.<br/>Growing together since 2024.
              </p>
            </div>
            {[
              { head: 'Services', links: ['Property Websites', 'WhatsApp Bots', 'OTA Integration', 'Brand Strategy'] },
              { head: 'Company', links: ['About Us', 'Our Process', 'Client Work', 'Contact'] },
              { head: 'Connect', links: ['hello@nakama.studio', 'WhatsApp Us', 'LinkedIn', 'Instagram'] },
            ].map(col => (
              <div key={col.head}>
                <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#555', marginBottom: 16 }}>{col.head}</div>
                {col.links.map(l => (
                  <div key={l} style={{ fontSize: 14, color: '#888', marginBottom: 10, cursor: 'pointer', transition: 'color 0.2s' }}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #2d2d2d', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p className="f-sketch" style={{ fontSize: 15, color: '#555' }}>© {new Date().getFullYear()} Nakama Studio. Drawn with care.</p>
            <p style={{ fontSize: 13, color: '#555' }}>Privacy · Terms</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
