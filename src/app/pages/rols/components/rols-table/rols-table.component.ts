import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { RolsInterface } from './rols.interface';
import { RolsResponseInterface } from './rols-response.interface';
import { Component, OnInit } from '@angular/core';
import { RolsService } from './rols.service';
import { RolsAddModalComponent } from './rols-add-modal/rols-add-modal.component';
import { RolsEditModalComponent } from './rols-edit-modal/rols-edit-modal.component';
@Component({
selector: 'rols-table',
templateUrl: './rols-table.html',
styleUrls: ['./rols-table.scss'],
})
export class RolsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idrol';
    sortOrder = 'asc';
    constructor(
      private service: RolsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(RolsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(rols: RolsInterface) {
      const disposable = this.dialogService.addDialog(RolsEditModalComponent, rols)
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
          this.service.remove(item.idrol)
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
            (data: RolsResponseInterface) =>  {
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
