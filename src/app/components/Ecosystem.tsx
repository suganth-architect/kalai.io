import React from "react";

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
      url: "https://renderdrop.com",
      desc: "High-quality architectural visualizations, delivered fast.",
    },
  ];

  return (
    <section id="ecosystem" className="stage-pad relative z-10">
      <div className="corridor-wide">
        <div className="mb-6">
          <h2 className="type-heading text-center">Built by D2V</h2>
          <p className="type-statement voice-aside text-center mt-2">
            A connected ecosystem of design, architecture, and visualization tools.
          </p>
        </div>

        <div className="ecosystem-grid mt-6">
          {products.map((product) => (
            <a
              key={product.name}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ecosystem-tile"
            >
              <h3 className="type-body weight-500 mb-1">{product.name}</h3>
              <p className="type-micro voice-aside">{product.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
