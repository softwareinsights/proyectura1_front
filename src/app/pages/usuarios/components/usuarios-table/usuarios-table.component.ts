import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { UsuariosInterface } from './usuarios.interface';
import { UsuariosResponseInterface } from './usuarios-response.interface';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { UsuariosAddModalComponent } from './usuarios-add-modal/usuarios-add-modal.component';
import { UsuariosEditModalComponent } from './usuarios-edit-modal/usuarios-edit-modal.component';
@Component({
selector: 'usuarios-table',
templateUrl: './usuarios-table.html',
styleUrls: ['./usuarios-table.scss'],
})
export class UsuariosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idusuario';
    sortOrder = 'asc';
    constructor(
      private service: UsuariosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(UsuariosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(usuarios: UsuariosInterface) {
      const disposable = this.dialogService.addDialog(UsuariosEditModalComponent, usuarios)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      },
      error => console.log(error),
      () => console.log('Modified complete'));
    }
    onDeleteConfirm(event, item): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
          this.service.remove(item.idusuario)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Delete completed')
          );
      } else {
          console.log('item cancelado');
      }
    }
    showToast(result) {
      if (result.success) {
        this.toastrService.success(result.message);
        this.getAll();
      } else {
        this.toastrService.error(result.message);
      }
    }
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: UsuariosResponseInterface) =>  {
                if (data.success) {
                  this.data = data.result;
                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
