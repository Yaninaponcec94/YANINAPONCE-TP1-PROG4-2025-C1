import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { ButtonComponent } from './chat/button/button.component';
import { supabase } from './supabase.client';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  
  title = 'sala de Juegos';
  usuarioActual: any = null;
  mensajes: { mensajes: string; fecha_envio: string; propio: boolean }[] = [];

  estaLogueado = false;
  paginasSinLayout = ['/login', '/registro', '/ahorcado', '/mayor-menor', '/colores-prohibidos','/preguntados'];

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.init();
  }

  async init() {
    this.usuarioActual = await this.authService.obtenerUsuarioActual();
    this.estaLogueado = !!this.usuarioActual;
    if (this.usuarioActual) {
      await this.cargarMensajes();
      supabase
  .channel('mensajes-realtime')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'chat'
    },
    (payload) => {
      const nuevoMensaje = payload.new;

if (nuevoMensaje['user_id'] === this.usuarioActual.id) return;

this.mensajes = [
  ...this.mensajes,
  {
    mensajes: nuevoMensaje['mensajes'],
    fecha_envio: nuevoMensaje['fecha_envio'],
    propio: false
  }
];

    }
  )
  .subscribe();

    }
  }

  isPaginaSinLayout(): boolean {
    return this.paginasSinLayout.includes(this.router.url);
  }

  isQuienSoyPage(): boolean {
    return this.router.url === '/quien-soy';
  }

  onLoginClick() {
    if (this.estaLogueado) {
      this.estaLogueado = false;
      this.usuarioActual = null;
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  async cargarMensajes() {
    const { data, error } = await supabase
      .from('chat')
      .select('*')
      .order('fecha_envio', { ascending: true });

    if (error) {
      console.error('Error al obtener mensajes:', error);
      return;
    }

    this.mensajes = [...data.map(m => ({
  mensajes: m.mensajes,
  fecha_envio: m.fecha_envio,
  propio: m.user_id === this.usuarioActual.id
}))];


console.log(this.mensajes);


  }

  async agregarMensaje(texto: string) {
    if (!this.usuarioActual) return;

    const { error } = await supabase.from('chat').insert([
      {
        mensajes: texto,
        fecha_envio: new Date().toISOString(),
        user_id: this.usuarioActual.id
      }
    ]);

    if (error) {
      console.error('Error al enviar mensaje:', error);
      return;
    }
    this.mensajes = [
      ...this.mensajes,
      {
          mensajes: texto,   // singular, consistente con el array
          fecha_envio: new Date().toLocaleString(),
          propio: true
        }
      ];
      console.log('mensajes asignados en AppComponent:', this.mensajes);
      setTimeout(() => {
        console.log('mensajes 1 segundo después:', this.mensajes);
      }, 1000);


  }
}
