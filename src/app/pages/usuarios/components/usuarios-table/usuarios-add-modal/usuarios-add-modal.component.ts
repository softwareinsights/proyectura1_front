import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { UsuariosService } from './../usuarios.service';
import { UsuariosInterface } from './../usuarios.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RolsService } from './../../../../rols/components/rols-table/rols.service';
import { RolsAddModalComponent } from './../../../../rols/components/rols-table/rols-add-modal/rols-add-modal.component';
import { StatususuariosService } from './../../../../statususuarios/components/statususuarios-table/statususuarios.service';
import { StatususuariosAddModalComponent } from './../../../../statususuarios/components/statususuarios-table/statususuarios-add-modal/statususuarios-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./usuarios-add-modal.component.scss')],
  templateUrl: './usuarios-add-modal.component.html'
})
export class UsuariosAddModalComponent extends DialogComponent<UsuariosInterface, any> implements OnInit {
  _rol: string[] = [];
  _statususuario: string[] = [];

  usuario: string;
  contrasena: string;
  nombre: string;
  email: string;
  telefono: string;
  idrol: number;
  idstatususuario: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  usuarioAC: AbstractControl;
  contrasenaAC: AbstractControl;
  nombreAC: AbstractControl;
  emailAC: AbstractControl;
  telefonoAC: AbstractControl;
  idrolAC: AbstractControl;
  idstatususuarioAC: AbstractControl;

  constructor(
    private service: UsuariosService,
    private rolsService: RolsService,
    private statususuariosService: StatususuariosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'usuarioAC' : ['',Validators.compose([Validators.maxLength(60)])],
    'contrasenaAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'nombreAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'emailAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'telefonoAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'idrolAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idstatususuarioAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    });
    this.usuarioAC = this.form.controls['usuarioAC'];
    this.contrasenaAC = this.form.controls['contrasenaAC'];
    this.nombreAC = this.form.controls['nombreAC'];
    this.emailAC = this.form.controls['emailAC'];
    this.telefonoAC = this.form.controls['telefonoAC'];
    this.idrolAC = this.form.controls['idrolAC'];
    this.idstatususuarioAC = this.form.controls['idstatususuarioAC'];
  }
  ngOnInit() {
      this.getRol();
      this.getStatususuario();
  }
  rolAddModalShow() {
      const disposable = this.dialogService.addDialog(RolsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.rolShowToast(data);
          }
      });
  }
  rolShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getRol();
      } else {
          this.toastrService.error(result.message);
      }
  }
  statususuarioAddModalShow() {
      const disposable = this.dialogService.addDialog(StatususuariosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.statususuarioShowToast(data);
          }
      });
  }
  statususuarioShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getStatususuario();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getRol() {
      this.rolsService.all()
      .subscribe(
          (data: any) => this._rol = data.result,
      );
  }
  getStatususuario() {
      this.statususuariosService.all()
      .subscribe(
          (data: any) => this._statususuario = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: UsuariosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  usuario: this.usuario,
                  contrasena: this.contrasena,
                  nombre: this.nombre,
                  email: this.email,
                  telefono: this.telefono,
                  idrol: this.idrol,
                  idstatususuario: this.idstatususuario,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
