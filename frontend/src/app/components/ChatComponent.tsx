"use client";
import { useState, useEffect } from "react";

export const ChatComponent = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type } = event.data;
      if (type === "CHAT_MINIMIZED") setIsMinimized(true);
      if (type === "CHAT_MAXIMIZED") setIsMinimized(false);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      src="/chat-widget.html"
      className={`chat-iframe ${isMinimized ? "minimized" : ""}`}
    />
  );
};
