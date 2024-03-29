import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'cars',
    loadChildren: () => import('./cars/cars.module').then( m => m.CarsPageModule)
  },
  {
    path: 'yates',
    loadChildren: () => import('./yates/yates.module').then( m => m.YatesPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'rentarcars',
    loadChildren: () => import('./rentarcars/rentarcars.module').then( m => m.RentarcarsPageModule)
  },
  {
    path: 'rentarcars/:id',
    loadChildren: () => import('./rentarcars/rentarcars.module').then( m => m.RentarcarsPageModule)
  },
  {
    path: 'detallescars/:code',
    loadChildren: () => import('./detallescars/detallescars.module').then( m => m.DetallescarsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'cambiarclave',
    loadChildren: () => import('./cambiarclave/cambiarclave.module').then( m => m.CambiarclavePageModule)
  },
  {
    path: 'reserva/:id',
    loadChildren: () => import('./reserva/reserva.module').then( m => m.ReservaPageModule)
  },
  {
    path: 'rentaryates',
    loadChildren: () => import('./rentaryates/rentaryates.module').then( m => m.RentaryatesPageModule)
  },
  {
    path: 'rentaryates/:id',
    loadChildren: () => import('./rentaryates/rentaryates.module').then( m => m.RentaryatesPageModule)
  },
  {
    path: 'detallesyates/:code',
    loadChildren: () => import('./detallesyates/detallesyates.module').then( m => m.DetallesyatesPageModule)
  },
  {
    path: 'reservayates/:id',
    loadChildren: () => import('./reservayates/reservayates.module').then( m => m.ReservayatesPageModule)
  },
  {
    path: 'politicas',
    loadChildren: () => import('./politicas/politicas.module').then( m => m.PoliticasPageModule)
  },
  {
    path: 'tusreservas',
    loadChildren: () => import('./tusreservas/tusreservas.module').then( m => m.TusreservasPageModule)
  },
  {
    path: 'resumen/:shoppingCart',
    loadChildren: () => import('./resumen/resumen.module').then( m => m.ResumenPageModule)
  },
  {
    path: 'resumenyates/:shoppingYateGet',
    loadChildren: () => import('./resumenyates/resumenyates.module').then( m => m.ResumenyatesPageModule)
  },
  
  {
    path: 'avisolegal',
    loadChildren: () => import('./avisolegal/avisolegal.module').then( m => m.AvisolegalPageModule) 
  },
   
  {
    path: 'pago/:id/:payment/:paymentmethodid',
    loadChildren: () => import('./pago/pago.module').then( m => m.PagoPageModule)
  },
  {
    path: 'pagoyate/:id/:payment/:paymentmethodid',
    loadChildren: () => import('./pagoyate/pagoyate.module').then( m => m.PagoyatePageModule)
  },
  {
    path: 'detallescars/:code/:edit',
    loadChildren: () => import('./detallescars/detallescars.module').then( m => m.DetallescarsPageModule)
  },
  {
    path: 'detallesyates/:code/:edit',
    loadChildren: () => import('./detallesyates/detallesyates.module').then( m => m.DetallesyatesPageModule)
  },
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
