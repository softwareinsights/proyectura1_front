import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { MaterialsInterface } from './materials.interface';
import { MaterialsResponseInterface } from './materials-response.interface';
import { Component, OnInit } from '@angular/core';
import { MaterialsService } from './materials.service';
import { MaterialsAddModalComponent } from './materials-add-modal/materials-add-modal.component';
import { MaterialsEditModalComponent } from './materials-edit-modal/materials-edit-modal.component';
@Component({
selector: 'materials-table',
templateUrl: './materials-table.html',
styleUrls: ['./materials-table.scss'],
})
export class MaterialsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idmaterial';
    sortOrder = 'asc';
    constructor(
      private service: MaterialsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(MaterialsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(materials: MaterialsInterface) {
      const disposable = this.dialogService.addDialog(MaterialsEditModalComponent, materials)
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
          this.service.remove(item.idmaterial)
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
            (data: MaterialsResponseInterface) =>  {
              console.log("getall data", data);
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
