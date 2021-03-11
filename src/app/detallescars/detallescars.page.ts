
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavParams,LoadingController,NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-detallescars',
  templateUrl: './detallescars.page.html',
  styleUrls: ['./detallescars.page.scss'],
})
export class DetallescarsPage implements OnInit {

carro: any={};

  constructor(
    private service: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController
    ) { }

  ngOnInit() {
    this.getClassroom();

  }
  
  async getClassroom() {
    const loading = await this.loadingController.create({
      // content: 'Loading'
    });
    await loading.present();
    await this.service.carsdetail(this.route.snapshot.paramMap.get('code'))
      .subscribe(res => {
        console.log(res);
        this.carro = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
