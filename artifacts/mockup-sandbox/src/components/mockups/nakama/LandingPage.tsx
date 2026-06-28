import React, { useEffect, useRef } from 'react';
import { ArrowRight, Home, MessageSquare, Globe, PenTool, TrendingUp, Users, Calendar, CheckCircle } from 'lucide-react';

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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.sketch-hidden');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-[100dvh] relative overflow-hidden text-[#2d2d2d] selection:bg-[#2d2d2d] selection:text-[#f5f0e8]" style={{ backgroundColor: '#f5f0e8' }}>
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --paper: #f5f0e8;
          --ink: #1a1a1a;
          --pencil: #666666;
          --pencil-light: #888888;
        }

        .font-sketch {
          font-family: 'Caveat', cursive;
        }

        .font-body {
          font-family: 'Outfit', sans-serif;
        }

        /* Texture overlay */
        .paper-texture {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 50;
          opacity: 0.4;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          mix-blend-mode: multiply;
        }

        /* Hand-drawn border */
        .sketch-border {
          border: 2px solid var(--ink);
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
          box-shadow: 2px 3px 0px var(--pencil);
          transition: all 0.3s ease;
        }

        .sketch-border:hover {
          box-shadow: 4px 6px 0px var(--ink);
          transform: translateY(-2px);
        }

        /* Animations */
        .sketch-hidden {
          opacity: 0;
          transform: translateY(20px) rotate(-1deg);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .animate-sketch-in {
          opacity: 1;
          transform: translateY(0) rotate(0);
        }

        @keyframes drawLine {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }

        .svg-sketch path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
        }

        .animate-sketch-in .svg-sketch path {
          animation: drawLine 2.5s ease forwards;
        }

        .crosshatch {
          background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8L8 0M-2 2L2 -2M6 10L10 6' stroke='%23888' stroke-width='0.5' fill='none'/%3E%3C/svg%3E");
        }
      `}} />

      <div className="paper-texture"></div>

      <nav className="fixed top-0 w-full p-4 z-40 bg-[#f5f0e8]/90 backdrop-blur-sm border-b-2 border-[#1a1a1a]" style={{ borderRadius: '0 0 15px 255px / 0 0 15px 15px' }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="font-sketch text-4xl font-bold text-[#1a1a1a] tracking-wider">Nakama.</h1>
          <button className="font-sketch text-2xl sketch-border px-6 py-2 bg-transparent text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f5f0e8]">
            Partner with us
          </button>
        </div>
      </nav>

      <main className="pt-32 font-body relative z-10">
        {/* 1. Hero Section */}
        <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 relative">
          <div className="max-w-4xl mx-auto sketch-hidden">
            <h2 className="font-sketch text-6xl md:text-8xl mb-6 text-[#1a1a1a] leading-tight">
              Grow together.<br/>Stand apart.
            </h2>
            <p className="text-xl md:text-2xl text-[#666] max-w-2xl mx-auto mb-12 font-light">
              A property branding studio. We maximize your property's identity so you can maximize your revenue.
            </p>

            <svg className="w-64 h-64 mx-auto svg-sketch mb-12" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Base House */}
              <path d="M100 20 L20 80 L20 180 L180 180 L180 80 Z" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M60 180 L60 100 L100 60 L140 100 L140 180" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M80 140 L120 140 L120 180 L80 180 Z" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Decorative Sketch Lines */}
              <path d="M40 80 L100 10 L160 80" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M70 120 L90 120 M110 120 L130 120" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
              {/* Growth Arrows */}
              <path d="M150 120 Q 180 90 190 50" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeDasharray="5,5"/>
              <path d="M175 55 L190 50 L185 65" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="absolute bottom-10 w-full flex justify-center sketch-hidden animate-bounce">
            <ArrowRight className="w-8 h-8 text-[#1a1a1a] transform rotate-90 opacity-50" />
          </div>
        </section>

        <Divider />

        {/* 2. Philosophy & Founders */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="sketch-hidden">
              <h3 className="font-sketch text-5xl mb-6 text-[#1a1a1a]">Companions first.</h3>
              <div className="space-y-6 text-lg text-[#2d2d2d] leading-relaxed">
                <p>
                  <strong className="font-sketch text-2xl mr-2">Nakama (仲間):</strong>
                  People who grow together.
                </p>
                <p>
                  We aren't a faceless corporation or an automated farm. We're two people who obsess over making your property unforgettable. When you work with us, you're not a client—you're a partner.
                </p>
                <p>
                  We sit on the same side of the table, sketching out the future of your business.
                </p>
              </div>
            </div>

            <div className="relative sketch-hidden">
              <div className="absolute inset-0 crosshatch opacity-30 transform -rotate-3 rounded-3xl" style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}></div>
              <div className="bg-[#f5f0e8] p-8 sketch-border relative z-10 flex justify-center gap-8">
                <svg width="240" height="200" viewBox="0 0 200 160" className="svg-sketch">
                  {/* Figure 1 - Left */}
                  <path d="M60 40 C60 20, 80 20, 80 40 C80 60, 60 60, 60 40" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path d="M70 60 L70 110" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path d="M50 80 L70 70 L90 90" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path d="M70 110 L55 150 M70 110 L85 150" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>

                  {/* Figure 2 - Right */}
                  <path d="M120 45 C120 25, 140 25, 140 45 C140 65, 120 65, 120 45" stroke="#666" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path d="M130 65 L130 115" stroke="#666" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path d="M110 85 L130 75 L150 95" stroke="#666" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path d="M130 115 L115 155 M130 115 L145 155" stroke="#666" strokeWidth="2" fill="none" strokeLinecap="round"/>

                  {/* Connection line */}
                  <path d="M90 90 Q 100 100 110 85" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="4 4" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* 3. The Problem / Why Branding */}
        <section className="py-24 px-6 max-w-4xl mx-auto text-center">
          <div className="sketch-hidden">
            <h3 className="font-sketch text-5xl mb-12 text-[#1a1a1a]">The Sea of Sameness</h3>

            <div className="relative p-12 sketch-border crosshatch overflow-hidden group mb-12">
              <div className="absolute inset-0 bg-[#f5f0e8] opacity-90 transition-opacity group-hover:opacity-80"></div>
              <div className="relative z-10 flex flex-col items-center">
                <TrendingUp className="w-16 h-16 text-[#1a1a1a] mb-6" />
                <p className="text-3xl font-sketch text-[#1a1a1a] mb-6">Branding = Differentiation = Bookings</p>
                <p className="text-xl text-[#2d2d2d] leading-relaxed">
                  Most properties are just a bed and a price tag. In a crowded market, the property with a soul wins. We craft identities that guests remember, recommend, and return to.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* 4. Services */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16 sketch-hidden">
            <h3 className="font-sketch text-5xl mb-4 text-[#1a1a1a]">Our Canvas</h3>
            <p className="text-xl text-[#666]">Everything needed to turn a listing into a destination.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Globe className="w-10 h-10" />}
              title="Direct Booking Sites"
              desc="Bespoke, hand-crafted websites that bypass OTA fees and tell your property's real story."
              delay={0}
            />
            <ServiceCard
              icon={<MessageSquare className="w-10 h-10" />}
              title="WhatsApp Automation"
              desc="Intelligent companions that answer guest queries 24/7, maintaining a human touch."
              delay={150}
            />
            <ServiceCard
              icon={<Home className="w-10 h-10" />}
              title="OTA Integration"
              desc="Seamlessly sync Airbnb, Booking.com, and VRBO to maximize your calendar."
              delay={300}
            />
          </div>
        </section>

        <Divider />

        {/* 5. How we work / Process */}
        <section className="py-24 px-6 max-w-5xl mx-auto">
          <h3 className="font-sketch text-5xl mb-16 text-center text-[#1a1a1a] sketch-hidden">The Drafting Process</h3>
          <div className="space-y-12">
            {[
              { title: "1. The Blank Page", desc: "We start by understanding your property's unique DNA, your target guests, and your goals." },
              { title: "2. The Outline", desc: "We sketch out the brand strategy, website wireframes, and conversational flows." },
              { title: "3. The Inking", desc: "We build the tech, write the copy, and connect the integrations." },
              { title: "4. The Gallery", desc: "You launch. We monitor, refine, and grow together." }
            ].map((step, i) => (
              <div key={i} className="flex gap-6 sketch-hidden group">
                <div className="flex-shrink-0 w-16 h-16 sketch-border flex items-center justify-center font-sketch text-3xl bg-[#1a1a1a] text-[#f5f0e8] group-hover:bg-transparent group-hover:text-[#1a1a1a] transition-all">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-sketch text-3xl mb-2 text-[#1a1a1a]">{step.title}</h4>
                  <p className="text-lg text-[#666]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* 6. Philosophy Quote */}
        <section className="py-24 px-6 text-center sketch-hidden relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
            <Users className="w-96 h-96 text-[#1a1a1a]" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <svg className="w-12 h-12 mx-auto mb-6 text-[#1a1a1a] svg-sketch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1.5.5 1.5 1.5L5 21z"></path>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.5c0 1-.5 1.5-1.5 1.5L15 21z"></path>
            </svg>
            <p className="font-sketch text-4xl md:text-5xl text-[#1a1a1a] leading-relaxed mb-8">
              "A house is just a building until it has a story. We help you write yours."
            </p>
          </div>
        </section>

        {/* 7. CTA */}
        <section className="py-32 px-6 max-w-4xl mx-auto text-center sketch-hidden relative">
          <svg className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none svg-sketch" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M10 90 Q 50 10 90 90" stroke="#1a1a1a" strokeWidth="0.5" fill="none"/>
            <path d="M20 90 Q 50 20 80 90" stroke="#666" strokeWidth="0.5" fill="none"/>
          </svg>

          <h2 className="font-sketch text-6xl md:text-7xl mb-8 text-[#1a1a1a]">Let's sketch it out.</h2>
          <p className="text-xl mb-12 text-[#666]">Ready to grow your property's potential together?</p>

          <button className="font-sketch text-3xl sketch-border px-12 py-4 bg-[#1a1a1a] text-[#f5f0e8] hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-300 inline-flex items-center gap-4 group cursor-pointer">
            <PenTool className="w-8 h-8 group-hover:-rotate-12 transition-transform" />
            Start a Conversation
          </button>
        </section>
      </main>

      <footer className="py-12 text-center border-t border-[#1a1a1a] border-opacity-20 font-sketch text-xl text-[#666] relative z-10">
        <p>© {new Date().getFullYear()} Nakama Studio. Drawn with care.</p>
      </footer>
    </div>
  );
}

function Divider() {
  return (
    <div className="w-full flex justify-center py-12 sketch-hidden">
      <svg width="200" height="20" viewBox="0 0 200 20" className="svg-sketch">
        <path d="M0 10 Q 50 5, 100 10 T 200 10" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
        <path d="M10 15 Q 60 10, 110 15 T 190 15" stroke="#666" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.2"/>
      </svg>
    </div>
  );
}

function ServiceCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <div
      className="sketch-border p-8 bg-[#f5f0e8] sketch-hidden flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-6 text-[#666] group-hover:text-[#1a1a1a] transition-colors">
        {icon}
      </div>
      <h4 className="font-sketch text-3xl mb-4 text-[#1a1a1a]">{title}</h4>
      <p className="text-[#2d2d2d] leading-relaxed">{desc}</p>
    </div>
  );
}

export default LandingPage;