import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginform!: FormGroup

  constructor(
    private appservice: ApplicationService,
    private router: Router,
    public fb: FormBuilder,
  ){}

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

  }
  login(){
    this.appservice.signIn(this.loginform.value.email, this.loginform.value.password)
    .subscribe(
      data  => {
       // console.log(data)
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('access_email', data.email)
    
       this.router.navigate(['home']);
     },
       error => {
            console.log(error);

        }

      );

}

}
