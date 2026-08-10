import { createSelector } from "@reduxjs/toolkit";

export const selectCaseStudiesState = (state) => state.caseStudies;

export const selectCaseStudiesItems = (state) => state.caseStudies.items;

export const selectCaseStudiesStatus = (state) => state.caseStudies.status;

export const selectCaseStudiesError = (state) => state.caseStudies.error;

export const selectCaseStudyFilters = (state) => state.caseStudies.filters;

export const selectFilteredCaseStudies = createSelector(
  [selectCaseStudiesItems, selectCaseStudyFilters],
  (items, filters) => {
    const query = filters.query.trim().toLowerCase();
    return items.filter((study) => {
      const matchesCategory =
        filters.category === "All" || study.category === filters.category;
      const matchesQuery =
        query.length === 0 ||
        study.title.toLowerCase().includes(query) ||
        study.summary.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }
);

export const selectVisibleCount = createSelector(
  [selectFilteredCaseStudies],
  (filtered) => filtered.length
);
