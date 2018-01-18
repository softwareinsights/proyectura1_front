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
          this.service.remove(item.idobracategoria)
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
            (data: ObracategoriasResponseInterface) =>  {
                if (data.success) {
                  this.data = data.result;
                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
