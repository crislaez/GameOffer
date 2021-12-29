import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDeal from '../reducers/deal.reducer';

export const selectorCardState = createFeatureSelector<fromDeal.State>(
  fromDeal.dealFeatureKey
);

export const getStatus = createSelector(
  selectorCardState,
  (state) => state.status
);

export const getDeals = createSelector(
  selectorCardState,
  (state) => state.deals
);

export const getLastDeals = createSelector(
  selectorCardState,
  (state) => state.lastDeals
);

export const getPageNumber = createSelector(
  selectorCardState,
  (state) => state.pageNumber
);

export const getFilter = createSelector(
  selectorCardState,
  (state) => state.filter
);

export const getTotalPages = createSelector(
  selectorCardState,
  (state) => state.totalPages
);

export const getError = createSelector(
  selectorCardState,
  (state) => state.error
);

