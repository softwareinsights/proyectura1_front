import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ObracategoriasInterface } from './obracategorias.interface';
import { ObracategoriasResponseInterface } from './obracategorias-response.interface';
import { Component, OnInit } from '@angular/core';
import { ObracategoriasService } from './obracategorias.service';
import { ObracategoriasAddModalComponent } from './obracategorias-add-modal/obracategorias-add-modal.component';
import { ObracategoriasEditModalComponent } from './obracategorias-edit-modal/obracategorias-edit-modal.component';
@Component({
selector: 'obracategorias-table',
templateUrl: './obracategorias-table.html',
styleUrls: ['./obracategorias-table.scss'],
})
export class ObracategoriasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idobracategoria';
    sortOrder = 'asc';
    constructor(
      private service: ObracategoriasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(ObracategoriasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(obracategorias: ObracategoriasInterface) {
      const disposable = this.dialogService.addDialog(ObracategoriasEditModalComponent, obracategorias)
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
          this.service.remove(item.idobra, item.idcategoria)
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
            (data: ObracategoriasResponseInterface) =>  {
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
