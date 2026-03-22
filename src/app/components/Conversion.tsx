"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

export default function Conversion() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const form = e.currentTarget;
      if (!form.checkValidity()) return;

      e.preventDefault();
      setIsLoading(true);

      /* Simulate brief processing before redirect.
         In production, replace with actual signup API call. */
      const email = new FormData(form).get("email");
      setTimeout(() => {
        window.location.href = `/signup?email=${encodeURIComponent(String(email))}`;
      }, 800);
    },
    []
  );

  return (
    <section
      id="conversion"
      className="stage-conversion relative stage-pad-conversion"
    >
      <Image
        src="/images/bg/conversion_bg_1774213118297.png"
        alt="Conversion Environment"
        fill
        className="object-cover -z-10 opacity-60"
        loading="lazy"
      />
      <div className="corridor-narrow align-center">
        {/* ── CTA Heading — bookend with REVELATION ── */}
        <h2 className="type-display mb-6 text-center">
          Build your brand in 10 minutes.
        </h2>

        {/* ── CTA Input — entry point, not a form ── */}
        <form onSubmit={handleSubmit} className="mb-3">
          <input
            id="cta-email"
            type="email"
            name="email"
            className="cta-input text-center"
            placeholder="Your email"
            required
            autoComplete="email"
            aria-label="Email address"
            disabled={isLoading}
          />

          <button
            id="cta-submit"
            type="submit"
            className={`cta-button mt-3${isLoading ? " is-loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Starting…" : "Start for free"}
          </button>
        </form>

        {/* ── Zero-risk badges — footnotes, not moments ── */}
        <p className="type-micro voice-whisper mt-4">
          Free forever &nbsp;·&nbsp; No credit card &nbsp;·&nbsp; 10 minutes to your brand
        </p>
      </div>
    </section>
  );
}
