import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Users, CheckCircle, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   NAKAMA — Corporate Balinese / Luxury Wood aesthetic
   Palette: Espresso · Teak · Warm Gold · Cream · Stone
───────────────────────────────────────────────────────────── */

const C = {
  espresso: '#120A04',
  teak:     '#7B4A28',
  teakLight:'#A86C45',
  gold:     '#C9A46A',
  goldLight:'#E2C99A',
  cream:    '#F5EDD8',
  creamDark:'#EDE0C4',
  stone:    '#9E9287',
  stoneLight:'#C8BFB4',
  white:    '#FDFAF5',
};

/* Balinese-inspired ornamental divider SVG */
function Ornament({ color = C.gold, opacity = 0.6 }: { color?: string; opacity?: number }) {
  return (
    <svg width="120" height="20" viewBox="0 0 120 20" fill="none" style={{ opacity }}>
      <line x1="0" y1="10" x2="46" y2="10" stroke={color} strokeWidth="0.8"/>
      <path d="M50 10 L55 4 L60 10 L65 16 L70 10" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="74" y1="10" x2="120" y2="10" stroke={color} strokeWidth="0.8"/>
      <circle cx="60" cy="10" r="2" fill={color}/>
    </svg>
  );
}

/* Balinese geometric lotus pattern — used as background motif */
function LotusBg({ size = 400, color = C.gold, opacity = 0.04 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={{ opacity, position: 'absolute', pointerEvents: 'none' }}>
      {/* Outer petals */}
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <ellipse key={i} cx="100" cy="100" rx="12" ry="38"
          stroke={color} strokeWidth="0.8" fill="none"
          transform={`rotate(${deg} 100 100)`}/>
      ))}
      {/* Inner ring */}
      <circle cx="100" cy="100" r="22" stroke={color} strokeWidth="0.8" fill="none"/>
      <circle cx="100" cy="100" r="10" stroke={color} strokeWidth="0.8" fill="none"/>
      {/* Outer frame */}
      <circle cx="100" cy="100" r="90" stroke={color} strokeWidth="0.4" fill="none"/>
      {/* Corner marks */}
      {[0,90,180,270].map((deg, i) => (
        <line key={i} x1="100" y1="12" x2="100" y2="20"
          stroke={color} strokeWidth="0.6"
          transform={`rotate(${deg} 100 100)`}/>
      ))}
    </svg>
  );
}

export function LandingPage() {
  const [activeService, setActiveService] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('nk-in'); }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.nk').forEach(el => observer.current?.observe(el));
    return () => observer.current?.disconnect();
  }, []);

  const services = [
    {
      num: '01', title: 'Property Website',
      tagline: 'Your digital address, perfected.',
      desc: 'A bespoke website crafted around your property\'s identity — not a template. Designed to convert visitors into guests and to eliminate dependency on OTA commissions.',
      points: ['Custom brand-led design & copywriting', 'Direct booking engine integration', 'SEO-optimised architecture', 'Performance-first development'],
    },
    {
      num: '02', title: 'WhatsApp Automation',
      tagline: 'Present 24 hours. Perfectly consistent.',
      desc: 'An intelligent guest-facing system that responds to enquiries instantly, qualifies leads, and guides bookings — maintaining the warmth of your brand voice around the clock.',
      points: ['Automated enquiry qualification', 'Bilingual response flows', 'Booking confirmation pipeline', 'CRM and analytics integration'],
    },
    {
      num: '03', title: 'OTA Integration',
      tagline: 'One inventory. Every platform.',
      desc: 'We connect your property across Airbnb, Booking.com, Agoda, and VRBO through a unified channel manager — eliminating double bookings and maximising calendar occupancy.',
      points: ['Real-time multi-channel sync', 'Dynamic pricing automation', 'Centralised revenue inbox', 'Performance reporting dashboard'],
    },
  ];

  const testimonials = [
    { quote: 'Within three months of working with Nakama, our direct bookings tripled. They understand that a property isn\'t just a listing — it\'s an experience.', name: 'Rina H.', role: 'Villa Owner · Seminyak, Bali' },
    { quote: 'The WhatsApp system they built handles 80% of our enquiries automatically. Our team now spends its energy hosting, not answering the same questions.', name: 'Ahmad Z.', role: 'Property Group · Kuala Lumpur' },
    { quote: 'Professional, deeply attentive, and genuinely invested. They feel less like a vendor and more like a partner who holds a stake in our success.', name: 'Sita P.', role: 'Boutique Retreat · Ubud' },
  ];

  return (
    <div style={{ background: C.espresso, color: C.cream, fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', overflowX: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; }

        .nk {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .nk.nk-in { opacity: 1; transform: none; }
        .nk.d1 { transition-delay: 0.1s; }
        .nk.d2 { transition-delay: 0.2s; }
        .nk.d3 { transition-delay: 0.3s; }

        .serif { font-family: 'Cormorant Garamond', serif; }
        .sans  { font-family: 'DM Sans', sans-serif; }

        .gold-rule { height: 1px; background: linear-gradient(90deg, transparent, ${C.gold}, transparent); border: none; margin: 0; }
        .stone-rule { height: 1px; background: linear-gradient(90deg, transparent, ${C.stone}55, transparent); border: none; margin: 0; }

        .btn-gold {
          display: inline-flex; align-items: center; gap: 10px;
          background: ${C.gold}; color: ${C.espresso};
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 15px 36px; border: none; cursor: pointer;
          transition: background 0.25s ease, transform 0.2s ease;
        }
        .btn-gold:hover { background: ${C.goldLight}; transform: translateY(-1px); }

        .btn-outline-cream {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: ${C.cream};
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 15px 36px; border: 1px solid ${C.stone}; cursor: pointer;
          transition: border-color 0.25s ease, color 0.25s ease;
        }
        .btn-outline-cream:hover { border-color: ${C.gold}; color: ${C.gold}; }

        .btn-text-gold {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: ${C.gold};
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          border: none; cursor: pointer; padding: 0;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s ease, gap 0.2s ease;
        }
        .btn-text-gold:hover { border-bottom-color: ${C.gold}; gap: 12px; }

        .nav-link {
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400;
          letter-spacing: 0.08em; color: ${C.stoneLight}; text-decoration: none;
          transition: color 0.2s ease;
        }
        .nav-link:hover { color: ${C.cream}; }

        .svc-tab {
          padding: 24px 28px; border-left: 1px solid transparent;
          cursor: pointer; transition: all 0.2s ease;
        }
        .svc-tab.active {
          border-left-color: ${C.gold};
          background: rgba(201,164,106,0.06);
        }
        .svc-tab:not(.active):hover {
          border-left-color: ${C.stone};
          background: rgba(255,255,255,0.03);
        }

        .check-row {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 0; border-bottom: 1px solid rgba(201,164,106,0.12);
          font-size: 14px; color: ${C.stoneLight}; letter-spacing: 0.01em;
        }
        .check-row:last-child { border-bottom: none; }

        .tag-label {
          font-family: 'DM Sans', sans-serif; font-size: 10px;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: ${C.gold}; margin-bottom: 16px; display: block;
        }

        .stat-block { text-align: center; padding: 40px 20px; }
        .stat-num {
          font-family: 'Cormorant Garamond', serif; font-size: 58px;
          font-weight: 300; color: ${C.gold}; line-height: 1;
        }

        .testi-card {
          padding: 48px 40px;
          border: 1px solid rgba(201,164,106,0.15);
          transition: border-color 0.25s ease;
        }
        .testi-card:hover { border-color: rgba(201,164,106,0.4); }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-inner {
          display: flex; gap: 0; width: max-content;
          animation: marquee 30s linear infinite;
        }

        /* Wood grain texture overlay on sections */
        .wood-overlay {
          background-image: repeating-linear-gradient(
            88deg,
            transparent,
            transparent 8px,
            rgba(139,94,60,0.025) 8px,
            rgba(139,94,60,0.025) 9px
          );
        }

        /* Batik/weave micro-pattern */
        .batik-bg {
          background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2 L22 12 L12 22 L2 12 Z' stroke='%23C9A46A' stroke-width='0.3' fill='none' opacity='0.18'/%3E%3C/svg%3E");
          background-size: 24px 24px;
        }
      `}} />

      {/* ─── NAV ──────────────────────────────────────────────── */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, background: C.espresso + 'F2', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${C.stone}22` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
              <path d="M2 22 L2 10 L14 1 L26 10 L26 22" stroke={C.gold} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <rect x="10" y="14" width="8" height="8" stroke={C.gold} strokeWidth="1.2" fill="none"/>
              <line x1="2" y1="22" x2="26" y2="22" stroke={C.gold} strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <span className="serif" style={{ fontSize: 26, fontWeight: 400, letterSpacing: '0.08em', color: C.cream }}>NAKAMA</span>
          </div>
          <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
            {['Services', 'Process', 'About', 'Work'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
            ))}
          </div>
          <button className="btn-gold">Grow with Nakama</button>
        </div>
      </nav>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="batik-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '120px 48px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Lotus motif background */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
          <LotusBg size={700} color={C.gold} opacity={0.055} />
        </div>

        {/* Corner wood-trim lines */}
        {(['top:48px;left:48px', 'top:48px;right:48px', 'bottom:80px;left:48px', 'bottom:80px;right:48px'] as const).map((pos, i) => {
          const isRight = pos.includes('right');
          const isBottom = pos.includes('bottom');
          const posObj: React.CSSProperties = {
            position: 'absolute',
            top: pos.includes('top') ? 48 : undefined,
            bottom: pos.includes('bottom') ? 80 : undefined,
            left: !isRight ? 48 : undefined,
            right: isRight ? 48 : undefined,
          };
          return (
            <svg key={i} width="32" height="32" viewBox="0 0 32 32" style={{ ...posObj, opacity: 0.4 }} fill="none">
              <path
                d={isBottom
                  ? (isRight ? 'M32 16 L32 32 L16 32' : 'M0 16 L0 32 L16 32')
                  : (isRight ? 'M32 16 L32 0 L16 0'  : 'M0 16 L0 0 L16 0')}
                stroke={C.gold} strokeWidth="1" strokeLinecap="round" fill="none"
              />
            </svg>
          );
        })}

        <div className="nk" style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
          <span className="tag-label">Property Branding Studio · Southeast Asia</span>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <Ornament color={C.gold} opacity={0.7} />
          </div>
          <h1 className="serif" style={{ fontSize: 80, fontWeight: 300, lineHeight: 1.08, letterSpacing: '0.03em', color: C.cream, marginBottom: 12 }}>
            Your property,
          </h1>
          <h1 className="serif" style={{ fontSize: 80, fontWeight: 300, lineHeight: 1.08, letterSpacing: '0.03em', color: C.gold, marginBottom: 36, fontStyle: 'italic' }}>
            unforgettable.
          </h1>
          <p style={{ fontSize: 17, color: C.stoneLight, lineHeight: 1.8, maxWidth: 520, margin: '0 auto 48px', fontWeight: 300 }}>
            We build the brand, digital infrastructure, and guest systems that transform your property from a listing into a destination guests seek out — and return to.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
            <button className="btn-gold">
              <Users size={15} />
              Grow with Nakama
            </button>
            <button className="btn-outline-cream">
              Our Work <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="nk d2" style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.4 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.2em', color: C.stone }}>SCROLL</span>
          <div style={{ width: 1, height: 40, background: `linear-gradient(${C.gold}, transparent)` }} />
        </div>
      </section>

      {/* ─── MARQUEE ──────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${C.gold}22`, borderBottom: `1px solid ${C.gold}22`, padding: '16px 0', overflow: 'hidden', background: `${C.teak}18` }}>
        <div className="marquee-inner">
          {Array(2).fill(null).map((_, ri) => (
            <React.Fragment key={ri}>
              {['Property Website Design', '◆', 'WhatsApp Automation', '◆', 'OTA Integration', '◆', 'Brand Identity', '◆', 'Guest Experience Strategy', '◆', 'Revenue Optimisation', '◆'].map((item, i) => (
                <span key={`${ri}-${i}`} className="serif" style={{ fontSize: 16, whiteSpace: 'nowrap', padding: '0 32px', color: item === '◆' ? C.gold : C.stone, fontStyle: item !== '◆' ? 'italic' : 'normal', letterSpacing: '0.06em' }}>{item}</span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ─── STATS ────────────────────────────────────────────── */}
      <section style={{ background: C.cream, padding: '0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {[
            { num: '3×', label: 'More Bookings', sub: 'vs unbranded listings' },
            { num: '40%', label: 'Higher ADR', sub: 'for branded properties' },
            { num: '85%', label: 'Enquiries Handled', sub: 'via WhatsApp automation' },
            { num: '100%', label: 'Bespoke', sub: 'no templates, ever' },
          ].map((s, i) => (
            <div key={i} className={`stat-block nk d${i % 3 + 1}`} style={{ borderRight: i < 3 ? `1px solid ${C.stoneLight}40` : 'none' }}>
              <div className="stat-num" style={{ color: C.teak }}>{s.num}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.espresso, marginTop: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</div>
              <div style={{ fontSize: 12, color: C.stone, marginTop: 6 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="gold-rule" />

      {/* ─── ABOUT ────────────────────────────────────────────── */}
      <section id="about" className="wood-overlay" style={{ padding: '120px 48px', background: C.espresso }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 120, alignItems: 'center' }}>

          {/* Decorative architectural panel */}
          <div className="nk" style={{ position: 'relative' }}>
            <div style={{ border: `1px solid ${C.gold}28`, padding: 48, position: 'relative' }}>
              {/* Corner accents */}
              {[{top:0,left:0}, {top:0,right:0}, {bottom:0,left:0}, {bottom:0,right:0}].map((pos, i) => (
                <div key={i} style={{ position: 'absolute', width: 16, height: 16, ...pos,
                  borderTop: (pos.top === 0 ? `2px solid ${C.gold}` : 'none'),
                  borderBottom: (pos.bottom === 0 ? `2px solid ${C.gold}` : 'none'),
                  borderLeft: (pos.left === 0 ? `2px solid ${C.gold}` : 'none'),
                  borderRight: (pos.right === 0 ? `2px solid ${C.gold}` : 'none'),
                }} />
              ))}
              <svg width="100%" height="320" viewBox="0 0 380 320" fill="none">
                {/* Balinese temple gate silhouette — Candi Bentar */}
                {/* Left gate half */}
                <path d="M60 280 L60 180 L50 170 L50 120 L60 110 L70 100 L80 80 L90 60 L95 40 L100 20 L105 40 L110 60 L120 80 L130 100 L140 110 L150 120 L150 170 L140 180 L140 280 Z"
                  stroke={C.gold} strokeWidth="1.2" fill="none" opacity="0.7"/>
                {/* Left gate decoration layers */}
                <path d="M70 280 L70 200 L65 190 L65 140 L70 130 L80 110 L90 80 L95 60 L100 40 L105 60 L110 80 L120 110 L130 130 L135 140 L135 190 L130 200 L130 280"
                  stroke={C.gold} strokeWidth="0.6" fill="none" opacity="0.3"/>
                <line x1="60" y1="180" x2="140" y2="180" stroke={C.gold} strokeWidth="0.8" opacity="0.4"/>
                <line x1="50" y1="160" x2="150" y2="160" stroke={C.gold} strokeWidth="0.6" opacity="0.3"/>
                <line x1="55" y1="140" x2="145" y2="140" stroke={C.gold} strokeWidth="0.6" opacity="0.3"/>

                {/* Right gate half */}
                <path d="M320 280 L320 180 L330 170 L330 120 L320 110 L310 100 L300 80 L290 60 L285 40 L280 20 L275 40 L270 60 L260 80 L250 100 L240 110 L230 120 L230 170 L240 180 L240 280 Z"
                  stroke={C.gold} strokeWidth="1.2" fill="none" opacity="0.7"/>
                <path d="M310 280 L310 200 L315 190 L315 140 L310 130 L300 110 L290 80 L285 60 L280 40 L275 60 L270 80 L260 110 L250 130 L245 140 L245 190 L250 200 L250 280"
                  stroke={C.gold} strokeWidth="0.6" fill="none" opacity="0.3"/>
                <line x1="240" y1="180" x2="320" y2="180" stroke={C.gold} strokeWidth="0.8" opacity="0.4"/>
                <line x1="230" y1="160" x2="330" y2="160" stroke={C.gold} strokeWidth="0.6" opacity="0.3"/>
                <line x1="235" y1="140" x2="325" y2="140" stroke={C.gold} strokeWidth="0.6" opacity="0.3"/>

                {/* Centre gap — path / void */}
                <line x1="190" y1="20" x2="190" y2="280" stroke={C.gold} strokeWidth="0.4" strokeDasharray="4 6" opacity="0.3"/>

                {/* Ground line */}
                <line x1="20" y1="280" x2="360" y2="280" stroke={C.gold} strokeWidth="1" opacity="0.5"/>

                {/* Lotus at top centre */}
                <circle cx="190" cy="15" r="6" stroke={C.gold} strokeWidth="0.8" fill="none" opacity="0.5"/>
                <circle cx="190" cy="15" r="3" fill={C.gold} opacity="0.3"/>

                {/* Decorative ground motif */}
                <path d="M140 290 Q190 278 240 290" stroke={C.gold} strokeWidth="0.7" fill="none" opacity="0.4"/>

                {/* Label */}
                <text x="190" y="310" textAnchor="middle" fill={C.stone} fontSize="9" fontFamily="DM Sans, sans-serif" letterSpacing="3">CANDI BENTAR · BALI</text>
              </svg>
            </div>
          </div>

          <div className="nk d1">
            <span className="tag-label">About Nakama</span>
            <div style={{ marginBottom: 24 }}><Ornament color={C.gold} opacity={0.5} /></div>
            <h2 className="serif" style={{ fontSize: 52, fontWeight: 300, lineHeight: 1.15, color: C.cream, marginBottom: 28, letterSpacing: '0.02em' }}>
              Two companions.<br />
              <span style={{ color: C.gold, fontStyle: 'italic' }}>One philosophy.</span>
            </h2>
            <p style={{ fontSize: 15, color: C.stoneLight, lineHeight: 1.9, marginBottom: 18, fontWeight: 300 }}>
              <strong className="serif" style={{ fontSize: 18, color: C.goldLight, fontWeight: 400 }}>仲間 (Nakama)</strong> — those who grow together. We are not an agency with account managers and junior teams. We are two individuals who hold deep personal stakes in your property's success.
            </p>
            <p style={{ fontSize: 15, color: C.stoneLight, lineHeight: 1.9, marginBottom: 36, fontWeight: 300 }}>
              Every property we take on receives our direct attention, from strategy through execution. No hand-offs. No dilution. Just two partners invested in one outcome: yours.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {['Direct access — always us, never an intermediary', 'Strategy, design, and technology — fully in-house', 'Long-term partnership model, not project-based'].map((item, i) => (
                <div key={i} className="check-row">
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.gold, flexShrink: 0, marginTop: 6 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="gold-rule" />

      {/* ─── SERVICES ─────────────────────────────────────────── */}
      <section id="services" style={{ padding: '120px 48px', background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="nk" style={{ marginBottom: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span className="tag-label" style={{ color: C.teak }}>What We Do</span>
              <h2 className="serif" style={{ fontSize: 52, fontWeight: 300, lineHeight: 1.1, color: C.espresso, letterSpacing: '0.02em' }}>
                Our services.
              </h2>
            </div>
            <p style={{ fontSize: 14, color: C.stone, maxWidth: 300, lineHeight: 1.8, textAlign: 'right', fontWeight: 300 }}>
              Three interlocking disciplines — each reinforcing the other.
            </p>
          </div>

          <div className="nk d1" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', border: `1px solid ${C.stoneLight}50` }}>
            {/* Tab list */}
            <div style={{ borderRight: `1px solid ${C.stoneLight}40`, background: `${C.creamDark}60` }}>
              {services.map((s, i) => (
                <div key={i} className={`svc-tab${activeService === i ? ' active' : ''}`}
                  onClick={() => setActiveService(i)}
                  style={{ '--tab-gold': C.gold } as React.CSSProperties}>
                  <span style={{ fontSize: 10, letterSpacing: '0.2em', color: activeService === i ? C.teak : C.stone, textTransform: 'uppercase' }}>{s.num}</span>
                  <div className="serif" style={{ fontSize: 20, fontWeight: 500, color: activeService === i ? C.espresso : C.stone, marginTop: 4, letterSpacing: '0.02em' }}>{s.title}</div>
                </div>
              ))}
            </div>

            {/* Content */}
            <div style={{ padding: '48px 56px', background: 'white' }}>
              <span style={{ fontSize: 11, letterSpacing: '0.2em', color: C.teak, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>{services[activeService].num}</span>
              <h3 className="serif" style={{ fontSize: 40, fontWeight: 400, color: C.espresso, marginBottom: 10, letterSpacing: '0.02em' }}>{services[activeService].title}</h3>
              <p className="serif" style={{ fontSize: 18, color: C.stone, fontStyle: 'italic', marginBottom: 28 }}>{services[activeService].tagline}</p>
              <p style={{ fontSize: 15, color: '#4a3f35', lineHeight: 1.85, marginBottom: 36, fontWeight: 300 }}>{services[activeService].desc}</p>
              <div>
                {services[activeService].points.map((pt) => (
                  <div key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderBottom: `1px solid ${C.stoneLight}40`, fontSize: 14, color: '#5a4f44' }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.teak, flexShrink: 0, marginTop: 6 }} />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
              <button className="btn-text-gold" style={{ marginTop: 32, color: C.teak }}>
                Learn more <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <hr className="gold-rule" />

      {/* ─── PROCESS ──────────────────────────────────────────── */}
      <section id="process" className="wood-overlay" style={{ padding: '120px 48px', background: C.espresso }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 120, alignItems: 'start' }}>
          <div className="nk">
            <span className="tag-label">Methodology</span>
            <div style={{ marginBottom: 24 }}><Ornament /></div>
            <h2 className="serif" style={{ fontSize: 52, fontWeight: 300, lineHeight: 1.1, color: C.cream, marginBottom: 28 }}>
              The drafting<br /><span style={{ color: C.gold, fontStyle: 'italic' }}>process.</span>
            </h2>
            <p style={{ fontSize: 15, color: C.stoneLight, lineHeight: 1.9, fontWeight: 300 }}>
              We follow a clear, phase-based process that keeps you informed and in control at every milestone. No surprises. No missed deadlines. No ghosting.
            </p>
            <div style={{ marginTop: 48, padding: '24px 32px', border: `1px solid ${C.gold}22`, background: `${C.gold}06` }}>
              <p className="serif" style={{ fontSize: 20, fontStyle: 'italic', color: C.goldLight, lineHeight: 1.7, fontWeight: 300 }}>
                "A house is just a building until it holds a story worth sharing."
              </p>
              <p style={{ fontSize: 12, color: C.stone, marginTop: 12, letterSpacing: '0.1em' }}>— NAKAMA STUDIO</p>
            </div>
          </div>

          <div className="nk d1">
            {[
              { num: '01', phase: 'Assessment', title: 'Site & Market Analysis', desc: 'We begin by understanding your property\'s unique character, competitive landscape, guest profile, and revenue benchmarks.' },
              { num: '02', phase: 'Design', title: 'Brand & Strategy Blueprint', desc: 'We develop the brand identity, messaging architecture, website wireframes, and automation conversation flows — together.' },
              { num: '03', phase: 'Build', title: 'Construction & Integration', desc: 'We bring every element to life: website, WhatsApp system, OTA channels — tested thoroughly before anything goes live.' },
              { num: '04', phase: 'Launch', title: 'Opening & Growth', desc: 'You launch. We remain present — monitoring performance, refining systems, and growing the asset alongside you.' },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, padding: '32px 0', borderBottom: i < 3 ? `1px solid ${C.stone}22` : 'none' }}>
                <div className="serif" style={{ fontSize: 40, fontWeight: 300, color: `${C.gold}30`, lineHeight: 1, width: 56, flexShrink: 0 }}>{step.num}</div>
                <div>
                  <span style={{ fontSize: 10, letterSpacing: '0.2em', color: C.gold, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>{step.phase}</span>
                  <div className="serif" style={{ fontSize: 22, fontWeight: 400, color: C.cream, marginBottom: 8 }}>{step.title}</div>
                  <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.8, fontWeight: 300 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="gold-rule" />

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section style={{ padding: '120px 48px', background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="nk" style={{ textAlign: 'center', marginBottom: 72 }}>
            <span className="tag-label" style={{ color: C.teak }}>Client Voices</span>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}><Ornament color={C.teak} opacity={0.5} /></div>
            <h2 className="serif" style={{ fontSize: 52, fontWeight: 300, color: C.espresso, lineHeight: 1.1 }}>What our partners say.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {testimonials.map((t, i) => (
              <div key={i} className={`testi-card nk d${i + 1}`} style={{ background: i === 1 ? C.espresso : 'white' }}>
                {/* Gold quote mark */}
                <div className="serif" style={{ fontSize: 72, color: C.gold, lineHeight: 0.6, marginBottom: 32, opacity: 0.4 }}>"</div>
                <p className="serif" style={{ fontSize: 18, fontStyle: 'italic', fontWeight: 300, color: i === 1 ? C.cream : '#3a2f26', lineHeight: 1.8, marginBottom: 36 }}>
                  {t.quote}
                </p>
                <hr style={{ border: 'none', borderTop: `1px solid ${i === 1 ? C.gold + '30' : C.stoneLight + '50'}`, marginBottom: 24 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${i === 1 ? C.gold + '40' : C.stoneLight}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="serif" style={{ fontSize: 14, color: i === 1 ? C.gold : C.teak }}>{t.name[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: i === 1 ? C.cream : C.espresso }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: i === 1 ? C.stone : C.stone, letterSpacing: '0.05em' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="gold-rule" />

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="batik-bg" style={{ padding: '140px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden', background: C.espresso }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
          <LotusBg size={600} color={C.gold} opacity={0.04} />
        </div>
        <div className="nk" style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span className="tag-label">Begin the Journey</span>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}><Ornament /></div>
          <h2 className="serif" style={{ fontSize: 68, fontWeight: 300, lineHeight: 1.08, color: C.cream, marginBottom: 8, letterSpacing: '0.02em' }}>
            Let's grow
          </h2>
          <h2 className="serif" style={{ fontSize: 68, fontWeight: 300, lineHeight: 1.08, color: C.gold, fontStyle: 'italic', marginBottom: 40 }}>
            together.
          </h2>
          <p style={{ fontSize: 16, color: C.stoneLight, lineHeight: 1.8, marginBottom: 52, fontWeight: 300 }}>
            Your property has a story worth telling. We will help you find it, build around it, and make it earn — as true partners from the very first conversation.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button className="btn-gold" style={{ fontSize: 13 }}>
              <Users size={14} />
              Grow with Nakama
            </button>
            <button className="btn-outline-cream" style={{ fontSize: 13 }}>
              View Our Work <ArrowRight size={13} />
            </button>
          </div>

          {/* Reassurance strip */}
          <div style={{ marginTop: 56, display: 'flex', gap: 0, justifyContent: 'center', borderTop: `1px solid ${C.stone}20`, paddingTop: 40 }}>
            {['Response within 24h', 'No lock-in contracts', 'Bilingual team', 'SE Asia-based'].map((badge, i) => (
              <div key={badge} style={{ padding: '0 28px', borderRight: i < 3 ? `1px solid ${C.stone}25` : 'none', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: C.gold, letterSpacing: '0.06em' }}>✦</div>
                <div style={{ fontSize: 12, color: C.stoneLight, marginTop: 6, fontWeight: 300, letterSpacing: '0.04em' }}>{badge}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer style={{ background: '#0A0602', borderTop: `1px solid ${C.stone}18`, padding: '64px 48px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 48, marginBottom: 56, paddingBottom: 56, borderBottom: `1px solid ${C.stone}20` }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
                  <path d="M1 18 L1 8 L11 1 L21 8 L21 18" stroke={C.gold} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <rect x="8" y="12" width="6" height="6" stroke={C.gold} strokeWidth="1" fill="none"/>
                </svg>
                <span className="serif" style={{ fontSize: 20, color: C.cream, letterSpacing: '0.08em' }}>NAKAMA</span>
              </div>
              <p style={{ fontSize: 13, color: C.stone, lineHeight: 1.8, fontWeight: 300 }}>Property branding studio.<br />Growing together since 2024.</p>
            </div>
            {[
              { head: 'Services', links: ['Property Websites', 'WhatsApp Bots', 'OTA Integration', 'Brand Strategy'] },
              { head: 'Company', links: ['About Us', 'Our Process', 'Client Work', 'Contact'] },
              { head: 'Connect', links: ['hello@nakama.studio', 'WhatsApp', 'LinkedIn', 'Instagram'] },
            ].map(col => (
              <div key={col.head}>
                <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, marginBottom: 20, opacity: 0.7 }}>{col.head}</div>
                {col.links.map(l => (
                  <div key={l} style={{ fontSize: 13, color: C.stone, marginBottom: 12, cursor: 'pointer', fontWeight: 300, letterSpacing: '0.02em' }}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p className="serif" style={{ fontSize: 14, color: `${C.stone}80`, fontStyle: 'italic' }}>© {new Date().getFullYear()} Nakama Studio. Crafted with intention.</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}><Ornament color={C.stone} opacity={0.3} /></div>
            <p style={{ fontSize: 12, color: `${C.stone}60`, letterSpacing: '0.08em' }}>PRIVACY · TERMS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
