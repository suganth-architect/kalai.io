"use client";

import SecureInput from "./SecureInput";

export default function Conversion() {
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

        {/* ── Cryptographic Uplink Map ── */}
        <div className="mb-3 w-full max-w-sm mx-auto flex flex-col items-center">
            <SecureInput />
        </div>

        {/* ── Subdued Early Access Note ── */}
        {/* voice-sub (0.20) + type-micro at 40% lightness = ~1.4:1 contrast. */}
        {/* Upgraded to voice-aside (0.65) + type-caption at 60% lightness ≈ 3.8:1. */}
        <p className="type-caption voice-aside mt-4 uppercase tracking-widest">
          Early access opening soon
        </p>
      </div>
    </section>
  );
}
