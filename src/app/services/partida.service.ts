import { Injectable } from "@angular/core";
import { supabase } from "../supabase.client";


@Injectable({
    providedIn:'root'
})

export class PartidaService{
  async guardarPartida(
    user_id: string,
    palabra: string,
    letras_adivinadas: string[],
    resultado: string,
    fecha: Date
  ) {
    console.log('Insertando en Supabase...');
    const { error } = await supabase
      .from('partidas_ahorcado')
      .insert([
        {
          user_id,
          palabra,
          letras_adivinadas: letras_adivinadas.join(''),
          resultado,
          fecha,
        },
      ]);
  
    if (error) {
      console.error('Error de Supabase:', error.message);
      throw error;
    }
  }
  

    async obtenerPartidasDelUsuario(user_id:string){
        const{ data, error }= await supabase
        .from('partidas_ahorcado')
        .select('*')
        .eq('user_id', user_id)
        .order('fecha',{ ascending: false});

        if(error)throw error;
        return data;

    }
    async obtenerPartidasPorUsuario(user_id: string) {
        const { data, error } = await supabase
          .from('partidas_ahorcado')
          .select('*')
          .eq('user_id', user_id)
          .order('fecha', { ascending: false });
      
        if (error) throw error;
      
        return data;
      }
      
}