import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.page.html',
  styleUrls: ['./politicas.page.scss'],
})
export class PoliticasPage implements OnInit {

  constructor(
private navCtrl:NavController,
private menu: MenuController
  ) { }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back();
  }

  openMenu(){
    this.menu.open('menu');
  }
  gotopoliticas() {
    this.navCtrl.navigateForward('politicas');
  }

}
