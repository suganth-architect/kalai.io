import Image from "next/image";

export default function Desire() {
  return (
    <section
      id="desire"
      className="stage-desire relative stage-pad"
    >
      <Image
        src="/images/bg/desire_bg_1774213103569.png"
        alt="Desire Environment"
        fill
        className="object-cover -z-10 opacity-60"
        loading="lazy"
      />
      <div className="corridor">
        {/* ── Personal transformation statements ── */}
        <div className="mb-5">
          <p className="type-statement voice-normal">
            Sunday morning. Your phone buzzes.
          </p>
          <p className="type-statement voice-normal mt-3">
            3 new leads. You didn&apos;t post once.
          </p>
        </div>

        <div className="mb-5">
          <p className="type-statement voice-normal">
            Your Instagram hasn&apos;t been this{" "}
            <span className="weight-shift">active</span>{" "}
            since… ever.
          </p>
        </div>

        <div className="mb-5">
          <p className="type-statement voice-normal">
            That architect whose feed kept beating yours?
          </p>
          <p className="type-statement voice-aside mt-3">
            They&apos;re wondering how you stepped up.
          </p>
        </div>

        {/* ── Time reclamation ── */}
        <div className="mb-6">
          <p className="type-heading">
            10 hours back. Every week.
          </p>
          <p className="type-statement voice-aside mt-3">
            That&apos;s 4 new projects a year.
          </p>
        </div>

        {/* ── Week-in-life timeline ── */}
        <div className="timeline mb-6">
          <div className="mb-5">
            <div className="timeline-entry-header">
              <div className="timeline-node" />
              <p className="type-micro uppercase tracking-wide text-tertiary">
                Monday
              </p>
            </div>
            <p className="type-body voice-aside">
              2 posts published. Instagram + LinkedIn.
            </p>
          </div>

          <div className="mb-5">
            <div className="timeline-entry-header">
              <div className="timeline-node" />
              <p className="type-micro uppercase tracking-wide text-tertiary">
                Wednesday
              </p>
            </div>
            <p className="type-body voice-aside">
              Lead notification: &ldquo;Residential project enquiry from Instagram.&rdquo;
            </p>
          </div>

          <div className="mb-5">
            <div className="timeline-entry-header">
              <div className="timeline-node" />
              <p className="type-micro uppercase tracking-wide text-tertiary">
                Thursday
              </p>
            </div>
            <p className="type-body voice-aside">
              Google Business Profile updated automatically.
            </p>
          </div>

          <div className="mb-5">
            <div className="timeline-entry-header">
              <div className="timeline-node" />
              <p className="type-micro uppercase tracking-wide text-tertiary">
                Sunday
              </p>
            </div>
            <p className="type-body voice-normal">
              Digest arrives. 3 leads. ₹3.5L pipeline. One screenshot.
            </p>
          </div>

          <p className="type-caption voice-whisper mt-2">
            You did nothing. Kalai ran the whole week.
          </p>
        </div>

        {/* ── Pricing footnote — not a moment, just a fact ── */}
        <p className="type-caption voice-whisper">
          Less than your phone bill. More than an agency could deliver.
        </p>
        <p className="type-caption voice-sub mt-2">
          ₹833/month. Billed annually at ₹9,999.
        </p>
      </div>
    </section>
  );
}
