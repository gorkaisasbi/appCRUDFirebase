import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {


  private url ="https://apploginfirebase-2752a.firebaseio.com/";

  constructor(private http: HttpClient) { }

  crearHeroe( heroe : HeroeModel){
      return this.http.post(`${this.url}/heroes.json`,heroe).pipe(
        map((resp : any) =>{
          heroe.id = resp.name;
          return heroe;
        }
      ));
  }

  actualizarHeroe(heroe : HeroeModel){

    const heroetemp = {
      ...heroe
    };
    delete heroetemp.id;
    console.log("actualizar");
  
    return this.http.put(`${this.url}heroes/${heroe.id}.json`,heroetemp);
  }

  getHeroes(){
    return this.http.get(`${this.url}heroes.json`).pipe(map(resp=>this.crearArray(resp)),delay(1500));

   
  }


  getHeroe(id:string){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  borrarHeroe(id : string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  private crearArray(heroeObj: object){
    const heroes : HeroeModel[] = [];
    if(heroeObj === null)return heroes;

    Object.keys(heroeObj).forEach(key=>{
        const heroe : HeroeModel = heroeObj[key];
        heroe.id = key;
        heroes.push(heroe);

    });
     return heroes;
  }




}
