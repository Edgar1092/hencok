import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

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
    private menu: MenuController,
    private translateService: TranslateService
    ) { 
      // this.translateService.setDefaultLang('en');
      // this.translateService.use(this.translateService.currentLang); 
      console.log("lang=>",this.translateService.currentLang)
      this.service.currentEvent.subscribe(data=>{
        this.usuario = data;
        
       });
    }

  ngOnInit() {
  //  this.ping();
 
  }
  
  ionViewWillEnter(){
    // this.ping();
    if(localStorage.getItem('tokenCars') && localStorage.getItem('user')){
      this.usuario =  localStorage.getItem('user');
      this.service.publish(this.usuario);
    } else{
      this.usuario =  '';
      this.service.publish('');
    }
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
