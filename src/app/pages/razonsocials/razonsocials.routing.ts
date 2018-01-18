import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {RazonsocialsComponent } from './razonsocials.component';
import {RazonsocialsTableComponent } from './components/razonsocials-table/razonsocials-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: RazonsocialsComponent,
    children: [
      { path: 'razonsocials-table', component: RazonsocialsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
