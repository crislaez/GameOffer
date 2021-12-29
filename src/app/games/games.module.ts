import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameModule } from '@gameoffer/shared/game/game.module';
import { IonicModule } from '@ionic/angular';
import { GamesPage } from './containers/games.page';
import { GamesPageRoutingModule } from './games-routing.module';
import { GamesEffects } from './effects/games.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameModule,
    EffectsModule.forFeature([GamesEffects]),
    GamesPageRoutingModule
  ],
  declarations: [GamesPage]
})
export class GamesPageModule {}
