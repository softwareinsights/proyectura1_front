import { AuthService } from './../../../../shared/auth.service';
import { PresupuestosResponseInterface } from './presupuestos-response.interface';
import { Observable } from 'rxjs/Observable';
import { PresupuestosInterface } from './presupuestos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class PresupuestosService {
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
       all = () : Observable<PresupuestosResponseInterface> => {
           return this._http.post(`${this.endPoint}obtenerPresupuestos`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id: PresupuestosInterface ) : Observable<PresupuestosResponseInterface> => {
           const presupuesto: any = {
                idpresupuesto: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}obtenerPresupuesto`, presupuesto, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( presupuesto: PresupuestosInterface ) : Observable<PresupuestosResponseInterface> => {
           
            presupuesto.claveauth = this.auth.claveauth;
            presupuesto.nicknameauth = this.auth.nicknameauth;
            presupuesto.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}modificarPresupuesto`, presupuesto, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<PresupuestosResponseInterface> => {
            const presupuesto: any = {
                idpresupuesto: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/bajaPresupuesto`, presupuesto, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<PresupuestosResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<PresupuestosResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( presupuesto: PresupuestosInterface ) : Observable<PresupuestosResponseInterface> => {

            presupuesto.claveauth = this.auth.claveauth;
            presupuesto.nicknameauth = this.auth.nicknameauth;
            presupuesto.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarPresupuesto`, presupuesto, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
