import { AuthService } from './../../../../shared/auth.service';
import { CategoriasResponseInterface } from './categorias-response.interface';
import { Observable } from 'rxjs/Observable';
import { CategoriasInterface } from './categorias.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class CategoriasService {
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
       all = () : Observable<CategoriasResponseInterface> => {
           return this._http.post(`${this.endPoint}obtenerCategorias`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<CategoriasResponseInterface> => {
            const categoria: any = {
                idcategoria: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            } 
           return this._http.post(`${this.endPoint}obtenerCategoria`,categoria, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

       update = ( categoria: CategoriasInterface ) : Observable<CategoriasResponseInterface> => {
        categoria.claveauth = this.auth.claveauth;
        categoria.nicknameauth = this.auth.nicknameauth;
        categoria.usuarioauth = this.auth.usuarioauth;
           return this._http.post(`${this.endPoint}ModificarCategoria`, categoria, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

       remove= ( id ) : Observable<CategoriasResponseInterface> => {
        const categoria: any = {
            idarchivo: id,  
            claveauth: this.auth.claveauth,
            nicknameauth: this.auth.nicknameauth,
            usuarioauth: this.auth.usuarioauth
        }
           return this._http.post(`${this.endPoint}bajaCategoria`, categoria, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<CategoriasResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<CategoriasResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( categoria: CategoriasInterface ) : Observable<CategoriasResponseInterface> => {
        categoria.claveauth = this.auth.claveauth;
        categoria.nicknameauth = this.auth.nicknameauth;
        categoria.usuarioauth = this.auth.usuarioauth;
           return this._http.post(`${this.endPoint}agregarCategoria`, categoria, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
