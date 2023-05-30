import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CardComponent } from './component/card/card.component';
import { TableComponent } from './component/table/table.component';
import { FormdesignComponent } from './component/formdesign/formdesign.component';
import { RootComponent } from './component/root.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {path:'',component:HomeComponent},
      {path:'home',component:HomeComponent},
      {path:'card',component:CardComponent},
      {path:'table',component:TableComponent},
      {path:'form',component:FormdesignComponent},
    ],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
