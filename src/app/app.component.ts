import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Tu perfil',
      url: '/perfil',
      icon: 'chevron-forward'
    },
    {
      title: 'Barcos',
      url: '/rentarcars',
      icon: 'chevron-forward'
    },
    {
      title: 'Coches',
      url: '/rentarcars',
      icon: 'chevron-forward'
    } 

  ];
  constructor(private menu: MenuController) {

  //  http.get('https://hencok.mybooking.es/api/booking/frontend/products').subscribe(console.log);
    
  }
  closeMenu(){
    this.menu.close();
  }

}


