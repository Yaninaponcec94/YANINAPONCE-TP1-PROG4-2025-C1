import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';

@Injectable({
  providedIn: 'root',
})

export class ChatService {
  constructor() {}

  // Insertar un mensaje
  async enviarMensaje(userId: string, texto: string) {
    const { data, error } = await supabase.from('chat').insert([
      {
        user_id: userId,
        mensajes: texto,
        fecha_envio: new Date().toISOString(),
      },
    ]);

    if (error) throw error;
    return data;
  }

  // Leer todos los mensajes
  async obtenerMensajes() {
    const { data, error } = await supabase
      .from('chat')
      .select(' user_id, mensajes, fecha_envio')
      .order('fecha_envio', { ascending: true });

    if (error) throw error;
    return data;
  }
}
