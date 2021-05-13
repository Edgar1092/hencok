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
    private  service : ApiService,
    ) {  }

  ngOnInit() {

  }
  openMenu(){
    this.menu.open('menu');
  }
  gotosignin() {
    this.navCtrl.navigateForward('signin');
  }
  updatePost(){
    this.service.publish(this.nombreUsuario);
    console.log('Usuario Enviado', this.nombreUsuario)
    // or 
    // this.eventService.publish({name: 'postupdate', value: 'value you need to pass'});
} 

 

  Login(){
    this.usuarioError = false
    if(this.username !=''  && this.password !='' ){
      this.spinnerForm = true
     let data = {
          'username': this.username,
          'password': this.password,
         }
         let params = {username:this.username,password:this.password}
         this.service.login(data,params).subscribe((response)=>{
           this.spinnerForm =false
           let bearer = response;
           this.usuario = response;
           console.log(response)
           this.usuario = response['body']
           this.usuario = JSON.stringify(this.usuario)
            this.usuario = JSON.parse(this.usuario);
          if(this.usuario.connected) {
              console.log(bearer.headers.get('Authorization'));
              this.nombreUsuario= this.usuario.user.full_name
              localStorage.setItem("token" ,bearer.headers.get('Authorization'));
              localStorage.setItem("user", this.nombreUsuario)
              this.updatePost();
              this.navCtrl.navigateForward('');
              this.service.presentToast("Bienvenido " + this.nombreUsuario); 
          }else{
            this.usuarioError = true;
          }
             },(error)=>{
             this.spinnerForm =false
             console.log(error)
                 })
         console.log(data);

             }else{
           this.service.presentToast("Datos incompletos !");
               }
  }



  // enviarUsuario(nomUsuario) {
  //   this.service.obtenerUsuario(nomUsuario);
  // }

  logout(){
   let data =  localStorage.getItem('token');
   localStorage.getItem('usuario');
   if(data){
      this.service.logout(data).subscribe((response)=>{
      console.log(response) 
        },(error)=>{
        this.spinnerForm =false
        console.log(error)
            })
    console.log(data);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
   }
   else{
    this.service.presentToast("Inicie sesion");
   }
  }

   ping(){
    let data =  localStorage.getItem('token');
    if(data){
       this.service.ping(data).subscribe((response)=>{
       console.log(response) 
       if(!response){
         localStorage.removeItem("token");
       }
         },(error)=>{
         this.spinnerForm =false
         console.log(error)
             })
     console.log(data);
    }
    else{
    //  this.service.presentToast("Inicie sesion");
  }
  }


 
}
