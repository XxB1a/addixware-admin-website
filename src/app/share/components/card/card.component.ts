import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() item: any;

  @Output() removeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() publishEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() view: EventEmitter<any> = new EventEmitter<any>();

  public isDown: boolean;
  public status: boolean;
  public isView: boolean;

  constructor() {
  }

  public publish(item) {
    this.isView = !this.isView;
    this.publishEvent.emit(item);
  }

  public remove(item) {
    this.isView = !this.isView;
    this.removeEvent.emit(item);
  }

  public show(item) {
    this.isDown = !this.isDown;
    this.view.emit(item);
  }

  ngOnInit() {
    this.status = this.item.status === 'published';
  }

}
