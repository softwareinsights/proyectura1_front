import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { CategoriasInterface } from './categorias.interface';
import { CategoriasResponseInterface } from './categorias-response.interface';
import { Component, OnInit } from '@angular/core';
import { CategoriasService } from './categorias.service';
import { CategoriasAddModalComponent } from './categorias-add-modal/categorias-add-modal.component';
import { CategoriasEditModalComponent } from './categorias-edit-modal/categorias-edit-modal.component';
@Component({
selector: 'categorias-table',
templateUrl: './categorias-table.html',
styleUrls: ['./categorias-table.scss'],
})
export class CategoriasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idcategoria';
    sortOrder = 'asc';
    constructor(
      private service: CategoriasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(CategoriasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(categorias: CategoriasInterface) {
      const disposable = this.dialogService.addDialog(CategoriasEditModalComponent, categorias)
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
          this.service.remove(item.idcategoria)
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
            (data: CategoriasResponseInterface) =>  {
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
