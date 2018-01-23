import { AuthService } from './../../../../shared/auth.service';
import { RolsResponseInterface } from './rols-response.interface';
import { Observable } from 'rxjs/Observable';
import { RolsInterface } from './rols.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class RolsService {
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
       all = () : Observable<RolsResponseInterface> => {
           return this._http.post(`${this.endPoint}obtenerRoles`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id: RolsInterface ) : Observable<RolsResponseInterface> => {
           const rol: any = {
                idrol: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}ObtenerRol`, rol, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( rol: RolsInterface ) : Observable<RolsResponseInterface> => {
           
            rol.claveauth = this.auth.claveauth;
            rol.nicknameauth = this.auth.nicknameauth;
            rol.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}modificarRol`, rol, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<RolsResponseInterface> => {
            const rol: any = {
                idrol: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/BajaRol`, rol, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<RolsResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<RolsResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( rol: RolsInterface ) : Observable<RolsResponseInterface> => {

            rol.claveauth = this.auth.claveauth;
            rol.nicknameauth = this.auth.nicknameauth;
            rol.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarRol`, rol, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
