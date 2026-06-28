import React, { useEffect, useRef } from 'react';
import { ArrowRight, MessageSquare, Globe, Home, PenTool, TrendingUp, Users, Building2 } from 'lucide-react';

export function LandingPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-sketch-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const elements = document.querySelectorAll('.sketch-hidden');
    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] overflow-x-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; }

        .font-sketch { font-family: 'Caveat', cursive; }

        .sketch-hidden {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.75s ease, transform 0.75s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .animate-sketch-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        @keyframes drawPath {
          from { stroke-dashoffset: 2000; opacity: 0.2; }
          to   { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes drawPathFade {
          from { stroke-dashoffset: 1000; opacity: 0; }
          to   { stroke-dashoffset: 0; opacity: 0.55; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0; }
        }

        .arch-line {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: drawPath 2.4s ease forwards;
        }
        .arch-line-delay {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawPathFade 2.8s ease 0.4s forwards;
        }

        .sketch-btn {
          border: 2px solid #1a1a1a;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          transition: all 0.25s ease;
          cursor: pointer;
          background: #1a1a1a;
          color: white;
        }
        .sketch-btn:hover {
          background: transparent;
          color: #1a1a1a;
          box-shadow: 3px 4px 0 #ccc;
          transform: translateY(-2px);
        }
        .sketch-btn-outline {
          border: 2px solid #1a1a1a;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          transition: all 0.25s ease;
          cursor: pointer;
          background: transparent;
          color: #1a1a1a;
        }
        .sketch-btn-outline:hover {
          background: #1a1a1a;
          color: white;
          transform: translateY(-2px);
        }

        .sketch-card {
          border: 1.5px solid #1a1a1a;
          border-radius: 8px 2px 6px 2px / 2px 6px 2px 8px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          background: white;
        }
        .sketch-card:hover {
          transform: translateY(-4px);
          box-shadow: 4px 6px 0 #e0e0e0;
        }

        .dim-line {
          stroke: #888;
          stroke-width: 0.8;
          stroke-dasharray: 4 3;
        }

        /* grid blueprint bg */
        .arch-grid {
          background-image:
            linear-gradient(rgba(180,195,210,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(180,195,210,0.18) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .section-tag {
          font-family: 'Outfit', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #999;
          border: 1px solid #ddd;
          padding: 2px 8px;
          border-radius: 2px;
          display: inline-block;
          margin-bottom: 12px;
        }

        .annotation {
          font-family: 'Caveat', cursive;
          font-size: 13px;
          color: #888;
          fill: #888;
        }
      `}} />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-[#e5e5e5]" style={{ backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.94)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="8" width="24" height="18" rx="1" stroke="#1a1a1a" strokeWidth="1.8" fill="none"/>
              <path d="M2 14 L14 4 L26 14" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <rect x="10" y="18" width="8" height="8" stroke="#1a1a1a" strokeWidth="1.4" fill="none"/>
              <line x1="7" y1="14" x2="7" y2="8" stroke="#888" strokeWidth="0.8" strokeDasharray="2 2"/>
              <line x1="21" y1="14" x2="21" y2="8" stroke="#888" strokeWidth="0.8" strokeDasharray="2 2"/>
            </svg>
            <span className="font-sketch text-3xl font-bold tracking-wide">Nakama.</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#555]" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <a href="#services" className="hover:text-[#1a1a1a] transition-colors">Services</a>
            <a href="#process" className="hover:text-[#1a1a1a] transition-colors">Process</a>
            <a href="#about" className="hover:text-[#1a1a1a] transition-colors">About</a>
          </div>
          <button className="sketch-btn font-sketch text-xl px-6 py-2">
            Grow with Nakama
          </button>
        </div>
      </nav>

      <main className="pt-20">

        {/* ── HERO ── */}
        <section className="min-h-[90vh] arch-grid flex flex-col items-center justify-center relative px-6 overflow-hidden">

          {/* Corner annotation marks */}
          <svg className="absolute top-8 left-8 opacity-30" width="40" height="40" viewBox="0 0 40 40">
            <path d="M2 20 L2 2 L20 2" stroke="#888" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          </svg>
          <svg className="absolute top-8 right-8 opacity-30" width="40" height="40" viewBox="0 0 40 40">
            <path d="M38 20 L38 2 L20 2" stroke="#888" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          </svg>
          <svg className="absolute bottom-8 left-8 opacity-30" width="40" height="40" viewBox="0 0 40 40">
            <path d="M2 20 L2 38 L20 38" stroke="#888" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          </svg>
          <svg className="absolute bottom-8 right-8 opacity-30" width="40" height="40" viewBox="0 0 40 40">
            <path d="M38 20 L38 38 L20 38" stroke="#888" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          </svg>

          {/* Architectural building illustration */}
          <div className="absolute right-0 top-0 bottom-0 w-[45%] opacity-[0.07] pointer-events-none overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 500 700" fill="none">
              {/* Tower building */}
              <rect x="160" y="100" width="180" height="560" stroke="#1a1a1a" strokeWidth="1.5"/>
              <rect x="180" y="120" width="30" height="40" stroke="#1a1a1a" strokeWidth="1"/>
              <rect x="225" y="120" width="30" height="40" stroke="#1a1a1a" strokeWidth="1"/>
              <rect x="270" y="120" width="30" height="40" stroke="#1a1a1a" strokeWidth="1"/>
              <rect x="180" y="180" width="30" height="40" stroke="#1a1a1a" strokeWidth="1"/>
              <rect x="225" y="180" width="30" height="40" stroke="#1a1a1a" strokeWidth="1"/>
              <rect x="270" y="180" width="30" height="40" stroke="#1a1a1a" strokeWidth="1"/>
              <rect x="180" y="240" width="30" height="40" stroke="#1a1a1a" strokeWidth="1"/>
              <rect x="225" y="240" width="30" height="40" stroke="#1a1a1a" strokeWidth="1"/>
              <rect x="270" y="240" width="30" height="40" stroke="#1a1a1a" strokeWidth="1"/>
              <rect x="180" y="300" width="30" height="40" stroke="#1a1a1a" strokeWidth="1"/>
              <rect x="225" y="300" width="30" height="40" stroke="#1a1a1a" strokeWidth="1"/>
              <rect x="270" y="300" width="30" height="40" stroke="#1a1a1a" strokeWidth="1"/>
              <rect x="180" y="360" width="30" height="40" stroke="#1a1a1a" strokeWidth="1"/>
              <rect x="225" y="360" width="30" height="40" stroke="#1a1a1a" strokeWidth="1"/>
              <rect x="270" y="360" width="30" height="40" stroke="#1a1a1a" strokeWidth="1"/>
              <line x1="160" y1="450" x2="340" y2="450" stroke="#1a1a1a" strokeWidth="1"/>
              <rect x="205" y="580" width="90" height="80" stroke="#1a1a1a" strokeWidth="1.5"/>
              {/* Dimension lines */}
              <line x1="340" y1="100" x2="380" y2="100" stroke="#888" strokeWidth="0.8" strokeDasharray="3 2"/>
              <line x1="340" y1="660" x2="380" y2="660" stroke="#888" strokeWidth="0.8" strokeDasharray="3 2"/>
              <line x1="370" y1="100" x2="370" y2="660" stroke="#888" strokeWidth="0.8"/>
              <line x1="365" y1="100" x2="375" y2="100" stroke="#888" strokeWidth="0.8"/>
              <line x1="365" y1="660" x2="375" y2="660" stroke="#888" strokeWidth="0.8"/>
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl text-center sketch-hidden">
            <div className="section-tag">Property Branding Studio — Est. 2024</div>
            <h1 className="font-sketch text-7xl md:text-8xl leading-none mb-2 text-[#1a1a1a]">
              Grow together.
            </h1>
            <h1 className="font-sketch text-7xl md:text-8xl leading-none mb-8 text-[#555]">
              Stand apart.
            </h1>
            <p className="text-lg text-[#666] max-w-xl mx-auto mb-10 leading-relaxed">
              We turn ordinary properties into extraordinary brands—so guests choose <em>you</em> over every other listing on the market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="sketch-btn font-sketch text-2xl px-10 py-3 flex items-center gap-3">
                <PenTool className="w-5 h-5" />
                Grow with Nakama
              </button>
              <button className="sketch-btn-outline font-sketch text-2xl px-10 py-3">
                See our work
              </button>
            </div>
          </div>

          {/* Architectural floor plan annotation in the bottom-left */}
          <div className="absolute bottom-12 left-12 opacity-25 pointer-events-none">
            <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
              {/* Mini floor plan */}
              <rect x="10" y="10" width="80" height="60" stroke="#333" strokeWidth="1.2"/>
              <rect x="10" y="10" width="40" height="30" stroke="#333" strokeWidth="0.8"/>
              <rect x="50" y="10" width="40" height="30" stroke="#333" strokeWidth="0.8"/>
              <line x1="30" y1="40" x2="30" y2="70" stroke="#333" strokeWidth="0.8"/>
              <line x1="20" y1="70" x2="20" y2="85" stroke="#888" strokeWidth="0.7" strokeDasharray="3 2"/>
              <line x1="90" y1="70" x2="90" y2="85" stroke="#888" strokeWidth="0.7" strokeDasharray="3 2"/>
              <line x1="20" y1="82" x2="90" y2="82" stroke="#888" strokeWidth="0.7"/>
              <text x="52" y="96" fontSize="8" fill="#888" textAnchor="middle" fontFamily="Outfit, sans-serif">Floor Plan — Lvl 1</text>
              {/* North arrow */}
              <path d="M130 30 L130 10 M125 18 L130 10 L135 18" stroke="#555" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="130" y="45" fontSize="8" fill="#555" textAnchor="middle" fontFamily="Outfit, sans-serif">N</text>
            </svg>
          </div>

          <div className="absolute bottom-6 w-full flex justify-center animate-bounce opacity-30">
            <ArrowRight className="w-6 h-6 rotate-90 text-[#1a1a1a]" />
          </div>
        </section>

        <ArchDivider label="§ 01 — About" />

        {/* ── PHILOSOPHY + FOUNDERS ── */}
        <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="sketch-hidden">
              <div className="section-tag">Philosophy</div>
              <h2 className="font-sketch text-5xl mb-6 text-[#1a1a1a]">Companions first.</h2>
              <p className="text-[#555] text-lg leading-relaxed mb-4">
                <strong className="font-sketch text-2xl text-[#1a1a1a]">仲間 (Nakama)</strong> — people who grow together. Not a corporation. Not a vendor. Two people who obsess over making your property unforgettable.
              </p>
              <p className="text-[#555] text-lg leading-relaxed mb-4">
                When you work with Nakama, you're not a client number. We sit on the same side of the drafting table, sketching out the future of your property.
              </p>
              <p className="text-[#666] text-base leading-relaxed italic">
                "The best properties don't compete on price — they compete on identity."
              </p>
            </div>

            {/* Architectural elevation of two figures + building */}
            <div className="sketch-hidden flex justify-center">
              <svg width="340" height="300" viewBox="0 0 340 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Ground line */}
                <line x1="20" y1="270" x2="320" y2="270" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Dimension line below ground */}
                <line x1="20" y1="280" x2="320" y2="280" stroke="#888" strokeWidth="0.6" strokeDasharray="4 3"/>
                <line x1="20" y1="276" x2="20" y2="284" stroke="#888" strokeWidth="0.8"/>
                <line x1="320" y1="276" x2="320" y2="284" stroke="#888" strokeWidth="0.8"/>
                <text x="170" y="296" textAnchor="middle" className="annotation" fontSize="11">Property Elevation — Front View</text>

                {/* Building body */}
                <rect x="100" y="80" width="140" height="190" stroke="#1a1a1a" strokeWidth="1.8" fill="none"/>
                {/* Roof */}
                <path d="M85 80 L170 30 L255 80" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Windows row 1 */}
                <rect x="115" y="100" width="28" height="32" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
                <rect x="156" y="100" width="28" height="32" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
                <rect x="197" y="100" width="28" height="32" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
                {/* Windows row 2 */}
                <rect x="115" y="155" width="28" height="32" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
                <rect x="197" y="155" width="28" height="32" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
                {/* Door */}
                <rect x="148" y="210" width="44" height="60" stroke="#1a1a1a" strokeWidth="1.4" fill="none"/>
                <circle cx="188" cy="240" r="2" fill="#1a1a1a"/>
                {/* Centre window crosshair */}
                <line x1="170" y1="155" x2="170" y2="187" stroke="#1a1a1a" strokeWidth="1"/>
                <line x1="156" y1="171" x2="184" y2="171" stroke="#1a1a1a" strokeWidth="1"/>

                {/* Figure LEFT — companion 1 */}
                <circle cx="52" cy="190" r="14" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
                <line x1="52" y1="204" x2="52" y2="248" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M30 225 L52 215 L74 232" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <line x1="52" y1="248" x2="40" y2="270" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="52" y1="248" x2="64" y2="270" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
                <text x="52" y="185" textAnchor="middle" className="annotation" fontSize="10">You</text>

                {/* Figure RIGHT — companion 2 */}
                <circle cx="290" cy="190" r="14" stroke="#555" strokeWidth="1.5" fill="none"/>
                <line x1="290" y1="204" x2="290" y2="248" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M268 232 L290 215 L312 225" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <line x1="290" y1="248" x2="278" y2="270" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="290" y1="248" x2="302" y2="270" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
                <text x="290" y="185" textAnchor="middle" className="annotation" fontSize="10">Nakama</text>

                {/* Connector dashed arc between figures */}
                <path d="M70 225 Q170 140 268 225" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="5 4" fill="none" strokeLinecap="round"/>

                {/* Height annotation */}
                <line x1="260" y1="30" x2="276" y2="30" stroke="#888" strokeWidth="0.7" strokeDasharray="3 2"/>
                <line x1="260" y1="270" x2="276" y2="270" stroke="#888" strokeWidth="0.7" strokeDasharray="3 2"/>
                <line x1="272" y1="30" x2="272" y2="270" stroke="#888" strokeWidth="0.7"/>
                <line x1="268" y1="30" x2="276" y2="30" stroke="#888" strokeWidth="0.8"/>
                <line x1="268" y1="270" x2="276" y2="270" stroke="#888" strokeWidth="0.8"/>
                <text x="282" y="155" className="annotation" fontSize="10">H</text>
              </svg>
            </div>
          </div>
        </section>

        <ArchDivider label="§ 02 — Problem" />

        {/* ── THE PROBLEM ── */}
        <section className="py-24 px-6 max-w-4xl mx-auto text-center">
          <div className="sketch-hidden">
            <div className="section-tag">Market Reality</div>
            <h2 className="font-sketch text-5xl mb-6 text-[#1a1a1a]">The sea of sameness.</h2>
            <p className="text-[#666] text-lg leading-relaxed mb-16 max-w-2xl mx-auto">
              Most properties list themselves as "cosy" or "well-located." Guests scroll past them in seconds. The ones that stop thumbs have a brand — a soul — and a story worth sharing.
            </p>

            {/* Architectural comparison diagram */}
            <div className="flex gap-8 justify-center items-end flex-wrap">
              {/* Generic property */}
              <div className="flex flex-col items-center gap-3">
                <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
                  <rect x="20" y="40" width="80" height="110" stroke="#ccc" strokeWidth="1.5" fill="none" strokeDasharray="5 4"/>
                  <path d="M10 40 L60 5 L110 40" stroke="#ccc" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <rect x="35" y="60" width="20" height="25" stroke="#ccc" strokeWidth="1" fill="none"/>
                  <rect x="65" y="60" width="20" height="25" stroke="#ccc" strokeWidth="1" fill="none"/>
                  <rect x="44" y="105" width="32" height="45" stroke="#ccc" strokeWidth="1" fill="none"/>
                  <text x="60" y="150" textAnchor="middle" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '9px', fill: '#bbb' }}>Generic listing</text>
                </svg>
                <div className="text-xs text-[#ccc] font-sketch text-lg">Ignored</div>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center">
                <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                  <path d="M5 20 Q30 5 55 20" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  <path d="M48 15 L55 20 L48 25" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                <span className="font-sketch text-sm text-[#888]">Nakama</span>
              </div>

              {/* Branded property */}
              <div className="flex flex-col items-center gap-3">
                <svg width="140" height="180" viewBox="0 0 140 180" fill="none">
                  <rect x="20" y="50" width="100" height="120" stroke="#1a1a1a" strokeWidth="1.8" fill="none"/>
                  <path d="M8 50 L70 8 L132 50" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                  <rect x="32" y="70" width="28" height="32" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
                  <line x1="46" y1="70" x2="46" y2="102" stroke="#1a1a1a" strokeWidth="0.8"/>
                  <line x1="32" y1="86" x2="60" y2="86" stroke="#1a1a1a" strokeWidth="0.8"/>
                  <rect x="80" y="70" width="28" height="32" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
                  <line x1="94" y1="70" x2="94" y2="102" stroke="#1a1a1a" strokeWidth="0.8"/>
                  <line x1="80" y1="86" x2="108" y2="86" stroke="#1a1a1a" strokeWidth="0.8"/>
                  <rect x="50" y="128" width="40" height="42" stroke="#1a1a1a" strokeWidth="1.4" fill="none"/>
                  <circle cx="86" cy="149" r="2.5" fill="#1a1a1a"/>
                  {/* Stars */}
                  <text x="70" y="20" textAnchor="middle" style={{ fontFamily: 'Caveat, cursive', fontSize: '14px', fill: '#1a1a1a' }}>★★★★★</text>
                  <text x="70" y="170" textAnchor="middle" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '9px', fill: '#888' }}>Branded property</text>
                </svg>
                <div className="font-sketch text-lg text-[#1a1a1a]">Booked</div>
              </div>
            </div>
          </div>
        </section>

        <ArchDivider label="§ 03 — Services" />

        {/* ── SERVICES ── */}
        <section id="services" className="py-24 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16 sketch-hidden">
            <div className="section-tag">Our Canvas</div>
            <h2 className="font-sketch text-5xl text-[#1a1a1a]">What we build together.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="4" y="8" width="40" height="32" rx="2" stroke="#1a1a1a" strokeWidth="1.8" fill="none"/>
                  <line x1="4" y1="16" x2="44" y2="16" stroke="#1a1a1a" strokeWidth="1.2"/>
                  <circle cx="10" cy="12" r="2" fill="#1a1a1a"/>
                  <circle cx="17" cy="12" r="2" fill="#888"/>
                  <circle cx="24" cy="12" r="2" fill="#ccc"/>
                  <rect x="10" y="22" width="28" height="3" rx="1" stroke="#888" strokeWidth="0.8" fill="none"/>
                  <rect x="10" y="29" width="20" height="3" rx="1" stroke="#ccc" strokeWidth="0.8" fill="none"/>
                  <rect x="10" y="36" width="24" height="2" rx="1" stroke="#ddd" strokeWidth="0.8" fill="none"/>
                </svg>
              }
              tag="01"
              title="Property Websites"
              desc="Bespoke, conversion-led websites that tell your property's story and drive direct bookings — bypassing OTA commissions entirely."
            />
            <ServiceCard
              icon={
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="6" y="4" width="36" height="40" rx="3" stroke="#1a1a1a" strokeWidth="1.8" fill="none"/>
                  <line x1="14" y1="4" x2="14" y2="44" stroke="#888" strokeWidth="0.8" strokeDasharray="3 2"/>
                  <rect x="10" y="14" width="20" height="10" rx="2" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
                  <rect x="18" y="28" width="20" height="10" rx="2" stroke="#888" strokeWidth="1.2" fill="none"/>
                  <circle cx="42" cy="8" r="4" stroke="#1a1a1a" strokeWidth="1.2" fill="white"/>
                  <path d="M40 8 L41.5 9.5 L44 6.5" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              tag="02"
              title="WhatsApp Automation"
              desc="Intelligent 24/7 chatbots that respond to guests in your property's voice — answering enquiries, collecting leads, and booking stays automatically."
            />
            <ServiceCard
              icon={
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="18" stroke="#1a1a1a" strokeWidth="1.8" fill="none"/>
                  <ellipse cx="24" cy="24" rx="8" ry="18" stroke="#888" strokeWidth="1.2" fill="none"/>
                  <line x1="6" y1="24" x2="42" y2="24" stroke="#1a1a1a" strokeWidth="1.2"/>
                  <line x1="9" y1="15" x2="39" y2="15" stroke="#ccc" strokeWidth="0.8"/>
                  <line x1="9" y1="33" x2="39" y2="33" stroke="#ccc" strokeWidth="0.8"/>
                </svg>
              }
              tag="03"
              title="OTA Integration"
              desc="Seamlessly sync your calendar across Airbnb, Booking.com, Agoda, and VRBO — maximising occupancy with zero double-bookings."
            />
          </div>
        </section>

        <ArchDivider label="§ 04 — Process" />

        {/* ── PROCESS ── */}
        <section id="process" className="py-24 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16 sketch-hidden">
            <div className="section-tag">Methodology</div>
            <h2 className="font-sketch text-5xl text-[#1a1a1a]">The Drafting Process.</h2>
          </div>

          {/* Process as architectural phases */}
          <div className="relative">
            {/* Vertical spine line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#e5e5e5]" style={{ borderLeft: '1.5px dashed #ddd' }}></div>

            <div className="space-y-12 pl-24">
              {[
                {
                  num: "01",
                  phase: "Survey",
                  title: "The Site Assessment",
                  desc: "We begin by understanding your property's unique character, your target guests, competitors, and revenue goals. No templates — fresh eyes every time.",
                  icon: "◎"
                },
                {
                  num: "02",
                  phase: "Design",
                  title: "The Blueprint",
                  desc: "We sketch the brand identity, messaging architecture, website wireframes, and chatbot conversation flows. You review and we refine together.",
                  icon: "◈"
                },
                {
                  num: "03",
                  phase: "Build",
                  title: "The Construction",
                  desc: "We bring the blueprint to life — building the website, deploying the bot, connecting OTA channels. Everything is tested before handover.",
                  icon: "◉"
                },
                {
                  num: "04",
                  phase: "Launch",
                  title: "The Opening",
                  desc: "You open your doors with a brand behind you. We stay close — monitoring, refining, and growing alongside you long after launch day.",
                  icon: "◆"
                }
              ].map((step, i) => (
                <div key={i} className="relative sketch-hidden flex gap-6 items-start group">
                  {/* Node on timeline */}
                  <div className="absolute -left-[76px] w-8 h-8 rounded-full border-2 border-[#1a1a1a] bg-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#1a1a1a] group-hover:scale-150 transition-transform"></div>
                  </div>

                  <div className="sketch-card p-6 flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-xs text-[#aaa] font-mono uppercase tracking-widest">{step.phase} — Phase {step.num}</span>
                        <h3 className="font-sketch text-3xl text-[#1a1a1a] mt-1">{step.title}</h3>
                      </div>
                      <span className="font-sketch text-3xl text-[#ddd]">{step.icon}</span>
                    </div>
                    <p className="text-[#666] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ArchDivider label="§ 05 — Why It Works" />

        {/* ── STATS / PROOF SECTION ── */}
        <section className="py-24 px-6 arch-grid">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 sketch-hidden">
              <div className="section-tag">The Evidence</div>
              <h2 className="font-sketch text-5xl text-[#1a1a1a]">Branding = Revenue.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { stat: "3×", label: "more bookings", detail: "Branded properties outperform generic listings by an average of 3× on OTA platforms." },
                { stat: "40%", label: "higher ADR", detail: "A strong brand commands premium rates — guests pay more when they feel a connection." },
                { stat: "85%", label: "direct enquiries", detail: "WhatsApp automation converts social enquiries into confirmed bookings without lifting a finger." }
              ].map((item, i) => (
                <div key={i} className="sketch-card p-8 sketch-hidden">
                  <div className="font-sketch text-6xl text-[#1a1a1a] mb-2">{item.stat}</div>
                  <div className="font-sketch text-xl text-[#555] mb-4">{item.label}</div>
                  <p className="text-[#888] text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ArchDivider label="§ 06 — CTA" />

        {/* ── CTA ── */}
        <section className="py-32 px-6 text-center relative overflow-hidden">
          {/* Large architectural background sketch */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" fill="none">
            <rect x="200" y="40" width="400" height="320" stroke="#1a1a1a" strokeWidth="2"/>
            <path d="M180 40 L400 10 L620 40" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
            <rect x="240" y="100" width="60" height="80" stroke="#1a1a1a" strokeWidth="1.5"/>
            <rect x="340" y="100" width="60" height="80" stroke="#1a1a1a" strokeWidth="1.5"/>
            <rect x="440" y="100" width="60" height="80" stroke="#1a1a1a" strokeWidth="1.5"/>
            <rect x="340" y="240" width="120" height="120" stroke="#1a1a1a" strokeWidth="1.5"/>
            <line x1="400" y1="10" x2="400" y2="0" stroke="#1a1a1a" strokeWidth="1.5"/>
            <line x1="60" y1="360" x2="740" y2="360" stroke="#1a1a1a" strokeWidth="2"/>
          </svg>

          <div className="relative z-10 max-w-3xl mx-auto sketch-hidden">
            {/* Corner brackets */}
            <div className="flex justify-between mb-8 opacity-20">
              <svg width="24" height="24" viewBox="0 0 24 24"><path d="M2 12 L2 2 L12 2" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
              <svg width="24" height="24" viewBox="0 0 24 24"><path d="M22 12 L22 2 L12 2" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
            </div>

            <div className="section-tag">Ready to start?</div>
            <h2 className="font-sketch text-6xl md:text-7xl text-[#1a1a1a] mb-4 leading-tight">
              Let's grow together.
            </h2>
            <p className="text-[#666] text-lg mb-12 leading-relaxed">
              Your property has a story worth telling. We'll help you find it, brand it, and make it earn.
            </p>

            <button className="sketch-btn font-sketch text-3xl px-14 py-4 flex items-center gap-4 mx-auto">
              <Users className="w-7 h-7" />
              Grow with Nakama
            </button>

            <p className="text-[#bbb] text-sm mt-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
              No sales pitch. Just a conversation between companions.
            </p>

            <div className="flex justify-between mt-8 opacity-20">
              <svg width="24" height="24" viewBox="0 0 24 24"><path d="M2 12 L2 22 L12 22" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
              <svg width="24" height="24" viewBox="0 0 24 24"><path d="M22 12 L22 22 L12 22" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#f0f0f0] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-sketch text-2xl text-[#1a1a1a]">Nakama.</span>
            <span className="text-[#ccc] text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>— Property Branding Studio</span>
          </div>
          <p className="font-sketch text-lg text-[#bbb]">© {new Date().getFullYear()} · Drawn with care, built with purpose.</p>
          <div className="flex gap-6 text-sm text-[#bbb]" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <a href="#" className="hover:text-[#1a1a1a] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#1a1a1a] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ArchDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 px-6 max-w-6xl mx-auto py-4 sketch-hidden">
      <span className="text-[10px] tracking-[0.25em] text-[#bbb] uppercase whitespace-nowrap" style={{ fontFamily: 'Outfit, monospace' }}>{label}</span>
      <svg className="flex-1" height="12" viewBox="0 0 400 12" preserveAspectRatio="none" fill="none">
        <path d="M0 6 Q100 2, 200 6 T 400 6" stroke="#e0e0e0" strokeWidth="1" strokeLinecap="round"/>
      </svg>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <rect x="1" y="1" width="10" height="10" stroke="#ddd" strokeWidth="1" transform="rotate(45 6 6)"/>
      </svg>
    </div>
  );
}

function ServiceCard({ icon, tag, title, desc }: { icon: React.ReactNode, tag: string, title: string, desc: string }) {
  return (
    <div className="sketch-card p-8 sketch-hidden flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="text-[#1a1a1a]">{icon}</div>
        <span className="text-xs font-mono text-[#ddd] tracking-widest">{tag}</span>
      </div>
      <div>
        <h3 className="font-sketch text-3xl text-[#1a1a1a] mb-2">{title}</h3>
        <p className="text-[#666] leading-relaxed text-sm">{desc}</p>
      </div>
    </div>
  );
}

export default LandingPage;
