"use client";

import React from "react";
import TransitionRouter from "./TransitionRouter";

export default function Ecosystem() {
  const products = [
    {
      name: "D2V Interiors",
      url: "https://d2vinteriors.com",
      desc: "Interior design solutions crafted with precision and emotion.",
    },
    {
      name: "D2V Arch Plus",
      url: "https://d2varchplus.com",
      desc: "Architecture beyond plans — spatial thinking at scale.",
    },
    {
      name: "ArcFlo",
      url: "https://arcflo.in",
      desc: "Streamlining architectural workflows with intelligent systems.",
    },
    {
      name: "RenderDrop",
      url: "https://renderdrop.in",
      desc: "High-quality architectural visualizations, delivered fast.",
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="ecosystem" className="stage-pad relative z-10 lg:mb-32">
      <div className="corridor-wide max-w-5xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="type-heading text-center opacity-90 text-white tracking-tight">Built by D2V</h2>
          <p className="type-statement voice-aside text-center mt-3 text-white/50">
            A connected ecosystem of design, architecture, and visualization tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-6 relative z-20">
          {products.map((product) => (
            <TransitionRouter
              key={product.name}
              href={product.url}
              className="group relative block rounded-2xl bg-white/5 backdrop-blur-2xl p-8 overflow-hidden transition-transform duration-500 hover:scale-[1.01]"
              onClick={() => {}} // Additional click logic triggers could go here
            >
              {/* Event handler bubbling listener element wrapper */}
              <div className="absolute inset-0 z-50 pointer-events-auto" onMouseMove={handleMouseMove} />
              
              {/* Dynamic Glow */}
              <div 
                className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(800px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.06), transparent 40%)',
                }}
              />

              {/* Inner Gradient Border - true glassmorphism trick */}
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none z-10" 
                style={{ 
                  border: '1px solid transparent',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%) border-box',
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }} 
              />
              
              <div className="relative z-20 pointer-events-none">
                <h3 className="text-xl md:text-2xl font-medium text-white mb-2 tracking-tight group-hover:text-white transition-colors">{product.name}</h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed tracking-wide">{product.desc}</p>
              </div>
            </TransitionRouter>
          ))}
        </div>
      </div>
    </section>
  );
}
