import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { MaterialsService } from './../materials.service';
import { MaterialsInterface } from './../materials.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TipomaterialsService } from './../../../../tipomaterials/components/tipomaterials-table/tipomaterials.service';
import { TipomaterialsAddModalComponent } from './../../../../tipomaterials/components/tipomaterials-table/tipomaterials-add-modal/tipomaterials-add-modal.component';
import { UnidadmedidasService } from './../../../../unidadmedidas/components/unidadmedidas-table/unidadmedidas.service';
import { UnidadmedidasAddModalComponent } from './../../../../unidadmedidas/components/unidadmedidas-table/unidadmedidas-add-modal/unidadmedidas-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./materials-add-modal.component.scss')],
  templateUrl: './materials-add-modal.component.html'
})
export class MaterialsAddModalComponent extends DialogComponent<MaterialsInterface, any> implements OnInit {
  _tipomaterial: string[] = [];
  _unidadmedida: string[] = [];

  codigo: string;
  descripcioncorta: string;
  descripcionlarga: string;
  precio: string;
  idtipomaterial: number;
  idunidadmedida: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  codigoAC: AbstractControl;
  descripcioncortaAC: AbstractControl;
  descripcionlargaAC: AbstractControl;
  precioAC: AbstractControl;
  idtipomaterialAC: AbstractControl;
  idunidadmedidaAC: AbstractControl;

  constructor(
    private service: MaterialsService,
    private tipomaterialsService: TipomaterialsService,
    private unidadmedidasService: UnidadmedidasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'codigoAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'descripcioncortaAC' : ['',Validators.compose([Validators.maxLength(60)])],
    'descripcionlargaAC' : ['',Validators.compose([Validators.maxLength(100)])],
    'precioAC' : [''],
    'idtipomaterialAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idunidadmedidaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    });
    this.codigoAC = this.form.controls['codigoAC'];
    this.descripcioncortaAC = this.form.controls['descripcioncortaAC'];
    this.descripcionlargaAC = this.form.controls['descripcionlargaAC'];
    this.precioAC = this.form.controls['precioAC'];
    this.idtipomaterialAC = this.form.controls['idtipomaterialAC'];
    this.idunidadmedidaAC = this.form.controls['idunidadmedidaAC'];
  }
  ngOnInit() {
      this.getTipomaterial();
      this.getUnidadmedida();
  }
  tipomaterialAddModalShow() {
      const disposable = this.dialogService.addDialog(TipomaterialsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.tipomaterialShowToast(data);
          }
      });
  }
  tipomaterialShowToast(result) {
    if (!result.idRespuesta) {
        this.toastrService.success(result.info.mensajeRespuesta);
        this.getTipomaterial();
    } else {
        this.toastrService.error(result.info.mensajeRespuesta);
    }

  }
  unidadmedidaAddModalShow() {
      const disposable = this.dialogService.addDialog(UnidadmedidasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.unidadmedidaShowToast(data);
          }
      });
  }
  unidadmedidaShowToast(result) {
    if (!result.idRespuesta) {
        this.toastrService.success(result.info.mensajeRespuesta);
        this.getUnidadmedida();
    } else {
        this.toastrService.error(result.info.mensajeRespuesta);
    }
  }
  getTipomaterial() {
      this.tipomaterialsService.all()
      .subscribe(
          (data: any) => this._tipomaterial = data.lista,
      );
  }
  getUnidadmedida() {
      this.unidadmedidasService.all()
      .subscribe(
          (data: any) => this._unidadmedida = data.lista,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: MaterialsInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  codigo: this.codigo,
                  descripcioncorta: this.descripcioncorta,
                  descripcionlarga: this.descripcionlarga,
                  precio: this.precio,
                  idtipomaterial: this.idtipomaterial,
                  idunidadmedida: this.idunidadmedida,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
