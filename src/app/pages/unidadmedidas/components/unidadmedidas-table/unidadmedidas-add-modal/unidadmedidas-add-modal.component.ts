import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { UnidadmedidasService } from './../unidadmedidas.service';
import { UnidadmedidasInterface } from './../unidadmedidas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./unidadmedidas-add-modal.component.scss')],
  templateUrl: './unidadmedidas-add-modal.component.html'
})
export class UnidadmedidasAddModalComponent extends DialogComponent<UnidadmedidasInterface, any> implements OnInit {

  clave: string;
  descripcion: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  claveAC: AbstractControl;
  descripcionAC: AbstractControl;

  constructor(
    private service: UnidadmedidasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
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
  onSubmit(values: UnidadmedidasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
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
