import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ArchivosInterface } from './archivos.interface';
import { ArchivosResponseInterface } from './archivos-response.interface';
import { Component, OnInit } from '@angular/core';
import { ArchivosService } from './archivos.service';
import { ArchivosAddModalComponent } from './archivos-add-modal/archivos-add-modal.component';
import { ArchivosEditModalComponent } from './archivos-edit-modal/archivos-edit-modal.component';
@Component({
selector: 'archivos-table',
templateUrl: './archivos-table.html',
styleUrls: ['./archivos-table.scss'],
})
export class ArchivosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idarchivo';
    sortOrder = 'asc';
    constructor(
      private service: ArchivosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(ArchivosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(archivos: ArchivosInterface) {
      const disposable = this.dialogService.addDialog(ArchivosEditModalComponent, archivos)
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
          this.service.remove(item.idarchivo)
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
            (data: ArchivosResponseInterface) =>  {
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
