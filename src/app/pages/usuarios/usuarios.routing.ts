import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {UsuariosComponent } from './usuarios.component';
import {UsuariosTableComponent } from './components/usuarios-table/usuarios-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    children: [
      { path: 'usuarios-table', component: UsuariosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
