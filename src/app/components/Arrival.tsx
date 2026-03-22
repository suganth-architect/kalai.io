export default function Arrival() {
  return (
    <section
      id="arrival"
      className="stage-arrival relative flex min-h-screen flex-col items-center justify-center stage-pad-arrival"
    >
      {/* Ambient breathing gradient — alive, not static */}
      <div className="arrival-breathing" aria-hidden="true" />

      {/* Wordmark — maker's mark, not a logo */}
      <div className="wordmark">
        <span className="type-micro uppercase tracking-widest text-tertiary">
          kalai.io
        </span>
      </div>

      {/* The corridor — center-aligned for ARRIVAL (exception) */}
      <div className="corridor align-center">
        {/* The headline — already here. Waiting. Not performing. */}
        <h1 className="type-display">
          Your work speaks for itself.
          <br />
          <span className="voice-aside">
            But nobody can hear it.
          </span>
        </h1>

        {/* The subtext — appears after the headline, delayed */}
        <p className="type-statement voice-aside mt-4 subtext-narrow">
          The gap between what you build and who finds you
          is costing you everything.
        </p>

        {/* Scroll indicator — subtle, dissolves on scroll */}
        <div className="scroll-indicator" aria-hidden="true">
          <div className="scroll-indicator-line" />
        </div>
      </div>
    </section>
  );
}
