import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { StatususuariosService } from './../statususuarios.service';
import { StatususuariosInterface } from './../statususuarios.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./statususuarios-add-modal.component.scss')],
  templateUrl: './statususuarios-add-modal.component.html'
})
export class StatususuariosAddModalComponent extends DialogComponent<StatususuariosInterface, any> implements OnInit {

  statususuario: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  statususuarioAC: AbstractControl;

  constructor(
    private service: StatususuariosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'statususuarioAC' : ['',Validators.compose([Validators.maxLength(45)])],
    });
    this.statususuarioAC = this.form.controls['statususuarioAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: StatususuariosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  statususuario: this.statususuario,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
