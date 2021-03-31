import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavParams, LoadingController, NavController, AlertController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import * as Moment from 'moment';

@Component({
  selector: 'app-detallesyates',
  templateUrl: './detallesyates.page.html',
  styleUrls: ['./detallesyates.page.scss'],
})
export class DetallesyatesPage implements OnInit {
  yates;
  yates2:[];
  yates3:[];
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
  horaEntreg
  horaDev
  spinnerForm = false;
  free_access_id='';
  idYate

  constructor(
    private service: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.obteneryate();
        
    let fechaInicio = Moment().format('YYYY-MM-DD');
 
    this.fechas(fechaInicio);

    if(this.route.snapshot.paramMap.get('edit')){
      let d = localStorage.getItem("edit_reserva_yates");
      let dd =  JSON.parse(d)
          this.date_from = dd.date_from
          this.date_to = dd.date_to
          this.fechas2()

    }
  }

  async obteneryate(){
    this.spinner = true;
    this.service.yatesdetail(this.route.snapshot.paramMap.get('code'))
      .subscribe(res => {
        this.spinner = false
        console.log(res);
        this.yates = res;
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
  gotoaviso() {
    this.navCtrl.navigateForward('avisolegal');
  }

  // obtenerentrega(){
  //   this.service.yatesEntrega()
  //       .subscribe(res => {
  //         console.log(res);
  //         this.yates2 = res;
  //       }, err => {
         
  //         console.log(err);
  //       });
  //   }

  //   obtenerdevolucion(value){
  //     console.log('ver value',value)
  //     this.entregaSelecionada = value;
  //     let params = {pickup_place:this.entregaSelecionada};
  //     this.service.yatesDevolucion(params).subscribe(
  //       (response: any) => {
  //         console.log("res",response);
  //           this.yates3 = response; 
  //          console.log("yates3",this.yates3);
  //         // this.fechaEntrega();
  //       },
  //       (error) => {
         
  //         console.log('error')
  //       });  
  //   }

    
  fechas(fechaInicio){
    this.fechaD = fechaInicio;
    this.fechaH = Moment(this.fechaD).add(2, 'months').format('YYYY-MM-DD');
    let arregloFechas=[];
    let arregloFinal=[];
    let contador=0;
    console.log('fecha inicial',this.fechaD,this.fechaH)
    this.idYate=this.route.snapshot.paramMap.get('code')
      let params = {from:this.fechaD, to:this.fechaH};
      this.service.yatesOcupacion(this.idYate,params).subscribe(
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

    fechas2(){
      if(this.fechaMinEn!=''){
        this.fechas(Moment(this.fechaMinEn).format('YYYY-MM-DD'))
      }
    }

    // obtenerHoras(){
    //   if(this.fecha1!='' && this.pickup_place!=''){
    //     let params = {date:this.fecha1,action:'deliveries',place:this.pickup_place};
    //     this.service.yatesHoras(params).subscribe(
    //       (response: any) => {
    //         console.log('hora de entrega1 ',response);
    //         this.horaMinEntrega=response[0]
    //         this.horaMaxEntrega=response[response.length-1]

    //         let params2 = {date:this.fecha2,action:'collections',place:this.return_place};
    //         this.service.yatesHoras(params2).subscribe(
    //           (response: any) => {
    //             console.log('hora de entrega2 ',response);
    //             this.horaMinDevolucion=response[0]
    //             this.horaMaxDevolucion=response[response.length-1]
    //           });
    //       });
    //   }
    // }

    reserva(){
     
      if(this.date_from! && this.date_to!){
      this.spinnerForm = true
       let data = {
       "date_from": Moment(this.date_from).format("DD/MM/YYYY"),
       "date_to": Moment(this.date_to).format("DD/MM/YYYY"),
     }
     let params = {include_products:true,limit:this.limit, offset:0}
     this.service.shoppingYate(data, params).subscribe((response)=>{
       
       console.log(response)
       let shopping_cart = response.shopping_cart
       // localStorage.setItem("free_access_id", shopping_cart.free_access_id)
      this.free_access_id=shopping_cart.free_access_id 
      this.addProduct(this.idYate)
      this.spinnerForm =false
     },(error)=>{
       this.spinnerForm =false
       console.log(error)
     })
     
     console.log(data)
     }else{
       this.service.presentToast("Datos incompletos !");
     }
    }

    addProduct(product){
      if(this.free_access_id != ""){
        let data = { "product": product }
        this.service.setProductYate(this.free_access_id, data).subscribe((response)=>{
          console.log(response)
          this.router.navigate(['/reservayates/',  this.free_access_id ]);
        },(error)=>{
          this.service.presentToast("Error Inesperado, Contacte con soporte !");
          console.log(error)
        })
      }else{
        this.service.presentToast("Error Inesperado, Carrito de compras no disponible !");
      }
    }

}
