import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-yates',
  templateUrl: './yates.page.html',
  styleUrls: ['./yates.page.scss'],
})
export class YatesPage implements OnInit {

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


