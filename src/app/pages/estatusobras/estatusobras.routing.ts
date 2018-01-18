import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {EstatusobrasComponent } from './estatusobras.component';
import {EstatusobrasTableComponent } from './components/estatusobras-table/estatusobras-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: EstatusobrasComponent,
    children: [
      { path: 'estatusobras-table', component: EstatusobrasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
