import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGame from '../reducers/game.reducer';

export const selectorCardState = createFeatureSelector<fromGame.State>(
  fromGame.gameFeatureKey
);

export const getStatus = createSelector(
  selectorCardState,
  (state) => state.status
);

export const getGames = createSelector(
  selectorCardState,
  (state) => state.games
);

export const getError = createSelector(
  selectorCardState,
  (state) => state.error
);

