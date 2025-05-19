import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';

@Injectable({
  providedIn: 'root'
})
export class ColoresProhibidosService {

  constructor() {}

  async guardarPartidaColores(userId: string, puntaje: number, rondaMaxima: number, gano: boolean, fecha: Date) {
    try {
      const { error } = await supabase
        .from('partidas_colores_prohibidos')
        .insert([
          {
            user_id: userId,
            puntaje: puntaje,
            ronda_maxima: rondaMaxima,
            gano: gano,
            fecha_partida: fecha
          }
        ]);

      if (error) {
        console.error('❌ Supabase insert error:', error.message);
        throw error;
      }

      console.log('✅ Partida de Colores Prohibidos guardada');
    } catch (error) {
      console.error('❌ Error al guardar la partida de Colores Prohibidos:', error);
    }
  }

  async obtenerPartidasColores(user_id: string) {
    try {
      const { data, error } = await supabase
        .from('partidas_colores_prohibidos')
        .select('*')
        .eq('user_id', user_id)

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('❌ Error al obtener partidas de Colores Prohibidos:', error);
      return [];
    }
  }

}
