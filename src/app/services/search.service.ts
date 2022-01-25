import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medic } from '../models/medic.model';
import { User } from '../models/user.model';

const base_url:string = environment.base_URL;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  get token(){
    return new HttpHeaders().set('x-token', localStorage.getItem('token') || '')
  }

  constructor(private httpClient: HttpClient) { }

  transformUsers(result:any[]):User[] {
    return result.map(
      user => {
        return new User(
          user.name,
          user.lastName,
          user.email,
          '',
          user.google,
          user.role,
          user.img,
          user.userId
        )
      }
    );
  }
  transformHospitals(result:any[]):Hospital[] {
    return result;
  }

  transformMedics(result:any[]):Medic[] {
    return result;
  }

  searchAll(find:string){
    return this.httpClient.get(`${base_url}/todo/${find}`,{headers:this.token})
  }

  search(collection: string, find:string){
    return this.httpClient.get(`${base_url}/todo/${collection}/${find}`,{headers:this.token})
    .pipe(
      map((resp:any) => {
        resp.result

        switch (collection) {
          case 'usuarios':
            return this.transformUsers(resp.result);
          case 'hospitales':
            return this.transformHospitals(resp.result);
          case 'medicos':
            return this.transformMedics(resp.result);

          default:
            return [];
        }
      })
    );
  }
}
