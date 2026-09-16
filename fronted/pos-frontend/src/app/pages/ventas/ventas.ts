import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ventas, Venta } from '../../services/ventas';

@Component({
  selector: 'app-ventas',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ventas.html',
  styleUrl: './ventas.scss'
})
export class VentasComponent implements OnInit {

  ventas: Venta[] = [];

  venta: Venta = {
    total: 0,
    metodoPago: ''
  };

  constructor(
    private ventasService: Ventas
  ) {}

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas(): void {

    this.ventasService
      .obtenerVentas()
      .subscribe({
        next: (data) => {
          this.ventas = data;
        },
        error: (error) => {
          console.error('Error cargando ventas:', error);
        }
      });
  }

  guardarVenta(): void {

    if (this.venta.total <= 0 || !this.venta.metodoPago) {
      alert('Completa los datos de la venta.');
      return;
    }

    this.ventasService
      .crearVenta(this.venta)
      .subscribe({
        next: () => {
          alert('Venta registrada correctamente.');

          this.venta = {
            total: 0,
            metodoPago: ''
          };

          this.cargarVentas();
        },
        error: (error) => {
          console.error('Error creando venta:', error);
          alert('Error registrando la venta.');
        }
      });
  }
}