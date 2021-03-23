
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavParams, LoadingController, NavController, AlertController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import * as Moment from 'moment';




@Component({
  selector: 'app-detallescars',
  templateUrl: './detallescars.page.html',
  styleUrls: ['./detallescars.page.scss'],
})
export class DetallescarsPage implements OnInit {

cars;
cars2:[];
cars3:[];
spinner = false;
offset = 0
limit = 10
total = 0
fechaMinEn:any;
fechaMaxEn:any;
fechaMinDe:any;
fechaMaxDe: any;
horaMinEntrega:any;
horaMaxEntrega:any;
horaMinDevolucion:any;
horaMaxDevolucion:any;
fechaD: any;
fechaH: any;
entregaSelecionada: any;
devolucionSeleccionada: any;
fechaSeleccionada: any;
pickup_place
date_from
time_from
return_place='';
date_to
time_to
fecha1
fecha2

  constructor(
    private service: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private menu: MenuController
    ) { }

  ngOnInit() {
    this.obtenercarro();
     this.obtenerentrega();
    let fechaInicio = Moment().format('YYYY-MM-DD');
 
    this.fechas(fechaInicio);

  }
  
  async obtenercarro(){
    this.spinner = true;
    this.service.carsdetail(this.route.snapshot.paramMap.get('code'))
      .subscribe(res => {
        this.spinner = false
        console.log('carrote',res);
        this.cars = res;
      }, err => {
        this.spinner = false
        console.log(err);
      });
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    });
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
          this.cars2 = res;
        }, err => {
         
          console.log(err);
        });
    }
  
    obtenerdevolucion(value){
      console.log('ver value',value)
      this.entregaSelecionada = value;
      let params = {pickup_place:this.entregaSelecionada};
      this.service.carsdevolucion(params).subscribe(
        (response: any) => {
          console.log("res",response);
            this.cars3 = response; 
           console.log("cars2",this.cars3);
          // this.fechaEntrega();
        },
        (error) => {
         
          console.log('error')
        });  
    }

  fechas(fechaInicio){
    this.fechaD = fechaInicio;
    this.fechaH = Moment(this.fechaD).add(2, 'months').format('YYYY-MM-DD');
    let arregloFechas=[];
    let arregloFinal=[];
    let contador=0;

    console.log('fecha inicial',fechaInicio)
    console.log('fecha final',this.fechaH)
    let idCarro=this.route.snapshot.paramMap.get('code')
      let params = {from:this.fechaD, to:this.fechaH};
      this.service.carsocupacionentrega(idCarro,params).subscribe(
        (response: any) => {
          console.log("res",JSON.parse(JSON.stringify(response)).occupation);
          arregloFechas=response.occupation;

          Object.keys(arregloFechas).forEach((element,index) => {
         

           
            if(arregloFechas[element].selectable_day!=false){
              arregloFinal.push(element)
                if(contador==0){
                  this.fechaMinEn=element
               }

   
              
              contador++;
            }
            
          })
          console.log('arreglo final', arregloFinal)
          console.log('fecha inicial',this.fechaMinEn)
          
console.log('posicion final ',Moment(arregloFinal[arregloFinal.length-1]).endOf('month').format('YYYY-MM-DD'))
          this.fechaMinDe=Moment(this.fechaMinEn).add(1, 'days').format('YYYY-MM-DD');
          console.log('contador',contador);
            // this.fechaD = response;
            // this.fechaH = response;
            // this.fechaMinEn = this.fechaD[0];
            this.fechaMaxEn = Moment(arregloFinal[arregloFinal.length-1]).endOf('month').format('YYYY-MM-DD');
          // console.log("FECHA Minimo entrega",this.fechaMinEn);
          // console.log("FECHA Maximo entrega",this.fechaMaxEn);
        },
        (error) => {
          console.log('error')
        });       
    }

    fechas2(value){
      if(value!=''){
        this.fechas(Moment(value).format('YYYY-MM-DD'))
      }

    }

    obtenerHoras(){
      if(this.fecha1!='' && this.pickup_place!=''){
        let params = {date:this.fecha1,action:'deliveries',place:this.pickup_place};
        this.service.carsHoraEntrega(params).subscribe(
          (response: any) => {
            console.log('hora de entrega1 ',response);
            this.horaMinEntrega=response[0]
            this.horaMaxEntrega=response[response.length-1]
          });
      }
 
      
//         horaMinEntrega:any;
// horaMaxEntrega:any;
// horaMinDevolucion:any;
// horaMaxDevolucion:any;
    }

}
