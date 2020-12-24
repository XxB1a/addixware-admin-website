import {Component} from '@angular/core';
import {Validators} from '@angular/forms';

import {AuthService} from '../../services/auth.service';

import {ILogin} from '../../models/form';
import {StateManager} from '../../core/state-manager';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends StateManager {

  public validators = [Validators.required];
  public emailValidator = [Validators.required, Validators.email];
  public displayedError: boolean;
  public error: string;

  protected state: ILogin = {
    email: null,
    password: null
  };

  public logForm(evt) {
    this.setState(evt.name, evt.value);
  }

  public senForm() {
    this.auth.login(this.state).subscribe();
  }

  public resetPass() {
    if (this.state.email !== null || this.state.email !== '') {
      this.auth.resetPassword(this.state.email).subscribe();
    } else {
      this.displayedError = true;
      this.error = 'veuillez rentrer votre email pour renouveler le mot de passe'
    }
  }

  constructor(private readonly auth: AuthService) {
    super();
  }

}
