import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@gameoffer/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Deal , Filter} from '../models';

@Injectable({
  providedIn: 'root'
})
export class DealService {

  baseURL: string = `${this._coreConfig.getEndpoint()}deals`;
  perPage: number = this._coreConfig.getPerPage();


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getDeals(pageNumber: number = 0, filters?: Filter ): Observable<{deals: Deal[], totalPages: number}> {
    const { sortBy = null, desc = null, lowerPrice = null, upperPrice = null, metacritic = null , store = null, onSale = null, title = null, AAA = null } = filters || {}
    let params = new HttpParams();

    if(sortBy) params = params.append('sortBy', sortBy);
    if(desc) params = params.append('desc', desc);
    if(lowerPrice) params = params.append('lowerPrice', lowerPrice);
    if(upperPrice) params = params.append('upperPrice', upperPrice);
    if(metacritic) params = params.append('metacritic', metacritic);
    if(store) params = params.append('storeID', store);
    if(onSale) params = params.append('onSale', onSale);
    if(title) params = params.append('title', title);
    if(AAA) params = params.append('AAA', AAA );

    return this.http.get<any>(`${this.baseURL}?pageSize=${this.perPage}&pageNumber=${pageNumber}`, { params, observe: 'response' }).pipe(
      map(res => {
        return ({deals:res?.body || [], totalPages: Number(res.headers.get('x-total-page-count')) || 0 });
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getLastDeals(): Observable<Deal[]>{
    return this.http.get<any>(`${this.baseURL}?pageSize=${this.perPage}&pageNumber=0`, { observe: 'response' }).pipe(
      map(res => (res?.body)),
      catchError((error) => {
        return throwError(error)
      })
    )
  }



}
