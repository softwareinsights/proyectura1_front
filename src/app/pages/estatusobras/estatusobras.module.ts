import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './estatusobras.routing';
import { EstatusobrasComponent } from './estatusobras.component';
import { EstatusobrasService } from './components/estatusobras-table/estatusobras.service';
import { EstatusobrasTableComponent } from './components/estatusobras-table/estatusobras-table.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    ReactiveFormsModule,
    NgaModule,
    NgbRatingModule,
    routing,
    DataTableModule,
    NgbModalModule,
    BootstrapModalModule.forRoot({ container: document.body })
  ],
  declarations: [
    EstatusobrasComponent,
    EstatusobrasTableComponent,
  ],
  entryComponents: [
  ],
  providers: [
    EstatusobrasService
  ]
})
export class EstatusobrasModule {
}
