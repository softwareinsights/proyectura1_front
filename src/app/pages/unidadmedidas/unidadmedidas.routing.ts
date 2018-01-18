import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {UnidadmedidasComponent } from './unidadmedidas.component';
import {UnidadmedidasTableComponent } from './components/unidadmedidas-table/unidadmedidas-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: UnidadmedidasComponent,
    children: [
      { path: 'unidadmedidas-table', component: UnidadmedidasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
