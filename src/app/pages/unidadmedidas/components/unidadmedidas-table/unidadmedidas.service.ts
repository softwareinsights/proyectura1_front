import { AuthService } from './../../../../shared/auth.service';
import { UnidadmedidasResponseInterface } from './unidadmedidas-response.interface';
import { Observable } from 'rxjs/Observable';
import { UnidadmedidasInterface } from './unidadmedidas.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class UnidadmedidasService {
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
       all = () : Observable<UnidadmedidasResponseInterface> => {
           return this._http.post(`${this.endPoint}obtenerUnidadesMedida`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id: UnidadmedidasInterface ) : Observable<UnidadmedidasResponseInterface> => {
           const unidadmedida: any = {
                idunidadmedida: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}ObtenerUnidadmedida`, unidadmedida, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( unidadmedida: UnidadmedidasInterface ) : Observable<UnidadmedidasResponseInterface> => {
           
            unidadmedida.claveauth = this.auth.claveauth;
            unidadmedida.nicknameauth = this.auth.nicknameauth;
            unidadmedida.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}modificarUnidadmedida`, unidadmedida, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<UnidadmedidasResponseInterface> => {
            const unidadmedida: any = {
                idunidadmedida: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/BajaUnidadmedida`, unidadmedida, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<UnidadmedidasResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<UnidadmedidasResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( unidadmedida: UnidadmedidasInterface ) : Observable<UnidadmedidasResponseInterface> => {

            unidadmedida.claveauth = this.auth.claveauth;
            unidadmedida.nicknameauth = this.auth.nicknameauth;
            unidadmedida.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarUnidadmedida`, unidadmedida, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
