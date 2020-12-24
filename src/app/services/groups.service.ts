import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  public groups$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public group$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public url = `${environment.url}/groups`;

  constructor(private readonly http: HttpClient) {
  }

  public getGroups() {
    return this.http.get(this.url)
      .pipe(map((res) => this.groups$.next(res)));
  }

  public getOneGroup(id) {
    return this.http.get(`${this.url}/${id}`)
      .pipe(map((res) => this.group$.next(res)));
  }

  public addGroup(body) {
    return this.http.post(this.url, body);
  }

  public removeGroup(id) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
