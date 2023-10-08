import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { User } from './User';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}



@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private signinUrl = environment.baseurl+'/api/auth/authenticate';
  private signupUrl = environment.baseurl+'/api/auth/register';
  private userUrl = environment.baseurl+'/api/user/profile';
  private allSUrl = environment.baseurl+'/api/admin/listApplications';
  private apply = environment.baseurl+'/api/applicant/apply';
  private deleteUrl = environment.baseurl+'/api/admin/delete';
  private approveUrl = environment.baseurl+'/api/admin/approve';
  private specifiyApplicantUrl = environment.baseurl+'/api/applicant/application';
  //private allSUrl = environment.baseurl+'/api/auth/test';
  // headers = new HttpHeaders().set('Content-Type', 'application/json');
  userProfile!:any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

   //register
 signUp(name: string, dob:Date, idNumber:string, contact:string, city:string, gender:string, email:string, password:string, role:string) {
  return this.http.post<any>(this.signupUrl, {name,dob,idNumber,contact,city,gender ,email,password, role})

}
  // Sign-in
  signIn(email:string, password:string) {
    return this.http.post<any>(this.signinUrl, {email,password})

  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  
  getEmail(){
    return localStorage.getItem('access_email');
  }
  
  
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
        return (authToken !== null) ? true : false;
  }
  
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
  
    }
  }
    // User profile
    getUserProfile(email:any): Observable<any> {
     
      let api = `${this.userUrl}/${email}`;
      return this.http.get(api).pipe(
        map((res) => {
         return res || {}
        }),
      )
    }

    //applicants
    getApplicantions(): Observable<any>{
      return this.http.get(this.allSUrl).pipe(
        map((response: any) => {
         return response || {}
        }),
        )
    }
    // apply
    applyInsurance(coverageType:string, dependents:number, marriageStatus:string, applicationStatus:string, applicant:any): Observable<any>{
      return this.http.post(this.apply,{coverageType,dependents,marriageStatus,applicationStatus,applicant} ).pipe(
        map((res: any) => {
         return res || {}
        }),
        )
    }

    //specific applicant
    specificApplicant(email:string): Observable<any>{
      let apiUrl = `${this.specifiyApplicantUrl}/${email}`;
      return this.http.get(apiUrl).pipe(
        map((res: any) => {
         return res || {}
        }),
        )
    }

    //approve
    approve(id:number): Observable<any>{
      let approve = `${this.approveUrl}/${id}`;
      return this.http.put(approve, httpOptions)
    }

        //delete application
        deleteApl(id:number): Observable<any>{
          let delet = `${this.deleteUrl}/${id}`;
          return this.http.delete(delet)
        }

}
