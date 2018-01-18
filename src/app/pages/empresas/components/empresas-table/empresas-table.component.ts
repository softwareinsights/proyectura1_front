import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EmpresasInterface } from './empresas.interface';
import { EmpresasResponseInterface } from './empresas-response.interface';
import { Component, OnInit } from '@angular/core';
import { EmpresasService } from './empresas.service';
import { EmpresasAddModalComponent } from './empresas-add-modal/empresas-add-modal.component';
import { EmpresasEditModalComponent } from './empresas-edit-modal/empresas-edit-modal.component';
@Component({
selector: 'empresas-table',
templateUrl: './empresas-table.html',
styleUrls: ['./empresas-table.scss'],
})
export class EmpresasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idempresa';
    sortOrder = 'asc';
    constructor(
      private service: EmpresasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(EmpresasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(empresas: EmpresasInterface) {
      const disposable = this.dialogService.addDialog(EmpresasEditModalComponent, empresas)
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
          this.service.remove(item.idempresa)
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
            (data: EmpresasResponseInterface) =>  {
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
