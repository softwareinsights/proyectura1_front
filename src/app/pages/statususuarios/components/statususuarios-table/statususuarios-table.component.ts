import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { StatususuariosInterface } from './statususuarios.interface';
import { StatususuariosResponseInterface } from './statususuarios-response.interface';
import { Component, OnInit } from '@angular/core';
import { StatususuariosService } from './statususuarios.service';
import { StatususuariosAddModalComponent } from './statususuarios-add-modal/statususuarios-add-modal.component';
import { StatususuariosEditModalComponent } from './statususuarios-edit-modal/statususuarios-edit-modal.component';
@Component({
selector: 'statususuarios-table',
templateUrl: './statususuarios-table.html',
styleUrls: ['./statususuarios-table.scss'],
})
export class StatususuariosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idstatususuario';
    sortOrder = 'asc';
    constructor(
      private service: StatususuariosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(StatususuariosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(statususuarios: StatususuariosInterface) {
      const disposable = this.dialogService.addDialog(StatususuariosEditModalComponent, statususuarios)
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
          this.service.remove(item.idstatususuario)
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
            (data: StatususuariosResponseInterface) =>  {
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
