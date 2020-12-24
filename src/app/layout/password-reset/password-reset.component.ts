import { Component, OnInit } from '@angular/core';
import {StateManager} from "../../core/state-manager";
import {Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ISetPassword} from "../../models/form";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends StateManager implements OnInit{

  public validators = [Validators.required];
  public emailValidator = [Validators.required, Validators.email];
  public error: string;

  protected state: ISetPassword = {
    otp: null,
    password: null
  };
  queryEmail: string;

  public logForm(evt) {
    this.setState(evt.name, evt.value);
  }

  public senForm() {
    this.auth.setPassword(this.state).subscribe();
  }

  constructor(private readonly auth: AuthService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const otp = params['otp'];
      this.queryEmail  = params['email'];
      if (!otp || !this.queryEmail) {
        return this.router.navigateByUrl('/login');
      }
      this.logForm({name: "otp", value: otp});
    });
  }

}
