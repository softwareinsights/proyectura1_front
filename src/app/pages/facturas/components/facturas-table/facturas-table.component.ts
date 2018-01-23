import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { FacturasInterface } from './facturas.interface';
import { FacturasResponseInterface } from './facturas-response.interface';
import { Component, OnInit } from '@angular/core';
import { FacturasService } from './facturas.service';
import { FacturasAddModalComponent } from './facturas-add-modal/facturas-add-modal.component';
import { FacturasEditModalComponent } from './facturas-edit-modal/facturas-edit-modal.component';
@Component({
selector: 'facturas-table',
templateUrl: './facturas-table.html',
styleUrls: ['./facturas-table.scss'],
})
export class FacturasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idfactura';
    sortOrder = 'asc';
    constructor(
      private service: FacturasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(FacturasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(facturas: FacturasInterface) {
      const disposable = this.dialogService.addDialog(FacturasEditModalComponent, facturas)
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
          this.service.remove(item.idfactura)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Delete completed')
          );
      } else {
          console.log('item cancelado');
      }
    }
    showToast(result: any) {
      if (result.info.valorRespuesta) {
        this.toastrService.success(result.info.mensajeRespuesta);
        this.getAll();
      } else {
        this.toastrService.error(result.info.mensajeRespuesta);
      }
  }
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: FacturasResponseInterface) =>  {
              console.log(data);
                if (data.info.valorRespuesta) {
                  this.data = data.lista;
                } else {
                  this.toastrService.error(data.info.mensajeRespuesta);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
