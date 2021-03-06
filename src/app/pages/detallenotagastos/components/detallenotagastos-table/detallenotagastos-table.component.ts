import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { DetallenotagastosInterface } from './detallenotagastos.interface';
import { DetallenotagastosResponseInterface } from './detallenotagastos-response.interface';
import { Component, OnInit } from '@angular/core';
import { DetallenotagastosService } from './detallenotagastos.service';
import { DetallenotagastosAddModalComponent } from './detallenotagastos-add-modal/detallenotagastos-add-modal.component';
import { DetallenotagastosEditModalComponent } from './detallenotagastos-edit-modal/detallenotagastos-edit-modal.component';
@Component({
selector: 'detallenotagastos-table',
templateUrl: './detallenotagastos-table.html',
styleUrls: ['./detallenotagastos-table.scss'],
})
export class DetallenotagastosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'iddetallenotagasto';
    sortOrder = 'asc';
    constructor(
      private service: DetallenotagastosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(DetallenotagastosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(detallenotagastos: DetallenotagastosInterface) {
      const disposable = this.dialogService.addDialog(DetallenotagastosEditModalComponent, detallenotagastos)
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
          this.service.remove(item.iddetallenotagasto)
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
            (data: DetallenotagastosResponseInterface) =>  {
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
