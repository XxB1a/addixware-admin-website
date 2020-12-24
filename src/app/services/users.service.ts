import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public users: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private readonly url = `${environment.url}/users`;

  constructor(private readonly http: HttpClient) {
  }

  public getUsers() {
    return this.http.get(this.url)
      .pipe(
        map((res) => {
          this.users.next(res);
        })
      );
  }
}
