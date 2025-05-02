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
    { nombre: 'Ahorcado', colorHover: 'celeste', imagen: 'assets/img/ahorcado00.gif'},
    { nombre: 'Mayor o menor',  colorHover: 'verde', imagen: 'assets/img/mom.jpg'},
    { nombre: 'Preguntados', colorHover: 'violeta', imagen: 'assets/img/preg1.jpg'},
    { nombre: 'Juego propio',  colorHover: 'rosa', imagen: 'assets/img/preg2.png'}
  ];
  
}
