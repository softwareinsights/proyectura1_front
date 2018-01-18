import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { NotagastosInterface } from './notagastos.interface';
import { NotagastosResponseInterface } from './notagastos-response.interface';
import { Component, OnInit } from '@angular/core';
import { NotagastosService } from './notagastos.service';
import { NotagastosAddModalComponent } from './notagastos-add-modal/notagastos-add-modal.component';
import { NotagastosEditModalComponent } from './notagastos-edit-modal/notagastos-edit-modal.component';
@Component({
selector: 'notagastos-table',
templateUrl: './notagastos-table.html',
styleUrls: ['./notagastos-table.scss'],
})
export class NotagastosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idnotagasto';
    sortOrder = 'asc';
    constructor(
      private service: NotagastosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(NotagastosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(notagastos: NotagastosInterface) {
      const disposable = this.dialogService.addDialog(NotagastosEditModalComponent, notagastos)
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
          this.service.remove(item.idnotagasto)
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
            (data: NotagastosResponseInterface) =>  {
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
