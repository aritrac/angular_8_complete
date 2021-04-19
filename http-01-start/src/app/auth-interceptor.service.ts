import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor { //You can interact not only with the request inside interceptor, you can interact with the response as well
    intercept(req: HttpRequest<any>, next: HttpHandler){
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth','xyz')
        });
        return next.handle(modifiedRequest);
    }
}
