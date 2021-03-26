import { MenuController,NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-tusreservas',
  templateUrl: './tusreservas.page.html',
  styleUrls: ['./tusreservas.page.scss'],
})
export class TusreservasPage implements OnInit {
  spinner = false;
  reserva:[]
  constructor(
   private menu: MenuController,
   private navCtrl: NavController,
   private service: ApiService,
   private router: Router,
   private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.obtenerreserva();
  }

  async obtenerreserva(){
    this.spinner = true;
    this.service.reservaGet(this.route.snapshot.paramMap.get('shoppingCart'))
      .subscribe(res => {
        this.spinner = false
        console.log('reserva',res);
        this.reserva = res;
      }, err => {
        this.spinner = false
        console.log(err);
      });
  }

  openMenu(){
    this.menu.open('menu');
  }

  gotopoliticas() {
    this.navCtrl.navigateForward('politicas');
  }
  
}
