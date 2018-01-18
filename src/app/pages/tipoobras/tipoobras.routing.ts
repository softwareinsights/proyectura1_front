import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {TipoobrasComponent } from './tipoobras.component';
import {TipoobrasTableComponent } from './components/tipoobras-table/tipoobras-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: TipoobrasComponent,
    children: [
      { path: 'tipoobras-table', component: TipoobrasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
