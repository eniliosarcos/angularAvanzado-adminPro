import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_URL;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {
  collection: string;
  id: string;
  img: string;
  private _showModal: boolean = false;

  newImg: EventEmitter<string> = new EventEmitter<string>();

  get showModal(){
    return this._showModal;
  }

  openModal(collection: string,id:string, img:string = 'no-image'){
    this._showModal = true;
    this.collection = collection;
    this.id = id;
    this.img = img;

    if(img.includes('https')){
      this.img = img;
    } else{
      this.img = `${base_url}/subir/${collection}/${img}`;
    }
  }

  closeModal(){
    this._showModal = false;
  }

  constructor() { }
}
