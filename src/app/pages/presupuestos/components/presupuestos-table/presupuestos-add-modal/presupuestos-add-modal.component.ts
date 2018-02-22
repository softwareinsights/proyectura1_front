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
  selector: 'add-service-modal',
  styleUrls: [('./presupuestos-add-modal.component.scss')],
  templateUrl: './presupuestos-add-modal.component.html'
})
export class PresupuestosAddModalComponent extends DialogComponent<PresupuestosInterface, any> implements OnInit {
  _obra: string[] = [];
  _categoria: string[] = [];

  idobra: number;
  idcategoria: number;
  montopresupuestado: string;
  montoejercido: string;
  fechainicial: string;
  fechafinal: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  idobraAC: AbstractControl;
  idcategoriaAC: AbstractControl;
  montopresupuestadoAC: AbstractControl;
  montoejercidoAC: AbstractControl;
  fechainicialAC: AbstractControl;
  fechafinalAC: AbstractControl;

  constructor(
    private service: PresupuestosService,
    private obrasService: ObrasService,
    private categoriasService: CategoriasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'idobraAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idcategoriaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'montopresupuestadoAC' : [''],
    'montoejercidoAC' : [''],
    'fechainicialAC' : [''],
    'fechafinalAC' : [''],
    });
    this.idobraAC = this.form.controls['idobraAC'];
    this.idcategoriaAC = this.form.controls['idcategoriaAC'];
    this.montopresupuestadoAC = this.form.controls['montopresupuestadoAC'];
    this.montoejercidoAC = this.form.controls['montoejercidoAC'];
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
      });
  }
  obraShowToast(result) {
      if (result.info.valorRespuesta) {
          this.toastrService.success(result.mensajeRespuesta);
          this.getObra();
      } else {
          this.toastrService.error(result.mensajeRespuesta);
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
      if (result.info.valorRespuesta) {
          this.toastrService.success(result.mensajerespuesta);
          this.getCategoria();
      } else {
          this.toastrService.error(result.mensajerespuesta);
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
  isNumberKey(evt)
  {
   var charCode = (evt.which) ? evt.which : evt.keyCode;
   if (charCode > 31 && (charCode < 46 || charCode > 57))
      return false;

   return true;
  }

  onSubmit(values: PresupuestosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  idobra: this.idobra,
                  idcategoria: this.idcategoria,
                  montopresupuestado: this.montopresupuestado,
                  montoejercido: this.montoejercido,
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
