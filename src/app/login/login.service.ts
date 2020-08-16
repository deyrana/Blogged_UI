import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  restApi:string = "http://localhost:8080/";
  constructor(private http: HttpClient) { }

  validateCred(formData: any): Observable<any>{
    return this.http.post<any>(this.restApi+'users/validate', formData, { observe: 'response' });
  }
}
