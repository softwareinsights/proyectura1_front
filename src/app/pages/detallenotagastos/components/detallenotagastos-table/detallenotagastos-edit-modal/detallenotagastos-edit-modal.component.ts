import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { DetallenotagastosService } from './../detallenotagastos.service';
import { DetallenotagastosInterface } from './../detallenotagastos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NotagastosService } from './../../../../notagastos/components/notagastos-table/notagastos.service';
import { NotagastosAddModalComponent } from './../../../../notagastos/components/notagastos-table/notagastos-add-modal/notagastos-add-modal.component';
import { MaterialsService } from './../../../../materials/components/materials-table/materials.service';
import { MaterialsAddModalComponent } from './../../../../materials/components/materials-table/materials-add-modal/materials-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./detallenotagastos-edit-modal.component.scss')],
  templateUrl: './detallenotagastos-edit-modal.component.html'
})
export class DetallenotagastosEditModalComponent extends DialogComponent<DetallenotagastosInterface, any> implements OnInit, DetallenotagastosInterface {
  _notagasto: string[] = [];
  _material: string[] = [];

  iddetallenotagasto: number;
  idnotagasto: number;
  idmaterial: number;
  noidentificacion: string;
  descripcion: string;
  unidad: string;
  cantidad: string;
  valorunitario: string;
  importe: string;
  importeimpuesto: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  idnotagastoAC: AbstractControl;
  idmaterialAC: AbstractControl;
  noidentificacionAC: AbstractControl;
  descripcionAC: AbstractControl;
  unidadAC: AbstractControl;
  cantidadAC: AbstractControl;
  valorunitarioAC: AbstractControl;
  importeAC: AbstractControl;
  importeimpuestoAC: AbstractControl;
  constructor(
      private service: DetallenotagastosService,
      private notagastosService: NotagastosService,
      private materialsService: MaterialsService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idnotagastoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idmaterialAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'noidentificacionAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'descripcionAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'unidadAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'cantidadAC' : [''],
    'valorunitarioAC' : [''],
    'importeAC' : [''],
    'importeimpuestoAC' : [''],
  });
  this.idnotagastoAC = this.form.controls['idnotagastoAC'];
  this.idmaterialAC = this.form.controls['idmaterialAC'];
  this.noidentificacionAC = this.form.controls['noidentificacionAC'];
  this.descripcionAC = this.form.controls['descripcionAC'];
  this.unidadAC = this.form.controls['unidadAC'];
  this.cantidadAC = this.form.controls['cantidadAC'];
  this.valorunitarioAC = this.form.controls['valorunitarioAC'];
  this.importeAC = this.form.controls['importeAC'];
  this.importeimpuestoAC = this.form.controls['importeimpuestoAC'];
  }
  ngOnInit() {
      this.getNotagasto();
      this.getMaterial();
  }

  notagastoAddModalShow() {
      const disposable = this.dialogService.addDialog(NotagastosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.notagastoShowToast(data);
          }
      })
  }

  notagastoShowToast(result) {
      if (result.info.valorRespuesta) {
          this.toastrService.success(result.info.mensajeRespuesta);
          this.getNotagasto();
      } else {
          this.toastrService.error(result.info.mensajeRespuesta);
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
      if (result.info.valorRespuesta) {
          this.toastrService.success(result.info.mensajeRespuesta);
          this.getMaterial();
      } else {
          this.toastrService.error(result.info.mensajeRespuesta);
      }
  }
  getNotagasto() {
      this.notagastosService.all()
      .subscribe(
          (data: any) => this._notagasto = data.lista,
      );
  }
  getMaterial() {
      this.materialsService.all()
      .subscribe(
          (data: any) => this._material = data.lista,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: DetallenotagastosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  iddetallenotagasto: this.iddetallenotagasto,
                  idnotagasto: this.idnotagasto,
                  idmaterial: this.idmaterial,
                  noidentificacion: this.noidentificacion,
                  descripcion: this.descripcion,
                  unidad: this.unidad,
                  cantidad: this.cantidad,
                  valorunitario: this.valorunitario,
                  importe: this.importe,
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
