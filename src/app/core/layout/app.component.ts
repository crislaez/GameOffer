import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trackById } from '@gameoffer/shared/utils/helpers/functions';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  template:`
  <ion-app >

   <!-- MENU LATERAL  -->
   <ion-menu side="start" menuId="first" contentId="main">
     <ion-header>
       <ion-toolbar >
         <ion-title class="text-color" >{{ 'COMMON.MENU' | translate}}</ion-title>
       </ion-toolbar>
     </ion-header>

     <ion-content >
       <ion-item class="text-second-color" *ngFor="let item of lateralMenu;  trackBy: trackById" [routerLink]="['/'+item?.link]" (click)="openEnd()">{{ item?.text | translate }}</ion-item>
     </ion-content >
   </ion-menu>

   <!-- RUTER  -->
   <ion-router-outlet id="main"></ion-router-outlet>

   <!-- TAB FOOTER  -->
   <!-- <ion-tabs >
     <ion-tab-bar  [translucent]="true" slot="bottom">
       <ion-tab-button class="text-color" [routerLink]="['jobs']">
        <ion-icon name="bag-outline"></ion-icon>
       </ion-tab-button>

       <ion-tab-button class="text-color" [routerLink]="['trainings']">
        <ion-icon name="document-text-outline"></ion-icon>
       </ion-tab-button>

     </ion-tab-bar>
   </ion-tabs> -->
   <!-- <div>Iconos diseñados por <a href="https://www.flaticon.es/autores/flat-icons" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div> -->
 </ion-app>
 `,
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  trackById = trackById;
  lateralMenu: {id:number, link:string, text:string}[] = [
    {
      id:1,
      link:'games',
      text:'COMMON.GAMES'
    },
    {
      id:2,
      link:'deals',
      text:'COMMON.DEALS'
    },
    {
      id:3,
      link:'stores',
      text:'COMMON.STORES'
    }
  ];


  constructor(
    private menu: MenuController,
    private router: Router
  ) {}


  open() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.close();
  }


}
