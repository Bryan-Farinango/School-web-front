import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class RegisterGuardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = await this.authService.getCurrentUser();
    if (!user.emailVerified) {
      this.router.navigate(['/login']);
    }

    return user.emailVerified;
  }
}
