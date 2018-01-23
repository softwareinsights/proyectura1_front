import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { RazonsocialsInterface } from './razonsocials.interface';
import { RazonsocialsResponseInterface } from './razonsocials-response.interface';
import { Component, OnInit } from '@angular/core';
import { RazonsocialsService } from './razonsocials.service';
import { RazonsocialsAddModalComponent } from './razonsocials-add-modal/razonsocials-add-modal.component';
import { RazonsocialsEditModalComponent } from './razonsocials-edit-modal/razonsocials-edit-modal.component';
@Component({
selector: 'razonsocials-table',
templateUrl: './razonsocials-table.html',
styleUrls: ['./razonsocials-table.scss'],
})
export class RazonsocialsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idrazonsocial';
    sortOrder = 'asc';
    constructor(
      private service: RazonsocialsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(RazonsocialsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(razonsocials: RazonsocialsInterface) {
      const disposable = this.dialogService.addDialog(RazonsocialsEditModalComponent, razonsocials)
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
          this.service.remove(item.idrazonsocial)
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
            (data: RazonsocialsResponseInterface) =>  {
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
