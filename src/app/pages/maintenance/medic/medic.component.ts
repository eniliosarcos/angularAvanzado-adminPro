import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medic } from 'src/app/models/medic.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicService } from 'src/app/services/medic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css'],
})
export class MedicComponent implements OnInit {
  public medicForm: FormGroup;
  public hospitals: Hospital[] = [];
  public medicSelected: Medic;
  public hospitalSelected: Hospital;

  constructor(
    private formBuilder: FormBuilder,
    private hospitalService: HospitalService,
    private medicService: MedicService,
    private router: Router,
    private activaedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activaedRoute.params.subscribe(({ id }) => this.getMedicById(id));

    this.medicForm = this.formBuilder.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.getHospitals();

    this.medicForm.get('hospital').valueChanges.subscribe((hospitalId) => {
      this.hospitalSelected = this.hospitals.find(
        (value) => value._id === hospitalId
      );
    });
  }

  getMedicById(id: string) {

    if(id === 'new'){
      return;
    }

    this.medicService.getMedicById(id).pipe(
      delay(150)
    ).subscribe(medic => {

      if(!medic){

        this.router.navigateByUrl(`/dashboard/medics`);
        return;
      }

      this.medicSelected = medic;

      const {
        name,
        hospital: { _id },
      } = medic;

      this.medicForm.setValue({
        name,
        hospital: _id,
      });
    });
  }

  saveMedic() {
    const { name } = this.medicForm.value;

    if (this.medicSelected) {
      const data = {
        ...this.medicForm.value,
        medicID: this.medicSelected.medicID,
      };

      this.medicService.updateMedic(data).subscribe((resp) => {
        Swal.fire(
          'Actualizado',
          `${name} actualizado correctamente`,
          'success'
        );
      });
    } else {
      this.medicService
        .createMedic(this.medicForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${name} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medic/${resp.medic.medicID}`);
        });
    }
  }

  getHospitals() {
    this.hospitalService.getHospitals().subscribe((hospital) => {
      this.hospitals = hospital;
    });
  }
}
