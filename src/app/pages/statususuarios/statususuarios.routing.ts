import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {StatususuariosComponent } from './statususuarios.component';
import {StatususuariosTableComponent } from './components/statususuarios-table/statususuarios-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: StatususuariosComponent,
    children: [
      { path: 'statususuarios-table', component: StatususuariosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
