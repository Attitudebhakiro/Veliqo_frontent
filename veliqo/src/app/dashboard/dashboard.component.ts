import { Component } from '@angular/core';
import { ApplicationService } from '../application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  info: any
  

  constructor(
    private appservice: ApplicationService,
    private router: Router,
  ){}

  ngOnInit(): void {
    // chech details for logged user
    this.info = {
      token: this.appservice.getToken(),
      email: this.appservice.getEmail(),
     

    };
    console.log(this.info)
}

doLogout(){
let removeToken = localStorage.removeItem('access_token');
if (removeToken == null) {
this.router.navigate(['login']);
}
}

}


