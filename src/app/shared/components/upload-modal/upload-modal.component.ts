import { CredentialInterface } from 'app/shared/credential.interface';
import { AuthService } from './../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadModalService } from './upload-modal.service';


import { Response } from '@angular/http';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';

export interface ArchivoInterface {
  nicknameauth: string;
  usuarioauth: string;
  claveauth: string;
  idreferencia: number;
  proceso: string;
  tipoarchivo: string;
  urlarchivo: string;
}

@Component({
  selector: 'upload-service-modal',
  styleUrls: [('./upload-modal.component.scss')],
  templateUrl: './upload-modal.component.html'
})
export class UploadModalComponent implements OnInit {

  private credentials: CredentialInterface = this.authService.getCredentials();

  id: number;
  descripcion: string;
  referencia: string;
  modalHeader: string;

  defaultPicture = 'assets/img/theme/no-photo.png';

  profile: any = {
    picture: 'assets/images/file.png',
  };

  fileUploaderOptions: NgUploaderOptions = {
    url: `http://aidihosting.com/proyectos/proyectura_api/v1/cargaArchivo/Obra-`,
  };

  uploadCompled(event: any) {
    if (event.done) {
      const response = JSON.parse(event.response);
      if (response.status === 'success') {
        const archivo: ArchivoInterface = {
            nicknameauth: this.credentials.nicknameauth,
            usuarioauth: this.credentials.usuarioauth,
            claveauth: this.credentials.claveauth,
            idreferencia: this.id,
            proceso: this.referencia,
            tipoarchivo: response.type,
            urlarchivo: response.src,
        }
        this.service.setFile(archivo)
          .subscribe(
            (data: any) => this.showToast(data),
            error => console.log(error),
            () => this.activeModal.close());
      }
    }
  }

  showToast(data) {
    if (data.idRespuesta === 0) {
      this.toastrService.success(data.mensajeRespuesta);
    } else {
      this.toastrService.error(data.mensajeRespuesta);
    }
  }

  constructor(private service: UploadModalService, 
              private activeModal: NgbActiveModal,
              private toastrService: ToastrService,
              private authService: AuthService) {
  }

  closeModal() {
    this.activeModal.close();
  }

  ngOnInit() {
  }
}
