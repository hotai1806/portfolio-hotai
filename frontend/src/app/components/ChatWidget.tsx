"use client";
import { useState, useEffect } from "react";
import { X, MessageSquare } from "lucide-react";

const CHAT_STORAGE_KEY = "chatWidgetOpen";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (raw !== null) setIsOpen(raw === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, String(isOpen));
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-6 right-6 z-50 bg-white rounded-xl shadow-lg border overflow-hidden w-80 h-96 flex flex-col">
          {/* header */}
          <div className="flex justify-between items-center p-2 border-b text-sm font-medium text-black">
            <span>Chat</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X size={16} />
            </button>
          </div>
          {/* iframe */}
          <div className="flex-1 p-3 text-sm text-gray-700">
            👋 Hello! This is a placeholder chat box. You can integrate a real
            model later.
          </div>
          {/* <iframe
            src="https://chat-widget.vercel.app"
            className="w-full h-full border-0"
            allow="clipboard-write; fullscreen"
          /> */}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-6 right-6 z-50 rounded-full p-3 bg-vanilla-primary text-black shadow-lg hover:opacity-90 transition"
          title="Open chat"
        >
          <MessageSquare className="w-7 h-7" />
        </button>
      )}
    </>
  );
}
