import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-resumenyates',
  templateUrl: './resumenyates.page.html',
  styleUrls: ['./resumenyates.page.scss'],
})
export class ResumenyatesPage implements OnInit {
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
    this.service.reservaGetYate(this.route.snapshot.paramMap.get('shoppingCart'))
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
  
  back() {
    this.router.navigate(['/']);
  }

}
