import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { DetallefacturasService } from './../detallefacturas.service';
import { DetallefacturasInterface } from './../detallefacturas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FacturasService } from './../../../../facturas/components/facturas-table/facturas.service';
import { FacturasAddModalComponent } from './../../../../facturas/components/facturas-table/facturas-add-modal/facturas-add-modal.component';
import { MaterialsService } from './../../../../materials/components/materials-table/materials.service';
import { MaterialsAddModalComponent } from './../../../../materials/components/materials-table/materials-add-modal/materials-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./detallefacturas-edit-modal.component.scss')],
  templateUrl: './detallefacturas-edit-modal.component.html'
})
export class DetallefacturasEditModalComponent extends DialogComponent<DetallefacturasInterface, any> implements OnInit, DetallefacturasInterface {
  _factura: string[] = [];
  _material: string[] = [];

  iddetallefactura: number;
  idfactura: number;
  idmaterial: number;
  claveprodserv: string;
  noidentificacion: string;
  descripcion: string;
  claveunidad: string;
  cantidad: string;
  valorunitario: string;
  importe: string;
  descuento: string;
  asignado: boolean;
  baseimpuesto: string;
  impuesto: string;
  tipofactorimpuesto: string;
  tasaocuotaimpuesto: string;
  importeimpuesto: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  idfacturaAC: AbstractControl;
  idmaterialAC: AbstractControl;
  claveprodservAC: AbstractControl;
  noidentificacionAC: AbstractControl;
  descripcionAC: AbstractControl;
  claveunidadAC: AbstractControl;
  cantidadAC: AbstractControl;
  valorunitarioAC: AbstractControl;
  importeAC: AbstractControl;
  descuentoAC: AbstractControl;
  asignadoAC: AbstractControl;
  baseimpuestoAC: AbstractControl;
  impuestoAC: AbstractControl;
  tipofactorimpuestoAC: AbstractControl;
  tasaocuotaimpuestoAC: AbstractControl;
  importeimpuestoAC: AbstractControl;
  constructor(
      private service: DetallefacturasService,
      private facturasService: FacturasService,
      private materialsService: MaterialsService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idfacturaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idmaterialAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'claveprodservAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'noidentificacionAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'descripcionAC' : ['',Validators.compose([Validators.maxLength(80)])],
    'claveunidadAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'cantidadAC' : [''],
    'valorunitarioAC' : [''],
    'importeAC' : [''],
    'descuentoAC' : [''],
    'asignadoAC' : [''],
    'baseimpuestoAC' : [''],
    'impuestoAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'tipofactorimpuestoAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'tasaocuotaimpuestoAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'importeimpuestoAC' : [''],
  });
  this.idfacturaAC = this.form.controls['idfacturaAC'];
  this.idmaterialAC = this.form.controls['idmaterialAC'];
  this.claveprodservAC = this.form.controls['claveprodservAC'];
  this.noidentificacionAC = this.form.controls['noidentificacionAC'];
  this.descripcionAC = this.form.controls['descripcionAC'];
  this.claveunidadAC = this.form.controls['claveunidadAC'];
  this.cantidadAC = this.form.controls['cantidadAC'];
  this.valorunitarioAC = this.form.controls['valorunitarioAC'];
  this.importeAC = this.form.controls['importeAC'];
  this.descuentoAC = this.form.controls['descuentoAC'];
  this.asignadoAC = this.form.controls['asignadoAC'];
  this.baseimpuestoAC = this.form.controls['baseimpuestoAC'];
  this.impuestoAC = this.form.controls['impuestoAC'];
  this.tipofactorimpuestoAC = this.form.controls['tipofactorimpuestoAC'];
  this.tasaocuotaimpuestoAC = this.form.controls['tasaocuotaimpuestoAC'];
  this.importeimpuestoAC = this.form.controls['importeimpuestoAC'];
  }
  ngOnInit() {
      this.getFactura();
      this.getMaterial();
  }

  facturaAddModalShow() {
      const disposable = this.dialogService.addDialog(FacturasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.facturaShowToast(data);
          }
      })
  }

  facturaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getFactura();
      } else {
          this.toastrService.error(result.message);
      }
  }
  materialAddModalShow() {
      const disposable = this.dialogService.addDialog(MaterialsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.materialShowToast(data);
          }
      })
  }

  materialShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getMaterial();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getFactura() {
      this.facturasService.all()
      .subscribe(
          (data: any) => this._factura = data.result,
      );
  }
  getMaterial() {
      this.materialsService.all()
      .subscribe(
          (data: any) => this._material = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: DetallefacturasInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  iddetallefactura: this.iddetallefactura,
                  idfactura: this.idfactura,
                  idmaterial: this.idmaterial,
                  claveprodserv: this.claveprodserv,
                  noidentificacion: this.noidentificacion,
                  descripcion: this.descripcion,
                  claveunidad: this.claveunidad,
                  cantidad: this.cantidad,
                  valorunitario: this.valorunitario,
                  importe: this.importe,
                  descuento: this.descuento,
                  asignado: this.asignado,
                  baseimpuesto: this.baseimpuesto,
                  impuesto: this.impuesto,
                  tipofactorimpuesto: this.tipofactorimpuesto,
                  tasaocuotaimpuesto: this.tasaocuotaimpuesto,
                  importeimpuesto: this.importeimpuesto,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
