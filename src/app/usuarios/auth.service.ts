import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario: Usuario; //el _ es por que va a tener un metodo accesor.
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    if(this._usuario!=null){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario')!=null){ // verifica si esta el usuario en el session storage
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }
 
  public get token(): string{
    if(this._token!=null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token')!=null){  // verifica si esta el token en el session storage
      this._token = sessionStorage.getItem('token') ;
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario):Observable<any>{
    const urlEndpoint = 'http://localhost:8086/oauth/token';
    const credenciales = btoa('angularapp' + ':' + '12345');  //btoa convierte o encrypta a base 64
    const httpHeaders = new  HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + credenciales});
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});
  }

  guardarUsuario(accessToken: string): void{
    let payload = this.obtenerDatosToken(accessToken);

    this._usuario= new Usuario();
    this._usuario.nombre= payload.nombre;
    this._usuario.apellido= payload.apellido;
    this._usuario.email= payload.email;
    this._usuario.username= payload.user_name;
    this._usuario.roles= payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario)); //stringify convierte el objeto en texto o string

  }
  guardarToken(accessToken: string): void{
      this._token = accessToken;
      sessionStorage.setItem('token', accessToken);
  }
  //OBTENEMOS EL PAYLOAD DEL TOKEN Y LO RETORNAMOS
  obtenerDatosToken(accessToken: string): any{
    if(accessToken != null){
      return JSON.parse(atob(accessToken.split(".")[1])); //.parse para convertir en OBJETO JSON (no string)
    }
   // console.log("obtenerDatosToken valida que es accesToken es NULL")
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this.token); //this.token es el metodo get no el atributo.
    if(payload!=null && payload.user_name && payload.user_name.length>0){
      return true;
    }
   
    return false;
  }

hasRole(role:string): boolean{
  if(this.usuario.roles.includes(role)){
    return true;
  }
  return false;
}

  logout(): void{
    this._token=null;
    this._usuario=null;
  //  sessionStorage.clear(); // borra todas las variables del session storage()
    //si tenemos en el sessionStorage varios elementos podemo borrar solo los que necesitemos
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');


  }
}
