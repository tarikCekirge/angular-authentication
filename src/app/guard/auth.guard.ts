import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { SnackBarService } from '../shared/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLogginIn()) {
      if (route.url.length > 0) {
        let menu = route.url[0].path;
        if (menu == 'user') {
          if (this.authService.getUserRole() == 'admin') {
            return true
          } else {
            this.router.navigate([''], { relativeTo: this.route });
            this.snackBarService.info('Giriş Yetkiniz Yok', 'Tamam')
            return false
          }
        } else {
          return true
        }
      } else {
        return true
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      this.snackBarService.info('Lütfen Giriş Yapınız.', '');
      return false;
    }
  }
}
