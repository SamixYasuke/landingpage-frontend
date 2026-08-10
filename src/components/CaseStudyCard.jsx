import React from "react";

const CATEGORY_STYLES = {
  Web: "from-sky-500/20 to-sky-500/40 text-sky-300",
  Mobile: "from-pink-500/20 to-pink-500/40 text-pink-300",
  AI: "from-purple-500/20 to-purple-500/40 text-purple-300",
  Blockchain: "from-emerald-500/20 to-emerald-500/40 text-emerald-300",
};

const CaseStudyCard = ({ title, category, summary, year }) => {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[#3F5EFB]/20 bg-[#110D2E]/60 p-6 transition-all duration-300 hover:border-[#FC466B]/50 hover:bg-[#110D2E] hover:shadow-xl hover:shadow-purple-900/30">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span
          className={`rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold ${CATEGORY_STYLES[category]}`}
        >
          {category}
        </span>
        <span className="text-sm font-medium text-gray-400">{year}</span>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-purple-300">
        {title}
      </h3>

      <p className="flex-1 text-sm leading-relaxed text-gray-300">{summary}</p>

      <button
        type="button"
        className="mt-6 self-start rounded-full px-5 py-2 text-sm font-semibold text-white transition-all duration-150 hover:bg-gradient-to-r hover:from-[#FC466B]/40 hover:to-[#3F5EFB]/40 hover:shadow-lg hover:scale-105"
      >
        View Project
      </button>
    </article>
  );
};

export default CaseStudyCard;
