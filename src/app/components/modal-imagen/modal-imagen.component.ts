import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  uploadImg: File;
  imgTemp: any = null;

  constructor(public modalimgService: ModalImageService, private fileUploadService:FileUploadService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.imgTemp = null;
    this.modalimgService.closeModal();
  }


  changeImg(event){
    this.uploadImg = event.target.files[0];

    if(!event.target.files[0]){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  goUploadImg(){
    const id = this.modalimgService.id;
    const collection = this.modalimgService.collection;
    // const id = this.modalimgService.id;

    this.fileUploadService.updateImg(this.uploadImg, collection,id)
                          .then(img => {
                            Swal.fire('Guardado', 'La imagen se grabó sin problemas', 'success');
                            this.modalimgService.newImg.emit(img);
                            this.closeModal();
                          }).catch((respError) => {
                            console.log(respError)
                            Swal.fire('Error', 'No se pudo subir la imagen', 'error');
                          });
  }

}
