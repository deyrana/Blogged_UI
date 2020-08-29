import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserComplete } from 'src/app/user/user-complete.model';
import { environment } from 'src/environments/environment';
import { Blog } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  saveUserData(userFrom: any): Observable<any> {
    return this.http.post<any>(environment.restApi + 'users', userFrom, { observe: 'response' });
  }

  getUserData(username: string): Observable<any> {

    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get<any>(environment.restApi + 'users/user', {
      params: params
    });
  }

  getUserCompleteData(userId: string, username: string): Observable<UserComplete> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('username', username);
    return this.http.get<UserComplete>(environment.restApi + '/users/userDetail', {
      params: params,
    });
  }

  getUserBlogCount(username: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get<any>(environment.restApi + 'users/blogsCount', {
      params: params
    });
  }

  getFavBlogCount(username: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get<any>(environment.restApi + 'blogs/getFavCount', {
      params: params
    });
  }

  getCodeMapByCat(cat: string): Observable<string[]> {
    let params = new HttpParams();
    params = params.append('category', cat);
    return this.http.get<string[]>(environment.restApi + 'code', {
      params: params
    });
  }

  getUserBlogs(username: string): Observable<Blog[]> {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get<Blog[]>(environment.restApi + 'users/blogs', {
      params: params
    });
  }

  getFavBlogs(username: string):Observable<Blog[]> {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get<Blog[]>(environment.restApi + 'blogs/getFavBlogs', {
      params: params
    });
  }
}
