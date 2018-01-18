import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisobasesService } from './../permisobases.service';
import { PermisobasesInterface } from './../permisobases.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./permisobases-edit-modal.component.scss')],
  templateUrl: './permisobases-edit-modal.component.html'
})
export class PermisobasesEditModalComponent extends DialogComponent<PermisobasesInterface, any> implements OnInit, PermisobasesInterface {

  idpermisobase: number;
  permisobase: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  idpermisobaseAC: AbstractControl;
  permisobaseAC: AbstractControl;
  constructor(
      private service: PermisobasesService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idpermisobaseAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'permisobaseAC' : ['',Validators.compose([Validators.maxLength(45)])],
  });
  this.idpermisobaseAC = this.form.controls['idpermisobaseAC'];
  this.permisobaseAC = this.form.controls['permisobaseAC'];
  }
  ngOnInit() {
  }

  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: PermisobasesInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idpermisobase: this.idpermisobase,
                  permisobase: this.permisobase,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
