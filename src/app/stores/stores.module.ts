import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GenericsModule } from '@gameoffer/shared-ui/generics/generics.module';
import { DealModule } from '@gameoffer/shared/deal/deal.module';
import { SharedModule } from '@gameoffer/shared/shared/shared.module';
import { StoresModule } from '@gameoffer/shared/store/store.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AllStoresPageComponent } from './containers/all-stores-page.component';
import { StoresPage } from './containers/stores.page';
import { StoresPageRoutingModule } from './stores-routing.module';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    IonicModule,
    SharedModule,
    StoresModule,
    DealModule,
    GenericsModule,
    StoresPageRoutingModule
  ],
  declarations: [
    StoresPage,
    AllStoresPageComponent
  ]
})
export class StoresPageModule {}
