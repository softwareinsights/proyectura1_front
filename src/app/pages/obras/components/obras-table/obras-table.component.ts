import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
      private dialogService: DialogService,
      private modalService: NgbModal ) {
    }
    ngOnInit() {
        this.getAll();
    }
    addFile(id: number, descripcion: string) {
      const activeModal = this.modalService.open(UploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Obra';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Obra';
    }
    getFiles(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Obra';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Obra';
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
    autorizar(event, item): void {
      if (window.confirm('¿Estas seguro de querer autorizar esta Obra?')) {
          this.service.autorizarObra(item.idobra)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Obra Autorizada')
          );
      } else {
          console.log('item cancelado');
      }
    }
    bloquear(event, item): void {
      if (window.confirm('¿Estas seguro de querer bloquear esta Obra?')) {
          this.service.bloquearObra(item.idobra)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Obra Autorizada')
          );
      } else {
          console.log('item cancelado');
      }
    }
    cancelar(event, item): void {
      if (window.confirm('¿Estas seguro de querer cancelar esta Obra?')) {
          this.service.cancelarObra(item.idobra)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Obra Autorizada')
          );
      } else {
          console.log('item cancelado');
      }
    }
    finalizar(event, item): void {
      if (window.confirm('¿Estas seguro de querer finalizar esta Obra?')) {
          this.service.finalizarObra(item.idobra)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Obra Autorizada')
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
