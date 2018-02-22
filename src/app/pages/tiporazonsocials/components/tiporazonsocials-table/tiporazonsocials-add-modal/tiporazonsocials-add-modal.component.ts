import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TiporazonsocialsService } from './../tiporazonsocials.service';
import { TiporazonsocialsInterface } from './../tiporazonsocials.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./tiporazonsocials-add-modal.component.scss')],
  templateUrl: './tiporazonsocials-add-modal.component.html'
})
export class TiporazonsocialsAddModalComponent extends DialogComponent<TiporazonsocialsInterface, any> implements OnInit {

 
  tiporazonsocial: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
 
  tiporazonsocialAC: AbstractControl;

  constructor(
    private service: TiporazonsocialsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    
    'tiporazonsocialAC' : ['',Validators.compose([Validators.maxLength(60)])],
    });
   
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
        .insert({
                
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
