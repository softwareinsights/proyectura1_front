import { AuthService } from './../../../../shared/auth.service';
import { EstatusobrasResponseInterface } from './estatusobras-response.interface';
import { Observable } from 'rxjs/Observable';
import { EstatusobrasInterface } from './estatusobras.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class EstatusobrasService {
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
       all = () : Observable<EstatusobrasResponseInterface> => {
           return this._http.post(`${this.endPoint}obtenerEstatusObras`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id: EstatusobrasInterface ) : Observable<EstatusobrasResponseInterface> => {
           const estatusobra: any = {
                idestatusobra: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}ObtenerEstatusobra`, estatusobra, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( estatusobra: EstatusobrasInterface ) : Observable<EstatusobrasResponseInterface> => {
           
            estatusobra.claveauth = this.auth.claveauth;
            estatusobra.nicknameauth = this.auth.nicknameauth;
            estatusobra.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}modificarEstatusobra`, estatusobra, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<EstatusobrasResponseInterface> => {
            const estatusobra: any = {
                idestatusobra: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/BajaEstatusobra`, estatusobra, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<EstatusobrasResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<EstatusobrasResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( estatusobra: EstatusobrasInterface ) : Observable<EstatusobrasResponseInterface> => {

            estatusobra.claveauth = this.auth.claveauth;
            estatusobra.nicknameauth = this.auth.nicknameauth;
            estatusobra.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarEstatusobra`, estatusobra, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
