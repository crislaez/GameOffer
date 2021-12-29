import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './layout/app.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
    RouterModule
  ],
  declarations: [
    AppComponent
  ],
})
export class CoreModule { }
