import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EstatuscotizacionsInterface } from './estatuscotizacions.interface';
import { EstatuscotizacionsResponseInterface } from './estatuscotizacions-response.interface';
import { Component, OnInit } from '@angular/core';
import { EstatuscotizacionsService } from './estatuscotizacions.service';
import { EstatuscotizacionsAddModalComponent } from './estatuscotizacions-add-modal/estatuscotizacions-add-modal.component';
import { EstatuscotizacionsEditModalComponent } from './estatuscotizacions-edit-modal/estatuscotizacions-edit-modal.component';
@Component({
selector: 'estatuscotizacions-table',
templateUrl: './estatuscotizacions-table.html',
styleUrls: ['./estatuscotizacions-table.scss'],
})
export class EstatuscotizacionsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idestatuscotizacion';
    sortOrder = 'asc';
    constructor(
      private service: EstatuscotizacionsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(EstatuscotizacionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(estatuscotizacions: EstatuscotizacionsInterface) {
      const disposable = this.dialogService.addDialog(EstatuscotizacionsEditModalComponent, estatuscotizacions)
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
          this.service.remove(item.idestatuscotizacion)
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
      if (result.valorRespuesta) {
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
            (data: EstatuscotizacionsResponseInterface) =>  {
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
