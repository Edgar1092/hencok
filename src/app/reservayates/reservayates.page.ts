import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor, Plugins } from '@capacitor/core'
import { environment } from '../../environments/environment'


@Component({
  selector: 'app-reservayates',
  templateUrl: './reservayates.page.html',
  styleUrls: ['./reservayates.page.scss'],
})
export class ReservayatesPage implements OnInit {
  url = environment.apiUrlCars+'/reserva/pagar'
  free_access_id = ''
  spinner=false
  detail
  terminos = false
  tipoPago=''
  nombre=''
  apellidos=''
  email=''
  confirmEmail=''
  telefono=''
  telefonoAlternativo=''
  comentarios=''
  idCheckout
  Paymentmethodcheckout
  paymentcheckout

  constructor(
    private navCtrl: NavController, 
    private service: ApiService,
    private router: Router,
    private menu:MenuController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('id')){
      this.free_access_id=this.route.snapshot.paramMap.get('id');
      this.obetenerDetalleSC();
    }
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

  obetenerDetalleSC(){
    this.spinner = true;
    // this.offset=0
    let params = {include_extras: true,include_coverage: true};
    this.service.shoppingYateGet(this.free_access_id, params).subscribe(
      (response: any) => {
        this.spinner = false
        console.log("res",response);
        if(response){
          this.detail = response; 
          // this.total = response.total
        }
        console.log("detail",this.detail);
      },
      (error) => {
        this.spinner = false
        console.log('error')
      });
  }

  pagar(){

    if( this.nombre!=''&& this.apellidos!='' && this.email!='' && this.telefono!=''){
   
      if(this.email!=this.confirmEmail){
        this.service.presentToast('Email no coinciden')
        return;
      }
      let pay ="none"
      if(this.tipoPago=='solicitud_reserva'){
        pay ="none"
      }else if(this.tipoPago=='pagar_ahora'){
        pay=this.detail.sales_process.payment_methods.tpv_virtual
      }
      let data = {
        "customer_name": this.nombre,
        "customer_surname": this.apellidos,
        "customer_email": this.email,
        "customer_phone_number": this.telefono,
        "payment": pay
      }
      this.service.createCheckoutYate(this.free_access_id, data).subscribe(
        (response: any) => {
          this.spinner = false
          console.log("res",response.free_access_id);
          if(response){
            if(this.tipoPago=='solicitud_reserva'){
        
                this.router.navigate(['/resumen/',  response.free_access_id ]);
            }else if(this.tipoPago=='pagar_ahora') {
              let formData:FormData = new FormData();
              formData.append('id',response.free_access_id);
              formData.append('payment','deposit');
              formData.append('payment_method',response.payment_method_id);
              let payco='deposit'
              // let dataPago = {id:response.free_access_id,payment:'deposit',payment_method:response.payment_method_id}
              // this.service.reservaPagarYate(formData).subscribe((res)=>{
              //   console.log("reserva pagar",res)
              // },(error)=>{
              //   console.log(error)
              // })
              this.router.navigate(['/pagoyate/',  response.free_access_id,payco,this.Paymentmethodcheckout ]);
            }
          }
          // console.log("detail",this.detail);
        },
        (error) => {
          this.spinner = false
          console.log('error')
        });

     

    }else{
      this.service.presentToast('Todos los campos tienen que estar llenos')
    }

  }

}
