export default function Disruption() {
  return (
    <section
      id="disruption"
      className="stage-disruption relative"
      style={{ padding: "var(--space-7) 0" }}
    >
      <div className="corridor">
        {/* ── Trigger 1: Loss Aversion ── */}
        <div style={{ marginBottom: "var(--space-5)" }}>
          <p className="type-heading">
            You lost a project last month.
          </p>
          <p
            className="type-statement voice-aside"
            style={{ marginTop: "var(--space-3)" }}
          >
            Not to someone better.
            To someone with a better Instagram feed.
          </p>
        </div>

        {/* ── Trigger 2: Growth Bottleneck ── */}
        <div style={{ marginBottom: "var(--space-5)" }}>
          <p className="type-heading">
            You spend 10 hours a week on marketing.
          </p>
          <p
            className="type-statement voice-aside"
            style={{ marginTop: "var(--space-3)" }}
          >
            That&apos;s 10 hours you&apos;re not designing.
            Not consulting. Not earning.
          </p>
        </div>

        {/* ── Trigger 3: ROI Confusion ── */}
        <div style={{ marginBottom: "var(--space-5)" }}>
          <p className="type-heading">
            Your marketing has no scoreboard.
          </p>
          <p
            className="type-statement voice-aside"
            style={{ marginTop: "var(--space-3)" }}
          >
            You post. You wait. Nothing measurable happens.
            You do it again anyway.
          </p>
        </div>

        {/* ── The Quantified Cost ── */}
        <div style={{ marginTop: "var(--space-6)" }}>
          <p className="type-statement voice-normal">
            10 hours a week × 48 billable weeks.
          </p>
          <p
            className="type-heading"
            style={{ marginTop: "var(--space-3)" }}
          >
            <span className="accent-underline">₹2,00,000</span>{" "}
            in lost billings every year.
          </p>
          <p
            className="type-caption"
            style={{ marginTop: "var(--space-3)" }}
          >
            And that&apos;s just the hours. Not the projects you never heard about.
          </p>
        </div>
      </div>
    </section>
  );
}
