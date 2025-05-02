import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'; // Importante
import { Router } from '@angular/router'; // Para redireccionar

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router 
  ) {
    this.registroForm = this.fb.group({
      nombre_usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    { validators: this.passwordsIguales });
  }

  passwordsIguales(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { noCoinciden: true };
  }

  async registrar() {
    if (this.registroForm.valid) {
      const { nombre_usuario, email, password } = this.registroForm.value;
  
      console.log('Datos a registrar:', { nombre_usuario, email, password });  // Verificación de datos
  
      try {
        await this.authService.registrar(nombre_usuario, email, password);
        alert('¡Usuario registrado correctamente!');
        this.router.navigate(['/home']);
      } catch (error: any) {
        alert('Error al registrar: ' + error.message);
      }
    }
  }
  
  
}
