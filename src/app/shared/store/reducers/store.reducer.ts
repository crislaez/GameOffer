import { EntityStatus } from '@gameoffer/shared/utils/helpers/functions';
import { createReducer, on } from '@ngrx/store';
import * as StoreActions from '../actions/store.actions';
import { Store } from '../models';

export const storeFeatureKey = 'store';

export interface State {
  status: EntityStatus;
  stores?: Store[];
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  stores: null,
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(StoreActions.loadStores, (state): State => ({ ...state,  error: undefined, status: EntityStatus.Pending })),
  on(StoreActions.saveStores, (state, { stores, status, error }): State => ({ ...state, stores, status, error }))
);
