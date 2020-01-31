import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import {  NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from "sweetalert2";
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();  

  constructor(private servHeroe : HeroesService,private route: ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if(id!=="nuevo"){
      this.servHeroe.getHeroe(id).subscribe((resp:HeroeModel) =>{
        this.heroe = resp;
        this.heroe.id = id;
      });
    }

  }

  guardar(form: NgForm){
    if(form.invalid)return;

    Swal.fire({
      title:"Espere",
      text:"Guardando información",
      icon:"info",
      allowOutsideClick:false
    });

    Swal.showLoading();


    let peticion : Observable<any>;

    if(this.heroe.id){
      peticion = this.servHeroe.actualizarHeroe(this.heroe);
    }else{
      peticion = this.servHeroe.crearHeroe(this.heroe);
    }

  peticion.subscribe(resp =>{
    Swal.fire({
      title:this.heroe.nombre,
      text:"Se actualizó correctamente",
      icon:"success",
      allowOutsideClick:false
    });
  });

  }


}
