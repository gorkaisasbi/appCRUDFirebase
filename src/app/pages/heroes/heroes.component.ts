import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes : HeroeModel[] = [];
  cargando: boolean = false;

  constructor(private servHeroes : HeroesService) { }

  ngOnInit() {
    this.cargando = true;
    this.servHeroes.getHeroes().subscribe(resp=>{
        this.heroes = resp;
        this.cargando = false;
    });
  }

  borrarHeroe(heroe: HeroeModel, i:number){
    this.heroes.splice(i,1);
    this.servHeroes.borrarHeroe(heroe.id).subscribe();
  }

}
