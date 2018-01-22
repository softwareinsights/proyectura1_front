import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { CostosInterface } from './costos.interface';
import { CostosResponseInterface } from './costos-response.interface';
import { Component, OnInit } from '@angular/core';
import { CostosService } from './costos.service';
import { CostosAddModalComponent } from './costos-add-modal/costos-add-modal.component';
import { CostosEditModalComponent } from './costos-edit-modal/costos-edit-modal.component';
@Component({
selector: 'costos-table',
templateUrl: './costos-table.html',
styleUrls: ['./costos-table.scss'],
})
export class CostosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idcosto';
    sortOrder = 'asc';
    constructor(
      private service: CostosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(CostosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(costos: CostosInterface) {
      const disposable = this.dialogService.addDialog(CostosEditModalComponent, costos)
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
          this.service.remove(item.idcosto)
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
            (data: CostosResponseInterface) =>  {
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
