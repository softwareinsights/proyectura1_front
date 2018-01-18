import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EstatuscotizacionsService } from './../estatuscotizacions.service';
import { EstatuscotizacionsInterface } from './../estatuscotizacions.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./estatuscotizacions-add-modal.component.scss')],
  templateUrl: './estatuscotizacions-add-modal.component.html'
})
export class EstatuscotizacionsAddModalComponent extends DialogComponent<EstatuscotizacionsInterface, any> implements OnInit {

  estatuscotizacion: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  estatuscotizacionAC: AbstractControl;

  constructor(
    private service: EstatuscotizacionsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'estatuscotizacionAC' : ['',Validators.compose([Validators.maxLength(45)])],
    });
    this.estatuscotizacionAC = this.form.controls['estatuscotizacionAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: EstatuscotizacionsInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  estatuscotizacion: this.estatuscotizacion,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
