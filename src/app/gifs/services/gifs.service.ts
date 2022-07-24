import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaGIFAPI, Gif } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
  //Esta propiedad del decorador hace q no tengamos que importar en los providers dentro de cada modulo, lo hace accesible desde cualquier parte de la app
})
export class GifsService {

  private api_key: string = '2o75wJL9zxUk86LTTGMwHA6YsuV6dcqO';

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  constructor(private http: HttpClient) {
    //TODO: Revisar
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('Resultados')!) || [];
  }

  get historial() {
    return [...this._historial]; //rompemos la referencia con ... (BP)
  }

  buscarGifs(termino: string) {
    termino = termino.toLowerCase();

    if (termino.trim().length == 0) {
      return;
    }

    if (!this._historial.includes(termino)) {
      this._historial.unshift(termino);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify( this._historial) );
    }

    this.http.get<RespuestaGIFAPI>(`https://api.giphy.com/v1/gifs/search?api_key=2o75wJL9zxUk86LTTGMwHA6YsuV6dcqO&q=${termino}&limit=10`)
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('Resultados', JSON.stringify( this.resultados) );
      });

    console.log(this._historial);
  }
}
