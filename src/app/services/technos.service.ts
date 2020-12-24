import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TechnosService {

  public tech$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public url = `${environment.url}/technos`;

  constructor(private readonly http: HttpClient) {
  }

  public getTech() {
    return this.http.get(this.url)
      .pipe(
        map((res) => {
          this.tech$.next(res);
        })
      );
  }

  public addTech(body) {
    return this.http.post(this.url, body);
  }

  public removeTech(id) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
