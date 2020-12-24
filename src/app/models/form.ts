import {FormControl} from '@angular/forms';

export interface IForm {
  name: string;
  value: string;
  control: FormControl;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISetPassword {
  otp: string;
  password: string;
}
