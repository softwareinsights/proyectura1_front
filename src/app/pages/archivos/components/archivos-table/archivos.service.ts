import { AuthService } from './../../../../shared/auth.service';
import { ArchivosResponseInterface } from './archivos-response.interface';
import { Observable } from 'rxjs/Observable';
import { ArchivosInterface } from './archivos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class ArchivosService {
    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;
    private endPoint: string;
    private auth: CredentialInterface;
    constructor(
        private _http: Http,
        private _configuration: Configuration,
        private authService: AuthService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        //this.headers.append('Authorization', 'JWT ' + this.authService.token);
        this.options = new RequestOptions({ headers: this.headers });
        this.endPoint = `https://www.ideasys.com.mx/ProyecturaObraSW/api/`;
        this.auth = this.authService.getCredentials();
       }
       all = () : Observable<ArchivosResponseInterface> => {
           return this._http.post(`${this.endPoint}ObtenerArchivos`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id: ArchivosInterface ) : Observable<ArchivosResponseInterface> => {
           const archivo: any = {
                idarchivo: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}ObtenerArchivo`, archivo, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( archivo: ArchivosInterface ) : Observable<ArchivosResponseInterface> => {
           
            archivo.claveauth = this.auth.claveauth;
            archivo.nicknameauth = this.auth.nicknameauth;
            archivo.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}modificarArchivo`, archivo, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<ArchivosResponseInterface> => {
            const archivo: any = {
                idarchivo: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/BajaArchivo`, archivo, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<ArchivosResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<ArchivosResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( archivo: ArchivosInterface ) : Observable<ArchivosResponseInterface> => {

            archivo.claveauth = this.auth.claveauth;
            archivo.nicknameauth = this.auth.nicknameauth;
            archivo.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarArchivo`, archivo, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
