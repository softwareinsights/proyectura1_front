import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { FacturasInterface } from './facturas.interface';
import { FacturasResponseInterface } from './facturas-response.interface';
import { Component, OnInit } from '@angular/core';
import { FacturasService } from './facturas.service';
import { FacturasAddModalComponent } from './facturas-add-modal/facturas-add-modal.component';
import { FacturasEditModalComponent } from './facturas-edit-modal/facturas-edit-modal.component';
import { RazonsocialsService } from 'app/pages/razonsocials/components/razonsocials-table/razonsocials.service';
import { ConfirmModalComponent } from '../../../../shared/confirm-modal/confirm-modal.component';
@Component({
selector: 'facturas-table',
templateUrl: './facturas-table.html',
styleUrls: ['./facturas-table.scss'],
})
export class FacturasTableComponent implements OnInit {
    _razonsocial: string[] = [];
    idrazonsocial: number;
    
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idfactura';
    sortOrder = 'asc';

    porFecha: boolean;
    porRazonsocial: boolean;
    porFecharazonsocial: boolean;
    fechainicial: string;
    fechafinal: string;

    constructor(
      private service: FacturasService, 
      private razonsocialService: RazonsocialsService,
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
       this.getRazonsocial();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(FacturasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(facturas: FacturasInterface) {
      const disposable = this.dialogService.addDialog(FacturasEditModalComponent, facturas)
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
        titulo: 'Eliminar Factura',
        descripcion: '¿Estas seguro de querer eliminar este registro?'
      }).subscribe( remove => {
        if ( remove ) {
          
          this.service.remove(item.idfactura)
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
      if (filtro === 'porFecha') {
        this.porFecha = true;
        this.porRazonsocial = false;
        this.porFecharazonsocial = false;
      } else {
        this.porFecha = false;
      }
      if (filtro === 'porRazonsocial') {
        this.porRazonsocial = true;
        this.porFecha = false;
        this.porFecharazonsocial = false;
      } else {
        this.porRazonsocial = false;
      }
      if (filtro === 'porFecharazonsocial') {
        this.porFecharazonsocial = true;
        this.porFecha = false;
        this.porRazonsocial = false;
      } else {
        this.porFecharazonsocial = false;
      }

  }

  getRazonsocial() {
    this.razonsocialService.all()
    .subscribe(
        (data: any) => this._razonsocial = data.lista,
    );
  }

  private getAllPorFecha(): void {
    this.service
      .getAllPorFecha(this.fechainicial, this.fechafinal)
      .subscribe(
          (data: FacturasResponseInterface) =>  {
              if (data.info.valorRespuesta) {
                this.data = data.lista;
              } else {
                this.toastrService.error(data.info.mensajeRespuesta);
              }
          },
          error => console.log(error),
          () => console.log('Get all Items complete'))
  } 

  private getAllPorRazonsocial() {
    this.service.getAllPorRazonsocial(this.idrazonsocial)
    .subscribe(
      (data: FacturasResponseInterface) =>  {
          if (data.info.valorRespuesta) {
            this.data = data.lista;
          } else {
            this.toastrService.error(data.info.mensajeRespuesta);
          }
      },
      error => console.log(error),
      () => console.log('Get all Items complete'))
  }

  private getAllPorFecharazonsocial() {
    this.service.getAllPorFecharazonsocial(this.idrazonsocial, this.fechainicial, this.fechafinal)
    .subscribe(
      (data: FacturasResponseInterface) =>  {
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
    if(this.porFecha) {
      this.getAllPorFecha();
    }
    if(this.porRazonsocial) {
      this.getAllPorRazonsocial();
    }
    if(this.porFecharazonsocial) {
      this.getAllPorFecharazonsocial();
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
