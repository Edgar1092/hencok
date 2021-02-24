import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
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

  constructor() { }

  ngOnInit() {
  }

}
