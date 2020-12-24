import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() type: string;
  @Input() label: string;
  @Input() disabled: boolean;
  @Input() loader: boolean

  @Output() valid: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  sendInfo(evt) {
    evt.preventDefault();
    this.valid.emit(true);
  }

}
