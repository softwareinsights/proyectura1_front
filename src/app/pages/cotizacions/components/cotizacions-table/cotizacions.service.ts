import { AuthService } from './../../../../shared/auth.service';
import { CotizacionsResponseInterface } from './cotizacions-response.interface';
import { Observable } from 'rxjs/Observable';
import { CotizacionsInterface } from './cotizacions.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class CotizacionsService {
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
       all = () : Observable<CotizacionsResponseInterface> => {
           return this._http.post(`${this.endPoint}ObtenerCotizaciones`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

       
       getAllPorFecha = ( fechainicial, fechafinal ) : Observable<CotizacionsResponseInterface> => {
        
        const dataSend: any = {
            claveauth: this.auth.claveauth,
            nicknameauth: this.auth.nicknameauth,
            usuarioauth: this.auth.usuarioauth,
            fechainicial: fechainicial,  
            fechafinal: fechafinal
        } 

        return this._http.post(`${this.endPoint}obtenerCotizaciones`, dataSend, this.options)
           .map((response: Response) => response.json())
           .catch(this.handleError);
   }   
   
        getAllPorObra = ( id ) : Observable<CotizacionsResponseInterface> => {
                const cotizacion: any = {
                    idobra: id,  
                    claveauth: this.auth.claveauth,
                    nicknameauth: this.auth.nicknameauth,
                    usuarioauth: this.auth.usuarioauth
                } 
            return this._http.post(`${this.endPoint}ObtenerCotizacionesPorIdObra`, cotizacion, this.options)
                .map((response: Response) => response.json())
                .catch(this.handleError);
            }
        
            getAllPorCategoria = ( id , obra) : Observable<CotizacionsResponseInterface> => {
                const cotizacion: any = {
                    idcategoria: id, 
                    idobra: obra,  
                    claveauth: this.auth.claveauth,
                    nicknameauth: this.auth.nicknameauth,
                    usuarioauth: this.auth.usuarioauth
                } 
            return this._http.post(`${this.endPoint}ObtenerCotizacionesPorIdObraPorIdCategoria`, cotizacion, this.options)
                .map((response: Response) => response.json())
                .catch(this.handleError);
            }
        
            getAllPorSubCategoria = ( id, obra, categoria ) : Observable<CotizacionsResponseInterface> => {
                const cotizacion: any = {
                    idsubcategoria: id,  
                    idobra: obra, 
                    idcategoria: categoria,
                    claveauth: this.auth.claveauth,
                    nicknameauth: this.auth.nicknameauth,
                    usuarioauth: this.auth.usuarioauth
                } 
            return this._http.post(`${this.endPoint}ObtenerCotizacionesPorIdObraPorIdCategoriaPorIdSubCategoria`, cotizacion, this.options)
                .map((response: Response) => response.json())
                .catch(this.handleError);
            }



       findById = ( id: CotizacionsInterface ) : Observable<CotizacionsResponseInterface> => {
           const cotizacion: any = {
                idcotizacion: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}ObtenerCotizacion`, cotizacion, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( cotizacion: CotizacionsInterface ) : Observable<CotizacionsResponseInterface> => {
           
            cotizacion.claveauth = this.auth.claveauth;
            cotizacion.nicknameauth = this.auth.nicknameauth;
            cotizacion.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}modificarCotizacion`, cotizacion, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<CotizacionsResponseInterface> => {
            const cotizacion: any = {
                idcotizacion: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/bajaCotizacion`, cotizacion, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<CotizacionsResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<CotizacionsResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( cotizacion: CotizacionsInterface ) : Observable<CotizacionsResponseInterface> => {

            cotizacion.claveauth = this.auth.claveauth;
            cotizacion.nicknameauth = this.auth.nicknameauth;
            cotizacion.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarCotizacion`, cotizacion, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
