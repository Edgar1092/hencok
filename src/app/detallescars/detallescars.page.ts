
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
horaEntreg
horaDev
spinnerForm = false;
free_access_id='';
idCarro
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
  gotoaviso() {
    this.navCtrl.navigateForward('avisolegal');
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
    console.log('fecha inicial',this.fechaD,this.fechaH)
    this.idCarro=this.route.snapshot.paramMap.get('code')
      let params = {from:this.fechaD, to:this.fechaH};
      this.service.carsocupacionentrega(this.idCarro,params).subscribe(
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

            let params2 = {date:this.fecha2,action:'collections',place:this.return_place};
            this.service.carsHoraEntrega(params2).subscribe(
              (response: any) => {
                console.log('hora de entrega2 ',response);
                this.horaMinDevolucion=response[0]
                this.horaMaxDevolucion=response[response.length-1]
              });
          });
      }
    }

    reserva(){
      if(this.pickup_place !='' && this.return_place !='' && this.fecha1 !='' && this.horaEntreg !=''  && this.fecha2 !='' && this.horaDev !=''){
      this.spinnerForm = true
       let data = {
       "date_from": Moment(this.fecha1).format("DD/MM/YYYY"),
       "time_from": Moment(this.horaEntreg).format("HH:mm"),
       "date_to": Moment(this.fecha2).format("DD/MM/YYYY"),
       "time_to": Moment(this.horaDev).format("HH:mm"),
       "pickup_place": this.pickup_place,
       "return_place": this.return_place
     }
     let params = {include_products:true}
   
     this.service.shoppingCart(data, params).subscribe((response)=>{
       
       console.log(response)
       let shopping_cart = response.shopping_cart
       // localStorage.setItem("free_access_id", shopping_cart.free_access_id)
      this.free_access_id=shopping_cart.free_access_id 
      this.addProduct(this.idCarro)
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
        this.service.setProduct(this.free_access_id, data).subscribe((response)=>{
          console.log(response)
          this.router.navigate(['/reserva/',  this.free_access_id ]);
        },(error)=>{
          this.service.presentToast("Error Inesperado, Contacte con soporte !");
          console.log(error)
        })
      }else{
        this.service.presentToast("Error Inesperado, Carrito de compras no disponible !");
      }
    }

}
