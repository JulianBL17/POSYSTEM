import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Usuarios, Usuario } from '../../services/usuarios';

@Component({
  selector: 'app-usuarios',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  usuario: Usuario = {
    nombre: '',
    email: '',
    rol: '',
    password: ''
  };

  editando = false;
  usuarioEditandoId?: number;

  constructor(
    private usuariosService: Usuarios
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (error) => {
        console.error('Error cargando usuarios:', error);
      }
    });
  }

  guardarUsuario(): void {

    if (!this.usuario.nombre || !this.usuario.email) {
      alert('Completa los datos del usuario.');
      return;
    }

    if (this.editando && this.usuarioEditandoId !== undefined) {

      this.usuariosService
        .actualizarUsuario(
          this.usuarioEditandoId,
          this.usuario
        )
        .subscribe({
          next: () => {
            alert('Usuario actualizado correctamente.');
            this.limpiarFormulario();
            this.cargarUsuarios();
          },
          error: (error) => {
            console.error(error);
            alert('Error actualizando usuario.');
          }
        });

    } else {

      this.usuariosService
        .crearUsuario(this.usuario)
        .subscribe({
          next: () => {
            alert('Usuario creado correctamente.');
            this.limpiarFormulario();
            this.cargarUsuarios();
          },
          error: (error) => {
            console.error(error);
            alert('Error creando usuario.');
          }
        });
    }
  }

  editarUsuario(usuario: Usuario): void {

    this.usuario = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      password: usuario.password
    };

    this.editando = true;
    this.usuarioEditandoId = usuario.id;
  }

  eliminarUsuario(id?: number): void {

    if (id === undefined) return;

    if (!confirm('¿Desea eliminar este usuario?')) return;

    this.usuariosService
      .eliminarUsuario(id)
      .subscribe({
        next: () => {
          alert('Usuario eliminado correctamente.');
          this.cargarUsuarios();
        },
        error: (error) => {
          console.error(error);
          alert('Error eliminando usuario.');
        }
      });
  }

  limpiarFormulario(): void {

    this.usuario = {
      nombre: '',
      email: '',
      rol: '',
      password: ''
    };

    this.editando = false;
    this.usuarioEditandoId = undefined;
  }
}