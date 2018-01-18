import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {SubcategoriasComponent } from './subcategorias.component';
import {SubcategoriasTableComponent } from './components/subcategorias-table/subcategorias-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: SubcategoriasComponent,
    children: [
      { path: 'subcategorias-table', component: SubcategoriasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
