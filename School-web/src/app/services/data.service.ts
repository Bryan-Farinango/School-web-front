import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  spanishDatatables: any;
  public userId: any;
  public matricula: boolean;
  constructor() {
    this.spanishDatatables = {
      processing:
        "<img src='assets/images/general/loading.gif' alt='Procesando...'>",
      search: '',
      lengthMenu: 'Mostrar _MENU_ &elementos',
      info: 'Mostrando desde _START_ al _END_ de _TOTAL_ elementos',
      infoEmpty: 'Mostrando ningún elemento.',
      infoFiltered: '(filtrado _MAX_ elementos total)',
      infoPostFix: '',
      loadingRecords: 'Cargando registros...',
      zeroRecords: 'No se encontraron registros',
      emptyTable: 'No hay datos disponibles en la tabla',
      paginate: {
        first: "<img src='assets/images/general/first-icon.svg' alt='Primero'>",
        previous:
          "<img src='assets/images/general/previous-icon.svg' alt='Anterior'>",
        next: "<img src='assets/images/general/next-icon.svg' alt='Siguiente'>",
        last: "<img src='assets/images/general/last-icon.svg' alt='Ultimo'>",
      },
      aria: {
        sortAscending: ': Activar para ordenar la tabla en orden ascendente',
        sortDescending: ': Activar para ordenar la tabla en orden descendente',
      },
    };
    this.matricula = false;
  }
}
