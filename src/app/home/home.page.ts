import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  spinner = false;
  spinnerForm = false;

  usuario
  constructor(
    private router: Router,
    private  service : ApiService,
    private navCtrl:NavController,
    private menu: MenuController
    ) { 
   
    }

  ngOnInit() {
   this.ping();
 
  }
  
  ionViewWillEnter(){
    this.ping(); 
  }
  

  go(ruta){
    this.router.navigateByUrl(ruta);
  }
  gotopoliticas() {
    this.navCtrl.navigateForward('politicas');
  }
  gotoaviso() {
    this.navCtrl.navigateForward('avisolegal');
  }

 
  ping(){
    let data    =   localStorage.getItem('token');
    this.usuario =  localStorage.getItem('user');
    if(data){
       this.service.ping(data).subscribe((response)=>{
       console.log('Usuario recibido', this.usuario)
       console.log(response) 
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
