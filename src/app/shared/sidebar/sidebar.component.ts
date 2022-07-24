import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor( private gifsService: GifsService)
  {

  }

  buscar( elemento: string)
  {
    this.gifsService.buscarGifs( elemento );
  }
  get historial()
  {
    return this.gifsService.historial;
  }
}
