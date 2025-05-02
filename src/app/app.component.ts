import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'sala de juegos';

  constructor(private router: Router) {}

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  get estaLogueado(): boolean {
    return this.isLocalStorageAvailable() && localStorage.getItem('logueado') === 'true';
  }

  isLoginRegistroPage(): boolean {
    return this.router.url === '/login' || this.router.url ==='/registro';
  }

  onLoginClick() {
    if (this.isLocalStorageAvailable()) {
      if (this.estaLogueado) {
        const confirmar = confirm('¿Estás seguro que deseas cerrar sesión?');
        if (confirmar) {
          localStorage.removeItem('logueado');
          this.router.navigate(['/home']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      console.warn('⚠️ localStorage no está disponible.');
    }
  }
  

  isQuienSoyPage():boolean{
    return this.router.url=== '/quien-soy';
  }

}

