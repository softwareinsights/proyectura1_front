import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CostosService } from './../costos.service';
import { CostosInterface } from './../costos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MaterialsService } from './../../../../materials/components/materials-table/materials.service';
import { MaterialsAddModalComponent } from './../../../../materials/components/materials-table/materials-add-modal/materials-add-modal.component';
import { UnidadmedidasService } from './../../../../unidadmedidas/components/unidadmedidas-table/unidadmedidas.service';
import { UnidadmedidasAddModalComponent } from './../../../../unidadmedidas/components/unidadmedidas-table/unidadmedidas-add-modal/unidadmedidas-add-modal.component';
import { CategoriasService } from './../../../../categorias/components/categorias-table/categorias.service';
import { CategoriasAddModalComponent } from './../../../../categorias/components/categorias-table/categorias-add-modal/categorias-add-modal.component';
import { SubcategoriasService } from './../../../../subcategorias/components/subcategorias-table/subcategorias.service';
import { SubcategoriasAddModalComponent } from './../../../../subcategorias/components/subcategorias-table/subcategorias-add-modal/subcategorias-add-modal.component';
import { ObrasService } from './../../../../obras/components/obras-table/obras.service';
import { ObrasAddModalComponent } from './../../../../obras/components/obras-table/obras-add-modal/obras-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./costos-edit-modal.component.scss')],
  templateUrl: './costos-edit-modal.component.html'
})
export class CostosEditModalComponent extends DialogComponent<CostosInterface, any> implements OnInit, CostosInterface {
  _material: string[] = [];
  _unidadmedida: string[] = [];
  _categoria: string[] = [];
  _subcategoria: string[] = [];
  _obra: string[] = [];

  idcosto: number;
  idmaterial: number;
  idunidadmedida: number;
  idcategoria: number;
  idsubcategoria: number;
  idobra: number;
  cantidad: string;
  preciounitario: string;
  importeimpuestos: string;
  importeimpuestosesp: string;
  subtotal: string;
  importetotal: string;
  observaciones: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  idmaterialAC: AbstractControl;
  idunidadmedidaAC: AbstractControl;
  idcategoriaAC: AbstractControl;
  idsubcategoriaAC: AbstractControl;
  idobraAC: AbstractControl;
  cantidadAC: AbstractControl;
  preciounitarioAC: AbstractControl;
  importeimpuestosAC: AbstractControl;
  importeimpuestosespAC: AbstractControl;
  subtotalAC: AbstractControl;
  importetotalAC: AbstractControl;
  observacionesAC: AbstractControl;
  constructor(
      private service: CostosService,
      private materialsService: MaterialsService,
      private unidadmedidasService: UnidadmedidasService,
      private categoriasService: CategoriasService,
      private subcategoriasService: SubcategoriasService,
      private obrasService: ObrasService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idmaterialAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idunidadmedidaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idcategoriaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idsubcategoriaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idobraAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'cantidadAC' : [''],
    'preciounitarioAC' : [''],
    'importeimpuestosAC' : [''],
    'importeimpuestosespAC' : [''],
    'subtotalAC' : [''],
    'importetotalAC' : [''],
    'observacionesAC' : ['',Validators.compose([Validators.maxLength(150)])],
  });
  this.idmaterialAC = this.form.controls['idmaterialAC'];
  this.idunidadmedidaAC = this.form.controls['idunidadmedidaAC'];
  this.idcategoriaAC = this.form.controls['idcategoriaAC'];
  this.idsubcategoriaAC = this.form.controls['idsubcategoriaAC'];
  this.idobraAC = this.form.controls['idobraAC'];
  this.cantidadAC = this.form.controls['cantidadAC'];
  this.preciounitarioAC = this.form.controls['preciounitarioAC'];
  this.importeimpuestosAC = this.form.controls['importeimpuestosAC'];
  this.importeimpuestosespAC = this.form.controls['importeimpuestosespAC'];
  this.subtotalAC = this.form.controls['subtotalAC'];
  this.importetotalAC = this.form.controls['importetotalAC'];
  this.observacionesAC = this.form.controls['observacionesAC'];
  }
  ngOnInit() {
      this.getMaterial();
      this.getUnidadmedida();
      this.getCategoria();
      this.getSubcategoria();
      this.getObra();
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
  unidadmedidaAddModalShow() {
      const disposable = this.dialogService.addDialog(UnidadmedidasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.unidadmedidaShowToast(data);
          }
      })
  }

  unidadmedidaShowToast(result) {
      if (result.info.valorRespuesta) {
          this.toastrService.success(result.info.mensajeRespuesta);
          this.getUnidadmedida();
      } else {
          this.toastrService.error(result.info.mensajeRespuesta);
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
      if (result.info.valorRespuesta) {
          this.toastrService.success(result.info.mensajeRespuesta);
          this.getCategoria();
      } else {
          this.toastrService.error(result.info.mensajeRespuesta);
      }
  }
  subcategoriaAddModalShow() {
      const disposable = this.dialogService.addDialog(SubcategoriasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.subcategoriaShowToast(data);
          }
      })
  }

  subcategoriaShowToast(result) {
      if (result.info.valorRespuesta) {
          this.toastrService.success(result.info.mensajeRespuesta);
          this.getSubcategoria();
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
  getMaterial() {
      this.materialsService.all()
      .subscribe(
          (data: any) => this._material = data.lista,
      );
  }
  getUnidadmedida() {
      this.unidadmedidasService.all()
      .subscribe(
          (data: any) => this._unidadmedida = data.lista,
      );
  }
  getCategoria() {
      this.categoriasService.all()
      .subscribe(
          (data: any) => this._categoria = data.lista,
      );
  }
  getSubcategoria() {
      this.subcategoriasService.all()
      .subscribe(
          (data: any) => this._subcategoria = data.lista,
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
  onSubmit(values: CostosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idcosto: this.idcosto,
                  idmaterial: this.idmaterial,
                  idunidadmedida: this.idunidadmedida,
                  idcategoria: this.idcategoria,
                  idsubcategoria: this.idsubcategoria,
                  idobra: this.idobra,
                  cantidad: this.cantidad,
                  preciounitario: this.preciounitario,
                  importeimpuestos: this.importeimpuestos,
                  importeimpuestosesp: this.importeimpuestosesp,
                  subtotal: this.subtotal,
                  importetotal: this.importetotal,
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
