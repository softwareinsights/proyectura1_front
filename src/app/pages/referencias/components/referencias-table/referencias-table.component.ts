import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ReferenciasInterface } from './referencias.interface';
import { ReferenciasResponseInterface } from './referencias-response.interface';
import { Component, OnInit } from '@angular/core';
import { ReferenciasService } from './referencias.service';
import { ReferenciasAddModalComponent } from './referencias-add-modal/referencias-add-modal.component';
import { ReferenciasEditModalComponent } from './referencias-edit-modal/referencias-edit-modal.component';
@Component({
selector: 'referencias-table',
templateUrl: './referencias-table.html',
styleUrls: ['./referencias-table.scss'],
})
export class ReferenciasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idreferencia';
    sortOrder = 'asc';
    constructor(
      private service: ReferenciasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(ReferenciasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(referencias: ReferenciasInterface) {
      const disposable = this.dialogService.addDialog(ReferenciasEditModalComponent, referencias)
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
          this.service.remove(item.idreferencia)
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
            (data: ReferenciasResponseInterface) =>  {
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
