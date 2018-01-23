import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ObrasService } from './../obras.service';
import { ObrasInterface } from './../obras.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TipoobrasService } from './../../../../tipoobras/components/tipoobras-table/tipoobras.service';
import { TipoobrasAddModalComponent } from './../../../../tipoobras/components/tipoobras-table/tipoobras-add-modal/tipoobras-add-modal.component';
import { EstatusobrasService } from './../../../../estatusobras/components/estatusobras-table/estatusobras.service';
import { EstatusobrasAddModalComponent } from './../../../../estatusobras/components/estatusobras-table/estatusobras-add-modal/estatusobras-add-modal.component';
import { RazonsocialsService } from './../../../../razonsocials/components/razonsocials-table/razonsocials.service';
import { RazonsocialsAddModalComponent } from './../../../../razonsocials/components/razonsocials-table/razonsocials-add-modal/razonsocials-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./obras-add-modal.component.scss')],
  templateUrl: './obras-add-modal.component.html'
})
export class ObrasAddModalComponent extends DialogComponent<ObrasInterface, any> implements OnInit {
  _tipoobra: string[] = [];
  _estatusobra: string[] = [];
  _razonsocial: string[] = [];

  descripcion: string;
  direccion: string;
  medidasterreno: string;
  medidasconstruccion: string;
  fechainicio: string;
  fechafin: string;
  presupuesto: string;
  posiciongps: string;
  observaciones: string;
  idtipoobra: number;
  idestatusobra: number;
  idrazonsocialconstructor: number;
  idrazonsocialcliente: number;
  idrazonsocialcontratista: number;
  idrazonsocialasociado: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  descripcionAC: AbstractControl;
  direccionAC: AbstractControl;
  medidasterrenoAC: AbstractControl;
  medidasconstruccionAC: AbstractControl;
  fechainicioAC: AbstractControl;
  fechafinAC: AbstractControl;
  presupuestoAC: AbstractControl;
  posiciongpsAC: AbstractControl;
  observacionesAC: AbstractControl;
  idtipoobraAC: AbstractControl;
  idestatusobraAC: AbstractControl;
  idrazonsocialconstructorAC: AbstractControl;
  idrazonsocialclienteAC: AbstractControl;
  idrazonsocialcontratistaAC: AbstractControl;
  idrazonsocialasociadoAC: AbstractControl;

  constructor(
    private service: ObrasService,
    private tipoobrasService: TipoobrasService,
    private estatusobrasService: EstatusobrasService,
    private razonsocialsService: RazonsocialsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'descripcionAC' : ['',Validators.compose([Validators.maxLength(100)])],
    'direccionAC' : ['',Validators.compose([Validators.maxLength(100)])],
    'medidasterrenoAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'medidasconstruccionAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'fechainicioAC' : [''],
    'fechafinAC' : [''],
    'presupuestoAC' : [''],
    'posiciongpsAC' : ['',Validators.compose([Validators.maxLength(60)])],
    'observacionesAC' : ['',Validators.compose([Validators.maxLength(150)])],
    'idtipoobraAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idestatusobraAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idrazonsocialconstructorAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idrazonsocialclienteAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idrazonsocialcontratistaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idrazonsocialasociadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    });
    this.descripcionAC = this.form.controls['descripcionAC'];
    this.direccionAC = this.form.controls['direccionAC'];
    this.medidasterrenoAC = this.form.controls['medidasterrenoAC'];
    this.medidasconstruccionAC = this.form.controls['medidasconstruccionAC'];
    this.fechainicioAC = this.form.controls['fechainicioAC'];
    this.fechafinAC = this.form.controls['fechafinAC'];
    this.presupuestoAC = this.form.controls['presupuestoAC'];
    this.posiciongpsAC = this.form.controls['posiciongpsAC'];
    this.observacionesAC = this.form.controls['observacionesAC'];
    this.idtipoobraAC = this.form.controls['idtipoobraAC'];
    this.idestatusobraAC = this.form.controls['idestatusobraAC'];
    this.idrazonsocialconstructorAC = this.form.controls['idrazonsocialconstructorAC'];
    this.idrazonsocialclienteAC = this.form.controls['idrazonsocialclienteAC'];
    this.idrazonsocialcontratistaAC = this.form.controls['idrazonsocialcontratistaAC'];
    this.idrazonsocialasociadoAC = this.form.controls['idrazonsocialasociadoAC'];
  }
  ngOnInit() {
      this.getTipoobra();
      this.getEstatusobra();
      this.getRazonsocial();
  }
  tipoobraAddModalShow() {
      const disposable = this.dialogService.addDialog(TipoobrasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.tipoobraShowToast(data);
          }
      });
  }
  tipoobraShowToast(result) {
      if (result.info.valorRespuesta) {
          this.toastrService.success(result.info.mensajeRespuesta);
          this.getTipoobra();
      } else {
          this.toastrService.error(result.info.mensajeRespuesta);
      }
  }
  estatusobraAddModalShow() {
      const disposable = this.dialogService.addDialog(EstatusobrasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.estatusobraShowToast(data);
          }
      });
  }
  estatusobraShowToast(result) {
      if (result.info.valorRespuesta) {
          this.toastrService.success(result.info.mensajeRespuesta);
          this.getEstatusobra();
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
      });
  }
  razonsocialShowToast(result) {
      if (result.info.valorRespuesta) {
          this.toastrService.success(result.info.mensajeRespuesta);
          this.getRazonsocial();
      } else {
          this.toastrService.error(result.info.mensajeRespuesta);
      }
  }
  getTipoobra() {
      this.tipoobrasService.all()
      .subscribe(
          (data: any) => this._tipoobra = data.lista,
      );
  }
  getEstatusobra() {
      this.estatusobrasService.all()
      .subscribe(
          (data: any) => this._estatusobra = data.lista,
      );
  }
  getRazonsocial() {
      this.razonsocialsService.all()
      .subscribe(
          (data: any) => this._razonsocial = data.lista,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: ObrasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  descripcion: this.descripcion,
                  direccion: this.direccion,
                  medidasterreno: this.medidasterreno,
                  medidasconstruccion: this.medidasconstruccion,
                  fechainicio: this.fechainicio,
                  fechafin: this.fechafin,
                  presupuesto: this.presupuesto,
                  posiciongps: this.posiciongps,
                  observaciones: this.observaciones,
                  idtipoobra: this.idtipoobra,
                  idestatusobra: this.idestatusobra,
                  idrazonsocialconstructor: this.idrazonsocialconstructor,
                  idrazonsocialcliente: this.idrazonsocialcliente,
                  idrazonsocialcontratista: this.idrazonsocialcontratista,
                  idrazonsocialasociado: this.idrazonsocialasociado,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
