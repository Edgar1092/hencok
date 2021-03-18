
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavParams, LoadingController, NavController, AlertController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';




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

  constructor(
    private service: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private menu: MenuController
    ) { }

  ngOnInit() {
    this.getClassroom();

  }
  
  async getClassroom(){
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
}
