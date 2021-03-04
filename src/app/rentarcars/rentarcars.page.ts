import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavParams,LoadingController,NavController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-rentarcars',
  templateUrl: './rentarcars.page.html',
  styleUrls: ['./rentarcars.page.scss'],
})
export class RentarcarsPage implements OnInit {
  cars=[]
  constructor(private navCtrl: NavController, 
    private service: ApiService) { }

  ngOnInit() {
  }

}
