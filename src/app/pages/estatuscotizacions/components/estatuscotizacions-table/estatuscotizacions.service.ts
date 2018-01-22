import { AuthService } from './../../../../shared/auth.service';
import { EstatuscotizacionsResponseInterface } from './estatuscotizacions-response.interface';
import { Observable } from 'rxjs/Observable';
import { EstatuscotizacionsInterface } from './estatuscotizacions.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class EstatuscotizacionsService {
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
       all = () : Observable<EstatuscotizacionsResponseInterface> => {
           return this._http.post(`${this.endPoint}obtenerEstatusCotizaciones`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id: EstatuscotizacionsInterface ) : Observable<EstatuscotizacionsResponseInterface> => {
           const estatuscotizacion: any = {
                idestatuscotizacion: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}ObtenerEstatuscotizacion`, estatuscotizacion, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( estatuscotizacion: EstatuscotizacionsInterface ) : Observable<EstatuscotizacionsResponseInterface> => {
           
            estatuscotizacion.claveauth = this.auth.claveauth;
            estatuscotizacion.nicknameauth = this.auth.nicknameauth;
            estatuscotizacion.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}modificarEstatuscotizacion`, estatuscotizacion, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<EstatuscotizacionsResponseInterface> => {
            const estatuscotizacion: any = {
                idestatuscotizacion: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/BajaEstatuscotizacion`, estatuscotizacion, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<EstatuscotizacionsResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<EstatuscotizacionsResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( estatuscotizacion: EstatuscotizacionsInterface ) : Observable<EstatuscotizacionsResponseInterface> => {

            estatuscotizacion.claveauth = this.auth.claveauth;
            estatuscotizacion.nicknameauth = this.auth.nicknameauth;
            estatuscotizacion.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarEstatuscotizacion`, estatuscotizacion, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
