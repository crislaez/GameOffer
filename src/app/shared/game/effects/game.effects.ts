import { Injectable } from '@angular/core';
import { NotificationActions } from '@gameoffer/shared/notification';
import { EntityStatus } from '@gameoffer/shared/utils/helpers/functions';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as GameActions from '../actions/game.actions';
import { GameService } from '../services/game.service';


@Injectable()
export class GameEffects {

  loadGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.loadGames),
      switchMap(() => {
        return this._game.getGames().pipe(
          map((games) => GameActions.saveGames({ games, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              GameActions.saveGames({ games:[], error, status:EntityStatus.Loaded }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_GAMES'})
            )
          })
        )
      })
    );
  });


  constructor(
    private actions$: Actions,
    private _game: GameService,
    public toastController: ToastController,
  ) { }


}
