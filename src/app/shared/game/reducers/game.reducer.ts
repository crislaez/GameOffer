import { EntityStatus } from '@gameoffer/shared/utils/helpers/functions';
import { createReducer, on } from '@ngrx/store';
import * as GameActions from '../actions/game.actions';
import { Game } from '../models';

export const gameFeatureKey = 'game';

export interface State {
  status: EntityStatus;
  games?: Game[];
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  games: null,
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(GameActions.loadGames, (state): State => ({ ...state,  error: undefined, status: EntityStatus.Pending })),
  on(GameActions.saveGames, (state, { games, status, error }): State => ({ ...state, games, status, error }))
);
