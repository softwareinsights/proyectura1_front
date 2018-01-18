import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TiporazonsocialsService } from './../tiporazonsocials.service';
import { TiporazonsocialsInterface } from './../tiporazonsocials.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./tiporazonsocials-edit-modal.component.scss')],
  templateUrl: './tiporazonsocials-edit-modal.component.html'
})
export class TiporazonsocialsEditModalComponent extends DialogComponent<TiporazonsocialsInterface, any> implements OnInit, TiporazonsocialsInterface {

  idtiporazonsocial: number;
  tiporazonsocial: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  idtiporazonsocialAC: AbstractControl;
  tiporazonsocialAC: AbstractControl;
  constructor(
      private service: TiporazonsocialsService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idtiporazonsocialAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'tiporazonsocialAC' : ['',Validators.compose([Validators.maxLength(60)])],
  });
  this.idtiporazonsocialAC = this.form.controls['idtiporazonsocialAC'];
  this.tiporazonsocialAC = this.form.controls['tiporazonsocialAC'];
  }
  ngOnInit() {
  }

  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: TiporazonsocialsInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idtiporazonsocial: this.idtiporazonsocial,
                  tiporazonsocial: this.tiporazonsocial,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
