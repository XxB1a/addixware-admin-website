import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() alert: any;
  @Input() displayed: boolean;

  @Output() closing: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  public close() {
    this.displayed = false;
  }

  ngOnInit() {
  }

}
