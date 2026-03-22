export default function Conversion() {
  return (
    <section
      id="conversion"
      className="stage-conversion relative"
      style={{ padding: "var(--space-7) 0 var(--space-8)" }}
    >
      <div className="corridor-narrow text-center">
        {/* ── CTA Heading — bookend with REVELATION ── */}
        <h2 className="type-heading" style={{ marginBottom: "var(--space-5)" }}>
          Build your brand in 10 minutes.
        </h2>

        {/* ── CTA Input — entry point, not a form ── */}
        <form
          action="/signup"
          method="GET"
          style={{ marginBottom: "var(--space-3)" }}
        >
          <input
            id="cta-email"
            type="email"
            name="email"
            className="cta-input"
            placeholder="Your email"
            required
            autoComplete="email"
            aria-label="Email address"
          />

          <button
            id="cta-submit"
            type="submit"
            className="cta-button"
            style={{ marginTop: "var(--space-3)" }}
          >
            Start for free
          </button>
        </form>

        {/* ── Zero-risk badges ── */}
        <p
          className="type-micro voice-whisper"
          style={{ marginTop: "var(--space-4)" }}
        >
          Free forever &nbsp;·&nbsp; No credit card &nbsp;·&nbsp; 10 minutes to your brand
        </p>
      </div>
    </section>
  );
}
