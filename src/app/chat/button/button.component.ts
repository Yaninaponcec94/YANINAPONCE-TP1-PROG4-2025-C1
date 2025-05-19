import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  SimpleChanges,
  OnChanges,
  AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Mensaje {
  mensajes: string;
  fecha_envio: string;
  propio: boolean;  
}

@Component({
  selector: 'app-chat-button',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})

export class ButtonComponent implements OnChanges, AfterViewChecked{
   @Input() mensajes: Mensaje[] = []; 
  @Output() enviar = new EventEmitter<string>(); 
   @ViewChild('contenedorMensajes') contenedorMensajes!: ElementRef;
  nuevoMensaje = '';
  abierto = false;


  ngOnChanges(changes: SimpleChanges) {
  if (changes['mensajes']) {
    console.log('mensajes en ButtonComponent:', this.mensajes);
    }
  }


  toggleChat(event: Event) {
    event.stopPropagation();
    this.abierto = !this.abierto;
  }

  enviarMensaje() {
    const texto = this.nuevoMensaje.trim();
    if (!texto) return;

    this.enviar.emit(texto);
    this.nuevoMensaje = '';
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
  try {
    const container = this.contenedorMensajes.nativeElement;
    container.scrollTop = container.scrollHeight + 20; 
  } catch(err) { }
}
}
