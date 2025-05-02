import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // IMPORTANTE Y NECESARIO
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent },
  { path: 'quien-soy', component: QuienSoyComponent },
  { path: '**', redirectTo: 'home' }
];
