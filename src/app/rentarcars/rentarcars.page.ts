import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavParams, LoadingController, NavController, AlertController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-rentarcars',
  templateUrl: './rentarcars.page.html',
  styleUrls: ['./rentarcars.page.scss'],
})
export class RentarcarsPage implements OnInit {

  cars=[];

  constructor(
    private navCtrl: NavController, 
    private service: ApiService,
    private router: Router,
    private menu:MenuController
    ) { }

  ngOnInit() {
    this.obetenerCarros();
  }

  obetenerCarros(){
 this.service.cars().subscribe(
  (response: any) => {
    console.log(response);
    this.cars = response.data; 
  },
  () => console.log('error')
      );
  }

  back(){
    this.navCtrl.back();
  }

  openMenu(){
    this.menu.open('menu');
  }
  // prueba(code){
  //   this.service.carsdetail(code).subscribe(
  //     (data) =>{
  //       this.router.navigate(['/detallescars/code']);
  //        console.log(data);
  //     },
  //     (error)=>{console.log(error);}
      
      
  //     );
  // }
    
}

