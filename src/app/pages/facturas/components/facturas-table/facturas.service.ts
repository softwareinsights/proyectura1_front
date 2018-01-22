import { AuthService } from './../../../../shared/auth.service';
import { FacturasResponseInterface } from './facturas-response.interface';
import { Observable } from 'rxjs/Observable';
import { FacturasInterface } from './facturas.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class FacturasService {
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
       all = () : Observable<FacturasResponseInterface> => {
           return this._http.post(`${this.endPoint}obtenerFactura`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id: FacturasInterface ) : Observable<FacturasResponseInterface> => {
           const factura: any = {
                idfactura: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}obtenerFactura`, factura, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( factura: FacturasInterface ) : Observable<FacturasResponseInterface> => {
           
            factura.claveauth = this.auth.claveauth;
            factura.nicknameauth = this.auth.nicknameauth;
            factura.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}modificarFactura`, factura, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<FacturasResponseInterface> => {
            const factura: any = {
                idfactura: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/bajaFactura`, factura, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<FacturasResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<FacturasResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( factura: FacturasInterface ) : Observable<FacturasResponseInterface> => {

            factura.claveauth = this.auth.claveauth;
            factura.nicknameauth = this.auth.nicknameauth;
            factura.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarFactura`, factura, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
