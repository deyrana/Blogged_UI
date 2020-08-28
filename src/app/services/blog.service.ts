import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blog.model';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(environment.restApi + 'blogs');
  }

  saveBlog(formData: any): Observable<any> {
    return this.http.post<any>(environment.restApi + 'blogs', formData, { observe: 'response' });
  }

  getBlog(blogid: any): Observable<Blog> {
    let params = new HttpParams();
    params = params.append('blogid', blogid);
    return this.http.get<Blog>(environment.restApi + 'blogs/blog', {
      params: params
    });
  }

  deleteBlog(blogid: number): Observable<any> {
    return this.http.delete<any>(environment.restApi + 'blogs/' + blogid).pipe(
      tap((data) => {
        JSON.parse(data);
      })
    );
  }

  setFavBlog(formData: any): Observable<any> {
    return this.http.post<any>(environment.restApi + 'blogs/favourite', formData);
  }

  deleteFavBlog(username: any, blogid: any): Observable<any> {
    let params = new HttpParams();
    params = params.append("username", username);
    params = params.append("blogid", blogid);
    return this.http.delete<any>(environment.restApi + 'blogs/getfav', {
      params : params
    });
  }

  getFavBlog(username: any, blogid: any): Observable<boolean> {
    let params = new HttpParams();
    params = params.append("username", username);
    params = params.append("blogid", blogid);
    return this.http.get<boolean>(environment.restApi + "blogs/getfav", {
      params: params
    })
  }
}
