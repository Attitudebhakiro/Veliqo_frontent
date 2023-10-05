import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../application.service';
import { User } from '../User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  applyform!: FormGroup
  user!: User
  info : any
  Succeed = false;
  Failed = false;
  isAdmin = false
  isNotAdmin = false
  applicants: any
  deleted = false
  updated = false

  constructor(
    private appservice :ApplicationService,
    public fb: FormBuilder,
    private router : Router
  ){
    this.appservice.getApplicantions().subscribe((resp:any)=>{
      this.applicants = resp
      console.log(resp)
    
    })
  }
  ngOnInit(): void {
    this.applyform = this.fb.group({
      dependents: ['', Validators.required],
      coverageType: ['', Validators.required],
      marriageStatus: ['', Validators.required],
    });

  

   // logged user
   this.info = {
    email: this.appservice.getEmail()   

  };
   this.appservice.getUserProfile(this.info.email).subscribe((res: any) => {
    this.user = res;
    console.log(this.user);
    if(this.user.role==='ADMIN'){
      this.isAdmin = true
      console.log(this.user.role)
   }else{
       this.isAdmin = false
      this.isNotAdmin = true

      
   }

  });

  }
 
  apply(){
    this.appservice.applyInsurance(this.applyform.value.coverageType, this.applyform.value.dependents, this.applyform.value.marriageStatus, "Pending",this.user)
    .subscribe(
      data  => {
       console.log(data);
       this.applyform.reset();
       this.Succeed = true;
        this.Failed = false;
     },
       error => {
            console.log(error);
            this.Failed = true;

        }

      );
  }
  approve(vl: number){
    this.appservice.approve(vl).subscribe((resp:any)=>{
       console.log(resp)
      
    })
    this.updated = true
  }

  delete(val: any){
    this.appservice.deleteApl(val).subscribe( (data: any) =>{
           
    })
    this.deleted = true 
  
  }

}


