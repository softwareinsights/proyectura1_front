import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {EstatuscotizacionsComponent } from './estatuscotizacions.component';
import {EstatuscotizacionsTableComponent } from './components/estatuscotizacions-table/estatuscotizacions-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: EstatuscotizacionsComponent,
    children: [
      { path: 'estatuscotizacions-table', component: EstatuscotizacionsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
