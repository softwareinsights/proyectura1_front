import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TipoobrasInterface } from './tipoobras.interface';
import { TipoobrasResponseInterface } from './tipoobras-response.interface';
import { Component, OnInit } from '@angular/core';
import { TipoobrasService } from './tipoobras.service';
import { TipoobrasAddModalComponent } from './tipoobras-add-modal/tipoobras-add-modal.component';
import { TipoobrasEditModalComponent } from './tipoobras-edit-modal/tipoobras-edit-modal.component';
@Component({
selector: 'tipoobras-table',
templateUrl: './tipoobras-table.html',
styleUrls: ['./tipoobras-table.scss'],
})
export class TipoobrasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idtipoobra';
    sortOrder = 'asc';
    constructor(
      private service: TipoobrasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(TipoobrasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(tipoobras: TipoobrasInterface) {
      const disposable = this.dialogService.addDialog(TipoobrasEditModalComponent, tipoobras)
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
          this.service.remove(item.idtipoobra)
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
            (data: TipoobrasResponseInterface) =>  {
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
