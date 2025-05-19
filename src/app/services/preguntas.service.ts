import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface pregunta{
  id:number;
  pregunta:string;
  categoria: {nombre: string};
  opciones : string[];
  respuestaCorrecta: string;
}
@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private jsonUrl='assets/json/preguntados.json';

  constructor(private http:HttpClient) { }

  obtenerPreguntas():Observable<pregunta[]>{
    return this.http.get<pregunta[]>(this.jsonUrl);
  }
}
