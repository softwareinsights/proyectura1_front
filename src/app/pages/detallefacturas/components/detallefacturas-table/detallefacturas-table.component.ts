import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { DetallefacturasInterface } from './detallefacturas.interface';
import { DetallefacturasResponseInterface } from './detallefacturas-response.interface';
import { Component, OnInit } from '@angular/core';
import { DetallefacturasService } from './detallefacturas.service';
import { DetallefacturasAddModalComponent } from './detallefacturas-add-modal/detallefacturas-add-modal.component';
import { DetallefacturasEditModalComponent } from './detallefacturas-edit-modal/detallefacturas-edit-modal.component';
@Component({
selector: 'detallefacturas-table',
templateUrl: './detallefacturas-table.html',
styleUrls: ['./detallefacturas-table.scss'],
})
export class DetallefacturasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'iddetallefactura';
    sortOrder = 'asc';
    constructor(
      private service: DetallefacturasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(DetallefacturasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(detallefacturas: DetallefacturasInterface) {
      const disposable = this.dialogService.addDialog(DetallefacturasEditModalComponent, detallefacturas)
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
          this.service.remove(item.iddetallefactura)
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
      if (!result.idRespuesta) {
        this.toastrService.success(result.mensajeRespuesta);
        this.getAll();
      } else {
        this.toastrService.error(result.mensajeRespuesta);
      }
  }
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: DetallefacturasResponseInterface) =>  {
                if (!data.info.idRespuesta) {
                  this.data = data.lista;
                } else {
                  this.toastrService.error(data.info.mensajeRespuesta);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
