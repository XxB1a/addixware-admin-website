import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {OffersService} from '../../services/offers.service';
import {BlogService} from '../../services/blogs.service';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private readonly blog: BlogService,
              protected readonly offers: OffersService) {
  }

  public postArticle(data) {
    return this.blog.postArticle(data);
  }

  public postOffer(data) {
    return this.offers.postOffer(data);
  }

}
