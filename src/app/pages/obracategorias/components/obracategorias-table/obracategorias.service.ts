import { AuthService } from './../../../../shared/auth.service';
import { ObracategoriasResponseInterface } from './obracategorias-response.interface';
import { Observable } from 'rxjs/Observable';
import { ObracategoriasInterface } from './obracategorias.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class ObracategoriasService {
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
       all = () : Observable<ObracategoriasResponseInterface> => {
           return this._http.post(`${this.endPoint}obtenerobrascategorias`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id: ObracategoriasInterface ) : Observable<ObracategoriasResponseInterface> => {
           const obracategoria: any = {
                idobracategoria: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}obtenerobracategoria`, obracategoria, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( obracategoria: ObracategoriasInterface ) : Observable<ObracategoriasResponseInterface> => {
           
            obracategoria.claveauth = this.auth.claveauth;
            obracategoria.nicknameauth = this.auth.nicknameauth;
            obracategoria.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}modificarObracategoria`, obracategoria, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<ObracategoriasResponseInterface> => {
            const obracategoria: any = {
                idobra: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/bajaobracategoria`, obracategoria, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<ObracategoriasResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<ObracategoriasResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( obracategoria: ObracategoriasInterface ) : Observable<ObracategoriasResponseInterface> => {

            obracategoria.claveauth = this.auth.claveauth;
            obracategoria.nicknameauth = this.auth.nicknameauth;
            obracategoria.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarObraCategoria`, obracategoria, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
