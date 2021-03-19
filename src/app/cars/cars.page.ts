import { Component, OnInit } from '@angular/core';
import { NavParams,LoadingController,NavController, AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {

  constructor(
    private navCtrl: NavController,
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
