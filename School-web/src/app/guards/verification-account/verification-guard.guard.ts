import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class VerificationGuardGuard implements CanActivate {
  private userExist: boolean;
  constructor(private authService: AuthService, private router: Router) {
    this.userExist = true;
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      this.userExist = false;
    }

    return this.userExist;
  }
}
