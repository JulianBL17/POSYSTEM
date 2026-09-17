import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Productos,
  Producto
} from '../../services/productos';

@Component({
  selector: 'app-productos',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];

  producto: Producto = {
    nombre: '',
    precio: 0,
    stock: 0,
    categoria: ''
  };

  editando = false;
  productoEditandoId?: number;

  constructor(
    private productosService: Productos
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productosService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error cargando productos:', error);
        console.error('No se pudieron cargar los productos. Verifica que Spring Boot esté ejecutándose.');
      }
    });
  }

  guardarProducto(): void {

    if (!this.producto.nombre || this.producto.precio <= 0) {
      console.error('Completa correctamente los datos del producto.');
      return;
    }

    // ACTUALIZAR
    if (this.editando && this.productoEditandoId !== undefined) {

      this.productosService
        .actualizarProducto(
          this.productoEditandoId,
          this.producto
        )
        .subscribe({
          next: () => {
            alert('Producto actualizado correctamente.');
            this.limpiarFormulario();
            this.cargarProductos();
          },
          error: (error) => {
            console.error('Error actualizando producto:', error);
            console.error('Error actualizando el producto.');
          }
        });

    } else {

      // CREAR
      this.productosService
        .crearProducto(this.producto)
        .subscribe({
          next: () => {
            console.error('Producto creado correctamente.');
            this.limpiarFormulario();
            this.cargarProductos();
          },
          error: (error) => {
            console.error('Error creando producto:', error);
            console.error('Error creando el producto.');
          }
        });
    }
  }

  editarProducto(producto: Producto): void {

    this.producto = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria
    };

    this.editando = true;
    this.productoEditandoId = producto.id;
  }

  eliminarProducto(id?: number): void {

    if (id === undefined) {
      return;
    }

    if (!confirm('¿Está seguro de eliminar este producto?')) {
      return;
    }

    this.productosService
      .eliminarProducto(id)
      .subscribe({
        next: () => {
          alert('Producto eliminado correctamente.');
          this.cargarProductos();
        },
        error: (error) => {
          console.error('Error eliminando producto:', error);
          alert('Error eliminando el producto.');
        }
      });
  }

  limpiarFormulario(): void {

    this.producto = {
      nombre: '',
      precio: 0,
      stock: 0,
      categoria: ''
    };

    this.editando = false;
    this.productoEditandoId = undefined;
  }
}