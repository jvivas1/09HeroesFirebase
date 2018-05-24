import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import {Heroe} from '../../interfaces/heroe.interface';
import {HeroesService} from '../../services/heroes.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe:Heroe={
    nombre:"",
    bio:"",
    casa:""
  }

  nuevo:boolean=false;
  id:string;
  constructor(private _heroe:HeroesService,
  private router:Router
  ,private activatedRoute:ActivatedRoute)
  {

    this.activatedRoute.params.subscribe(parametros=>{
      this.id=parametros['id']
      if(this.id !=="nuevo")
      {
          this._heroe.obtenerHeroe(this.id).subscribe(heroe=>{
              this.heroe=heroe;
          });
      }
    });
  }

  ngOnInit() {
  }

  guardar()
  {
    console.log(this.heroe);
    if(this.id=="nuevo"){
    this._heroe.nuevoHeroe(this.heroe).subscribe(data=>{
        this.router.navigate(['/heroe', data.name])
    },error=>
      console.error(error));
    }
    else{
      this._heroe.actualizarHeroe(this.heroe,this.id).subscribe(data=>{
          console.log(data);
      },error=>
        console.error(error));
    }
  }

  agregarNuevo(form:NgForm)
  {
    this.router.navigate(['/heroe','nuevo']);

    form.reset(
      {
        casa:"Marvel"
      }
    );
  }

}
