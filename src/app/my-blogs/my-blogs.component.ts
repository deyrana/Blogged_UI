import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../user/user.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {

  headerTitle: string;
  backdrop: boolean;
  navbarMode: string;
  username: string;
  blogs: Blog[] = [];
  blogs$: Observable<Blog[]>;
  searchText: string;
  pageLoad: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Blog>;

  constructor(private userService: UserService, private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef, private route: Router) { }

  ngOnInit(): void {
    this.headerTitle = "My Blogs";
    this.backdrop = true;
    this.navbarMode = "over";
    this.username = this.authService.getUser();
    this.fetchBlogs();
  }

  fetchBlogs() {
    this.userService.getUserBlogs(this.username).subscribe((response) => {
      console.log('Blogs - ' + response.length);
      this.blogs = response;
      this.pageLoad = true;
      this.setDatasource();
    })
  }

  setDatasource() {
    this.dataSource = new MatTableDataSource<Blog>(this.blogs);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.blogs$ = this.dataSource.connect();
  }

  truncateContent(content: string) {
    if (content.length > 540) {
      content = content.substring(0, 540) + '...';
    }
    return content;
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    this.blogs = this.dataSource.data;
  }

  public clearSearch(){
    this.dataSource.filter = "";
    this.searchText = "";
  }

}
