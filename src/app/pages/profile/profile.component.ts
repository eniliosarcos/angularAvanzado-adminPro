import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  uploadImg: File;
  imgTemp: any = null;

  get imgUrl(){
    return this.userService.user.imgUrl;
  }
  get isGoogleAccount(){
    return this.userService.user.google;
  }

  constructor(private formBuilder:FormBuilder,
              private userService: UserService,
              private fileUploadService:FileUploadService) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.userService.user.name, Validators.required],
      lastName: [this.userService.user.lastName, Validators.required],
      email: [this.userService.user.email, [Validators.required, Validators.email] ]
    });
  }

  updateProfile(){
    console.log(this.profileForm.value);
    this.userService.updateUser(this.profileForm.value).subscribe(resp => {
      const {name, lastName, email} = this.profileForm.value
      this.userService.user.name = name;
      this.userService.user.lastName = lastName;
      this.userService.user.email = email;

      Swal.fire('Guardado', 'El cambio se grabó sin problemas', 'success');
    }, (respError:HttpErrorResponse) => {
      Swal.fire('Error', respError.error.msg, 'error');
    })
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
    this.fileUploadService.updateImg(this.uploadImg, 'usuarios',this.userService.user.userId)
                          .then(img => {
                            this.userService.user.img = img
                            Swal.fire('Guardado', 'La imagen se grabó sin problemas', 'success');
                          }).catch((respError) => {
                            console.log(respError)
                            Swal.fire('Error', 'No se pudo subir la imagen', 'error');
                          });
  }

}
