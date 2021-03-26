import { MenuController,NavController } from '@ionic/angular';
import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  // @ViewChild('myFormPost') form: ElementRef;
   @ViewChild('submitButton', {static:true}) public buttonsiyo: ElementRef;
  // @ViewChild('submitButton') submitButton: ElementRef;
  // @ViewChild('myFormPost', { read: NgForm }) form: any;
  url = environment.apiUrlCars+'/reserva/pagar'
  spinner = false;
  idCheckout
  paymentcheckout
  Paymentmethodcheckout
  reserva:[]
  constructor(
   private menu: MenuController,
   private navCtrl: NavController,
   private service: ApiService,
   private router: Router,
   private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.spinner = true;
    this.idCheckout=this.route.snapshot.paramMap.get('id')
    this.paymentcheckout=this.route.snapshot.paramMap.get('payment')
    this.Paymentmethodcheckout=this.route.snapshot.paramMap.get('paymentmethodid')

    // document.forms['myFormPost'].submit();
    //  this.form.nativeElement.submit();
    //  console.log('se ejecuto esa mierda');

    this.buttonsiyo.nativeElement.click();
  }



 

  openMenu(){
    this.menu.open('menu');
  }

  gotopoliticas() {
    this.navCtrl.navigateForward('politicas');
  }

}
