import { Component } from '@angular/core';
import { User } from '../User';
import { ApplicationService } from '../application.service';
import { Application } from '../Application';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent {
  user!: User
  info : any
  isAdmin = false
  isNotAdmin = false
  applicants: any
  applicant: any
  statusP = "Pending"
  statusA = "Approved"
  statusR = "Rejected"

  constructor(
    private appservice :ApplicationService,

  ){
    // list all applications
    this.appservice.getApplicantions().subscribe((resp:any)=>{
      this.applicants = resp
      console.log(resp)
  
   
    })
  }
  ngOnInit(): void {
 
   // logged user
   this.info = {
    email: this.appservice.getEmail()   

  };
   this.appservice.getUserProfile(this.info.email).subscribe((res: any) => {
    this.user = res;
    console.log(this.user);
    if(this.user.role==='ADMIN'){
      this.isAdmin = true
  
   }else{
       this.isAdmin = false
      this.isNotAdmin = true
  
      
   }

  });

  this.appservice.specificApplicant(this.info.email).subscribe((resp:any)=>{
    this.applicant = resp
    console.log(resp)
  })

  }
  //list pending applications

  pending(){
    this.appservice.listbyStatus("Pending").subscribe((data: Application[])=>{
      this.applicants = data
    })
  }
  // list rejected applications
  rejected(){
    this.appservice.listbyStatus("Rejected").subscribe((data: Application[])=>{
      this.applicants = data
    })
  }
  //list approved applications
  approved(){
    this.appservice.listbyStatus("Approved").subscribe((data: Application[])=>{
      this.applicants = data
    })
  }

}
