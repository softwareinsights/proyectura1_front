import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ObrasInterface } from './obras.interface';
import { ObrasResponseInterface } from './obras-response.interface';
import { Component, OnInit } from '@angular/core';
import { ObrasService } from './obras.service';
import { ObrasAddModalComponent } from './obras-add-modal/obras-add-modal.component';
import { ObrasEditModalComponent } from './obras-edit-modal/obras-edit-modal.component';
@Component({
selector: 'obras-table',
templateUrl: './obras-table.html',
styleUrls: ['./obras-table.scss'],
})
export class ObrasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idobra';
    sortOrder = 'asc';
    constructor(
      private service: ObrasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(ObrasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(obras: ObrasInterface) {
      const disposable = this.dialogService.addDialog(ObrasEditModalComponent, obras)
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
          this.service.remove(item.idobra)
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
            (data: ObrasResponseInterface) =>  {
              console.log("getall data", data);
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
