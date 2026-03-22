export default function Revelation() {
  return (
    <section
      id="revelation"
      className="stage-revelation relative"
      style={{ padding: "var(--space-7) 0" }}
    >
      <div className="corridor text-center">
        {/* ── The Name — center-outward reveal placeholder ── */}
        <h2
          className="type-heading"
          style={{
            fontWeight: 600,
            color: "hsl(0, 0%, 92%)",
            marginBottom: "var(--space-4)",
          }}
        >
          kalai.io
        </h2>

        {/* ── Tamil cultural integration ── */}
        <p
          style={{
            fontFamily: "var(--font-tamil), sans-serif",
            fontSize: "clamp(1.4rem, 2.5vw + 0.4rem, 2.4rem)",
            fontWeight: 500,
            color: "var(--color-text-secondary)",
            marginBottom: "var(--space-6)",
          }}
        >
          கலை
        </p>

        {/* ── Positioning Statement ── */}
        <p className="type-statement voice-normal">
          The first AI that runs your entire marketing presence.
        </p>
        <p
          className="type-statement voice-normal"
          style={{ marginTop: "var(--space-3)" }}
        >
          Autonomously.
        </p>

        {/* ── The transformation, not features ── */}
        <div style={{ marginTop: "var(--space-6)" }}>
          <p className="type-body voice-aside">
            You describe your business once.
          </p>
          <p
            className="type-body voice-aside"
            style={{ marginTop: "var(--space-2)" }}
          >
            Kalai builds your brand. Creates your content.
          </p>
          <p
            className="type-body voice-aside"
            style={{ marginTop: "var(--space-2)" }}
          >
            Publishes across platforms.
            Reports business outcomes.
          </p>
        </div>

        {/* ── The 10-minute claim — understated ── */}
        <p
          className="type-caption"
          style={{ marginTop: "var(--space-5)", color: "var(--color-text-tertiary)" }}
        >
          Your first campaign goes live in 10 minutes.
        </p>

        {/* ── Abstract system visualization placeholder ── */}
        <div
          aria-hidden="true"
          style={{
            marginTop: "var(--space-6)",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* SVG network visualization will be added in motion phase */}
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              border: "1px solid var(--color-border)",
              opacity: 0.2,
            }}
          />
        </div>
      </div>
    </section>
  );
}
