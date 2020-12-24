import {Component, ElementRef, OnDestroy, OnInit, SecurityContext, ViewChild} from '@angular/core';
import {OffersService} from '../../services/offers.service';
import {filter, map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {QuillEditorComponent} from 'ngx-quill';
import {FormBuilder, FormGroup} from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss']
})
export class AnnoncesComponent implements OnInit, OnDestroy {

  public offerSubscription: Subscription;
  public offerPublishSubscription: Subscription;
  public offerRemoveSubscription: Subscription;
  public html;
  public offers;
  public title;

  public form: FormGroup;
  public moment = moment;


  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('editor', {static: true}) editor: QuillEditorComponent;

  constructor(private readonly offer: OffersService,
              private readonly fb: FormBuilder,
              private readonly sanitizer: DomSanitizer) {
    this.form = fb.group({
      editors: []
    });
  }

  public publish(evt) {
    this.offerPublishSubscription = this.offer.publishOffer(evt._id).subscribe();
  }

  public remove(evt) {
    this.offerRemoveSubscription = this.offer.removeOffer(evt._id).subscribe();
  }

  public showSideBar(evt) {

    if (this.sidebar.nativeElement.classList.contains('show')) {
      this.sidebar.nativeElement.classList.toggle('show');
    }

    this.offer.getOneOffer(evt._id)
      .pipe(
        map((res) => {
          this.title = evt.title;
          this.html = this.sanitizer.sanitize(SecurityContext.HTML, evt.content);
          this.form.controls.editors.setValue(this.html);
          this.sidebar.nativeElement.classList.toggle('show');
        })
      ).subscribe();

  }

  public close() {
    this.sidebar.nativeElement.classList.toggle('show');
  }

  public update() {
    this.offer.updateOffer(this.offers[0]._id, {content: this.form.controls.editors.value}).subscribe();
  }

  ngOnInit() {

    this.getOffers();

    this.offer.offer$
      .pipe(
        filter(res => !!res),
        map((res) => {
          this.offers = res.offers;
        })
      ).subscribe();

  }

  ngOnDestroy(): void {
    if (this.offerSubscription) {
      this.offerSubscription.unsubscribe();
    }
    if (this.offerRemoveSubscription) {
      this.offerRemoveSubscription.unsubscribe();
    }
    if (this.offerPublishSubscription) {
      this.offerPublishSubscription.unsubscribe();
    }
  }

  private getOffers() {
    this.offerSubscription = this.offer.getOffers().subscribe();
  }

}
