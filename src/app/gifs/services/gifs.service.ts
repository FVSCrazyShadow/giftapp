import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
//Esta propiedad del decorador hace q no tengamos que importar en los providers dentro de cada modulo, lo hace accesible desde cualquier parte de la app
})
export class GifsService {

  private _historial: string[] = [];

  get historial()
  {
    return [...this._historial]; //rompemos la referencia con ... (BP)
  }

  buscarGifs( termino: string)
  {
    this._historial.unshift( termino );

    console.log(this._historial);
  }
}
