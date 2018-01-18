import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {ReferenciasComponent } from './referencias.component';
import {ReferenciasTableComponent } from './components/referencias-table/referencias-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ReferenciasComponent,
    children: [
      { path: 'referencias-table', component: ReferenciasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
