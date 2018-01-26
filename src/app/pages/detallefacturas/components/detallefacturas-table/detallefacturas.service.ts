import { AuthService } from './../../../../shared/auth.service';
import { DetallefacturasResponseInterface } from './detallefacturas-response.interface';
import { Observable } from 'rxjs/Observable';
import { DetallefacturasInterface } from './detallefacturas.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class DetallefacturasService {
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
       all = () : Observable<DetallefacturasResponseInterface> => {
           return this._http.post(`${this.endPoint}obtenerDetalleFactura`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }


       getAllPorFactura = ( id ) : Observable<DetallefacturasResponseInterface> => {
        const factura: any = {
            idfactura: id,  
            claveauth: this.auth.claveauth,
            nicknameauth: this.auth.nicknameauth,
            usuarioauth: this.auth.usuarioauth
        } 
    return this._http.post(`${this.endPoint}obtenerDetallesFactura`, factura, this.options)
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }


       findById = ( id: DetallefacturasInterface ) : Observable<DetallefacturasResponseInterface> => {
           const detallefactura: any = {
                iddetallefactura: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}obtenerDetalleFactura`, detallefactura, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( detallefactura: DetallefacturasInterface ) : Observable<DetallefacturasResponseInterface> => {
           
            detallefactura.claveauth = this.auth.claveauth;
            detallefactura.nicknameauth = this.auth.nicknameauth;
            detallefactura.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}ModificarDetalleFactura`, detallefactura, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<DetallefacturasResponseInterface> => {
            const detallefactura: any = {
                iddetallefactura: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/bajaDetalleFactura`, detallefactura, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<DetallefacturasResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<DetallefacturasResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( detallefactura: DetallefacturasInterface ) : Observable<DetallefacturasResponseInterface> => {

            detallefactura.claveauth = this.auth.claveauth;
            detallefactura.nicknameauth = this.auth.nicknameauth;
            detallefactura.usuarioauth = this.auth.usuarioauth; 

           return this._http.post(`${this.endPoint}agregarDetalleFactura`, detallefactura, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
