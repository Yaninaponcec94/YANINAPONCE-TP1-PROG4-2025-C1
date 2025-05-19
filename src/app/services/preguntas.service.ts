import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import preguntasData from '../json/preguntados.json';

export interface pregunta {
  id: number;
  pregunta: string;
  categoria: { nombre: string };
  opciones: string[];
  respuestaCorrecta: string;
}

@Injectable({
  providedIn: 'root',
})
export class PreguntasService {
  constructor() {}

  obtenerPreguntas(): Observable<pregunta[]> {
    return of(preguntasData);
  }
}


