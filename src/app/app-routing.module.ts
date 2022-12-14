import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerFicheComponent } from './consumer/consumer-fiche/consumer-fiche.component';
import { ConsumerListComponent } from './consumer/consumer-list/consumer-list.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from './login/authentication.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent, canActivate:[AuthenticationGuard]},
  {path:'consumer-list', component:ConsumerListComponent, canActivate:[AuthenticationGuard]},
  {path:'consumer-fiche', component:ConsumerFicheComponent, canActivate:[AuthenticationGuard]},
  {path:'consumer-fiche/:id', component:ConsumerFicheComponent, canActivate:[AuthenticationGuard]},
  {path:'**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
