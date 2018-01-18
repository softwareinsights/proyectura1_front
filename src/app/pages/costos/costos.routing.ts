import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {CostosComponent } from './costos.component';
import {CostosTableComponent } from './components/costos-table/costos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CostosComponent,
    children: [
      { path: 'costos-table', component: CostosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
