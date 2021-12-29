import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { ItemModalComponent } from './components/item-modal.component';
import { FilterComponent } from './components/filter.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    ItemModalComponent,
    FilterComponent
  ],
  exports:[
    ItemModalComponent,
    FilterComponent
  ]
})
export class GenericsModule { }
