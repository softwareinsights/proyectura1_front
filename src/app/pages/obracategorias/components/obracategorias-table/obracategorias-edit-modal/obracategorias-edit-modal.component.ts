import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ObracategoriasService } from './../obracategorias.service';
import { ObracategoriasInterface } from './../obracategorias.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ObrasService } from './../../../../obras/components/obras-table/obras.service';
import { ObrasAddModalComponent } from './../../../../obras/components/obras-table/obras-add-modal/obras-add-modal.component';
import { CategoriasService } from './../../../../categorias/components/categorias-table/categorias.service';
import { CategoriasAddModalComponent } from './../../../../categorias/components/categorias-table/categorias-add-modal/categorias-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./obracategorias-edit-modal.component.scss')],
  templateUrl: './obracategorias-edit-modal.component.html'
})
export class ObracategoriasEditModalComponent extends DialogComponent<ObracategoriasInterface, any> implements OnInit, ObracategoriasInterface {
  _obra: string[] = [];
  _categoria: string[] = [];

  idobracategoria: number;
  idobra: number;
  idcategoria: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  idobraAC: AbstractControl;
  idcategoriaAC: AbstractControl;
  constructor(
      private service: ObracategoriasService,
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
  });
  this.idobraAC = this.form.controls['idobraAC'];
  this.idcategoriaAC = this.form.controls['idcategoriaAC'];
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
    if (!result.info.idRespuesta) {
        this.toastrService.success(result.info.mensajerespuesta);
        this.getCategoria();
    } else {
        this.toastrService.error(result.info.mensajerespuesta);
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
    if (!result.info.idRespuesta) {
        this.toastrService.success(result.info.mensajerespuesta);
        this.getCategoria();
    } else {
        this.toastrService.error(result.info.mensajerespuesta);
    }
  }
  getObra() {
      this.obrasService.all()
      .subscribe(
          (data: any) => this._obra = data.lista,
      );
  }
  getCategoria() {
      this.categoriasService.all()
      .subscribe(
          (data: any) => this._categoria = data.lista,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: ObracategoriasInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idobracategoria: this.idobracategoria,
                  idobra: this.idobra,
                  idcategoria: this.idcategoria,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
