import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalNotificationActionType } from '@capacitor/core';
import { NavParams,LoadingController,NavController, AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import * as Moment from 'moment';



@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {
  cars:[];
  cars2:[];
  horas:any;
  fechaMinEn:any;
  fechaMaxEn:any;
  fechaMinDe:any;
  fechaMaxDe: any;
  horaMin:any;
  horaMax:any;
  fechaD: any;
  fechaH: any;
  entregaSelecionada: any;
  devolucionSeleccionada: any;
  fechaSeleccionada: any;
  
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
    this.entregaSelecionada = value;
    let params = {pickup_place:this.entregaSelecionada};
    this.service.carsdevolucion(params).subscribe(
      (response: any) => {
        console.log("res",response);
          this.cars2 = response; 
        // console.log("cars2",this.cars2);
        this.fechaEntrega();
      },
      (error) => {
       
        console.log('error')
      });  
  }

  fechaEntrega(){
  this.fechaD = Moment().startOf('month').format();
  this.fechaH = Moment().endOf('month').format();
    let params = {from:this.fechaD, to:this.fechaH, place:this.entregaSelecionada};
    this.service.carsdateentrega(params).subscribe(
      (response: any) => {
        console.log("res",response);
          this.fechaD = response;
          this.fechaH = response;
          this.fechaMinEn = this.fechaD[0];
          this.fechaMaxEn = this.fechaH[this.fechaH.length-1];
        console.log("FECHA Minimo entrega",this.fechaMinEn);
        console.log("FECHA Maximo entrega",this.fechaMaxEn);
        console.log("ENTREGA SELECCIONADA",this.entregaSelecionada);
      },
      (error) => {
        console.log('error')
      });       
  }

  fechaDevolucion(value){
      this.fechaSeleccionada = value;
      let params = {from:this.fechaSeleccionada, to:this.fechaMaxEn, place:this.entregaSelecionada};
      this.service.carsdateentrega(params).subscribe(
        (response: any) => {
        console.log("res",response);
        this.fechaMinDe = response;
        this.fechaMaxDe = response;
        this.fechaMinDe = this.fechaMinDe[0];
        this.fechaMaxDe = this.fechaMaxDe[this.fechaMaxDe.length-1];
     
        //  console.log("ENTREGA SELECCIONADA devolucion",this.entregaSelecionada);
         console.log("FECHA MINIMA EN DEVOLUCION",this.fechaMinDe);
         console.log("FECHA MAXIMA EN DEVOLUCION",this.fechaMaxDe);
         console.log("FECHA SELECCIONADA MOSTRADA DEVOLUCION",this.fechaSeleccionada);

         this.horaEntrega();

        },
        (error) => {
          console.log('error')
        }); 
    }

  horaEntrega(){
    let params = {date:this.fechaSeleccionada , place:this.entregaSelecionada};
    this.service.carsHoraEntrega(params).subscribe(
      (response: any) => {
        console.log("res",response);
        this.horas= response;
        this.horaMin = this.horas[0];
        this.horaMax = this.horas[this.horas.length-1]
        // console.log("fechaSeleccionada",this.fechaSeleccionada);
        console.log("HORAAS", this.horas );
        console.log("hora Minima", this.horaMin);
        console.log("hora Max", this.horaMax);
      },
      (error) => {
       
        console.log('error')
      });
  }

  }
