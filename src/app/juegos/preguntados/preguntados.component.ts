import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { pregunta, PreguntasService } from '../../services/preguntas.service';
import { PreguntadosService } from '../../services/preguntados.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-preguntados',
  standalone:true,
  imports: [CommonModule,RouterModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit {
  preguntas: pregunta[] = [];
  preguntaActualIndex = 0;
  puntaje = 0;
  juegoTerminado = false;

  constructor(
    private preguntasService: PreguntasService,
    private preguntadosService:PreguntadosService
  ) {}

  ngOnInit() {
  this.preguntasService.obtenerPreguntas().subscribe(data => {
    console.log('Preguntas cargadas:', data); // 👈 añadí esto
    this.cargarPreguntasAleatorias(data);
  });
}

  cargarPreguntasAleatorias(todasPreguntas: pregunta[]) {
    const copiaPreguntas = [...todasPreguntas];
    this.preguntas = [];
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * copiaPreguntas.length);
      this.preguntas.push(copiaPreguntas.splice(randomIndex, 1)[0]);
    }
  }

  responder(opcion: string) {
  const preguntaActual = this.preguntas[this.preguntaActualIndex];

  // Sumar puntaje si la opción es correcta
  if (opcion === preguntaActual.respuestaCorrecta) {
    this.puntaje += 10;
  }

  // Avanzar o terminar el juego
  if (this.preguntaActualIndex < this.preguntas.length - 1) {
    this.preguntaActualIndex++;
  } else {
    this.juegoTerminado = true;
    localStorage.setItem('puntajePreguntados', this.puntaje.toString());

    const correctas = this.puntaje / 10;
    const totales = this.preguntas.length;

    this.preguntadosService.guardarPartida(this.puntaje, correctas, totales)
      .then(() => {
        console.log('Partida guardada exitosamente');
      })
      .catch(err => {
        console.error('Error al guardar partida:', err.message);
      });
  }
}

  reiniciar() {
    this.puntaje = 0;
    this.preguntaActualIndex = 0;
    this.juegoTerminado = false;

    this.preguntasService.obtenerPreguntas().subscribe(data => {
      this.cargarPreguntasAleatorias(data);
    });
  }
}