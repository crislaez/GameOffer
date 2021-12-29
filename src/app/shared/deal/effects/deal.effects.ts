import { Injectable } from '@angular/core';
import { NotificationActions } from '@gameoffer/shared/notification';
import { EntityStatus } from '@gameoffer/shared/utils/helpers/functions';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as DealActions from '../actions/deal.actions';
import { DealService } from '../services/deal.service';


@Injectable()
export class DealEffects implements OnInitEffects {

  loadGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DealActions.loadDeals),
      switchMap(({pageNumber, filter = null}) => {
        return this._deal.getDeals(pageNumber, filter).pipe(
          map(({deals, totalPages}) => DealActions.saveDeals({ deals, pageNumber, filter, totalPages, error: undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              DealActions.saveDeals({ deals:[], pageNumber, filter, totalPages:0, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_DEALS'})
            )
          })
        )
      })
    );
  });

  loadLastDeals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DealActions.loadLastDeals),
      switchMap(() => {
        return this._deal.getLastDeals().pipe(
          map((deals) => DealActions.saveLastDeals({ deals, error: undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              DealActions.saveLastDeals({ deals:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_DEALS'})
            )
          })
        )
      })
    );
  });


  ngrxOnInitEffects(): Action {
    return DealActions.loadLastDeals();
  }



  constructor(
    private actions$: Actions,
    private _deal: DealService
  ) { }


}
