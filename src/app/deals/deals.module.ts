import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GenericsModule } from '@gameoffer/shared-ui/generics/generics.module';
import { DealModule } from '@gameoffer/shared/deal/deal.module';
import { StoresModule } from '@gameoffer/shared/store/store.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DealsPage } from './containers/deals.page';
import { DealsPageRoutingModule } from './deals-routing.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
    DealModule,
    StoresModule,
    GenericsModule,
    DealsPageRoutingModule
  ],
  declarations: [
    DealsPage
  ]
})
export class DealsPageModule {}
