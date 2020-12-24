import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss']
})
export class ActionCardComponent implements OnInit {

  @Input() label: string;
  @Input() id: string;

  @Output() removeData: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  public remove() {
    this.removeData.emit(this.id);
  }

  ngOnInit() {
  }

}
