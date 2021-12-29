import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationModule } from '@gameoffer/shared/notification/notification.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreEffects } from './effects/store.effects';
import * as fromStore from './reducers/store.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducer),
    EffectsModule.forFeature([StoreEffects]),
  ]
})
export class StoresModule { }
