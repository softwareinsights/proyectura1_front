import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {DetallecotizacionsComponent } from './detallecotizacions.component';
import {DetallecotizacionsTableComponent } from './components/detallecotizacions-table/detallecotizacions-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: DetallecotizacionsComponent,
    children: [
      { path: 'detallecotizacions-table', component: DetallecotizacionsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
