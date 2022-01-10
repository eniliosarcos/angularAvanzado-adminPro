import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_URL;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  constructor() { }

  async updateImg(
    file: File,
    collection:string,
    id:string
  ){

    try {
      const url = `${base_url}/subir/${collection}/${id}`;
      const formData = new FormData();
      formData.append('archivo', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      if(data.ok){
        return data.user.img;
      } else {
        console.log(data.message)
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;

    }
  }
}
