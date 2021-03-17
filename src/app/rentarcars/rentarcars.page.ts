import { Component, OnInit, ViewChild  } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavParams, LoadingController, NavController, AlertController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-rentarcars',
  templateUrl: './rentarcars.page.html',
  styleUrls: ['./rentarcars.page.scss'],
})
export class RentarcarsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  cars=[];
  spinner = false
  offset = 0
  limit = 10
  total = 0
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
    this.spinner = true;
    this.offset=0
    let params = {limit:this.limit, offset:0};
    this.service.cars(params).subscribe(
      (response: any) => {
        this.spinner = false
        console.log(response);
        this.cars = response.data; 
        this.total = response.total
      },
      (error) => {
        this.spinner = false
        console.log('error')
      });
  }

  back(){
    this.navCtrl.back();
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.offset=0
    let params = {limit:this.limit, offset:0};
    this.service.cars(params).subscribe(
      (response: any) => {
        event.target.complete();
        console.log(response);
        this.cars = response.data;
        this.total = response.total 
      },
      (error) => {
        event.target.complete();
        console.log('error')
      });
  }

  doInfinite(event){
    if(this.cars.length < this.total){
      this.offset+=10;
      let params = {limit:this.limit, offset:this.offset};
      setTimeout(() => {
        this.service.cars(params).subscribe(
          (response: any) => {
            let d = JSON.parse(JSON.stringify(response.data)) 
            console.log(d);
            d.forEach((element,index) => {
              this.cars.push(element)
            });
            event.target.complete();
          },
          (error) => {
            event.target.complete();
            console.log('error')
          });
      }, 1000);
    }else{
      event.target.complete();
    }
  }

  openMenu(){
    this.menu.open('menu');
  }

    
}

