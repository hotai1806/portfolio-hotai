"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const RouteLoadingIndicator = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    let messageTimer: NodeJS.Timeout;

    const startLoading = () => {
      setLoading(true);
      setProgress(0);
      setMessage("Loading...");

      // Simulate progress
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressTimer);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      // Update loading messages
      const messages = [
        "Loading...",
        "Almost there...",
        "Just a moment...",
        "Finishing up...",
      ];
      let messageIndex = 0;

      messageTimer = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        setMessage(messages[messageIndex]);
      }, 2000);
    };

    const completeLoading = () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
      setProgress(100);
      setMessage("Done!");

      // Small delay before hiding the loader
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
    };

    // Start loading when pathname or search params change
    startLoading();

    // Complete loading after a short delay to simulate navigation
    const timer = setTimeout(completeLoading, 1000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
      clearTimeout(timer);
    };
  }, [pathname, searchParams]); // Trigger effect when pathname or search params change

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <div className="text-gray-700 font-medium">{message}</div>
          <div className="text-sm text-gray-500">{progress}%</div>
        </div>
      </div>
    </div>
  );
};

export default RouteLoadingIndicator;
