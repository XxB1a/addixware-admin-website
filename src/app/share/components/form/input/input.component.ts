import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';

import {IForm} from '../../../../models/form';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() id: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() name: string;
  @Input() icon: string;
  @Input() validators: Validators;

  _initialValue: string;
  @Input() set initialValue(value) {
    this._initialValue = value;
    if (this.control) {
      this.control.setValue(value);
    }
  }
  get initialValue() {
    return this._initialValue;
  }

  public group: FormGroup;
  public control: FormControl;

  public isFocused = false;

  @Output() val: EventEmitter<IForm> = new EventEmitter<IForm>();

  constructor() {

  }

  ngOnInit() {

    this.group = new FormGroup({});
    this.control = new FormControl(this.initialValue, this.validators);
    this.group.addControl(this.name, this.control);

    this.control.valueChanges
      .pipe(
        map((res) => {
          if (this.control.status !== 'INVALID') {
            this.val.emit({name: this.name, value: res, control: this.control});
          }
        })
      ).subscribe();
  }

}
