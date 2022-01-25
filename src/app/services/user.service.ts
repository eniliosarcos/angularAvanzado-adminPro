import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetUsers } from '../interfaces/getUsers-interfaces';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

import { User } from '../models/user.model';

const base_url:string = environment.base_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user:User;

  get token(){
    return new HttpHeaders().set('x-token', localStorage.getItem('token') || '')
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role;
  }
  constructor(private httpClient: HttpClient) { }

  getUsers(from:number = 0){
    return this.httpClient.get<GetUsers>(`${base_url}/usuarios?from=${from}`,{headers:this.token})
                          .pipe(
                            map(resp => {
                              const users = resp.users.map( user => {
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
                              })

                              return {
                                totalUsers: resp.totalUsers,
                                users
                              }
                            })
                          );
  }

  createUser(formData: RegisterForm){
    return this.httpClient.post(`${base_url}/usuarios`,formData);
  }

  updateUser(data:{name: string, lastName:string, email:string, role: string}){

    data = {
      ...data,
      role: this.user.role
    }

    return this.httpClient.put(`${base_url}/usuarios/${this.user.userId}`,data,{headers:this.token})
  }

  deleteUser(userId:string){

    return this.httpClient.delete(`${base_url}/usuarios/${userId}`,{headers:this.token});
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
      map((resp:any)=>{

        const {email,google,img = '',lastName,name,role,userId} = resp.userDB

        this.user = new User(name,lastName,email, '',google,role,img,userId);

        return resp.ok;
      }),
      catchError(err => of(false))
    );
  }

  updateRole(data:User){

    return this.httpClient.put(`${base_url}/usuarios/${data.userId}`,data,{headers:this.token})
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
  }
}
