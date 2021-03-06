import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TipomaterialsService } from './../tipomaterials.service';
import { TipomaterialsInterface } from './../tipomaterials.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./tipomaterials-edit-modal.component.scss')],
  templateUrl: './tipomaterials-edit-modal.component.html'
})
export class TipomaterialsEditModalComponent extends DialogComponent<TipomaterialsInterface, any> implements OnInit, TipomaterialsInterface {

  idtipomaterial: number;
  clave: string;
  descripcion: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  claveAC: AbstractControl;
  descripcionAC: AbstractControl;
  constructor(
      private service: TipomaterialsService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'claveAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'descripcionAC' : ['',Validators.compose([Validators.maxLength(100)])],
  });
  this.claveAC = this.form.controls['claveAC'];
  this.descripcionAC = this.form.controls['descripcionAC'];
  }
  ngOnInit() {
  }

  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: TipomaterialsInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idtipomaterial: this.idtipomaterial,
                  clave: this.clave,
                  descripcion: this.descripcion,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
