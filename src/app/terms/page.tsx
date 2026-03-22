"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import CinematicEnvironment from "../components/CinematicEnvironment";
import Footer from "../components/Footer";
import Link from "next/link";

export default function TermsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Select all sections to animate them in smoothly
    const sections = containerRef.current.querySelectorAll('.legal-section');
    
    gsap.fromTo(
      sections,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.2
      }
    );
  }, []);

  return (
    <main className="min-h-screen relative pt-32 pb-16">
      <CinematicEnvironment />
      
      <div className="corridor max-w-[700px] mx-auto z-10 relative" ref={containerRef}>
        <div className="mb-16 legal-section">
          <Link href="/" className="type-micro uppercase tracking-widest text-accent hover:text-accent-muted transition-colors flex items-center gap-2 mb-8 w-fit pb-1 border-b border-transparent hover:border-accent-muted">
            <span className="opacity-70">←</span> Back to Home
          </Link>
          <h1 className="type-heading mb-4 text-primary">Terms of Service</h1>
          <p className="type-body voice-aside">
            Last updated: March 2026
          </p>
        </div>

        <section className="mb-12 legal-section">
          <h2 className="type-statement mb-4 weight-500 text-primary">The Agreement.</h2>
          <p className="type-body mb-4 voice-normal text-secondary">
            By using Kalai, you agree to these terms. Kalai is an autonomous marketing agent built by D2V. Our goal is to handle your marketing so you can focus on your craft.
          </p>
          <p className="type-body mb-4 voice-normal text-secondary">
            These terms are meant to protect both of us, written simply so you understand exactly what you are signing up for.
          </p>
        </section>

        <div className="h-[1px] w-full bg-white/5 my-12 legal-section" />

        <section className="mb-12 legal-section">
          <h2 className="type-statement mb-4 weight-500 text-primary">Usage Rules</h2>
          <p className="type-body mb-6 voice-normal text-secondary">
            We give you a powerful tool. In return, we ask that you use it responsibly.
          </p>
          <ul className="flex flex-col gap-4 list-disc list-inside text-secondary">
            <li className="type-body voice-normal">Do not use Kalai to generate or distribute illegal, hateful, or harmful content.</li>
            <li className="type-body voice-normal">Do not attempt to reverse engineer, scrape, or break the platform.</li>
            <li className="type-body voice-normal">Do not use Kalai to spam users or violate the terms of connected platforms (like Instagram or Google). Kalai is designed to comply with these limits automatically; please do not circumvent them.</li>
          </ul>
        </section>

        <section className="mb-12 legal-section">
          <h2 className="type-statement mb-4 weight-500 text-primary">Your Content and Intellectual Property</h2>
          <p className="type-body mb-6 voice-normal text-secondary">
            <strong className="text-primary font-medium">What is yours:</strong> You own the rights to the business data, descriptions, and uploaded project photos you provide. You also own the output—the final images, logos, and copy that Kalai generates specifically for you.
          </p>
          <p className="type-body mb-4 voice-normal text-secondary">
            <strong className="text-primary font-medium">What is ours:</strong> Kalai, the platform, the prompting engines, the UI, and the underlying technology belong to D2V. You cannot copy or resell the software itself.
          </p>
        </section>

        <section className="mb-12 legal-section">
          <h2 className="type-statement mb-4 weight-500 text-primary">Your Account</h2>
          <p className="type-body mb-4 voice-normal text-secondary">
            You are responsible for keeping your account secure. Since Kalai connects directly to your professional social accounts and publishes on your behalf, you must protect your login credentials. We cannot be held liable if someone accesses your account because you shared your password.
          </p>
        </section>

        <section className="mb-12 legal-section">
          <h2 className="type-statement mb-4 weight-500 text-primary">Early Stage Disclaimer</h2>
          <p className="type-body mb-4 voice-normal text-secondary">
            Kalai is an evolving product. We are constantly upgrading the AI models, adding features, and adjusting the interface. As a result, there may be occasional downtime, bugs, or shifts in how the platform behaves.
          </p>
          <p className="type-body mb-4 voice-normal text-secondary">
            We do not guarantee 100% uptime, nor do we guarantee specific financial outcomes or follower growth from using Kalai. You use the service as-is.
          </p>
        </section>

        <section className="mb-12 legal-section">
          <h2 className="type-statement mb-4 weight-500 text-primary">Limitation of Liability</h2>
          <p className="type-body mb-4 voice-normal text-secondary">
            To the maximum extent permitted by law, Kalai and D2V are not liable for any direct, indirect, incidental, or consequential damages resulting from your use of the platform. If Kalai makes a mistake—such as publishing a typo or an imperfect image—we are not liable for any resulting business loss. You always have the ability to review generated content before it is published on non-autonomous schedules.
          </p>
        </section>

        <section className="mb-24 legal-section">
          <h2 className="type-statement mb-4 weight-500 text-primary">Changes</h2>
          <p className="type-body mb-4 voice-normal text-secondary">
            As the product grows, these terms will likely update. If we make significant changes, we will notify you and update the date at the top of this page.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
