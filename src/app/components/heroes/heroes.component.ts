import { Component, OnInit } from '@angular/core';
import {HeroesService} from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes:any[]=[];
  loading:boolean=true;

  constructor(private _heroes:HeroesService) {
    this._heroes.obtenerHeroes().subscribe(heroes=>{

        setTimeout(()=>{
          this.loading=false
          this.heroes=heroes;
        },3000)
    });
  }

  ngOnInit() {
  }

  eliminarHeroe(key$:string)
  {
    this._heroes.eliminarHeroe(key$).subscribe(resp=>{
      if(resp)
      {
        console.error(resp);
      }
      {
        //Todo bien
        delete this.heroes[key$];
      }
    });
  }
}
