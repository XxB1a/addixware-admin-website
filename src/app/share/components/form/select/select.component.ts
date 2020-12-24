import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() label: string;
  @Input() list: any[];

  public display: boolean;

  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  public selectItem(evt) {
    this.label = evt.name;
    this.selected.emit(evt);
  }

  ngOnInit() {
  }

}
