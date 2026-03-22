"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "../hooks/useGSAP";
import { useLenis } from "lenis/react";

/* ════════════════════════════════════════════════════════════════
   STAGE ANIMATIONS — Cinematic scroll-driven motion
   
   Every animation uses ONLY GPU-composited properties:
     opacity, transform, clip-path, filter
   
   Target: 60fps on Redmi Note 12 (Adreno 619, 4GB RAM)
   ════════════════════════════════════════════════════════════════ */

/* ── Custom ease curves ── */
const EASE_DECEL = "power2.out";       // fast start, gentle stop
const EASE_SETTLE = "power3.out";      // fast overshoot settle (card placement)
const EASE_SYMMETRIC = "power1.inOut"; // no urgency (DESIRE)
const EASE_NONE = "none";             // linear scrub

export default function StageAnimations() {
  /* Keep ScrollTrigger synced with Lenis */
  useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    /* Reduced motion: skip everything */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* Mark JS ready for CSS initial states */
    document.documentElement.classList.add("js-ready");

    const ctx = gsap.context(() => {
      arrivalMotion();
      disruptionMotion();
      revelationMotion();
      proofMotion();
      desireMotion();
      conversionMotion();
      overlayMotion();
    });

    return () => {
      ctx.revert();
      document.documentElement.classList.remove("js-ready");
    };
  }, []);

  return (
    <>
      {/* Depth overlays — rendered into DOM, animated by GSAP */}
      <div className="overlay-vignette" aria-hidden="true" />
      <div className="overlay-grain" aria-hidden="true" />
      <div className="overlay-peripheral" aria-hidden="true" />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   ARRIVAL — The Void
   
   Headline: already present, no reveal. Fades on scroll exit.
   Subtext: 1.5s delayed fade (the ONLY time-based animation).
   Everything else: stillness.
   ════════════════════════════════════════════════════════════════ */

function arrivalMotion() {
  /* Subtext: time-delayed one-shot fade-in. Earns its time-based
     exception because the user hasn't started scrolling yet. */
  gsap.fromTo(
    "#arrival .subtext-narrow",
    { opacity: 0 },
    { opacity: 0.7, delay: 1.5, duration: 0.8, ease: EASE_DECEL }
  );

  /* Headline exits: opacity dissolves as scroll enters DISRUPTION zone.
     Not a dismiss — a recession into the void. */
  gsap.to("#arrival .type-display", {
    opacity: 0,
    scrollTrigger: {
      trigger: "#arrival",
      start: "70% top",
      end: "90% top",
      scrub: true,
    },
  });

  /* Subtext exits slightly after headline — asymmetry. */
  gsap.to("#arrival .subtext-narrow", {
    opacity: 0,
    scrollTrigger: {
      trigger: "#arrival",
      start: "75% top",
      end: "95% top",
      scrub: true,
    },
  });
}

/* ════════════════════════════════════════════════════════════════
   DISRUPTION — The Weight
   
   Clip-path reveals (curtain rises from bottom).
   Asymmetric timing per block (controlled unpredictability).
   Cost number gets special scale treatment (weight shift).
   ════════════════════════════════════════════════════════════════ */

function disruptionMotion() {
  const triggers = gsap.utils.toArray<HTMLElement>("#disruption .mb-5");

  /* Each trigger block reveals with different scroll distance
     (asymmetry) and a slight hesitation offset between them. */
  const timings = [
    { startPct: 82, scrollVh: 18 },  // Block 1: standard
    { startPct: 84, scrollVh: 22 },  // Block 2: slightly slower (hesitation)
    { startPct: 80, scrollVh: 16 },  // Block 3: slightly faster (urgency)
  ];

  triggers.forEach((el, i) => {
    const t = timings[i] || timings[0];

    gsap.fromTo(
      el,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        ease: EASE_DECEL,
        scrollTrigger: {
          trigger: el,
          start: `top ${t.startPct}%`,
          end: `top ${t.startPct - t.scrollVh}%`,
          scrub: true,
        },
      }
    );
  });

  /* Cost block: clip-path + scale 0.97→1.0 + opacity 0.5→1.0.
     The only element in DISRUPTION that uses scale —
     because a financial number needs to land with impact. */
  const costBlock = document.querySelector("#disruption .mt-6");
  if (costBlock) {
    gsap.fromTo(
      costBlock,
      { clipPath: "inset(0 0 100% 0)", scale: 0.97, opacity: 0.5 },
      {
        clipPath: "inset(0 0 0% 0)",
        scale: 1,
        opacity: 1,
        ease: EASE_DECEL,
        scrollTrigger: {
          trigger: costBlock,
          start: "top 80%",
          end: "top 58%",
          scrub: true,
        },
      }
    );
  }
}

/* ════════════════════════════════════════════════════════════════
   REVELATION — The Emergence
   
   Name: center-outward clip-path (iris dilating).
   Positioning text: clip-path with per-element scroll offset.
   Body text: opacity fade at reduced emphasis.
   Network: slow opacity materialization.
   ════════════════════════════════════════════════════════════════ */

function revelationMotion() {
  /* "kalai.io" name: center-outward clip-path.
     Unique to this word and the CONVERSION CTA heading (bookend). */
  gsap.fromTo(
    "#revelation .type-heading",
    { clipPath: "inset(0 50% 0 50%)" },
    {
      clipPath: "inset(0 0% 0 0%)",
      ease: EASE_SETTLE,
      scrollTrigger: {
        trigger: "#revelation .type-heading",
        start: "top 82%",
        end: "top 58%",
        scrub: true,
      },
    }
  );

  /* Tamil கலை: standard clip-path reveal, slightly delayed. */
  gsap.fromTo(
    "#revelation .type-tamil-display",
    { clipPath: "inset(0 0 100% 0)" },
    {
      clipPath: "inset(0 0 0% 0)",
      ease: EASE_DECEL,
      scrollTrigger: {
        trigger: "#revelation .type-tamil-display",
        start: "top 80%",
        end: "top 64%",
        scrub: true,
      },
    }
  );

  /* Positioning statements: staggered clip-path reveals.
     Each word-block has a slight scroll offset — creates
     a sense of assembly (words arriving to form a statement). */
  const statements = gsap.utils.toArray<HTMLElement>(
    "#revelation .type-statement"
  );
  statements.forEach((el, i) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        ease: EASE_DECEL,
        scrollTrigger: {
          trigger: el,
          start: `top ${79 - i * 3}%`,
          end: `top ${62 - i * 3}%`,
          scrub: true,
        },
      }
    );
  });

  /* Body text (transformation description): opacity fade. */
  const bodyTexts = gsap.utils.toArray<HTMLElement>(
    "#revelation .mt-6 .type-body"
  );
  bodyTexts.forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 0.7,
        ease: EASE_SYMMETRIC,
        scrollTrigger: {
          trigger: el,
          start: `top ${80 - i * 2}%`,
          end: `top ${60 - i * 2}%`,
          scrub: true,
        },
      }
    );
  });

  /* 10-minute claim: late, understated. */
  gsap.fromTo(
    "#revelation .type-caption",
    { opacity: 0 },
    {
      opacity: 1,
      ease: EASE_SYMMETRIC,
      scrollTrigger: {
        trigger: "#revelation .type-caption",
        start: "top 82%",
        end: "top 60%",
        scrub: true,
      },
    }
  );

  /* Network placeholder: slow materialization. */
  gsap.fromTo(
    "#revelation .network-placeholder-area",
    { opacity: 0 },
    {
      opacity: 1,
      ease: EASE_SYMMETRIC,
      scrollTrigger: {
        trigger: "#revelation .network-placeholder-area",
        start: "top 85%",
        end: "top 50%",
        scrub: true,
      },
    }
  );
}

/* ════════════════════════════════════════════════════════════════
   PROOF — The Gallery
   
   Artifacts enter: opacity 0.3 / translateY(20px) / blur(2px)
   → opacity 1 / translateY(0) / blur(0).
   Artifacts exit: opacity dims to 0.5 (walking past a painting).
   Easing: fast overshoot settle (placing a card on a table).
   ════════════════════════════════════════════════════════════════ */

function proofMotion() {
  /* Section label */
  gsap.fromTo(
    "#proof .corridor .type-micro",
    { opacity: 0 },
    {
      opacity: 1,
      ease: EASE_DECEL,
      scrollTrigger: {
        trigger: "#proof .corridor .type-micro",
        start: "top 85%",
        end: "top 70%",
        scrub: true,
      },
    }
  );

  /* Artifact entry + exit */
  const artifacts = gsap.utils.toArray<HTMLElement>("#proof .corridor-wide");

  artifacts.forEach((el) => {
    /* Entry: materialization from depth */
    gsap.fromTo(
      el,
      { opacity: 0.3, y: 20, filter: "blur(2px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        ease: EASE_SETTLE,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "top 55%",
          scrub: true,
        },
      }
    );

    /* Exit: gentle dimming — like walking past a painting */
    gsap.to(el, {
      opacity: 0.5,
      scrollTrigger: {
        trigger: el,
        start: "center 25%",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

/* ════════════════════════════════════════════════════════════════
   DESIRE — The Projection
   
   Opacity fades — softer, SLOWER than all previous stages.
   The user trusts the experience at this point; motion can be
   less architectural. They have time to imagine.
   
   Timeline reveals separately with opacity.
   Pricing: NO animation (it's a footnote, not a moment).
   ════════════════════════════════════════════════════════════════ */

function desireMotion() {
  /* Text blocks: slow opacity fades (12vh each — noticeably slower).
     Slight per-block asymmetry in start position. */
  const blocks = gsap.utils.toArray<HTMLElement>(
    "#desire > .corridor > .mb-5, #desire > .corridor > .mb-6"
  );

  blocks.forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        ease: EASE_SYMMETRIC,
        scrollTrigger: {
          trigger: el,
          start: `top ${83 - i * 2}%`,
          end: `top ${55 - i * 2}%`,
          scrub: true,
        },
      }
    );
  });

  /* Timeline: fades in as a whole. */
  gsap.fromTo(
    "#desire .timeline",
    { opacity: 0 },
    {
      opacity: 0.9,
      ease: EASE_SYMMETRIC,
      scrollTrigger: {
        trigger: "#desire .timeline",
        start: "top 82%",
        end: "top 50%",
        scrub: true,
      },
    }
  );

  /* Pricing text: intentionally NOT animated.
     The value has been established. The price is just a fact. */
}

/* ════════════════════════════════════════════════════════════════
   CONVERSION — The Resolution
   
   Heading: center-outward clip-path (bookend with REVELATION).
   CTA: opacity + translateY entry.
   Badges: staggered opacity at reduced emphasis.
   ════════════════════════════════════════════════════════════════ */

function conversionMotion() {
  /* CTA heading: center-outward clip-path — the ONLY repeated
     animation in the entire experience. Intentional bookend with
     the Kalai name reveal in REVELATION. Subconscious symmetry. */
  gsap.fromTo(
    "#conversion .type-heading",
    { clipPath: "inset(0 50% 0 50%)" },
    {
      clipPath: "inset(0 0% 0 0%)",
      ease: EASE_SETTLE,
      scrollTrigger: {
        trigger: "#conversion .type-heading",
        start: "top 82%",
        end: "top 58%",
        scrub: true,
      },
    }
  );

  /* CTA form: subtle lift into place */
  gsap.fromTo(
    "#conversion form",
    { opacity: 0, y: 10 },
    {
      opacity: 1,
      y: 0,
      ease: EASE_SETTLE,
      scrollTrigger: {
        trigger: "#conversion form",
        start: "top 82%",
        end: "top 58%",
        scrub: true,
      },
    }
  );

  /* Zero-risk badges: staggered opacity at voice-whisper level.
     Deliberately understated — they don't compete with the CTA. */
  gsap.fromTo(
    "#conversion .type-micro",
    { opacity: 0 },
    {
      opacity: 0.6,
      ease: EASE_SYMMETRIC,
      scrollTrigger: {
        trigger: "#conversion .type-micro",
        start: "top 85%",
        end: "top 62%",
        scrub: true,
      },
    }
  );
}

/* ════════════════════════════════════════════════════════════════
   OVERLAY MOTION — Depth & environmental effects
   
   Vignette: DISRUPTION only (compresses visual space).
   Grain: DISRUPTION through PROOF (texture, not digital).
   Peripheral softening: DESIRE only (intimate close-up).
   ════════════════════════════════════════════════════════════════ */

function overlayMotion() {
  /* ── Vignette: compresses during DISRUPTION ── */
  gsap.to(".overlay-vignette", {
    opacity: 1,
    scrollTrigger: {
      trigger: "#disruption",
      start: "top 70%",
      end: "top 20%",
      scrub: true,
    },
  });

  /* Vignette recedes during "The Breath" (DISRUPTION→REVELATION).
     The lit zone opens up — relief has geometry. */
  gsap.to(".overlay-vignette", {
    opacity: 0,
    scrollTrigger: {
      trigger: "#revelation",
      start: "top 90%",
      end: "top 40%",
      scrub: true,
    },
  });

  /* ── Grain: texture from DISRUPTION through PROOF ── */
  gsap.to(".overlay-grain", {
    opacity: 0.03,
    scrollTrigger: {
      trigger: "#disruption",
      start: "top 60%",
      end: "top 30%",
      scrub: true,
    },
  });

  gsap.to(".overlay-grain", {
    opacity: 0,
    scrollTrigger: {
      trigger: "#desire",
      start: "top 90%",
      end: "top 60%",
      scrub: true,
    },
  });

  /* ── Peripheral softening: DESIRE only (narrow depth of field) ── */
  gsap.to(".overlay-peripheral", {
    opacity: 0.3,
    scrollTrigger: {
      trigger: "#desire",
      start: "top 70%",
      end: "top 30%",
      scrub: true,
    },
  });

  gsap.to(".overlay-peripheral", {
    opacity: 0,
    scrollTrigger: {
      trigger: "#conversion",
      start: "top 90%",
      end: "top 50%",
      scrub: true,
    },
  });
}
