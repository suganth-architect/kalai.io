export default function Revelation() {
  return (
    <section
      id="revelation"
      className="stage-revelation relative stage-pad"
    >
      <div className="corridor align-center">
        {/* ── The Name — center-outward reveal placeholder ── */}
        <h2 className="type-heading weight-600 text-brightest mb-4">
          kalai.io
        </h2>

        {/* ── Tamil cultural integration ── */}
        <p className="type-tamil-display mb-6">
          கலை
        </p>

        {/* ── Positioning Statement ── */}
        <p className="type-statement voice-normal">
          The first AI that runs your entire marketing presence.
        </p>
        <p className="type-statement voice-normal mt-3">
          Autonomously.
        </p>

        {/* ── The transformation, not features ── */}
        <div className="mt-6">
          <p className="type-body voice-aside">
            You describe your business once.
          </p>
          <p className="type-body voice-aside mt-2">
            Kalai builds your brand. Creates your content.
          </p>
          <p className="type-body voice-aside mt-2">
            Publishes across platforms.
            Reports business outcomes.
          </p>
        </div>

        {/* ── The 10-minute claim — understated ── */}
        <p className="type-caption text-tertiary mt-5">
          Your first campaign goes live in 10 minutes.
        </p>

        {/* ── Abstract system visualization placeholder ── */}
        <div aria-hidden="true" className="network-placeholder-area">
          {/* SVG network visualization will be added in motion phase */}
          <div className="network-placeholder-circle" />
        </div>
      </div>
    </section>
  );
}
