import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ApiService } from './services/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  usuario
  

  spinner = false;
  spinnerForm = false;


  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inicio',
      url: '',
      icon: 'chevron-forward'
    },
    {
      title: 'Tu perfil',
      url: '/perfil',
      icon: 'chevron-forward'
    },
    {
      title: 'Barcos',
      url: '/rentaryates',
      icon: 'chevron-forward'
    },
    {
      title: 'Coches',
      url: '/rentarcars',
      icon: 'chevron-forward'
    } 

  ];
  
  constructor(
    private  menu: MenuController,
    private  service : ApiService,
    private  navCtrl: NavController,
     
    ) { 
      console.log('UsuarioEmpezando',this.usuario)
      // this.ping();
     
      this.service.currentEvent.subscribe(data=>{
        this.usuario = data;
        // console.log('UsuarioooOO', this.usuario)
       });
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
         },(error)=>{
         this.spinnerForm =false
         console.log(error)
             })
     console.log(data);
     localStorage.removeItem('token');
     localStorage.removeItem('user');
      this.usuario= '';
    }
    else{
     this.service.presentToast("Inicie sesion");
    }
   }


}


