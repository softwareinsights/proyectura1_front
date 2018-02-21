import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { DetallecotizacionsInterface } from './detallecotizacions.interface';
import { DetallecotizacionsResponseInterface } from './detallecotizacions-response.interface';
import { Component, OnInit } from '@angular/core';
import { DetallecotizacionsService } from './detallecotizacions.service';
import { DetallecotizacionsAddModalComponent } from './detallecotizacions-add-modal/detallecotizacions-add-modal.component';
import { DetallecotizacionsEditModalComponent } from './detallecotizacions-edit-modal/detallecotizacions-edit-modal.component';
import { CotizacionsService } from 'app/pages/cotizacions/components/cotizacions-table/cotizacions.service';
import { ConfirmModalComponent } from '../../../../shared/confirm-modal/confirm-modal.component';
@Component({
selector: 'detallecotizacions-table',
templateUrl: './detallecotizacions-table.html',
styleUrls: ['./detallecotizacions-table.scss'],
})
export class DetallecotizacionsTableComponent implements OnInit {

  
  _cotizacion: string[] = [];
  idcotizacion: number;

  porCotizacion: boolean;

 

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'iddetallecotizacion';
    sortOrder = 'asc';

    
    constructor(
      private service: DetallecotizacionsService, 
      private cotizacionservice: CotizacionsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
      this.getFactura();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(DetallecotizacionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(detallecotizacions: DetallecotizacionsInterface) {
      const disposable = this.dialogService.addDialog(DetallecotizacionsEditModalComponent, detallecotizacions)
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
        titulo: 'Eliminar Detalle Cotización',
        descripcion: '¿Estas seguro de querer eliminar este registro?'
      }).subscribe( remove => {
        if ( remove ) {
          
          this.service.remove(item.iddetallecotizacion)
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
        if (filtro === 'porCotizacion') {
          this.porCotizacion = true;
        } else {
          this.porCotizacion = false;
        }

    }

    getFactura() {
      this.cotizacionservice.all()
      .subscribe(
          (data: any) => this._cotizacion = data.lista,
      );
    }


    private getAllPorFactura() {
      this.service.getAllPorFactura(this.idcotizacion)
      .subscribe(
        (data: DetallecotizacionsResponseInterface) =>  {
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

      if(this.porCotizacion) {
        this.getAllPorFactura();
      }
    
    }



    showToast(result: any) {
      if (result.valorRespuesta) {
        this.toastrService.success(result.mensajeRespuesta);
        this.showResults();
      } else {
        this.toastrService.error(result.mensajeRespuesta);
      }
  }
}
