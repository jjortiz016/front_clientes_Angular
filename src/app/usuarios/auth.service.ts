import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuario: Usuario):Observable<any>{
    const urlEndpoint = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('angularapp' + ':' + '12345');  //btoa convierte o encrypta a base 64
    const HttpHeaders = new HttpHeaders();
    return this.http.post<any>(urlEndpoint, params, {headers: HttpHeaders});



  }
}
