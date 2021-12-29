import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationModule } from '@gameoffer/shared/notification/notification.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GameEffects } from './effects/game.effects';
import * as fromGame from './reducers/game.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromGame.gameFeatureKey, fromGame.reducer),
    EffectsModule.forFeature([GameEffects]),
  ]
})
export class GameModule { }
