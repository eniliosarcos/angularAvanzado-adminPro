import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetMedics } from '../interfaces/getMedics-interface';
import { Medic } from '../models/medic.model';

const base_url = environment.base_URL;

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  constructor(private http:HttpClient) { }

  get token(){
    return new HttpHeaders().set('x-token', localStorage.getItem('token') || '')
  }

  getMedics(from:number = 0){
    return this.http.get<GetMedics>(`${base_url}/medicos?from=${from}`,{headers:this.token}).pipe(
      map(resp => resp.medics)
    );
  }

  getMedicById(id:string){
    return this.http.get(`${base_url}/medicos/${id}`,{headers:this.token}).pipe(
      map((resp:{ok: boolean, medic: Medic}) => resp.medic)
    );
  }

  createMedic(medic:Medic){
    return this.http.post(`${base_url}/medicos`,medic,{headers:this.token});
  }

  updateMedic(medic:Medic){
    return this.http.put(`${base_url}/medicos/${medic.medicID}`,medic,{headers:this.token});
  }

  deleteMedic(_id: string){
    return this.http.delete(`${base_url}/medicos/${_id}`,{headers:this.token});
  }
}
