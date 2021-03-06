import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { DetallecotizacionsService } from './../detallecotizacions.service';
import { DetallecotizacionsInterface } from './../detallecotizacions.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CotizacionsService } from './../../../../cotizacions/components/cotizacions-table/cotizacions.service';
import { CotizacionsAddModalComponent } from './../../../../cotizacions/components/cotizacions-table/cotizacions-add-modal/cotizacions-add-modal.component';
import { CategoriasService } from './../../../../categorias/components/categorias-table/categorias.service';
import { CategoriasAddModalComponent } from './../../../../categorias/components/categorias-table/categorias-add-modal/categorias-add-modal.component';
import { SubcategoriasService } from './../../../../subcategorias/components/subcategorias-table/subcategorias.service';
import { SubcategoriasAddModalComponent } from './../../../../subcategorias/components/subcategorias-table/subcategorias-add-modal/subcategorias-add-modal.component';
import { MaterialsService } from './../../../../materials/components/materials-table/materials.service';
import { MaterialsAddModalComponent } from './../../../../materials/components/materials-table/materials-add-modal/materials-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./detallecotizacions-add-modal.component.scss')],
  templateUrl: './detallecotizacions-add-modal.component.html'
})
export class DetallecotizacionsAddModalComponent extends DialogComponent<DetallecotizacionsInterface, any> implements OnInit {
  _cotizacion: string[] = [];
  _categoria: string[] = [];
  _subcategoria: string[] = [];
  _material: string[] = [];

  idcotizacion: number;
  idcategoria: number;
  idsubcategoria: number;
  idmaterial: number;
  cantidad: string;
  porcimpuestos: string;
  porcdescuento: string;
  porcimpuestosesp: string;
  importeimpuestos: string;
  importeimpuestosesp: string;
  observaciones: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  idcotizacionAC: AbstractControl;
  idcategoriaAC: AbstractControl;
  idsubcategoriaAC: AbstractControl;
  idmaterialAC: AbstractControl;
  cantidadAC: AbstractControl;
  porcimpuestosAC: AbstractControl;
  porcdescuentoAC: AbstractControl;
  porcimpuestosespAC: AbstractControl;
  importeimpuestosAC: AbstractControl;
  importeimpuestosespAC: AbstractControl;
  observacionesAC: AbstractControl;

  constructor(
    private service: DetallecotizacionsService,
    private cotizacionsService: CotizacionsService,
    private categoriasService: CategoriasService,
    private subcategoriasService: SubcategoriasService,
    private materialsService: MaterialsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'idcotizacionAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idcategoriaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idsubcategoriaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idmaterialAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'cantidadAC' : [''],
    'porcimpuestosAC' : [''],
    'porcdescuentoAC' : [''],
    'porcimpuestosespAC' : [''],
    'importeimpuestosAC' : [''],
    'importeimpuestosespAC' : [''],
    'observacionesAC' : ['',Validators.compose([Validators.maxLength(150)])],
    });
    this.idcotizacionAC = this.form.controls['idcotizacionAC'];
    this.idcategoriaAC = this.form.controls['idcategoriaAC'];
    this.idsubcategoriaAC = this.form.controls['idsubcategoriaAC'];
    this.idmaterialAC = this.form.controls['idmaterialAC'];
    this.cantidadAC = this.form.controls['cantidadAC'];
    this.porcimpuestosAC = this.form.controls['porcimpuestosAC'];
    this.porcdescuentoAC = this.form.controls['porcdescuentoAC'];
    this.porcimpuestosespAC = this.form.controls['porcimpuestosespAC'];
    this.importeimpuestosAC = this.form.controls['importeimpuestosAC'];
    this.importeimpuestosespAC = this.form.controls['importeimpuestosespAC'];
    this.observacionesAC = this.form.controls['observacionesAC'];
  }
  ngOnInit() {
      this.getCotizacion();
      this.getCategoria();
      this.getSubcategoria();
      this.getMaterial();
  }
  cotizacionAddModalShow() {
      const disposable = this.dialogService.addDialog(CotizacionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.cotizacionShowToast(data);
          }
      });
  }
  cotizacionShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getCotizacion();
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
      });
  }
  categoriaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getCategoria();
      } else {
          this.toastrService.error(result.message);
      }
  }
  subcategoriaAddModalShow() {
      const disposable = this.dialogService.addDialog(SubcategoriasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.subcategoriaShowToast(data);
          }
      });
  }
  subcategoriaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getSubcategoria();
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
      });
  }
  materialShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getMaterial();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getCotizacion() {
      this.cotizacionsService.all()
      .subscribe(
          (data: any) => this._cotizacion = data.result,
      );
  }
  getCategoria() {
      this.categoriasService.all()
      .subscribe(
          (data: any) => this._categoria = data.result,
      );
  }
  getSubcategoria() {
      this.subcategoriasService.all()
      .subscribe(
          (data: any) => this._subcategoria = data.result,
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
  onSubmit(values: DetallecotizacionsInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  idcotizacion: this.idcotizacion,
                  idcategoria: this.idcategoria,
                  idsubcategoria: this.idsubcategoria,
                  idmaterial: this.idmaterial,
                  cantidad: this.cantidad,
                  porcimpuestos: this.porcimpuestos,
                  porcdescuento: this.porcdescuento,
                  porcimpuestosesp: this.porcimpuestosesp,
                  importeimpuestos: this.importeimpuestos,
                  importeimpuestosesp: this.importeimpuestosesp,
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
