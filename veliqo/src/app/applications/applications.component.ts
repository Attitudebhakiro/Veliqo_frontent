import { Component } from '@angular/core';
import { User } from '../User';
import { ApplicationService } from '../application.service';

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

  constructor(
    private appservice :ApplicationService,

  ){
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

}
