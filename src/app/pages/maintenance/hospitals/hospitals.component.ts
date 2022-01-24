import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit,OnDestroy {

  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];
  public loading: boolean = true;
  subscriptions: Subscription[] = [];

  constructor(private hospitalService: HospitalService, private modalimgService:ModalImageService, private searchService:SearchService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  ngOnInit(): void {
    this.getHospitals();

    this.subscriptions.push(  this.modalimgService.newImg.pipe(delay(500)).subscribe(img => this.getHospitals())   );
  }

  getHospitals(){
    this.loading = true;

    this.hospitalService.getHospitals().subscribe(hospitals =>{
      this.loading = false
      this.hospitals = hospitals;
      this.hospitalsTemp = hospitals;
    });
  }

  saveHospital(hospital: Hospital){

    this.hospitalService.updateHospital(hospital._id,hospital.name).subscribe(resp => {
      Swal.fire('Actualizado', hospital.name, 'success');
    });
  }
  deleteHospital(hospital: Hospital){
    this.hospitalService.deleteHospital(hospital._id).subscribe(resp => {
      this.getHospitals();
      Swal.fire('Eliminado', hospital.name, 'success');
    });
  }

  showModal(hospital:Hospital){
    this.modalimgService.openModal('hospitales',hospital._id,hospital.img);
  }

  search(find:string){
    if(find.length === 0){
      this.hospitals = this.hospitalsTemp;
      return;
    }
    this.searchService.search('hospitales',find).subscribe(resp => {
      this.hospitals = resp;
    })
  }

  async openSweetAlert(){
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'Nombre del hospital',
      text: 'Ingrese el nombre del nuevo hospital'
    });

    if(value.trim().length > 0){
      this.hospitalService.createHospital(value).subscribe((resp:any) =>{
        this.hospitals.push(resp.hospital);
      })
    }
  }

}
