import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import FilterChips from "./FilterChips";
import CaseStudyCard from "./CaseStudyCard";
import { setCategory, setQuery, fetchCaseStudiesAsync } from "../features/caseStudies/caseStudiesSlice";
import {
  selectCaseStudiesStatus,
  selectCaseStudiesError,
  selectFilteredCaseStudies,
  selectVisibleCount,
  selectCaseStudyFilters,
} from "../features/caseStudies/caseStudiesSelectors";

const SKELETON_COUNT = 6;

const useDebouncedValue = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
      <div
        key={index}
        className="animate-pulse rounded-2xl border border-[#3F5EFB]/10 bg-[#110D2E]/60 p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="h-6 w-20 rounded-full bg-purple-500/20" />
          <div className="h-4 w-10 rounded bg-purple-500/20" />
        </div>
        <div className="mb-3 h-5 w-3/4 rounded bg-white/10" />
        <div className="mb-2 h-3 w-full rounded bg-white/10" />
        <div className="mb-2 h-3 w-5/6 rounded bg-white/10" />
        <div className="mb-6 h-3 w-2/3 rounded bg-white/10" />
        <div className="h-8 w-28 rounded-full bg-[#6318F1]/30" />
      </div>
    ))}
  </div>
);

const ErrorState = ({ error, onRetry }) => (
  <div className="mx-auto max-w-md rounded-2xl border border-[#FC466B]/30 bg-[#110D2E]/60 p-10 text-center">
    <p className="text-5xl">⚠️</p>
    <h3 className="mt-4 text-xl font-semibold text-white">Couldn't load case studies</h3>
    <p className="mt-2 text-sm text-gray-400">{error}</p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-6 rounded-full bg-[#6318F1] px-6 py-2.5 font-semibold text-white transition-all duration-150 hover:bg-gradient-to-r hover:from-[#FC466B]/40 hover:to-[#3F5EFB]/40 hover:shadow-lg hover:scale-105"
    >
      Retry
    </button>
  </div>
);

const EmptyState = ({ hasActiveFilters, onReset }) => (
  <div className="mx-auto max-w-md rounded-2xl border border-dashed border-[#3F5EFB]/30 bg-[#110D2E]/40 p-10 text-center">
    <p className="text-5xl">🔍</p>
    <h3 className="mt-4 text-xl font-semibold text-white">No matching case studies</h3>
    <p className="mt-2 text-sm text-gray-400">
      Try a different category or search term.
    </p>
    {hasActiveFilters && (
      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-full bg-[#6318F1] px-6 py-2.5 font-semibold text-white transition-all duration-150 hover:bg-gradient-to-r hover:from-[#FC466B]/40 hover:to-[#3F5EFB]/40 hover:scale-105"
      >
        Clear filters
      </button>
    )}
  </div>
);

const CaseStudiesBoard = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectCaseStudiesStatus);
  const error = useSelector(selectCaseStudiesError);
  const { category, query } = useSelector(selectCaseStudyFilters);
  const filteredStudies = useSelector(selectFilteredCaseStudies);
  const visibleCount = useSelector(selectVisibleCount);

  const [searchInput, setSearchInput] = useState(query);
  const debouncedQuery = useDebouncedValue(searchInput);

  useEffect(() => {
    dispatch(fetchCaseStudiesAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setQuery(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  const hasActiveFilters = category !== "All" || query.trim().length > 0;

  return (
    <section id="case-studies" className="container mx-auto px-4 py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl">
        <div className="absolute inset-x-0 top-10 -z-10 mx-auto h-96 w-80 rounded-full bg-gradient-to-b from-purple-600 opacity-30 blur-3xl via-purple-500 to-purple-400" />

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Our{" "}
            <span className="bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] bg-clip-text text-transparent">
              Case Studies
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-gray-400">
            Real projects, real results. Explore how we've shipped products across
            Web, Mobile, AI and Blockchain.
          </p>
        </div>

        <div className="mb-8 flex flex-col items-center gap-4">
          <FilterChips active={category} onChange={(next) => dispatch(setCategory(next))} />

          <div className="relative w-full max-w-md">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search case studies..."
              aria-label="Search case studies"
              className="w-full rounded-full border border-[#3F5EFB]/30 bg-[#110D2E]/60 py-2.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#3F5EFB] focus:outline-none focus:ring-2 focus:ring-[#3F5EFB]/40"
            />
          </div>
        </div>

        {status === "loading" && <LoadingSkeleton />}

        {status === "failed" && (
          <ErrorState error={error} onRetry={() => dispatch(fetchCaseStudiesAsync())} />
        )}

        {status === "succeeded" && (
          <>
            <p className="mb-6 text-center text-sm text-gray-400">
              Showing <span className="font-semibold text-white">{visibleCount}</span>{" "}
              {visibleCount === 1 ? "result" : "results"}
            </p>

            {visibleCount === 0 ? (
              <EmptyState
                hasActiveFilters={hasActiveFilters}
                onReset={() => {
                  dispatch(setCategory("All"));
                  dispatch(setQuery(""));
                  setSearchInput("");
                }}
              />
            ) : (
              <div
                key={`${category}-${query}-${visibleCount}`}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-300"
              >
                {filteredStudies.map((study) => (
                  <CaseStudyCard key={study.id} {...study} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CaseStudiesBoard;
