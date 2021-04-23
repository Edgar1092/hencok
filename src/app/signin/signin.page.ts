import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  spinner = false;
  spinnerForm = false;

  /* Formulario */
  username = ''
  email = ''
  password = ''
  name = ''
  surname = ''

  constructor(
    private menu: MenuController,
    private service: ApiService,
    private navCtrl: NavController

  ) { }

  ngOnInit() {
  }
  
  openMenu(){
    this.menu.open('menu');
  }
  gotologin() {
    this.navCtrl.navigateForward('login');
  }
  gotopoliticas() {
    this.navCtrl.navigateForward('politicas');
  }
  gotoaviso() {
    this.navCtrl.navigateForward('avisolegal');
  }

  // register() {
  //   const user = { username: this.username, email: this.email, password: this.password, name:this.name, surname:this.surname};
  //   this.service.register(user).subscribe(data => {
  //     console.log(data);
  //     
  //   });
  //   console.log('Useeeer',user);
  // }

  Registro(){
    if(this.username !='' && this.email !='' && this.password !='' && this.name !='' && this.surname != ''){
      this.spinnerForm = true
     let data = {
          'username': this.username,
          'email'   : this.email,
          'password': this.password,
          'name'    : this.name,
          'surname' :this.surname
         }
         this.service.signup(data).subscribe((response)=>{
           this.spinnerForm =false
           console.log(response)
            // localStorage.setItem("free_access_id", data.free_access_id)
             },(error)=>{
             this.spinnerForm =false
             console.log(error)
                 })
         console.log(data);
             }else{
           this.service.presentToast("Datos incompletos !");
               }
  }



}
