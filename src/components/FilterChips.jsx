import React from "react";

const CATEGORIES = ["All", "Web", "Mobile", "AI", "Blockchain"];

const FilterChips = ({ active, onChange }) => {
  return (
    <div
      role="tablist"
      aria-label="Filter case studies by category"
      className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
    >
      {CATEGORIES.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={`min-h-[44px] rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3F5EFB] ${
              isActive
                ? "bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] text-white shadow-lg shadow-purple-900/40 scale-105"
                : "bg-[#110D2E]/60 text-gray-300 hover:bg-[#FC466B]/20 hover:text-white"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default FilterChips;
