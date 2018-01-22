import { AuthService } from './../../../../shared/auth.service';
import { TipoobrasResponseInterface } from './tipoobras-response.interface';
import { Observable } from 'rxjs/Observable';
import { TipoobrasInterface } from './tipoobras.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class TipoobrasService {
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
       all = () : Observable<TipoobrasResponseInterface> => {
           return this._http.post(`${this.endPoint}obtenerTipoObras`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id: TipoobrasInterface ) : Observable<TipoobrasResponseInterface> => {
           const tipoobra: any = {
                idtipoobra: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}obtenerTipoObra`, tipoobra, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( tipoobra: TipoobrasInterface ) : Observable<TipoobrasResponseInterface> => {
           
            tipoobra.claveauth = this.auth.claveauth;
            tipoobra.nicknameauth = this.auth.nicknameauth;
            tipoobra.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}ModificarTipoObra`, tipoobra, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<TipoobrasResponseInterface> => {
            const tipoobra: any = {
                idtipoobra: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/bajaTipoObra`, tipoobra, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<TipoobrasResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<TipoobrasResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( tipoobra: TipoobrasInterface ) : Observable<TipoobrasResponseInterface> => {

            tipoobra.claveauth = this.auth.claveauth;
            tipoobra.nicknameauth = this.auth.nicknameauth;
            tipoobra.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarTipoObra`, tipoobra, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
