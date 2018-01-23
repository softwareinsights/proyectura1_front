import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TiporazonsocialsInterface } from './tiporazonsocials.interface';
import { TiporazonsocialsResponseInterface } from './tiporazonsocials-response.interface';
import { Component, OnInit } from '@angular/core';
import { TiporazonsocialsService } from './tiporazonsocials.service';
import { TiporazonsocialsAddModalComponent } from './tiporazonsocials-add-modal/tiporazonsocials-add-modal.component';
import { TiporazonsocialsEditModalComponent } from './tiporazonsocials-edit-modal/tiporazonsocials-edit-modal.component';
@Component({
selector: 'tiporazonsocials-table',
templateUrl: './tiporazonsocials-table.html',
styleUrls: ['./tiporazonsocials-table.scss'],
})
export class TiporazonsocialsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idtiporazonsocial';
    sortOrder = 'asc';
    constructor(
      private service: TiporazonsocialsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(TiporazonsocialsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(tiporazonsocials: TiporazonsocialsInterface) {
      const disposable = this.dialogService.addDialog(TiporazonsocialsEditModalComponent, tiporazonsocials)
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
          this.service.remove(item.idtiporazonsocial)
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
            (data: TiporazonsocialsResponseInterface) =>  {
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
