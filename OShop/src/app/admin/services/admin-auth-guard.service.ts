import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ProductService } from 'shared/services/product.service';

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.authService.appUser$
      .map(appUser => appUser.isAdmin);
  }
}
