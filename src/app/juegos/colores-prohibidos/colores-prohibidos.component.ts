import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColoresProhibidosService } from '../../services/coloresprohibidos.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-colores-prohibidos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './colores-prohibidos.component.html',
  styleUrl: './colores-prohibidos.component.css'
})
export class ColoresProhibidosComponent implements OnDestroy,OnInit {

  rondas = [
    { tiempo: 10, cantidadColores: 8 },
    { tiempo: 8, cantidadColores: 10 },
    { tiempo: 7, cantidadColores: 12 },
    { tiempo: 6, cantidadColores: 14 },
  ];

  todosLosColores = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown','black','white','grey','aqua','blueviolet','beige'];
  coloresDisponibles: string[] = [];
  colorProhibido: string = '';
  coloresClickeados: Set<string> = new Set();

  rondaActual: number = 0;
  tiempoRestante: number = 0;
  
  temporizadorId: any;

  juegoTerminado: boolean = false;
  gano: boolean = false;
  mensaje: string = '';
  puntaje: number = 0;

  partidas: { puntaje: number; ronda: number; gano: boolean; fecha: Date }[] = [];

  constructor(
    private coloresService: ColoresProhibidosService,
    private authService: AuthService
  ) {
    this.iniciarRonda();
  }

  iniciarRonda(): void {
    const ronda = this.rondas[this.rondaActual];

    // Generar colores únicos para la ronda
    this.coloresDisponibles = this.shuffleArray(this.todosLosColores).slice(0, ronda.cantidadColores);

    // Elegir color prohibido entre esos
    this.colorProhibido = this.obtenerColorAleatorio(this.coloresDisponibles);
    this.coloresClickeados.clear();

    this.tiempoRestante = ronda.tiempo;
    this.iniciarTemporizador();

    this.mensaje = '';
    this.juegoTerminado = false;
  }

  seleccionarColor(color: string): void {
    if (this.juegoTerminado || this.coloresClickeados.has(color)) return;

    if (color === this.colorProhibido) {
      this.mensaje = '💥 ¡Perdiste! Tocaste el color prohibido.';
      this.finalizarJuego(false);
    } else {
      this.coloresClickeados.add(color);
      this.puntaje += 10;

      const coloresSeguros = this.coloresDisponibles.filter(c => c !== this.colorProhibido);
      if (this.coloresClickeados.size === coloresSeguros.length) {
        // Ronda superada
        clearInterval(this.temporizadorId);
        if (this.rondaActual < this.rondas.length - 1) {
          this.rondaActual++;
          this.iniciarRonda();
        } else {
          this.finalizarJuego(true); // Ganó todas las rondas
        }
      }
    }
  }

  iniciarTemporizador(): void {
    clearInterval(this.temporizadorId);
    this.temporizadorId = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante <= 0) {
        this.mensaje = '⏱️ ¡Se acabó el tiempo!';
        this.finalizarJuego(false);
      }
    }, 1000);
  }

  async finalizarJuego(gano: boolean): Promise<void> {
  clearInterval(this.temporizadorId);
  this.juegoTerminado = true;
  this.gano = gano;

  const partidaActual = {
    puntaje: this.puntaje,
    ronda: this.rondaActual + 1,
    gano: this.gano,
    fecha: new Date()
  };

  this.partidas.push(partidaActual);

  const user = await this.authService.obtenerUsuarioActual();
  if (user) {
    await this.coloresService.guardarPartidaColores(
      user.id,
      this.puntaje,
      this.rondaActual + 1,
      gano,
      partidaActual.fecha
    );
  }
  }
  async ngOnInit(): Promise<void> {
    const user = await this.authService.obtenerUsuarioActual();
    if (user) {
      const historial = await this.coloresService.obtenerPartidasColores(user.id);
      this.partidas = historial;
    }
  }

  reiniciarJuego(): void {
    this.rondaActual = 0;
    this.puntaje = 0;
    this.iniciarRonda();
  }

  obtenerColorAleatorio(colores: string[]): string {
    const index = Math.floor(Math.random() * colores.length);
    return colores[index];
  }

  shuffleArray(array: any[]): any[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  ngOnDestroy(): void {
    clearInterval(this.temporizadorId);
  }
}
