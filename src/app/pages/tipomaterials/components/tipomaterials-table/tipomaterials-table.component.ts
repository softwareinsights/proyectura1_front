import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TipomaterialsInterface } from './tipomaterials.interface';
import { TipomaterialsResponseInterface } from './tipomaterials-response.interface';
import { Component, OnInit } from '@angular/core';
import { TipomaterialsService } from './tipomaterials.service';
import { TipomaterialsAddModalComponent } from './tipomaterials-add-modal/tipomaterials-add-modal.component';
import { TipomaterialsEditModalComponent } from './tipomaterials-edit-modal/tipomaterials-edit-modal.component';
@Component({
selector: 'tipomaterials-table',
templateUrl: './tipomaterials-table.html',
styleUrls: ['./tipomaterials-table.scss'],
})
export class TipomaterialsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idtipomaterial';
    sortOrder = 'asc';
    constructor(
      private service: TipomaterialsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(TipomaterialsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(tipomaterials: TipomaterialsInterface) {
      const disposable = this.dialogService.addDialog(TipomaterialsEditModalComponent, tipomaterials)
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
          this.service.remove(item.idtipomaterial)
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
            (data: TipomaterialsResponseInterface) =>  {
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
