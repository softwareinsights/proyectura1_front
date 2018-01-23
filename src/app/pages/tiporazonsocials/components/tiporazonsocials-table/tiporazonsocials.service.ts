import { AuthService } from './../../../../shared/auth.service';
import { TiporazonsocialsResponseInterface } from './tiporazonsocials-response.interface';
import { Observable } from 'rxjs/Observable';
import { TiporazonsocialsInterface } from './tiporazonsocials.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class TiporazonsocialsService {
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
       all = () : Observable<TiporazonsocialsResponseInterface> => {
           return this._http.post(`${this.endPoint}ObtenerTiposRazonSocial`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id: TiporazonsocialsInterface ) : Observable<TiporazonsocialsResponseInterface> => {
           const tiporazonsocial: any = {
                idtiporazonsocial: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}ObtenerTiporazonsocial`, tiporazonsocial, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( tiporazonsocial: TiporazonsocialsInterface ) : Observable<TiporazonsocialsResponseInterface> => {
           
            tiporazonsocial.claveauth = this.auth.claveauth;
            tiporazonsocial.nicknameauth = this.auth.nicknameauth;
            tiporazonsocial.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}modificarTiporazonsocial`, tiporazonsocial, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<TiporazonsocialsResponseInterface> => {
            const tiporazonsocial: any = {
                idtiporazonsocial: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/BajaTiporazonsocial`, tiporazonsocial, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<TiporazonsocialsResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<TiporazonsocialsResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( tiporazonsocial: TiporazonsocialsInterface ) : Observable<TiporazonsocialsResponseInterface> => {

            tiporazonsocial.claveauth = this.auth.claveauth;
            tiporazonsocial.nicknameauth = this.auth.nicknameauth;
            tiporazonsocial.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarTiporazonsocial`, tiporazonsocial, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
