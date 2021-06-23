import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavParams, LoadingController, NavController, AlertController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-rentaryates',
  templateUrl: './rentaryates.page.html',
  styleUrls: ['./rentaryates.page.scss'],
})
export class RentaryatesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  yates = [];
  spinner = false
  offset = 0
  limit = 10
  total = 0
  free_access_id = ''

  buscar
  plazas
  toilets
  plaDormir
  camarotes
  patron
  tripulacion

  plazaBuscar=''
  banoBuscar=''
  dormirBuscar=''
  camaroteBuscar=''
  patronBuscar=''
  tripulacionBuscar=''


  constructor(
    private navCtrl: NavController,
    private service: ApiService,
    private router: Router,
    private menu: MenuController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.free_access_id = this.route.snapshot.paramMap.get('id');
      this.obetenerYatesSC()
    } else {
      this.obtenerYates();
    }
    this.search();
  }

  obtenerYates() {
    this.spinner = true;
    this.offset = 0
    let params = { limit: this.limit, offset: 0 };
    this.service.yates(params).subscribe(
      (response: any) => {
        this.spinner = false
        console.log(response);
        this.yates = response.data;
        this.total = response.total
        console.log('Total de Yates', this.total)
      },
      (error) => {
        this.spinner = false
        console.log('error')
      });
  }

  obetenerYatesSC() {
    this.spinner = true;
    this.offset = 0
    let params = { include_products: true, limit: this.limit, offset: 0 };
    this.service.shoppingYateGet(this.free_access_id, params).subscribe(
      (response: any) => {
        this.spinner = false
        console.log("res", response);
        if (response && response.products) {
          this.yates = response.products;
          this.total = response.total
        }
        console.log("cars", this.yates);
      },
      (error) => {
        this.spinner = false
        console.log('error')
      });
  }

  back() {
    this.navCtrl.back();
  }

  doRefresh(event) {
    if (this.free_access_id != '') {
      let params = { include_products: true, limit: this.limit, offset: 0 };
      this.service.shoppingYateGet(this.free_access_id, params).subscribe(
        (response: any) => {
          event.target.complete();

          console.log("res", response);
          if (response && response.products) {
            this.yates = response.products;
            this.total = response.total
          }
          console.log("yates", this.yates);
        },
        (error) => {
          event.target.complete();
          console.log('error')
        });
    } else {
      console.log('Begin async operation');
      this.offset = 0
      let params = { limit: this.limit, offset: 0 };
      this.service.yates(params).subscribe(
        (response: any) => {
          event.target.complete();
          console.log(response);
          this.yates = response.data;
          this.total = response.total
        },
        (error) => {
          event.target.complete();
          console.log('error')
        });
    }

  }

  doInfinite(event) {
    if(this.plazaBuscar=='' || this.banoBuscar=='' || this.dormirBuscar=='' || this.camaroteBuscar=='' || this.patronBuscar=='' || this.tripulacionBuscar==''){
        
  
    if (this.free_access_id == '') {

      if (this.yates.length < this.total) {
        this.offset += 10;
        let params = { limit: this.limit, offset: this.offset };
        setTimeout(() => {
          this.service.yates(params).subscribe(
            (response: any) => {
              let d = JSON.parse(JSON.stringify(response.data))
              console.log(d);
              d.forEach((element, index) => {
                this.yates.push(element)
              });
              event.target.complete();
            },
            (error) => {
              event.target.complete();
              console.log('error')
            });
        }, 1000);
      } else {
        event.target.complete();
      }
    } else {
      if (this.yates.length < this.total) {
        this.offset += 10;
        let params = { include_products: true, limit: this.limit, offset: this.offset };
        setTimeout(() => {
          this.service.shoppingYateGet(this.free_access_id, params).subscribe(
            (response: any) => {
              let d = JSON.parse(JSON.stringify(response.products))
              console.log(d);
              d.forEach((element, index) => {
                this.yates.push(element)
              });
              event.target.complete();
            },
            (error) => {
              event.target.complete();
              console.log('error')
            });
        }, 1000);
      } else {
        event.target.complete();
      }
    }
  }
  }

  openMenu() {
    this.menu.open('menu');
  }
  gotopoliticas() {
    this.navCtrl.navigateForward('politicas');
  }
  gotoaviso() {
    this.navCtrl.navigateForward('avisolegal');
  }

  addProduct(product) {
    if (this.free_access_id != "") {
      let data = { "product": product }
      this.service.setProductYate(this.free_access_id, data).subscribe((response) => {
        console.log(response)
        this.router.navigate(['/reservayates/', this.free_access_id]);
      }, (error) => {
        this.service.presentToast("Error Inesperado, Contacte con soporte !");
        console.log(error)
      })
    } else {
      this.service.presentToast("Error Inesperado, Carrito de compras no disponible !");
    }
  }

  search() {

    this.spinner = true;
    this.offset = 0
    this.service.yatesSearch().subscribe(
      (response: any) => {
        this.spinner = false
        this.buscar = response;
        console.log("Buscador=>", this.buscar)
        let pla = []
        pla = this.buscar[1].values
        this.plazas = Object.values(pla)
        let ba = []
        ba = this.buscar[2].values
        this.toilets = Object.values(ba)
        console.log('toiles',this.toilets)
        let dor = []
        dor = this.buscar[3].values
        this.plaDormir = Object.values(dor)
        let ca = []
        ca = this.buscar[4].values
        this.camarotes = Object.values(ca)
        let pa = []
        pa = this.buscar[5].values
        this.patron = Object.values(pa)
        let tri = []
        tri = this.buscar[6].values
        this.tripulacion = Object.values(tri)
      },
      (error) => {
        this.spinner = false
        console.log(error)
      });

  }


  searchPage(){
    this.spinner = true;
      let key_characteristic_1=this.plazaBuscar

    let key_characteristic_2=this.banoBuscar
    let key_characteristic_3=this.dormirBuscar
    let key_characteristic_4=this.camaroteBuscar
    let key_characteristic_5=this.patronBuscar
    let key_characteristic_6=this.tripulacionBuscar

    let params={key_characteristic_1:key_characteristic_1,key_characteristic_2:key_characteristic_2,key_characteristic_3:key_characteristic_3,key_characteristic_4:key_characteristic_4,key_characteristic_5:key_characteristic_5,key_characteristic_6:key_characteristic_6}
    this.service.yates(params).subscribe(
      (response: any) => {
        this.spinner = false
        console.log("res", response);
        if (response && response.data) {
          this.yates = response.data;
          this.total = response.total
        }
        console.log("cars", this.yates);
      },
      (error) => {
        this.spinner = false
        console.log('error')
      });
  }

}
