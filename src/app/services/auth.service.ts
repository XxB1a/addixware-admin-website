import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {StorageService} from './storage.service';
import {Router} from '@angular/router';
import {ISetPassword} from "../models/form";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.url}/oauth`;
  private register = `${environment.url}/oauth/register`;

  constructor(private readonly http: HttpClient,
              private readonly storage: StorageService,
              private readonly route: Router) {
  }

  public login(credentials) {
    return this.http.post(`${this.url}/login`, credentials)
      .pipe(
        map((res: any) => {
          this.storage.setkey('token_addixware', res.user.token);
          this.route.navigateByUrl('/admin');
        })
      );
  }

  public createUser(body) {
    return this.http.post(this.register, body);
  }

  public resetPassword(email) {

    const params = new HttpParams()
      .set('email', email);

    return this.http.get(`${this.url}/password`, {params})
      .pipe(
        map((res) => {
          console.log(res);
        })
      );

  }

  setPassword(body: ISetPassword) {
    return this.http.patch(`${this.url}/password`, body)
      .pipe(
        map((res: any) => {
          this.storage.setkey('token_addixware', res.user.token);
          this.route.navigateByUrl('/admin');
        })
      );
  }
}
