import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {CotizacionsComponent } from './cotizacions.component';
import {CotizacionsTableComponent } from './components/cotizacions-table/cotizacions-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CotizacionsComponent,
    children: [
      { path: 'cotizacions-table', component: CotizacionsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
