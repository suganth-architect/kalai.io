export default function Arrival() {
  return (
    <section
      id="arrival"
      className="stage-arrival relative flex min-h-screen flex-col items-center justify-center"
      style={{ padding: "var(--space-8) 0" }}
    >
      {/* Wordmark — maker's mark, not a logo */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-center"
        style={{ padding: "var(--space-4)" }}
      >
        <span
          className="type-micro tracking-widest uppercase"
          style={{ color: "var(--color-text-tertiary)", letterSpacing: "0.12em" }}
        >
          kalai.io
        </span>
      </div>

      {/* The corridor — center-aligned for ARRIVAL (exception) */}
      <div className="corridor text-center">
        {/* The headline — already here. Waiting. */}
        <h1 className="type-display">
          Your work speaks for itself.
          <br />
          <span className="voice-aside">
            But nobody can hear it.
          </span>
        </h1>

        {/* The subtext — appears after the headline */}
        <p
          className="type-statement voice-aside"
          style={{ marginTop: "var(--space-4)", maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}
        >
          The gap between what you build and who finds you
          is costing you everything.
        </p>
      </div>
    </section>
  );
}
