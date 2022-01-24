import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_URL;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, type: 'usuarios' | 'medicos' | 'hospitales'): string {

    if(!img){
      return `${base_url}/subir/${type}/no-img`
    }
    if(img.includes('https')){
      return img;
    }

    if(img){
      return `${base_url}/subir/${type}/${img}`;
    }

    return `${base_url}/subir/${type}/no-img`;
  }

}
