"use client";
import { useState, useEffect } from "react";
import { Menu, ArrowRight } from "lucide-react";
import Navigation from "./components/Navgiator";
import { FadeInSection } from "./components/ThreeBackground";
import FlipLink from "./components/TextAnimationFlip";
// import ModelViewer from "./components/ModelView";
// import ModelViewer from "./components/ModelView";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black/95 min-h-screen text-white">
      {/* <ThreeBackground /> */}

      {/* Rest of the Portfolio component remains the same... */}
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-40 px-8 py-6 flex justify-between items-center transition-all duration-300 ${
          scrollPosition > 50 ? "bg-black/80 backdrop-blur-lg" : ""
        }`}
      >
        <FlipLink
          href="/"
          additionTailwindClass="text-4xl whitespace text-vanilla-primary"
          className="text-2xl font-bold hover:text-blue-400 transition-colors  "
          style={{
            lineHeight: 0.75,
          }}
        >
          HO TAN TAI
        </FlipLink>

        <button
          onClick={() => setIsMenuOpen(true)}
          className="z-50 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Menu className="w-8 h-8" />
        </button>
      </header>

      <Navigation isOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(false)} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-8 relative">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            {/* <ModelViewer /> */}
            <span
              className="block transform transition-transform hover:translate-x-4 duration-300 text-vanilla-primary"
              style={{
                lineHeight: "0.888em",
                fontSize: `clamp(65px, 20.8333vw, 440px)`,
              }}
            >
              FULLSTACK
            </span>
            {/* <ModelViewer /> */}
            <span
              className="block transform transition-transform hover:translate-x-4 duration-300 text-red-primary z-20"
              style={{
                lineHeight: "0.888em",
                fontSize: `clamp(65px, 20.8333vw, 440px)`,
              }}
            >
              DEVELOPER
            </span>
            <span className="block transform transition-transform hover:translate-x-4 duration-300 delay-100"></span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl transform transition-all duration-300 hover:text-white hover:translate-x-2">
            Creating immersive digital experiences through code and design.
          </p>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-8">
        <FadeInSection>
          <h2 className="text-4xl font-bold mb-16">Selected Work</h2>
        </FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[1, 2, 3, 4].map((item) => (
            <FadeInSection key={item}>
              <div
                className="group relative overflow-hidden"
                onMouseEnter={() => setHoveredProject(item)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden">
                  <div
                    className={`w-full h-full bg-gray-700 transition-all duration-500 ${
                      hoveredProject === item ? "scale-110 blur-sm" : ""
                    }`}
                  ></div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold mb-2 transition-colors group-hover:text-blue-400">
                    Project {item}
                  </h3>
                  <p className="text-gray-400 transition-colors group-hover:text-white">
                    Description of the project
                  </p>
                  <a
                    href={`#project-${item}`}
                    className="inline-flex items-center mt-4 group"
                  >
                    View Project
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </a>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-8 bg-gray-900/50 backdrop-blur-lg"
      >
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-4xl font-bold mb-8">About</h2>
            <p className="text-xl text-gray-400 mb-8 hover:text-white transition-colors">
              I&apos;m a creative developer based in [Your Location]. With a
              passion for creating immersive digital experiences, I combine
              technical expertise with creative design to build meaningful and
              innovative solutions.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <FadeInSection>
              <div className="transform hover:translate-x-2 transition-transform">
                <h3 className="text-2xl font-bold mb-4">Skills</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="hover:text-white transition-colors">
                    Frontend Development
                  </li>
                  <li className="hover:text-white transition-colors">
                    Creative Development
                  </li>
                  <li className="hover:text-white transition-colors">
                    3D Animation
                  </li>
                  <li className="hover:text-white transition-colors">
                    UI/UX Design
                  </li>
                </ul>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="transform hover:translate-x-2 transition-transform">
                <h3 className="text-2xl font-bold mb-4">Technologies</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="hover:text-white transition-colors">
                    React / Next.js
                  </li>
                  <li className="hover:text-white transition-colors">
                    Three.js
                  </li>
                  <li className="hover:text-white transition-colors">WebGL</li>
                  <li className="hover:text-white transition-colors">GLSL</li>
                </ul>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-4xl font-bold mb-8">
              Let&apos;s Work Together
            </h2>
            <p className="text-xl text-gray-400 mb-12 hover:text-white transition-colors">
              Have a project in mind? Let&apos;s create something amazing
              together.
            </p>
            <a
              href="mailto:your@email.com"
              className="inline-flex items-center text-2xl font-bold group hover:text-blue-400 transition-colors"
            >
              your@email.com
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-gray-800">
        <div className="flex justify-between items-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Your Name
          </p>
          <div className="flex gap-6">
            {["Twitter", "GitHub", "LinkedIn"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="text-gray-400 hover:text-white transition-colors hover:translate-y-[-2px] transform inline-block"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
