import { Component, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('usuario') usuarioRef!: ElementRef;
  @ViewChild('password') passwordRef!: ElementRef;

  constructor(private router: Router,private authService: AuthService) {}

  autocompletar() {
    this.usuarioRef.nativeElement.value = 'usuario123';
    this.passwordRef.nativeElement.value = 'clave123';
  }

  async onSubmit(event:Event){
    event.preventDefault();

    const usuario = this.usuarioRef.nativeElement.value;
    const password = this.passwordRef.nativeElement.value;

    try{
      const user = await this.authService.login(usuario,password);
      console.log('usuario logueada: ', user);
      localStorage.setItem('logueado', 'true');
      this.router.navigate(['/home']);

    }catch(error:any){
      alert(error.message || 'error al iniciar sesion');
    }
  }
}
