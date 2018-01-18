import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {MaterialsComponent } from './materials.component';
import {MaterialsTableComponent } from './components/materials-table/materials-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: MaterialsComponent,
    children: [
      { path: 'materials-table', component: MaterialsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
