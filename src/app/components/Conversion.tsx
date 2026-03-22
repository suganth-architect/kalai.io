"use client";

import { useState, useCallback } from "react";

export default function Conversion() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const form = e.currentTarget;
      if (!form.checkValidity()) return;

      e.preventDefault();
      setIsLoading(true);

      /* Simulate brief processing, then show success state without redirect */
      setTimeout(() => {
        setIsLoading(false);
        const form = e.target as HTMLFormElement;
        form.reset();
        alert("You've been added to the early access list.");
      }, 1200);
    },
    []
  );

  return (
    <section
      id="conversion"
      className="stage-conversion relative stage-pad-conversion"
    >
      <div className="corridor-narrow align-center">
        {/* ── CTA Heading — bookend with REVELATION ── */}
        <h2 className="type-display mb-6 text-center">
          Request early access.
        </h2>

        {/* ── CTA Input — entry point, not a form ── */}
        <form onSubmit={handleSubmit} className="mb-3">
          <input
            id="cta-email"
            type="email"
            name="email"
            className="cta-input text-center"
            placeholder="Enter email for early access"
            required
            autoComplete="email"
            aria-label="Email address"
            disabled={isLoading}
          />

          <button
            id="cta-submit"
            type="submit"
            className={`cta-button mt-4${isLoading ? " is-loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Joining…" : "Coming Soon"}
          </button>
        </form>

        {/* ── Subdued Early Access Note ── */}
        <p className="type-micro voice-sub mt-4 uppercase tracking-widest">
          Early access opening soon
        </p>
      </div>
    </section>
  );
}
