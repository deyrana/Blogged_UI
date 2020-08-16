import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Blog} from 'src/app/models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  restApi: string = "http://localhost:8080/";
  constructor(private http: HttpClient) { }

  getAllBlogs():Observable<Blog[]>{
    return this.http.get<Blog[]>(this.restApi+'blogs');
  }
}
