import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {RolsComponent } from './rols.component';
import {RolsTableComponent } from './components/rols-table/rols-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: RolsComponent,
    children: [
      { path: 'rols-table', component: RolsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
