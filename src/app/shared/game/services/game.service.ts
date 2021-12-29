import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@gameoffer/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Game } from '../models';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  baseURL: string = `${this._coreConfig.getEndpoint()}games`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getGames(): Observable<Game[]> {
    return this.http.get<any>(`${this.baseURL}`).pipe(
      map(res => {
        return res || []
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}
