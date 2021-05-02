import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalNotificationActionType } from '@capacitor/core';
import { NavParams,LoadingController,NavController, AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import * as Moment from 'moment';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {
  cars:any[] = [];
  cars2:any[] = [];
  cars3:any[] = [];
  horas:any;
  fechaMinEn:any;
  fechaMaxEn:any;
  fechaMinDe:any;
  fechaMaxDe: any;
  horaMinEn:any;
  horaMaxEn:any;
  horaMinDe: any;
  horaMaxDe: any
  fechaD: any;
  fechaH: any;
  entregaSelecionada: any;
  devolucionSeleccionada: any;
  fechaSeleccionada: any;
  horaSeleccionada: any;
  
  /** formulario */
  pickup_place = ''
  date_from = ''
  time_from = ''
  return_place = ''
  date_to = ''
  time_to = ''

  spinner = false;
  spinnerForm = false;

  offset = 0
  limit = 3
  total = 0

  usuario


  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private service: ApiService,
    private route: ActivatedRoute,
    private router: Router,
   
  ) { }

  ngOnInit() {
    this.obtenerentrega();
    let fechaInicio = Moment().format('YYYY-MM-DD');
 
    this.fechaEntrega(fechaInicio);
    this.obetenerCarros();
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

  obtenerentrega(){
  this.service.carsentrega()
      .subscribe(res => {
        console.log(res);
        this.cars = res;
      }, err => {
       
        console.log(err);
      });
  }

  obtenerdevolucion(){
    this.entregaSelecionada = this.pickup_place;
    let params = {pickup_place:this.entregaSelecionada};
    this.service.carsdevolucion(params).subscribe(
      (response: any) => {
        console.log("res",response);
          this.cars2 = response; 
        // console.log("cars2",this.cars2);
        // this.fechaEntrega();
      },
      (error) => {
       
        console.log('error')
      });  
  }

  fechaEntrega(fechaInicio){
  // this.fechaD = Moment().startOf('month').format("YYYY-MM-DD");
  // this.fechaH = Moment().endOf('month').format("YYYY-MM-DD");
  this.fechaD = fechaInicio;
  this.fechaH = Moment(this.fechaD).add(2, 'months').format('YYYY-MM-DD');
    let params = {from:this.fechaD, to:this.fechaH, place:this.entregaSelecionada};
    this.service.carsdateentrega(params).subscribe(
      (response: any) => {
        console.log("res",response);
          this.fechaD = response;
          this.fechaH = response;
          this.fechaMinEn = this.fechaD[0];
          this.fechaMaxEn = this.fechaH[this.fechaH.length-1];
        // console.log("FECHA Minimo entrega",this.fechaMinEn);
        // console.log("FECHA Maximo entrega",this.fechaMaxEn);
        // console.log("ENTREGA SELECCIONADA",this.entregaSelecionada);
      },
      (error) => {
        console.log('error')
      });       
  }

  fechaDevolucion(){
    this.fechaSeleccionada = Moment().startOf('month').format("YYYY-MM-DD");
    this.fechaMaxDe =Moment(this.fechaSeleccionada).add(2, 'months').format('YYYY-MM-DD');
      this.fechaSeleccionada = Moment(this.date_from).format("YYYY-MM-DD");
      let params = {from:this.fechaSeleccionada, to:this.fechaMaxDe, place:this.entregaSelecionada};
      this.service.carsdateentrega(params).subscribe(
        (response: any) => {
        console.log("res",response);
        this.fechaMinDe = response;
        this.fechaMaxDe = response;
        console.log(this.fechaMinDe[0], this.fechaSeleccionada)
        if(this.fechaMinDe[0] == this.fechaSeleccionada){
          this.fechaMinDe = this.fechaMinDe[1];
        }else{
          this.fechaMinDe = this.fechaMinDe[0];
        }
        this.fechaMaxDe = this.fechaMaxDe[this.fechaMaxDe.length-1];


        //  console.log("ENTREGA SELECCIONADA devolucion",this.entregaSelecionada);
         console.log("FECHA MINIMA EN DEVOLUCION",this.fechaMinDe);
         console.log("FECHA MAXIMA EN DEVOLUCION",this.fechaMaxDe);
         console.log("FECHA SELECCIONADA MOSTRADA ENTREGA",this.fechaSeleccionada);
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
        this.horaMinEn = this.horas[0];
        this.horaMaxEn = this.horas[this.horas.length-1]
        // console.log("fechaSeleccionada",this.fechaSeleccionada);
        console.log("HORAAS", this.horas );
        console.log("hora Minima", this.horaMinEn);
        console.log("hora Max", this.horaMaxEn);
      },
      (error) => {
       
        console.log('error')
      });
  }

  horaDevolucion(){
    this.fechaSeleccionada = this.date_to;
    let params = {date:this.fechaSeleccionada , place:this.entregaSelecionada};
    this.service.carsHoraEntrega(params).subscribe(
      (response: any) => {
        console.log("res",response);
        this.horas= response;
        this.horaMinDe = this.horas[0];
        this.horaMaxDe = this.horas[this.horas.length-1]
        console.log("fechaSeleccionada devolucion",this.date_to);
        console.log("HORAAS   DEVOLUCION", this.horas );
        console.log("hora Minima DE", this.horaMinDe);
        console.log("hora Max DE", this.horaMaxDe);
      },
      (error) => {
       
        console.log('error')
      });
  }



 search(){
   if(this.pickup_place !='' && this.return_place !='' && this.date_from !='' && this.time_from !=''  && this.date_to !='' && this.time_to !=''){
   this.spinnerForm = true
    let data = {
    "date_from": Moment(this.date_from).format("DD/MM/YYYY"),
    "time_from": Moment(this.time_from).format("HH:mm"),
    "date_to": Moment(this.date_to).format("DD/MM/YYYY"),
    "time_to": Moment(this.time_to).format("HH:mm"),
    "pickup_place": this.pickup_place,
    "return_place": this.return_place,
    "limit":10,
    "offset":0
  }
  let params = {include_products:true,limit:10, offset:0}

  this.service.shoppingCart(data, params).subscribe((response)=>{
    this.spinnerForm =false
    console.log(response)
    let shopping_cart = response.shopping_cart
    // localStorage.setItem("free_access_id", shopping_cart.free_access_id)
    this.router.navigate(['/rentarcars/',  shopping_cart.free_access_id ]);
  },(error)=>{
    this.spinnerForm =false
    console.log(error)
  })
  
  console.log(data)
  }else{
    this.service.presentToast("Datos incompletos !");
  }
 }

 
 obetenerCarros(){
  this.spinner = true;
  this.offset=0
  let params = {limit:this.limit, offset:0};
  this.service.cars(params).subscribe(
    (response: any) => {
      this.spinner = false
      console.log("res",response);
      if(response && response.data){
        this.cars3 = response.data; 
        this.total = response.total
      }
      console.log("cars3",this.cars3);
    },
    (error) => {
      this.spinner = false
      console.log('error')
    });
}
 
  


  }
