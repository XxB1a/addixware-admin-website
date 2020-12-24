import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {StorageService} from '../services/storage.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly storage: StorageService) {
  }

  canActivate(): boolean {
    const token = this.storage.getKey('token_addixware');

    if (!token) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }

  }

}
