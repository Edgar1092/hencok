import { NavController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {
  free_access_id = ''
  spinner=false
  detail
  terminos = false
  tipoPago
  nombre=''
  apellidos=''
  email=''
  confirmEmail=''
  telefono=''
  telefonoAlternativo=''
  comentarios=''


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

  obetenerDetalleSC(){
    this.spinner = true;
    // this.offset=0
    let params = {include_extras: true,include_coverage: true};
    this.service.shoppingCartGet(this.free_access_id, params).subscribe(
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
      let data = {
        "customer_name": this.nombre,
        "customer_surname": this.apellidos,
        "customer_email": this.email,
        "customer_phone_number": this.telefono,
        "payment": "none"
      }
      this.service.createCheckout(this.free_access_id, data).subscribe(
        (response: any) => {
          this.spinner = false
          console.log("res",response.free_access_id);
          if(response){
            if(this.tipoPago=='solicitud_reserva'){
        
                this.router.navigate(['/resumen/',  response.free_access_id ]);
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
