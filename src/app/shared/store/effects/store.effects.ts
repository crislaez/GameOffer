import { Injectable } from '@angular/core';
import { NotificationActions } from '@gameoffer/shared/notification';
import { EntityStatus } from '@gameoffer/shared/utils/helpers/functions';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as StoreActions from '../actions/store.actions';
import { StoreService } from '../services/store.service';


@Injectable()
export class StoreEffects implements OnInitEffects {

  loadGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.loadStores),
      switchMap(() => {
        return this._store.getStores().pipe(
          map((stores) => StoreActions.saveStores({ stores, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              StoreActions.saveStores({ stores:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_STORES'})
            )
          })
        )
      })
    );
  });

  ngrxOnInitEffects(): Action {
    return StoreActions.loadStores();
  }


  constructor(
    private actions$: Actions,
    private _store: StoreService,
    public toastController: ToastController,
  ) { }


}
