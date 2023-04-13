import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone();

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer xxxxxx`,
    });
    req = req.clone({ headers: headers });

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((err) => {
        //TODO: Handle error
        return EMPTY;
      }),
    );
  }
}
