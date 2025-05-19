import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PartidaService } from '../../services/partida.service';


@Component({
  selector: 'app-ahorcado',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})

export class AhorcadoComponent {

  constructor(
    private authService: AuthService,
    private partidaService: PartidaService
  ) {
    console.log('AhorcadoComponent inicializado');
    this.inicializarJuego(); 
  }
  
  palabras: string[] = ['angular', 'typescript', 'component', 'servicio'];
  palabraSecreta: string = '';
  alfabeto: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  letrasAdivinadas: (string | null)[] = [];
  intentosRestantes: number = 11;

  imagenesAhorcado: string[] = [
    'assets/ahorcado/0.png',
    'assets/ahorcado/1.png',
    'assets/ahorcado/2.png',
    'assets/ahorcado/3.png',
    'assets/ahorcado/4.png',
    'assets/ahorcado/5.png',
    'assets/ahorcado/6.png',
    'assets/ahorcado/7.png',
    'assets/ahorcado/8.png',
    'assets/ahorcado/9.png',
    'assets/ahorcado/10.png'
  ];

  imagenAhorcado: string = this.imagenesAhorcado[0];
  gameOver: boolean = false;
  mensajeFinJuego: string = '';
  juegoNombre: string = 'Ahorcado';

  inicializarJuego() {
    this.palabraSecreta = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.letrasAdivinadas = Array(this.palabraSecreta.length).fill(null);
    this.intentosRestantes = 11;
    this.imagenAhorcado = this.imagenesAhorcado[0];
    this.gameOver = false;
    this.mensajeFinJuego = '';
  }

  adivinarLetra(letra: string) {
    if (this.gameOver) return;

    let letraCorrecta = false;
    for (let i = 0; i < this.palabraSecreta.length; i++) {
      if (this.palabraSecreta[i] === letra) {
        this.letrasAdivinadas[i] = letra;
        letraCorrecta = true;
      }
    }

    if (!letraCorrecta) {
      this.intentosRestantes--;
      this.imagenAhorcado = this.imagenesAhorcado[10 - this.intentosRestantes];
    }

    this.verificarFinJuego();
  }

  async verificarFinJuego() {
    if (this.letrasAdivinadas.join('') === this.palabraSecreta) {
      this.gameOver = true;
      this.mensajeFinJuego = 'FELICIDADES! Has ganado';
      await this.guardarPartida('ganaste');
    } else if (this.intentosRestantes === 0) {
      this.gameOver = true;
      this.mensajeFinJuego = 'Lo siento! Has perdido';
      await this.guardarPartida('perdiste');
    }
  }

  async guardarPartida(resultado: 'ganaste' | 'perdiste') {
    try {
      const user = await this.authService.obtenerUsuarioActual();
      if (!user) return;

      const fecha = new Date();
      const letras = this.letrasAdivinadas.map(l => l ?? '_');

      await this.partidaService.guardarPartida(
        user.id,
        this.palabraSecreta,
        letras,
        resultado,
        fecha
      );
    } catch (error) {
      console.error('Error al guardar la partida:', error);
    }
  }

  reiniciarJuego() {
    this.inicializarJuego(); 
  }
}
