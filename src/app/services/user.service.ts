import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url:string = environment.base_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient) { }

  createUser(formData: RegisterForm){
    return this.httpClient.post(`${base_url}/usuarios`,formData);
  }

  login(formData: LoginForm){
    return this.httpClient.post(`${base_url}/auth`,formData);
  }

  loginGoogle(token:string){
    return this.httpClient.post(`${base_url}/auth/google`,{token});
  }

  tokenValidate(): Observable<boolean>{
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

    return this.httpClient.get(`${base_url}/auth/renew`,{headers}).pipe(
      map( (resp:any) => resp.ok),
      catchError(err => of(false))
    );
  }

  logout(){
    localStorage.removeItem('token');
  }
}
