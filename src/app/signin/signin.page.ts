import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import { FormGroup, FormBuilder,FormControl, Validators } from "@angular/forms";



@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  spinner = false;
  spinnerForm = false;
  isSubmitted = false;

  FormularioLogin= new FormGroup({

    username : new FormControl(),
    email : new FormControl(),
    password : new FormControl(),
    name : new FormControl(),
    surname : new FormControl()

  });

  
  /* Formulario */
  // username = ''
  // email = ''
  // password = ''
  // name = ''
  // surname = ''
  
 

  constructor(
    private menu: MenuController,
    private service: ApiService,
    private navCtrl: NavController,
    public formBuilder: FormBuilder,
  ) { 

   
  }

  ngOnInit() {  

   this.Formulario();
  }

 

  Formulario(){
    this.FormularioLogin = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password : ['', [Validators.required, Validators.pattern('^(?=.*[-!#$%&/()?¡_])(?=.*[A-Z])(?=.*[a-z]).{8,}$')]],
      name : ['',Validators.required],
      surname : ['',Validators.required],
    })
  }
  
  get errorControl() {
    return this.FormularioLogin.controls;
  }

  openMenu(){
    this.menu.open('menu');
  }
  gotologin() {
    this.navCtrl.navigateForward('login');
  }
  gotopoliticas() {
    this.navCtrl.navigateForward('politicas');
  }
  gotoaviso() {
    this.navCtrl.navigateForward('avisolegal');
  }

      Registro(){
        this.isSubmitted = true;
        this.spinnerForm =false
        if(this.FormularioLogin.valid){
          console.log('Formulario correcto')
          this.service.signup(this.FormularioLogin.value).subscribe((response)=>{
            this.spinnerForm =false
            console.log(response)
            if(response == true){
              this.service.presentToast('Usuario Registrado Correctamente!');
             // localStorage.setItem("free_access_id", data.free_access_id)
              this.navCtrl.navigateForward('login');
            }else{
              console.log("aqui", response)
              let err = JSON.parse(JSON.stringify(response.error))
              let msj1 = err.error;
              let msj2 = ''
              console.log(response)
              err.detail.forEach(element => {
                msj2 = msj2+', '+element
              });
              this.service.presentToast(msj1+msj2);
            }
            
          },(error)=>{
              this.spinnerForm =false
              console.log("eeee",error)
           
          })
          // console.log(this.FormularioLogin);
         
          }else{
            console.log('Formulario Incorrecto');
             return false;
            }
      }

  // Registro(){
  //   if(this.username !='' && this.email !='' && this.password !='' && this.name !='' && this.surname != ''){
  //     this.spinnerForm = true
  //    let data = {
  //         'username': this.username,
  //         'email'   : this.email,
  //         'password': this.password,
  //         'name'    : this.name,
  //         'surname' :this.surname
  //        }
  //        this.service.signup(data).subscribe((response)=>{
  //          this.spinnerForm =false
  //          console.log(response)
  //           // localStorage.setItem("free_access_id", data.free_access_id)
  //            },(error)=>{
  //            this.spinnerForm =false
  //            console.log(error)
  //                })
  //        console.log(data);
  //            }else{
  //          this.service.presentToast("Datos incompletos !");
  //              }
  // }



}
