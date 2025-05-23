import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { HistorialPartidasComponent } from './historial-partidas/historial-partidas.component';




export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // IMPORTANTE Y NECESARIO
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent },
  { path: 'quien-soy', component: QuienSoyComponent },

  {
    path:'ahorcado',
    loadComponent:() => import('./juegos/ahorcado/ahorcado.component').then(m => m.AhorcadoComponent)  
  },
  { path: 'historial', component: HistorialPartidasComponent }, 
  {
    path:'mayor-menor',
    loadComponent:() => import('./juegos/mayor-menor/mayor-menor.component').then(m => m.MayorMenorComponent)
  },
  { path: 'preguntados', 
    loadComponent:() => import('./juegos/preguntados/preguntados.component').then(m => m.PreguntadosComponent)
   },
  { path: 'colores-prohibidos', 
    loadComponent:() => import('./juegos/colores-prohibidos/colores-prohibidos.component').then(m => m.ColoresProhibidosComponent)
   },
  
  { path: '**', redirectTo: 'home' }  
];
