import { AuthService } from './../../../../shared/auth.service';
import { ObrasResponseInterface } from './obras-response.interface';
import { Observable } from 'rxjs/Observable';
import { ObrasInterface } from './obras.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class ObrasService {
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
       all = () : Observable<ObrasResponseInterface> => {
           return this._http.post(`${this.endPoint}obtenerObras`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id: ObrasInterface ) : Observable<ObrasResponseInterface> => {
           const obra: any = {
                idobra: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}ObtenerObrasporIDObra`, obra, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( obra: ObrasInterface ) : Observable<ObrasResponseInterface> => {
           
            obra.claveauth = this.auth.claveauth;
            obra.nicknameauth = this.auth.nicknameauth;
            obra.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}modificarObra`, obra, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<ObrasResponseInterface> => {
            const obra: any = {
                idobra: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/BajaObra`, obra, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<ObrasResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<ObrasResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( obra: ObrasInterface ) : Observable<ObrasResponseInterface> => {

            obra.claveauth = this.auth.claveauth;
            obra.nicknameauth = this.auth.nicknameauth;
            obra.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarObra`, obra, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
