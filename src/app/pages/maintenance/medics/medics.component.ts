import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medic } from 'src/app/models/medic.model';
import { MedicService } from 'src/app/services/medic.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.css'],
})
export class MedicsComponent implements OnInit,OnDestroy {
  loading: boolean = true;
  medics: Medic[] = [];
  medicsTemp: Medic[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private medicsService: MedicService,
    private modalimgService: ModalImageService,
    private searchService: SearchService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  ngOnInit(): void {
    this.getMedics();

    this.subscriptions.push(
      this.modalimgService.newImg
        .pipe(delay(500))
        .subscribe((img) => this.getMedics())
    );
  }

  getMedics() {
    this.loading = true;

    this.medicsService.getMedics().subscribe((medics) => {
      this.loading = false;
      this.medics = medics;
      this.medicsTemp = medics;
    });
  }

  deleteMedic(medic:Medic){
    Swal.fire({
      title: 'Borrar medico?',
      text: `Esta a punto de borrar a ${medic.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar.'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicsService.deleteMedic(medic.medicID).subscribe(resp =>{
          Swal.fire('Medico borrado', `${medic.name} fue eliminado exitosamente`, 'success');
          this.getMedics();
        });

      }
    })
  }

  showModal(medic: Medic) {
    this.modalimgService.openModal('medicos', medic.medicID, medic.img);
  }

  search(find: string) {
    if (find.length === 0) {
      this.medics = this.medicsTemp;
      return;
    }
    this.searchService.search('medicos', find).subscribe((resp) => {
      this.medics = resp;
    });
  }
}
