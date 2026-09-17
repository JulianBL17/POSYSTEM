import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  email = '';
  password = '';

  iniciarSesion(): void {
    console.log('Correo:', this.email);
    console.log('Contraseña:', this.password);

    if (!this.email || !this.password) {
      alert('Ingrese el correo y la contraseña.');
      return;
    }

    alert('Inicio de sesión correcto');
  }
}