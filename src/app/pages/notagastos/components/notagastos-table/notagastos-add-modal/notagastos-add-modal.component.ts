import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { NotagastosService } from './../notagastos.service';
import { NotagastosInterface } from './../notagastos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RazonsocialsService } from './../../../../razonsocials/components/razonsocials-table/razonsocials.service';
import { RazonsocialsAddModalComponent } from './../../../../razonsocials/components/razonsocials-table/razonsocials-add-modal/razonsocials-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./notagastos-add-modal.component.scss')],
  templateUrl: './notagastos-add-modal.component.html'
})
export class NotagastosAddModalComponent extends DialogComponent<NotagastosInterface, any> implements OnInit {
  _razonsocial: string[] = [];

  folio: string;
  serie: string;
  fecha: string;
  idrazonsocialemisor: number;
  observaciones: string;
  subtotal: string;
  importetotal: string;
  totalimpuestos: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  folioAC: AbstractControl;
  serieAC: AbstractControl;
  fechaAC: AbstractControl;
  idrazonsocialemisorAC: AbstractControl;
  observacionesAC: AbstractControl;
  subtotalAC: AbstractControl;
  importetotalAC: AbstractControl;
  totalimpuestosAC: AbstractControl;

  constructor(
    private service: NotagastosService,
    private razonsocialsService: RazonsocialsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'folioAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'serieAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'fechaAC' : [''],
    'idrazonsocialemisorAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'observacionesAC' : ['',Validators.compose([Validators.maxLength(150)])],
    'subtotalAC' : [''],
    'importetotalAC' : [''],
    'totalimpuestosAC' : [''],
    });
    this.folioAC = this.form.controls['folioAC'];
    this.serieAC = this.form.controls['serieAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.idrazonsocialemisorAC = this.form.controls['idrazonsocialemisorAC'];
    this.observacionesAC = this.form.controls['observacionesAC'];
    this.subtotalAC = this.form.controls['subtotalAC'];
    this.importetotalAC = this.form.controls['importetotalAC'];
    this.totalimpuestosAC = this.form.controls['totalimpuestosAC'];
  }
  ngOnInit() {
      this.getRazonsocial();
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
      if (result.success) {
          this.toastrService.success(result.message);
          this.getRazonsocial();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getRazonsocial() {
      this.razonsocialsService.all()
      .subscribe(
          (data: any) => this._razonsocial = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: NotagastosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  folio: this.folio,
                  serie: this.serie,
                  fecha: this.fecha,
                  idrazonsocialemisor: this.idrazonsocialemisor,
                  observaciones: this.observaciones,
                  subtotal: this.subtotal,
                  importetotal: this.importetotal,
                  totalimpuestos: this.totalimpuestos,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
