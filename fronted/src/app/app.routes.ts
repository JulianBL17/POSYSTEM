import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { ProductosComponent } from './pages/productos/productos';
import { UsuariosComponent } from './pages/usuarios/usuarios';
import { VentasComponent } from './pages/ventas/ventas';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'productos', component: ProductosComponent },
	{ path: 'usuarios', component: UsuariosComponent },
	{ path: 'ventas', component: VentasComponent },
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: '**', redirectTo: 'login' }
];