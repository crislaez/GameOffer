import { EntityStatus } from '@gameoffer/shared/utils/helpers/functions';
import { createAction, props } from '@ngrx/store';
import { Deal, Filter } from '../models';


export const loadDeals = createAction(
  '[Deal] Load Deals',
  props<{ pageNumber: number, filter?: Filter }>()
);

export const saveDeals = createAction(
  '[Deal] Save Deals',
  props<{ deals: Deal[], pageNumber: number, filter?: Filter, totalPages: number, error:unknown, status:EntityStatus }>()
);


export const loadLastDeals = createAction(
  '[Deal] Load Last Deals'
);

export const saveLastDeals = createAction(
  '[Deal] Save Last Deals',
  props<{ deals: Deal[], error:unknown, status:EntityStatus }>()
);

