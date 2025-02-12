"use client";
import React, { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";
import { motion } from "framer-motion"; // Or your chosen loading indicator component

// ... (spinnerVariants and LoadingScreen component code - mostly the same as before, just adjust CSS classes if using Tailwind)
const spinnerVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
    rotate: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 360,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      loop: Infinity,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.3,
    rotate: -180,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const LoadingScreen = () => {
  const { isLoading } = useContext(LoadingContext);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white/70 flex justify-center items-center z-50">
      <motion.div
        className="w-16 h-16 rounded-full flex justify-center items-center"
        variants={spinnerVariants}
        initial="start"
        animate="animate"
        exit="exit"
      >
        <motion.div className="border-4 border-transparent border-t-blue-500 border-l-gray-200 border-b-gray-200 border-r-gray-200 rounded-full w-full h-full box-border" />
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
