"use client";

import { useState, useCallback } from "react";
import MagneticButton from "./MagneticButton";

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
        <form onSubmit={handleSubmit} className="mb-3 w-full max-w-sm mx-auto flex flex-col items-center">
          <MagneticButton className="w-full">
            <input
              id="cta-email"
              type="email"
              name="email"
              className="cta-input text-center w-full"
              placeholder="Enter email for early access"
              required
              autoComplete="email"
              aria-label="Email address"
              disabled={isLoading}
            />
          </MagneticButton>

          <MagneticButton className="w-full mt-4">
            <button
              id="cta-submit"
              type="submit"
              className={`cta-button w-full${isLoading ? " is-loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Joining…" : "Coming Soon"}
            </button>
          </MagneticButton>
        </form>

        {/* ── Subdued Early Access Note ── */}
        <p className="type-micro voice-sub mt-4 uppercase tracking-widest">
          Early access opening soon
        </p>
      </div>
    </section>
  );
}
