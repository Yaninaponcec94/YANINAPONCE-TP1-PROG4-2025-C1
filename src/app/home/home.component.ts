import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  onLoginClick() {
    this.router.navigate(['/login']);  
  }
  title = 'Mi Sala de Juegos';

  juegos = [
    { nombre: 'Ahorcado', colorHover: 'celeste', imagen: 'assets/img/ahorcado00.gif', ruta:'/ahorcado'},
    { nombre: 'Mayor o menor',  colorHover: 'verde', imagen: 'assets/img/mom.jpg', ruta:'mayor-menor'},
    { nombre: 'Preguntados', colorHover: 'violeta', imagen: 'assets/img/preg1.jpg', ruta:'/preguntados'},
    { nombre: 'Colores Prohibidos',  colorHover: 'rosa', imagen: 'assets/img/juego-cp.jpg', ruta:'/colores-prohibidos'}
  ];
  
  jugar(juegoNombre:string){
    const estaLogueado=localStorage.getItem('logueado')==='true';

    if(estaLogueado){
      switch(juegoNombre){
        case 'Ahorcado':
          this.router.navigate(['/ahorcado']);
          break;
        case 'Mayor o menor':
          this.router.navigate(['/mayor-menor']);
          break;
        case 'Preguntados':
          this.router.navigate(['/preguntados']);
          break;
          case 'Colores Prohibidos':
          this.router.navigate(['/colores-prohibidos']);
          break;
          default:
            alert('juego no disponible');
      }
    } else{
      alert('debes iniciar sesion para jugar');
      this.router.navigate(['/login']);
    }
  }
}
