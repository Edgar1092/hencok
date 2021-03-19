import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tusreservas',
  templateUrl: './tusreservas.page.html',
  styleUrls: ['./tusreservas.page.scss'],
})
export class TusreservasPage implements OnInit {

  constructor(
   private menu: MenuController
  ) { }

  ngOnInit() {
  }

  openMenu(){
    this.menu.open('menu');
  }
  
}
