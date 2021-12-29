import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStore from '../reducers/store.reducer';

export const selectorCardState = createFeatureSelector<fromStore.State>(
  fromStore.storeFeatureKey
);

export const getStatus = createSelector(
  selectorCardState,
  (state) => state.status
);

export const getStores = createSelector(
  selectorCardState,
  (state) => state.stores
);

export const getError = createSelector(
  selectorCardState,
  (state) => state.error
);

