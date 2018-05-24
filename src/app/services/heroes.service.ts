import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Heroe} from '../interfaces/heroe.interface';
import 'rxjs/Rx';
@Injectable()
export class HeroesService {

  heroesURL="https://heroesapp-152a3.firebaseio.com/heroes.json"
  heroeURL="https://heroesapp-152a3.firebaseio.com/heroes"
  constructor(private http:Http){}

  nuevoHeroe( heroe:Heroe)
  {
      let body = JSON.stringify(heroe);
      let headers=new Headers({'Content-Type':'application/json'});


      return this.http.post(this.heroesURL,body,{headers})
      .map(res=>{
        return res.json();
      });
    }

    actualizarHeroe( heroe:Heroe, key$:string)
    {
        let body = JSON.stringify(heroe);
        let headers=new Headers({'Content-Type':'application/json'});

        let url=`${this.heroeURL}/${key$}.json`;

        return this.http.put(url,body,{headers})
        .map(res=>{
          return res.json();
        });
      }

      obtenerHeroe(key$:string)
      {
        let url=`${this.heroeURL}/${key$}.json`;

        return this.http.get(url)
        .map(res=>{
          return res.json();
        });
      }

      obtenerHeroes()
      {

        return this.http.get(this.heroesURL)
        .map(res=>{
          return res.json();
        });
      }

      eliminarHeroe(key$:string){
        let url=`${this.heroeURL}/${key$}.json`;

        return this.http.delete(url)
        .map(res=>{
          return res.json();
        });
      }


}
