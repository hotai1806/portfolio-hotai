import { X } from "lucide-react";
// import { gsap } from "gsap";
// import FontFaceObserver from "fontfaceobserver";
interface NavigationProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function Navigation({ isOpen, toggleMenu }: NavigationProps) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-96 bg-black/90 backdrop-blur-lg transform transition-transform duration-500 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
    >
      <button onClick={toggleMenu} className="absolute top-8 right-8">
        <X className="w-8 h-8 text-white" />
      </button>
      <nav className="flex flex-col p-12 pt-24">
        {["Home", "Project", "About", "Contact"].map((item, index) => (
          <FlipLink
            key={item}
            style={{ animationDelay: `${index * 100}ms` }}
            href={`#${item.toLowerCase()}`}
          >
            {item}
          </FlipLink>
        ))}
      </nav>
      {/* <RevealLinks /> */}
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";

// export const RevealLinks = () => {
//   return (
//     <section className="grid place-content-center gap-2 bg-green-300 px-8 py-24 text-black">
//       <FlipLink href="#">Twitter</FlipLink>
//       <FlipLink href="#">Linkedin</FlipLink>
//       <FlipLink href="#">Facebook</FlipLink>
//       <FlipLink href="#">Instagram</FlipLink>
//     </section>
//   );
// };

const DURATION = 0.25;
const STAGGER = 0.025;

interface FlipLinkProps {
  children: string;
  href: string;
  style: React.CSSProperties;
}

const FlipLink = ({ children, href }: FlipLinkProps) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-xl font-black uppercase sm:text-3xl md:text-5xl lg:text-5xl"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};
