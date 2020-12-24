import {Component, ElementRef, OnDestroy, OnInit, SecurityContext, ViewChild} from '@angular/core';
import {BlogService} from '../../services/blogs.service';
import {Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';

import * as moment from 'moment';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit, OnDestroy {

  private blogSubscription: Subscription;
  private blogPublishSubscription: Subscription;
  private blogRemoveSubscription: Subscription;

  public blogs: any[];
  public html;

  public moment = moment;

  @ViewChild('sidebar') sidebar: ElementRef;

  constructor(private readonly blog: BlogService,
              private readonly sanitizer: DomSanitizer) {
  }
  public publish(evt) {
    this.blogPublishSubscription = this.blog.publishBlog(evt._id).subscribe();
  }

  public remove(evt) {
    this.blogRemoveSubscription = this.blog.removeBlog(evt._id).subscribe();
  }

  public showSideBar(evt) {
    this.html = this.sanitizer.sanitize(SecurityContext.HTML, evt.content);
    this.sidebar.nativeElement.classList.toggle('show');
  }

  public close() {
    this.sidebar.nativeElement.classList.toggle('show');
  }

  ngOnInit() {
    this.getBlogInformation();

    this.blog.blog$
      .pipe(
        filter(res => !!res),
        map((res) => {
          this.blogs = res.blogs;
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.blogSubscription) {
      this.blogSubscription.unsubscribe();
    }
  }

  private getBlogInformation() {
    this.blogSubscription = this.blog.getBlog().subscribe();
  }

}
