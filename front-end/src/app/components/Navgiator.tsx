import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import FlipLink from "./TextAnimationFlip";
import Image from "next/image";
import { motion } from "framer-motion";

interface NavigationProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function Navigation({ isOpen, toggleMenu }: NavigationProps) {
  const [rotation, setRotation] = useState(0); // Track the rotation

  const handleHover = (index: number) => {
    setRotation((index + 1) * 90); // 120° * (1 for B, 2 for C, 3 for D)
  };
  const handleLeave = () => {
    setRotation(0); // Reset rotation when the mouse leaves
  };
  useEffect(() => {
    if (isOpen) {
      setRotation(180); // Rotate 360° when the menu is open
    }
  }, [isOpen]);
  return (
    <div
      className={` fixed top-0 right-0 h-full w-full md:w-2/5 bg-black/90 backdrop-blur-lg transform transition-transform duration-500 bg-blue-primary  font-extrabold ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
    >
      <button
        onClick={() => {
          toggleMenu();
          handleHover(3);
        }}
        className="absolute top-8 right-8"
      >
        <X className="w-8 h-8 text-white" />
      </button>
      <div className="flex my-12 mx-11 items-center h-24">
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Image src="/plus.svg" alt="spinner" width={150} height={150} />
        </motion.div>
      </div>

      <nav className="flex flex-col p-12 pt-24">
        {["Home", "Project", "About", "Contact"].map((item, index) => (
          <span
            key={item}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleLeave()}
          >
            <FlipLink
              // key={item}
              additionTailwindClass="text-xl sm:text-3xl md:text-9xl lg:text-9xl text-vanilla-primary"
              style={{ animationDelay: `${index * 100}ms` }}
              href={`#${item.toLowerCase()}`}
            >
              {item}
            </FlipLink>
          </span>
        ))}
      </nav>
      {/* <RevealLinks /> */}
    </div>
  );
}
