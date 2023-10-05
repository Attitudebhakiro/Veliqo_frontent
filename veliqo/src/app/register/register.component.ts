import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerform!: FormGroup
  Succeed = false;
  Failed = false;
  
  constructor(
    private appservice: ApplicationService,
    private router: Router,
    public fb: FormBuilder,
  ){}

  ngOnInit(): void {
    this.registerform = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      idNumber: ['', Validators.required],
      contact: ['', Validators.required],
      city: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  register(){
    this.appservice.signUp(this.registerform.value.firstName+" "+this.registerform.value.middleName+" "+this.registerform.value.lastName,this.registerform.value.dob
      ,this.registerform.value.idNumber,this.registerform.value.contact,this.registerform.value.city, this.registerform.value.gender,this.registerform.value.email, this.registerform.value.password, "APPLICANT")
    .subscribe(
      data  => {
       console.log(data);
       this.registerform.reset();
       this.Succeed = true;
        this.Failed = false;
     },
       error => {
            console.log(error);
            this.Failed = true;

        }

      );
  }

}
