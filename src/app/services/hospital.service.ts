import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetHospitals } from '../interfaces/getHospitals-interfaces';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_URL;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private httpClient: HttpClient) { }
  get token(){
    return new HttpHeaders().set('x-token', localStorage.getItem('token') || '')
  }

  getHospitals(from:number = 0){
    return this.httpClient.get<GetHospitals>(`${base_url}/hospitales?from=${from}`,{headers:this.token}).pipe(
      map(resp => resp.hospitals)
    );
  }

  createHospital(name:string){
    return this.httpClient.post(`${base_url}/hospitales`,{name},{headers:this.token});
  }

  updateHospital(_id: string, name:string){
    return this.httpClient.put(`${base_url}/hospitales/${_id}`,{name, _id},{headers:this.token});
  }

  deleteHospital(_id: string){
    return this.httpClient.delete(`${base_url}/hospitales/${_id}`,{headers:this.token});
  }

}
