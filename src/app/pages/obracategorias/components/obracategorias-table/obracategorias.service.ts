import { AuthService } from './../../../../shared/auth.service';
import { ObracategoriasResponseInterface } from './obracategorias-response.interface';
import { Observable } from 'rxjs/Observable';
import { ObracategoriasInterface } from './obracategorias.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ObracategoriasService {
    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;
    private endPoint: string;
    private auth: any;
    constructor(
        private _http: Http,
        private _configuration: Configuration,
        private authService: AuthService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        // this.headers.append('Authorization', 'JWT ' + this.authService.token);
        this.options = new RequestOptions({ headers: this.headers });
        this.endPoint = `https://www.ideasys.com.mx/ProyecturaObraSW/api/`;
        this.auth = this.authService.getCredentials();
       }
       
       all = () : Observable<ObracategoriasResponseInterface> => {
           return this._http.post(`${this.endPoint}ObtenerObrasCategorias`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }


       findById = ( id ) : Observable<ObracategoriasResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( obracategoria: ObracategoriasInterface ) : Observable<ObracategoriasResponseInterface> => {
           return this._http.patch(this.endPoint, obracategoria, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<ObracategoriasResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<ObracategoriasResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<ObracategoriasResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( obracategoria: ObracategoriasInterface ) : Observable<ObracategoriasResponseInterface> => {
           return this._http.post(this.endPoint, obracategoria, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
