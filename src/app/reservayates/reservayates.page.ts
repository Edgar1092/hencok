import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-reservayates',
  templateUrl: './reservayates.page.html',
  styleUrls: ['./reservayates.page.scss'],
})
export class ReservayatesPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private menu:MenuController
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
