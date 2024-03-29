import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as Moment from 'moment';

@Component({
  selector: 'app-yates',
  templateUrl: './yates.page.html',
  styleUrls: ['./yates.page.scss'],
})
export class YatesPage implements OnInit {
  yates:any[] = [];
  yates2:any[] = [];
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

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private service: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
 
    let fechaInicio = Moment().format('YYYY-MM-DD');
 
    this.fechaEntrega(fechaInicio);
    this.obtenerYates();
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


    fechaEntrega(fechaInicio){
      // this.fechaD = Moment().startOf('month').format("YYYY-MM-DD");
      // this.fechaH = Moment().endOf('month').format("YYYY-MM-DD");
      this.fechaD = fechaInicio;
      this.fechaH = Moment(this.fechaD).add(2, 'months').format('YYYY-MM-DD');

        let params = {from:this.fechaD, to:this.fechaH, action:'deliveries'};
        this.service.yatesFechas(params).then(
          (response: any) => {
            console.log("res",response);
              this.fechaD = response;
              this.fechaH = response;
              this.fechaMinEn = this.fechaD[0];
              this.fechaMaxEn = this.fechaH[this.fechaH.length-1];
            console.log("FECHA Minimo entrega",this.fechaMinEn);
            console.log("FECHA Maximo entrega",this.fechaMaxEn);
          },
          (error) => {
            console.log('error')
          });       
      }

      fechaDevolucion(){
        this.fechaSeleccionada = Moment().startOf('month').format("YYYY-MM-DD");
        this.fechaMaxDe =Moment(this.fechaSeleccionada).add(2, 'months').format('YYYY-MM-DD');
          this.fechaSeleccionada = Moment(this.date_from).format("YYYY-MM-DD");
          let params = {from:this.fechaSeleccionada, to:this.fechaMaxDe, action:'collections'};
          this.service.yatesFechas(params).then(
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
             console.log("FECHA MINIMA EN DEVOLUCION",this.fechaMinDe);
             console.log("FECHA MAXIMA EN DEVOLUCION",this.fechaMaxDe);
             console.log("FECHA SELECCIONADA MOSTRADA ENTREGA",this.fechaSeleccionada);
           
            },
            (error) => {
              console.log('error')
            }); 
        }

    

  search(){
    
    if(this.date_from !='' && this.date_to !=''){
    this.spinnerForm = true
   let data = {
     
    "date_from": Moment(this.date_from).format("DD/MM/YYYY"),
    "date_to": Moment(this.date_to).format("DD/MM/YYYY"),
       }
    let params = {include_products:true,limit:10, offset:0}
                
   this.service.shoppingYate(data, params).then((response)=>{
     this.spinnerForm =false
     console.log(response)
        let shopping_cart = response.shopping_cart
      // localStorage.setItem("free_access_id", shopping_cart.free_access_id)
      this.router.navigate(['/rentaryates/',  shopping_cart.free_access_id ]);
       },(error)=>{
       this.spinnerForm =false
       console.log(error)
           })
                  
         console.log(data)
           }else{
         this.service.presentToast("Datos incompletos !");
             }
            }

            
  obtenerYates(){
  this.spinner = true;
  this.offset=0
  let params = {limit:this.limit, offset:0};
  this.service.yates(params).then(
    (response: any) => {
      this.spinner = false
      console.log("res",response);
      if(response && response.data){
        this.yates = response.data; 
        this.total = response.total
      }
      console.log("yates",this.yates);
    },
    (error) => {
      this.spinner = false
      console.log('error')
    });
}
 
}


