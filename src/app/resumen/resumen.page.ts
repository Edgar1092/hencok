import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {
  spinner = false;
  detail:[]
  constructor(
    private menu: MenuController,
    private service: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.obtenerreserva();
  }

  async obtenerreserva(){
    this.spinner = true;
    this.service.reservaGet(this.route.snapshot.paramMap.get('shoppingCart'))
      .subscribe(res => {
        this.spinner = false
        console.log('reserva',res);
        this.detail = res;
      }, err => {
        this.spinner = false
        console.log(err);
      });
  }

  openMenu(){
    this.menu.open('menu');
  }
  

}
