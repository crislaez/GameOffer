import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT, Environment } from '../models/tokens'

export enum EndpointType {
  api = '/api/',
}

export interface CoreConfig {
  langs: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CoreConfigService {

  protected _config: CoreConfig;


  constructor(@Inject(ENVIRONMENT) private _env: Environment) { }


  importConfig(coreConfigRaw: any): void {
    this._config = {
      langs: coreConfigRaw.Languages
    } as CoreConfig;
  }

  getEndpoint(): string {
    return `${this._env.baseEndpoint}`;
  }

  getPerPage(): number {
    return this._env.perPage;
  }

  getImageBaseUrl(): string {
    return `${this._env.baseImageUrl}`;
  }

  getStoresName(): {[key:string]:{name:string, icon:string}} {
    return {
      "1":{
        name:'Steam',
        icon:'/img/stores/banners/0.png'
      },
      "2":{
        name:'GamersGate',
        icon:'/img/stores/banners/1.png'
      },
      "3":{
        name:'GreenManGaming',
        icon:'/img/stores/banners/2.png'
      },
      "4":{
        name:'Amazon',
        icon:'/img/stores/banners/3.png'
      },
      "5":{
        name:'GameStop',
        icon:'/img/stores/banners/4.png'
      },
      "6":{
        name:'Direct2Drive',
        icon:'/img/stores/banners/5.png'
      },
      "7":{
        name:'GOG',
        icon:'/img/stores/banners/6.png'
      },
      "8":{
        name:'Origin',
        icon:'/img/stores/banners/7.png'
      },
      "9":{
        name:'Get Games',
        icon:'/img/stores/banners/8.png'
      },
      "10":{
        name:'Shiny Loot',
        icon:'/img/stores/banners/9.png'
      },
      "11":{
        name:'Humble Store',
        icon:'/img/stores/banners/10.png'
      },
      "12":{
        name:'Desura',
        icon:'/img/stores/banners/11.png'
      },
      "13":{
        name:'Uplay',
        icon:'/img/stores/banners/12.png'
      },
      "14":{
        name:'IndieGameStand',
        icon:'/img/stores/banners/13.png'
      },
      "15":{
        name:'Fanatical',
        icon:'/img/stores/banners/14.png'
      },
      "16":{
        name:'Gamesrocket',
        icon:'/img/stores/banners/15.png'
      },
      "17":{
        name:'Games Republic',
        icon:'/img/stores/banners/16.png'
      },
      "18":{
        name:'SilaGames',
        icon:'/img/stores/banners/17.png'
      },
      "19":{
        name:'Playfield',
        icon:'/img/stores/banners/18.png'
      },
      "20":{
        name:'ImperialGames',
        icon:'/img/stores/banners/19.png'
      },
      "21":{
        name:'WinGameStore',
        icon:'/img/stores/banners/20.png'
      },
      "22":{
        name:'FunStockDigital',
        icon:'/img/stores/banners/21.png'
      },
      "23":{
        name:'GameBillet',
        icon:'/img/stores/banners/22.png'
      },
      "24":{
        name:'Voidu',
        icon:'/img/stores/banners/23.png'
      },
      "25":{
        name:'Epic Games Store',
        icon:'/img/stores/banners/24.png'
      },
      "26":{
        name:'Razer Game Store',
        icon:'/img/stores/banners/25.png'
      },
      "27":{
        name:'Gamesplanet',
        icon:'/img/stores/banners/26.png'
      },
      "28":{
        name:'Gamesload',
        icon:'/img/stores/banners/27.png'
      },
      "29":{
        name:'2Game',
        icon:'/img/stores/banners/28.png'
      },
      "30":{
        name:'IndieGala',
        icon:'/img/stores/banners/29.png'
      },
      "31":{
        name:'Blizzard Shop',
        icon:'/img/stores/banners/30.png'
      },
      "32":{
        name:'AllYouPlay',
        icon:'/img/stores/banners/31.png'
      },
      "33":{
        name:'DLGamer',
        icon:'/img/stores/banners/32.png'
      },
    }
  }




}
