export default function Proof() {
  return (
    <section
      id="proof"
      className="stage-proof relative"
      style={{ padding: "var(--space-7) 0" }}
    >
      {/* ── Section label — whisper-level ── */}
      <div className="corridor">
        <p
          className="type-micro uppercase"
          style={{
            letterSpacing: "0.12em",
            color: "var(--color-text-tertiary)",
            marginBottom: "var(--space-6)",
          }}
        >
          What Kalai produces
        </p>
      </div>

      {/* ── Artifact 1: Brand Kit ── */}
      <div className="corridor-wide" style={{ marginBottom: "48px" }}>
        <div className="exhibit-card">
          {/* Brand specimen — dark matte display */}
          <div
            style={{
              backgroundColor: "hsl(220, 10%, 8%)",
              padding: "48px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-4)",
            }}
          >
            {/* Logo placeholder */}
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "12px",
                backgroundColor: "var(--color-accent-muted)",
                opacity: 0.6,
              }}
            />

            <p
              className="type-body"
              style={{ fontWeight: 500, color: "var(--color-text-primary)" }}
            >
              D2V Architectural Consultancy
            </p>

            {/* Color swatches */}
            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#2C3E50",
                }}
                title="Primary"
              />
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#E67E22",
                }}
                title="Secondary"
              />
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#ECF0F1",
                }}
                title="Accent"
              />
            </div>

            <p className="type-caption voice-whisper">
              Brand identity generated in 10 minutes from a single conversation.
            </p>
          </div>
        </div>
      </div>

      {/* ── Artifact 2: Instagram Feed Grid ── */}
      <div className="corridor-wide" style={{ marginBottom: "48px" }}>
        <div className="exhibit-card">
          {/* Simulated IG chrome — minimal */}
          <div
            style={{
              height: "12px",
              backgroundColor: "hsl(220, 8%, 11%)",
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              gap: "4px",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "var(--color-text-tertiary)",
                opacity: 0.3,
              }}
            />
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "var(--color-text-tertiary)",
                opacity: 0.3,
              }}
            />
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "var(--color-text-tertiary)",
                opacity: 0.3,
              }}
            />
          </div>

          {/* 3×3 Grid — simulated feed */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2px",
            }}
          >
            {Array.from({ length: 9 }).map((_, i) => {
              const hues = [25, 200, 35, 180, 28, 210, 30, 195, 40];
              return (
                <div
                  key={i}
                  style={{
                    aspectRatio: "1",
                    backgroundColor: `hsl(${hues[i]}, ${15 + i * 3}%, ${18 + i * 2}%)`,
                  }}
                />
              );
            })}
          </div>

          <div style={{ padding: "16px 24px" }}>
            <p className="type-caption voice-aside">
              A consistent, professional feed — generated and published autonomously.
            </p>
          </div>
        </div>
      </div>

      {/* ── Artifact 3: Sunday Digest (Hero artifact) ── */}
      <div className="corridor-wide" style={{ marginBottom: "48px" }}>
        <div className="exhibit-card-padded">
          <p
            className="type-micro uppercase"
            style={{
              letterSpacing: "0.1em",
              color: "var(--color-text-tertiary)",
              marginBottom: "var(--space-4)",
            }}
          >
            Sunday Digest · Week 12
          </p>

          {/* Key metric */}
          <p className="type-heading" style={{ marginBottom: "var(--space-3)" }}>
            <span className="metric-value">₹3.5L</span>{" "}
            estimated pipeline
          </p>

          {/* Supporting metrics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "var(--space-3)",
              marginBottom: "var(--space-4)",
            }}
          >
            <div>
              <p className="type-statement" style={{ fontWeight: 500 }}>
                3
              </p>
              <p className="type-caption voice-aside">
                new leads
              </p>
            </div>
            <div>
              <p className="type-statement" style={{ fontWeight: 500 }}>
                4
              </p>
              <p className="type-caption voice-aside">
                posts published
              </p>
            </div>
            <div>
              <p className="type-statement" style={{ fontWeight: 500 }}>
                1,247
              </p>
              <p className="type-caption voice-aside">
                best post views
              </p>
            </div>
          </div>

          <p className="type-caption voice-whisper">
            Every Sunday. One screenshot. Your entire marketing performance.
          </p>
        </div>
      </div>

      {/* ── Artifact 4: Before/After ── */}
      <div className="corridor-wide">
        {/* Before — cold */}
        <div
          className="exhibit-card-padded"
          style={{
            backgroundColor: "hsl(220, 4%, 12%)",
            marginBottom: "24px",
          }}
        >
          <p
            className="type-micro uppercase"
            style={{
              letterSpacing: "0.1em",
              color: "var(--color-text-tertiary)",
              marginBottom: "var(--space-3)",
            }}
          >
            Before Kalai
          </p>
          <p className="type-body voice-aside">
            Last Instagram post: 6 weeks ago.
          </p>
          <p
            className="type-body voice-aside"
            style={{ marginTop: "var(--space-2)" }}
          >
            Google Business Profile: incomplete.
          </p>
          <p
            className="type-body voice-aside"
            style={{ marginTop: "var(--space-2)" }}
          >
            Enquiries this quarter from digital: zero.
          </p>
        </div>

        {/* After — warm */}
        <div
          className="exhibit-card-padded"
          style={{ backgroundColor: "hsl(35, 8%, 14%)" }}
        >
          <p
            className="type-micro uppercase"
            style={{
              letterSpacing: "0.1em",
              color: "var(--color-accent-muted)",
              marginBottom: "var(--space-3)",
            }}
          >
            After Kalai · 8 weeks
          </p>
          <p className="type-body voice-normal">
            12 posts published across 3 platforms.
          </p>
          <p
            className="type-body voice-normal"
            style={{ marginTop: "var(--space-2)" }}
          >
            Google Business Profile: verified, active, ranking.
          </p>
          <p
            className="type-body voice-normal"
            style={{ marginTop: "var(--space-2)" }}
          >
            3 qualified enquiries. ₹3.5L pipeline.
          </p>
        </div>
      </div>
    </section>
  );
}
