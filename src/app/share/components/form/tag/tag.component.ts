import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  @Input() label: string;
  @Input() isClosable: boolean;
  @Output() remove: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  public removeTag(label) {
    this.remove.emit(label);
  }

  ngOnInit() {
  }

}
