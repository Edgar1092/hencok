import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private menu: MenuController,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
  }
  openMenu(){
    this.menu.open('menu');
  }
  gotosignin() {
    this.navCtrl.navigateForward('signin');
  }
 
}
