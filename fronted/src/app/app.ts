import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    @if (router.url !== '/login') {
      <header class="pos-navbar">
        <nav class="navbar navbar-expand">
          <div class="container-fluid pos-navbar-inner px-3 px-lg-4">
            <a class="pos-brand" routerLink="/ventas" aria-label="POS, ir a ventas">
              <span class="pos-brand-mark"><i class="bi bi-shop"></i></span>
              <span>
                POS
                <span class="pos-brand-caption">Sistema de ventas</span>
              </span>
            </a>

            <div class="navbar-nav pos-nav ms-auto flex-row gap-1">
              <a class="pos-nav-link nav-link px-3 py-2" routerLink="/ventas" routerLinkActive="active">
                <i class="bi bi-receipt"></i> Ventas
              </a>
              <a class="pos-nav-link nav-link px-3 py-2" routerLink="/productos" routerLinkActive="active">
                <i class="bi bi-box-seam"></i> Productos
              </a>
              <a class="pos-nav-link nav-link px-3 py-2" routerLink="/usuarios" routerLinkActive="active">
                <i class="bi bi-people"></i> Usuarios
              </a>
            </div>
          </div>
        </nav>
      </header>
    }
    <router-outlet />
  `
})
export class App {
  constructor(public router: Router) {}
}
