import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { map, catchError, finalize } from 'rxjs/operators';
  import { Injectable } from '@angular/core';
  import { Plugins } from '@capacitor/core';
  const { Network } = Plugins;
  import { ToastController } from '@ionic/angular';
  @Injectable()
  export class HttpConfigInterceptor implements HttpInterceptor {
    
    constructor(public toastController: ToastController) { 

    }
  
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
      
    //   const token = "my-token-string-from-server";
  
    //   //Authentication by setting header with token value
    //   if (token) {
    //     request = request.clone({
    //       setHeaders: {
    //         'Authorization': token
    //       }
    //     });
    //   }

      if(!navigator.onLine){
        this.presentToast("No hay conexion a internet");
        return throwError("Network Error");
      }

      if (!request.headers.has('Content-Type')) {
        request = request.clone({
          setHeaders: {
            'Content-type': 'application/json'
          }
        });
      }

      if (!request.headers.has('Accept')) {
        request = request.clone({
          headers: request.headers.set('Accept', 'application/json')
        });
      }
  
    
  
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // console.log('event--->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          // console.error(error);
          if(navigator.onLine){
            this.presentToast("Error inesperado, contacte con soporte!");
          }
          return throwError(error);
        }));
    }
  
    async presentToast(msj) {
      const toast = await this.toastController.create({
        message: msj,
        duration: 2000
      });
      toast.present();
    }
  }