import Arrival from "./components/Arrival";
import Disruption from "./components/Disruption";
import Revelation from "./components/Revelation";
import Proof from "./components/Proof";
import Desire from "./components/Desire";
import Conversion from "./components/Conversion";
import Ecosystem from "./components/Ecosystem";
import Footer from "./components/Footer";
import StageObserver from "./components/StageObserver";
import NinjaAnchor from "./components/NinjaAnchor";
import CinematicEnvironment from "./components/CinematicEnvironment";
import StageAnimations from "./components/StageAnimations";

export default function Home() {
  return (
    <main>
      {/* GSAP ScrollTrigger ↔ Lenis sync + stage triggers */}
      <StageObserver />

      {/* Stage-by-stage scroll-driven animations + depth overlays */}
      <StageAnimations />

      {/* The 3D Ninja Anchor — replacing the abstract thread entirely */}
      <NinjaAnchor />
      <CinematicEnvironment />

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
    </main>
  );
}
