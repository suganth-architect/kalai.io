import Image from "next/image";

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
            {/* D2V Logo integration with slow pulse glow effect */}
            <div className="d2v-logo-wrapper">
              <div className="d2v-logo-glow" />
              <Image 
                src="/images/d2v-logo.png" 
                alt="D2V Architectural Consultancy Logo" 
                width={160} 
                height={160} 
                className="d2v-logo-img"
              />
            </div>

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

      {/* ── Artifact 2: WebGL Museum Matrix ── */}
      {/* 
         The actual images are rendered in WebGLGallery.tsx 
         These are purely structural placeholders for scroll positioning & intersection tracking 
      */}
      <div className="corridor-wide artifact-gap relative z-0">
        <div className="poster-gallery grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div 
            id="gallery-poster-1" 
            className="poster-item w-full relative" 
            style={{ aspectRatio: '4/5' }} 
          />
          <div 
            id="gallery-poster-2" 
            className="poster-item w-full relative pt-4 md:pt-12" 
            style={{ aspectRatio: '4/5' }} 
          />
          <div 
            id="gallery-poster-3" 
            className="poster-item w-full relative pt-2 md:pt-6" 
            style={{ aspectRatio: '4/5' }} 
          />
          <div 
            id="gallery-poster-4" 
            className="poster-item w-full relative pt-6 md:pt-16" 
            style={{ aspectRatio: '4/5' }} 
          />
        </div>

        <div className="feed-caption align-center mt-4">
          <p className="type-caption voice-aside">
            Premium, original creative — generated and published autonomously.
          </p>
        </div>
      </div>

      {/* ── Artifact 3: Sunday Digest (Hero artifact — envy trigger) ── */}
      <div className="corridor-wide artifact-gap">
        <div className="exhibit-card-padded">
          <p className="type-micro uppercase tracking-wider text-tertiary mb-4">
            Sunday Digest · Week 12
          </p>

          {/* Key metric — the number that creates envy */}
          <p className="type-display mb-3">
            <span className="metric-value metric-glow">₹3.5L</span>
            <span className="type-statement voice-aside block mt-3">estimated pipeline</span>
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
