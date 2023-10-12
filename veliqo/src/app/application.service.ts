import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { User } from './User';
import { Application } from './Application';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// }



@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private admin = '/admin'
  private signinUrl = environment.baseurl+'/authenticate';
  private signupUrl = environment.baseurl+'/register';
  private userUrl = environment.baseurl+'/profile';
  private allSUrl = environment.baseurl+this.admin+'/listApplications';
  private allUrl = environment.baseurl+this.admin+'/list';
  private apply = environment.baseurl+'/applicant/apply';
  private deleteUrl = environment.baseurl+this.admin+'/delete';
  private approveUrl = environment.baseurl+this.admin+'/approve';
  private specifiyApplicantUrl = environment.baseurl+'/applicant/application';
  private rejectUrl = environment.baseurl+this.admin+'/reject';
  private statustUrl = environment.baseurl+this.admin+'/status';
 
  // headers = new HttpHeaders().set('Content-Type', 'application/json');
  userProfile!:any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

   //register
 signUp(name: string, dob:Date, idNumber:string, contact:string, city:string, gender:string, email:string, password:string, role:string) {
  return this.http.post<User>(this.signupUrl, {name,dob,idNumber,contact,city,gender ,email,password, role})

}
  // Authentication
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
  //headers
  // headers = { 'Authorization': 'Bearer '+this.getToken }
     token = this.getToken()
    httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer '+this.token })
  }
    // User profile
    getUserProfile(email:any): Observable<User> {
     
      let api = `${this.userUrl}/${email}`;
      return this.http.get<User>(api, this.httpOptions).pipe(
        map((res) => {
         return res || {}
        }),
      )
    }

    //all applicants
    getApplicantions(): Observable<Application[]>{
      return this.http.get<Application[]>(this.allSUrl, this.httpOptions).pipe(
        map((response: any) => {
         return response || {}
        }),
        )
    }
    //
    load(): Observable<Application[]>{
      return this.http.get<Application[]>(this.allUrl, this.httpOptions).pipe(
        map((response: any) => {
         return response || {}
        }),
        )
    }
    // apply
    applyInsurance(coverageType:string, dependents:number, marriageStatus:string, applicationStatus:string, applicant:any): Observable<Application>{
      return this.http.post<Application>(this.apply,{coverageType,dependents,marriageStatus,applicationStatus,applicant}, this.httpOptions ).pipe(
        map((res: any) => {
         return res || {}
        }),
        )
    }

    //specific applicant
    specificApplicant(email:string): Observable<Application>{
      let apiUrl = `${this.specifiyApplicantUrl}/${email}`;
      return this.http.get<Application>(apiUrl, this.httpOptions).pipe(
        map((res: any) => {
         return res || {}
        }),
        )
    }

    //approve
    approve(id:number): Observable<string>{
      let approve = `${this.approveUrl}/${id}`;
      return this.http.put<string>(approve, this.httpOptions)
    }

    //delete application
    deleteApl(id:number): Observable<string>{
      let delet = `${this.deleteUrl}/${id}`;
      return this.http.delete<string>(delet, this.httpOptions).pipe(
        map((res: string) => {
         return res 
        }),
        )
    }

        //reject application
        rejectApl(id:number): Observable<string>{
          let rej = `${this.rejectUrl}/${id}`;
          return this.http.put<string>(rej, this.httpOptions).pipe(
            map((res: string) => {
             return res 
            }),
            )
        }

    // list by status
    listbyStatus(status:string): Observable<Application[]>{
      let statUrl = `${this.statustUrl}/${status}`;
      return this.http.get<Application[]>(statUrl, this.httpOptions).pipe(
        map((res: Application[]) => {
         return res || {}
        }),
        )


    }

}
