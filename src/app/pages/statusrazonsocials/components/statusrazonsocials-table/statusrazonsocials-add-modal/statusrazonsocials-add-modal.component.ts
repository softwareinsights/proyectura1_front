import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { StatusrazonsocialsService } from './../statusrazonsocials.service';
import { StatusrazonsocialsInterface } from './../statusrazonsocials.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./statusrazonsocials-add-modal.component.scss')],
  templateUrl: './statusrazonsocials-add-modal.component.html'
})
export class StatusrazonsocialsAddModalComponent extends DialogComponent<StatusrazonsocialsInterface, any> implements OnInit {

  idstatusrazonsocial: number;
  statusrazonsocial: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  idstatusrazonsocialAC: AbstractControl;
  statusrazonsocialAC: AbstractControl;

  constructor(
    private service: StatusrazonsocialsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'idstatusrazonsocialAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'statusrazonsocialAC' : ['',Validators.compose([Validators.maxLength(60)])],
    });
    this.idstatusrazonsocialAC = this.form.controls['idstatusrazonsocialAC'];
    this.statusrazonsocialAC = this.form.controls['statusrazonsocialAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: StatusrazonsocialsInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  idstatusrazonsocial: this.idstatusrazonsocial,
                  statusrazonsocial: this.statusrazonsocial,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
