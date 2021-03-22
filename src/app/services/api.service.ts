import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ApiService implements CanActivate{

  constructor(private http: HttpClient, private navCtrl: NavController) { }

  canActivate() {
    //Validamos que existe un usuario en el localstorage almacenado
    let token = localStorage.getItem('token');
    let usuario = localStorage.getItem('user'); 
    if (token && usuario) {
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
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

  login(data){
    return this.http.post<any>(
    environment.apiUrlCars + "/api/auth/login", data);
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

  yates(params?) : Observable<any>{
    let parseParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(p => {
        parseParams = parseParams.append(p, params[p]);
      });
    }
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.get(
      environment.apiUrlCars + "/api/booking/frontend/products", {params : parseParams})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('cars', []))
      );
  }

  yatesdetail(code) : Observable<any>{
    let parseParams = new HttpParams();
    parseParams = parseParams.append("api_key", environment.apiKey);
    return this.http.get<any>(
    environment.apiUrlCars + "/api/booking/frontend/products/"+ code, {params : parseParams})
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


  
  
}
