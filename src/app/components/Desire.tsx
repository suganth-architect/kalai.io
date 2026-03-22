export default function Desire() {
  return (
    <section
      id="desire"
      className="stage-desire relative"
      style={{ padding: "var(--space-7) 0" }}
    >
      <div className="corridor">
        {/* ── Personal transformation statements ── */}
        <div style={{ marginBottom: "var(--space-5)" }}>
          <p className="type-statement voice-normal">
            Sunday morning. Your phone buzzes.
          </p>
          <p
            className="type-statement voice-normal"
            style={{ marginTop: "var(--space-3)" }}
          >
            3 new leads. You didn&apos;t post once.
          </p>
        </div>

        <div style={{ marginBottom: "var(--space-5)" }}>
          <p className="type-statement voice-normal">
            Your Instagram hasn&apos;t been this{" "}
            <span style={{ fontWeight: 500 }}>active</span>{" "}
            since… ever.
          </p>
        </div>

        <div style={{ marginBottom: "var(--space-5)" }}>
          <p className="type-statement voice-normal">
            That architect whose feed kept beating yours?
          </p>
          <p
            className="type-statement voice-aside"
            style={{ marginTop: "var(--space-3)" }}
          >
            They&apos;re wondering how you stepped up.
          </p>
        </div>

        {/* ── Time reclamation ── */}
        <div style={{ marginBottom: "var(--space-6)" }}>
          <p className="type-heading">
            10 hours back. Every week.
          </p>
          <p
            className="type-statement voice-aside"
            style={{ marginTop: "var(--space-3)" }}
          >
            That&apos;s 4 new projects a year.
          </p>
        </div>

        {/* ── Week-in-life timeline ── */}
        <div
          style={{
            borderLeft: "1px solid var(--color-accent-muted)",
            paddingLeft: "var(--space-4)",
            marginBottom: "var(--space-6)",
            opacity: 0.9,
          }}
        >
          <div style={{ marginBottom: "var(--space-5)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-1)" }}>
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-accent)",
                  marginLeft: "-27px",
                }}
              />
              <p className="type-micro uppercase" style={{ letterSpacing: "0.08em", color: "var(--color-text-tertiary)" }}>
                Monday
              </p>
            </div>
            <p className="type-body voice-aside">
              2 posts published. Instagram + LinkedIn.
            </p>
          </div>

          <div style={{ marginBottom: "var(--space-5)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-1)" }}>
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-accent)",
                  marginLeft: "-27px",
                }}
              />
              <p className="type-micro uppercase" style={{ letterSpacing: "0.08em", color: "var(--color-text-tertiary)" }}>
                Wednesday
              </p>
            </div>
            <p className="type-body voice-aside">
              Lead notification: &ldquo;Residential project enquiry from Instagram.&rdquo;
            </p>
          </div>

          <div style={{ marginBottom: "var(--space-5)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-1)" }}>
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-accent)",
                  marginLeft: "-27px",
                }}
              />
              <p className="type-micro uppercase" style={{ letterSpacing: "0.08em", color: "var(--color-text-tertiary)" }}>
                Thursday
              </p>
            </div>
            <p className="type-body voice-aside">
              Google Business Profile updated automatically.
            </p>
          </div>

          <div style={{ marginBottom: "var(--space-5)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-1)" }}>
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-accent)",
                  marginLeft: "-27px",
                }}
              />
              <p className="type-micro uppercase" style={{ letterSpacing: "0.08em", color: "var(--color-text-tertiary)" }}>
                Sunday
              </p>
            </div>
            <p className="type-body voice-normal">
              Digest arrives. 3 leads. ₹3.5L pipeline. One screenshot.
            </p>
          </div>

          <p
            className="type-caption voice-whisper"
            style={{ marginTop: "var(--space-2)" }}
          >
            You did nothing. Kalai ran the whole week.
          </p>
        </div>

        {/* ── Pricing footnote — not a moment, just a fact ── */}
        <p className="type-caption voice-whisper">
          Less than your phone bill. More than an agency could deliver.
        </p>
        <p
          className="type-caption voice-sub"
          style={{ marginTop: "var(--space-2)" }}
        >
          ₹833/month. Billed annually at ₹9,999.
        </p>
      </div>
    </section>
  );
}
