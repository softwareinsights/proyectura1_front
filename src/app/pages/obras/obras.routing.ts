import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {ObrasComponent } from './obras.component';
import {ObrasTableComponent } from './components/obras-table/obras-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ObrasComponent,
    children: [
      { path: 'obras-table', component: ObrasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
