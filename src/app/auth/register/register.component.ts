import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.formBuilder.group({
    name: ['enilio', [Validators.required, Validators.minLength(3)]],
    lastName: ['sarcos', [Validators.required, Validators.minLength(3)]],
    email: ['test100@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    password2: ['1234567', [Validators.required]],
    term: [true, [Validators.required]],
  },{
    validators: this.passwordsEquals('password', 'password2')
  });

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router:Router) { }

  ngOnInit(): void {
  }

  createUser(){
    this.formSubmitted = true;

    if(this.registerForm.invalid){
      return;
    }

    this.userService.createUser(this.registerForm.value).subscribe( resp => {
      this.router.navigateByUrl('/login')
    }, (httpErrorResp:HttpErrorResponse) => {
      Swal.fire('Error', httpErrorResp.error.msg, 'error')
    });
  }

  passwordsEquals(pass1Name:string, pass2Name:string){

    return (formGroup:FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({NotEqual: true})
      }
    }
  }

  fieldNoValid(field: string): boolean{
    if(this.registerForm.get(field).invalid && this.formSubmitted){
      return true;
    } else {
      return false;
    }
  }

  confirmTerms(){
    return !this.registerForm.get('term').value && this.formSubmitted;
  }

  passwordNotValid(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if((pass1 !== pass2) && this.formSubmitted){
      return true;
    } else{
      return false;
    }
  }

}
