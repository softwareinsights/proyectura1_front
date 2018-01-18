import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CategoriasService } from './../categorias.service';
import { CategoriasInterface } from './../categorias.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./categorias-add-modal.component.scss')],
  templateUrl: './categorias-add-modal.component.html'
})
export class CategoriasAddModalComponent extends DialogComponent<CategoriasInterface, any> implements OnInit {

  clavecategoria: string;
  descripcioncategoria: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  clavecategoriaAC: AbstractControl;
  descripcioncategoriaAC: AbstractControl;

  constructor(
    private service: CategoriasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'clavecategoriaAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'descripcioncategoriaAC' : ['',Validators.compose([Validators.maxLength(150)])],
    });
    this.clavecategoriaAC = this.form.controls['clavecategoriaAC'];
    this.descripcioncategoriaAC = this.form.controls['descripcioncategoriaAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: CategoriasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  clavecategoria: this.clavecategoria,
                  descripcioncategoria: this.descripcioncategoria,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
