import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-games',
  template:`
    <ion-content >

    </ion-content>
  `,
  styleUrls: ['./games.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesPage {

  constructor() { }


}
