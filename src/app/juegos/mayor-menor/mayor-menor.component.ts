import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MayorMenorService } from '../../services/mayormenorservice';
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent {
  mazo: { valor: number, imagen: string }[] = [];
  cartaActual: any;
  cartaSiguiente: any;
  puntaje: number = 0;
  mensaje: string = '';
  juegoTerminado: boolean = false;
  mostrarSiguiente: boolean = false;
  mostrarGanaste:boolean = false;

  constructor(
    private mayorMenorService: MayorMenorService,
    private authService: AuthService
  ) {
    this.inicializarMazo();
    this.repartirCarta();
  }

  inicializarMazo() {
    this.mazo = [];
    let cartaNumero = 1;
    for (let i = 0; i < 4; i++) {
      for (let valor = 1; valor <= 13; valor++) {
        this.mazo.push({
          valor: valor,
          imagen: `assets/mayor-menor/carta${cartaNumero}.jpg`
        });
        cartaNumero++;
      }
    }
    this.mazo = this.barajar(this.mazo);
  }

  barajar(mazo: any[]) {
    return mazo.sort(() => Math.random() - 0.5);
  }

  repartirCarta() {
    this.cartaActual = this.mazo.shift();
  }

  obtenerCartaAleatoria() {
    return this.mazo.shift() || null;
  }

 async jugar(eleccion: 'mayor' | 'menor' | 'igual') {
    if (!this.cartaActual) return;

    this.cartaSiguiente = this.obtenerCartaAleatoria();
    if (!this.cartaSiguiente) {
      this.mensaje = '¡No hay más cartas!';
      this.juegoTerminado = true;
      await this.guardarResultado('ganaste');
      return;
    }

    this.mostrarSiguiente = true;

    const valorActual = this.cartaActual.valor;
    const valorSiguiente = this.cartaSiguiente.valor;

    const acerto =
      (eleccion === 'mayor' && valorSiguiente > valorActual) ||
      (eleccion === 'menor' && valorSiguiente < valorActual) ||
      (eleccion === 'igual' && valorSiguiente === valorActual);

    if (acerto) {
      this.puntaje++;

      if (this.puntaje >= 10) { 
        this.mostrarGanaste = true;
        this.juegoTerminado = true;  
        this.cartaSiguiente = null;
        await this.guardarResultado('ganaste');
        this.lanzarConfeti();
        return;
      }

      setTimeout(() => {
        this.cartaActual = this.cartaSiguiente;
        this.cartaSiguiente = null;
        this.mostrarSiguiente = false;
      }, 1000);
    } else {
      this.mensaje = '¡Fallaste! Fin del juego.';
      this.juegoTerminado = true;
      await this.guardarResultado('perdiste');
    }
}


  async guardarResultado(resultado: 'ganaste' | 'perdiste') {
    try {
      const user = await this.authService.obtenerUsuarioActual();
      if (!user) {
        console.log('Usuario no autenticado');
        return;
      }

      const fecha = new Date();
      console.log('Insertando:', {
        user_id: user.id,
        puntaje: this.puntaje,
        resultado: resultado,
        fecha: fecha
      });

      await this.mayorMenorService.guardarPartidaMayorMenor(
        user.id,
        this.puntaje,
        resultado,
        fecha
      );
          // Actualizo historial después de guardar
    this.partidas = await this.mayorMenorService.obtenerPartidasUsuario(user.id);
    } catch (error) {
      console.error('Error al guardar el resultado del juego Mayor o Menor:', error);
    }
  }
  partidas: any[] = [];

  async ngOnInit() {
    const user = await this.authService.obtenerUsuarioActual();
    if (user) {
      this.partidas = await this.mayorMenorService.obtenerPartidasUsuario(user.id);
    }
  }
  lanzarConfeti() {
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 40,
    spread: 360,
    ticks: 100,
    zIndex: 9999,
    colors: ['#ff0', '#0ff', '#f0f', '#0f0', '#00f', '#f00'] 
  };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    confetti({
      ...defaults,
      particleCount: 80,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      }
    });
  }, 250);
}



  reiniciarJuego() {
    this.puntaje = 0;
    this.mensaje = '';
    this.juegoTerminado = false;
    this.mostrarSiguiente = false;
    this.inicializarMazo();
    this.repartirCarta();
    this.cartaSiguiente = null;
  }

  cerrarModalGanaste() {
  this.mostrarGanaste = false;
}

}
