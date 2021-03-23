
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

cars: any={};
spinner = false;
offset = 0
limit = 10
total = 0
fechaMinEn:any;
fechaMaxEn:any;
fechaMinDe:any;
fechaMaxDe: any;
horaMin:any;
horaMax:any;
fechaD: any;
fechaH: any;

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
    let fechaInicio = Moment().format('YYYY-MM-DD');
 
    this.fechas(fechaInicio);

  }
  
  async obtenercarro(){
    // const loading = await this.loadingController.create({
    //   // content: 'Loading'
    // });
    // await loading.present();
    // await 
    this.spinner = true;
    this.service.carsdetail(this.route.snapshot.paramMap.get('code'))
      .subscribe(res => {
        this.spinner = false
        console.log(res);
        this.cars = res;
        // loading.dismiss();
      }, err => {
        this.spinner = false
        console.log(err);
        // loading.dismiss();
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

  fechas(fechaInicio){
    this.fechaD = fechaInicio;
    this.fechaH = Moment(this.fechaD).add(2, 'months').format('YYYY-MM-DD');
    let arregloFechas=[];
    let arregloFinal=[];
    let contador=0;

    console.log('fecha inicial',this.fechaD,this.fechaH)
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
      this.fechas(Moment(value).format('YYYY-MM-DD'))
    }
}
