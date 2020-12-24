import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {IForm} from '../../../../models/form';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  @Input() name: string;
  @Input() id: string;
  @Input() label: string;
  @Input() validators: Validators;

  public isFocused: boolean;

  public group: FormGroup;
  public control: FormControl;

  @Output() val: EventEmitter<IForm> = new EventEmitter<IForm>();

  constructor() {
    this.group = new FormGroup({});
    this.control = new FormControl('', this.validators);
    this.group.addControl(this.name, this.control);
  }

  ngOnInit() {
    this.control.valueChanges
      .pipe(
        map((res) => {
          this.val.emit({name: this.name, value: res, control: this.control});
        })
      ).subscribe();
  }

}
