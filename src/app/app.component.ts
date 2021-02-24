import { Component } from '@angular/core';
import { Platform } from '@ionic/angular'






@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inicio',
      url: '',
      icon: 'play'
    },
    {
      title: 'Flota',
      url: '',
      icon: 'car-sport'
    },
    {
      title: 'Servicios',
      url: '',
      icon: 'construct'
    },
    {
      title: 'Somos Hencok',
      url: '',
      icon: 'chatbubbles'
    },
    {
      title: 'Contacto',
      url: '',
      icon: 'call'
    },  

  ];
  constructor() {
  
  }

}


