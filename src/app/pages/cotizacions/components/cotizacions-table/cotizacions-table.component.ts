import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { CotizacionsInterface } from './cotizacions.interface';
import { CotizacionsResponseInterface } from './cotizacions-response.interface';
import { Component, OnInit } from '@angular/core';
import { CotizacionsService } from './cotizacions.service';
import { CotizacionsAddModalComponent } from './cotizacions-add-modal/cotizacions-add-modal.component';
import { CotizacionsEditModalComponent } from './cotizacions-edit-modal/cotizacions-edit-modal.component';
import { CategoriasService } from 'app/pages/categorias/components/categorias-table/categorias.service';
import { SubcategoriasService } from 'app/pages/subcategorias/components/subcategorias-table/subcategorias.service';
import { ObrasService } from 'app/pages/obras/components/obras-table/obras.service';
@Component({
selector: 'cotizacions-table',
templateUrl: './cotizacions-table.html',
styleUrls: ['./cotizacions-table.scss'],
})
export class CotizacionsTableComponent implements OnInit {
  
    _categoria: string[] = [];
    _subcategoria: string[] = [];
    _obra: string[] = [];

    idobra: number;
    idcategoria: number;
    idsubcategoria: number;

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idcotizacion';
    sortOrder = 'asc';

    porFecha: boolean;
    porObra: boolean;
    porCategoria: boolean;
    porSubCategoria: boolean;

    fechainicial: string;
    fechafinal: string;


    constructor(
      private service: CotizacionsService, 
      private categoriasService: CategoriasService,
      private subcategoriasService: SubcategoriasService,
      private obrasService: ObrasService,

      private toastrService: ToastrService, 
      private dialogService: DialogService) {

        this.porFecha = false;
        this.porObra = false;
        this.porCategoria = false;
        this.porSubCategoria = false;
    }
    ngOnInit() {
      this.getCategoria();
      this.getSubCategoria();
      this.getObra();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(CotizacionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(cotizacions: CotizacionsInterface) {
      const disposable = this.dialogService.addDialog(CotizacionsEditModalComponent, cotizacions)
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
          this.service.remove(item.idcotizacion)
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
        if (filtro === 'porFecha') {
          this.porFecha = true;
          this.porObra = false;
          this.porCategoria = false;
          this.porSubCategoria = false;
        } else {
          this.porFecha = false;
        }
        if (filtro === 'porObra') {
          this.porObra = true;
          this.porFecha = false;
          this.porCategoria = false;
          this.porSubCategoria = false;
        } else {
          this.porObra = false;
        }
        if (filtro === 'porCategoria') {
          this.porCategoria = true;
          this.porObra = false;
          this.porFecha = false;
          this.porSubCategoria = false;
        } else {
          this.porCategoria = false;
        }
        if (filtro === 'porSubCategoria') {
          this.porSubCategoria = true;
          this.porObra = false;
          this.porFecha = false;
          this.porCategoria = false;
        } else {
          this.porSubCategoria = false;
        }
    }

    getCategoria() {
      this.categoriasService.all()
      .subscribe(
          (data: any) => this._categoria = data.lista,
      );
    }
    getSubCategoria() {
        this.subcategoriasService.all()
        .subscribe(
            (data: any) => this._subcategoria = data.lista,
        );
    }
    getObra() {
        this.obrasService.all()
        .subscribe(
            (data: any) => this._obra = data.lista,
        );
    }

    private getAllPorFecha(): void {
      this.service
        .getAllPorFecha(this.fechainicial, this.fechafinal)
        .subscribe(
            (data: CotizacionsResponseInterface) =>  {
                if (data.info.valorRespuesta) {
                  this.data = data.lista;
                } else {
                  this.toastrService.error(data.info.mensajeRespuesta);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
    private getAllPorCategoria() {
      this.service.getAllPorCategoria(this.idcategoria, this.idobra)
      .subscribe(
        (data: CotizacionsResponseInterface) =>  {
            if (data.info.valorRespuesta) {
              this.data = data.lista;
            } else {
              this.toastrService.error(data.info.mensajeRespuesta);
            }
        },
        error => console.log(error),
        () => console.log('Get all Items complete'))
    }
    private getAllPorSubCategoria() {
        this.service.getAllPorSubCategoria(this.idsubcategoria, this.idobra, this.idcategoria)
        .subscribe(
          (data: CotizacionsResponseInterface) =>  {
              if (data.info.valorRespuesta) {
                this.data = data.lista;
              } else {
                this.toastrService.error(data.info.mensajeRespuesta);
              }
          },
          error => console.log(error),
          () => console.log('Get all Items complete'))
    }
    private getAllPorObra() {
        this.service.getAllPorObra(this.idobra)
        .subscribe(
          (data: CotizacionsResponseInterface) =>  {
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
      if(this.porObra) {
        this.getAllPorObra();
      }
      if(this.porCategoria) {
        this.getAllPorCategoria();
      }
      if(this.porSubCategoria) {
        this.getAllPorSubCategoria();
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
