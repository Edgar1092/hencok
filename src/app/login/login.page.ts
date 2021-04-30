import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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

/*Formulario*/
username = ''
password = ''

  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private  service : ApiService,

    ) { }

  ngOnInit() {

  }
  openMenu(){
    this.menu.open('menu');
  }
  gotosignin() {
    this.navCtrl.navigateForward('signin');
  }

 

  Login(){
    if(this.username !=''  && this.password !=''){
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
           console.log(bearer.headers.get('Authorization'));
           this.usuario = response['body']
           this.usuario = JSON.stringify(this.usuario)
           this.usuario = JSON.parse(this.usuario);
           this.nombreUsuario= this.usuario.user.full_name
           localStorage.setItem("token" ,bearer.headers.get('Authorization'));
           localStorage.setItem("usuario", this.nombreUsuario)
           this.navCtrl.navigateForward('');
           this.service.presentToast("Bienvenido "+this.nombreUsuario); 
          this.enviarUsuario(this.nombreUsuario);
             },(error)=>{
             this.spinnerForm =false
             console.log(error)
                 })
         console.log(data);

             }else{
           this.service.presentToast("Datos incompletos !");
               }
  }

  enviarUsuario(nomUsuario) {
    this.service.obtenerUsuario(nomUsuario);
  }

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
         },(error)=>{
         this.spinnerForm =false
         console.log(error)
             })
     console.log(data);
    }
    else{
     this.service.presentToast("Inicie sesion");
  }
  }





 
}
