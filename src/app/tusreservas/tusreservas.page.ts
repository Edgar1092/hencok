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
  token
 
  spinnerForm = true;
  datosCars:[]
  datosBoats:[]
  constructor(
   private menu: MenuController,
   private navCtrl: NavController,
   private service: ApiService,
   private router: Router,
   private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.reservasCars();
    this.reservasBoats();
    this.spinnerForm = true;
  }

  reservasCars(){
    this.token = localStorage.getItem('tokenCars')
    this.spinnerForm = true
    this.service.reservationCars(this.token).subscribe(
      (response: any) => {
        this.datosCars = response.data
        console.log("resCarros",this.datosCars);
        this.spinnerForm = false
      },
      (error) => {
        this.spinnerForm = false
        console.log('error')
      });
}

reservasBoats(){
  this.token = localStorage.getItem('tokenBoats')
  this.spinnerForm = true
  this.service.reservationBoats(this.token).subscribe(
    (response: any) => {
      this.datosBoats = response.data
      console.log("resBarcos",this.datosBoats);
      this.spinnerForm = false
    },
    (error) => {
       this.spinnerForm = false
      console.log('error')
    });
}

 

  openMenu(){
    this.menu.open('menu');
  }

  gotopoliticas() {
    this.navCtrl.navigateForward('politicas');
  }
  
}

