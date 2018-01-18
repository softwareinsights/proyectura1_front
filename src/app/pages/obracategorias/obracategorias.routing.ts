import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {ObracategoriasComponent } from './obracategorias.component';
import {ObracategoriasTableComponent } from './components/obracategorias-table/obracategorias-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ObracategoriasComponent,
    children: [
      { path: 'obracategorias-table', component: ObracategoriasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
