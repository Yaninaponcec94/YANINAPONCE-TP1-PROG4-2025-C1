
import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  async registrar(nombre_usuario: string, email: string, password: string) {
    const { data, error } = await supabase
      .from('usuario')
      .insert([{ nombre_usuario, email, password }]);

    if (error) {
      throw error;
    }
    
    return data;
  }

  async login(nombre_usuario: string, password: string){
    // Atajo para testeo
  if (nombre_usuario === 'usuario123' && password === 'clave123') {
    return { nombre_usuario: 'usuario123', email: 'falso@correo.com' };
  }

    //supabase
    const { data, error } = await supabase
    .from('usuario')
    .select('*')
    .eq('nombre_usuario', nombre_usuario)
    .eq('password', password)
    .single();

    if(error || !data){
      throw new Error('usuario o contraseña incorrectos');
    }

    return data;
  }
}
