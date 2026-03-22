export default function Proof() {
  return (
    <section
      id="proof"
      className="stage-proof relative stage-pad"
    >
      {/* ── Section label — whisper-level ── */}
      <div className="corridor">
        <p className="type-micro uppercase tracking-widest text-tertiary mb-6">
          What Kalai produces
        </p>
      </div>

      {/* ── Artifact 1: Brand Kit ── */}
      <div className="corridor-wide artifact-gap">
        <div className="exhibit-card">
          {/* Brand specimen — dark matte display */}
          <div className="specimen-display">
            {/* Logo placeholder */}
            <div className="specimen-logo" />

            <p className="type-body weight-500 text-primary">
              D2V Architectural Consultancy
            </p>

            {/* Color swatches */}
            <div className="flex-row-center gap-3">
              <div className="swatch swatch-primary" title="Primary" />
              <div className="swatch swatch-secondary" title="Secondary" />
              <div className="swatch swatch-accent" title="Accent" />
            </div>

            <p className="type-caption voice-whisper">
              Brand identity generated in 10 minutes from a single conversation.
            </p>
          </div>
        </div>
      </div>

      {/* ── Artifact 2: Instagram Feed Grid ── */}
      <div className="corridor-wide artifact-gap">
        <div className="exhibit-card">
          {/* Simulated IG chrome — minimal */}
          <div className="ig-chrome">
            <div className="ig-dot" />
            <div className="ig-dot" />
            <div className="ig-dot" />
          </div>

          {/* 3×3 Grid — simulated feed */}
          <div className="ig-grid">
            {Array.from({ length: 9 }).map((_, i) => {
              const hues = [25, 200, 35, 180, 28, 210, 30, 195, 40];
              const bg = `hsl(${hues[i]}, ${15 + i * 3}%, ${18 + i * 2}%)`;
              return (
                <div
                  key={i}
                  className="ig-cell"
                  style={{ backgroundColor: bg }}
                />
              );
            })}
          </div>

          <div className="feed-caption">
            <p className="type-caption voice-aside">
              A consistent, professional feed — generated and published autonomously.
            </p>
          </div>
        </div>
      </div>

      {/* ── Artifact 3: Sunday Digest (Hero artifact — envy trigger) ── */}
      <div className="corridor-wide artifact-gap">
        <div className="exhibit-card-padded">
          <p className="type-micro uppercase tracking-wider text-tertiary mb-4">
            Sunday Digest · Week 12
          </p>

          {/* Key metric — the number that creates envy */}
          <p className="type-heading mb-3">
            <span className="metric-value metric-glow">₹3.5L</span>{" "}
            estimated pipeline
          </p>

          {/* Supporting metrics — proof of autonomous operation */}
          <div className="grid-3 gap-3 mb-4">
            <div className="metric-cell">
              <p className="type-statement weight-500 metric-number">3</p>
              <p className="type-caption voice-aside">new leads</p>
            </div>
            <div className="metric-cell">
              <p className="type-statement weight-500 metric-number">4</p>
              <p className="type-caption voice-aside">posts published</p>
            </div>
            <div className="metric-cell">
              <p className="type-statement weight-500 metric-number">1,247</p>
              <p className="type-caption voice-aside">best post views</p>
            </div>
          </div>

          <p className="type-caption voice-whisper">
            Every Sunday. One screenshot. Your entire marketing performance.
          </p>
        </div>
      </div>

      {/* ── Artifact 4: Before/After — the emotional contrast ── */}
      <div className="corridor-wide">
        {/* Before — cold, lifeless, painful */}
        <div className="exhibit-card-padded exhibit-card-cold mb-4">
          <p className="type-micro uppercase tracking-wider text-tertiary mb-3">
            Before Kalai
          </p>
          <p className="type-body voice-aside">
            Last Instagram post: <span className="pain-highlight">6 weeks ago.</span>
          </p>
          <p className="type-body voice-aside mt-2">
            Google Business Profile: <span className="pain-highlight">incomplete.</span>
          </p>
          <p className="type-body voice-aside mt-2">
            Enquiries this quarter from digital: <span className="pain-highlight">zero.</span>
          </p>
        </div>

        {/* After — warm, alive, enviable */}
        <div className="exhibit-card-padded exhibit-card-warm">
          <p className="type-micro uppercase tracking-wider text-accent-muted mb-3">
            After Kalai · 8 weeks
          </p>
          <p className="type-body voice-normal">
            <span className="win-highlight">12 posts</span> published across 3 platforms.
          </p>
          <p className="type-body voice-normal mt-2">
            Google Business Profile: <span className="win-highlight">verified, active, ranking.</span>
          </p>
          <p className="type-body voice-normal mt-2">
            <span className="win-highlight">3 qualified enquiries.</span> ₹3.5L pipeline.
          </p>
        </div>
      </div>
    </section>
  );
}
