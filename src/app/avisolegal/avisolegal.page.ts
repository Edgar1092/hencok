import { NavController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-avisolegal',
  templateUrl: './avisolegal.page.html',
  styleUrls: ['./avisolegal.page.scss'],
})
export class AvisolegalPage implements OnInit {

  constructor(
    private navCtrl:NavController,
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
  gotoaviso() {
    this.navCtrl.navigateForward('avisolegal');
  }
}
