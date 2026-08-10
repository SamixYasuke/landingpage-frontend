import React from "react";
import { FiCheck } from "react-icons/fi";

const FeatureCard = ({ title, desc, isActive, onSelect }) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className={`group relative flex min-h-[160px] flex-col items-center justify-center rounded-2xl border p-6 text-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3F5EFB] ${
        isActive
          ? "border-transparent bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] text-white shadow-xl shadow-purple-900/40 scale-[1.03]"
          : "border border-[#3F5EFB]/25 bg-[#110D2E]/60 text-white hover:border-[#FC466B]/50 hover:bg-[#110D2E] hover:shadow-lg hover:shadow-purple-900/25"
      }`}
    >
      {isActive && (
        <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
          <FiCheck className="h-4 w-4" />
        </span>
      )}

      <span
        className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] text-lg font-bold transition-transform duration-300 group-hover:scale-110`}
      >
        {title.charAt(0)}
      </span>

      <span className="text-lg font-semibold">{title}</span>
      <span
        className={`mt-2 text-sm leading-relaxed ${
          isActive ? "text-white/90" : "text-gray-400"
        }`}
      >
        {desc}
      </span>
    </button>
  );
};

export default FeatureCard;
