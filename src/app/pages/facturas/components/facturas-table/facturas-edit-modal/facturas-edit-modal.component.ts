import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { FacturasService } from './../facturas.service';
import { FacturasInterface } from './../facturas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RazonsocialsService } from './../../../../razonsocials/components/razonsocials-table/razonsocials.service';
import { RazonsocialsAddModalComponent } from './../../../../razonsocials/components/razonsocials-table/razonsocials-add-modal/razonsocials-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./facturas-edit-modal.component.scss')],
  templateUrl: './facturas-edit-modal.component.html'
})
export class FacturasEditModalComponent extends DialogComponent<FacturasInterface, any> implements OnInit, FacturasInterface {
  _razonsocial: string[] = [];

  idfactura: number;
  folio: string;
  serie: string;
  version: string;
  fechaexpedicion: string;
  uuid: string;
  fechatimbrado: string;
  idrazonsocialemisor: number;
  razonsocialemisor: string;
  rfcemisor: string;
  claveregimenfiscal: string;
  claveformapago: string;
  clavemetodopago: string;
  clavetipocomprobante: string;
  lugarexpedicion: string;
  claveusocfdi: string;
  rfcreceptor: string;
  subtotal: string;
  importetotal: string;
  totalimpuestostrasladados: string;
  totalimpuestosretenidos: string;
  totaldescuentos: string;
  clavemoneda: string;
  valortipocambio: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  folioAC: AbstractControl;
  serieAC: AbstractControl;
  versionAC: AbstractControl;
  fechaexpedicionAC: AbstractControl;
  uuidAC: AbstractControl;
  fechatimbradoAC: AbstractControl;
  idrazonsocialemisorAC: AbstractControl;
  razonsocialemisorAC: AbstractControl;
  rfcemisorAC: AbstractControl;
  claveregimenfiscalAC: AbstractControl;
  claveformapagoAC: AbstractControl;
  clavemetodopagoAC: AbstractControl;
  clavetipocomprobanteAC: AbstractControl;
  lugarexpedicionAC: AbstractControl;
  claveusocfdiAC: AbstractControl;
  rfcreceptorAC: AbstractControl;
  subtotalAC: AbstractControl;
  importetotalAC: AbstractControl;
  totalimpuestostrasladadosAC: AbstractControl;
  totalimpuestosretenidosAC: AbstractControl;
  totaldescuentosAC: AbstractControl;
  clavemonedaAC: AbstractControl;
  valortipocambioAC: AbstractControl;
  constructor(
      private service: FacturasService,
      private razonsocialsService: RazonsocialsService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'folioAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'serieAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'versionAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'fechaexpedicionAC' : [''],
    'uuidAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'fechatimbradoAC' : [''],
    'idrazonsocialemisorAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'razonsocialemisorAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'rfcemisorAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'claveregimenfiscalAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'claveformapagoAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'clavemetodopagoAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'clavetipocomprobanteAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'lugarexpedicionAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'claveusocfdiAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'rfcreceptorAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'subtotalAC' : [''],
    'importetotalAC' : [''],
    'totalimpuestostrasladadosAC' : [''],
    'totalimpuestosretenidosAC' : [''],
    'totaldescuentosAC' : [''],
    'clavemonedaAC' : [''],
    'valortipocambioAC' : [''],
  });
  this.folioAC = this.form.controls['folioAC'];
  this.serieAC = this.form.controls['serieAC'];
  this.versionAC = this.form.controls['versionAC'];
  this.fechaexpedicionAC = this.form.controls['fechaexpedicionAC'];
  this.uuidAC = this.form.controls['uuidAC'];
  this.fechatimbradoAC = this.form.controls['fechatimbradoAC'];
  this.idrazonsocialemisorAC = this.form.controls['idrazonsocialemisorAC'];
  this.razonsocialemisorAC = this.form.controls['razonsocialemisorAC'];
  this.rfcemisorAC = this.form.controls['rfcemisorAC'];
  this.claveregimenfiscalAC = this.form.controls['claveregimenfiscalAC'];
  this.claveformapagoAC = this.form.controls['claveformapagoAC'];
  this.clavemetodopagoAC = this.form.controls['clavemetodopagoAC'];
  this.clavetipocomprobanteAC = this.form.controls['clavetipocomprobanteAC'];
  this.lugarexpedicionAC = this.form.controls['lugarexpedicionAC'];
  this.claveusocfdiAC = this.form.controls['claveusocfdiAC'];
  this.rfcreceptorAC = this.form.controls['rfcreceptorAC'];
  this.subtotalAC = this.form.controls['subtotalAC'];
  this.importetotalAC = this.form.controls['importetotalAC'];
  this.totalimpuestostrasladadosAC = this.form.controls['totalimpuestostrasladadosAC'];
  this.totalimpuestosretenidosAC = this.form.controls['totalimpuestosretenidosAC'];
  this.totaldescuentosAC = this.form.controls['totaldescuentosAC'];
  this.clavemonedaAC = this.form.controls['clavemonedaAC'];
  this.valortipocambioAC = this.form.controls['valortipocambioAC'];
  }
  ngOnInit() {
      this.getRazonsocial();
  }

  razonsocialAddModalShow() {
      const disposable = this.dialogService.addDialog(RazonsocialsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.razonsocialShowToast(data);
          }
      })
  }

  razonsocialShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getRazonsocial();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getRazonsocial() {
      this.razonsocialsService.all()
      .subscribe(
          (data: any) => this._razonsocial = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: FacturasInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idfactura: this.idfactura,
                  folio: this.folio,
                  serie: this.serie,
                  version: this.version,
                  fechaexpedicion: this.fechaexpedicion,
                  uuid: this.uuid,
                  fechatimbrado: this.fechatimbrado,
                  idrazonsocialemisor: this.idrazonsocialemisor,
                  razonsocialemisor: this.razonsocialemisor,
                  rfcemisor: this.rfcemisor,
                  claveregimenfiscal: this.claveregimenfiscal,
                  claveformapago: this.claveformapago,
                  clavemetodopago: this.clavemetodopago,
                  clavetipocomprobante: this.clavetipocomprobante,
                  lugarexpedicion: this.lugarexpedicion,
                  claveusocfdi: this.claveusocfdi,
                  rfcreceptor: this.rfcreceptor,
                  subtotal: this.subtotal,
                  importetotal: this.importetotal,
                  totalimpuestostrasladados: this.totalimpuestostrasladados,
                  totalimpuestosretenidos: this.totalimpuestosretenidos,
                  totaldescuentos: this.totaldescuentos,
                  clavemoneda: this.clavemoneda,
                  valortipocambio: this.valortipocambio,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
