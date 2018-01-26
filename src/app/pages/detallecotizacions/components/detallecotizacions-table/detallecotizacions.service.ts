import { AuthService } from './../../../../shared/auth.service';
import { DetallecotizacionsResponseInterface } from './detallecotizacions-response.interface';
import { Observable } from 'rxjs/Observable';
import { DetallecotizacionsInterface } from './detallecotizacions.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class DetallecotizacionsService {
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
       all = () : Observable<DetallecotizacionsResponseInterface> => {
           return this._http.post(`${this.endPoint}obtenerDetallesCotizacion`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

       getAllPorFactura = ( id ) : Observable<DetallecotizacionsResponseInterface> => {
        const factura: any = {
            idfactura: id,  
            claveauth: this.auth.claveauth,
            nicknameauth: this.auth.nicknameauth,
            usuarioauth: this.auth.usuarioauth
        } 
    return this._http.post(`${this.endPoint}obtenerDetallesCotizacion`, factura, this.options)
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }


       findById = ( id: DetallecotizacionsInterface ) : Observable<DetallecotizacionsResponseInterface> => {
           const detallecotizacion: any = {
                iddetallecotizacion: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}obtenerDetalleCotizacion`, detallecotizacion, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( detallecotizacion: DetallecotizacionsInterface ) : Observable<DetallecotizacionsResponseInterface> => {
           
            detallecotizacion.claveauth = this.auth.claveauth;
            detallecotizacion.nicknameauth = this.auth.nicknameauth;
            detallecotizacion.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}modificarDetallecotizacion`, detallecotizacion, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<DetallecotizacionsResponseInterface> => {
            const detallecotizacion: any = {
                iddetallecotizacion: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/bajaDetalleCotizacion`, detallecotizacion, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<DetallecotizacionsResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<DetallecotizacionsResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( detallecotizacion: DetallecotizacionsInterface ) : Observable<DetallecotizacionsResponseInterface> => {

            detallecotizacion.claveauth = this.auth.claveauth;
            detallecotizacion.nicknameauth = this.auth.nicknameauth;
            detallecotizacion.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarDetalleCotizacion`, detallecotizacion, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
