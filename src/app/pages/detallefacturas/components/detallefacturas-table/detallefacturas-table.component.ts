import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { DetallefacturasInterface } from './detallefacturas.interface';
import { DetallefacturasResponseInterface } from './detallefacturas-response.interface';
import { Component, OnInit } from '@angular/core';
import { DetallefacturasService } from './detallefacturas.service';
import { DetallefacturasAddModalComponent } from './detallefacturas-add-modal/detallefacturas-add-modal.component';
import { DetallefacturasEditModalComponent } from './detallefacturas-edit-modal/detallefacturas-edit-modal.component';
import { FacturasService } from 'app/pages/facturas/components/facturas-table/facturas.service';
@Component({
selector: 'detallefacturas-table',
templateUrl: './detallefacturas-table.html',
styleUrls: ['./detallefacturas-table.scss'],
})
export class DetallefacturasTableComponent implements OnInit {
  
    _factura: string[] = [];
    idfactura: number;

    porFactura: boolean;

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'iddetallefactura';
    sortOrder = 'asc';
    constructor(
      private service: DetallefacturasService, 
      private facturaservice: FacturasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
      this.getFactura();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(DetallefacturasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(detallefacturas: DetallefacturasInterface) {
      const disposable = this.dialogService.addDialog(DetallefacturasEditModalComponent, detallefacturas)
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
          this.service.remove(item.iddetallefactura)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Delete completed')
          );
      } else {
          console.log('item cancelado');
      }
    }

        filtrarPor(filtro) {
          if (filtro === 'porFactura') {
            this.porFactura = true;
          } else {
            this.porFactura = false;
          }

      }

      getFactura() {
        this.facturaservice.all()
        .subscribe(
            (data: any) => this._factura = data.lista,
        );
      }


      private getAllPorFactura() {
        this.service.getAllPorFactura(this.idfactura)
        .subscribe(
          (data: DetallefacturasResponseInterface) =>  {
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

        if(this.porFactura) {
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
