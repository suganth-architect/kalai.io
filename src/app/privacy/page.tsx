"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import CinematicEnvironment from "../components/CinematicEnvironment";
import Footer from "../components/Footer";
import Link from "next/link";

export default function PrivacyPage() {
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
          <h1 className="type-heading mb-4 text-primary">Privacy Policy</h1>
          <p className="type-body voice-aside">
            Last updated: March 2026
          </p>
        </div>

        <section className="mb-12 legal-section">
          <h2 className="type-statement mb-4 weight-500 text-primary">How we respect your data.</h2>
          <p className="type-body mb-4 voice-normal text-secondary">
            Kalai is an autonomous marketing agent designed to handle your creative output. 
            Because we are an early-stage product constantly evolving to serve you better, 
            we keep our data collection minimal and intentional.
          </p>
          <p className="type-body mb-4 voice-normal text-secondary">
            We {"don't"} sell your data. We {"don't"} train our models indefinitely on your private communications without your consent. 
            We only collect what is strictly necessary to make Kalai work for you.
          </p>
        </section>

        <div className="h-[1px] w-full bg-white/5 my-12 legal-section" />

        <section className="mb-12 legal-section">
          <h2 className="type-statement mb-4 weight-500 text-primary">What we collect</h2>
          <ul className="flex flex-col gap-6 mt-6">
            <li className="type-body voice-normal text-secondary">
              <strong className="text-primary font-medium">Your Email.</strong> If you request early access or create an account, we store your email to notify you, verify your identity, and communicate necessary product updates.
            </li>
            <li className="type-body voice-normal text-secondary">
              <strong className="text-primary font-medium">Business Context.</strong> Information you provide about your business—your name, your work photos, and your goals—is stored to build your Brand Brain and generate accurate marketing content.
            </li>
            <li className="type-body voice-normal text-secondary">
              <strong className="text-primary font-medium">Platform Connections.</strong> If you connect social platforms (like Instagram or Google Business Profile), we store the necessary auth tokens securely to publish on your behalf.
            </li>
            <li className="type-body voice-normal text-secondary">
              <strong className="text-primary font-medium">Basic Usage Data.</strong> We look at aggregate data—like how you use the site and what device you are on—to understand performance and fix bugs.
            </li>
          </ul>
        </section>

        <section className="mb-12 legal-section">
          <h2 className="type-statement mb-4 weight-500 text-primary">How we use it</h2>
          <p className="type-body mb-6 voice-normal text-secondary">
            Everything we collect is used to make Kalai function autonomously for your brand. We use your data to:
          </p>
          <ul className="flex flex-col gap-3 list-disc list-inside text-secondary">
            <li className="type-body voice-normal">Generate brand-aligned visual and written content.</li>
            <li className="type-body voice-normal">Publish to your connected platforms when required.</li>
            <li className="type-body voice-normal">Improve the underlying models generating your content.</li>
            <li className="type-body voice-normal">Notify you when your spot in line is ready.</li>
          </ul>
        </section>

        <section className="mb-12 legal-section">
          <h2 className="type-statement mb-4 weight-500 text-primary">The tools we use</h2>
          <p className="type-body mb-6 voice-normal text-secondary">
            We partner with a few trusted third-party services that help keep Kalai running. They access your data only to the extent necessary to perform their specific function:
          </p>
          <ul className="flex flex-col gap-4 list-disc list-inside text-secondary">
            <li className="type-body voice-normal">
              <strong className="text-primary font-medium">Authentication:</strong> To securely manage your identity and login state.
            </li>
            <li className="type-body voice-normal">
              <strong className="text-primary font-medium">Hosting & Storage:</strong> To securely host the application and store data in compliant environments.
            </li>
            <li className="type-body voice-normal">
              <strong className="text-primary font-medium">AI Partners:</strong> Providers like Anthropic and Gemini are used to generate content. They do not use your private generations to train their public models.
            </li>
          </ul>
        </section>

        <section className="mb-12 legal-section">
          <h2 className="type-statement mb-4 weight-500 text-primary">Your control</h2>
          <p className="type-body mb-4 voice-normal text-secondary">
            You own your business data. At any time, you can ask us to delete your account, remove your email from our list, or revoke {"Kalai’s"} access to your social profiles.
          </p>
          <p className="type-body mb-4 voice-normal text-secondary">
            If you need anything removed, simply reach out to us.
          </p>
        </section>

        <section className="mb-24 legal-section">
          <h2 className="type-statement mb-4 weight-500 text-primary">Contact</h2>
          <p className="type-body mb-4 voice-normal text-secondary">
            Have questions? Just email us.
            <br />
            <a href="mailto:hello@kalai.io" className="text-accent hover:text-accent-muted transition-colors mt-3 inline-block font-medium">hello@kalai.io</a>
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
