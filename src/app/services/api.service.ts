import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import { merge, observable, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CanActivate } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { environment } from "../../environments/environment";
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { inject } from '@angular/core/testing';
import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
  providedIn: 'root'
})
export class ApiService implements CanActivate{

  private dataObserved = new BehaviorSubject<any>('');
 currentEvent = this.dataObserved.asObservable();



  public $uid: string
  constructor(
    private http2: HttpClient,
    private http: HTTP,  
    private navCtrl: NavController, 
    private toastController : ToastController,
  
    ) { }

    publish(param):void {
      this.dataObserved.next(param);
    }
    
  canActivate() {
    //Validamos que existe un usuario en el localstorage almacenado
    let tokenB = localStorage.getItem('tokenBoats');
    let tokenC = localStorage.getItem('tokenCars');
    let usuario = localStorage.getItem('user'); 
    if (tokenB && tokenC && usuario) {
        return true;
    } else {
      this.navCtrl.navigateRoot('/login');
      return false;  
    }
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(error as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // console.log(message);
  }


  signup(data,params?) {
    let parseParams = new HttpParams();
    const header1= {'Content-Type':'application/json',};
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // return this.http.post(
    //   environment.apiUrlCars + "/api/v1/signup/customer",data, {params : parseParams, headers:{},
    //   observe: 'response',
    //   responseType: 'json'})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('signup'))
    //   );

      return this.http.post(
        environment.apiUrlCars + "/api/v1/signup/customer",data,{params})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('product add', [])
        });
  }


  loginCars(data,params?) {
    let parseParams = new HttpParams();
    const header1= {'Content-Type':'application/json',};
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // return this.http.post(
    //   environment.apiUrlCars + "/api/v1/login",data, {params : parseParams, headers: header1,
    //     observe: 'response',
    //     responseType: 'json'})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('signup', []))
    //   );

      return this.http.post(
        environment.apiUrlCars + "/api/v1/login",data,{params, headers: header1})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('product add', [])
        });
  }
  
  loginBoats(data,params?) {
    let parseParams = new HttpParams();
    const header1= {'Content-Type':'application/json',};
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // parseParams = parseParams.append("api_key", environment.apiKey);
    // return this.http.post(
    //   environment.apiUrlBoat + "/api/v1/login",data, {params : parseParams, headers: header1,
    //     observe: 'response',
    //     responseType: 'json'})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('signup', []))
    //   );

      return this.http.post(
        environment.apiUrlBoat + "/api/v1/login",data,{params, headers: header1})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('product add', [])
        });
  }

  logoutCars(data,params?) {
    let parseParams = new HttpParams();
    const headers1= {'Authorization':data};
    const headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin' , '*')
    .set('Accept', '*/*')
    .set('Content-type', '*/*')
    .set('Authorization', data);
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // return this.http.delete(
    //   environment.apiUrlCars + "/api/v1/logout", {params : parseParams, headers: headers,
    //     observe: 'response',
    //     responseType: 'json'
    //     })
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('logout', []))
    //   );

      return this.http.delete(
        environment.apiUrlCars + "/api/v1/logout",{},{params, headers: headers})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('product delete', [])
        });
  }
  logoutBoats(data,params?) {
    let parseParams = new HttpParams();
    const headers1= {'Authorization':data};
    const headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin' , '*')
    .set('Accept', '*/*')
    .set('Content-type', '*/*')
    .set('Authorization', data);
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // parseParams = parseParams.append("api_key", environment.apiKey);
    // return this.http.delete(
    //   environment.apiUrlBoat + "/api/v1/logout", {params : parseParams, headers: headers,
    //     observe: 'response',
    //     responseType: 'json'
    //     })
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('logout', []))
    //   );

      return this.http.delete(
        environment.apiUrlBoat + "/api/v1/logout",{},{params, headers: headers})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('product delete', [])
        });
  }

  ping(data,params?) {
    let parseParams=params;
    const headers1= {'Authorization': data};
    const headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin' , '*')
    .set('Accept', '*/*')
    .set('Content-type', '*/*')
    .set('Authorization', data);
    // if (params) {
    //   Object.keys(params).forEach(p => {
    //     parseParams = parseParams.append(p, params[p]);
    //   });
    // }
    params.append("value", "conectado");
    // return this.http.get(
    //   environment.apiUrlCars + "/api/v1/ping", {params : parseParams, headers: headers,
    //     observe: 'response',
    //     responseType: 'json'})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('ping', []))
    //   );

      return this.http.get(
        environment.apiUrlCars + "/api/v1/ping",{},{params,headers: headers})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }

  
  password(data,params?){
    let parseParams = new HttpParams();
    const header1= {'Content-Type':'application/json',};
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // return this.http.post(
    //   environment.apiUrlCars + "/api/v1/web-customer/password-forgotten",data, {params : parseParams, headers: header1,
    //     observe: 'response',
    //     responseType: 'json'})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('password', []))
    //   );

      return this.http.post(
        environment.apiUrlCars + "/api/v1/web-customer/password-forgotten",data,{params, headers: header1})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('product add', [])
        });
  }

  
  reservationCars(token,params?) {
    let headers:any
    if(token){
      headers={'Authorization': token};
    }
     
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // return this.http.get(
    //   environment.apiUrlCars + "/api/v1/web-customer/renting-reservations", {params : parseParams, headers: headers})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('carshoraentrega', []))
    //   );

      return this.http.get(
        environment.apiUrlCars + "/api/v1/web-customer/renting-reservations",{},{params,headers: headers})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }
  reservationBoats(token,params?) {
    let headers:any
    if(token){
      headers={'Authorization': token};
    }
     
    let parseParams=params;
    // if (params) {
    //   Object.keys(params).forEach(p => {
    //     parseParams = parseParams.append(p, params[p]);
    //   });
    // }
    params.append("api_key", environment.apiKey);
    // return this.http.get(
    //   environment.apiUrlBoat + "/api/v1/web-customer/renting-reservations", {params : parseParams, headers: headers})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('carshoraentrega', []))
    //   );

      return this.http.get(
        environment.apiUrlBoat + "/api/v1/web-customer/renting-reservations",{},{params,headers: headers})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }

  cars(params?) {
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // return this.http.get(
    //   environment.apiUrlCars + "/api/booking/frontend/products", {params : parseParams})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('cars', []))
    //   );

      return this.http.get(
        environment.apiUrlCars + "/api/booking/frontend/products",{},{params})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }

  carsdetail(code) {
    // return this.http.get<any>(
    // environment.apiUrlCars + "/api/booking/frontend/products/"+ code)
    // .pipe(
    //   tap(_ => this.log('response received')),
    //   catchError(this.handleError('carsdetail', []))
    // );

    return this.http.get(
      environment.apiUrlCars + "/api/booking/frontend/products/"+ code,{},{})
      .then(data =>{
        return JSON.parse(data.data);
      })
      .catch(error => {
        this.handleError('categories', [])
      });
  }

  carsentrega(){
    // return this.http.get<any>(
    // environment.apiUrlCars + "/api/booking/frontend/"+ "pickup-places")
    // .pipe(
    //   tap(_ => this.log('response received')),
    //   catchError(this.handleError('carsentrega', []))
    // );

    return this.http.get(
      environment.apiUrlCars + "/api/booking/frontend/"+ "pickup-places",{},{})
      .then(data =>{
        return JSON.parse(data.data);
      })
      .catch(error => {
        this.handleError('categories', [])
      });
  }

  carsdevolucion(params?){
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // return this.http.get(
    //   environment.apiUrlCars + "/api/booking/frontend/return-places", {params : parseParams})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('carsdevolucion', []))
    //   );

      return this.http.get(
        environment.apiUrlCars + "/api/booking/frontend/return-places",{},{params})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }

  carsdateentrega(params?) {
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // return this.http.get(
    //   environment.apiUrlCars + "/api/booking/frontend/dates", {params : parseParams})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('carsdateentrega', []))
    //   );

      return this.http.get(
        environment.apiUrlCars + "/api/booking/frontend/dates",{},{params})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }

  carsHoraEntrega(params?){
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // return this.http.get(
    //   environment.apiUrlCars + "/api/booking/frontend/times", {params : parseParams})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('carshoraentrega', []))
    //   );

      return this.http.get(
        environment.apiUrlCars + "/api/booking/frontend/times",{},{params})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }

  carsocupacionentrega(idcarro,params?) {
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // return this.http.get(
    //   environment.apiUrlCars + "/api/booking/frontend/products/"+idcarro+"/occupation", {params : parseParams})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('carsdateentrega', []))
    //   );

      return this.http.get(
        environment.apiUrlCars + "/api/booking/frontend/products/"+idcarro+"/occupation",{},{params})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }

  shoppingCart(data,params?) {
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // return this.http.post(
    //   environment.apiUrlCars + "/api/booking/frontend/shopping-cart",data, {params : parseParams})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('carshoraentrega', []))
    //   );

      return this.http.post(
        environment.apiUrlCars + "/api/booking/frontend/shopping-cart",data,{params})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('product add', [])
        });
  }

  shoppingCartGet(id,params?){
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // return this.http.get(
    //   environment.apiUrlCars + "/api/booking/frontend/shopping-cart/"+id, {params : parseParams})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('carshoraentrega', []))
    //   );

      return this.http.get(
        environment.apiUrlCars + "/api/booking/frontend/shopping-cart/"+id,{},{params})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }

  setProduct(id,data,params?){
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // return this.http.post(
    //   environment.apiUrlCars + "/api/booking/frontend/shopping-cart/"+id+"/set-product",data, {params : parseParams})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('carshoraentrega', []))
    //   );

      return this.http.post(
        environment.apiUrlCars + "/api/booking/frontend/shopping-cart/"+id+"/set-product",data,{params})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('product add', [])
        });
  }

  reservaGet(id) {
  
    // return this.http.get(
    //   environment.apiUrlCars + "/api/booking/frontend/booking/"+id)
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('reservaGet', []))
    //   );

      return this.http.get(
        environment.apiUrlCars + "/api/booking/frontend/booking/"+id,{},{})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }

  createCheckout(shoppingCart,data,token?,params?){
    let headers:any
    if(token){
      headers={'Authorization': token};
    }
     
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // return this.http.post(
    //   environment.apiUrlCars + "/api/booking/frontend/shopping-cart/"+shoppingCart+"/checkout",data, {params : parseParams, headers: headers})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('carshoraentrega', []))
    //   );

      return this.http.post(
        environment.apiUrlCars + "/api/booking/frontend/shopping-cart/"+shoppingCart+"/checkout",data,{params, headers: headers})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('product add', [])
        });
  }

  createCheckoutYates(shoppingCart,data,token?,params?) {
    let headers:any
    if(token){
      headers={'Authorization': token};
    }
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    params.append("api_key", environment.apiKey);
    // return this.http.post(
    //   environment.apiUrlBoat + "/api/booking/frontend/shopping-cart/"+shoppingCart+"/checkout",data, {params : parseParams,headers: headers})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('carshoraentrega', []))
    //   );

      return this.http.post(
        environment.apiUrlBoat + "/api/booking/frontend/shopping-cart/"+shoppingCart+"/checkout",data,{params, headers: headers})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('product add', [])
        });
  }


  reservaPagar(data,params?) {
    let parseParams = new HttpParams();
  
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    // return this.http.post(
    //   environment.apiUrlCars + "/reserva/pagar",data, {params : parseParams} )
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('carshoraentrega', []))
    //   );

      return this.http.post(
        environment.apiUrlCars + "/reserva/pagar",data,{params})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('product add', [])
        });
  }

  yates(params?){
    let parseParams = new HttpParams();
    const headers = new HttpHeaders()
    .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
    .set('Access-Control-Allow-Origin' , '*')
    .set('Accept', '*/*');
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    params.append("api_key", environment.apiKey);
    // return this.http.get(
    //   environment.apiUrlBoat + "/api/booking/frontend/products", {params : parseParams, headers:headers})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('yates', []))
    //   );

      return this.http.get(
        environment.apiUrlBoat + "/api/booking/frontend/products",{},{params, headers:headers})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }

  yatesdetail(code) {
    let parseParams;
    parseParams = parseParams.append("api_key", environment.apiKey);
    // return this.http.get<any>(
    // environment.apiUrlBoat + "/api/booking/frontend/products/"+ code, {params : parseParams})
    // .pipe(
    //   tap(_ => this.log('response received')),
    //   catchError(this.handleError('yatesdetail', []))
    // );

    return this.http.get(
      environment.apiUrlBoat + "/api/booking/frontend/products/"+ code,{},{parseParams})
      .then(data =>{
        return JSON.parse(data.data);
      })
      .catch(error => {
        this.handleError('categories', [])
      });
  }

  yatesEntrega() {
    let parseParams;
    parseParams = parseParams.append("api_key", environment.apiKey);
    // return this.http.get<any>(
    // environment.apiUrlBoat + "/api/booking/frontend/pickup-places",{params : parseParams})
    // .pipe(
    //   tap(_ => this.log('response received')),
    //   catchError(this.handleError('yatesEntrega', []))
    // );

    return this.http.get(
      environment.apiUrlBoat + "/api/booking/frontend/pickup-places",{},{parseParams})
      .then(data =>{
        return JSON.parse(data.data);
      })
      .catch(error => {
        this.handleError('categories', [])
      });
  }

  yatesDevolucion(params?) {
    let parseParams;
    // if (params) {
    //   Object.keys(params).forEach(p => {
    //     parseParams = parseParams.append(p, params[p]);
    //   });
    // }
    params.append("api_key", environment.apiKey);
    // return this.http.get(
    //   environment.apiUrlBoat + "/api/booking/frontend/return-places", {params : parseParams})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('yatesDevolucion', []))
    //   );

      
    return this.http.get(
      environment.apiUrlBoat + "/api/booking/frontend/return-places",{},{params})
      .then(data =>{
        return JSON.parse(data.data);
      })
      .catch(error => {
        this.handleError('categories', [])
      });
  }

  yatesFechas(params?) {
    let parseParams ;
    // if (params) {
    //   Object.keys(params).forEach(p => {
    //     parseParams = parseParams.append(p, params[p]);
    //   });
    // }
    params.append("api_key", environment.apiKey);
    // return this.http.get(
    //   environment.apiUrlBoat + "/api/booking/frontend/dates", {params : parseParams})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('yatesFechas', []))
    //   );

      return this.http.get(
        environment.apiUrlBoat + "/api/booking/frontend/dates",{},{params})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }

  yatesHoras(params?) {
    let parseParams ;
    // if (params) {
    //   Object.keys(params).forEach(p => {
    //     parseParams = parseParams.append(p, params[p]);
    //   });
    // }
    params.append("api_key", environment.apiKey);
    // return this.http.get(
    //   environment.apiUrlBoat + "/api/booking/frontend/times", {params : parseParams})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('yatesHoras', []))
    //   );

      return this.http.get(
        environment.apiUrlBoat + "/api/booking/frontend/times",{},{params})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }

  yatesOcupacion(idyate,params?){
    let parseParams;
    // if (params) {
    //   Object.keys(params).forEach(p => {
    //     parseParams = parseParams.append(p, params[p]);
    //   });
    // }
    params.append("api_key", environment.apiKey);
    // return this.http.get(
    //   environment.apiUrlBoat + "/api/booking/frontend/products/"+idyate+"/occupation", {params : parseParams})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('yatesOcupacion', []))
    //   );

      return this.http.get(
        environment.apiUrlBoat + "/api/booking/frontend/products/"+idyate+"/occupation",{},{params})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }
  yatesSearch(params?) {
    let parseParams;
    const headers = new HttpHeaders()
    .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
    .set('Access-Control-Allow-Origin' , '*')
    .set('Accept', '*/*');
    // if (params) {
    //   Object.keys(params).forEach(p => {
    //     parseParams = parseParams.append(p, params[p]);
    //   });
    // }
    params.append("api_key", environment.apiKey);
    // return this.http.get(
    //   environment.apiUrlBoat + "/api/booking/frontend/products-key-characteristics", {params : parseParams, headers:headers})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('yates', []))
    //   );

      return this.http.get(
        environment.apiUrlBoat + "/api/booking/frontend/products-key-characteristics",{},{params, headers:headers})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }
  

  shoppingYate(data,params?){
    let parseParams;
    // if (params) {
    //   Object.keys(params).forEach(p => {
    //     parseParams = parseParams.append(p, params[p]);
    //   });
    // }
    params.append("api_key", environment.apiKey);
    // return this.http.post(
    //   environment.apiUrlBoat + "/api/booking/frontend/shopping-cart",data, {params : parseParams})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('shoppingYate', []))
    //   );

      return this.http.post(
        environment.apiUrlBoat + "/api/booking/frontend/shopping-cart",data,{params})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('product add', [])
        });
  }

  shoppingYateGet(id,params?){
    let parseParams;
    // if (params) {
    //   Object.keys(params).forEach(p => {
    //     parseParams = parseParams.append(p, params[p]);
    //   });
    // }
    params.append("api_key", environment.apiKey);
    // return this.http.get(
    //   environment.apiUrlBoat + "/api/booking/frontend/shopping-cart/"+id, {params : parseParams})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('shoppingYateGet', []))
    //   );

      
      return this.http.get(
        environment.apiUrlBoat + "/api/booking/frontend/shopping-cart/"+id,{},{params})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }

  setProductYate(id,data,params?) {
    let parseParams;
    // if (params) {
    //   Object.keys(params).forEach(p => {
    //     parseParams = parseParams.append(p, params[p]);
    //   });
    // }
    params.append("api_key", environment.apiKey);
    // return this.http.post(
    //   environment.apiUrlBoat + "/api/booking/frontend/shopping-cart/"+id+"/set-product",data, {params : parseParams})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('setProductYate', []))
    //   );

      return this.http.post(
        environment.apiUrlBoat + "/api/booking/frontend/shopping-cart/"+id+"/set-product",data,{params})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('product add', [])
        });
  }

  reservaGetYate(id) {
    let parseParams;
    parseParams = parseParams.append("api_key", environment.apiKey);
    // return this.http.get(
    //   environment.apiUrlBoat + "/api/booking/frontend/booking/"+id,{params : parseParams})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('reservaGetYate', []))
    //   );

      return this.http.get(
        environment.apiUrlBoat + "/api/booking/frontend/booking/"+id,{},{parseParams})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('categories', [])
        });
  }

  createCheckoutYate(shoppingCart,data,token?,params?) {
    let headers:any
    if(token){
      headers={'Authorization': token};
    }
     
    let parseParams;
    // if (params) {
    //   Object.keys(params).forEach(p => {
    //     parseParams = parseParams.append(p, params[p]);
    //   });
    // }
    params.append("api_key", environment.apiKey);
    // return this.http.post(
    //   environment.apiUrlBoat + "/api/booking/frontend/shopping-cart/"+shoppingCart+"/checkout",data, {params : parseParams, headers: headers})
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('carshoraentrega', []))
    //   );

      return this.http.post(
        environment.apiUrlBoat + "/api/booking/frontend/shopping-cart/"+shoppingCart+"/checkout",data,{params, headers: headers})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('product add', [])
        });
  }

  reservaPagarYate(data,params?){
    let parseParams ;
    const headers = new HttpHeaders()
    .set('Accept', '*/*')
    .set('Content-Type', 'multipart/form-data');
    // if (params) {
    //   Object.keys(params).forEach(p => {
    //     parseParams = parseParams.append(p, params[p]);
    //   });
    // }
  params.append("api_key", environment.apiKey);
    // return this.http.post(
    //   environment.apiUrlBoat + "/reserva/pagar",data, {params : parseParams,headers: headers} )
    //   .pipe(
    //     tap(_ => this.log('response received')),
    //     catchError(this.handleError('reservaPagarYate', []))
    //   );

      return this.http.post(
        environment.apiUrlBoat + "/reserva/pagar",data,{params, headers: headers})
        .then(data =>{
          return JSON.parse(data.data);
        })
        .catch(error => {
          this.handleError('product add', [])
        });
  }



  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

  
}
