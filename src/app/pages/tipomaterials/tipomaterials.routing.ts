import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {TipomaterialsComponent } from './tipomaterials.component';
import {TipomaterialsTableComponent } from './components/tipomaterials-table/tipomaterials-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: TipomaterialsComponent,
    children: [
      { path: 'tipomaterials-table', component: TipomaterialsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
