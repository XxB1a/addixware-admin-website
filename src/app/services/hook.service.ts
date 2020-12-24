import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HookService {

  public hooks$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public url = `${environment.url}/hooks`;

  constructor(private readonly http: HttpClient) {
  }

  public getHooks() {
    return this.http.get(this.url)
      .pipe(
        map((res) => {
          this.hooks$.next(res);
        })
      );
  }

  public addHook(body) {
    return this.http.post(this.url, body);
  }

  public removeHook(id) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
