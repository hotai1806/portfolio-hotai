"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SliderWorking() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Freelance Web Development",
      description:
        "Worked on small-scale projects, improving problem-solving and technical skills.",
      image: "images/landingpage.png",
      website: "Personal Portfolio",
      urlSite: "https://qvieth.vercel.app",
      service: "Full-Stack Development",
      development: "Landing Page, Ecommerce",
      tagline: "The future belongs to those who invest in it",
      awards: "To be update",
      isProof: true,
    },
    {
      id: 2,
      title: "TRUST BANK - Core Banking Squad",
      description:
        "Developed banking products like credit cards, loans, and deposits. Wrote logic for cash flow, CI/CD setup, and integration testing.",
      website: "gft.com",
      urlSite: "",
      service: "Banking Technology",
      development: "Core Banking",
      image: "/images/Trust-Bank2.png",
      tagline: "Shape of digital world",
      awards: "Launch Credit Card",
    },
    {
      id: 3,
      title: "Gov-Entry - RSAF COVID Entry App",
      description:
        "Developed APIs for an entry-checking application during COVID-19, integrated APIs into React.js, and designed schema support.",
      urlSite:
        "https://www.developer.tech.gov.sg/products/categories/platform/goventry/overview.html",
      website: "Goventry",
      development: "CMS System and Attendee Check Point",
      service: "Government & Public Health",
      image: "/images/GovEntry.png",
      tagline: "Covid-19 and move forward",
      awards: "System help people control F0 in Covid-19",
      isProof: true,
    },
  ];

  const totalSlides = projects.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  // Handle scroll to translate to horizontal scroll
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const isAtRightEdge =
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 1;
      const isAtLeftEdge = container.scrollLeft <= 0;

      // Calculate scroll direction
      const isScrollingRight = e.deltaY > 0;
      const isScrollingLeft = e.deltaY < 0;

      // Only prevent default and handle scroll if:
      // 1. Scrolling right and not at right edge, OR
      // 2. Scrolling left and not at left edge
      if (
        (isScrollingRight && !isAtRightEdge) ||
        (isScrollingLeft && !isAtLeftEdge)
      ) {
        e.stopPropagation();
        e.preventDefault();

        console.log(e.deltaY, "222");
        const scrollAmount = e.deltaY * 30.5; // Increase speed

        const currentScrollLeft = scrollContainerRef.current.scrollLeft;

        // Calculate the new scroll position
        const newScrollLeft = currentScrollLeft + scrollAmount;
        scrollContainerRef.current.scrollLeft += scrollAmount;
        console.info("ww", newScrollLeft);

        // Calculate new slide index
        const projectWidth =
          scrollContainerRef.current.scrollWidth / projects.length;

        const newSlide = Math.round(newScrollLeft / projectWidth);

        console.log("newSlide", newSlide);
        setCurrentSlide((prev) =>
          newSlide >= 0 && newSlide < totalSlides ? newSlide : prev
        );
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleScroll, {
        passive: false,
      });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleScroll);
      }
    };
  }, [projects.length, totalSlides]); // Remove `currentSlide` from dependency to avoid loop

  // Scroll to the current slide when it changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left:
          currentSlide *
          (scrollContainerRef.current.scrollWidth / projects.length),
        behavior: "smooth",
      });
    }
  }, [currentSlide, projects.length]);

  return (
    <div className="bg-black text-white min-h-screen ">
      {/* Header */}
      <header className="p-12">
        <div
          className={`flex ${
            isMobile ? "flex-col space-y-4" : "justify-between items-center"
          }`}
        >
          <div
            className={`flex items-center ${isMobile ? "justify-between" : ""}`}
          >
            <div className="text-2xl font-bold mr-16"> B </div>
            <div>
              <div className="uppercase text-sm font-mono">
                HO TAN TAI [ STEVEN ]
              </div>
            </div>
          </div>
          <div
            className={`uppercase text-sm font-mono ${isMobile ? "mt-4" : ""}`}
          >
            Software Engineer / <br />
            Full-stack Developer
          </div>
          <div
            className={`text-xs flex items-center ${isMobile ? "mt-4" : ""}`}
          >
            <span className="h-2 w-2 bg-red-500 rounded-full inline-block mr-2"></span>
            Available from 18 June
          </div>
        </div>
      </header>

      {/* Main Content with Horizontal Scroll */}
      <main className="px-12 py-8">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory flex-nowrap"
          style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`flex-none ${
                isMobile ? "w-full" : "w-2/3"
              } pr-4 md:pr-6 snap-start`}
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="bg-zinc-900 rounded-lg overflow-hidden h-full">
                <div className="p-6 pb-0">
                  <div
                    className={`grid ${
                      isMobile ? "grid-cols-2" : "grid-cols-3"
                    } gap-2 md:gap-4 text-xs font-mono mb-4`}
                  >
                    <div>
                      <div className="text-gray-500 mb-1">SERVICE:</div>
                      <div>{project.service}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">DEVELOPMENT:</div>
                      <div>{project.development}</div>
                    </div>
                    {!isMobile && (
                      <div>
                        <div className="text-gray-500 mb-1">AWARDS:</div>
                        <div>{project.awards}</div>
                      </div>
                    )}
                  </div>

                  <div className="relative h-64 w-full mb-4 bg-black rounded overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={project.image}
                        width={450}
                        height={450}
                        alt={project.title}
                      />
                      <div className="w-full h-full bg-zinc-800 relative">
                        {project.tagline && (
                          <div className="absolute bottom-8 left-8 text-3xl font-bold max-w-xs leading-tight">
                            {project.tagline}
                          </div>
                        )}
                        {project.title === "Mythic Codex" && (
                          <div className="absolute bottom-8 w-full text-center text-2xl font-bold uppercase leading-tight text-green-500">
                            Explore the
                            <br />
                            realms of mythical
                            <br />
                            creatures
                          </div>
                        )}
                        {project.isProof && (
                          <Link href={project.urlSite}>
                            <div className="absolute right-4 bottom-4 bg-white text-black text-xs px-3 py-1">
                              VISIT WEBSITE
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <div>
                      <div className="text-gray-500 text-xs font-mono mb-1">
                        WEBSITE:
                      </div>
                      <Link href={project.urlSite}>
                        <div className="text-xs font-mono uppercase">
                          {project.website}
                        </div>
                      </Link>
                    </div>
                    <div className="text-xs uppercase font-bold bg-zinc-800 px-3 py-1 self-end">
                      {project.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide indicator */}
        <div className="flex justify-center mt-2 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? "bg-white" : "bg-zinc-700"
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </main>

      {/* Footer with Navigation Controls */}
      <footer className="p-12">
        <div
          className={`flex ${
            isMobile ? "flex-col space-y-4" : "justify-between"
          }`}
        >
          <div className="flex space-x-4">
            <button
              className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 transition-colors"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 transition-colors"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div
            className={`flex items-center ${isMobile ? "justify-between" : ""}`}
          >
            <div className="text-sm mr-4 text-zinc-500">
              {currentSlide + 1} / {totalSlides}
            </div>
          </div>
        </div>
      </footer>

      {/* Add custom CSS for hiding scrollbars */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
