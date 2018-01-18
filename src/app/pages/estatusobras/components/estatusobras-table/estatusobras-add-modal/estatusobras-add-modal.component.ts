import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EstatusobrasService } from './../estatusobras.service';
import { EstatusobrasInterface } from './../estatusobras.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./estatusobras-add-modal.component.scss')],
  templateUrl: './estatusobras-add-modal.component.html'
})
export class EstatusobrasAddModalComponent extends DialogComponent<EstatusobrasInterface, any> implements OnInit {

  estatusobra: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  estatusobraAC: AbstractControl;

  constructor(
    private service: EstatusobrasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'estatusobraAC' : ['',Validators.compose([Validators.maxLength(45)])],
    });
    this.estatusobraAC = this.form.controls['estatusobraAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: EstatusobrasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  estatusobra: this.estatusobra,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
