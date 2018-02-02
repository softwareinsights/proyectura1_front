import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Configuration } from './../app.constants';
import { LoginInterface } from './../pages/login/login.interface';
import { LoginResponseInterface } from './../pages/login/login-response.interface';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { CredentialInterface } from 'app/shared/credential.interface';


@Injectable()
export class AuthService {
    
    token: string;
    jwtHelper: JwtHelper = new JwtHelper();
    user_modules: any[];
    isLoggedIn: boolean = false;
    recordarSesion: boolean = false;
    auth: CredentialInterface;
    userId: number;

    loggedIn() {
        // return tokenNotExpired();
        return this.isAuthenticated();
    }

    toBoolean(object: any): boolean {
        return (object.toString() === 'true') ? true : false;
    }

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    private actionUrl: string;
    private headers: Headers;

    constructor(
        private _http: Http, 
        private _configuration: Configuration,
        private router: Router, 
        private toastrService: ToastrService) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');

        // Recordar la sesión desde LocalStorage
        this.recordarSesion = (localStorage.getItem('recordarSesion') === 'true') ? true : false;
        console.log("this.recordarSesion from authservice constructor", this.recordarSesion);
        if (this.recordarSesion) {
            this.isLoggedIn = (localStorage.getItem('isLoggedIn') === 'true') ? true : false;
            // this.token = (localStorage.getItem('token')) ? localStorage.getItem('token') : '';
            this.user_modules = (localStorage.getItem('user_modules')) ? JSON.parse(localStorage.getItem('user_modules').toString()) : [];
            this.auth = (localStorage.getItem('auth')) ? JSON.parse(localStorage.getItem('auth').toString()) : undefined;
        }
    }

    toInt(tochange: any): number {
        return +tochange;
    }

    login(values: LoginInterface): Observable<any> {
        
        const endPoint = `https://www.ideasys.com.mx/ProyecturaObraSW/api/`;
        this.actionUrl = `${endPoint}ValidarLoginUsuario`;
        //const toAdd = JSON.stringify(values);

        const toAdd: CredentialInterface = {
            nicknameauth: 'ideasys',
            usuarioauth: values.email,
            claveauth: values.password,
        }

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError)
            .do(response => {
                this.isLoggedIn = true;

                
                console.log("response login", response);

                // this.token = response.token;
                this.recordarSesion = values.recordarSesion;
                localStorage.setItem('recordarSesion', values.recordarSesion.toString());
                if (response.idRespuesta > -1) {



                    // Guardar el id usuario en localstorage y en servicio
                    const _userId = response.valorRespuesta.split('|')[1];
                    this.userId = this.toInt(response.valorRespuesta.split('|')[1]);
                    localStorage.setItem('userId', _userId);



                    //Módulos permitidos a usuario
                    let modules = [];
                    const _modules = new Array(
                        'archivo',
                        'categoria',
                        'costo',
                        'cotizacion',
                        'detallecotizacion',
                        'detallefactura',
                        'detallenotagasto',
                        'empresa',
                        'estatuscotizacion',
                        'estatusobra',
                        'factura',
                        'material',
                        'notagasto',
                        'obra',
                        'obracategoria',
                        'permiso',
                        'permisobase',
                        'presupuesto', 
                        'razonsocial',
                        'referencia',
                        'rol',
                        'statusrazonsocial',
                        'statususuario',
                        'subcategoria',
                        'tipomaterial',
                        'usuario',
                        'dashboard'
                     );


                    // response.modules.forEach(element => {
                    _modules.forEach(element => {
                        let path = '/pages/' + element.toLowerCase() + 's';
                        modules.push({
                            'nombre': element, 
                            'path': path, 
                            'readable': true, 
                            'writeable': true, 
                            'deleteable': true, 
                            'updateable': true, 
                            'read_own': false, 
                            'write_own': false, 
                            'delete_own': false, 
                            'update_own': false
                        });
                    });

                    this.setCredentials(values);


                    this.user_modules = modules;
                    console.log("modules from login", modules);
                    
                    // localStorage.setItem('token', response.token);
                    if (values.recordarSesion) {
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('user_modules', JSON.stringify(modules));
                    }

                    this.toastrService.success(response.mensajeRespuesta);
                    this.router.navigate(['pages/dashboard']);

                } else {
                    this.toastrService.error(response.mensajeRespuesta);
                }
            });
    }

    logout(): void {
        this.isLoggedIn = false;
        this.user_modules = [];

        this.userId = 0;

        if (this.recordarSesion) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token');
            localStorage.removeItem('user_modules');
            localStorage.removeItem('recordarSesion');
        }
        if (!this.isLoggedIn) {
            this.toastrService.success('Has cerrado sesión correctamente');
        }
    }

    useJwtHelper() {
        /*
        const token = this.token;
        if (token !== undefined) {
            return this.jwtHelper.decodeToken(token);
        } else {
            return false;
        }
        */
    }
        
    getUserModules() {
        if (this.user_modules) {
            return this.user_modules;
        } else {
            return [];
        }
    }

    getUserModulesPaths() {
        if (this.user_modules !== undefined) {
            const user_modules = JSON.parse(JSON.stringify(this.user_modules));
            const modules: string[] = [];
            user_modules.forEach(element => {
                modules.push(element.path);
            });
            return modules;
        } else {
            return [];
        }
    }

    isAuthenticated() {
        if (this.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    }
    
    modulePermission(module_path: string) {
        const modules = this.getUserModulesPaths();
        if (modules.indexOf(module_path) >= 0){
            return true;
        } else {
            return false;
        }
    }

    getCredentials(): CredentialInterface {
        /*
        const auth = {
            nicknameauth: 'ideasys',
            usuarioauth: 'super',
            claveauth: '1234',
        }
        */
        console.log("this.auth", this.auth);
        return this.auth;
    }

    setCredentials(login: LoginInterface) {
        console.log("login", login);
        const auth = {
            nicknameauth: 'ideasys',
            usuarioauth: login.email,
            claveauth: login.password,
        }

        this.auth = auth;
        localStorage.setItem('auth', JSON.stringify(auth));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
