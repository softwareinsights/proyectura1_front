import { AuthService } from './../../../../shared/auth.service';
import { CostosResponseInterface } from './costos-response.interface';
import { Observable } from 'rxjs/Observable';
import { CostosInterface } from './costos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class CostosService {
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
       all = () : Observable<CostosResponseInterface> => {
        return this._http.post(`${this.endPoint}obtenerCostos`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }   

       getAllPorFecha = ( fechainicial, fechafinal ) : Observable<CostosResponseInterface> => {
        
            const dataSend: any = {
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth,
                fechainicial: fechainicial,  
                fechafinal: fechafinal
            } 

            return this._http.post(`${this.endPoint}obtenerCostosPorRangoFechasAlta`, dataSend, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }   
       
       getAllPorObra = ( id ) : Observable<CostosResponseInterface> => {
            const costo: any = {
                idobra: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            } 
        return this._http.post(`${this.endPoint}ObtenerCostosPorIdObra`, costo, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
        }
       
        getAllPorCategoria = ( id ) : Observable<CostosResponseInterface> => {
            const costo: any = {
                idcategoria: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            } 
        return this._http.post(`${this.endPoint}ObtenerCostosPorIdCategoria`, costo, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
        }
       
        getAllPorSubCategoria = ( id ) : Observable<CostosResponseInterface> => {
             const costo: any = {
                 idsubcategoria: id,  
                 claveauth: this.auth.claveauth,
                 nicknameauth: this.auth.nicknameauth,
                 usuarioauth: this.auth.usuarioauth
             } 
         return this._http.post(`${this.endPoint}ObtenerCotizacionesPorIdObraPorIdCategoriaPorIdSubCategoria`, costo, this.options)
             .map((response: Response) => response.json())
             .catch(this.handleError);
         }

       findById = ( id ) : Observable<CostosResponseInterface> => {
            const costo: any = {
                idcosto: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            } 
           return this._http.post(`${this.endPoint}obtenerCosto`, costo, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( costo: CostosInterface ) : Observable<CostosResponseInterface> => {
            costo.claveauth = this.auth.claveauth;
            costo.nicknameauth = this.auth.nicknameauth;
            costo.usuarioauth = this.auth.usuarioauth;
           return this._http.post(`${this.endPoint}modificarCosto`, costo, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<CostosResponseInterface> => {
            const costo: any = {
                idcosto: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            } 
           return this._http.post(`${this.endPoint}bajaCosto`, costo, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<CostosResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<CostosResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( costo: CostosInterface ) : Observable<CostosResponseInterface> => {
            costo.claveauth = this.auth.claveauth;
            costo.nicknameauth = this.auth.nicknameauth;
            costo.usuarioauth = this.auth.usuarioauth;
           return this._http.post(`${this.endPoint}agregarCosto`, costo, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
