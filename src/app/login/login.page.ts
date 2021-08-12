import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {



  spinner = false;
  spinnerForm = false;

  usuario
  nombreUsuario
  usuarioError = false
  @Output() enviarUsuario = new EventEmitter<any>();

  /*Formulario*/
  username = ''
  password = ''


  /* Validar Clave */



  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private service: ApiService,
  ) { }

  ngOnInit() {

  }
  openMenu() {
    this.menu.open('menu');
  }
  gotosignin() {
    this.navCtrl.navigateForward('signin');
  }
  gotocambiarclave() {
    this.navCtrl.navigateForward('cambiarclave');
  }
  updatePost() {
    this.service.publish(this.nombreUsuario);
    console.log('Usuario Enviado', this.nombreUsuario)
    // or 
    // this.eventService.publish({name: 'postupdate', value: 'value you need to pass'});
  }



  Login() {
    this.usuarioError = false
    if (this.username != '' && this.password != '') {
      this.spinnerForm = true
      let data = {
        'username': this.username,
        'password': this.password,
      }
      let params = { username: this.username, password: this.password }
      this.service.loginCars(data, params).then((response) => {
        // this.spinnerForm = false
        let bearer = response;
        this.usuario = response;
        console.log(response)
        this.usuario = response['body']
        this.usuario = JSON.stringify(this.usuario)
        this.usuario = JSON.parse(this.usuario);
        if (this.usuario.connected) {
          console.log("CCCC",bearer.headers.get('Authorization'));
          this.nombreUsuario = this.usuario.user.full_name
          localStorage.setItem("tokenCars", bearer.headers.get('Authorization'));
          localStorage.setItem("user", this.nombreUsuario)
          // this.updatePost();
          // this.navCtrl.navigateForward('');
          // this.service.presentToast("Bienvenido " + this.nombreUsuario);

          // this.loginBoat(data,params);
          setTimeout(() => {
            this.loginBoat(data,params)
           }, 1500);

        } else {
          this.spinnerForm = false
          this.usuarioError = true;
        }
      }, (error) => {
        this.spinnerForm = false
        console.log(error)
      })
      console.log(data);

    } else {
      this.service.presentToast("Datos incompletos !");
    }
  }



  // enviarUsuario(nomUsuario) {
  //   this.service.obtenerUsuario(nomUsuario);
  // }

  ping() {

    let data = localStorage.getItem('tokenCars');
    if (data) {
      this.service.ping(data).then((response) => {
        console.log('Probando Ping=>',response)
        // if (!response) {
        //   localStorage.removeItem("tokenCars");
        //   localStorage.removeItem("tokenBoats");
        // }
      }, (error) => {
        this.spinnerForm = false
        console.log(error)
      })
 
    }
    else {
      //  this.service.presentToast("Inicie sesion");
    }
  }
 loginBoat(data,params){
 
    this.service.loginBoats(data, params).then((response) => {
      this.spinnerForm = false
      let bearer = response;
      let usuario = response;
      console.log(response)
      usuario = response['body']
      usuario = JSON.stringify(usuario)
      usuario = JSON.parse(usuario);
      if (usuario.connected) {
        console.log("BBBB",bearer.headers.get('Authorization'));
        this.nombreUsuario = this.usuario.user.full_name
        localStorage.setItem("tokenBoats", bearer.headers.get('Authorization'));
        // localStorage.setItem("user", this.nombreUsuario)
        this.updatePost();
        this.navCtrl.navigateForward('');
        this.service.presentToast("Bienvenido " + this.nombreUsuario);
      } else {
        localStorage.removeItem("tokenCars");
        localStorage.removeItem("user")
        this.usuarioError = true;
      }
    }, (error) => {
      this.spinnerForm = false
      localStorage.removeItem("tokenCars");
      localStorage.removeItem("user")
      console.log(error)
    })
  }


}
