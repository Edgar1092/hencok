import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-cambiarclave',
  templateUrl: './cambiarclave.page.html',
  styleUrls: ['./cambiarclave.page.scss'],
})
export class CambiarclavePage implements OnInit {

  username = ''
  valor = false
  spinnerForm = false;
  isSubmitted = false;
  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private service: ApiService,
  ) { }

  ngOnInit() {
  }
  openMenu() {
    this.menu.open('menu');
  }
  gotopoliticas() {
    this.navCtrl.navigateForward('politicas');
  }
  gotoaviso() {
    this.navCtrl.navigateForward('avisolegal');
  }



  enviar() {

    this.valor = false
    if (this.username != '') {
      let data = {
        "username": this.username
      }
      this.isSubmitted = true;
      this.spinnerForm =true
      this.service.password(data).subscribe((response) => {
        console.log(response)
        this.spinnerForm =false
        this.valor = response.body
        console.log('valor=>', this.valor)

        if (this.valor) {
          this.username = ''
          this.service.presentToast("Se ha enviado un mensaje a su dirección de correo electrónico para restablecer la contraseña!");
        } else {
          this.service.presentToast("Usuario o correo electrónico no registrados")
        }

      }, (error) => {
        this.spinnerForm =false
        console.log(error)
      })
    }
    
  }

}
