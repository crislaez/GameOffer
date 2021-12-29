import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllStoresPageComponent } from './containers/all-stores-page.component';
import { StoresPage } from './containers/stores.page';


const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component: AllStoresPageComponent
      },
      {
        path: ':storeId',
        component: StoresPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoresPageRoutingModule {}
