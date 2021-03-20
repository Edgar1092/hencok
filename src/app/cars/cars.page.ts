import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalNotificationActionType } from '@capacitor/core';
import { NavParams,LoadingController,NavController, AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {
  cars:[];
  cars2:[];
  entregaSelecionada: any;
  devolucionSeleccionada: any;
  spinner = false;


  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private service: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.obtenerentrega();
    
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

  obtenerentrega(){
  this.service.carsentrega()
      .subscribe(res => {
        console.log(res);
        this.cars = res;
      }, err => {
       
        console.log(err);
      });
  }

  obtenerdevolucion(value){
    this.entregaSelecionada = value
    let params = {pickup_place:this.entregaSelecionada};
    this.service.carsdevolucion(params).subscribe(
      (response: any) => {
        console.log("res",response);
          this.cars2 = response; 
        console.log("cars2",this.cars2);
      },
      (error) => {
       
        console.log('error')
      });
  }


  }
