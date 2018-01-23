import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { CostosInterface } from './costos.interface';
import { CostosResponseInterface } from './costos-response.interface';
import { Component, OnInit } from '@angular/core';
import { CostosService } from './costos.service';
import { CostosAddModalComponent } from './costos-add-modal/costos-add-modal.component';
import { CostosEditModalComponent } from './costos-edit-modal/costos-edit-modal.component';
import { CategoriasService } from 'app/pages/categorias/components/categorias-table/categorias.service';
import { ObrasService } from 'app/pages/obras/components/obras-table/obras.service';
import { SubcategoriasService } from 'app/pages/subcategorias/components/subcategorias-table/subcategorias.service';
@Component({
selector: 'costos-table',
templateUrl: './costos-table.html',
styleUrls: ['./costos-table.scss'],
})
export class CostosTableComponent implements OnInit {

    _categoria: string[] = [];
    _subcategoria: string[] = [];
    _obra: string[] = [];

    idobra: number;
    idcategoria: number;
    idsubcategoria: number;

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idcosto';
    sortOrder = 'asc';

    porFecha: boolean;
    porObra: boolean;
    porCategoria: boolean;
    porSubCategoria: boolean;

    fechainicial: string;
    fechafinal: string;

    constructor(
      private service: CostosService,
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
      const disposable = this.dialogService.addDialog(CostosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(costos: CostosInterface) {
      const disposable = this.dialogService.addDialog(CostosEditModalComponent, costos)
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
          this.service.remove(item.idcosto)
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
            (data: CostosResponseInterface) =>  {
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
      this.service.getAllPorCategoria(this.idcategoria)
      .subscribe(
        (data: CostosResponseInterface) =>  {
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
        this.service.getAllPorSubCategoria(this.idsubcategoria)
        .subscribe(
          (data: CostosResponseInterface) =>  {
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
          (data: CostosResponseInterface) =>  {
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
