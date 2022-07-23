import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; //Busca en la contraparte de html el elemento dentro de ViewChild, class, directivas, propiedades, etc.
  //El simbolo ! despues de txtBuscar, es el Non-null assertion operator.
  //ElementRef es tipo generico, funciona igual si no especificamos que tipo es, pero conviene para saber que estamos manipulando, en este caso un Input de HTML

  constructor( private gifsService: GifsService )
  {

  }

  buscar( termino: string)
  {
    const valor = this.txtBuscar.nativeElement.value;

    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = ''; //Una vez buscamos, limpiamos la caja de texto.
  }
}

