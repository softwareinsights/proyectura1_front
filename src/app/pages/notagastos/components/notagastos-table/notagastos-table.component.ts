import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { NotagastosInterface } from './notagastos.interface';
import { NotagastosResponseInterface } from './notagastos-response.interface';
import { Component, OnInit } from '@angular/core';
import { NotagastosService } from './notagastos.service';
import { NotagastosAddModalComponent } from './notagastos-add-modal/notagastos-add-modal.component';
import { NotagastosEditModalComponent } from './notagastos-edit-modal/notagastos-edit-modal.component';
import { RazonsocialsService } from 'app/pages/razonsocials/components/razonsocials-table/razonsocials.service';
import { ConfirmModalComponent } from '../../../../shared/confirm-modal/confirm-modal.component';
@Component({
selector: 'notagastos-table',
templateUrl: './notagastos-table.html',
styleUrls: ['./notagastos-table.scss'],
})
export class NotagastosTableComponent implements OnInit {
    _razonsocial: string[] = [];
    idrazonsocial: number;

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idnotagasto';
    sortOrder = 'asc';
  
    porFecha: boolean;
    porRazonsocial: boolean;
    porFecharazonsocial: boolean;
    fechainicial: string;
    fechafinal: string;

    constructor(
      private service: NotagastosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService,
      private razonsocialService: RazonsocialsService) {
    }
    ngOnInit() {
      this.getRazonsocial();
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
      this.dialogService.addDialog( ConfirmModalComponent, {
        titulo: 'Eliminar Nota Gasto',
        descripcion: '¿Estas seguro de querer eliminar este registro?'
      }).subscribe( remove => {
        if ( remove ) {
          
          this.service.remove(item.idnotagasto)
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
        this.porFecharazonsocial = false;
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
          (data: NotagastosResponseInterface) =>  {
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
      (data: NotagastosResponseInterface) =>  {
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
      (data: NotagastosResponseInterface) =>  {
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
      if (result.info.valorRespuesta) {
        this.toastrService.success(result.info.mensajeRespuesta);
        this.showResults();
      } else {
        this.toastrService.error(result.info.mensajeRespuesta);
      }
  }

}
