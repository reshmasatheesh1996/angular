import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RankingComponent } from './ranking/ranking.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './service/auth.guard'

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ranking', component: RankingComponent, canActivate: [AuthGuard],data:{role:'1'}},
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard],data:{role:'2'}},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
