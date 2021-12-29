import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { CoreConfigService } from '@gameoffer/core/services/core-config.service';
import { ItemModalComponent } from '@gameoffer/shared-ui/generics/components/item-modal.component';
import { Deal, DealActions, fromDeal } from '@gameoffer/shared/deal';
import { fromStore, StoreActions } from '@gameoffer/shared/store';
import { emptyObject, errorImage, gotToTop, sliceTest, trackById } from '@gameoffer/shared/utils/helpers/functions';
import { IonContent, IonInfiniteScroll, PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-deals',
  template:`
    <!-- HEADER  -->
    <ion-header no-border>
      <ion-toolbar mode="md|ios">
        <ion-title class="text-color" >{{'COMMON.TITLE' | translate}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- MAIN  -->
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
      <div class="container components-color-second">


        <ng-container *ngIf="(combineStatus$ | async) as combineStatus">
          <ng-container *ngIf="combineStatus?.storeStatus !== 'pending' && combineStatus?.dealStatus !== 'pending'; else loader">
            <ng-container>

              <div class="header no-margin-top" no-border>
                <h1 class="text-second-color" [routerLink]="['/stores']">{{'COMMON.ALL_STORES' | translate}}</h1>
              </div>

              <ng-container *ngIf="(stores$ | async) as stores">
                <ng-container *ngIf="combineStatus?.storeStatus !== 'error'; else serverError">
                  <ng-container *ngIf="stores?.length > 0; else noData">
                    <ion-slides *ngIf="loadSlider(stores)" [pager]="stores?.length > 1" [options]="slideOpts">
                      <ion-slide *ngFor="let store of stores; trackBy: trackById" >
                        <ion-card class="slide-ion-card" [routerLink]="['/stores/'+store?.storeID]" [queryParams]="{name:store?.storeName}">
                          <img class="ion-card-image" [src]="baseUrl + store?.images?.banner" loading="lazy" (error)="errorImage($event)"/>
                        </ion-card>
                      </ion-slide>
                    </ion-slides>
                  </ng-container>
                </ng-container>
              </ng-container>

              <div class="header no-margin-top" no-border>
                <h2 class="text-second-color">{{'COMMON.RECENT_OFFERS' | translate}}</h2>
              </div>

              <ng-container *ngIf="(deals$ | async) as deals">
                <ng-container *ngIf="combineStatus?.dealStatus !== 'error'; else serverError">
                  <ng-container *ngIf="deals?.length > 0; else noData">
                    <ion-list>
                      <ion-item class="ion-no-padding" *ngFor="let deal of deals; trackBy: trackById">
                        <div class="ion-item">
                          <div class="ion-item-ion-image">
                            <ion-img cache=true [src]="deal?.thumb" loading="lazy" (ionError)="errorImage($event)"></ion-img>
                          </div>

                          <div class="ion-item-name">
                            <div class="text-second-color">{{ getStoreName(deal?.storeID) }}</div>
                          </div>

                          <div>
                            <div class="text-second-color span-bold mediun-size">{{ deal?.dealRating  }}</div>
                          </div>

                          <div>
                            <div class="text-second-color span-bold line-through font-small">{{ deal?.normalPrice | currency:'EUR':'symbol':'1.2-2' }}</div>
                            <div class="text-error-color span-bold font-medium">{{ deal?.salePrice | currency:'EUR':'symbol':'1.2-2' }}</div>
                          </div>

                          <div class="text-second-color text-secondary" (click)="presentPopover($event, deal)">
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
        </ng-container>


        <!-- REFRESH -->
        <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <!-- IS ERROR -->
        <ng-template #serverError>
          <div class="no-data-div">
            <div>
              <span><ion-icon class="text-second-color big-size" name="cloud-offline-outline"></ion-icon></span>
              <br>
              <span class="text-second-color">{{'COMMON.ERROR' | translate}}</span>
            </div>
          </div>
        </ng-template>

        <!-- IS NO DATA  -->
        <ng-template #noData>
          <div class="no-data-div">
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
  styleUrls: ['./deals.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DealsPage {

  gotToTop = gotToTop;
  errorImage = errorImage;
  trackById = trackById;
  emptyObject = emptyObject;
  sliceTest = sliceTest;
  // @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  // infiniteScroll$ = new EventEmitter<string>();
  showButton: boolean = false;
  slideOpts = {};
  baseUrl = this._coreConfig.getImageBaseUrl();

  combineStatus$ = combineLatest([
    this.store.select(fromStore.getStatus),
    this.store.select(fromDeal.getStatus)
  ]).pipe(
    map(([storeStatus, dealStatus]) => ({storeStatus, dealStatus}))
  );

  stores$ = this.store.select(fromStore.getStores);
  deals$ = this.store.select(fromDeal.getLastDeals);


  constructor(
    private store: Store,
    private _coreConfig: CoreConfigService,
    private popoverController: PopoverController
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
      this.store.dispatch(DealActions.loadLastDeals());
      // if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;

      event.target.complete();
    }, 500);
  }

  getDate(timeStamp: number): any{
    if(timeStamp === 0) return null
    return new Date((timeStamp * 1000))
  }

  loadSlider(stores:any ): boolean{

    this.slideOpts = {
      initialSlide: 0,
      speed: 400,
      slidesOffsetBefore: stores?.length,
      watchOverflow: true,
      slidesPerView: 2,
    };

    return true;
  }

  getStoresKeys(stores: {[key:string]:{name: string, icon: string}}): string[]{
    return Object.keys(stores || {}) || []
  }

  getStoreName(storeId: string): string{
    const stores = this._coreConfig.getStoresName();
    return this.sliceTest(stores[storeId]?.name) || ''
  }

  async presentPopover(ev, item: Deal) {
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
      window.location.href = `https://www.cheapshark.com/redirect?dealID=${item?.dealID}`
    }
  }


}
