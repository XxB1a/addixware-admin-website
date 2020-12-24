import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupsService} from '../../services/groups.service';
import {filter, map, switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {HookService} from '../../services/hook.service';
import {Protocol} from '../../enum/protocol.enum';
import {TechnosService} from '../../services/technos.service';
import {SettingsService} from './settings.service';
import {UsersService} from '../../services/users.service';
import {AuthService} from '../../services/auth.service';
import {StateManager} from '../../core/state-manager';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends StateManager implements OnInit, OnDestroy {

  public groups: any[] = [];
  public group: string;

  public techs: any[] = [];
  public tech: string;
  public hooks: any[] = [];
  public hook: string;
  public users: any[] = [];
  public user: { fullname: string, email: string, groups: any[] } = null;

  public protocol: string;
  public protocols: any[] = [{name: Protocol.mail}, {name: Protocol.slack}];
  public isDisabled = true;

  public getGroups: Subscription;
  public getHooks: Subscription;

  public groupsObservable: Subscription;
  public techsObservable: Subscription;
  public hooksObservable: Subscription;
  public usersObservable: Subscription;

  public createGroup: Subscription;
  public createTech: Subscription;
  public createHook: Subscription;

  private controlGroup: FormControl;
  private controlTech: FormControl;
  private controlHook: FormControl;

  protected state = {
    fullname: '',
    email: ''
  };

  constructor(private readonly settings: SettingsService,
              private readonly groupService: GroupsService,
              private readonly techService: TechnosService,
              private readonly hookService: HookService,
              private readonly userService: UsersService,
              private readonly auth: AuthService) {
    super();
  }

  public groupFOrm(evt) {
    this.controlGroup = evt.control;
    this.group = evt.value;
  }

  public addGroup() {
    this.createGroup = this.groupService.addGroup({name: this.group})
      .pipe(
        switchMap(() => {
          this.controlGroup.setValue('');
          return this.settings.getAllSettingsInformation();
        })
      ).subscribe();
  }

  public removeGroup(evt) {
    this.groupService.removeGroup(evt)
      .pipe(
        switchMap(() => {
          return this.settings.getAllSettingsInformation();
        })
      ).subscribe();
  }

  public techFOrm(evt) {
    this.controlTech = evt.control;
    this.tech = evt.value;
  }

  public addTech() {
    this.createTech = this.techService.addTech({name: this.tech})
      .pipe(
        switchMap(() => {
          this.controlTech.setValue('');
          return this.settings.getAllSettingsInformation();
        })
      ).subscribe();
  }

  public removeTech(evt) {
    this.techService.removeTech(evt)
      .pipe(
        switchMap(() => {
          return this.settings.getAllSettingsInformation();
        })
      ).subscribe();
  }

  public hookFOrm(evt) {
    this.controlHook = evt.control;
    this.hook = evt.value;
  }

  public selectProtocol(evt) {
    this.protocol = evt.name;
    this.isDisabled = false;
  }

  public selectGroup(evt) {
    console.log(evt);
    this.group = evt._id;
  }

  public addHook() {

    const body = {
      url: this.hook,
      protocol: this.protocol,
      group: this.group,
      t_on_apply: true
    };

    this.createHook = this.hookService.addHook(body)
      .pipe(
        switchMap(() => {
          this.controlHook.setValue('');
          return this.settings.getAllSettingsInformation();
        })
      ).subscribe();

  }

  public formState(evt) {
    this.setState(evt.name, evt.value);
  }

  public removeHook(evt) {
    this.hookService.removeHook(evt)
      .pipe(
        switchMap(() => {
          return this.settings.getAllSettingsInformation();
        })
      ).subscribe();
  }

  public initial(user) {
    return `${user.fullname.split(' ')[0][0].toUpperCase()} ${user.fullname.split(' ')[1][0].toUpperCase()}`;
  }

  public generateBackground(id) {
    return `#${id.substr(0, 6)}`;
  }

  public selectedUser(user) {
    this.user = user;
  }

  public addUser() {

    const body = {
      fullname: this.state.fullname,
      email: this.state.email,
      groups: [{group: this.group, role: "r_agent"}]
    };

    this.auth.createUser(body)
      .pipe(
        switchMap(() => {
          return this.settings.getAllSettingsInformation();
        })
      ).subscribe();
  }

  ngOnInit() {

    this.settings.getAllSettingsInformation().subscribe();

    this.groupsObservable = this.groupService.groups$
      .pipe(
        filter(res => !!res),
        map((res) => {
          this.groups = res.groups;
        })
      ).subscribe();

    this.techsObservable = this.techService.tech$
      .pipe(
        filter(res => !!res),
        map((res) => {
          this.techs = res.technos;
        })
      ).subscribe();

    this.hooksObservable = this.hookService.hooks$
      .pipe(
        filter(res => !!res),
        map((res) => {
          this.hooks = res.hooks;
        })
      ).subscribe();

    this.usersObservable = this.userService.users
      .pipe(
        filter(res => !!res),
        map((res) => {
          console.log(res);
          this.users = res.users;
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.getGroups) {
      this.getGroups.unsubscribe();
    }
    if (this.groupsObservable) {
      this.groupsObservable.unsubscribe();
    }
    if (this.createGroup) {
      this.createGroup.unsubscribe();
    }
    if (this.getHooks) {
      this.getHooks.unsubscribe();
    }
    if (this.hooksObservable) {
      this.hooksObservable.unsubscribe();
    }
  }

}
