import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {TiporazonsocialsComponent } from './tiporazonsocials.component';
import {TiporazonsocialsTableComponent } from './components/tiporazonsocials-table/tiporazonsocials-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: TiporazonsocialsComponent,
    children: [
      { path: 'tiporazonsocials-table', component: TiporazonsocialsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
