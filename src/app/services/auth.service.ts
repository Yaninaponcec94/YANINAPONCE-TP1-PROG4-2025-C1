import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // REGISTRO
  async registrar(nombre_usuario: string, email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // Después del registro, insertamos en nuestra tabla `usuario`
    const insertResult = await supabase.from('usuario').insert([
      {
        id: data.user?.id,
        nombre_usuario,
        email,
        password,
        created_at: new Date(),
      },
    ]);

    if (insertResult.error) {
      throw insertResult.error;
    }

    return insertResult.data;
  }

  // LOGIN
async login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  return data.user;
}


  // OBTENER SESIÓN ACTUAL
  async obtenerUsuarioActual() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      return null;
    }

    return session.user;
  }

  // CERRAR SESIÓN
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  }
}

