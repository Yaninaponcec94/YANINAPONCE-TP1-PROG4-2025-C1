import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('email') emailRef!: ElementRef;
  @ViewChild('password') passwordRef!: ElementRef;

  constructor(private router: Router, private authService: AuthService) {}

  async onSubmit(event: Event) {
    event.preventDefault();

    const email = this.emailRef.nativeElement.value;
    const password = this.passwordRef.nativeElement.value;

    try {
      const user = await this.authService.login(email, password);
      console.log('Usuario logueado:', user);
      localStorage.setItem('logueado', 'true');
      this.router.navigate(['/home']);
    } catch (error: any) {
      alert(error.message || 'Error al iniciar sesión');
    }
  }
}
