import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public blog$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public url = `${environment.url}/blogs`;

  constructor(private readonly http: HttpClient) {
  }

  public postArticle(data) {
    return this.http.post(this.url, data);
  }

  public getBlog() {
    return this.http.get(this.url)
      .pipe(
        map((res) => {
          this.blog$.next(res);
        })
      );
  }

  public publishBlog(id) {
    return this.http.post(`${this.url}/${id}/publish`, {})
      .pipe(
        switchMap((res) => {
          return this.getBlog();
        })
      );
  }

  public removeBlog(id) {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(
        switchMap((res) => {
          return this.getBlog();
        })
      );
  }

}
