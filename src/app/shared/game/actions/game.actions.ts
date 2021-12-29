import { EntityStatus } from '@gameoffer/shared/utils/helpers/functions';
import { createAction, props } from '@ngrx/store';
import { Game } from '../models';


export const loadGames = createAction(
  '[Game] Load Games',
);

export const saveGames = createAction(
  '[Game] Save Games',
  props<{ games: Game[], error:unknown, status:EntityStatus }>()
);
