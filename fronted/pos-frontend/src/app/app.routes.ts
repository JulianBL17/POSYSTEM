import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ProductosComponent } from './pages/productos/productos';
import { UsuariosComponent } from './pages/usuarios/usuarios';
import { VentasComponent } from './pages/ventas/ventas';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {  
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',  
    component: DashboardComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'ventas',
    component: VentasComponent
  }
];