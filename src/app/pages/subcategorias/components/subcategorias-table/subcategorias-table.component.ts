import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { SubcategoriasInterface } from './subcategorias.interface';
import { SubcategoriasResponseInterface } from './subcategorias-response.interface';
import { Component, OnInit } from '@angular/core';
import { SubcategoriasService } from './subcategorias.service';
import { SubcategoriasAddModalComponent } from './subcategorias-add-modal/subcategorias-add-modal.component';
import { SubcategoriasEditModalComponent } from './subcategorias-edit-modal/subcategorias-edit-modal.component';
@Component({
selector: 'subcategorias-table',
templateUrl: './subcategorias-table.html',
styleUrls: ['./subcategorias-table.scss'],
})
export class SubcategoriasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idsubcategoria';
    sortOrder = 'asc';
    constructor(
      private service: SubcategoriasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(SubcategoriasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(subcategorias: SubcategoriasInterface) {
      const disposable = this.dialogService.addDialog(SubcategoriasEditModalComponent, subcategorias)
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
          this.service.remove(item.idsubcategoria)
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
            (data: SubcategoriasResponseInterface) =>  {
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
