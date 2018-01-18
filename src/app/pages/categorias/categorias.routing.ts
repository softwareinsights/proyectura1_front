import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {CategoriasComponent } from './categorias.component';
import {CategoriasTableComponent } from './components/categorias-table/categorias-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CategoriasComponent,
    children: [
      { path: 'categorias-table', component: CategoriasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
