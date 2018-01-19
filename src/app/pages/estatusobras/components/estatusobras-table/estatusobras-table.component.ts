import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EstatusobrasInterface } from './estatusobras.interface';
import { EstatusobrasResponseInterface } from './estatusobras-response.interface';
import { Component, OnInit } from '@angular/core';
import { EstatusobrasService } from './estatusobras.service';
import { EstatusobrasAddModalComponent } from './estatusobras-add-modal/estatusobras-add-modal.component';
import { EstatusobrasEditModalComponent } from './estatusobras-edit-modal/estatusobras-edit-modal.component';
@Component({
selector: 'estatusobras-table',
templateUrl: './estatusobras-table.html',
styleUrls: ['./estatusobras-table.scss'],
})
export class EstatusobrasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idestatusobra';
    sortOrder = 'asc';
    constructor(
      private service: EstatusobrasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(EstatusobrasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(estatusobras: EstatusobrasInterface) {
      const disposable = this.dialogService.addDialog(EstatusobrasEditModalComponent, estatusobras)
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
          this.service.remove(item.idestatusobra)
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
            (data: EstatusobrasResponseInterface) =>  {
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
