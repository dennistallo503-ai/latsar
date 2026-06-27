"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageLightboxProps {
  photos: string[];
  current: number;
  open: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ImageLightbox({
  photos,
  current,
  open,
  onClose,
  onNext,
  onPrev,
}: ImageLightboxProps) {
    useEffect(() => {
  if (!open) return;

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        onNext();
        break;

      case "ArrowLeft":
        onPrev();
        break;

      case "Escape":
        onClose();
        break;
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  // Lock Scroll
  document.body.style.overflow = "hidden";

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "";
  };
}, [open, onNext, onPrev, onClose]);
  if (!open) return null;
if (open) {
  const nextIndex = (current + 1) % photos.length;
  const prevIndex =
    current === 0 ? photos.length - 1 : current - 1;

  new window.Image().src = photos[nextIndex];
  new window.Image().src = photos[prevIndex];
}
  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="
          absolute
          top-6
          right-6
          z-50
          rounded-full
          bg-white/10
          p-3
          text-white
          backdrop-blur
          transition
          hover:bg-white/20
        "
      >
        <X size={26} />
      </button>

      {/* Previous */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="
          absolute
          left-6
          top-1/2
          -translate-y-1/2
          rounded-full
          bg-white/10
          p-3
          text-white
          backdrop-blur
          transition
          hover:bg-white/20
        "
      >
        <ChevronLeft size={36} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="
          absolute
          right-6
          top-1/2
          -translate-y-1/2
          rounded-full
          bg-white/10
          p-3
          text-white
          backdrop-blur
          transition
          hover:bg-white/20
        "
      >
        <ChevronRight size={36} />
      </button>

      {/* Counter */}
      <div
        className="
          absolute
          bottom-6
          left-1/2
          -translate-x-1/2
          rounded-full
          bg-black/50
          px-4
          py-2
          text-sm
          text-white
          backdrop-blur
        "
      >
        {current + 1} / {photos.length}
      </div>

      {/* Image */}
      <div
        className="
          relative
          h-[90vh]
          w-[90vw]
        "
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photos[current]}
          alt={`Foto ${current + 1}`}
          fill
          priority
          sizes="100vw"
          className="
            object-contain
            select-none
            animate-in
            zoom-in-95
            duration-300
          "
          draggable={false}
        />
      </div>
    </div>
  );
}