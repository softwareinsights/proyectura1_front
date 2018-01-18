import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {EmpresasComponent } from './empresas.component';
import {EmpresasTableComponent } from './components/empresas-table/empresas-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: EmpresasComponent,
    children: [
      { path: 'empresas-table', component: EmpresasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
