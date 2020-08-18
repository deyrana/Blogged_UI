import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user.model';
import {BlogService} from 'src/app/services/blog.service';
import { Blog } from '../models/blog.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  headerTitle: string;
  backdrop: boolean;
  navbarMode: string;
  user: User;
  blogs: Blog[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: Router, private blogService: BlogService) { }

  ngOnInit(): void {
    this.headerTitle = "Home";
    this.backdrop = true;
    this.navbarMode = "over";
    this.fetchBlogs();
    
  }

  fetchBlogs() {
   this.blogService.getAllBlogs() .subscribe((response) =>{
     console.log('Blogs - '+response.length);
     this.blogs = response;
   })
  }

  truncateContent(content: string) {
    if (content.length > 540) {
      content = content.substring(0, 540) + '...';
    }
    return content;
  }

  moveToAddScreen(){
    this.route.navigate(['blogs/add']);
  }

}
