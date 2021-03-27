import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  constructor(
    private menu: MenuController,
    private navCtrl: NavController

  ) { }

  ngOnInit() {
  }
  
  openMenu(){
    this.menu.open('menu');
  }
  gotologin() {
    this.navCtrl.navigateForward('login');
  }
  gotopoliticas() {
    this.navCtrl.navigateForward('politicas');
  }
  gotoaviso() {
    this.navCtrl.navigateForward('avisolegal');
  }
}
