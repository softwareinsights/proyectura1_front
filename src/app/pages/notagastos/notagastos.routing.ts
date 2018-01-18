import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {NotagastosComponent } from './notagastos.component';
import {NotagastosTableComponent } from './components/notagastos-table/notagastos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: NotagastosComponent,
    children: [
      { path: 'notagastos-table', component: NotagastosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
