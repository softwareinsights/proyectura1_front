import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {DetallefacturasComponent } from './detallefacturas.component';
import {DetallefacturasTableComponent } from './components/detallefacturas-table/detallefacturas-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: DetallefacturasComponent,
    children: [
      { path: 'detallefacturas-table', component: DetallefacturasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
