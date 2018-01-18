import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { StatusrazonsocialsInterface } from './statusrazonsocials.interface';
import { StatusrazonsocialsResponseInterface } from './statusrazonsocials-response.interface';
import { Component, OnInit } from '@angular/core';
import { StatusrazonsocialsService } from './statusrazonsocials.service';
import { StatusrazonsocialsAddModalComponent } from './statusrazonsocials-add-modal/statusrazonsocials-add-modal.component';
import { StatusrazonsocialsEditModalComponent } from './statusrazonsocials-edit-modal/statusrazonsocials-edit-modal.component';
@Component({
selector: 'statusrazonsocials-table',
templateUrl: './statusrazonsocials-table.html',
styleUrls: ['./statusrazonsocials-table.scss'],
})
export class StatusrazonsocialsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idstatusrazonsocial';
    sortOrder = 'asc';
    constructor(
      private service: StatusrazonsocialsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(StatusrazonsocialsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(statusrazonsocials: StatusrazonsocialsInterface) {
      const disposable = this.dialogService.addDialog(StatusrazonsocialsEditModalComponent, statusrazonsocials)
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
          this.service.remove(item.idstatusrazonsocial)
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
            (data: StatusrazonsocialsResponseInterface) =>  {
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
