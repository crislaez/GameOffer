import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModule } from '@gameoffer/shared/notification/notification.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DealEffects } from './effects/deal.effects';
import * as fromDeal from './reducers/deal.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromDeal.dealFeatureKey, fromDeal.reducer),
    EffectsModule.forFeature([DealEffects]),
  ]
})
export class DealModule { }
