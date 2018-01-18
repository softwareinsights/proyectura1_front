import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { CotizacionsInterface } from './cotizacions.interface';
import { CotizacionsResponseInterface } from './cotizacions-response.interface';
import { Component, OnInit } from '@angular/core';
import { CotizacionsService } from './cotizacions.service';
import { CotizacionsAddModalComponent } from './cotizacions-add-modal/cotizacions-add-modal.component';
import { CotizacionsEditModalComponent } from './cotizacions-edit-modal/cotizacions-edit-modal.component';
@Component({
selector: 'cotizacions-table',
templateUrl: './cotizacions-table.html',
styleUrls: ['./cotizacions-table.scss'],
})
export class CotizacionsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idcotizacion';
    sortOrder = 'asc';
    constructor(
      private service: CotizacionsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(CotizacionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(cotizacions: CotizacionsInterface) {
      const disposable = this.dialogService.addDialog(CotizacionsEditModalComponent, cotizacions)
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
          this.service.remove(item.idcotizacion)
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
            (data: CotizacionsResponseInterface) =>  {
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
