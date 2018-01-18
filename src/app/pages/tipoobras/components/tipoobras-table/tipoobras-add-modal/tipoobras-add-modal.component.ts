import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TipoobrasService } from './../tipoobras.service';
import { TipoobrasInterface } from './../tipoobras.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./tipoobras-add-modal.component.scss')],
  templateUrl: './tipoobras-add-modal.component.html'
})
export class TipoobrasAddModalComponent extends DialogComponent<TipoobrasInterface, any> implements OnInit {

  clavetipoobra: string;
  descripcion: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  clavetipoobraAC: AbstractControl;
  descripcionAC: AbstractControl;

  constructor(
    private service: TipoobrasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'clavetipoobraAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'descripcionAC' : ['',Validators.compose([Validators.maxLength(100)])],
    });
    this.clavetipoobraAC = this.form.controls['clavetipoobraAC'];
    this.descripcionAC = this.form.controls['descripcionAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: TipoobrasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  clavetipoobra: this.clavetipoobra,
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
