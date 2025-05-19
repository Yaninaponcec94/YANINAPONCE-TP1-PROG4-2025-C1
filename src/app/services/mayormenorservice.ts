import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';

@Injectable({
  providedIn: 'root'
})
export class MayorMenorService {

  constructor() {}

  async guardarPartidaMayorMenor(userId: string, puntaje: number, resultado: 'ganaste' | 'perdiste', fecha: Date) {
    try {
      const { error } = await supabase
        .from('partidas_mayor_menor')
        .insert([
          {
            user_id: userId,
            puntaje: puntaje,
            resultado: resultado,
            fecha: fecha
          }
        ]);

      if (error) {
        console.error('Supabase error:', error.message);
        throw error;
      }

      console.log('✅ Partida guardada en Supabase');
    } catch (error) {
      console.error('❌ Error al guardar la partida:', error);
    }
  }

  async obtenerPartidasUsuario(userId: string) {
    try {
      const { data, error } = await supabase
        .from('partidas_mayor_menor')
        .select('*')
        .eq('user_id', userId)
        .order('fecha', { ascending: false });
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error('Error al obtener partidas:', error);
      return [];
    }
  }
  
}
