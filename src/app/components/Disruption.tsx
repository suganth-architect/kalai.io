import Image from "next/image";

export default function Disruption() {
  return (
    <section
      id="disruption"
      className="stage-disruption relative stage-pad"
    >
      <Image
        src="/images/bg/disruption_bg_1774213058293.png"
        alt="Disrupted Environment"
        fill
        className="object-cover -z-10 opacity-60"
        loading="lazy"
      />
      <div className="corridor">
        {/* ── Trigger 1: Loss Aversion ── */}
        <div className="mb-5">
          <p className="type-heading">
            You lost a project last month.
          </p>
          <p className="type-statement voice-aside mt-3">
            Not to someone better.
            To someone with a better Instagram feed.
          </p>
        </div>

        {/* ── Trigger 2: Growth Bottleneck ── */}
        <div className="mb-5">
          <p className="type-heading">
            You spend 10 hours a week on marketing.
          </p>
          <p className="type-statement voice-aside mt-3">
            That&apos;s 10 hours you&apos;re not designing.
            Not consulting. Not earning.
          </p>
        </div>

        {/* ── Trigger 3: ROI Confusion ── */}
        <div className="mb-5">
          <p className="type-heading">
            Your marketing has no scoreboard.
          </p>
          <p className="type-statement voice-aside mt-3">
            You post. You wait. Nothing measurable happens.
            You do it again anyway.
          </p>
        </div>

        {/* ── The Quantified Cost ── */}
        <div className="mt-6">
          <p className="type-statement voice-normal">
            10 hours a week × 48 billable weeks.
          </p>
          <p className="type-heading mt-3">
            <span className="accent-underline">₹2,00,000</span>{" "}
            in lost billings every year.
          </p>
          <p className="type-caption mt-3">
            And that&apos;s just the hours. Not the projects you never heard about.
          </p>
        </div>
      </div>
    </section>
  );
}
