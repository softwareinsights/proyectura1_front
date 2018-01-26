import { AuthService } from './../../../../shared/auth.service';
import { NotagastosResponseInterface } from './notagastos-response.interface';
import { Observable } from 'rxjs/Observable';
import { NotagastosInterface } from './notagastos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class NotagastosService {
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
       all = () : Observable<NotagastosResponseInterface> => {
           return this._http.post(`${this.endPoint}obtenerNotaGasto`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

       getAllPorFecha = ( fechainicial, fechafinal ) : Observable<NotagastosResponseInterface> => {
        
        const dataSend: any = {
            claveauth: this.auth.claveauth,
            nicknameauth: this.auth.nicknameauth,
            usuarioauth: this.auth.usuarioauth,
            fechainicial: fechainicial,  
            fechafinal: fechafinal
        } 

        return this._http.post(`${this.endPoint}obtenerNotasGastoPorRangoFechas`, dataSend, this.options)
           .map((response: Response) => response.json())
           .catch(this.handleError);
        }   

        getAllPorFecharazonsocial = (id, fechainicial, fechafinal ) : Observable<NotagastosResponseInterface> => {
        
            const dataSend: any = {
                idrazonsocial: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth,
                fechainicial: fechainicial,  
                fechafinal: fechafinal
            } 
    
            return this._http.post(`${this.endPoint}obtenerNotasGastoPorRangoFechasPorEmisor`, dataSend, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
            }   
        
        getAllPorRazonsocial = ( id ) : Observable<NotagastosResponseInterface> => {
            const razonsocial: any = {
                idrazonsocial: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            } 
        return this._http.post(`${this.endPoint}obtenerNotasGastoPorIdRazonSocialEmisor`, razonsocial, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
        }



       findById = ( id: NotagastosInterface ) : Observable<NotagastosResponseInterface> => {
           const notagasto: any = {
                idnotagasto: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}obtenerNotaGasto`, notagasto, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( notagasto: NotagastosInterface ) : Observable<NotagastosResponseInterface> => {
           
            notagasto.claveauth = this.auth.claveauth;
            notagasto.nicknameauth = this.auth.nicknameauth;
            notagasto.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}modificarNotaGasto`, notagasto, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<NotagastosResponseInterface> => {
            const notagasto: any = {
                idnotagasto: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/bajaNotaGasto`, notagasto, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<NotagastosResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<NotagastosResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( notagasto: NotagastosInterface ) : Observable<NotagastosResponseInterface> => {

            notagasto.claveauth = this.auth.claveauth;
            notagasto.nicknameauth = this.auth.nicknameauth;
            notagasto.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarNotaGasto`, notagasto, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
