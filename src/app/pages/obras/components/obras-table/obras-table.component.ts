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
import { ConfirmModalComponent } from '../../../../shared/confirm-modal/confirm-modal.component';
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
        this.dialogService.addDialog( ConfirmModalComponent, {
          titulo: 'Eliminar Obra',
          descripcion: '¿Estas seguro de querer eliminar este registro?'
        }).subscribe( remove => {
          if ( remove ) {
            
            this.service.remove(item.idobra)
            .subscribe(
                (data) => this.showToast(data),
                error => console.log(error),
                () => console.log('Delete completed')
            );
  
          } else {
            console.log('Canceled');
          }
        });
      }
    autorizar(event, item): void {
        this.dialogService.addDialog( ConfirmModalComponent, {
            titulo: 'Autorizar Obra',
            descripcion: '¿Estas seguro de querer autorizar este registro?'
          }).subscribe( remove => {
            if ( remove ) {
              
              this.service.remove(item.idobra)
              .subscribe(
                  (data) => this.showToast(data),
                  error => console.log(error),
                  () => console.log('Delete completed')
              );
    
            } else {
              console.log('Canceled');
            }
          });
        }
    bloquear(event, item): void {
        this.dialogService.addDialog( ConfirmModalComponent, {
            titulo: 'Bloquear Obra',
            descripcion: '¿Estas seguro de querer bloquear este registro?'
          }).subscribe( remove => {
            if ( remove ) {
              
              this.service.remove(item.idobra)
              .subscribe(
                  (data) => this.showToast(data),
                  error => console.log(error),
                  () => console.log('Delete completed')
              );
    
            } else {
              console.log('Canceled');
            }
          });
        }
    cancelar(event, item): void {
        this.dialogService.addDialog( ConfirmModalComponent, {
            titulo: 'Cancelar Obra',
            descripcion: '¿Estas seguro de querer cancelar este registro?'
          }).subscribe( remove => {
            if ( remove ) {
              
              this.service.remove(item.idobra)
              .subscribe(
                  (data) => this.showToast(data),
                  error => console.log(error),
                  () => console.log('Delete completed')
              );
    
            } else {
              console.log('Canceled');
            }
          });
        }
    finalizar(event, item): void {
        this.dialogService.addDialog( ConfirmModalComponent, {
            titulo: 'Finalizar Obra',
            descripcion: '¿Estas seguro de querer finalizar este registro?'
          }).subscribe( remove => {
            if ( remove ) {
              
              this.service.remove(item.idobra)
              .subscribe(
                  (data) => this.showToast(data),
                  error => console.log(error),
                  () => console.log('Delete completed')
              );
    
            } else {
              console.log('Canceled');
            }
          });
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
