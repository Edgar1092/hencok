import { Component } from '@angular/core';


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
      url: '/rentarcars',
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


