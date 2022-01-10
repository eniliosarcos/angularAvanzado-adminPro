import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public auth2:any;

  public loginForm = this.formBuilder.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();

    if(localStorage.getItem('email')){
      this.loginForm.get('remember').setValue(true);
    }
  }

  login(){
    this.userService.login(this.loginForm.value)
        .subscribe((resp:any) => {

          if(this.loginForm.get('remember').value){
            localStorage.setItem('email', this.loginForm.get('email').value);
          } else {
            localStorage.removeItem('email');
          }

          localStorage.setItem('token', resp.token);
          this.router.navigateByUrl('/');
        },(httpErrorResp:HttpErrorResponse) => {
          console.log(httpErrorResp)
          Swal.fire('Error', httpErrorResp.error.msg, 'error')
        })
    // console.log(this.loginForm.value);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  startApp(){
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '314915646384-1u6qra7f7mka8vp29ovjav8eni6nn20k.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;

          this.userService.loginGoogle(id_token).subscribe( (resp:any) =>{

            localStorage.setItem('token', resp.token);

            this.ngZone.run(()=>{
              this.router.navigateByUrl('/');
            })
          });
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
