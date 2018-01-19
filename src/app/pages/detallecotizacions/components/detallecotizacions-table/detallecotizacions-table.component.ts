import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { DetallecotizacionsInterface } from './detallecotizacions.interface';
import { DetallecotizacionsResponseInterface } from './detallecotizacions-response.interface';
import { Component, OnInit } from '@angular/core';
import { DetallecotizacionsService } from './detallecotizacions.service';
import { DetallecotizacionsAddModalComponent } from './detallecotizacions-add-modal/detallecotizacions-add-modal.component';
import { DetallecotizacionsEditModalComponent } from './detallecotizacions-edit-modal/detallecotizacions-edit-modal.component';
@Component({
selector: 'detallecotizacions-table',
templateUrl: './detallecotizacions-table.html',
styleUrls: ['./detallecotizacions-table.scss'],
})
export class DetallecotizacionsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'iddetallecotizacion';
    sortOrder = 'asc';
    constructor(
      private service: DetallecotizacionsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(DetallecotizacionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(detallecotizacions: DetallecotizacionsInterface) {
      const disposable = this.dialogService.addDialog(DetallecotizacionsEditModalComponent, detallecotizacions)
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
          this.service.remove(item.iddetallecotizacion)
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
            (data: DetallecotizacionsResponseInterface) =>  {
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
