import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { RespuestaGIFAPI, Gif } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
  //Esta propiedad del decorador hace q no tengamos que importar en los providers dentro de cada modulo, lo hace accesible desde cualquier parte de la app
})
export class GifsService {

  private api_key   : string = '2o75wJL9zxUk86LTTGMwHA6YsuV6dcqO';
  private apiUrl    : string ='https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];
  public resultados : Gif[] = [];


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

    const params = new HttpParams()
        .set('api_key', this.api_key)
        .set('limit', '20')
        .set('q', termino);

    this.http.get<RespuestaGIFAPI>(`${ this.apiUrl }/search`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('Resultados', JSON.stringify( this.resultados) );
      });

    console.log(this._historial);
  }
}
