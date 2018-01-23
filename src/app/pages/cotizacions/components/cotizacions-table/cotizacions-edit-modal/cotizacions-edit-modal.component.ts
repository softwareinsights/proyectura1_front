import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CotizacionsService } from './../cotizacions.service';
import { CotizacionsInterface } from './../cotizacions.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstatuscotizacionsService } from './../../../../estatuscotizacions/components/estatuscotizacions-table/estatuscotizacions.service';
import { EstatuscotizacionsAddModalComponent } from './../../../../estatuscotizacions/components/estatuscotizacions-table/estatuscotizacions-add-modal/estatuscotizacions-add-modal.component';
import { RazonsocialsService } from './../../../../razonsocials/components/razonsocials-table/razonsocials.service';
import { RazonsocialsAddModalComponent } from './../../../../razonsocials/components/razonsocials-table/razonsocials-add-modal/razonsocials-add-modal.component';
import { ObrasService } from './../../../../obras/components/obras-table/obras.service';
import { ObrasAddModalComponent } from './../../../../obras/components/obras-table/obras-add-modal/obras-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./cotizacions-edit-modal.component.scss')],
  templateUrl: './cotizacions-edit-modal.component.html'
})
export class CotizacionsEditModalComponent extends DialogComponent<CotizacionsInterface, any> implements OnInit, CotizacionsInterface {
  _estatuscotizacion: string[] = [];
  _razonsocial: string[] = [];
  _obra: string[] = [];

  idcotizacion: number;
  idestatuscotizacion: number;
  idrazonsocial: number;
  idobra: number;
  subtotal: string;
  importetotal: string;
  importeimpuestos: string;
  importeimpuestosesp: string;
  totalunidades: string;
  descripcion: string;
  referencia: string;
  observaciones: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  idestatuscotizacionAC: AbstractControl;
  idrazonsocialAC: AbstractControl;
  idobraAC: AbstractControl;
  subtotalAC: AbstractControl;
  importetotalAC: AbstractControl;
  importeimpuestosAC: AbstractControl;
  importeimpuestosespAC: AbstractControl;
  totalunidadesAC: AbstractControl;
  descripcionAC: AbstractControl;
  referenciaAC: AbstractControl;
  observacionesAC: AbstractControl;
  constructor(
      private service: CotizacionsService,
      private estatuscotizacionsService: EstatuscotizacionsService,
      private razonsocialsService: RazonsocialsService,
      private obrasService: ObrasService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idestatuscotizacionAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idrazonsocialAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idobraAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'subtotalAC' : [''],
    'importetotalAC' : [''],
    'importeimpuestosAC' : [''],
    'importeimpuestosespAC' : [''],
    'totalunidadesAC' : [''],
    'descripcionAC' : ['',Validators.compose([Validators.maxLength(80)])],
    'referenciaAC' : ['',Validators.compose([Validators.maxLength(60)])],
    'observacionesAC' : ['',Validators.compose([Validators.maxLength(150)])],
  });
  this.idestatuscotizacionAC = this.form.controls['idestatuscotizacionAC'];
  this.idrazonsocialAC = this.form.controls['idrazonsocialAC'];
  this.idobraAC = this.form.controls['idobraAC'];
  this.subtotalAC = this.form.controls['subtotalAC'];
  this.importetotalAC = this.form.controls['importetotalAC'];
  this.importeimpuestosAC = this.form.controls['importeimpuestosAC'];
  this.importeimpuestosespAC = this.form.controls['importeimpuestosespAC'];
  this.totalunidadesAC = this.form.controls['totalunidadesAC'];
  this.descripcionAC = this.form.controls['descripcionAC'];
  this.referenciaAC = this.form.controls['referenciaAC'];
  this.observacionesAC = this.form.controls['observacionesAC'];
  }
  ngOnInit() {
      this.getEstatuscotizacion();
      this.getRazonsocial();
      this.getObra();
  }

  estatuscotizacionAddModalShow() {
      const disposable = this.dialogService.addDialog(EstatuscotizacionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.estatuscotizacionShowToast(data);
          }
      })
  }

  estatuscotizacionShowToast(result) {
      if (result.info.valorRespuesta) {
          this.toastrService.success(result.info.mensajeRespuesta);
          this.getEstatuscotizacion();
      } else {
          this.toastrService.error(result.info.mensajeRespuesta);
      }
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
      if (result.info.valorRespuesta) {
          this.toastrService.success(result.info.mensajeRespuesta);
          this.getRazonsocial();
      } else {
          this.toastrService.error(result.info.mensajeRespuesta);
      }
  }
  obraAddModalShow() {
      const disposable = this.dialogService.addDialog(ObrasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.obraShowToast(data);
          }
      })
  }

  obraShowToast(result) {
      if (result.info.valorRespuesta) {
          this.toastrService.success(result.info.mensajeRespuesta);
          this.getObra();
      } else {
          this.toastrService.error(result.info.mensajeRespuesta);
      }
  }
  getEstatuscotizacion() {
      this.estatuscotizacionsService.all()
      .subscribe(
          (data: any) => this._estatuscotizacion = data.lista,
      );
  }
  getRazonsocial() {
      this.razonsocialsService.all()
      .subscribe(
          (data: any) => this._razonsocial = data.lista,
      );
  }
  getObra() {
      this.obrasService.all()
      .subscribe(
          (data: any) => this._obra = data.lista,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: CotizacionsInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idcotizacion: this.idcotizacion,
                  idestatuscotizacion: this.idestatuscotizacion,
                  idrazonsocial: this.idrazonsocial,
                  idobra: this.idobra,
                  subtotal: this.subtotal,
                  importetotal: this.importetotal,
                  importeimpuestos: this.importeimpuestos,
                  importeimpuestosesp: this.importeimpuestosesp,
                  totalunidades: this.totalunidades,
                  descripcion: this.descripcion,
                  referencia: this.referencia,
                  observaciones: this.observaciones,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
