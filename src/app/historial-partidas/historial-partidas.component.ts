import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { PartidaService } from '../services/partida.service';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-historial-partidas',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './historial-partidas.component.html',
  styleUrl: './historial-partidas.component.css'
})
export class HistorialPartidasComponent implements OnInit {
  partidas: any[] = [];

  constructor(
    private partidaService: PartidaService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const user = await this.authService.obtenerUsuarioActual();
  
      if (!user) {
        return; // o redirigís al login
      }
  
      this.partidas = await this.partidaService.obtenerPartidasPorUsuario(user.id);
    } catch (error) {
      console.error('Error al cargar partidas:', error);
    }
  }
  volverAJugar() {
    // Cambiá esta ruta por la que corresponda si es otro juego
    this.router.navigate(['/ahorcado']);
}
}