import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {StatusrazonsocialsComponent } from './statusrazonsocials.component';
import {StatusrazonsocialsTableComponent } from './components/statusrazonsocials-table/statusrazonsocials-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: StatusrazonsocialsComponent,
    children: [
      { path: 'statusrazonsocials-table', component: StatusrazonsocialsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
