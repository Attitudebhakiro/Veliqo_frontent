import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { ApplicationsComponent } from './applications/applications.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component:LoginComponent},
  { path: "register", component:RegisterComponent},
  { path: "home", component:HomeComponent, canActivate: [AuthGuard]},
  { path: "applications", component:ApplicationsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
