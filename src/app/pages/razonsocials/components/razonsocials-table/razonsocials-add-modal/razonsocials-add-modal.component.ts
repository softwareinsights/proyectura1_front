import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { RazonsocialsService } from './../razonsocials.service';
import { RazonsocialsInterface } from './../razonsocials.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TiporazonsocialsService } from './../../../../tiporazonsocials/components/tiporazonsocials-table/tiporazonsocials.service';
import { TiporazonsocialsAddModalComponent } from './../../../../tiporazonsocials/components/tiporazonsocials-table/tiporazonsocials-add-modal/tiporazonsocials-add-modal.component';
import { StatusrazonsocialsService } from './../../../../statusrazonsocials/components/statusrazonsocials-table/statusrazonsocials.service';
import { StatusrazonsocialsAddModalComponent } from './../../../../statusrazonsocials/components/statusrazonsocials-table/statusrazonsocials-add-modal/statusrazonsocials-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./razonsocials-add-modal.component.scss')],
  templateUrl: './razonsocials-add-modal.component.html'
})
export class RazonsocialsAddModalComponent extends DialogComponent<RazonsocialsInterface, any> implements OnInit {
  _tiporazonsocial: string[] = [];
  _statusrazonsocial: string[] = [];

  razonsocial: string;
  nombre: string;
  rfc: string;
  calle: string;
  numeroexterior: string;
  numerointerior: string;
  colonia: string;
  municipio: string;
  ciudad: string;
  estado: string;
  pais: string;
  idtiporazonsocial: number;
  idstatusrazonsocial: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  razonsocialAC: AbstractControl;
  nombreAC: AbstractControl;
  rfcAC: AbstractControl;
  calleAC: AbstractControl;
  numeroexteriorAC: AbstractControl;
  numerointeriorAC: AbstractControl;
  coloniaAC: AbstractControl;
  municipioAC: AbstractControl;
  ciudadAC: AbstractControl;
  estadoAC: AbstractControl;
  paisAC: AbstractControl;
  idtiporazonsocialAC: AbstractControl;
  idstatusrazonsocialAC: AbstractControl;

  constructor(
    private service: RazonsocialsService,
    private tiporazonsocialsService: TiporazonsocialsService,
    private statusrazonsocialsService: StatusrazonsocialsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'razonsocialAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'nombreAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'rfcAC' : ['',Validators.compose([Validators.maxLength(30)])],
    'calleAC' : ['',Validators.compose([Validators.maxLength(80)])],
    'numeroexteriorAC' : ['',Validators.compose([Validators.maxLength(10)])],
    'numerointeriorAC' : ['',Validators.compose([Validators.maxLength(10)])],
    'coloniaAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'municipioAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'ciudadAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'estadoAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'paisAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'idtiporazonsocialAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idstatusrazonsocialAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    });
    this.razonsocialAC = this.form.controls['razonsocialAC'];
    this.nombreAC = this.form.controls['nombreAC'];
    this.rfcAC = this.form.controls['rfcAC'];
    this.calleAC = this.form.controls['calleAC'];
    this.numeroexteriorAC = this.form.controls['numeroexteriorAC'];
    this.numerointeriorAC = this.form.controls['numerointeriorAC'];
    this.coloniaAC = this.form.controls['coloniaAC'];
    this.municipioAC = this.form.controls['municipioAC'];
    this.ciudadAC = this.form.controls['ciudadAC'];
    this.estadoAC = this.form.controls['estadoAC'];
    this.paisAC = this.form.controls['paisAC'];
    this.idtiporazonsocialAC = this.form.controls['idtiporazonsocialAC'];
    this.idstatusrazonsocialAC = this.form.controls['idstatusrazonsocialAC'];
  }
  ngOnInit() {
      this.getTiporazonsocial();
      this.getStatusrazonsocial();
  }
  tiporazonsocialAddModalShow() {
      const disposable = this.dialogService.addDialog(TiporazonsocialsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.tiporazonsocialShowToast(data);
          }
      });
  }
  tiporazonsocialShowToast(result) {
      if (result.info.valorRespuesta) {
          this.toastrService.success(result.info.mensajeRespuesta);
          this.getTiporazonsocial();
      } else {
          this.toastrService.error(result.info.mensajeRespuesta);
      }
  }
  statusrazonsocialAddModalShow() {
      const disposable = this.dialogService.addDialog(StatusrazonsocialsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.statusrazonsocialShowToast(data);
          }
      });
  }
  statusrazonsocialShowToast(result) {
      if (result.info.valorRespuesta) {
          this.toastrService.success(result.info.mensajeRespuesta);
          this.getStatusrazonsocial();
      } else {
          this.toastrService.error(result.info.mensajeRespuesta);
      }
  }
  getTiporazonsocial() {
      this.tiporazonsocialsService.all()
      .subscribe(
          (data: any) => this._tiporazonsocial = data.lista,
      );
  }
  getStatusrazonsocial() {
      this.statusrazonsocialsService.all()
      .subscribe(
          (data: any) => this._statusrazonsocial = data.lista,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: RazonsocialsInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  razonsocial: this.razonsocial,
                  nombre: this.nombre,
                  rfc: this.rfc,
                  calle: this.calle,
                  numeroexterior: this.numeroexterior,
                  numerointerior: this.numerointerior,
                  colonia: this.colonia,
                  municipio: this.municipio,
                  ciudad: this.ciudad,
                  estado: this.estado,
                  pais: this.pais,
                  idtiporazonsocial: this.idtiporazonsocial,
                  idstatusrazonsocial: this.idstatusrazonsocial,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
