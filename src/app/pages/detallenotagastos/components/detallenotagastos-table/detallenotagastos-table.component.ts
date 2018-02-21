import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { DetallenotagastosInterface } from './detallenotagastos.interface';
import { DetallenotagastosResponseInterface } from './detallenotagastos-response.interface';
import { Component, OnInit } from '@angular/core';
import { DetallenotagastosService } from './detallenotagastos.service';
import { DetallenotagastosAddModalComponent } from './detallenotagastos-add-modal/detallenotagastos-add-modal.component';
import { DetallenotagastosEditModalComponent } from './detallenotagastos-edit-modal/detallenotagastos-edit-modal.component';
import { NotagastosService } from 'app/pages/notagastos/components/notagastos-table/notagastos.service';
import { ConfirmModalComponent } from '../../../../shared/confirm-modal/confirm-modal.component';
@Component({
selector: 'detallenotagastos-table',
templateUrl: './detallenotagastos-table.html',
styleUrls: ['./detallenotagastos-table.scss'],
})
export class DetallenotagastosTableComponent implements OnInit {
 
  _notagasto: string[] = [];
  idnotagasto: number;

  porNotagasto: boolean;


    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'iddetallenotagasto';
    sortOrder = 'asc';

    constructor(
      private service: DetallenotagastosService,
      private notagastoservice: NotagastosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getNotagasto();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(DetallenotagastosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(detallenotagastos: DetallenotagastosInterface) {
      const disposable = this.dialogService.addDialog(DetallenotagastosEditModalComponent, detallenotagastos)
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
        titulo: 'Eliminar Detalle Nota Gasto',
        descripcion: '¿Estas seguro de querer eliminar este registro?'
      }).subscribe( remove => {
        if ( remove ) {
          
          this.service.remove(item.iddetallenotagasto)
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

        filtrarPor(filtro) {
          if (filtro === 'porNotagasto') {
            this.porNotagasto = true;
          } else {
            this.porNotagasto = false;
          }

      }

      getNotagasto() {
        this.notagastoservice.all()
        .subscribe(
            (data: any) => this._notagasto = data.lista,
        );
      }


      private getAllPorNotagasto() {
        this.service.getAllPorNotagasto(this.idnotagasto)
        .subscribe(
          (data: DetallenotagastosResponseInterface) =>  {
              if (data.info.valorRespuesta) {
                this.data = data.lista;
              } else {
                this.toastrService.error(data.info.mensajeRespuesta);
              }
          },
          error => console.log(error),
          () => console.log('Get all Items complete'))
      }


      showResults() {
    
        if(this.porNotagasto) {
          this.getAllPorNotagasto();
        }
      
      }

    showToast(result: any) {
      if (result.info.valorRespuesta) {
        this.toastrService.success(result.info.mensajeRespuesta);
        this.showResults();
      } else {
        this.toastrService.error(result.info.mensajeRespuesta);
      }
  }
   
  }
