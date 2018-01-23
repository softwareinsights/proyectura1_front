import { AuthService } from './../../../../shared/auth.service';
import { DetallenotagastosResponseInterface } from './detallenotagastos-response.interface';
import { Observable } from 'rxjs/Observable';
import { DetallenotagastosInterface } from './detallenotagastos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class DetallenotagastosService {
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
       all = () : Observable<DetallenotagastosResponseInterface> => {
           return this._http.post(`${this.endPoint}obtenerDetalleNotaGasto`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id: DetallenotagastosInterface ) : Observable<DetallenotagastosResponseInterface> => {
           const detallenotagasto: any = {
                iddetallenotagasto: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}obtenerDetalleNotasGasto`, detallenotagasto, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( detallenotagasto: DetallenotagastosInterface ) : Observable<DetallenotagastosResponseInterface> => {
           
            detallenotagasto.claveauth = this.auth.claveauth;
            detallenotagasto.nicknameauth = this.auth.nicknameauth;
            detallenotagasto.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}modificarDetalleNotaGasto`, detallenotagasto, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<DetallenotagastosResponseInterface> => {
            const detallenotagasto: any = {
                iddetallenotagasto: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/bajaDetalleNotaGasto`, detallenotagasto, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<DetallenotagastosResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<DetallenotagastosResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( detallenotagasto: DetallenotagastosInterface ) : Observable<DetallenotagastosResponseInterface> => {

            detallenotagasto.claveauth = this.auth.claveauth;
            detallenotagasto.nicknameauth = this.auth.nicknameauth;
            detallenotagasto.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarDetalleNotaGasto`, detallenotagasto, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       } 
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
