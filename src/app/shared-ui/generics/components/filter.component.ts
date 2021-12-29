import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Filter } from '@gameoffer/shared/deal/models';
import { trackById } from '@gameoffer/shared/utils/helpers/functions';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-filter',
  template: `
  <ion-content class="modal-wrapper">

    <ion-header class="components-color">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button fill="clear" class="components-color" (click)="dismissModal()"><ion-icon name="close-outline"></ion-icon></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-item  class="fade-in-card item-select font-medium width-84">
      <ion-label>{{'FILTER.BY_PRICE' | translate}}</ion-label>
      <ion-select (ionChange)="changeFilter($any($event), 'sortBy')" [value]="statusComponent?.filter?.sortBy" interface="action-sheet">
        <ion-select-option *ngFor="let filter of filterByPrice; trackBy: trackById" [value]="filter?.value">{{ filter?.label | translate }}</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-item class="fade-in-card item-select font-medium width-84">
      <ion-label>{{'FILTER.BY_ON_SALES' | translate}}</ion-label>
      <ion-select (ionChange)="changeFilter($any($event), 'onSale')" [value]="statusComponent?.filter?.onSale" interface="action-sheet">
        <!-- <ion-select-option [value]="false">{{ 'FILTER.NONE' | translate}}</ion-select-option> -->
        <ion-select-option *ngFor="let filter of filterCommon; trackBy: trackById" [value]="filter?.value">{{ filter?.label | translate }}</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-item class="fade-in-card item-select font-medium width-84">
      <ion-label>{{'FILTER.ONLY_AAA' | translate}}</ion-label>
      <ion-select (ionChange)="changeFilter($any($event), 'AAA')" [value]="statusComponent?.filter?.AAA" interface="action-sheet">
        <!-- <ion-select-option [value]="false">{{ 'FILTER.NONE' | translate}}</ion-select-option> -->
        <ion-select-option *ngFor="let filter of filterCommon; trackBy: trackById" [value]="filter?.value">{{ filter?.label | translate }}</ion-select-option>
      </ion-select>
    </ion-item>

  </ion-content>
  `,
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {

  trackById = trackById;
  @Input() statusComponent: {pageNumber: number, filter: Filter};
  filterByPrice: {id:number, label:string, value:string}[] = [
    {
      id:1,
      label:'COMMON.YES',
      value: 'price'
    },
    {
      id:2,
      label:'COMMON.NO',
      value: ''
    }
  ];

  filterCommon = [
    {
      id:1,
      label:'COMMON.YES',
      value: true
    },
    {
      id:2,
      label:'COMMON.NO',
      value: false
    }
  ];

  constructor(
    public modalController: ModalController
  ) { }


  dismissModal() {
    this.modalController.dismiss(false);
  }

  changeFilter({detail: {value}}, filter): void{
    this.statusComponent = { ...this.statusComponent, pageNumber: 0, filter:{...this.statusComponent.filter, [filter]: value} };
    this.modalController.dismiss(this.statusComponent);
  }



}
