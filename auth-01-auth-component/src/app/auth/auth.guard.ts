import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        //again we use take(1) as we dont want any ongoing subscription to the user observable, only when canActivate is called, we check once and do the decision making process.
        return this.authService.user.pipe(take(1),
            map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth'])
            }),
            //Either use the below approach to redirect user to auth page if not authenticated user wants to access the protected route or else return a URLTree with the url to redirect to.
            // tap(isAuth => {
            //     if(!isAuth){
            //         this.router.navigate(['/auth']);
            //     }
            // })
        );
    }
}