import { EntityStatus } from '@gameoffer/shared/utils/helpers/functions';
import { createReducer, on } from '@ngrx/store';
import * as DealActions from '../actions/deal.actions';
import { Deal, Filter } from '../models';

export const dealFeatureKey = 'deal';

export interface State {
  status: EntityStatus;
  deals?: Deal[];
  lastDeals?: Deal[];
  pageNumber?:number;
  totalPages?:number;
  filter?: Filter;
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  deals: [],
  lastDeals: [],
  pageNumber: 0,
  totalPages:0,
  filter: null,
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(DealActions.loadDeals, (state): State => ({ ...state,  error: undefined, status: EntityStatus.Pending })),
  on(DealActions.saveDeals, (state, { deals, pageNumber, filter, totalPages, status, error }): State => {
    const dealsState = ( pageNumber === 0) ? [...deals] : [...state?.deals, ...deals];
    return ({ ...state, deals: dealsState || [], pageNumber, filter, totalPages, status, error })
  }),

  on(DealActions.loadLastDeals, (state): State => ({ ...state,  error: undefined, status: EntityStatus.Pending })),
  on(DealActions.saveLastDeals, (state, { deals, error, status }): State => ({ ...state, lastDeals:deals,  error, status })),
);
