import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { UnidadmedidasInterface } from './unidadmedidas.interface';
import { UnidadmedidasResponseInterface } from './unidadmedidas-response.interface';
import { Component, OnInit } from '@angular/core';
import { UnidadmedidasService } from './unidadmedidas.service';
import { UnidadmedidasAddModalComponent } from './unidadmedidas-add-modal/unidadmedidas-add-modal.component';
import { UnidadmedidasEditModalComponent } from './unidadmedidas-edit-modal/unidadmedidas-edit-modal.component';
@Component({
selector: 'unidadmedidas-table',
templateUrl: './unidadmedidas-table.html',
styleUrls: ['./unidadmedidas-table.scss'],
})
export class UnidadmedidasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idunidadmedida';
    sortOrder = 'asc';
    constructor(
      private service: UnidadmedidasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(UnidadmedidasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(unidadmedidas: UnidadmedidasInterface) {
      const disposable = this.dialogService.addDialog(UnidadmedidasEditModalComponent, unidadmedidas)
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
          this.service.remove(item.idunidadmedida)
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
            (data: UnidadmedidasResponseInterface) =>  {
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
