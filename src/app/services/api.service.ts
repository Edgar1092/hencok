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
@Injectable({
  providedIn: 'root'
})
export class ApiService implements CanActivate{

  private dataObserved = new BehaviorSubject<any>('');
 currentEvent = this.dataObserved.asObservable();



  public $uid: string
  constructor(
    private http: HttpClient, 
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


  signup(data,params?) : Observable<any>{
    let parseParams = new HttpParams();
    const header1= {'Content-Type':'application/json',};
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    return this.http.post(
      environment.apiUrlCars + "/api/v1/signup/customer",data, {params : parseParams, headers:{},
      observe: 'response',
      responseType: 'json'})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('signup'))
      );
  }


  loginCars(data,params?) : Observable<any>{
    let parseParams = new HttpParams();
    const header1= {'Content-Type':'application/json',};
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    return this.http.post(
      environment.apiUrlCars + "/api/v1/login",data, {params : parseParams, headers: header1,
        observe: 'response',
        responseType: 'json'})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('signup', []))
      );
  }
  
  loginBoats(data,params?) : Observable<any>{
    let parseParams = new HttpParams();
    const header1= {'Content-Type':'application/json',};
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.post(
      environment.apiUrlBoat + "/api/v1/login",data, {params : parseParams, headers: header1,
        observe: 'response',
        responseType: 'json'})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('signup', []))
      );
  }

  logout(data,params?) : Observable<any>{
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
    return this.http.delete(
      environment.apiUrlCars + "/api/v1/logout", {params : parseParams, headers: headers,
        observe: 'response',
        responseType: 'json'
        })
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('logout', []))
      );
  }

  ping(data,params?) : Observable<any>{
    let parseParams = new HttpParams();
    const headers1= {'Authorization': data};
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
    parseParams = parseParams.append("value", "conectado");
    return this.http.get(
      environment.apiUrlCars + "/api/v1/ping", {params : parseParams, headers: headers,
        observe: 'response',
        responseType: 'json'})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('ping', []))
      );
  }

  
  password(data,params?) : Observable<any>{
    let parseParams = new HttpParams();
    const header1= {'Content-Type':'application/json',};
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    return this.http.post(
      environment.apiUrlCars + "/api/v1/web-customer/password-forgotten",data, {params : parseParams, headers: header1,
        observe: 'response',
        responseType: 'json'})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('password', []))
      );
  }

  
  reservationCars(token,params?) : Observable<any>{
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
    return this.http.get(
      environment.apiUrlCars + "/api/v1/web-customer/renting-reservations", {params : parseParams, headers: headers})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('carshoraentrega', []))
      );
  }
  reservationBoats(token,params?) : Observable<any>{
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
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.get(
      environment.apiUrlBoat + "/api/v1/web-customer/renting-reservations", {params : parseParams, headers: headers})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('carshoraentrega', []))
      );
  }

  cars(params?) : Observable<any>{
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    return this.http.get(
      environment.apiUrlCars + "/api/booking/frontend/products", {params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('cars', []))
      );
  }

  carsdetail(code) : Observable<any>{
    return this.http.get<any>(
    environment.apiUrlCars + "/api/booking/frontend/products/"+ code)
    .pipe(
      tap(_ => this.log('response received')),
      catchError(this.handleError('carsdetail', []))
    );
  }

  carsentrega() : Observable<any>{
    return this.http.get<any>(
    environment.apiUrlCars + "/api/booking/frontend/"+ "pickup-places")
    .pipe(
      tap(_ => this.log('response received')),
      catchError(this.handleError('carsentrega', []))
    );
  }

  carsdevolucion(params?) : Observable<any>{
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    return this.http.get(
      environment.apiUrlCars + "/api/booking/frontend/return-places", {params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('carsdevolucion', []))
      );
  }

  carsdateentrega(params?) : Observable<any>{
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    return this.http.get(
      environment.apiUrlCars + "/api/booking/frontend/dates", {params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('carsdateentrega', []))
      );
  }

  carsHoraEntrega(params?) : Observable<any>{
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    return this.http.get(
      environment.apiUrlCars + "/api/booking/frontend/times", {params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('carshoraentrega', []))
      );
  }

  carsocupacionentrega(idcarro,params?) : Observable<any>{
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    return this.http.get(
      environment.apiUrlCars + "/api/booking/frontend/products/"+idcarro+"/occupation", {params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('carsdateentrega', []))
      );
  }

  shoppingCart(data,params?) : Observable<any>{
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    return this.http.post(
      environment.apiUrlCars + "/api/booking/frontend/shopping-cart",data, {params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('carshoraentrega', []))
      );
  }

  shoppingCartGet(id,params?) : Observable<any>{
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    return this.http.get(
      environment.apiUrlCars + "/api/booking/frontend/shopping-cart/"+id, {params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('carshoraentrega', []))
      );
  }

  setProduct(id,data,params?) : Observable<any>{
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    return this.http.post(
      environment.apiUrlCars + "/api/booking/frontend/shopping-cart/"+id+"/set-product",data, {params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('carshoraentrega', []))
      );
  }

  reservaGet(id) : Observable<any>{
  
    return this.http.get(
      environment.apiUrlCars + "/api/booking/frontend/booking/"+id)
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('reservaGet', []))
      );
  }

  createCheckout(shoppingCart,data,token?,params?) : Observable<any>{
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
    return this.http.post(
      environment.apiUrlCars + "/api/booking/frontend/shopping-cart/"+shoppingCart+"/checkout",data, {params : parseParams, headers: headers})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('carshoraentrega', []))
      );
  }

  createCheckoutYates(shoppingCart,data,token?,params?) : Observable<any>{
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
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.post(
      environment.apiUrlBoat + "/api/booking/frontend/shopping-cart/"+shoppingCart+"/checkout",data, {params : parseParams,headers: headers})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('carshoraentrega', []))
      );
  }


  reservaPagar(data,params?) : Observable<any>{
    let parseParams = new HttpParams();
  
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    return this.http.post(
      environment.apiUrlCars + "/reserva/pagar",data, {params : parseParams} )
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('carshoraentrega', []))
      );
  }

  yates(params?) : Observable<any>{
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
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.get(
      environment.apiUrlBoat + "/api/booking/frontend/products", {params : parseParams, headers:headers})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('yates', []))
      );
  }

  yatesdetail(code) : Observable<any>{
    let parseParams = new HttpParams();
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.get<any>(
    environment.apiUrlBoat + "/api/booking/frontend/products/"+ code, {params : parseParams})
    .pipe(
      tap(_ => this.log('response received')),
      catchError(this.handleError('yatesdetail', []))
    );
  }

  yatesEntrega() : Observable<any>{
    let parseParams = new HttpParams();
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.get<any>(
    environment.apiUrlBoat + "/api/booking/frontend/pickup-places",{params : parseParams})
    .pipe(
      tap(_ => this.log('response received')),
      catchError(this.handleError('yatesEntrega', []))
    );
  }

  yatesDevolucion(params?) : Observable<any>{
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.get(
      environment.apiUrlBoat + "/api/booking/frontend/return-places", {params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('yatesDevolucion', []))
      );
  }

  yatesFechas(params?) : Observable<any>{
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.get(
      environment.apiUrlBoat + "/api/booking/frontend/dates", {params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('yatesFechas', []))
      );
  }

  yatesHoras(params?) : Observable<any>{
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.get(
      environment.apiUrlBoat + "/api/booking/frontend/times", {params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('yatesHoras', []))
      );
  }

  yatesOcupacion(idyate,params?) : Observable<any>{
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.get(
      environment.apiUrlBoat + "/api/booking/frontend/products/"+idyate+"/occupation", {params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('yatesOcupacion', []))
      );
  }

  shoppingYate(data,params?) : Observable<any>{
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.post(
      environment.apiUrlBoat + "/api/booking/frontend/shopping-cart",data, {params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('shoppingYate', []))
      );
  }

  shoppingYateGet(id,params?) : Observable<any>{
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.get(
      environment.apiUrlBoat + "/api/booking/frontend/shopping-cart/"+id, {params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('shoppingYateGet', []))
      );
  }

  setProductYate(id,data,params?) : Observable<any>{
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.post(
      environment.apiUrlBoat + "/api/booking/frontend/shopping-cart/"+id+"/set-product",data, {params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('setProductYate', []))
      );
  }

  reservaGetYate(id) : Observable<any>{
    let parseParams = new HttpParams();
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.get(
      environment.apiUrlBoat + "/api/booking/frontend/booking/"+id,{params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('reservaGetYate', []))
      );
  }

  createCheckoutYate(shoppingCart,data,token?,params?) : Observable<any>{
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
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.post(
      environment.apiUrlBoat + "/api/booking/frontend/shopping-cart/"+shoppingCart+"/checkout",data, {params : parseParams, headers: headers})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('carshoraentrega', []))
      );
  }

  reservaPagarYate(data,params?) : Observable<any>{
    let parseParams = new HttpParams();
    const headers = new HttpHeaders()
    .set('Accept', '*/*')
    .set('Content-Type', 'multipart/form-data');
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.post(
      environment.apiUrlBoat + "/reserva/pagar",data, {params : parseParams,headers: headers} )
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('reservaPagarYate', []))
      );
  }



  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

  
}
