import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-item-modal',
  template: `
  <ion-list lines="none">
    <!-- <ion-item button (click)="navigateTo('sound')">{{ 'COMMON.LISTEN_AUDIO' | translate }}</ion-item> -->
    <ion-item button (click)="navigateTo('show')">
      {{ 'COMMON.SHOW' | translate }}
      <!-- <ion-icon name="chevron-forward-outline"></ion-icon> -->
    </ion-item>
    <ion-item button (click)="sharedContent()">
      {{ 'COMMON.SHARE' | translate }}
      <!-- <ion-icon name="chevron-forward-outline"></ion-icon> -->
    </ion-item>
  </ion-list>
  `,
  styleUrls: ['./item-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemModalComponent {

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController,
  ) { }


  navigateTo(type: string): void{
    this.popoverController.dismiss(type)
  }

  async sharedContent(){
    const item = this.navParams.get('item');
    await Share.share({
      title: item?.title,
      // text: item?.description,
      url: item?.dealID ? `https://www.cheapshark.com/redirect?dealID=${item?.dealID}` : `https://www.cheapshark.com/redirect?storeID=${item?.storeID - 1}`,
      dialogTitle: item?.title,
    });

    this.popoverController.dismiss(null)
  }

}
