import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserComplete } from 'src/app/user/user-complete.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  restApi: string = "http://localhost:8080/";
  constructor(private http: HttpClient) { }

  saveUserData(userFrom: any): Observable<any> {
    return this.http.post<any>(this.restApi + 'users', userFrom, { observe: 'response' });
  }

  getUserData(username: string): Observable<any> {

    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get<any>(this.restApi + 'users/user', {
      params: params
    });
  }

  getUserCompleteData(userId: string, username: string): Observable<UserComplete> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('username', username);
    return this.http.get<UserComplete>(this.restApi + '/users/userDetail', {
      params: params,
    });
  }
}
