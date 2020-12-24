import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  public offer$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public url = `${environment.url}/offers`;

  constructor(private readonly http: HttpClient) {
  }

  public postOffer(data) {
    return this.http.post(this.url, data);
  }

  public getOffers() {
    return this.http.get(this.url)
      .pipe(
        map((res) => {
          this.offer$.next(res);
        })
      );
  }

  public getOneOffer(id) {
    return this.http.get(`${this.url}/${id}`);
  }

  public publishOffer(id) {
    return this.http.post(`${this.url}/${id}/publish`, {})
      .pipe(
        switchMap((res) => {
          return this.getOffers();
        })
      );
  }

  public removeOffer(id) {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(
        switchMap((res) => {
          return this.getOffers();
        })
      );
  }

  public updateOffer(id, body) {
    return this.http.patch(`${this.url}/${id}`, body);
  }

}
