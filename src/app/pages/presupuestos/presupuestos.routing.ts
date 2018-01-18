import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {PresupuestosComponent } from './presupuestos.component';
import {PresupuestosTableComponent } from './components/presupuestos-table/presupuestos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PresupuestosComponent,
    children: [
      { path: 'presupuestos-table', component: PresupuestosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
