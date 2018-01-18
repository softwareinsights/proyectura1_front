import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PresupuestosService } from './../presupuestos.service';
import { PresupuestosInterface } from './../presupuestos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ObrasService } from './../../../../obras/components/obras-table/obras.service';
import { ObrasAddModalComponent } from './../../../../obras/components/obras-table/obras-add-modal/obras-add-modal.component';
import { CategoriasService } from './../../../../categorias/components/categorias-table/categorias.service';
import { CategoriasAddModalComponent } from './../../../../categorias/components/categorias-table/categorias-add-modal/categorias-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./presupuestos-edit-modal.component.scss')],
  templateUrl: './presupuestos-edit-modal.component.html'
})
export class PresupuestosEditModalComponent extends DialogComponent<PresupuestosInterface, any> implements OnInit, PresupuestosInterface {
  _obra: string[] = [];
  _categoria: string[] = [];

  idpresupuesto: number;
  idobra: number;
  idcategoria: number;
  montopresupuestado: string;
  montoejercicio: string;
  fechainicial: string;
  fechafinal: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  idobraAC: AbstractControl;
  idcategoriaAC: AbstractControl;
  montopresupuestadoAC: AbstractControl;
  montoejercicioAC: AbstractControl;
  fechainicialAC: AbstractControl;
  fechafinalAC: AbstractControl;
  constructor(
      private service: PresupuestosService,
      private obrasService: ObrasService,
      private categoriasService: CategoriasService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idobraAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idcategoriaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'montopresupuestadoAC' : [''],
    'montoejercicioAC' : [''],
    'fechainicialAC' : [''],
    'fechafinalAC' : [''],
  });
  this.idobraAC = this.form.controls['idobraAC'];
  this.idcategoriaAC = this.form.controls['idcategoriaAC'];
  this.montopresupuestadoAC = this.form.controls['montopresupuestadoAC'];
  this.montoejercicioAC = this.form.controls['montoejercicioAC'];
  this.fechainicialAC = this.form.controls['fechainicialAC'];
  this.fechafinalAC = this.form.controls['fechafinalAC'];
  }
  ngOnInit() {
      this.getObra();
      this.getCategoria();
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
      if (result.success) {
          this.toastrService.success(result.message);
          this.getObra();
      } else {
          this.toastrService.error(result.message);
      }
  }
  categoriaAddModalShow() {
      const disposable = this.dialogService.addDialog(CategoriasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.categoriaShowToast(data);
          }
      })
  }

  categoriaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getCategoria();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getObra() {
      this.obrasService.all()
      .subscribe(
          (data: any) => this._obra = data.result,
      );
  }
  getCategoria() {
      this.categoriasService.all()
      .subscribe(
          (data: any) => this._categoria = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: PresupuestosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idpresupuesto: this.idpresupuesto,
                  idobra: this.idobra,
                  idcategoria: this.idcategoria,
                  montopresupuestado: this.montopresupuestado,
                  montoejercicio: this.montoejercicio,
                  fechainicial: this.fechainicial,
                  fechafinal: this.fechafinal,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
