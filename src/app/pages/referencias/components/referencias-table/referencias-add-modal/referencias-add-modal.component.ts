import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ReferenciasService } from './../referencias.service';
import { ReferenciasInterface } from './../referencias.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./referencias-add-modal.component.scss')],
  templateUrl: './referencias-add-modal.component.html'
})
export class ReferenciasAddModalComponent extends DialogComponent<ReferenciasInterface, any> implements OnInit {

  referencia: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  referenciaAC: AbstractControl;

  constructor(
    private service: ReferenciasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'referenciaAC' : ['',Validators.compose([Validators.maxLength(45)])],
    });
    this.referenciaAC = this.form.controls['referenciaAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: ReferenciasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  referencia: this.referencia,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
