import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './razonsocials.routing';
import { RazonsocialsComponent } from './razonsocials.component';
import { RazonsocialsService } from './components/razonsocials-table/razonsocials.service';
import { RazonsocialsTableComponent } from './components/razonsocials-table/razonsocials-table.component';

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
    RazonsocialsComponent,
    RazonsocialsTableComponent,
  ],
  entryComponents: [
  ],
  providers: [
    RazonsocialsService
  ]
})
export class RazonsocialsModule {
}
