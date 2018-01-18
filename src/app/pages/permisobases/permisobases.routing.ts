import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {PermisobasesComponent } from './permisobases.component';
import {PermisobasesTableComponent } from './components/permisobases-table/permisobases-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PermisobasesComponent,
    children: [
      { path: 'permisobases-table', component: PermisobasesTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
