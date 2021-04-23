import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  spinner = false;
  spinnerForm = false;

/*Formulario*/
username = ''
password = ''

  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private  service : ApiService
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
