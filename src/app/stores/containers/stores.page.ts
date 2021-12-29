import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { FilterComponent } from '@gameoffer/shared-ui/generics/components/filter.component';
import { ItemModalComponent } from '@gameoffer/shared-ui/generics/components/item-modal.component';
import { DealActions, fromDeal } from '@gameoffer/shared/deal';
import { Deal, Filter } from '@gameoffer/shared/deal/models';
import { errorImage, gotToTop, sliceTest, trackById } from '@gameoffer/shared/utils/helpers/functions';
import { IonContent, IonInfiniteScroll, ModalController, Platform, PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-stores',
  template:`
    <!-- HEADER  -->
    <ion-header no-border>
      <ion-toolbar mode="md|ios">
        <ion-back-button class="text-color" slot="start" defaultHref="/deals" [text]="''"></ion-back-button>
        <ion-title class="text-color" >{{ sliceTest(title) }}</ion-title>
        <div size="small" slot="end" class="div-clear"></div>
      </ion-toolbar>
    </ion-header>

    <!-- MAIN  -->
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
      <div class="container components-color-second">

        <ng-container *ngIf="(deals$ | async) as deals">
          <ng-container *ngIf="(status$ | async) as status">
            <ng-container *ngIf="status !== 'pending' || statusComponent?.pageNumber !== 0; else loader">
              <ng-container *ngIf="status !== 'error'; else serverError">

                <!-- FORM  -->
                <form (submit)="searchSubmit($event)" class="fade-in-card">
                  <ion-searchbar [placeholder]="'COMMON.BY_TITLE' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
                </form>

                <ng-container *ngIf="deals?.length > 0; else noData">
                  <!-- FILTER BUTTON  -->
                  <div>
                    <ion-button class="filter-ion-button text-second-color" fill="clear"(click)="presentModal()" >{{ 'FILTER.FILTERS' | translate }} <ion-icon name="options-outline"></ion-icon></ion-button>
                  </div>

                  <ion-list>
                    <ion-item class="ion-no-padding" *ngFor="let deal of deals; trackBy: trackById">
                      <div class="ion-item">
                        <div class="ion-item-ion-image">
                          <ion-img cache=true [src]="deal?.thumb" loading="lazy" (ionError)="errorImage($event)"></ion-img>
                        </div>

                        <div class="ion-item-name">
                          <div class="text-second-color mediun-size">{{ sliceTest(deal?.title) }}</div>
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

                <ng-container *ngIf="(total$ | async) as total">
                  <ng-container *ngIf="statusComponent?.pageNumber !== total">
                    <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event, total)">
                      <ion-infinite-scroll-content class="loadingspinner">
                        <ion-spinner *ngIf="$any(status) === 'pending'" class="loadingspinner"></ion-spinner>
                      </ion-infinite-scroll-content>
                    </ion-infinite-scroll>
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
  styleUrls: ['./stores.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoresPage {

  gotToTop = gotToTop;
  sliceTest = sliceTest;
  trackById = trackById;
  errorImage = errorImage;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton: boolean = false;
  title: string = '';

  search = new FormControl('');
  infiniteScroll$ = new EventEmitter<{pageNumber?:number, filter?:Filter}>();
  statusComponent: { pageNumber?:number, filter?:Filter } = {
    pageNumber: 0,
    filter: {}
  };

  status$ = this.store.select(fromDeal.getStatus);
  total$ = this.store.select(fromDeal.getTotalPages)

  deals$ = combineLatest([
    this.route.params,
    this.infiniteScroll$.pipe(startWith(this.statusComponent))
  ]).pipe(
    tap(([{storeId}, {pageNumber, filter}]) => {
      let updateFilter = {
        ...filter,
        ...( storeId ? {store:storeId} :{})
      }
      this.store.dispatch(DealActions.loadDeals({pageNumber, filter: updateFilter}))
    }),
    switchMap(() =>
      this.store.select(fromDeal.getDeals)
    )
  );


  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private popoverController: PopoverController,
    public platform: Platform,
    public modalController: ModalController,
  ) {
    this.title = this.route.snapshot.queryParamMap.get('name')
  }


  // SEARCH
  searchSubmit(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.statusComponent = {...this.statusComponent, filter:{ ...this.statusComponent.filter, title: this.search.value }, pageNumber:0 };
    this.infiniteScroll$.next(this.statusComponent);
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
  }

      // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.search.reset();
    this.statusComponent = {...this.statusComponent, filter:{...this.statusComponent.filter, title: ''}, pageNumber:0 };
    this.infiniteScroll$.next(this.statusComponent);
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.search.reset();
      this.statusComponent = {filter: {}, pageNumber: 0};
      this.infiniteScroll$.next(this.statusComponent);
      if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
      event.target.complete();
    }, 500);
  }

  // INIFINITE SCROLL
  loadData(event, total) {
    setTimeout(() => {
      this.statusComponent = {...this.statusComponent, pageNumber: this.statusComponent?.pageNumber + 1};

      if(this.statusComponent?.pageNumber > total){
        if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = true
      }

      this.infiniteScroll$.next(this.statusComponent);
      event.target.complete();
    }, 500);
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

  // OPEN FILTER MODAL
  async presentModal() {

    const modal = await this.modalController.create({
      component: FilterComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        statusComponent: this.statusComponent
      },
      // breakpoints: [0, 0.2, 0.5, 1],
      // initialBreakpoint: 0.2,
    });

    modal.onDidDismiss()
      .then((res) => {
        const { data } = res || {};
        console.log(data)
        if(!!data){
          this.statusComponent = { ...data }
          this.infiniteScroll$.next(this.statusComponent)
          if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
        }
    });

    return await modal.present();
  }


}
