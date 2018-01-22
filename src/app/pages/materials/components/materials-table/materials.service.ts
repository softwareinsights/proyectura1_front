import { AuthService } from './../../../../shared/auth.service';
import { MaterialsResponseInterface } from './materials-response.interface';
import { Observable } from 'rxjs/Observable';
import { MaterialsInterface } from './materials.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredentialInterface } from 'app/shared/credential.interface';

@Injectable()
export class MaterialsService {
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
       all = () : Observable<MaterialsResponseInterface> => {
           return this._http.post(`${this.endPoint}obtenerMateriales`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id: MaterialsInterface ) : Observable<MaterialsResponseInterface> => {
           const material: any = {
                idmaterial: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
           } 

           return this._http.post(`${this.endPoint}obtenerMaterial`, material, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( material: MaterialsInterface ) : Observable<MaterialsResponseInterface> => {
           
            material.claveauth = this.auth.claveauth;
            material.nicknameauth = this.auth.nicknameauth;
            material.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}modificarMaterial`, material, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<MaterialsResponseInterface> => {
            const material: any = {
                idmaterial: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth
            }
            return this._http.post(`${this.endPoint}/bajaMaterial`, material, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<MaterialsResponseInterface> => {
           return this._http.post(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<MaterialsResponseInterface> => {
           return this._http.post(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( material: MaterialsInterface ) : Observable<MaterialsResponseInterface> => {

            material.claveauth = this.auth.claveauth;
            material.nicknameauth = this.auth.nicknameauth;
            material.usuarioauth = this.auth.usuarioauth;

           return this._http.post(`${this.endPoint}agregarMaterial`, material, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
