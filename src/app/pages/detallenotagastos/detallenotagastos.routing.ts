import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {DetallenotagastosComponent } from './detallenotagastos.component';
import {DetallenotagastosTableComponent } from './components/detallenotagastos-table/detallenotagastos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: DetallenotagastosComponent,
    children: [
      { path: 'detallenotagastos-table', component: DetallenotagastosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
