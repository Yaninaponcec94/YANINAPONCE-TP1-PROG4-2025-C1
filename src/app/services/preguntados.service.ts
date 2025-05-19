import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class PreguntadosService {
  constructor(private authService: AuthService) {}

  // GUARDAR UNA PARTIDA
  async guardarPartida(puntaje: number, correctas: number, totales: number) {
    const user = await this.authService.obtenerUsuarioActual();

    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const { data, error } = await supabase.from('partidas_preguntados').insert([
      {
        user_id: user.id,
        puntaje,
        respuestas_correctas: correctas,
        respuestas_totales: totales,
        fecha: new Date(),
      },
    ]);

    if (error) throw error;

    return data;
  }

  // OBTENER PARTIDAS DEL USUARIO
  async obtenerPartidasUsuario() {
    const user = await this.authService.obtenerUsuarioActual();

    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const { data, error } = await supabase
      .from('partidas_preguntados')
      .select('*')
      .eq('user_id', user.id)
      .order('fecha', { ascending: false });

    if (error) throw error;

    return data;
  }
}
