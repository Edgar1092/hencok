import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ApiService } from './services/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  usuario = ''
  

  spinner = false;
  spinnerForm = false;

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'INICIO',
      url: '',
      icon: 'chevron-forward'
    },
    {
      title: 'PERFIL',
      url: '/perfil',
      icon: 'chevron-forward'
    },
    {
      title: 'BARCOS',
      url: '/rentaryates',
      icon: 'chevron-forward'
    },
    {
      title: 'COCHES',
      url: '/rentarcars',
      icon: 'chevron-forward'
    } 

  ];
  lang = 'es'
  constructor(
    private  menu: MenuController,
    private  service : ApiService,
    private navCtrl: NavController,
    private translateService: TranslateService
    ) {
      // Idioma
      this.translateService.setDefaultLang('es');
      this.translateService.use('es'); 
      // this.lang = this.translateService.currentLang.toString();
      console.log('UsuarioEmpezando',this.usuario)
         
      this.service.currentEvent.subscribe(data=>{
        this.usuario = data;
        // console.log('UsuarioooOO', this.usuario)
       });
      console.log('Lang menu',this.lang)
  }
  
  closeMenu(){
    this.menu.close();
  }
  gotosignin() {
    this.navCtrl.navigateForward('signin');
  }
  gotologin() {
    this.navCtrl.navigateForward('login');
  }


  ping(){
    let data     =  localStorage.getItem('token');
    this.usuario =  localStorage.getItem('user');
    if(data){
       this.service.ping(data).subscribe((response)=>{
       console.log('Usuario', this.usuario)
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

  logout(){
    let data =  localStorage.getItem('token');
    localStorage.getItem('user');
    if(data){
       this.service.logout(data).subscribe((response)=>{
       console.log(response) 
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.usuario= '';
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
   
   changeLanguage(){
     console.log(this.lang)
     this.translateService.use(this.lang)
   }

}


