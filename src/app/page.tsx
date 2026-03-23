import Arrival from "./components/Arrival";
import Disruption from "./components/Disruption";
import Revelation from "./components/Revelation";
import Proof from "./components/Proof";
import Desire from "./components/Desire";
import Conversion from "./components/Conversion";
import Ecosystem from "./components/Ecosystem";
import Footer from "./components/Footer";
import StageController from "./components/StageController";
import CinematicEnvironment from "./components/CinematicEnvironment";
import BootSequence from "./components/BootSequence";
import AudioController from "./components/AudioController";
import KonamiKalai from "./components/KonamiKalai";

export default function Home() {
  return (
    <main className="relative w-full bg-black">
      {/* Immersive Sensory Layers */}
      <BootSequence />
      <AudioController />
      <KonamiKalai />

      {/* Central GSAP Controller broadcasting Stage & ScrollProgress + animating typography zones */}
      <StageController />

      {/* LAYER 0: The WebGL Background */}
      <div className="fixed inset-0 z-[0] pointer-events-none touch-none">
        <CinematicEnvironment />
      </div>

      {/* LAYER 1: The Scrollable DOM (Lenis Target) */}
      <div className="relative z-[10] w-full pointer-events-auto">
        {/* Stage 1: Authority without explanation */}
        <Arrival />

        {/* Stage 2: Break existing beliefs */}
        <Disruption />

        {/* Stage 3: Introduce Kalai as autonomous agent */}
        <Revelation />

        {/* Stage 4: Show system intelligence through outcomes */}
        <Proof />

        {/* Stage 5: Make user imagine life with Kalai */}
        <Desire />

        {/* Stage 6: Make action inevitable */}
        <Conversion />

        {/* Stage 7: Ecosystem - Built by D2V */}
        <Ecosystem />

        {/* End of scroll */}
        <Footer />
      </div>
    </main>
  );
}
