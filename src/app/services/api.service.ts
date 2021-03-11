import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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
      this.navCtrl.navigateRoot('/home');
      return false;  
    }
  }
  login(data){
    return this.http.post<any>(
    environment.apiUrlCars + "/api/auth/login", data);
  }
  cars(){
    return this.http.get<any>(
    environment.apiUrlCars + "/api/booking/frontend/products");
  }

  carsdetail(code){
    return this.http.get<any>(
    environment.apiUrlCars + "/api/booking/frontend/products"+"/"+ code);
  }
}
