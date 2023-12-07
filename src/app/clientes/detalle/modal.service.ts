import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _notificarUpload = new EventEmitter<any>(); // en typescript para diferencial el metodo del atributo se coloca el _ raya al piso
                                                  //para que no genere error


  constructor() { }

  get notificarUpload(): EventEmitter<any>{
    return this._notificarUpload;
  }
}
