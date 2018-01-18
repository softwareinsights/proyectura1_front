import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {PermisosComponent } from './permisos.component';
import {PermisosTableComponent } from './components/permisos-table/permisos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PermisosComponent,
    children: [
      { path: 'permisos-table', component: PermisosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
