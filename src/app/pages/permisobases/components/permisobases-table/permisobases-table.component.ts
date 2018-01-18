import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PermisobasesInterface } from './permisobases.interface';
import { PermisobasesResponseInterface } from './permisobases-response.interface';
import { Component, OnInit } from '@angular/core';
import { PermisobasesService } from './permisobases.service';
import { PermisobasesAddModalComponent } from './permisobases-add-modal/permisobases-add-modal.component';
import { PermisobasesEditModalComponent } from './permisobases-edit-modal/permisobases-edit-modal.component';
@Component({
selector: 'permisobases-table',
templateUrl: './permisobases-table.html',
styleUrls: ['./permisobases-table.scss'],
})
export class PermisobasesTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpermisobase';
    sortOrder = 'asc';
    constructor(
      private service: PermisobasesService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(PermisobasesAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(permisobases: PermisobasesInterface) {
      const disposable = this.dialogService.addDialog(PermisobasesEditModalComponent, permisobases)
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
          this.service.remove(item.idpermisobase)
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
            (data: PermisobasesResponseInterface) =>  {
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
