import { CredentialInterface } from 'app/shared/credential.interface';
import { AuthService } from './../../../../shared/auth.service';
import { UsuariosResponseInterface } from './usuarios-response.interface';
import { Observable } from 'rxjs/Observable';
import { UsuariosInterface } from './usuarios.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsuariosService {
    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;
    private endPoint: string;
    auth: CredentialInterface;

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
       all = () : Observable<UsuariosResponseInterface> => {
           return this._http.post(`${this.endPoint}obtenerUsuarios`, this.auth, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<UsuariosResponseInterface> => {
           const usuario: any = {
                idusuario: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth,
           };
           return this._http.post(`${this._configuration.ServerWithApiUrl}obtenerUsuario`, usuario, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( usuario: UsuariosInterface ) : Observable<UsuariosResponseInterface> => {
            usuario.claveauth = this.auth.claveauth;
            usuario.nicknameauth = this.auth.nicknameauth;
            usuario.usuarioauth = this.auth.usuarioauth;
            
           return this._http.post(`${this.endPoint}/ModificarUsuario`, usuario, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<UsuariosResponseInterface> => {
            const usuario: any = {
                idusuario: id,  
                claveauth: this.auth.claveauth,
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth,
            };
           return this._http.post(`${this.endPoint}/bajaUsuario`, usuario, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<UsuariosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<UsuariosResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( usuario: UsuariosInterface ) : Observable<UsuariosResponseInterface> => {
            usuario.claveauth = this.auth.claveauth;
            usuario.nicknameauth = this.auth.nicknameauth;
            usuario.usuarioauth = this.auth.usuarioauth;
           
           return this._http.post(`${this.endPoint}/AgregarUsuario`, usuario, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

        obtenerEstatusUsuarios = (): Observable<any[]> => {
            return this._http.post(`${this.endPoint}/obtenerStatusUsuarios`, this.auth, { headers: this.headers })
                .map((response: Response) => <any[]>response.json())
                .catch(this.handleError);
        }
        obtenerRoles = (): Observable<any[]> => {
            return this._http.post(`${this.endPoint}/obtenerRoles`, this.auth, { headers: this.headers })
                .map((response: Response) => <any[]>response.json())
                .catch(this.handleError);
        }
        getUserAvatar = (id: any): Observable<UsuariosResponseInterface> =>  {
            const usuario: any = {
                nicknameauth: this.auth.nicknameauth,
                usuarioauth: this.auth.usuarioauth,
                claveauth: this.auth.claveauth,
                proceso: 'Usuario',
                idreferencia: id,
            };
            return this._http.post(`${this.endPoint}/ObtenerArchivosPorProcesoPorIdReferencia`, usuario, { headers: this.headers })
                .map((response: Response) => <UsuariosResponseInterface>response.json())
                .catch(this.handleError);
        }

       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
