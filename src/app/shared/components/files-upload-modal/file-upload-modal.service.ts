import { AuthService } from './../../auth.service';
import { Configuration } from './../../../app.constants';
import { AuthLocalstorage } from './../../auth-localstorage.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FilesUploadModalService {

    private actionUrl: string;
    private headers: Headers;
    endPoint: string;


    constructor(
        private _http: Http, 
        private _configuration: Configuration, 
        private localStorageService: LocalStorageService,
        private authService: AuthService,
        private authLocalstorage: AuthLocalstorage ) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        this.endPoint = `https://www.ideasys.com.mx/ProyecturaObraSW/api/`;
    }
    
    getFiles = (idreferencia: number, proceso: string): Observable<any> =>  {
        this.actionUrl = `${this.endPoint}ObtenerArchivosPorProcesoPorIdReferencia`;
        const credenciales = this.authService.getCredentials();
        const toAdd = JSON.stringify({
            'nicknameauth': credenciales.nicknameauth,
            'usuarioauth': credenciales.usuarioauth,
            'claveauth': credenciales.claveauth,
            'idreferencia': idreferencia,
            'proceso': proceso,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    deleteInImageServer = (url: string): Observable<any> => {
        this.actionUrl = `http://aidihosting.com/proyectos/proyectura_api/v1/bajaArchivo`;
        const toSend = JSON.stringify({
            'url': url,
        });
        return this._http.post(this.actionUrl, toSend, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    deleteArchivo = (id: string): Observable<any> => {
        this.actionUrl = `${this.endPoint}bajaArchivo`;
       
        const credenciales = this.authService.getCredentials();
        const toSend = JSON.stringify({
            'nicknameauth': credenciales.nicknameauth,
            'usuarioauth': credenciales.usuarioauth,
            'claveauth': credenciales.claveauth,
            'idarchivo': id,
        });

        return this._http.post(this.actionUrl, toSend, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}


