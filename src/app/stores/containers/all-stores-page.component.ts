import { tap } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { fromStore, StoreActions } from '@gameoffer/shared/store';
import { emptyObject, errorImage, gotToTop, sliceTest, trackById } from '@gameoffer/shared/utils/helpers/functions';
import { IonContent, PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { CoreConfigService } from '@gameoffer/core/services/core-config.service';
import { ItemModalComponent } from '@gameoffer/shared-ui/generics/components/item-modal.component';


@Component({
  selector: 'app-all-stores-page',
  template: `
    <!-- HEADER  -->
    <ion-header no-border>
      <ion-toolbar mode="md|ios">
      <ion-back-button class="text-color" slot="start" defaultHref="/deals" [text]="''"></ion-back-button>
        <ion-title class="text-color" >{{'COMMON.STORES' | translate}}</ion-title>
        <div size="small" slot="end" class="div-clear"></div>
      </ion-toolbar>
    </ion-header>

    <!-- MAIN  -->
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
      <div class="container components-color-second">

        <ng-container *ngIf="(stores$ | async) as stores">
          <ng-container *ngIf="(status$ | async) as status">
            <ng-container *ngIf="status !== 'pending'; else loader">
              <ng-container *ngIf="status !== 'error'; else serverError">

                <ng-container *ngIf="stores?.length > 0; else noData">
                  <ion-list>
                    <ion-item class="ion-no-padding" *ngFor="let store of stores; trackBy: trackById">
                      <div class="ion-item">
                        <div class="ion-item-ion-image-store">
                          <ion-img cache=true [src]="baseUrl + store?.images?.logo" loading="lazy" (ionError)="errorImage($event)"></ion-img>
                        </div>

                        <div class="ion-item-ion-image-store">
                          <div class="text-second-color">{{ sliceTest(store?.storeName) }}</div>
                        </div>

                        <div class="text-second-color text-secondary" (click)="presentPopover($event, store)">
                          <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                        </div>
                      </div>
                    </ion-item>
                  </ion-list>
                </ng-container>

              </ng-container>
            </ng-container>
          </ng-container>
        </ng-container>

        <!-- REFRESH -->
        <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <!-- IS ERROR -->
        <ng-template #serverError>
          <div class="error-serve">
            <div>
              <span><ion-icon class="text-second-color big-size" name="cloud-offline-outline"></ion-icon></span>
              <br>
              <span class="text-second-color">{{'COMMON.ERROR' | translate}}</span>
            </div>
          </div>
        </ng-template>

        <!-- IS NO DATA  -->
        <ng-template #noData>
          <div class="error-serve">
            <div>
              <span><ion-icon class="text-second-color max-size" name="clipboard-outline"></ion-icon></span>
              <br>
              <span class="text-second-color">{{'COMMON.NORESULT' | translate}}</span>
            </div>
          </div>
        </ng-template>

        <!-- LOADER  -->
        <ng-template #loader>
          <div class="error-serve">
            <ion-spinner class="loadingspinner"></ion-spinner>
          </div>
        </ng-template>
      </div>

      <!-- TO TOP BUTTON  -->
      <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button class="color-button color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
      </ion-fab>

    </ion-content>
  `,
  styleUrls: ['./all-stores-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllStoresPageComponent {

  gotToTop = gotToTop;
  trackById = trackById;
  errorImage = errorImage;
  sliceTest = sliceTest;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton: boolean = false;
  baseUrl = this._coreConfig.getImageBaseUrl();

  stores$ = this.store.select(fromStore.getStores).pipe(tap(d => console.log(d)));
  status$ = this.store.select(fromStore.getStatus);

  constructor(
    private store: Store,
    private _coreConfig: CoreConfigService,
    private popoverController: PopoverController,
  ) { }


  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.store.dispatch(StoreActions.loadStores());
      event.target.complete();
    }, 500);
  }

  async presentPopover(ev, item: any) {
    const popover = await this.popoverController.create({
      component: ItemModalComponent,
      cssClass: 'my-custom-class',
      event: ev,
      componentProps:{
        item: item
      }
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();

    if(data === 'show'){
      window.location.href = `https://www.cheapshark.com/redirect?storeID=${item?.storeID - 1}`
    }
  }

}
