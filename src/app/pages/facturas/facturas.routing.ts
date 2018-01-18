import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {FacturasComponent } from './facturas.component';
import {FacturasTableComponent } from './components/facturas-table/facturas-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: FacturasComponent,
    children: [
      { path: 'facturas-table', component: FacturasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
