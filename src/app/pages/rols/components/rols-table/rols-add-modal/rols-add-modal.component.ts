import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { RolsService } from './../rols.service';
import { RolsInterface } from './../rols.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./rols-add-modal.component.scss')],
  templateUrl: './rols-add-modal.component.html'
})
export class RolsAddModalComponent extends DialogComponent<RolsInterface, any> implements OnInit {

  rol: string;
  descripcion: string;
  visible: boolean;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  rolAC: AbstractControl;
  descripcionAC: AbstractControl;
  visibleAC: AbstractControl;

  constructor(
    private service: RolsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'rolAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'descripcionAC' : ['',Validators.compose([Validators.maxLength(60)])],
    'visibleAC' : [''],
    });
    this.rolAC = this.form.controls['rolAC'];
    this.descripcionAC = this.form.controls['descripcionAC'];
    this.visibleAC = this.form.controls['visibleAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: RolsInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  rol: this.rol,
                  descripcion: this.descripcion,
                  visible: this.visible,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
