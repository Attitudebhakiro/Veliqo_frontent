import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../application.service';
import { User } from '../User';
import { Router } from '@angular/router';
import { Application } from '../Application';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  applyform!: FormGroup
  user!: User
  userDTO: any
  info : any
  Succeed = false;
  Failed = false;
  isAdmin = false
  isNotAdmin = false
  applicants!: any
  deleted = false
  updated = false
  statusP = "Pending"
  statusA = "Approved"
  statusR = "Rejected"
  rejected = false

  constructor(
    private appservice :ApplicationService,
    public fb: FormBuilder,
    private router : Router,
    private changeDetectorRefs : ChangeDetectorRef
  ){
      
  }
  ngOnInit(): void {
    this.applyform = this.fb.group({
      dependents: ['', Validators.required],
      coverageType: ['', Validators.required],
      marriageStatus: ['', Validators.required],
    });

     // fetch all applications
     this.appservice.getApplicantions().subscribe((resp:Application[])=>{
      this.applicants = resp
      console.log(this.applicants)
      })

   // logged user
   this.info = {
    email: this.appservice.getEmail()   

  };
   this.appservice.getUserProfile(this.info.email).subscribe((res: User) => {
    this.user = res;
    console.log(this.user.id);
    if(this.user.role==='ADMIN'){
      this.isAdmin = true
      console.log(this.user.role)
   }else{
       this.isAdmin = false
      this.isNotAdmin = true

      
   }
   this.userDTO = {
    id : this.user.id,
    name : this.user.name
     }
  console.log(this.userDTO)

  });

  
  }

 // apply for insurance 
  apply(){
    this.appservice.applyInsurance(this.applyform.value.coverageType, this.applyform.value.dependents, this.applyform.value.marriageStatus, "Pending",this.userDTO)
    .subscribe(
      data  => {
       console.log(data);
       this.applyform.reset();
       this.Succeed = true;
        this.Failed = false;
     },
       error => {
        this.applyform.reset();
        this.Succeed = true;
         this.Failed = false;

        }

      );
  }
  // approve insurance application
  approve(vl: number){
    this.appservice.approve(vl).subscribe((resp:string)=>{
       console.log(resp)
      
    })
    this.applicants = this.applicants.filter((u: { id: number; }) => u.id !== vl);
    this.updated = true
  }

  // delete insurance application
  delete(val: number){
    this.appservice.deleteApl(val).subscribe( (data: string) =>{
      console.log(data)
         
    })  
    this.applicants = this.applicants.filter((u: { id: number; }) => u.id !== val);
    this.deleted = true 
  
  }

  //reject insurance application
  reject(val: number){
    this.appservice.rejectApl(val).subscribe( (data: string) =>{
      console.log(data)
       
    })
    this.applicants = this.applicants.filter((u: { id: number; }) => u.id !== val);
    this.rejected = true

  }

}


