import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog.model';
import { Observable } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {

  headerTitle: string;
  backdrop: boolean;
  navbarMode: string;
  blog$: Observable<Blog>;
  var: string;

  constructor(private route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit(): void {
    this.headerTitle = "View Blog";
    this.backdrop = true;
    this.navbarMode = "over";
    this.var = "data:image/jpeg;base64,";
    this.route.params.subscribe((response)=>{
      this.blog$ = this.blogService.getBlog(response.id);
      this.blog$.subscribe((response) =>{
        console.log(response);
      })
    })
  }

}
