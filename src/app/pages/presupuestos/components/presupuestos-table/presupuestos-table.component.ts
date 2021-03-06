import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PresupuestosInterface } from './presupuestos.interface';
import { PresupuestosResponseInterface } from './presupuestos-response.interface';
import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from './presupuestos.service';
import { PresupuestosAddModalComponent } from './presupuestos-add-modal/presupuestos-add-modal.component';
import { PresupuestosEditModalComponent } from './presupuestos-edit-modal/presupuestos-edit-modal.component';
@Component({
selector: 'presupuestos-table',
templateUrl: './presupuestos-table.html',
styleUrls: ['./presupuestos-table.scss'],
})
export class PresupuestosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpresupuesto';
    sortOrder = 'asc';
    constructor(
      private service: PresupuestosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(PresupuestosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(presupuestos: PresupuestosInterface) {
      const disposable = this.dialogService.addDialog(PresupuestosEditModalComponent, presupuestos)
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
          this.service.remove(item.idpresupuesto)
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
            (data: PresupuestosResponseInterface) =>  {
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
