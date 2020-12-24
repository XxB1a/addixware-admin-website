import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  public applications: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public url = `${environment.url}/applications`;

  constructor(private readonly http: HttpClient) {
  }

  public getApplications() {
    return this.http.get(this.url)
      .pipe(
        map((res) => {
          this.applications.next(res);
        })
      );
  }

  public getOneApplications(id) {
    return this.http.get(`${this.url}/${id}`);
  }

  public publishApplications(id) {
    return this.http.post(`${this.url}/${id}/publish`, {})
      .pipe(
        switchMap((res) => {
          return this.getApplications();
        })
      );
  }

  public removeApplications(id) {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(
        switchMap((res) => {
          return this.getApplications();
        })
      );
  }

  public updateApplications(id, body) {
    return this.http.patch(`${this.url}/${id}`, body);
  }
}
