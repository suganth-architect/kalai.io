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
        <p className="type-micro voice-sub mt-4 uppercase tracking-widest">
          Early access opening soon
        </p>
      </div>
    </section>
  );
}
