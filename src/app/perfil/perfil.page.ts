import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private menu: MenuController
  ) { }

  ngOnInit() {
  }
  openMenu(){
    this.menu.open('menu');
  }

}
