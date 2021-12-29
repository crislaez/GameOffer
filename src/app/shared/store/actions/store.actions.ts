import { EntityStatus } from '@gameoffer/shared/utils/helpers/functions';
import { createAction, props } from '@ngrx/store';
import { Store } from '../models';


export const loadStores = createAction(
  '[Store] Load Stores',
);

export const saveStores = createAction(
  '[Store] Save Store',
  props<{ stores: Store[], error:unknown, status:EntityStatus }>()
);
