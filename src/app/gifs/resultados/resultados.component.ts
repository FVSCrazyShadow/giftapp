import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html'
})
export class ResultadosComponent {

  get data(){
    return this.gifsService.resultados;
  }

  constructor( private gifsService: GifsService)
  {

  }
}
