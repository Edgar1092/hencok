import { MenuController,NavController } from '@ionic/angular';
import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { NgForm } from '@angular/forms';
import { Capacitor, Plugins } from '@capacitor/core'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-pagoyate',
  templateUrl: './pagoyate.page.html',
  styleUrls: ['./pagoyate.page.scss'],
})
export class PagoyatePage implements OnInit {

 // @ViewChild('myFormPost') form: ElementRef;
 @ViewChild('submitButton', {static:false}) public buttonsiyo: ElementRef;
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
  private iab: InAppBrowser
 ) { }

 ngOnInit() {
   this.spinner = true;
   this.idCheckout=this.route.snapshot.paramMap.get('id')
   this.paymentcheckout=this.route.snapshot.paramMap.get('payment')
   this.Paymentmethodcheckout=this.route.snapshot.paramMap.get('paymentmethodid')

   // document.forms['myFormPost'].submit();
   //  this.form.nativeElement.submit();
   //  console.log('se ejecuto esa mierda');

   // this.buttonsiyo.nativeElement.click();
 }

 ionViewDidEnter(){
   // this.buttonsiyo.nativeElement.click();
   let formHtml:string = '';
   formHtml+='<input type="hidden" value="'+this.idCheckout+'" id="id" name="id"/>';
   formHtml+='<input type="hidden" value="'+this.paymentcheckout+'" id="payment" name="payment"/>';
   formHtml+='<input type="hidden" value="'+this.Paymentmethodcheckout+'" id="payment_method_id" name="payment_method_id"/>';

   let url = this.url
   let payScript = "var form = document.getElementById('ts-app-payment-form-redirect'); ";
   payScript += "form.innerHTML = '" + formHtml + "';";
   payScript += "form.action = '" + url + "';";
   payScript += "form.method = 'POST';" ;
   payScript += "form.submit();" ;
   if (Capacitor.isNative) {
     let browser = this.iab.create('file:///android_asset/redirect.html','_blank', 'location=no');
     browser.show();
     browser.on("loadstart")
     .subscribe(
         event => {
           console.log("loadstop -->",event);
           if(event.url.indexOf("some error url") > -1){
           browser.close();
           this.router.navigate(['/']);
           }

           if(event.url.indexOf("hencok.com/resumen") > -1){
             browser.close();
             this.router.navigate(['/resumen',this.idCheckout]);
             }
         },
         err => {
           console.log("InAppBrowser loadstart Event Error: " + err);
     });
     //on url load stop
     browser.on("loadstop")
     .subscribe(
         event => {
             //here we call executeScript method of inappbrowser and pass object 
             //with attribute code and value script string which will be executed in the inappbrowser
             browser.executeScript({
                 code:payScript
             });
         console.log("loadstart -->",event);
         },
     err => {
         console.log("InAppBrowser loadstop Event Error: " + err);
     });
     //on closing the browser
     browser.on("exit")
     .subscribe(event => {
       console.log("exit -->",event);
     },
     err => {
     console.log("InAppBrowser loadstart Event Error: " + err);
     });
   }
 }
   // this.router.navigate(['/']);
 

 openBrowser(){

 }




 openMenu(){
   this.menu.open('menu');
 }

 gotopoliticas() {
   this.navCtrl.navigateForward('politicas');
 }


}
