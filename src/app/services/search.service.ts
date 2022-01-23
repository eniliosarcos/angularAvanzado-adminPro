import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  search(collection: string, find:string){
    return this.httpClient.get(`${base_url}/todo/${collection}/${find}`,{headers:this.token})
    .pipe(
      map((resp:any) => {
        resp.result

        switch (collection) {
          case 'usuarios':
            return this.transformUsers(resp.result);

          default:
            return [];
        }
      })
    );
  }
}
