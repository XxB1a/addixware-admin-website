import {Injectable} from '@angular/core';
import {TechnosService} from '../../services/technos.service';
import {GroupsService} from '../../services/groups.service';
import {HookService} from '../../services/hook.service';
import {switchMap} from 'rxjs/operators';
import {UsersService} from '../../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private readonly technos: TechnosService,
              private readonly groups: GroupsService,
              private readonly hooks: HookService,
              private readonly user: UsersService) {
  }

  public getAllSettingsInformation() {
    return this.groups.getGroups()
      .pipe(
        switchMap(() => {
          return this.technos.getTech();
        }),
        switchMap(() => {
          return this.hooks.getHooks();
        }),
        switchMap(() => {
          return this.user.getUsers();
        })
      );
  }

}
