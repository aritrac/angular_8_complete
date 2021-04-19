import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor { //You can interact not only with the request inside interceptor, you can interact with the response as well
    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log('Request is on its way');
        console.log(req.url);
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth','xyz')
        });
        return next.handle(modifiedRequest).pipe(tap(event => {
            console.log(event);
            if(event.type === HttpEventType.Response){
                console.log('Response arrived, body data: ');
                console.log(event.body);
            }
        }));
    }
}
