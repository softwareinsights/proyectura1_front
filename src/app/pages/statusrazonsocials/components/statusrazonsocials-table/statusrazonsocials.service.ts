import { AuthService } from './../../../../shared/auth.service';
import { StatusrazonsocialsResponseInterface } from './statusrazonsocials-response.interface';
import { Observable } from 'rxjs/Observable';
import { StatusrazonsocialsInterface } from './statusrazonsocials.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class StatusrazonsocialsService {
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
       all = () : Observable<StatusrazonsocialsResponseInterface> => {
           return this._http.post(`${this.endPoint}ObtenerEstatusRazonSocial`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id: StatusrazonsocialsInterface ) : Observable<StatusrazonsocialsResponseInterface> => {
           const statusrazonsocial: any = {
                idstatusrazonsocial: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}ObtenerStatusrazonsocial`, statusrazonsocial, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( statusrazonsocial: StatusrazonsocialsInterface ) : Observable<StatusrazonsocialsResponseInterface> => {
           
            statusrazonsocial.claveauth = this.auth.claveauth;
            statusrazonsocial.nicknameauth = this.auth.nicknameauth;
            statusrazonsocial.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}modificarStatusrazonsocial`, statusrazonsocial, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<StatusrazonsocialsResponseInterface> => {
            const statusrazonsocial: any = {
                idstatusrazonsocial: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/BajaStatusrazonsocial`, statusrazonsocial, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<StatusrazonsocialsResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<StatusrazonsocialsResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( statusrazonsocial: StatusrazonsocialsInterface ) : Observable<StatusrazonsocialsResponseInterface> => {

            statusrazonsocial.claveauth = this.auth.claveauth;
            statusrazonsocial.nicknameauth = this.auth.nicknameauth;
            statusrazonsocial.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarStatusrazonsocial`, statusrazonsocial, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
