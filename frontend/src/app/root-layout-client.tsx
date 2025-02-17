// app/root-layout-client.js (Client Component - for React Hooks and loading logic)
"use client"; // Mark this file as a Client Component

import { LoadingProvider, LoadingContext } from "./contexts/LoadingContext";
import LoadingScreen from "./components/LoadingScreen";
import { useEffect, useContext } from "react";

import { ReactNode } from "react";

export default function RootLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  // Receive children as props
  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      startLoading();
    };
    const handleRouteChangeEnd = () => {
      stopLoading();
    };

    const handlePopstate = () => {
      // Back/Forward navigation
      handleRouteChangeStart();
      // Heuristic: Stop loading after a short delay (adjust as needed)
      setTimeout(handleRouteChangeEnd, 500);
    };

    const handlePushstate = () => {
      // Link navigation
      handleRouteChangeStart();
      // Heuristic: Stop loading after a short delay
      setTimeout(handleRouteChangeEnd, 500);
    };

    window.addEventListener("popstate", handlePopstate);
    window.addEventListener("pushstate", handlePushstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
      window.removeEventListener("pushstate", handlePushstate);
    };
  }, [startLoading, stopLoading]);

  return (
    <LoadingProvider>
      <LoadingScreen />
      {children}{" "}
      {/* Render the children passed from the Server Component layout */}
    </LoadingProvider>
  );
}
